const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { runInNewContext } = require('node:vm');
const { join } = require('node:path');
const source = readFileSync(join(__dirname, '../src/layouts/ArticleLayout.astro'), 'utf8').match(/<script is:inline>([\s\S]*?)<\/script>/)[1];

function setup(host = 'rushesmedia.com', analytics = true, shared = false) {
  const events = [];
  const clicks = [], attrs = new Map();
  class Element {
    constructor(href, next = false) { this.href = href; this.next = next; }
    closest(selector) { return selector === 'a[href]' ? this : this.next ? this : null; }
    getAttribute(name) { return name === 'href' ? this.href : null; }
    hasAttribute() { return false; }
  }
  const location = new URL(`https://${host}/articles/example/?email=private@example.com`);
  const context = { location, URL, Element, document: { querySelector: () => null, documentElement: {getAttribute: k => attrs.get(k), setAttribute: (k,v) => attrs.set(k,v)}, addEventListener: (_, fn) => clicks.push(fn) }, window: analytics ? { gtag: (...args) => events.push(args) } : {} };
  if (shared) {
    const base = readFileSync(join(__dirname, '../src/layouts/BaseLayout.astro'), 'utf8').match(/<script is:inline data-growth-call-tracking>([\s\S]*?)<\/script>/)[1];
    runInNewContext(base, context);
  }
  runInNewContext(source, context);
  return { events, fire: (href, next) => clicks.forEach(click => click({ target: new Element(href, next) })) };
}

test('both deployed listeners together emit exactly one attributed booking click', () => {
  const s = setup('rushesmedia.com', true, true);
  s.fire('https://rushesmedia.com/?email=private@example.com#book', true);
  assert.equal(s.events.length, 1);
  assert.equal(s.events[0][1], 'growth_call_click');
  assert.equal(s.events[0][2].article_slug, 'example');
  assert.ok(!JSON.stringify(s.events).includes('private'));
});

test('article handler leaves booking intent to shared tracker', () => {
  const s = setup(); s.fire('https://rushesmedia.com/?email=private@example.com#book', true);
  assert.equal(s.events.length, 0);
  assert.ok(!JSON.stringify(s.events).includes('private'));
});
test('service movement is distinct; external and unrelated links are ignored', () => {
  const s = setup();
  s.fire('https://elsewhere.example/#book'); s.fire('https://rushesmedia.com/privacy/');
  assert.equal(s.events.length, 0);
  s.fire('https://rushesmedia.com/brand-media/');
  assert.equal(s.events[0][1], 'article_service_click');
  assert.equal(s.events[0][2].article_slug, 'example');
  assert.ok(!JSON.stringify(s.events).includes('private'));
});
test('local hosts and unavailable analytics never block navigation or emit', () => {
  for (const host of ['localhost', '127.0.0.1', '[::1]', 'preview.test']) {
    const s = setup(host); s.fire(`https://${host}/#book`); assert.equal(s.events.length, 0);
  }
  const s = setup('rushesmedia.com', false); s.fire('https://rushesmedia.com/#book');
  assert.equal(s.events.length, 0);
});
