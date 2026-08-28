(() => {
  'use strict';

  const root = document.querySelector('[data-work-concept]');
  if (!root) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const revealItems = [...root.querySelectorAll('.work-reveal')];
  if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('work-is-visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('work-is-visible');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  }

  const nav = root.querySelector('.work-nav');
  const syncNav = () => nav?.classList.toggle('work-nav-scrolled', window.scrollY > 70);
  syncNav();
  window.addEventListener('scroll', syncNav, { passive: true });

  const film = root.querySelector('[data-work-film]');
  const motionToggle = root.querySelector('[data-work-motion-toggle]');
  if (film instanceof HTMLVideoElement && motionToggle instanceof HTMLButtonElement) {
    let manualPause = false;
    let reducedMotionOptIn = false;

    const syncFilmControl = () => {
      const paused = film.paused;
      motionToggle.textContent = paused ? 'Play film' : 'Pause film';
      motionToggle.setAttribute('aria-pressed', String(paused));
      motionToggle.setAttribute('aria-label', paused ? 'Play background film' : 'Pause background film');
    };

    const requestPlayback = async () => {
      if (manualPause || document.hidden || (reducedMotion.matches && !reducedMotionOptIn)) {
        film.pause();
        syncFilmControl();
        return;
      }
      try {
        await film.play();
      } catch {
        film.pause();
      }
      syncFilmControl();
    };

    film.addEventListener('play', syncFilmControl);
    film.addEventListener('pause', syncFilmControl);
    motionToggle.addEventListener('click', async () => {
      if (film.paused) {
        manualPause = false;
        reducedMotionOptIn = true;
        try {
          await film.play();
        } catch {
          film.pause();
        }
      } else {
        manualPause = true;
        film.pause();
      }
      syncFilmControl();
    });

    const onMotionPreferenceChange = () => {
      if (reducedMotion.matches && !reducedMotionOptIn) film.pause();
      else void requestPlayback();
      syncFilmControl();
    };
    reducedMotion.addEventListener?.('change', onMotionPreferenceChange);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) film.pause();
      else void requestPlayback();
      syncFilmControl();
    });

    syncFilmControl();
    void requestPlayback();
  }

  root.querySelectorAll('[data-work-slider]').forEach((slider) => {
    const clip = slider.querySelector('[data-work-slider-clip]');
    const handle = slider.querySelector('[data-work-slider-handle]');
    const startingImage = slider.querySelector('[data-work-slider-image]');
    if (!(clip instanceof HTMLElement) || !(handle instanceof HTMLElement) || !(startingImage instanceof HTMLImageElement)) return;

    const fitStartingImage = () => {
      startingImage.style.width = `${slider.getBoundingClientRect().width}px`;
    };
    const setPosition = (value) => {
      const position = Math.max(2, Math.min(98, value));
      clip.style.width = `${position}%`;
      handle.style.left = `${position}%`;
      const rounded = Math.round(position);
      handle.setAttribute('aria-valuenow', String(rounded));
      handle.setAttribute(
        'aria-valuetext',
        `${rounded}% starting concept and ${100 - rounded}% finished concept`,
      );
    };
    const positionFromPointer = (event) => {
      const bounds = slider.getBoundingClientRect();
      if (!bounds.width) return;
      setPosition(((event.clientX - bounds.left) / bounds.width) * 100);
    };

    let activePointer = null;
    slider.addEventListener('pointerdown', (event) => {
      activePointer = event.pointerId;
      slider.setPointerCapture?.(event.pointerId);
      handle.focus({ preventScroll: true });
      positionFromPointer(event);
    });
    slider.addEventListener('pointermove', (event) => {
      if (activePointer !== event.pointerId) return;
      positionFromPointer(event);
    });
    const releasePointer = (event) => {
      if (activePointer !== event.pointerId) return;
      slider.releasePointerCapture?.(event.pointerId);
      activePointer = null;
    };
    slider.addEventListener('pointerup', releasePointer);
    slider.addEventListener('pointercancel', releasePointer);

    handle.addEventListener('keydown', (event) => {
      const current = Number(handle.getAttribute('aria-valuenow')) || 50;
      const keyPositions = {
        ArrowLeft: current - 4,
        ArrowDown: current - 4,
        ArrowRight: current + 4,
        ArrowUp: current + 4,
        Home: 2,
        End: 98,
      };
      if (!(event.key in keyPositions)) return;
      event.preventDefault();
      setPosition(keyPositions[event.key]);
    });

    fitStartingImage();
    window.addEventListener('resize', fitStartingImage, { passive: true });
  });

  root.querySelectorAll('[data-work-demo-form]').forEach((form) => {
    if (!(form instanceof HTMLFormElement)) return;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const button = form.querySelector('button[type="submit"]');
      const note = form.querySelector('[data-work-form-note]');
      form.reset();
      if (button instanceof HTMLButtonElement) {
        button.disabled = true;
        button.textContent = 'Interaction reviewed';
      }
      if (note) note.textContent = 'Demo complete—no data was sent, saved, tracked, or booked.';
    });
  });
})();
