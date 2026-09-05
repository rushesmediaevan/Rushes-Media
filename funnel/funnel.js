/**
 * Config-driven niche landing page — load niches/{id}.json, render sections, submit to /api/lead
 */

(function () {
  const NICHE =
    window.__RUSHES_NICHE_ID__ ||
    new URLSearchParams(location.search).get('niche') ||
    '';

  const root = document.getElementById('funnel-root');
  const loading = document.getElementById('funnel-loading');

  if (!NICHE) {
    renderFallback(
      'Choose the right path for your market.',
      'This compatibility route needs a market selection. You can return to the industry guide or open the 30-minute Growth Call calendar now.',
    );
    return;
  }

  const configUrl = `/funnel/niches/${encodeURIComponent(NICHE)}.json`;

  fetch(configUrl)
    .then((r) => {
      if (!r.ok) throw new Error('config');
      return r.json();
    })
    .then((cfg) => {
      if (loading) loading.remove();
      document.title = cfg.meta?.title || 'Rushes Media';
      const desc = document.querySelector('meta[name="description"]');
      if (desc && cfg.meta?.description) desc.setAttribute('content', cfg.meta.description);
      render(cfg);
    })
    .catch(() => {
      renderFallback(
        'That market page is not available.',
        'The link may be outdated. Return to the industry guide or open the 30-minute Growth Call calendar directly.',
      );
    });

  function esc(s) {
    return String(s ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/"/g, '&quot;');
  }

  function directBookingUrl(cfg) {
    const base = cfg.calendarUrl || cfg.thanks?.calendarUrl || 'https://api.leadconnectorhq.com/widget/booking/1GUofnPSyYefy2VOSxKO';
    const target = new URL(base);
    const incoming = new URL(location.href);
    for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']) {
      const value = incoming.searchParams.get(key);
      if (value) target.searchParams.set(key, value.slice(0,120));
    }
    return target.toString();
  }

  function renderFallback(headline, detail) {
    if (loading) loading.remove();
    if (!root) return;
    const bookingUrl = directBookingUrl({});
    root.innerHTML = `
      <nav class="f-nav">
        <a href="/" class="f-logo" aria-label="Rushes Media home">
          <img src="/assets/images/logo-icon.png" alt="" />
          <img src="/assets/images/logo-wordmark.png" alt="Rushes Media" class="wm" />
        </a>
        <a href="${esc(bookingUrl)}" target="_blank" rel="noopener" class="f-nav-cta">Book a Growth Call</a>
      </nav>
      <header class="f-hero">
        <p class="f-eyebrow">Rushes Media</p>
        <h1>${esc(headline)}</h1>
        <p class="sub">${esc(detail)}</p>
        <a href="${esc(bookingUrl)}" target="_blank" rel="noopener" class="f-hero-cta">Open the 30-minute calendar ↗</a>
      </header>
      <section class="f-section">
        <div class="f-section-inner">
          <h2>Explore by buying model.</h2>
          <p class="f-note"><a href="/industries/">View the Rushes industry guide →</a></p>
        </div>
      </section>
      <footer class="f-foot">© ${new Date().getFullYear()} Rushes Media · rushesmedia.com</footer>
    `;
  }

  function render(cfg) {
    const bookingUrl = directBookingUrl(cfg);
    const steps = (cfg.mechanism?.steps || [])
      .map((s) => `<span class="f-step">${esc(s)}</span>`)
      .join('');

    const problems = (cfg.problems?.items || [])
      .map(
        (p) =>
          `<article class="f-problem"><h3>${esc(p.title)}</h3><p>${esc(p.body)}</p></article>`
      )
      .join('');

    const proofSlots = (cfg.proof?.slots || [])
      .map(
        (s) => `<div class="f-proof-slot">
          <p class="label">${esc(s.label)}</p>
          <p class="status">${esc(s.status)}</p>
          <p>${esc(s.text)}</p>
        </div>`
      )
      .join('');

    const offerCards = (cfg.offer?.paths || [])
      .map(
        (p) => `<article class="f-offer-card">
          <h3>${esc(p.name)}</h3>
          <p class="price">${esc(p.price)}</p>
          <p>${esc(p.detail)}</p>
        </article>`
      )
      .join('');

    const processSteps = (cfg.process?.steps || [])
      .map(
        (s, i) => `<div class="f-process-step">
          <p class="num">0${i + 1}</p>
          <h3>${esc(s.label)}</h3>
          <p>${esc(s.body)}</p>
        </div>`
      )
      .join('');

    const faq = (cfg.faq?.items || [])
      .map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`)
      .join('');

    root.innerHTML = `
      <nav class="f-nav">
        <a href="/" class="f-logo" aria-label="Rushes Media home">
          <img src="/assets/images/logo-icon.png" alt="" />
          <img src="/assets/images/logo-wordmark.png" alt="Rushes Media" class="wm" />
        </a>
        <a href="${esc(bookingUrl)}" target="_blank" rel="noopener" class="f-nav-cta">${esc(cfg.cta?.primary || 'Growth Call')}</a>
      </nav>

      <header class="f-hero">
        <p class="f-eyebrow">${esc(cfg.hero?.eyebrow)}</p>
        <h1>${esc(cfg.hero?.headline)}</h1>
        <p class="sub">${esc(cfg.hero?.subhead)}</p>
        <p class="f-trust">${esc(cfg.hero?.trustLine)}</p>
        <a href="${esc(bookingUrl)}" target="_blank" rel="noopener" class="f-hero-cta">${esc(cfg.cta?.primary)} ↗</a>
      </header>

      <section class="f-section"><div class="f-section-inner">
        <h2>${esc(cfg.whoItsFor?.title)}</h2>
        <ul class="f-list">${(cfg.whoItsFor?.items || []).map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
      </div></section>

      <section class="f-section"><div class="f-section-inner">
        <h2>${esc(cfg.problems?.title)}</h2>
        <div class="f-problems">${problems}</div>
      </div></section>

      <section class="f-section"><div class="f-section-inner">
        <h2>${esc(cfg.mechanism?.title)}</h2>
        <div class="f-mechanism-steps">${steps}</div>
        <p class="f-mechanism-tag">${esc(cfg.mechanism?.tagline)}</p>
      </div></section>

      <section class="f-section"><div class="f-section-inner">
        <h2>${esc(cfg.offer?.title)}</h2>
        <div class="f-offer-grid">${offerCards}</div>
        <p class="f-note">${esc(cfg.offer?.note)}</p>
        ${cfg.offer?.partnerNote ? `<p class="f-note" style="margin-top:12px">${esc(cfg.offer.partnerNote)}</p>` : ''}
      </div></section>

      <section class="f-section"><div class="f-section-inner">
        <h2>${esc(cfg.proof?.title)}</h2>
        <div class="f-proof-grid">${proofSlots}</div>
        <p class="f-proof-disclaimer">${esc(cfg.proof?.disclaimer)}</p>
      </div></section>

      <section class="f-section"><div class="f-section-inner">
        <h2>${esc(cfg.process?.title)}</h2>
        <div class="f-process">${processSteps}</div>
      </div></section>

      <section class="f-section"><div class="f-section-inner f-qual-grid">
        <div class="f-qual">
          <h3>${esc(cfg.qualification?.fitTitle)}</h3>
          <ul class="f-list">${(cfg.qualification?.fit || []).map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
        </div>
        <div class="f-qual">
          <h3>${esc(cfg.qualification?.notFitTitle)}</h3>
          <ul class="f-list">${(cfg.qualification?.notFit || []).map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
        </div>
      </div></section>

      <section class="f-section"><div class="f-section-inner f-faq">
        <h2>${esc(cfg.faq?.title)}</h2>
        ${faq}
      </div></section>

      <section class="f-section f-form-section" id="project-details">
        <div class="f-section-inner f-form-wrap">
          <h2>${esc(cfg.cta?.formTitle)}</h2>
          <p class="f-form-sub">${esc(cfg.cta?.formSub)}</p>
          <form class="f-form" id="lead-form" method="post" action="/api/lead">
            <div class="f-hp" aria-hidden="true">
              <label>Website<input type="text" name="website" tabindex="-1" autocomplete="off" /></label>
            </div>
            <div class="f-field">
              <label for="name">Name</label>
              <input id="name" name="name" maxlength="200" type="text" required autocomplete="name" />
            </div>
            <div class="f-field">
              <label for="business">Business name</label>
              <input id="business" name="business" maxlength="200" type="text" required autocomplete="organization" />
            </div>
            <div class="f-field">
              <label for="phone">Phone</label>
              <input id="phone" name="phone" maxlength="32" type="tel" required autocomplete="tel" />
            </div>
            <div class="f-field">
              <label for="email">Email</label>
              <input id="email" name="email" maxlength="254" type="email" required autocomplete="email" />
            </div>
            <div class="f-field">
              <label for="need">${esc(cfg.form?.needLabel)}</label>
              <textarea id="need" name="need" maxlength="1000" required placeholder="${esc(cfg.form?.needPlaceholder)}"></textarea>
            </div>
            <div class="f-field">
              <label for="sms_consent" style="display:flex;gap:.5rem;align-items:flex-start;font-weight:400;font-size:.78rem;line-height:1.45;cursor:pointer;text-transform:none;letter-spacing:normal;">
                <input id="sms_consent" name="sms_consent" type="checkbox" value="yes" style="margin-top:.25rem;flex:none;width:auto;" />
                <span>Text me about my request at the number above. Msg &amp; data rates may apply, message frequency varies. Reply STOP to opt out, HELP for help. Consent isn't a condition of purchase.</span>
              </label>
            </div>
            <button type="submit" class="f-submit">Send project details</button>
            <p class="f-form-msg" id="form-msg" role="status"></p>
          </form>
          <div class="f-secondary">
            <strong>Prefer to choose a time now?</strong> <a href="${esc(bookingUrl)}" target="_blank" rel="noopener">Open the 30-minute Growth Call calendar ↗</a><br />
            <span>${esc(cfg.cta?.secondaryLabel)} — ${esc(cfg.cta?.secondaryNote)}</span>
          </div>
        </div>
      </section>

      <footer class="f-foot">© ${new Date().getFullYear()} Rushes Media · rushesmedia.com</footer>
    `;

    bindForm(cfg);
  }

  function bindForm(cfg) {
    const form = document.getElementById('lead-form');
    const msg = document.getElementById('form-msg');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      msg.textContent = '';
      msg.className = 'f-form-msg';


      const fd = new FormData(form);
      const payload = {
        niche: cfg.id,
        name: fd.get('name'),
        business: fd.get('business'),
        phone: fd.get('phone'),
        email: fd.get('email'),
        need: fd.get('need'),
        website: fd.get('website'),
        sms_consent: fd.get('sms_consent') === 'yes' ? 'yes' : 'no',
        source_url: location.href.slice(0, 300),
        calendarUrl: cfg.thanks?.calendarUrl || cfg.calendarUrl || '',
      };

      const thanks = new URL(cfg.thanks?.path || '/thanks/', location.origin);
      thanks.searchParams.set('niche', cfg.id);
      await window.RushesForms.submit({ form, endpoint: '/api/lead', payload, message: msg,
        destination: thanks.toString(), source: cfg.id || 'site_form' });
    });
  }
})();
