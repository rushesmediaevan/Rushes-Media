import { setupHeroMedia } from './hero-media.mjs';

declare global {
  interface Window {
    __RUSHES_DISABLE_THIRD_PARTY__?: boolean;
  }
}

const cursor = document.getElementById('cur');
if (cursor) {
  document.addEventListener('mousemove', (event) => {
    cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px) translate(-50%, -50%)`;
  });
  document.querySelectorAll('a,button,.svc-row,.faq-q').forEach((element) => {
    element.addEventListener('mouseenter', () => cursor.classList.add('big'));
    element.addEventListener('mouseleave', () => cursor.classList.remove('big'));
  });
}

const navigation = document.getElementById('nav');
if (navigation) {
  window.addEventListener(
    'scroll',
    () => navigation.classList.toggle('on', window.scrollY > 40),
    { passive: true },
  );
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
if (floatingCta && heroButtons) {
  new IntersectionObserver((entries) => {
    floatingCta.classList.toggle('on', !entries[0]?.isIntersecting);
  }).observe(heroButtons);
}

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
document.querySelectorAll('.r').forEach((element) => revealObserver.observe(element));

document.querySelectorAll<HTMLButtonElement>('.faq-q').forEach((question) => {
  question.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      question.click();
    }
  });
  question.addEventListener('click', () => {
    const item = question.closest('.faq-item');
    if (!item) return;
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach((openItem) => {
      openItem.classList.remove('open');
      openItem.querySelector('.faq-q')?.setAttribute('aria-expanded', 'false');
      openItem.querySelector('.faq-a')?.setAttribute('aria-hidden', 'true');
    });
    if (!wasOpen) {
      item.classList.add('open');
      question.setAttribute('aria-expanded', 'true');
      item.querySelector('.faq-a')?.setAttribute('aria-hidden', 'false');
    }
  });
});

const bookingFrame = document.querySelector<HTMLIFrameElement>('#rushes-growth-call-calendar');
if (bookingFrame) {
  const incoming = new URLSearchParams(window.location.search);
  const target = new URL(bookingFrame.src);
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']) {
    const value = incoming.get(key);
    if (value) target.searchParams.set(key, value.slice(0, 120));
  }
  bookingFrame.src = target.toString();
}

const hostname = window.location.hostname.toLowerCase();
const localHost =
  hostname === 'localhost' ||
  hostname === '127.0.0.1' ||
  hostname === '[::1]' ||
  hostname.endsWith('.test');
if (!localHost && window.__RUSHES_DISABLE_THIRD_PARTY__ !== true) {
  const formEmbed = document.createElement('script');
  formEmbed.src = 'https://link.msgsndr.com/js/form_embed.js';
  formEmbed.type = 'text/javascript';
  formEmbed.async = false;
  const appendExternalTracking = () => {
    const externalTracking = document.createElement('script');
    externalTracking.src = 'https://link.msgsndr.com/js/external-tracking.js';
    const trackingId = document.body.dataset.trackingId;
    if (trackingId) externalTracking.dataset.trackingId = trackingId;
    externalTracking.async = true;
    document.body.appendChild(externalTracking);
  };
  formEmbed.addEventListener('load', appendExternalTracking, { once: true });
  formEmbed.addEventListener('error', appendExternalTracking, { once: true });
  document.body.appendChild(formEmbed);
}

export {};
