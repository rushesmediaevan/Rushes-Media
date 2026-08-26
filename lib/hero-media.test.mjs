import test from 'node:test';
import assert from 'node:assert/strict';
import { setupHeroMedia } from '../src/scripts/hero-media.mjs';

class FakeClassList {
  constructor() {
    this.values = new Set();
  }

  add(value) {
    this.values.add(value);
  }

  remove(value) {
    this.values.delete(value);
  }

  toggle(value, force) {
    if (force) this.values.add(value);
    else this.values.delete(value);
  }

  contains(value) {
    return this.values.has(value);
  }
}

class FakeEventTarget {
  constructor() {
    this.listeners = new Map();
  }

  addEventListener(type, listener) {
    const listeners = this.listeners.get(type) || [];
    listeners.push(listener);
    this.listeners.set(type, listeners);
  }

  emit(type) {
    for (const listener of this.listeners.get(type) || []) listener();
  }
}

class FakeVideo extends FakeEventTarget {
  constructor() {
    super();
    this.paused = true;
    this.playCount = 0;
    this.rejectPlayback = false;
  }

  play() {
    this.playCount += 1;
    if (this.rejectPlayback) return Promise.reject(new Error('autoplay refused'));
    this.paused = false;
    return Promise.resolve();
  }

  pause() {
    const changed = !this.paused;
    this.paused = true;
    if (changed) this.emit('pause');
  }

  forcePause() {
    this.paused = true;
    this.emit('pause');
  }
}

class FakeToggle extends FakeEventTarget {
  constructor() {
    super();
    this.attributes = new Map();
  }

  setAttribute(name, value) {
    this.attributes.set(name, value);
  }

  getAttribute(name) {
    return this.attributes.get(name);
  }
}

const flushPromises = async () => {
  await Promise.resolve();
  await Promise.resolve();
};

const createFixture = (reducedMotion = false) => {
  const hero = { classList: new FakeClassList() };
  const video = new FakeVideo();
  const toggle = new FakeToggle();
  const documentRef = new FakeEventTarget();
  documentRef.hidden = false;
  const windowRef = {
    matchMedia: () => ({ matches: reducedMotion }),
  };
  return { hero, video, toggle, documentRef, windowRef };
};

test('reduced-motion starts on the poster and allows explicit playback', async () => {
  const fixture = createFixture(true);
  setupHeroMedia(fixture);

  assert.equal(fixture.video.playCount, 0);
  assert.equal(fixture.hero.classList.contains('video-still'), true);
  assert.equal(fixture.toggle.getAttribute('aria-label'), 'Play background video');

  fixture.toggle.emit('click');
  await flushPromises();
  assert.equal(fixture.video.playCount, 1);
  assert.equal(fixture.video.paused, false);
  assert.equal(fixture.hero.classList.contains('motion-opt-in'), true);
  assert.equal(fixture.hero.classList.contains('video-still'), false);
});

test('manual pause blocks visibility restart until explicit play', async () => {
  const fixture = createFixture();
  setupHeroMedia(fixture);
  await flushPromises();

  fixture.toggle.emit('click');
  assert.equal(fixture.video.paused, true);
  assert.equal(fixture.toggle.getAttribute('aria-pressed'), 'true');
  fixture.documentRef.emit('visibilitychange');
  assert.equal(fixture.video.playCount, 1);

  fixture.toggle.emit('click');
  await flushPromises();
  assert.equal(fixture.video.playCount, 2);
  assert.equal(fixture.video.paused, false);
});

test('rejected autoplay reveals the poster and allows an explicit retry', async () => {
  const fixture = createFixture();
  fixture.video.rejectPlayback = true;
  setupHeroMedia(fixture);
  await flushPromises();

  assert.equal(fixture.hero.classList.contains('video-still'), true);
  assert.equal(fixture.toggle.getAttribute('aria-label'), 'Play background video');
  fixture.documentRef.emit('visibilitychange');
  assert.equal(fixture.video.playCount, 1);

  fixture.video.rejectPlayback = false;
  fixture.toggle.emit('click');
  await flushPromises();
  assert.equal(fixture.video.playCount, 2);
  assert.equal(fixture.video.paused, false);
});

test('involuntary pause resumes when the visible page becomes active', async () => {
  const fixture = createFixture();
  setupHeroMedia(fixture);
  await flushPromises();

  fixture.video.forcePause();
  assert.equal(fixture.hero.classList.contains('video-still'), true);
  fixture.documentRef.emit('visibilitychange');
  await flushPromises();
  assert.equal(fixture.video.playCount, 2);
  assert.equal(fixture.video.paused, false);
  assert.equal(fixture.hero.classList.contains('video-still'), false);
});
