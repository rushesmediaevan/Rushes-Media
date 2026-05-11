/* ══════════════════════════════════════════════════════════════
   RUSHES MEDIA — components.js
   HTML template builders — pure functions, no side effects
   ══════════════════════════════════════════════════════════════ */

export function servicesHtml(data) {
  return data.map((s) => `
  <article class="card reveal">
    <span class="card-num">${s.n}</span>
    <div class="card-rule"></div>
    <h3>${s.title}</h3>
    <p>${s.desc}</p>
    <ul>
      ${s.points.map((point) => `<li>${point}</li>`).join("")}
    </ul>
  </article>
`).join("");
}

export function whyHtml(data) {
  return data.map((w) => `
  <article class="why-card reveal">
    <span class="why-num">${w.n}</span>
    <h3>${w.title}</h3>
    <p>${w.desc}</p>
  </article>
`).join("");
}

export function processHtml(data) {
  return data.map((p) => `
  <article class="step-card reveal">
    <span class="step-num">${p.n}</span>
    <h3>${p.t}</h3>
    <p>${p.d}</p>
    <span class="step-duration">${p.dur}</span>
  </article>
`).join("");
}

export function faqHtml(data) {
  return data.map((f, i) => `
  <details class="faq-item" ${i === 0 ? "open" : ""}>
    <summary>${f.q}</summary>
    <p>${f.a}</p>
  </details>
`).join("");
}

export function logosHtml(marks) {
  return marks.map((src) =>
    `<div class="logo-tile"><img src="${src}" alt="Rushes Media brand mark" loading="lazy"></div>`
  ).join("");
}

export function pageHtml({ calendlyUrl, logoIcon, logoWordmark, services, why, process, faq, logos }) {
  return `
  <header class="site-header" id="top">
    <div class="wrap header-inner">
      <a class="brand" href="#top" aria-label="Rushes Media home">
        <img class="brand-icon" src="${logoIcon}" alt="Rushes Media logo">
      </a>
      <nav class="nav-links" aria-label="Main navigation">
        <a href="#services">Services</a>
        <a href="#why-us">Why Us</a>
        <a href="#process">Process</a>
        <a href="#results">Results</a>
        <a href="#faq">FAQ</a>
      </nav>
      <a class="btn btn-primary nav-cta" href="${calendlyUrl}" target="_blank" rel="noopener noreferrer">Book a Strategy Call</a>
    </div>
  </header>

  <main>

    <!-- HERO -->
    <section class="hero section" id="home">
      <div class="hero-glow" aria-hidden="true"></div>
      <div class="wrap hero-inner">
        <img class="hero-wordmark" src="${logoWordmark}" alt="Rushes Media">
        <span class="label" style="text-align:center;">Growth Systems for Established Businesses</span>
        <h1>Build a better system for consistent revenue growth.</h1>
        <p class="hero-sub">Rushes Media builds and manages growth systems that generate qualified demand, convert leads into booked jobs, and support consistent monthly revenue.</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="${calendlyUrl}" target="_blank" rel="noopener noreferrer">Book a Strategy Call</a>
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
        <div class="cards-grid reveal-stagger">${services}</div>
      </div>
    </section>

    <!-- WHY US -->
    <section class="section section-dark" id="why-us">
      <div class="wrap">
        <span class="label reveal">Why Rushes Media</span>
        <h2 class="heading-light reveal">The full stack. No shortcuts.</h2>
        <p class="section-sub sub-light reveal">Most agencies do one thing. We build the entire engine.</p>
        <div class="why-grid reveal-stagger">${why}</div>
      </div>
    </section>

    <!-- PROCESS -->
    <section class="section section-alt" id="process">
      <div class="wrap">
        <span class="label reveal">How It Works</span>
        <h2 class="reveal">Simple process. Serious execution.</h2>
        <div class="steps-grid reveal-stagger">${process}</div>
        <div class="section-cta reveal">
          <a class="btn btn-primary" href="${calendlyUrl}" target="_blank" rel="noopener noreferrer">Book Your Strategy Call</a>
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
        <a class="btn btn-primary reveal" href="${calendlyUrl}" target="_blank" rel="noopener noreferrer">Start the Conversation</a>
      </div>
    </section>

    <!-- FAQ -->
    <section class="section" id="faq">
      <div class="wrap">
        <span class="label reveal">FAQ</span>
        <h2 class="reveal">Common Questions</h2>
        <div class="faq-list reveal">${faq}</div>
      </div>
    </section>

    <!-- FINAL CTA -->
    <section class="section section-dark final-cta" id="contact">
      <div class="wrap">
        <h2 class="heading-light reveal">Ready to build a better system for growth?</h2>
        <p class="section-sub sub-light reveal" style="max-width:480px;margin:0 auto 32px;">Book a strategy call and we'll walk through the highest-impact opportunities for your business.</p>
        <a class="btn btn-light btn-large reveal" href="${calendlyUrl}" target="_blank" rel="noopener noreferrer">Book Your Strategy Call</a>
        <span class="final-cta-note reveal">Free · Confidential · Zero obligation</span>
      </div>
    </section>

    <!-- BRAND HERITAGE CAROUSEL -->
    <section class="section logo-band">
      <div class="wrap">
        <span class="label">Brand Heritage</span>
        <div class="carousel-fade">
          <div class="carousel-track" aria-label="Brand heritage carousel">
            <div class="carousel-row">${logos}</div>
            <div class="carousel-row" aria-hidden="true">${logos}</div>
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
}
