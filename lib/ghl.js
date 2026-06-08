/**
 * Minimal GHL API client for Railway playbook capture.
 * Env: RUSHES_GHL_PIT_TOKEN, RUSHES_GHL_LOCATION_ID
 */

const BASE = 'https://services.leadconnectorhq.com';

function headers(token) {
  return {
    Authorization: `Bearer ${token}`,
    Version: '2021-07-28',
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
}

async function ghlRequest(token, method, path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: headers(token),
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = { raw: text.slice(0, 500) };
  }
  if (!res.ok) {
    const msg = json.message || json.error || res.statusText;
    const err = new Error(`GHL ${method} ${path} → ${res.status}: ${msg}`);
    err.status = res.status;
    err.body = json;
    throw err;
  }
  return json;
}

module.exports = { ghlRequest };
