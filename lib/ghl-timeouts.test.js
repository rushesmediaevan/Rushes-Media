const test = require('node:test');
const assert = require('node:assert/strict');
const { ghlRequest, withRequestDeadline } = require('./ghl');

test('upstream writes are not automatically retried', async (t) => {
  const fetchMock = t.mock.method(global, 'fetch', async () => new Response('{"error":"unavailable"}', { status: 503 }));
  await assert.rejects(ghlRequest('mock', 'POST', '/contacts/upsert', {}), { status: 503, upstream: true });
  assert.equal(fetchMock.mock.callCount(), 1);
});

test('network loss reports uncertain provider acceptance without retrying', async (t) => {
  const fetchMock = t.mock.method(global, 'fetch', async () => { throw new TypeError('fetch failed'); });
  await assert.rejects(ghlRequest('mock', 'POST', '/conversations/messages', {}), { upstream: true, acceptanceUnknown: true });
  assert.equal(fetchMock.mock.callCount(), 1);
});

test('expired request deadline stops subsequent writes before fetch', async (t) => {
  const fetchMock = t.mock.method(global, 'fetch', async () => new Response('{}'));
  const controller = new AbortController();
  controller.abort(new DOMException('Request deadline', 'TimeoutError'));
  await assert.rejects(withRequestDeadline(controller.signal, () => ghlRequest('mock', 'POST', '/contacts/upsert', {})), { name: 'TimeoutError' });
  assert.equal(fetchMock.mock.callCount(), 0);
});

test('10-second call timeout covers response body reads', async (t) => {
  const controller = new AbortController();
  t.mock.method(AbortSignal, 'timeout', (ms) => { assert.equal(ms, 10_000); return controller.signal; });
  t.mock.method(global, 'fetch', async (url, options) => ({
    ok: true,
    text: () => new Promise((resolve, reject) => {
      options.signal.addEventListener('abort', () => reject(options.signal.reason));
      controller.abort(new DOMException('Call deadline', 'TimeoutError'));
    }),
  }));
  await assert.rejects(ghlRequest('mock', 'POST', '/contacts/upsert', {}), { name: 'TimeoutError' });
});
