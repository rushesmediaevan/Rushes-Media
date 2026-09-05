const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '../assets/form-runtime.js'), 'utf8');

function fixture({ response = { ok: true }, status = 200, host = 'rushes.example', fetcher, invalid = false, analyticsThrows = false } = {}) {
  const calls = [], events = [], navigation = [], timers = new Map();
  let timerId = 0;
  const field = { type: 'email', value: 'preserved@example.test', setCustomValidity(value) { this.error = value; }, setAttribute() {}, removeAttribute() {}, focus() { this.focused = true; }, reportValidity() {} };
  const button = { textContent: 'Send', disabled: false };
  const message = { textContent: '', classList: { add() {}, remove() {} } };
  const handlers = {};
  const form = { reportValidity: () => !invalid, addEventListener: (type, fn) => { handlers[type] = fn; }, querySelector: () => button, setAttribute() {}, elements: { namedItem: () => field } };
  const location = new URL(`https://${host}/playbook/?utm_source=review&src=ig-playbook`);
  location.assign = (url) => navigation.push(url);
  const window = {
    gtag: (...args) => { if (analyticsThrows) throw Error('blocked'); events.push(args); },
    fbq: (...args) => { if (analyticsThrows) throw Error('blocked'); events.push(args); },
    setTimeout: (fn, ms) => { if (ms === 750) { fn(); return 0; } timers.set(++timerId, { fn, ms }); return timerId; },
    clearTimeout: (id) => timers.delete(id),
  };
  const fetch = async (...args) => { calls.push(args); return fetcher ? fetcher(...args) : { ok: status < 400, json: async () => response }; };
  vm.runInNewContext(source, { window, location, URL, fetch, AbortController, WeakSet, Error, SyntaxError });
  return { calls, events, navigation, timers, field, button, message, handlers,
    submit: () => window.RushesForms.submit({ form, endpoint: '/api/lead', payload: { email: field.value }, message, destination: '/thanks/?niche=hardscape', source: 'hardscape' }),
  };
}

test('successful non-spam capture queues one GA4 and Meta event and preserves attribution', async () => {
  const f = fixture(); await f.submit();
  assert.equal(f.calls.length, 1); assert.equal(f.events.length, 2);
  assert.equal(f.events[0][1], 'generate_lead'); assert.equal(f.events[1][1], 'Lead');
  const url = new URL(f.navigation[0]);
  assert.equal(url.searchParams.get('utm_source'), 'review');
  assert.equal(url.searchParams.get('niche'), 'hardscape');
  assert.equal(url.searchParams.get('src'), 'ig-playbook');
  assert.equal(f.timers.size, 0);
});

test('invalid client input never fetches or tracks', async () => {
  const f = fixture({ invalid: true }); await f.submit();
  assert.equal(f.calls.length, 0); assert.equal(f.events.length, 0); assert.equal(f.navigation.length, 0);
});

test('server rejection preserves fields and focuses the invalid input', async () => {
  const f = fixture({ status: 400, response: { ok: false, error: 'Invalid email', fieldErrors: { email: 'Enter a valid email.' } } });
  await f.submit(); assert.equal(f.field.value, 'preserved@example.test'); assert.equal(f.field.focused, true);
  assert.equal(f.field.error, 'Enter a valid email.'); assert.equal(f.events.length, 0); assert.equal(f.navigation.length, 0);
  f.handlers.input({ target: f.field }); assert.equal(f.field.error, ''); assert.equal(f.button.disabled, false);
});

test('HTTP 200 without ok:true cannot redirect or track', async () => {
  for (const response of [{ ok: false }, {}, null]) {
    const f = fixture({ response }); await f.submit();
    assert.equal(f.navigation.length, 0); assert.equal(f.events.length, 0);
  }
});

test('spam and localhost submissions cannot emit conversion events', async () => {
  for (const options of [{ response: { ok: true, spam: true } }, { host: 'localhost' }]) {
    const f = fixture(options); await f.submit(); assert.equal(f.events.length, 0); assert.equal(f.navigation.length, 1);
  }
});

test('analytics errors never turn confirmed capture into an error', async () => {
  const f = fixture({ analyticsThrows: true }); await f.submit();
  assert.equal(f.navigation.length, 1); assert.equal(f.message.textContent, '');
});

test('pending double submits share one request and a browser timeout restores controls', async () => {
  const f = fixture({ fetcher: (url, options) => new Promise((resolve, reject) => options.signal.addEventListener('abort', () => reject(Object.assign(new Error('timeout'), { name: 'AbortError' })))) });
  const first = f.submit(); await f.submit(); assert.equal(f.calls.length, 1);
  const timer = [...f.timers.values()][0]; assert.equal(timer.ms, 35_000); timer.fn(); await first;
  assert.equal(f.button.disabled, false); assert.match(f.message.textContent, /before submitting again/);
  assert.equal(f.events.length, 0); assert.equal(f.navigation.length, 0); assert.equal(f.timers.size, 0);
});

test('confirmation pages and pixel script do not produce lead events on navigation', () => {
  for (const file of ['thanks/index.html', 'playbook-thanks/index.html', 'assets/meta-pixel.js']) {
    const text = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
    assert.doesNotMatch(text, /gtag\('event', 'generate_lead'|fbq\('track', 'Lead'|gtag\('event', 'conversion'/);
  }
});
