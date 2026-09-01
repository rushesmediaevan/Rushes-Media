const test = require('node:test');
const assert = require('node:assert/strict');
const {
  normalizeMarketingConsent,
  nurtureWorkflowFor,
} = require('./playbook-capture');

test('scorecard delivery does not imply marketing consent', () => {
  for (const value of [undefined, null, false, 'false', 'true', 1]) {
    const marketingConsent = normalizeMarketingConsent(value);
    assert.equal(marketingConsent, false);
    assert.equal(nurtureWorkflowFor({ marketingConsent }), null);
  }
});

test('explicit boolean consent enables the optional nurture workflow', () => {
  const marketingConsent = normalizeMarketingConsent(true);
  assert.equal(marketingConsent, true);
  assert.equal(
    nurtureWorkflowFor({ marketingConsent }),
    '22d66b97-c6da-4830-a4d7-6fefacd5ad09',
  );
});
