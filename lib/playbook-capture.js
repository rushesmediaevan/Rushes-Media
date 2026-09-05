/**
 * PLAYBOOK funnel capture — replaces GHL form + immediate workflow actions via API.
 * Tags, custom fields, opportunity, Day-0 delivery email.
 */

const { ghlRequest } = require('./ghl');
const CONVERSION_COPY = require('../content/conversion-copy.json');
const { BOOKING_URL } = require('../scripts/site-facts.json');
const { validateFields, configurationError } = require('./capture-validation');

function loadGhlConfig() {
  let loc = process.env.RUSHES_GHL_LOCATION_ID;
  let token = process.env.RUSHES_GHL_PIT_TOKEN;

  if ((!loc || !token) && process.env.PLAYBOOK_GHL_B64) {
    try {
      const parsed = JSON.parse(
        Buffer.from(process.env.PLAYBOOK_GHL_B64, 'base64').toString('utf8')
      );
      loc = loc || parsed.loc;
      token = token || parsed.pit;
    } catch {
      /* ignore malformed bundle */
    }
  }

  return { loc, token };
}

const cfg = loadGhlConfig();
const LOC = cfg.loc;
const TOKEN = cfg.token;

const PIPELINE_ID = 'n3VwmpUZYcHKUWQjMIwJ';
const STAGE_SOURCED_ID = 'fee6cb5c-c2e2-4bdb-a38f-9767dc12efbd';
const NURTURE_60D = '22d66b97-c6da-4830-a4d7-6fefacd5ad09';

const CF = {
  src: 'oZ87Z3eAkU2lF5PKF8RK',
  business_type: 'y8MX0iRcijRlhY0kFZ5J',
  main_goal: 'vKXSrpbz6g3iY9QaTq3O',
  // Warm Reply Alert + Growth Call SMS read these — dual-write so inbound ≠ empty merge
  business_name: 'qzRu40CyVeRPupTWvQtQ',
  vertical: '2sveG5dryuAT3GTmThPD',
};

const SRC_TAG = {
  'ig-playbook': 'inbound-ig-playbook',
  'ig-growth': 'inbound-ig-growth',
};

const VERTICAL_TAG = {
  'Home services / trades': 'vertical-homeservices',
  'Food & hospitality': 'vertical-food',
  'Retail / shop': 'vertical-retail',
  'Other owner-operated': 'vertical-other',
};

/** Map playbook dropdown → contact.vertical picklist (Warm Reply Alert merge field) */
const VERTICAL_FIELD = {
  'Home services / trades': 'Home Services',
  'Food & hospitality': 'Hospitality / Cafe',
  'Retail / shop': 'Retail / Boutique',
  'Other owner-operated': 'Other',
};

const PAIN_TAG = {
  'More calls / estimates': 'pain-calls',
  'Ads that work': 'pain-ads',
  'Consistent posting': 'pain-posting',
  'Not sure yet': 'pain-unsure',
};

const SCORECARD_PDF =
  CONVERSION_COPY.pages['playbook-thanks/index.html'].SECONDARY_URL;

function requireConfig() {
  if (!TOKEN || !LOC) {
    throw configurationError();
  }
}

function validatePayload(body) {
  const checked = validateFields(body, {
    firstName: 200, email: 254, businessName: 200, website: 300,
    businessType: 80, mainGoal: 80, src: 40,
  }, ['firstName', 'email', 'businessType', 'mainGoal']);
  if (checked.error) return checked;
  if (body.marketingConsent !== undefined && typeof body.marketingConsent !== 'boolean') {
    return { error: 'Check the highlighted fields.', fieldErrors: { marketingConsent: 'Choose whether to receive marketing emails.' } };
  }
  body = { ...checked.values, marketingConsent: body.marketingConsent };
  const firstName = (body.firstName || '').trim();
  const email = (body.email || '').trim().toLowerCase();
  const businessName = (body.businessName || '').trim();
  const website = (body.website || '').trim();
  const businessType = (body.businessType || '').trim();
  const mainGoal = (body.mainGoal || '').trim();
  const src = (body.src || 'ig-growth').trim();
  const marketingConsent = normalizeMarketingConsent(body.marketingConsent);

  if (!firstName) return { error: 'First name is required' };
  if (!email || !email.includes('@')) return { error: 'Valid email is required' };
  if (!Object.hasOwn(VERTICAL_TAG, businessType)) return { error: 'Invalid business type', fieldErrors: { businessType: 'Choose a listed business type.' } };
  if (!Object.hasOwn(PAIN_TAG, mainGoal)) return { error: 'Invalid main goal', fieldErrors: { mainGoal: 'Choose a listed goal.' } };
  if (!Object.hasOwn(SRC_TAG, src)) return { error: 'Invalid src', fieldErrors: { src: 'Reload this page and try again.' } };

  return { firstName, email, businessName, website, businessType, mainGoal, src, marketingConsent };
}

function normalizeMarketingConsent(value) {
  return value === true;
}

function nurtureWorkflowFor(input) {
  return input.marketingConsent === true ? NURTURE_60D : null;
}

async function findPipelineOpportunity(contactId) {
  const data = await ghlRequest(
    TOKEN,
    'GET',
    `/opportunities/search?location_id=${LOC}&contact_id=${contactId}`
  );
  return (data.opportunities || []).find((o) => o.pipelineId === PIPELINE_ID);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function buildDayZeroEmail(firstName) {
  const copy = CONVERSION_COPY.messages.scorecardDeliveryEmail;
  const greeting = copy.greeting.replace(
    /\{\{\s*firstName\s*\}\}/g,
    firstName || 'there',
  );
  const html = `<div style="font-family:Inter,system-ui,sans-serif;color:#1a2a3f;max-width:560px;line-height:1.6">
<p>${escapeHtml(greeting)}</p>
<p>${escapeHtml(copy.intro)}</p>
<p><a href="${SCORECARD_PDF}" style="color:#b89860">${escapeHtml(copy.downloadCta)}</a></p>
<p>${escapeHtml(copy.guidance)}</p>
<p>${escapeHtml(copy.bookingPrompt)}</p>
<p><a href="${BOOKING_URL}" style="color:#b89860">${escapeHtml(copy.bookingCta)}</a></p>
<p>${escapeHtml(copy.signoff)}</p>
</div>`;

  return { subject: copy.subject, html };
}

async function sendDayZeroEmail(contactId, firstName) {
  const message = buildDayZeroEmail(firstName);

  await ghlRequest(TOKEN, 'POST', '/conversations/messages', {
    type: 'Email',
    contactId,
    ...message,
  });
}

async function capturePlaybookLead(raw) {
  const input = validatePayload(raw);
  if (input.error) return { ok: false, error: input.error, fieldErrors: input.fieldErrors };
  requireConfig();

  const tags = [
    SRC_TAG[input.src],
    VERTICAL_TAG[input.businessType],
    PAIN_TAG[input.mainGoal],
    'playbook-captured',
  ];

  const upsert = await ghlRequest(TOKEN, 'POST', '/contacts/upsert', {
    locationId: LOC,
    firstName: input.firstName,
    email: input.email,
    companyName: input.businessName || undefined,
    website: input.website || undefined,
    tags,
    customFields: [
      { id: CF.src, field_value: input.src },
      { id: CF.business_type, field_value: input.businessType },
      { id: CF.main_goal, field_value: input.mainGoal },
      ...(input.businessName
        ? [{ id: CF.business_name, field_value: input.businessName }]
        : []),
      ...(VERTICAL_FIELD[input.businessType]
        ? [{ id: CF.vertical, field_value: VERTICAL_FIELD[input.businessType] }]
        : []),
    ],
  });

  const contactId = upsert.contact?.id;
  if (!contactId) {
    throw Object.assign(new Error('Contact upsert returned no contact'), { upstream: true });
  }

  let opportunity = await findPipelineOpportunity(contactId);
  if (!opportunity) {
    const oppName = input.businessName || `${input.firstName} — PLAYBOOK`;
    const created = await ghlRequest(TOKEN, 'POST', '/opportunities/', {
      locationId: LOC,
      pipelineId: PIPELINE_ID,
      pipelineStageId: STAGE_SOURCED_ID,
      contactId,
      name: oppName,
      status: 'open',
    });
    opportunity = created.opportunity;
  }

  if (!opportunity?.id) throw Object.assign(new Error('Opportunity write returned no opportunity'), { upstream: true });

  let emailStatus = 'accepted';
  try {
    await sendDayZeroEmail(contactId, input.firstName);
  } catch (error) {
    // Capture already succeeded. Do not encourage a repeat submission to retry mail.
    emailStatus = error.acceptanceUnknown || ['TimeoutError', 'AbortError'].includes(error.name) ? 'unknown' : 'failed';
    console.error('scorecard-email:', emailStatus);
  }

  const nurtureWorkflow = nurtureWorkflowFor(input);
  if (nurtureWorkflow) {
    // Optional marketing enrollment is separate from delivery of the requested scorecard.
    try {
      await ghlRequest(
        TOKEN,
        'POST',
        `/contacts/${contactId}/workflow/${nurtureWorkflow}`,
        null
      );
    } catch (_) {
      /* non-fatal — contact may already be in workflow */
    }
  }

  return {
    ok: true,
    contactId,
    opportunityId: opportunity?.id,
    tags,
    nurtureWorkflow,
    emailStatus,
  };
}

module.exports = {
  buildDayZeroEmail,
  capturePlaybookLead,
  loadGhlConfig,
  normalizeMarketingConsent,
  nurtureWorkflowFor,
  validatePayload,
};
