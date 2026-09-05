(() => {
  const localHosts = ['localhost', '127.0.0.1', '[::1]'];
  const host = location.hostname.toLowerCase();
  const isLocalHost = localHosts.includes(host) || host.endsWith('.test');
  const suppressAnalytics = isLocalHost;
  const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'];

  const emit = (name, parameters) => {
    if (suppressAnalytics || typeof window.gtag !== 'function') return;
    window.gtag('event', name, parameters);
  };

  document.querySelectorAll('[data-booking-widget]').forEach((widget) => {
    if (widget.getAttribute('data-booking-ready') === 'true') return;
    widget.setAttribute('data-booking-ready', 'true');

    let frame = widget.querySelector('[data-booking-frame]');
    const retry = widget.querySelector('[data-booking-retry]');
    const direct = widget.querySelector('[data-booking-direct]');
    const status = widget.querySelector('[data-booking-status]');
    const shell = widget.querySelector('[data-booking-state]');
    const fallback = widget.querySelector('[data-booking-fallback]');
    const route = widget.getAttribute('data-booking-route') || location.pathname;
    if (!(frame instanceof HTMLIFrameElement) || !(direct instanceof HTMLAnchorElement)) return;

    const destination = new URL(frame.getAttribute('data-booking-src') || direct.href, location.href);
    const incoming = new URL(location.href);
    for (const key of keys) {
      const value = incoming.searchParams.get(key);
      if (value) destination.searchParams.set(key, value.slice(0,120));
    }
    const target = destination.toString();
    direct.href = target;

    const analyticsContext = { booking_route: route };
    if (widget.classList.contains('booking-widget--industry')) analyticsContext.industry_route = route;
    const bookingCopy = {
      frameOpened: widget.getAttribute('data-booking-copy-frame-opened') || status?.textContent || '',
      ready: widget.getAttribute('data-booking-copy-ready') || status?.textContent || '',
      delayed: widget.getAttribute('data-booking-copy-delayed') || status?.textContent || '',
      offline: widget.getAttribute('data-booking-copy-offline') || status?.textContent || '',
      unavailable: widget.getAttribute('data-booking-copy-unavailable') || status?.textContent || '',
    };
    let frameResponded = false;
    let frameVisible = false;
    let embedReadySignal = false;
    let targetNavigationStarted = false;
    let monitorStarted = false;
    let ready = false;
    let attempt = 0;
    let loadObserver;
    let timeoutId;
    const setState = (state, message) => {
      shell?.setAttribute('data-booking-state', state);
      shell?.setAttribute('aria-busy', String(state === 'loading' || state === 'frame-loaded'));
      fallback?.setAttribute('aria-hidden', String(!['delayed', 'offline', 'unavailable'].includes(state)));
      if (status) status.textContent = message;
      if (retry) {
        const showRetry = ['delayed', 'offline', 'unavailable'].includes(state);
        if (!showRetry && document.activeElement === retry) direct.focus();
        retry.hidden = !showRetry;
      }
    };

    const maybeReady = () => {
      if (ready || !frameResponded || !frameVisible || !embedReadySignal) return;
      ready = true;
      if (timeoutId) window.clearTimeout(timeoutId);
      setState('ready', bookingCopy.ready);
    };

    window.addEventListener('message', (event) => {
      if (ready || event.source !== frame.contentWindow || event.origin !== destination.origin) return;
      if (typeof event.data !== 'string') return;
      const isEmbedSignal = event.data === '[iFrameResizerChild]Ready' || event.data.startsWith('[iFrameSizer]');
      if (!isEmbedSignal) return;
      embedReadySignal = true;
      confirmFrameVisibility();
    });

    const showUnavailable = (state, message) => {
      ready = false;
      if (timeoutId) window.clearTimeout(timeoutId);
      setState(state, message);
    };

    const confirmFrameVisibility = () => {
      if (ready || !frameResponded || !embedReadySignal) return;
      // Clear our own failure CSS before measuring a genuinely late response.
      setState('frame-loaded', bookingCopy.frameOpened);
      const style = window.getComputedStyle(frame);
      const rect = frame.getBoundingClientRect();
      const hiddenByEmbedRuntime = frame.getAttribute('data-initial-iframe-hidden') === 'true';
      frameVisible = !hiddenByEmbedRuntime
        && style.display !== 'none'
        && style.visibility !== 'hidden'
        && Number.parseFloat(style.opacity || '1') > 0
        && rect.width >= 240
        && rect.height >= 300
        && rect.right > 0;
      if (frameVisible) maybeReady();
      else showUnavailable('unavailable', bookingCopy.unavailable);
    };

    const startMonitor = () => {
      if (monitorStarted || ready) return;
      monitorStarted = true;
      timeoutId = window.setTimeout(() => {
        if (ready) return;
        showUnavailable('delayed', bookingCopy.delayed);
      }, 8000);
    };

    const startEmbed = () => {
      if (ready || targetNavigationStarted) return;
      if ('IntersectionObserver' in window) {
        loadObserver = new IntersectionObserver((entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          startMonitor();
          loadObserver.disconnect();
        }, { rootMargin: '700px 0px' });
        loadObserver.observe(widget);
      } else {
        startMonitor();
      }
      targetNavigationStarted = true;
      frame.setAttribute('src', target);
    };

    const startForEnvironment = async () => {
      const currentAttempt = attempt;
      if (navigator.onLine === false) {
        showUnavailable('offline', bookingCopy.offline);
        return;
      }
      if (!isLocalHost) {
        startEmbed();
        return;
      }
      const controller = new AbortController();
      const healthTimeout = window.setTimeout(() => controller.abort(), 1500);
      try {
        const response = await fetch('/api/health', {
          headers: { Accept: 'application/json' },
          cache: 'no-store',
          signal: controller.signal,
        });
        const health = await response.json();
        if (currentAttempt !== attempt) return;
        if (!response.ok || health?.ok !== true || health?.ghlConfigured !== true) {
          showUnavailable('unavailable', bookingCopy.unavailable);
          return;
        }
        startEmbed();
      } catch {
        if (currentAttempt === attempt) showUnavailable('unavailable', bookingCopy.unavailable);
      } finally {
        window.clearTimeout(healthTimeout);
      }
    };

    const bindFrame = () => {
    const boundFrame = frame;
    frame.addEventListener('load', () => {
      if (ready || boundFrame !== frame) return;
      if (!targetNavigationStarted) return;
      try {
        if (!frame.contentWindow || frame.contentWindow.location.href === 'about:blank') return;
      } catch {}
      frameResponded = true;
      setState('frame-loaded', bookingCopy.frameOpened);
      startMonitor();
      window.requestAnimationFrame(() => window.requestAnimationFrame(confirmFrameVisibility));
    });
    frame.addEventListener('error', () => {
      if (boundFrame === frame) showUnavailable('unavailable', bookingCopy.unavailable);
    });
    };
    bindFrame();

    const retryEmbed = () => {
      attempt += 1;
      if (timeoutId) window.clearTimeout(timeoutId);
      loadObserver?.disconnect();
      ready = frameResponded = frameVisible = embedReadySignal = targetNavigationStarted = monitorStarted = false;
      const replacement = frame.cloneNode(false);
      replacement.removeAttribute('src');
      replacement.removeAttribute('data-initial-iframe-hidden');
      frame.replaceWith(replacement);
      frame = replacement;
      bindFrame();
      setState('loading', bookingCopy.frameOpened);
      void startForEnvironment();
    };
    retry?.addEventListener('click', retryEmbed);
    window.addEventListener('online', () => {
      if (shell?.getAttribute('data-booking-state') === 'offline') retryEmbed();
    });

    window.addEventListener('offline', () => {
      frameResponded = embedReadySignal = false;
      showUnavailable('offline', bookingCopy.offline);
    });

    document.addEventListener('securitypolicyviolation', (event) => {
      if (!event.blockedURI || !event.blockedURI.includes(destination.origin)) return;
      showUnavailable('unavailable', bookingCopy.unavailable);
    });

    void startForEnvironment();

    if (document.documentElement.getAttribute('data-booking-click-ready') !== 'true') {
      document.documentElement.setAttribute('data-booking-click-ready', 'true');
      document.addEventListener('click', (event) => {
        const link = event.target instanceof Element
          ? event.target.closest('[data-growth-call-click], a[href="#book"]')
          : null;
        if (!link) return;
        const inferredLocation = link.closest('.hero-btns')
          ? 'hero'
          : link.closest('#mob')
            ? 'mobile-navigation'
            : link.closest('#nav, .editorial-nav, .industry-nav')
              ? 'navigation'
              : link.closest('#fcta')
                ? 'floating'
                : link.closest('footer')
                  ? 'footer'
                  : 'unknown';
        emit('growth_call_click', {
          ...analyticsContext,
          link_location: link.getAttribute('data-link-location') || inferredLocation,
        });
      });
    }

    if ('IntersectionObserver' in window) {
      let sent = false;
      const observer = new IntersectionObserver((entries) => {
        if (sent || !entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.5)) return;
        sent = true;
        emit('booking_section_view', { ...analyticsContext, visibility_threshold: 50 });
        observer.disconnect();
      }, { threshold: [0.5] });
      observer.observe(widget);
    }
  });
})();
