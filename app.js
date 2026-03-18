/* ══════════════════════════════════════════════════════════════
   RUSHES MEDIA — app.js
   All data, templates, and DOM logic
   ══════════════════════════════════════════════════════════════ */

const CALENDLY_URL = "https://calendar.app.google/r3ZC3H5nSfqVoGLL8";
const LOGO_ICON = "LOGO ITSELF/Rushes logo 2.png";
const LOGO_WORDMARK = "JUST WORDS/LOGO W WORDS.png";

const BRAND_MARKS = [
  "carosel images/MPM Color (1).png",
  "carosel images/Rushes 3 fix copy.png",
  "carosel images/The estate blue-WHITHOUT TREES copy.png",
  "carosel images/pngfile2 copy.png",
  "carosel images/portfolio copy.jpg",
  "carosel images/reach for it all text.png",
];

/* ── DATA ── */

const SERVICES = [
  {
    n: "01",
    title: "Demand Generation",
    desc: "We create consistent inbound demand through targeted advertising, creative campaigns, and strategic positioning that attracts high-intent prospects.",
    points: ["Meta & Google advertising", "Campaign strategy", "Offer positioning"],
  },
  {
    n: "02",
    title: "Media & Creative Production",
    desc: "High-quality photo and video content designed to perform in advertising environments and build trust with potential customers.",
    points: ["Commercial video production", "Brand photography", "Ad creative"],
  },
  {
    n: "03",
    title: "Lead Capture & Conversion",
    desc: "Traffic alone does not produce revenue. We design optimized landing pages and lead funnels that convert attention into qualified opportunities.",
    points: ["Landing pages", "Lead funnels", "Conversion optimization"],
  },
  {
    n: "04",
    title: "Growth Infrastructure",
    desc: "We install the operational systems that ensure every lead is captured, tracked, and followed up with immediately — so nothing falls through the cracks.",
    points: ["Automated lead routing", "Booking systems", "Performance tracking"],
  },
];

const WHY_US = [
  {
    n: "01",
    title: "Integrated by Design",
    desc: "Ads, content, and systems built to work together. Every campaign fuels a larger system that compounds — not a collection of disconnected tactics.",
  },
  {
    n: "02",
    title: "Speed to Revenue",
    desc: "From strategy call to live campaign in days, not months. Every week without a system is a week of lost revenue your competitors are capturing.",
  },
  {
    n: "03",
    title: "Built Around You",
    desc: "No cookie-cutter playbooks. Every system is architected around your business, your clients, and your market — then optimized relentlessly against real data.",
  },
];

const PROCESS = [
  {
    n: "01",
    t: "Growth Strategy",
    d: "We analyze your current marketing, sales process, and customer acquisition channels to identify the highest-leverage growth opportunities.",
    dur: "30 min call",
  },
  {
    n: "02",
    t: "System Build",
    d: "We design and install the growth infrastructure — campaigns, creative assets, landing pages, and lead conversion systems.",
    dur: "1–2 weeks",
  },
  {
    n: "03",
    t: "Launch & Optimize",
    d: "Campaigns go live and demand generation begins. We continuously test and improve campaigns, creative, and conversion rates.",
    dur: "Ongoing",
  },
];

const FAQ = [
  {
    q: "What businesses are the right fit?",
    a: "Established service companies that want to generate more qualified leads and implement a structured growth system. This often includes landscaping, remodeling, exterior services, and other premium local service businesses.",
  },
  {
    q: "What do you actually manage?",
    a: "The full growth system — advertising campaigns, creative production, landing pages, lead funnels, automated follow-up, and performance optimization.",
  },
  {
    q: "Do you run advertising campaigns?",
    a: "Yes. Advertising is one part of the system we build and manage. Campaigns are continuously optimized to improve lead quality and reduce acquisition cost.",
  },
  {
    q: "How quickly can results start?",
    a: "Most campaigns begin generating data within the first few weeks. Optimization continues over time to improve lead quality and revenue impact.",
  },
  {
    q: "What makes you different from other agencies?",
    a: "We build the full system — not just ads. Demand generation, media production, conversion infrastructure, and automated follow-up all under one roof. You work directly with the people building your system.",
  },
];

/* ── TEMPLATE BUILDERS ── */

const app = document.getElementById("app");

const servicesHtml = SERVICES.map(
  (s) => `
  <article class="card reveal">
    <span class="card-num">${s.n}</span>
    <div class="card-rule"></div>
    <h3>${s.title}</h3>
    <p>${s.desc}</p>
    <ul>
      ${s.points.map((point) => `<li>${point}</li>`).join("")}
    </ul>
  </article>
`
).join("");

const whyHtml = WHY_US.map(
  (w) => `
  <article class="why-card reveal">
    <span class="why-num">${w.n}</span>
    <h3>${w.title}</h3>
    <p>${w.desc}</p>
  </article>
`
).join("");

const processHtml = PROCESS.map(
  (p) => `
  <article class="step-card reveal">
    <span class="step-num">${p.n}</span>
    <h3>${p.t}</h3>
    <p>${p.d}</p>
    <span class="step-duration">${p.dur}</span>
  </article>
`
).join("");

const faqHtml = FAQ.map(
  (f, i) => `
  <details class="faq-item" ${i === 0 ? "open" : ""}>
    <summary>${f.q}</summary>
    <p>${f.a}</p>
  </details>
`
).join("");

const logosHtml = BRAND_MARKS.map(
  (src) =>
    `<div class="logo-tile"><img src="${src}" alt="Rushes Media brand mark" loading="lazy"></div>`
).join("");

/* ── FULL PAGE TEMPLATE ── */

app.innerHTML = `
  <header class="site-header" id="top">
    <div class="wrap header-inner">
      <a class="brand" href="#top" aria-label="Rushes Media home">
        <img class="brand-icon" src="${LOGO_ICON}" alt="Rushes Media logo">
      </a>
      <nav class="nav-links" aria-label="Main navigation">
        <a href="#services">Services</a>
        <a href="#why-us">Why Us</a>
        <a href="#process">Process</a>
        <a href="#results">Results</a>
        <a href="#faq">FAQ</a>
      </nav>
      <a class="btn btn-primary nav-cta" href="${CALENDLY_URL}" target="_blank" rel="noopener noreferrer">Book a Strategy Call</a>
    </div>
  </header>

  <main>

    <!-- HERO -->
    <section class="hero section" id="home">
      <div class="hero-glow" aria-hidden="true"></div>
      <div class="wrap hero-inner">
        <img class="hero-wordmark" src="${LOGO_WORDMARK}" alt="Rushes Media">
        <span class="label" style="text-align:center;">Growth Systems for Established Businesses</span>
        <h1>Build a better system for consistent revenue growth.</h1>
        <p class="hero-sub">Rushes Media builds and manages growth systems that generate qualified demand, convert leads into booked jobs, and support consistent monthly revenue.</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="${CALENDLY_URL}" target="_blank" rel="noopener noreferrer">Book a Strategy Call</a>
          <a class="btn btn-secondary" href="#process">See How It Works</a>
        </div>
        <p class="trust-line">Serving premium service businesses across South Jersey & Philadelphia</p>
      </div>
    </section>

    <!-- SOCIAL PROOF -->
    <section class="social-proof">
      <div class="wrap">
        Focused on qualified demand, stronger close rates, and consistent monthly growth.
      </div>
    </section>

    <!-- SERVICES -->
    <section class="section" id="services">
      <div class="wrap">
        <span class="label reveal">The Growth System</span>
        <h2 class="reveal">Four layers. One engine.</h2>
        <p class="section-sub reveal">Every part of the system is aligned to one outcome: revenue growth you can track.</p>
        <div class="cards-grid reveal-stagger">${servicesHtml}</div>
      </div>
    </section>

    <!-- WHY US — dark navy -->
    <section class="section section-dark" id="why-us">
      <div class="wrap">
        <span class="label reveal">Why Rushes Media</span>
        <h2 class="heading-light reveal">The full stack. No shortcuts.</h2>
        <p class="section-sub sub-light reveal">Most agencies do one thing. We build the entire engine.</p>
        <div class="why-grid reveal-stagger">${whyHtml}</div>
      </div>
    </section>

    <!-- PROCESS -->
    <section class="section section-alt" id="process">
      <div class="wrap">
        <span class="label reveal">How It Works</span>
        <h2 class="reveal">Simple process. Serious execution.</h2>
        <div class="steps-grid reveal-stagger">${processHtml}</div>
        <div class="section-cta reveal">
          <a class="btn btn-primary" href="${CALENDLY_URL}" target="_blank" rel="noopener noreferrer">Book Your Strategy Call</a>
        </div>
      </div>
    </section>

    <!-- RESULTS -->
    <section class="section" id="results">
      <div class="wrap">
        <span class="label reveal">Results</span>
        <h2 class="reveal">A better system produces better results.</h2>
        <div class="metrics-grid reveal-stagger">
          <article class="reveal"><h3>&lt; 60s</h3><p>Lead response time with automated follow-up</p></article>
          <article class="reveal"><h3>24/7</h3><p>Lead capture and routing systems running continuously</p></article>
          <article class="reveal"><h3>Weekly</h3><p>Campaign optimization cycles on ads and conversion flow</p></article>
        </div>
      </div>
    </section>

    <!-- ABOUT -->
    <section class="section section-dark" id="about">
      <div class="wrap" style="text-align:center;">
        <span class="label reveal">About Rushes Media</span>
        <h2 class="heading-light reveal">A focused team built for growth execution.</h2>
        <p class="section-sub sub-light reveal" style="max-width:620px;margin:0 auto;">
          Unlike traditional agencies that focus only on marketing activity, we build the infrastructure behind modern growth — combining demand generation, high-quality media, and structured lead systems into a single operating framework. No bloated agency process. No unnecessary complexity. Clear strategy. Direct execution. Measurable results.
        </p>
      </div>
    </section>

    <!-- MISSION -->
    <section class="section mission" id="approach">
      <div class="wrap" style="text-align:center;">
        <span class="label reveal">Our Approach</span>
        <div class="gold-rule reveal"></div>
        <p class="mission-quote reveal">"We build the systems that turn great businesses into brands nobody can ignore."</p>
        <p class="mission-body reveal">You've built something real. Your brand should prove it. We come in as your integrated growth partner — not just a vendor — and build the demand generation, media, and lead infrastructure that drives consistent inbound revenue.</p>
        <a class="btn btn-primary reveal" href="${CALENDLY_URL}" target="_blank" rel="noopener noreferrer">Start the Conversation</a>
      </div>
    </section>

    <!-- FAQ -->
    <section class="section" id="faq">
      <div class="wrap">
        <span class="label reveal">FAQ</span>
        <h2 class="reveal">Common Questions</h2>
        <div class="faq-list reveal">${faqHtml}</div>
      </div>
    </section>

    <!-- FINAL CTA — dark navy -->
    <section class="section section-dark final-cta" id="contact">
      <div class="wrap">
        <h2 class="heading-light reveal">Ready to build a better system for growth?</h2>
        <p class="section-sub sub-light reveal" style="max-width:480px;margin:0 auto 32px;">Book a strategy call and we'll walk through the highest-impact opportunities for your business.</p>
        <a class="btn btn-light btn-large reveal" href="${CALENDLY_URL}" target="_blank" rel="noopener noreferrer">Book Your Strategy Call</a>
        <span class="final-cta-note reveal">Free · Confidential · Zero obligation</span>
      </div>
    </section>

    <!-- BRAND HERITAGE CAROUSEL -->
    <section class="section logo-band">
      <div class="wrap">
        <span class="label">Brand Heritage</span>
        <div class="carousel-fade">
          <div class="carousel-track" aria-label="Brand heritage carousel">
            <div class="carousel-row">${logosHtml}</div>
            <div class="carousel-row" aria-hidden="true">${logosHtml}</div>
          </div>
        </div>
      </div>
    </section>

  </main>

  <footer class="footer">
    <div class="wrap footer-inner">
      <div class="footer-col">
        <p>Growth systems for businesses that refuse to blend in.</p>
      </div>
      <div class="footer-col">
        <a href="#services">Services</a>
        <a href="#why-us">Why Us</a>
        <a href="#process">Process</a>
        <a href="#results">Results</a>
        <a href="#faq">FAQ</a>
      </div>
      <div class="footer-col">
        <a href="mailto:evan@rushesmedia.com">evan@rushesmedia.com</a>
        <span>South Jersey & Philadelphia</span>
      </div>
    </div>
    <div class="footer-bottom">&copy; 2026 Rushes Media. All rights reserved.</div>
  </footer>
`;

/* ══════════════════════════════════════════
   SCRIPTS — scroll reveal + nav shadow
   ══════════════════════════════════════════ */

// Scroll reveal via IntersectionObserver
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

// Nav shadow on scroll
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

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener("click", function (e) {
    var target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      var offset = 80;
      var top =
        target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: top, behavior: "smooth" });
    }
  });
});
