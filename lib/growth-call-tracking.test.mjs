import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
import assert from 'node:assert/strict';

const layout = readFileSync(new URL('../src/layouts/BaseLayout.astro', import.meta.url), 'utf8');
const source = layout.match(/<script is:inline data-growth-call-tracking>([\s\S]*?)<\/script>/)[1];
function fixture(host = 'rushesmedia.com', path = '/articles/guide/') {
  const events = [], listeners = [], attrs = new Map();
  const location = new URL(`https://${host}${path}`);
  const document = {
    documentElement: { getAttribute: k => attrs.get(k), setAttribute: (k, v) => attrs.set(k, v) },
    addEventListener: (name, listener) => listeners.push(listener),
    querySelector: () => null,
  };
  const context = vm.createContext({ document, location, URL, window: { gtag: (...args) => events.push(args) } });
  const run = () => vm.runInContext(source, context);
  const click = (href, explicit = false) => {
    const link = {
      getAttribute: name => name === 'href' ? href : null,
      hasAttribute: () => explicit,
      closest: selector => selector === '.article-next' ? {} : null,
    };
    listeners.forEach(listener => listener({ target: { closest: () => link } }));
  };
  return { events, listeners, run, click, context };
}
test('article and homepage booking anchors emit once with source route; nested targets work', () => {
  for (const [path, href] of [['/articles/guide/', '/#book'], ['/', '#book']]) {
    const f = fixture('rushesmedia.com', path);
    f.run(); f.run(); f.click(href);
    assert.equal(f.listeners.length, 1);
    assert.equal(f.events.length, 1);
    assert.equal(f.events[0][1], 'growth_call_click');
    assert.equal(f.events[0][2].booking_route, path);
    assert.equal(f.events[0][2].link_location, 'article');
  }
});
test('external and unrelated links never emit; explicit local controls do', () => {
  const f = fixture(); f.run();
  f.click('https://example.com/#book'); f.click('/web/'); f.click('tel:+16094059918');
  assert.equal(f.events.length, 0);
  f.click('/call/', true);
  assert.equal(f.events.length, 1);
});
test('local hosts and unavailable analytics are safe and never emit', () => {
  for (const host of ['localhost', '127.0.0.1', '[::1]', 'preview.test']) {
    const f = fixture(host); f.run(); f.click('/#book');
    assert.equal(f.events.length, 0);
  }
  const f = fixture(); f.context.window.gtag = undefined; f.run(); f.click('/#book');
  assert.equal(f.events.length, 0);
});
