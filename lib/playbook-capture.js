/**
 * PLAYBOOK funnel capture — replaces GHL form + immediate workflow actions via API.
 * Tags, custom fields, opportunity, Day-0 delivery email.
 */

const { ghlRequest } = require('./ghl');
const CONVERSION_COPY = require('../content/conversion-copy.json');
const { BOOKING_URL } = require('../scripts/site-facts.json');

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
    throw new Error(
      'Missing GHL credentials — set RUSHES_GHL_* or PLAYBOOK_GHL_B64 on Railway'
    );
  }
}

function validatePayload(body) {
  const firstName = (body.firstName || '').trim();
  const email = (body.email || '').trim().toLowerCase();
  const businessName = (body.businessName || '').trim();
  const website = (body.website || '').trim();
  const businessType = (body.businessType || '').trim();
  const mainGoal = (body.mainGoal || '').trim();
  const src = (body.src || 'ig-growth').trim();

  if (!firstName) return { error: 'First name is required' };
  if (!email || !email.includes('@')) return { error: 'Valid email is required' };
  if (!businessType || !VERTICAL_TAG[businessType]) return { error: 'Invalid business type' };
  if (!mainGoal || !PAIN_TAG[mainGoal]) return { error: 'Invalid main goal' };
  if (!SRC_TAG[src]) return { error: 'Invalid src' };

  return { firstName, email, businessName, website, businessType, mainGoal, src };
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
  requireConfig();
  const input = validatePayload(raw);
  if (input.error) return { ok: false, error: input.error };

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
    return { ok: false, error: 'Contact upsert failed' };
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

  await sendDayZeroEmail(contactId, input.firstName);

  // Enroll in published Nurture 60d workflow (Day-14+ long tail; optional if already enrolled)
  const NURTURE_60D = '22d66b97-c6da-4830-a4d7-6fefacd5ad09';
  try {
    await ghlRequest(
      TOKEN,
      'POST',
      `/contacts/${contactId}/workflow/${NURTURE_60D}`,
      null
    );
  } catch (_) {
    /* non-fatal — contact may already be in workflow */
  }

  return {
    ok: true,
    contactId,
    opportunityId: opportunity?.id,
    tags,
    nurtureWorkflow: NURTURE_60D,
  };
}

module.exports = { buildDayZeroEmail, capturePlaybookLead, validatePayload, loadGhlConfig };
