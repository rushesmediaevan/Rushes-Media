import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { reservePort, credentialFreeEnv, spawnCaptured, stopChild } from '../scripts/smoke-support.mjs';

test('capture HTTP boundary handles size, validation, rate limits, configuration and slow bodies', { timeout: 45000 }, async (t) => {
  const port = await reservePort();
  const origin = `http://127.0.0.1:${port}`;
  const { child, output } = spawnCaptured(process.execPath, ['server.js'], {
    env: credentialFreeEnv({ HOST: '127.0.0.1', PORT: String(port), RUSHES_API_ONLY: '1' }),
  });
  t.after(() => stopChild(child));
  for (let attempt = 0; attempt < 100; attempt++) {
    try { await fetch(`${origin}/api/health`); break; } catch {
      if (child.exitCode !== null) throw Error(output.value);
      await new Promise(resolve => setTimeout(resolve, 25));
    }
  }
  const post = (endpoint, payload, ip = '192.0.2.1') => fetch(origin + endpoint, {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Forwarded-For': ip }, body: JSON.stringify(payload),
  });

  for (const [i, endpoint] of ['/api/lead', '/api/playbook-capture'].entries()) {
    const malformed = await post(endpoint, { email: [] }, `192.0.2.${i + 10}`);
    assert.equal(malformed.status, 400);
    assert.ok((await malformed.json()).fieldErrors.email);
    const oversized = await post(endpoint, { name: 'x'.repeat(65536) }, `192.0.2.${i + 20}`);
    assert.equal(oversized.status, 413);
    for (let attempt = 0; attempt < 5; attempt++) {
      assert.equal((await post(endpoint, {}, `192.0.2.${i + 30}`)).status, 400);
    }
    const limited = await post(endpoint, {}, `192.0.2.${i + 30}`);
    assert.equal(limited.status, 429); assert.equal(limited.headers.get('retry-after'), '3600');
  }
  const valid = { name: 'Safe Test', business: 'Example', need: 'Website', email: 'safe@example.test', phone: '6095550100' };
  assert.equal((await post('/api/lead?utm_source=test', valid, '192.0.2.40')).status, 503);
  assert.equal((await fetch(origin + '/api/health?probe=1')).status, 503);

  // Chunked bodies must respect the same limit, without trusting Content-Length.
  const chunkedStatus = await new Promise((resolve, reject) => {
    const req = http.request(origin + '/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Forwarded-For': '192.0.2.50' } }, res => {
      res.resume(); res.on('end', () => resolve(res.statusCode));
    });
    req.on('error', reject); req.write('x'.repeat(40000)); req.end('x'.repeat(30000));
  });
  assert.equal(chunkedStatus, 413);

  // Exercise the real 30-second deadline, rather than a source-text assertion.
  const started = Date.now();
  const slowStatus = await new Promise((resolve, reject) => {
    const req = http.request(origin + '/api/lead', { method: 'POST', headers: {
      'Content-Type': 'application/json', 'Content-Length': '100', 'X-Forwarded-For': '192.0.2.60',
    } }, res => {
      res.resume(); res.on('end', () => { resolve(res.statusCode); req.destroy(); });
    });
    req.on('error', reject); req.write('{');
  });
  assert.equal(slowStatus, 504);
  assert.ok(Date.now() - started >= 29000 && Date.now() - started < 35000);
});
