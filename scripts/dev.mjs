import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dev } from 'astro';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

async function stagePublic(includeReviewRoutes) {
  process.env.RUSHES_INCLUDE_REVIEW_ROUTES = includeReviewRoutes ? '1' : '0';
  const mode = includeReviewRoutes ? 'review' : 'release';
  await import(`./prepare-astro-public.mjs?mode=${mode}`);
}

await stagePublic(true);

function argumentValue(name) {
  const equalsArgument = process.argv.find((argument) => argument.startsWith(`${name}=`));
  if (equalsArgument) return equalsArgument.slice(name.length + 1);
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

async function openPort() {
  const server = createServer();
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });
  const address = server.address();
  const port = typeof address === 'object' && address ? address.port : null;
  await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
  if (!port) throw new Error('Could not reserve a local backend port.');
  return port;
}

const backendPort = process.env.RUSHES_BACKEND_PORT || String(await openPort());
const backendOrigin = `http://127.0.0.1:${backendPort}`;
const host = argumentValue('--host') || '127.0.0.1';
const requestedPort = Number(argumentValue('--port')) || 4321;
const strictPort = process.argv.includes('--strictPort');
const backend = spawn(process.execPath, ['server.js'], {
  cwd: projectRoot,
  stdio: 'inherit',
  env: {
    ...process.env,
    HOST: '127.0.0.1',
    PORT: backendPort,
    RUSHES_API_ONLY: '1',
  },
});

let shuttingDown = false;
let astroServer;

async function stop(signal = 'SIGTERM') {
  if (shuttingDown) return;
  shuttingDown = true;
  backend.kill(signal);
  await astroServer?.stop();
  await stagePublic(false);
}

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.once(signal, async () => {
    await stop(signal);
    process.exit(0);
  });
}

backend.once('exit', (code, signal) => {
  if (shuttingDown) return;
  console.error(`Rushes backend stopped unexpectedly (${signal || code}).`);
  void stop().finally(() => process.exit(code || 1));
});

process.env.ASTRO_TELEMETRY_DISABLED = '1';
process.env.RUSHES_BACKEND_ORIGIN = backendOrigin;

try {
  astroServer = await dev({
    root: pathToFileURL(`${projectRoot}${path.sep}`),
    server: { host, port: requestedPort },
    vite: { server: { strictPort } },
  });
  const localUrl = astroServer.resolvedUrls?.local?.[0] || `http://${host}:${astroServer.address.port}/`;
  console.log(`Astro dev server running at ${localUrl}`);
} catch (error) {
  await stop();
  throw error;
}
