import assert from 'node:assert/strict';
import { createServer } from 'node:net';
import {
  assertSiteContract,
  credentialFreeEnv,
  projectRoot,
  reservePort,
  spawnCaptured,
  stopChild,
  waitForReady,
} from './smoke-support.mjs';

const occupiedServer = createServer();
await new Promise((resolve, reject) => {
  occupiedServer.once('error', reject);
  occupiedServer.listen(0, '127.0.0.1', resolve);
});
const occupiedAddress = occupiedServer.address();
const occupiedPort = typeof occupiedAddress === 'object' && occupiedAddress
  ? occupiedAddress.port
  : null;
assert.ok(occupiedPort, 'Could not reserve an occupied strict-port test port.');
const strictBackendPort = await reservePort();
const strictAttempt = spawnCaptured(
  process.execPath,
  ['scripts/dev.mjs', '--host', '127.0.0.1', '--port', String(occupiedPort), '--strictPort'],
  {
    cwd: projectRoot,
    env: credentialFreeEnv({ RUSHES_BACKEND_PORT: String(strictBackendPort) }),
  },
);
const strictOutcome = await new Promise((resolve) => {
  const timer = setTimeout(() => resolve({ exited: false }), 15000);
  strictAttempt.child.once('exit', (code, signal) => {
    clearTimeout(timer);
    resolve({ exited: true, code, signal });
  });
});
if (!strictOutcome.exited) await stopChild(strictAttempt.child);
await new Promise((resolve, reject) => {
  occupiedServer.close((error) => (error ? reject(error) : resolve()));
});
assert.ok(
  strictOutcome.exited,
  `--strictPort did not exit while its port was occupied.\n${strictAttempt.output.value}`,
);
assert.notEqual(strictOutcome.code, 0, '--strictPort must fail when its port is occupied.');
assert.match(strictAttempt.output.value, /already in use|EADDRINUSE/i);

const astroPort = await reservePort();
let backendPort = await reservePort();
while (backendPort === astroPort) backendPort = await reservePort();

const origin = `http://127.0.0.1:${astroPort}`;
const { child, output } = spawnCaptured(
  process.execPath,
  ['scripts/dev.mjs', '--host', '127.0.0.1', '--port', String(astroPort), '--strictPort'],
  {
    cwd: projectRoot,
    env: credentialFreeEnv({ RUSHES_BACKEND_PORT: String(backendPort) }),
  },
);

try {
  await waitForReady(origin, child, output);
  await assertSiteContract(origin, { includeReviewRoutes: true });
  console.log('Astro development contract smoke test passed.');
} catch (error) {
  error.message += `\nServer output:\n${output.value}`;
  throw error;
} finally {
  await stopChild(child);
}
