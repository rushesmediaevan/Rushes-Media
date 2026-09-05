/**
 * Meta (Facebook) pixel — single source for rushesmedia.com.
 *
 * EVAN — 2-MINUTE SETUP:
 *   1. Meta Events Manager → Connect Data Sources → Web → create pixel.
 *   2. Paste the pixel ID into META_PIXEL_ID below. Redeploy.
 *
 * Until the ID is set this file is a no-op — safe to ship.
 * PageView fires on every page that includes this script.
 * Lead fires only after confirmed API capture, through form-runtime.js.
 * The $1,000 test optimizes Instant Form leads, not /thanks. After paste+deploy,
 * still wire GHL CAPI Schedule on Growth Call book. Never paste the MPM pixel.
 * Brief: systems/outreach/RUSHES-ACQUISITION-1000-TEST-2026-08-13.md
 */

(function () {
  var META_PIXEL_ID = '1626816695538983'; // ← EVAN: paste pixel ID here, e.g. '1234567890123456'
  var LOCAL_HOSTS = ['localhost', '127.0.0.1', '[::1]'];
  var isTestHost = window.location.hostname.toLowerCase().endsWith('.test');

  if (!META_PIXEL_ID || isTestHost || LOCAL_HOSTS.indexOf(window.location.hostname) !== -1) return;

  /* Meta base code */
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  fbq('init', META_PIXEL_ID);
  fbq('track', 'PageView');

})();
