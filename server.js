#!/usr/bin/env node
/**
 * Rushes site — Astro-built static files + PLAYBOOK capture API.
 * Railway: set RUSHES_GHL_PIT_TOKEN + RUSHES_GHL_LOCATION_ID in service env.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { capturePlaybookLead, loadGhlConfig } = require('./lib/playbook-capture');
const { captureFunnelLead } = require('./lib/funnel-capture');
const { BOOKING_URL } = require('./scripts/site-facts.json');

const ROOT = __dirname;
const BUILD_ROOT = path.join(ROOT, 'dist');
const API_ONLY = process.env.RUSHES_API_ONLY === '1';
const STATIC_ROOT = BUILD_ROOT;
const HOST = process.env.HOST || '0.0.0.0';
const PORT = Number(process.env.PORT || 3000);

if (!API_ONLY && !fs.existsSync(BUILD_ROOT)) {
  console.error('Built site is missing. Run npm run build before starting the production server.');
  process.exit(1);
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

function parseBody(req, raw) {
  const ct = req.headers['content-type'] || '';
  if (ct.includes('application/json')) {
    try {
      return JSON.parse(raw || '{}');
    } catch {
      return null;
    }
  }
  if (ct.includes('application/x-www-form-urlencoded')) {
    return Object.fromEntries(new URLSearchParams(raw));
  }
  return null;
}

function sendJson(res, status, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
  });
  res.end(body);
}

function resolveFile(urlPath) {
  const safe = decodeURIComponent(urlPath.split('?')[0]);
  let filePath = path.join(STATIC_ROOT, safe);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (filePath !== STATIC_ROOT && !filePath.startsWith(`${STATIC_ROOT}${path.sep}`)) return null;
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) return null;
  return filePath;
}

function serveStatic(req, res) {
  const urlPath = req.url === '/' ? '/index.html' : req.url;
  let filePath;
  try {
    filePath = resolveFile(urlPath);
  } catch (error) {
    if (error instanceof URIError) {
      res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Bad request');
      return;
    }
    throw error;
  }
  if (!filePath) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
    return;
  }
  const ext = path.extname(filePath).toLowerCase();
  const stat = fs.statSync(filePath);
  const lastModified = stat.mtime.toUTCString();
  // Code + config revalidate every visit (fast 304 via Last-Modified) so deploys
  // land immediately; heavy static media (images/video/fonts) caches for a week.
  const REVALIDATE = ['.html', '.js', '.css', '.json', '.xml', '.txt', '.webmanifest'];
  const headers = {
    'Content-Type': MIME[ext] || 'application/octet-stream',
    'Cache-Control': REVALIDATE.includes(ext) ? 'no-cache' : 'public, max-age=604800',
    'Last-Modified': lastModified,
    'Accept-Ranges': 'bytes',
  };

  if (req.headers['if-modified-since'] === lastModified) {
    res.writeHead(304, headers);
    res.end();
    return;
  }

  // Byte-range support — Safari won't play <video> without it
  const range = req.headers.range && /^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
  if (range && (range[1] || range[2])) {
    let start = range[1] ? parseInt(range[1], 10) : stat.size - parseInt(range[2], 10);
    let end = range[1] && range[2] ? parseInt(range[2], 10) : stat.size - 1;
    if (Number.isNaN(start) || Number.isNaN(end) || start < 0 || start > end || start >= stat.size) {
      res.writeHead(416, { 'Content-Range': `bytes */${stat.size}` });
      res.end();
      return;
    }
    end = Math.min(end, stat.size - 1);
    res.writeHead(206, {
      ...headers,
      'Content-Range': `bytes ${start}-${end}/${stat.size}`,
      'Content-Length': end - start + 1,
    });
    if (req.method === 'HEAD') { res.end(); return; }
    fs.createReadStream(filePath, { start, end }).pipe(res);
    return;
  }

  res.writeHead(200, { ...headers, 'Content-Length': stat.size });
  if (req.method === 'HEAD') { res.end(); return; }
  fs.createReadStream(filePath).pipe(res);
}

// Per-IP rate limit for lead capture — funnel.js surfaces 'rate_limit' to the user
const LEAD_RATE = new Map();
const LEAD_RATE_MAX_IPS = 5000;

function pruneLeadRateMap() {
  const now = Date.now();
  for (const [ip, hits] of LEAD_RATE) {
    const fresh = hits.filter((t) => now - t < 60 * 60 * 1000);
    if (!fresh.length) LEAD_RATE.delete(ip);
    else LEAD_RATE.set(ip, fresh);
  }
  if (LEAD_RATE.size > LEAD_RATE_MAX_IPS) {
    for (const ip of [...LEAD_RATE.keys()].slice(0, LEAD_RATE.size - LEAD_RATE_MAX_IPS)) {
      LEAD_RATE.delete(ip);
    }
  }
}

setInterval(pruneLeadRateMap, 15 * 60 * 1000).unref();

function leadRateLimited(ip) {
  const now = Date.now();
  const hits = (LEAD_RATE.get(ip) || []).filter((t) => now - t < 60 * 60 * 1000);
  if (hits.length >= 5) return true;
  hits.push(now);
  LEAD_RATE.set(ip, hits);
  return false;
}

const server = http.createServer(async (req, res) => {
  const urlPath = (req.url || '/').split('?')[0];

  if (urlPath === '/inquire' || urlPath === '/inquire/' || urlPath === '/inquire/index.html') {
    res.writeHead(301, { Location: '/#book' });
    res.end();
    return;
  }

  if (urlPath === '/connect' || urlPath === '/connect/' || urlPath === '/connect/index.html') {
    res.writeHead(301, { Location: '/#book' });
    res.end();
    return;
  }

  if (urlPath === '/contact' || urlPath === '/contact/' || urlPath === '/contact/index.html') {
    res.writeHead(301, { Location: '/#book' });
    res.end();
    return;
  }

  // /book → Growth Call booking widget (short SMS / speed-to-lead link).
  // /call stays the pre-call proof page (website/call/index.html) for show-rate.
  if (urlPath === '/book' || urlPath === '/book/') {
    res.writeHead(302, {
      Location: BOOKING_URL,
    });
    res.end();
    return;
  }

  if (req.method === 'OPTIONS' && (req.url === '/api/playbook-capture' || req.url === '/api/lead')) {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    res.end();
    return;
  }

  if (req.method === 'GET' && req.url === '/api/health') {
    const { loc, token } = loadGhlConfig();
    const ghlConfigured = Boolean(loc && token);
    sendJson(res, ghlConfigured ? 200 : 503, {
      ok: ghlConfigured,
      ghlConfigured,
    });
    return;
  }

  if (req.method === 'POST' && req.url === '/api/lead') {
    const ip =
      (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
      req.socket.remoteAddress ||
      'unknown';
    if (leadRateLimited(ip)) {
      sendJson(res, 429, { ok: false, error: 'rate_limit' });
      return;
    }
    try {
      const raw = await readBody(req);
      const body = parseBody(req, raw);
      if (!body) {
        sendJson(res, 400, { ok: false, error: 'Invalid body' });
        return;
      }
      const result = await captureFunnelLead(body);
      sendJson(res, result.ok ? 200 : 400, result);
    } catch (err) {
      console.error('lead-capture error:', err.message);
      sendJson(res, 500, { ok: false, error: 'Server error' });
    }
    return;
  }

  if (req.method === 'POST' && req.url === '/api/playbook-capture') {
    try {
      const raw = await readBody(req);
      const body = parseBody(req, raw);
      if (!body) {
        sendJson(res, 400, { ok: false, error: 'Invalid body' });
        return;
      }
      const result = await capturePlaybookLead(body);
      sendJson(res, result.ok ? 200 : 400, result);
    } catch (err) {
      console.error('playbook-capture error:', err.message);
      sendJson(res, 500, { ok: false, error: 'Server error' });
    }
    return;
  }

  if (req.method === 'GET' || req.method === 'HEAD') {
    serveStatic(req, res);
    return;
  }

  res.writeHead(405, { 'Content-Type': 'text/plain' });
  res.end('Method not allowed');
});

process.on('uncaughtException', (err) => {
  console.error('uncaughtException:', err);
});
process.on('unhandledRejection', (reason) => {
  console.error('unhandledRejection:', reason);
});

server.on('error', (err) => {
  console.error('Server failed to start:', err);
  process.exit(1);
});

server.listen(PORT, HOST, () => {
  console.log(`Rushes site listening on ${HOST}:${PORT} (pid ${process.pid})`);
});
