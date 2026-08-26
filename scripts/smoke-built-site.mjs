import {
  assertSiteContract,
  credentialFreeEnv,
  projectRoot,
  reservePort,
  spawnCaptured,
  stopChild,
  waitForReady,
} from './smoke-support.mjs';

const port = await reservePort();
const origin = `http://127.0.0.1:${port}`;
const { child, output } = spawnCaptured(process.execPath, ['server.js'], {
  cwd: projectRoot,
  env: credentialFreeEnv({ HOST: '127.0.0.1', PORT: String(port) }),
});

try {
  await waitForReady(origin, child, output);
  await assertSiteContract(origin);
  console.log('Astro production contract smoke test passed.');
} catch (error) {
  error.message += `\nServer output:\n${output.value}`;
  throw error;
} finally {
  await stopChild(child);
}
