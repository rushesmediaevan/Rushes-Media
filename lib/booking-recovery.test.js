const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '../src/scripts/booking-widget.mjs'), 'utf8');

function fixture() {
  const timers = new Map();
  let nextTimer = 0;
  const listeners = {};
  class Element {
    constructor(attrs = {}) { this.attrs = { ...attrs }; this.listeners = {}; this.classList = { contains: () => false }; }
    getAttribute(key) { return this.attrs[key] ?? null; }
    setAttribute(key, value) { this.attrs[key] = value; }
    removeAttribute(key) { delete this.attrs[key]; }
    addEventListener(type, handler) { this.listeners[type] = handler; }
    emit(type) { this.listeners[type]?.({ currentTarget: this }); }
    focus() { document.activeElement = this; }
    getBoundingClientRect() { return { width: 800, height: 820, right: 800 }; }
  }
  class Frame extends Element {
    constructor(attrs) { super(attrs); this.contentWindow = { location: { href: 'https://calendar.example/widget' } }; }
    cloneNode() { return new Frame(this.attrs); }
    replaceWith(next) { currentFrame = next; }
  }
  class Anchor extends Element { constructor() { super(); this.href = 'https://calendar.example/widget'; } }
  let currentFrame = new Frame({ 'data-booking-src': 'https://calendar.example/widget' });
  const direct = new Anchor(), retry = new Element(), status = new Element(), shell = new Element(), fallback = new Element();
  const widget = new Element();
  widget.querySelector = (selector) => ({
    '[data-booking-frame]': currentFrame, '[data-booking-direct]': direct, '[data-booking-retry]': retry,
    '[data-booking-status]': status, '[data-booking-state]': shell, '[data-booking-fallback]': fallback,
  })[selector];
  const document = { querySelectorAll: () => [widget], documentElement: new Element(), addEventListener() {}, activeElement: null };
  const navigator = { onLine: true };
  const window = {
    addEventListener: (type, callback) => { listeners[type] = callback; },
    setTimeout: (callback) => { timers.set(++nextTimer, callback); return nextTimer; },
    clearTimeout: (id) => timers.delete(id), requestAnimationFrame: (callback) => callback(),
    getComputedStyle: () => ({
      display: ['delayed', 'offline', 'unavailable'].includes(shell.getAttribute('data-booking-state')) ? 'none' : 'block',
      visibility: 'visible', opacity: '1',
    }),
  };
  vm.runInNewContext(source, { document, window, navigator, URL, Element, HTMLIFrameElement: Frame, HTMLAnchorElement: Anchor, location: new URL('https://rushes.example/') });
  return {
    frame: () => currentFrame, state: () => shell.getAttribute('data-booking-state'), retry, direct, document,
    ready: (origin = 'https://calendar.example', sourceWindow = currentFrame.contentWindow) => listeners.message({ origin, source: sourceWindow, data: '[iFrameResizerChild]Ready' }),
    timeout: () => { for (const [id, cb] of [...timers]) { timers.delete(id); cb(); } },
    offline: () => { navigator.onLine = false; listeners.offline(); },
    online: () => { navigator.onLine = true; listeners.online(); },
  };
}

test('frame load alone cannot report calendar readiness', () => {
  const f = fixture(); f.frame().emit('load');
  assert.equal(f.state(), 'frame-loaded');
  f.ready('https://wrong.example');
  f.ready('https://calendar.example', {});
  assert.equal(f.state(), 'frame-loaded');
  f.ready(); assert.equal(f.state(), 'ready');
});

test('late authenticated ready recovers from timeout and owned hidden-frame CSS', () => {
  const f = fixture(); f.frame().emit('load'); f.timeout();
  assert.equal(f.state(), 'delayed'); assert.equal(f.retry.hidden, false);
  f.ready(); assert.equal(f.state(), 'ready'); assert.equal(f.retry.hidden, true);
});

test('retry replaces the iframe and rejects stale ready events', () => {
  const f = fixture(); const stale = f.frame(); stale.emit('load'); f.timeout();
  f.retry.focus(); f.retry.emit('click');
  assert.notEqual(f.frame(), stale); assert.equal(f.state(), 'loading');
  assert.equal(f.document.activeElement, f.direct);
  f.ready('https://calendar.example', stale.contentWindow);
  f.frame().emit('load'); assert.equal(f.state(), 'frame-loaded');
  f.ready(); assert.equal(f.state(), 'ready');
});

test('offline state can interrupt ready and reconnect with a fresh attempt', () => {
  const f = fixture(); f.frame().emit('load'); f.ready();
  f.offline(); assert.equal(f.state(), 'offline');
  f.online(); assert.equal(f.state(), 'loading');
  f.frame().emit('load'); f.ready(); assert.equal(f.state(), 'ready');
});

test('retry has its own timeout and remains usable after repeated failure', () => {
  const f = fixture(); f.frame().emit('error'); assert.equal(f.state(), 'unavailable');
  f.retry.emit('click'); f.timeout(); assert.equal(f.state(), 'delayed');
  f.retry.emit('click'); f.frame().emit('load'); f.ready(); assert.equal(f.state(), 'ready');
});
