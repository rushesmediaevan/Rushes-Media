/**
 * Meta (Facebook) pixel — single source for rushesmedia.com.
 *
 * EVAN — 2-MINUTE SETUP:
 *   1. Meta Events Manager → Connect Data Sources → Web → create pixel.
 *   2. Paste the pixel ID into META_PIXEL_ID below. Redeploy.
 *
 * Until the ID is set this file is a no-op — safe to ship.
 * PageView fires on every page that includes this script.
 * Lead fires automatically on /thanks/ (form submitted) and /playbook-thanks/.
 */

(function () {
  var META_PIXEL_ID = ''; // ← EVAN: paste pixel ID here, e.g. '1234567890123456'

  if (!META_PIXEL_ID) return;

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

  var p = location.pathname;
  if (p.indexOf('/thanks') === 0 || p.indexOf('/playbook-thanks') === 0) {
    fbq('track', 'Lead');
  }
})();
