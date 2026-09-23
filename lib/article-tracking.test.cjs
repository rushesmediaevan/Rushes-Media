const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { runInNewContext } = require('node:vm');
const { join } = require('node:path');
const source = readFileSync(join(__dirname, '../src/layouts/ArticleLayout.astro'), 'utf8').match(/<script is:inline>([\s\S]*?)<\/script>/)[1];

function setup(host = 'rushesmedia.com', analytics = true) {
  const events = [];
  let click;
  class Element {
    constructor(href, next = false) { this.href = href; this.next = next; }
    closest(selector) { return selector === 'a[href]' ? this : this.next ? this : null; }
  }
  const location = new URL(`https://${host}/articles/example/?email=private@example.com`);
  runInNewContext(source, { location, URL, Element, document: { addEventListener: (_, fn) => { click = fn; } }, window: analytics ? { gtag: (...args) => events.push(args) } : {} });
  return { events, fire: (href, next) => click?.({ target: new Element(href, next) }) };
}

test('article booking intent emits one click, not a lead or booking, without query data', () => {
  const s = setup(); s.fire('https://rushesmedia.com/?email=private@example.com#book', true);
  assert.equal(s.events.length, 1);
  assert.equal(s.events[0][1], 'growth_call_click');
  assert.equal(s.events[0][2].article_slug, 'example');
  assert.equal(s.events[0][2].link_location, 'article-next-step');
  assert.equal(s.events[0][2].destination_path, '/#book');
  assert.ok(!JSON.stringify(s.events).includes('private'));
});
test('service movement is distinct; external and unrelated links are ignored', () => {
  const s = setup();
  s.fire('https://elsewhere.example/#book'); s.fire('https://rushesmedia.com/privacy/');
  assert.equal(s.events.length, 0);
  s.fire('https://rushesmedia.com/brand-media/');
  assert.equal(s.events[0][1], 'article_service_click');
});
test('local hosts and unavailable analytics never block navigation or emit', () => {
  for (const host of ['localhost', '127.0.0.1', '[::1]', 'preview.test']) {
    const s = setup(host); s.fire(`https://${host}/#book`); assert.equal(s.events.length, 0);
  }
  const s = setup('rushesmedia.com', false); s.fire('https://rushesmedia.com/#book');
  assert.equal(s.events.length, 0);
});
