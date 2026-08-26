const test = require('node:test');
const assert = require('node:assert/strict');
const { buildTextBack, extractProofId } = require('./funnel-capture');

test('default text-back sends the approved 30-minute Growth Call duration', () => {
  const previousTemplate = process.env.TEXTBACK_SMS;
  delete process.env.TEXTBACK_SMS;
  try {
    assert.match(buildTextBack('Evan'), /Grab 30 min here/);
    assert.doesNotMatch(buildTextBack('Evan'), /Grab 20 min here/);
  } finally {
    if (previousTemplate === undefined) delete process.env.TEXTBACK_SMS;
    else process.env.TEXTBACK_SMS = previousTemplate;
  }
});

test('extracts a proof ID from utm_content', () => {
  assert.equal(
    extractProofId({ source_url: 'https://rushesmedia.com/inquire/?utm_content=PF-004-HARDSCAPE-CAMPAIGN-SYSTEM' }),
    'PF-004-HARDSCAPE-CAMPAIGN-SYSTEM'
  );
});

test('prefers an explicit proof ID and normalizes case', () => {
  assert.equal(
    extractProofId({ proof_id: 'pf-010-instant-reply-private-demo', source_url: 'https://rushesmedia.com/' }),
    'PF-010-INSTANT-REPLY-PRIVATE-DEMO'
  );
});

test('rejects arbitrary UTM content', () => {
  assert.equal(
    extractProofId({ source_url: 'https://rushesmedia.com/?utm_content=cheap-click-hook' }),
    ''
  );
});
