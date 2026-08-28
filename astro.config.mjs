import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  COMPATIBILITY_FILES,
  COMPATIBILITY_ROUTES,
  GENERATED_ENDPOINT_ROUTES,
  PUBLIC_ASSET_FILES,
  REDIRECT_ROUTES,
  REVIEW_ASSET_FILES,
  REVIEW_COMPATIBILITY_FILES,
  SITE_CONTRACT,
} from './scripts/site-contract.mjs';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const backendOrigin = process.env.RUSHES_BACKEND_ORIGIN;
const proxiedRoutes = ['/api', '/book', '/inquire', '/connect', '/contact'];
const proxy = backendOrigin
  ? Object.fromEntries(
      proxiedRoutes.map((route) => [route, { target: backendOrigin, changeOrigin: false }]),
    )
  : undefined;

const includeReviewRoutes = process.env.RUSHES_INCLUDE_REVIEW_ROUTES === '1';
const compatibilityIndexes = new Map(
  COMPATIBILITY_ROUTES.map((route) => {
    const slashPath = route.path.endsWith('/') ? route.path : `${route.path}/`;
    return [slashPath, `${slashPath}index.html`];
  }),
);
const allowedBrowserFiles = new Set([
  ...PUBLIC_ASSET_FILES,
  ...COMPATIBILITY_FILES,
  ...(includeReviewRoutes ? REVIEW_ASSET_FILES : []),
  ...(includeReviewRoutes ? REVIEW_COMPATIBILITY_FILES : []),
]);
const apiPaths = new Set(
  SITE_CONTRACT.filter((route) => route.owner === 'api').map((route) => route.path),
);
const generatedEndpointPaths = new Set(GENERATED_ENDPOINT_ROUTES.map((route) => route.path));
const redirectRoutes = new Map(REDIRECT_ROUTES.map((route) => [route.path, route]));

function redirectLocation(destination, incomingSearch) {
  const localOrigin = 'http://rushes.local';
  const target = new URL(destination, localOrigin);
  if (incomingSearch) {
    const incoming = new URLSearchParams(incomingSearch);
    for (const [key, value] of incoming) target.searchParams.set(key, value);
  }
  return target.origin === localOrigin
    ? `${target.pathname}${target.search}${target.hash}`
    : target.toString();
}

function serveDevelopmentVideo(request, response, pathname) {
  if (pathname !== '/assets/video/hero-loop.mp4') return false;
  const videoPath = path.join(projectRoot, 'assets/video/hero-loop.mp4');
  const videoStat = fs.statSync(videoPath);
  const headers = {
    'Content-Type': 'video/mp4',
    'Cache-Control': 'no-cache',
    'Accept-Ranges': 'bytes',
  };
  const range = request.headers.range && /^bytes=(\d*)-(\d*)$/.exec(request.headers.range);
  if (range && (range[1] || range[2])) {
    let start = range[1] ? Number.parseInt(range[1], 10) : videoStat.size - Number.parseInt(range[2], 10);
    let end = range[1] && range[2] ? Number.parseInt(range[2], 10) : videoStat.size - 1;
    if (Number.isNaN(start) || Number.isNaN(end) || start < 0 || start > end || start >= videoStat.size) {
      response.writeHead(416, { ...headers, 'Content-Range': `bytes */${videoStat.size}` });
      response.end();
      return true;
    }
    end = Math.min(end, videoStat.size - 1);
    response.writeHead(206, {
      ...headers,
      'Content-Range': `bytes ${start}-${end}/${videoStat.size}`,
      'Content-Length': end - start + 1,
    });
    if (request.method === 'HEAD') response.end();
    else fs.createReadStream(videoPath, { start, end }).pipe(response);
    return true;
  }
  response.writeHead(200, { ...headers, 'Content-Length': videoStat.size });
  if (request.method === 'HEAD') response.end();
  else fs.createReadStream(videoPath).pipe(response);
  return true;
}

function compatibilityDirectoryIndexes() {
  return {
    name: 'rushes-compatibility-directory-indexes',
    configureServer(server) {
      const handleCompatibilityRequest = (request, response, next) => {
        if (!request.url) return next();
        const url = new URL(request.url, 'http://rushes.local');
        const redirect = redirectRoutes.get(url.pathname);
        if (redirect && ['GET', 'HEAD'].includes(request.method || 'GET')) {
          response.statusCode = redirect.redirectStatus;
          response.setHeader('Location', redirectLocation(redirect.redirectTo, url.search));
          response.end();
          return;
        }
        const backendRequest = url.pathname.startsWith('/api/') || apiPaths.has(url.pathname);
        if (!backendRequest && !['GET', 'HEAD'].includes(request.method || 'GET')) {
          response.statusCode = 405;
          response.setHeader('Content-Type', 'text/plain; charset=utf-8');
          response.end('Method not allowed');
          return;
        }
        if (serveDevelopmentVideo(request, response, url.pathname)) return;
        try {
          decodeURIComponent(url.pathname);
        } catch {
          response.statusCode = 400;
          response.setHeader('Content-Type', 'text/plain; charset=utf-8');
          response.end('Bad request');
          return;
        }
        const slashPath = url.pathname.endsWith('/') ? url.pathname : `${url.pathname}/`;
        const indexPath = compatibilityIndexes.get(slashPath);
        if (indexPath) request.url = `${indexPath}${url.search}`;
        next();
      };
      return () => {
        server.middlewares.stack.unshift({ route: '', handle: handleCompatibilityRequest });
      };
    },
  };
}

function sourceFileBoundary() {
  return {
    name: 'rushes-source-file-boundary',
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        if (!request.url) return next();
        const url = new URL(request.url, 'http://rushes.local');
        if (url.pathname === '/index.html') {
          request.url = `/${url.search}`;
          return next();
        }
        if (
          apiPaths.has(url.pathname) ||
          redirectRoutes.has(url.pathname) ||
          generatedEndpointPaths.has(url.pathname) ||
          url.pathname.startsWith('/@') ||
          url.pathname.startsWith('/src/') ||
          url.pathname.startsWith('/node_modules/') ||
          url.pathname.startsWith('/_astro/') ||
          url.pathname.startsWith('/.astro/')
        ) {
          return next();
        }
        const relativePath = decodeURIComponent(url.pathname).replace(/^\/+/, '');
        if (allowedBrowserFiles.has(relativePath)) return next();
        const candidate = path.join(projectRoot, relativePath);
        if (
          candidate.startsWith(`${projectRoot}${path.sep}`) &&
          fs.existsSync(candidate) &&
          fs.statSync(candidate).isFile()
        ) {
          response.statusCode = 404;
          response.setHeader('Content-Type', 'text/plain; charset=utf-8');
          response.end('Not found');
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig({
  site: 'https://rushesmedia.com',
  output: 'static',
  publicDir: './.astro-public',
  outDir: './dist',
  build: {
    format: 'directory',
  },
  vite: {
    build: {
      assetsInlineLimit: 4600,
    },
    plugins: [compatibilityDirectoryIndexes(), sourceFileBoundary()],
    server: {
      cors: false,
      ...(proxy ? { proxy } : {}),
    },
  },
});
