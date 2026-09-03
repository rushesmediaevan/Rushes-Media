import { setupHeroMedia } from './hero-media.mjs';

declare global {
  interface Window {
    __RUSHES_DISABLE_THIRD_PARTY__?: boolean;
  }
}

const cursor = document.getElementById('cur');
if (cursor) {
  let cursorFrame = 0;
  let cursorX = 0;
  let cursorY = 0;
  document.addEventListener('mousemove', (event) => {
    cursorX = event.clientX;
    cursorY = event.clientY;
    if (cursorFrame) return;
    cursorFrame = window.requestAnimationFrame(() => {
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
      cursorFrame = 0;
    });
  }, { passive: true });
  document.querySelectorAll('a,button,.v3-chapter,.v3-range-card,.faq-q').forEach((element) => {
    element.addEventListener('mouseenter', () => cursor.classList.add('big'));
    element.addEventListener('mouseleave', () => cursor.classList.remove('big'));
  });
}

const navigation = document.getElementById('nav');
if (navigation) {
  const syncNavigationSurface = () => navigation.classList.toggle('on', window.scrollY > 40);
  window.addEventListener(
    'scroll',
    syncNavigationSurface,
    { passive: true },
  );
  syncNavigationSurface();
}

const hero = document.getElementById('hero');
const heroVideo = document.querySelector<HTMLVideoElement>('.hero-video');
const heroToggle = document.querySelector<HTMLButtonElement>('.hero-media-toggle');
if (hero && heroVideo && heroToggle) {
  setupHeroMedia({ hero, video: heroVideo, toggle: heroToggle });
}

const mobileMenu = document.getElementById('mob');
const menuButton = document.getElementById('burger');
const closeButton = document.getElementById('mob-x');
if (mobileMenu && menuButton && closeButton) {
  const openMenu = () => {
    mobileMenu.removeAttribute('inert');
    mobileMenu.classList.add('on');
    mobileMenu.setAttribute('aria-hidden', 'false');
    menuButton.setAttribute('aria-expanded', 'true');
    document.body.classList.add('mob-open');
    document.body.style.overflow = 'hidden';
    closeButton.focus();
  };
  const closeMenu = (restoreFocus = true) => {
    mobileMenu.classList.remove('on');
    mobileMenu.setAttribute('aria-hidden', 'true');
    mobileMenu.setAttribute('inert', '');
    menuButton.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('mob-open');
    document.body.style.overflow = '';
    if (restoreFocus) menuButton.focus();
  };
  menuButton.addEventListener('click', openMenu);
  closeButton.addEventListener('click', () => closeMenu());
  mobileMenu.querySelectorAll('a').forEach((anchor) => {
    anchor.addEventListener('click', () => closeMenu(false));
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobileMenu.classList.contains('on')) closeMenu();
  });
  mobileMenu.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    const focusable = [
      ...mobileMenu.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
    ];
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  });
}

const floatingCta = document.getElementById('fcta');
const heroButtons = document.querySelector('.hero-btns');
if (floatingCta && heroButtons && 'IntersectionObserver' in window) {
  let heroVisible = true;
  let closeVisible = false;
  const updateFloatingCta = () => floatingCta.classList.toggle('on', !heroVisible && !closeVisible);
  const heroObserver = new IntersectionObserver((entries) => {
    heroVisible = Boolean(entries[0]?.isIntersecting);
    updateFloatingCta();
  });
  const closeObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      entry.target.classList.toggle('fv', entry.isIntersecting);
    }
    closeVisible = Boolean(document.querySelector('.fv'));
    updateFloatingCta();
  }, { rootMargin: '0px 0px -35% 0px' });
  heroObserver.observe(heroButtons);
  document.querySelectorAll('#system, #examples, #cta, footer').forEach((element) => closeObserver.observe(element));
}

const revealElements = document.querySelectorAll('.r');
const revealSupported =
  'IntersectionObserver' in window &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (revealSupported && revealElements.length > 0) {
  try {
    document.documentElement.classList.add('reveal-enabled');
    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            revealObserver.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.08 },
    );
    revealElements.forEach((element) => revealObserver.observe(element));
  } catch {
    document.documentElement.classList.remove('reveal-enabled');
  }
}

const hostname = window.location.hostname.toLowerCase();
const localHost =
  hostname === 'localhost' ||
  hostname === '127.0.0.1' ||
  hostname === '[::1]' ||
  hostname.endsWith('.test');
if (!localHost && window.__RUSHES_DISABLE_THIRD_PARTY__ !== true) {
  const externalTracking = document.createElement('script');
  externalTracking.src = 'https://link.msgsndr.com/js/external-tracking.js';
  const trackingId = document.body.dataset.trackingId;
  if (trackingId) externalTracking.dataset.trackingId = trackingId;
  externalTracking.async = true;
  document.body.appendChild(externalTracking);
}

export {};
