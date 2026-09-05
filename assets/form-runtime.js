(function () {
  const pending = new WeakSet();
  const initialized = new WeakSet();
  const attributionKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'src'];

  function attributionUrl(destination) {
    const target = new URL(destination, location.origin);
    if (target.origin !== location.origin) throw new Error('Invalid confirmation destination');
    const incoming = new URL(location.href);
    for (const key of attributionKeys) {
      const value = incoming.searchParams.get(key);
      if (value) target.searchParams.set(key, value.slice(0, 120));
    }
    return target.toString();
  }

  async function trackCapture(source) {
    const host = location.hostname.toLowerCase();
    if (['localhost', '127.0.0.1', '[::1]'].includes(host) || host.endsWith('.test') || window.__RUSHES_DISABLE_THIRD_PARTY__ === true) return;
    // No contact data in analytics. Track capture, never booking or delivery.
    let queued = false;
    try {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', { lead_source: source, transport_type: 'beacon' });
        queued = true;
      }
    } catch { /* Analytics cannot turn a captured lead into a form failure. */ }
    try {
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Lead');
        queued = true;
      }
    } catch { /* The bounded navigation below still runs. */ }
    if (queued) await new Promise((resolve) => window.setTimeout(resolve, 750));
  }

  async function submit({ form, endpoint, payload, message, destination, source }) {
    if (!initialized.has(form)) {
      initialized.add(form);
      form.addEventListener('input', (event) => {
        if (typeof event.target?.setCustomValidity === 'function') {
          event.target.setCustomValidity('');
          event.target.removeAttribute('aria-invalid');
        }
      });
    }
    if (pending.has(form) || !form.reportValidity()) return;
    const target = attributionUrl(destination);
    pending.add(form);
    const button = form.querySelector('[type="submit"]');
    const originalLabel = button.textContent;
    message.textContent = '';
    message.classList.remove('on', 'err');
    form.setAttribute('aria-busy', 'true');
    button.disabled = true;
    button.textContent = 'Sending…';
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 35_000);
    try {
      const response = await fetch(endpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload), signal: controller.signal,
      });
      const result = await response.json();
      if (!response.ok || result?.ok !== true) {
        let firstInvalid;
        for (const [name, text] of Object.entries(result?.fieldErrors || {})) {
          const field = form.elements.namedItem(name);
          if (typeof field?.setCustomValidity !== 'function' || field.type === 'hidden') continue;
          field.setCustomValidity(String(text));
          field.setAttribute('aria-invalid', 'true');
          firstInvalid ||= field;
        }
        firstInvalid?.focus();
        firstInvalid?.reportValidity();
        throw new Error(result?.error === 'rate_limit'
          ? 'Too many attempts. Try again in an hour, or contact Rushes by phone or email.'
          : result?.error || 'Your request could not be confirmed. Please contact Rushes.');
      }
      window.clearTimeout(timeout);
      if (!result.spam) await trackCapture(String(source).slice(0, 80));
      location.assign(target);
    } catch (error) {
      message.textContent = error.name === 'AbortError'
        ? 'Your request is taking longer than expected. Contact Rushes before submitting again.'
        : error instanceof SyntaxError || error instanceof TypeError ? 'Your request could not be confirmed. Contact Rushes before submitting again.'
        : error.message || 'Unable to connect. Please contact Rushes before submitting again.';
      message.classList.add('on', 'err');
    } finally {
      window.clearTimeout(timeout);
      pending.delete(form);
      form.setAttribute('aria-busy', 'false');
      button.disabled = false;
      button.textContent = originalLabel;
    }
  }

  window.RushesForms = { submit, attributionUrl };
})();
