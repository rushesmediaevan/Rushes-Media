/* ══════════════════════════════════════════════════════════════
   RUSHES MEDIA — main.js
   Imports, rendering, and interactions
   ══════════════════════════════════════════════════════════════ */

import { CALENDLY_URL, LOGO_ICON, LOGO_WORDMARK, BRAND_MARKS, SERVICES, WHY_US, PROCESS, FAQ } from "./data.js";
import { servicesHtml, whyHtml, processHtml, faqHtml, logosHtml, pageHtml } from "./components.js";

/* ── Render ── */

const app = document.getElementById("app");

app.innerHTML = pageHtml({
  calendlyUrl: CALENDLY_URL,
  logoIcon: LOGO_ICON,
  logoWordmark: LOGO_WORDMARK,
  services: servicesHtml(SERVICES),
  why: whyHtml(WHY_US),
  process: processHtml(PROCESS),
  faq: faqHtml(FAQ),
  logos: logosHtml(BRAND_MARKS),
});

/* ── Scroll reveal via IntersectionObserver ── */

(function () {
  var reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
  );

  reveals.forEach(function (el) {
    observer.observe(el);
  });
})();

/* ── Nav shadow on scroll ── */

(function () {
  var header = document.querySelector(".site-header");
  if (!header) return;

  var wasScrolled = false;
  window.addEventListener(
    "scroll",
    function () {
      var isScrolled = window.scrollY > 16;
      if (isScrolled !== wasScrolled) {
        wasScrolled = isScrolled;
        header.classList.toggle("scrolled", isScrolled);
      }
    },
    { passive: true }
  );
})();

/* ── Smooth scroll for anchor links ── */

document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener("click", function (e) {
    var target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      var offset = 80;
      var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: top, behavior: "smooth" });
    }
  });
});
