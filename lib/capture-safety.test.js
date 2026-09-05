const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { createRequire } = require('node:module');
const path = require('node:path');
const { validate } = require('./funnel-capture');
const { validatePayload } = require('./playbook-capture');

const lead = { name: 'Test Person', business: 'Example', phone: '6095550100', email: 'test@example.test', need: 'A new site', sms_consent: 'yes' };
const playbook = { firstName: 'Test', email: 'test@example.test', businessType: 'Home services / trades', mainGoal: 'More calls / estimates', src: 'ig-growth' };

function fixture(file, fail, respond) {
  const calls = [];
  const filename = path.join(__dirname, file);
  const localRequire = createRequire(filename);
  const fakeRequest = async (token, method, endpoint, body) => {
    calls.push({ method, endpoint, body });
    const failure = fail?.(endpoint, body, calls);
    if (failure) throw failure;
    const response = respond?.(endpoint);
    if (response !== undefined) return response;
    if (endpoint === '/contacts/upsert') return { contact: { id: 'mock-contact' } };
    if (endpoint.startsWith('/opportunities/search')) return { opportunities: [] };
    if (endpoint === '/opportunities/') return { opportunity: { id: 'mock-opportunity' } };
    return {};
  };
  const sandbox = {
    module: { exports: {} }, process: { env: { RUSHES_GHL_LOCATION_ID: 'mock', RUSHES_GHL_PIT_TOKEN: 'mock' } },
    require: (id) => id === './ghl' ? { ghlRequest: fakeRequest }
      : id === './playbook-capture' ? { loadGhlConfig: () => ({ loc: 'mock', token: 'mock' }) } : localRequire(id),
    console: { error() {} }, URL, Date, Buffer,
  };
  vm.runInNewContext(fs.readFileSync(filename, 'utf8'), sandbox, { filename });
  return { api: sandbox.module.exports, calls };
}

test('invalid shapes, types, oversized values and emails produce field errors without throwing', () => {
  for (const validator of [validate, validatePayload]) {
    for (const payload of [null, [], 'text', 3]) assert.ok(validator(payload).error);
  }
  for (const [field, value] of [['name', 4], ['phone', {}], ['email', 'a@b'], ['need', 'x'.repeat(1001)], ['business', '']]) {
    assert.ok(validate({ ...lead, [field]: value }).fieldErrors[field]);
  }
  for (const [field, value] of [['firstName', []], ['email', 'a@b'], ['businessType', 'constructor'], ['mainGoal', 'Other'], ['src', '__proto__'], ['marketingConsent', 'true']]) {
    assert.ok(validatePayload({ ...playbook, [field]: value }).fieldErrors[field]);
  }
  assert.ok(validate({ ...lead, sms_consent: 'true' }).fieldErrors.sms_consent);
});

test('normalization preserves required context and optional marketing consent', () => {
  assert.equal(validate({ ...lead, email: ' TEST@EXAMPLE.TEST ' }).email, 'test@example.test');
  assert.equal(validatePayload(playbook).marketingConsent, false);
  assert.equal(validatePayload({ ...playbook, marketingConsent: true }).marketingConsent, true);
});

test('validation and spam checks cannot access upstream services', async () => {
  const f = fixture('funnel-capture.js');
  assert.equal((await f.api.captureFunnelLead({ name: 1 })).ok, false);
  assert.equal((await f.api.captureFunnelLead({ website: 'bot.example' })).spam, true);
  assert.equal(f.calls.length, 0);
  const p = fixture('playbook-capture.js');
  assert.equal((await p.api.capturePlaybookLead({ email: [] })).ok, false);
  assert.equal(p.calls.length, 0);
});

test('CRM failure followed by retry produces only one SMS, after required writes', async () => {
  let failOnce = true;
  const f = fixture('funnel-capture.js', (endpoint) => {
    if (endpoint.startsWith('/opportunities/search') && failOnce) { failOnce = false; return new Error('upstream failed'); }
  });
  await assert.rejects(f.api.captureFunnelLead(lead), /upstream failed/);
  assert.equal(f.calls.filter(c => c.endpoint === '/conversations/messages').length, 0);
  const result = await f.api.captureFunnelLead(lead);
  assert.equal(result.ok, true);
  assert.equal(result.textBackStatus, 'accepted');
  assert.equal(f.calls.filter(c => c.endpoint === '/conversations/messages').length, 1);
  assert.ok(f.calls.findIndex(c => c.endpoint === '/opportunities/') < f.calls.findIndex(c => c.endpoint === '/conversations/messages'));
});

test('SMS outcomes distinguish consent from failure and uncertain acceptance', async () => {
  for (const [consent, name, expected] of [['no', null, 'not_consented'], ['yes', 'Error', 'failed'], ['yes', 'TimeoutError', 'unknown']]) {
    const f = fixture('funnel-capture.js', endpoint => endpoint === '/conversations/messages' && name ? Object.assign(new Error('failed'), { name }) : null);
    const result = await f.api.captureFunnelLead({ ...lead, sms_consent: consent });
    assert.equal(result.ok, true);
    assert.equal(result.textBackStatus, expected);
    const task = f.calls.find(c => c.endpoint.endsWith('/tasks'));
    assert.ok(task.body.body.includes(consent === 'no' ? 'No SMS consent' : 'consent present'));
    if (consent === 'no') assert.equal(f.calls.filter(c => c.endpoint === '/conversations/messages').length, 0);
  }
});

test('email failure does not turn a stored capture into a repeat-submission prompt', async () => {
  const f = fixture('playbook-capture.js', endpoint => endpoint === '/conversations/messages' ? Object.assign(new Error('late'), { name: 'TimeoutError' }) : null);
  const result = await f.api.capturePlaybookLead(playbook);
  assert.equal(result.ok, true);
  assert.equal(result.emailStatus, 'unknown');
  assert.equal(f.calls.some(c => c.endpoint.includes('/workflow/')), false);
});

test('malformed successful CRM responses cannot trigger acknowledgements', async () => {
  for (const [file, method, payload] of [
    ['funnel-capture.js', 'captureFunnelLead', lead],
    ['playbook-capture.js', 'capturePlaybookLead', playbook],
  ]) {
    for (const endpoint of ['/contacts/upsert', '/opportunities/']) {
      const f = fixture(file, null, current => current === endpoint ? {} : undefined);
      await assert.rejects(f.api[method](payload), { upstream: true });
      assert.equal(f.calls.some(c => c.endpoint === '/conversations/messages'), false);
    }
  }
});
