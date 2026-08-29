/**
 * Niche funnel lead capture (/api/lead) — hardscape LP + future niche pages.
 * Contact upsert + tags + note + Acquisition opportunity + speed-to-lead task.
 * Same GHL env as playbook-capture: RUSHES_GHL_PIT_TOKEN, RUSHES_GHL_LOCATION_ID.
 */

const { ghlRequest } = require('./ghl');
const { loadGhlConfig } = require('./playbook-capture');
const CONVERSION_COPY = require('../content/conversion-copy.json');

const cfg = loadGhlConfig();
const LOC = cfg.loc;
const TOKEN = cfg.token;

// Rushes — Acquisition pipeline (same as playbook capture)
const PIPELINE_ID = 'n3VwmpUZYcHKUWQjMIwJ';
const STAGE_SOURCED_ID = 'fee6cb5c-c2e2-4bdb-a38f-9767dc12efbd';

// ── Speed-to-lead text-back ──────────────────────────────────────────────
// Fires the instant a funnel LP form is submitted. {{firstName}} filled server-side.
// Override without a code edit via env: TEXTBACK_SMS (message) / RUSHES_BOOKING_LINK (link).
// The default wording lives in content/conversion-copy.json; keep the STOP opt-out
// in both the content source and any deployment-specific TEXTBACK_SMS override.
// Link defaults to /book — the Growth Call booking widget.
// (Was /call until 2026-08-14; /call is the pre-call PROOF page, not a calendar. A lead
// who just asked for a call needs the widget, not a proof read.)
const BOOKING_LINK = process.env.RUSHES_BOOKING_LINK || 'https://rushesmedia.com/book';
const DEFAULT_TEXTBACK = CONVERSION_COPY.messages.leadAcknowledgementSms.body;

function buildTextBack(firstName) {
  const template = process.env.TEXTBACK_SMS || DEFAULT_TEXTBACK;
  return template
    .replace(/\{\{\s*firstName\s*\}\}/g, firstName || 'there')
    .replace(/\{\{\s*bookingLink\s*\}\}/g, BOOKING_LINK);
}

// Only text people who gave SMS consent on the form (A2P-compliant).
function hasSmsConsent(raw) {
  const yes = (v) => v === 'yes' || v === true;
  return yes(raw.sms_consent) || yes(raw.sms_consent_care) || yes(raw.sms_consent_promo);
}

function extractProofId(raw) {
  const direct = String(raw.proof_id || '').trim().toUpperCase();
  let fromUrl = '';
  try {
    const parsed = new URL(String(raw.source_url || ''), 'https://rushesmedia.com');
    fromUrl = String(parsed.searchParams.get('utm_content') || '').trim().toUpperCase();
  } catch (_) {
    fromUrl = '';
  }
  const candidate = direct || fromUrl;
  return /^PF-[A-Z0-9-]{5,80}$/.test(candidate) ? candidate : '';
}

async function sendInstantTextBack(contactId, firstName) {
  return ghlRequest(TOKEN, 'POST', '/conversations/messages', {
    type: 'SMS',
    contactId,
    message: buildTextBack(firstName),
  });
}

function requireConfig() {
  if (!TOKEN || !LOC) {
    throw new Error(
      'Missing GHL credentials — set RUSHES_GHL_* or PLAYBOOK_GHL_B64 on Railway'
    );
  }
}

function validate(raw) {
  // Honeypot — bots fill the hidden "website" field. Pretend success, do nothing.
  if ((raw.website || '').trim()) return { spam: true };

  const name = (raw.name || '').trim();
  const business = (raw.business || '').trim();
  const phone = (raw.phone || '').trim();
  const email = (raw.email || '').trim().toLowerCase();
  const need = (raw.need || '').trim();
  const niche = ((raw.niche || 'unknown').trim().toLowerCase() || 'unknown')
    .replace(/[^a-z0-9-]/g, '')
    .slice(0, 40);
  const sourceUrl = (raw.source_url || '').trim().slice(0, 300);
  const proofId = extractProofId(raw);

  if (!name) return { error: 'Name is required' };
  if (!email || !email.includes('@')) return { error: 'Valid email is required' };
  if (!phone || phone.replace(/\D/g, '').length < 7)
    return { error: 'Valid phone is required' };

  const parts = name.split(/\s+/);
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(' ') || undefined,
    business,
    phone,
    email,
    need: need.slice(0, 1000),
    niche,
    sourceUrl,
    proofId,
  };
}

async function findPipelineOpportunity(contactId) {
  const data = await ghlRequest(
    TOKEN,
    'GET',
    `/opportunities/search?location_id=${LOC}&contact_id=${contactId}`
  );
  return (data.opportunities || []).find((o) => o.pipelineId === PIPELINE_ID);
}

async function captureFunnelLead(raw) {
  requireConfig();
  const input = validate(raw);
  if (input.spam) return { ok: true, spam: true };
  if (input.error) return { ok: false, error: input.error };

  const tags = [
    input.niche === 'contact' ? 'inbound-contact' : `inbound-lp-${input.niche}`,
    'funnel-captured',
    'growth-call-request',
  ];
  if (input.proofId) tags.push(`proof-${input.proofId.toLowerCase()}`);
  if (raw.sms_consent_care === 'yes' || raw.sms_consent_care === true) {
    tags.push('sms-consent-care');
  }
  if (raw.sms_consent_promo === 'yes' || raw.sms_consent_promo === true) {
    tags.push('sms-consent-promo');
  }
  if (raw.sms_consent === 'yes' || raw.sms_consent === true) {
    tags.push('sms-consent');
  }

  const upsert = await ghlRequest(TOKEN, 'POST', '/contacts/upsert', {
    locationId: LOC,
    firstName: input.firstName,
    lastName: input.lastName,
    email: input.email,
    phone: input.phone,
    companyName: input.business || undefined,
    tags,
    // Dual-write: Warm Reply Alert reads contact.business_name, not only companyName
    customFields: input.business
      ? [{ id: 'qzRu40CyVeRPupTWvQtQ', field_value: input.business }]
      : undefined,
  });

  const contactId = upsert.contact?.id;
  if (!contactId) return { ok: false, error: 'Contact upsert failed' };

  // Lead context lands as a note so it survives any field-mapping drift
  const noteLines = [
    `LP lead — /${input.niche}/`,
    input.business ? `Business: ${input.business}` : null,
    input.need ? `Bottleneck (their words): ${input.need}` : null,
    input.sourceUrl ? `Source: ${input.sourceUrl}` : null,
    input.proofId ? `Proof ID: ${input.proofId}` : null,
  ].filter(Boolean);
  try {
    await ghlRequest(TOKEN, 'POST', `/contacts/${contactId}/notes`, {
      body: noteLines.join('\n'),
    });
  } catch (_) {
    /* non-fatal */
  }

  // Speed-to-lead: fire the instant text-back the moment they submit (the 21x lever).
  // Consent-gated + non-fatal — a send failure never breaks capture.
  let textBackSent = false;
  if (hasSmsConsent(raw)) {
    try {
      await sendInstantTextBack(contactId, input.firstName);
      textBackSent = true;
    } catch (err) {
      console.error('textback-sms failed (non-fatal):', err.message);
    }
  }

  let opportunity = await findPipelineOpportunity(contactId);
  if (!opportunity) {
    const created = await ghlRequest(TOKEN, 'POST', '/opportunities/', {
      locationId: LOC,
      pipelineId: PIPELINE_ID,
      pipelineStageId: STAGE_SOURCED_ID,
      contactId,
      name: `${input.business || `${input.firstName} — ${input.niche} LP`}${input.proofId ? ` · ${input.proofId}` : ''}`,
      status: 'open',
    });
    opportunity = created.opportunity;
  } else if (input.proofId && !String(opportunity.name || '').includes(input.proofId)) {
    try {
      const updated = await ghlRequest(TOKEN, 'PUT', `/opportunities/${opportunity.id}`, {
        name: `${opportunity.name || input.business || input.firstName} · ${input.proofId}`.slice(0, 100),
      });
      opportunity = updated.opportunity || opportunity;
    } catch (_) {
      /* non-fatal: contact tag and note still retain proof attribution */
    }
  }

  // Human-call backstop: due in 5 min so a person can beat the bots on hot ones.
  try {
    await ghlRequest(TOKEN, 'POST', `/contacts/${contactId}/tasks`, {
      title: `CALL LP LEAD — ${input.firstName}${input.business ? ` (${input.business})` : ''}`,
      body: `Growth Call request from /${input.niche}/.${input.proofId ? ` Proof: ${input.proofId}.` : ''} ${input.need ? `Said: "${input.need}"` : ''} Phone: ${input.phone}${textBackSent ? ' · auto text-back sent' : ' · NO consent → no text-back, call them'}`,
      dueDate: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
      completed: false,
    });
  } catch (_) {
    /* non-fatal */
  }

  return { ok: true, contactId, opportunityId: opportunity?.id, tags, textBackSent };
}

module.exports = { buildTextBack, captureFunnelLead, extractProofId };
