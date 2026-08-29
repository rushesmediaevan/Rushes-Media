const test = require('node:test');
const assert = require('node:assert/strict');
const CONVERSION_COPY = require('../content/conversion-copy.json');
const { buildDayZeroEmail } = require('./playbook-capture');

test('conversion page copy rejects founder-centric confirmation language', () => {
  const visiblePageCopy = Object.values(CONVERSION_COPY.pages)
    .flatMap((page) => Object.values(page))
    .join(' ');

  assert.doesNotMatch(
    visiblePageCopy,
    /I personally|Talk soon|Skip the wait|Founder-led|Founder, Rushes Media|pitch dump/i,
  );
});

test('scorecard delivery email uses the centralized professional register', () => {
  const message = buildDayZeroEmail('<Evan>');

  assert.equal(message.subject, CONVERSION_COPY.messages.scorecardDeliveryEmail.subject);
  assert.match(message.html, /Hello &lt;Evan&gt;,/);
  assert.match(message.html, /where inquiries stall before they become booked opportunities/);
  assert.match(message.html, /Book a 30-minute Growth Call/);
  assert.match(message.html, />Rushes Media<\/p>/);
  assert.doesNotMatch(message.html, /Two or more under 5|worth a conversation|— Evan/);
});
