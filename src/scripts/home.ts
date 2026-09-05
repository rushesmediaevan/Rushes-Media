import { setupHeroMedia } from './hero-media.mjs';

declare global {
  interface Window {
    __RUSHES_DISABLE_THIRD_PARTY__?: boolean;
  }
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
if (mobileMenu instanceof HTMLDialogElement && menuButton && closeButton) {
  let previousOverflow = '';
  let restoreFocus = true;
  const closeMenu = (restore = true) => {
    restoreFocus = restore;
    if (mobileMenu.open) mobileMenu.close();
  };
  menuButton.addEventListener('click', () => {
    if (mobileMenu.open) return;
    previousOverflow = document.body.style.overflow;
    restoreFocus = true;
    mobileMenu.showModal();
    mobileMenu.classList.add('on');
    menuButton.setAttribute('aria-expanded', 'true');
    document.body.classList.add('mob-open');
    document.body.style.overflow = 'hidden';
    closeButton.focus();
  });
  closeButton.addEventListener('click', () => closeMenu());
  mobileMenu.addEventListener('cancel', () => { restoreFocus = true; });
  mobileMenu.addEventListener('close', () => {
    mobileMenu.classList.remove('on');
    menuButton.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('mob-open');
    document.body.style.overflow = previousOverflow;
    if (restoreFocus) menuButton.focus();
  });
  mobileMenu.querySelectorAll('a').forEach((anchor) => {
    anchor.addEventListener('click', () => closeMenu(false));
  });
  window.matchMedia('(min-width: 961px)').addEventListener('change', (event) => {
    if (event.matches) closeMenu(false);
  });
}

const floatingCta = document.getElementById('fcta');
const heroButtons = document.querySelector('.hero-btns');
if (floatingCta && heroButtons && 'IntersectionObserver' in window) {
  let heroVisible = true;
  let closeVisible = false;
  const updateFloatingCta = () => {
    const visible = !heroVisible && !closeVisible;
    // Do not hide the link while a keyboard user is actively using it.
    if (!visible && floatingCta.contains(document.activeElement)) return;
    floatingCta.classList.toggle('on', visible);
    floatingCta.inert = !visible;
    floatingCta.setAttribute('aria-hidden', String(!visible));
  };
  floatingCta.addEventListener('focusout', () => queueMicrotask(updateFloatingCta));
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
