/**
 * Niche funnel lead capture (/api/lead) — hardscape LP + future niche pages.
 * Contact upsert + tags + note + Acquisition opportunity + speed-to-lead task.
 * Same GHL env as playbook-capture: RUSHES_GHL_PIT_TOKEN, RUSHES_GHL_LOCATION_ID.
 */

const { ghlRequest } = require('./ghl');
const { loadGhlConfig } = require('./playbook-capture');

const cfg = loadGhlConfig();
const LOC = cfg.loc;
const TOKEN = cfg.token;

// Rushes — Acquisition pipeline (same as playbook capture)
const PIPELINE_ID = 'n3VwmpUZYcHKUWQjMIwJ';
const STAGE_SOURCED_ID = 'fee6cb5c-c2e2-4bdb-a38f-9767dc12efbd';

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
  });

  const contactId = upsert.contact?.id;
  if (!contactId) return { ok: false, error: 'Contact upsert failed' };

  // Lead context lands as a note so it survives any field-mapping drift
  const noteLines = [
    `LP lead — /${input.niche}/`,
    input.business ? `Business: ${input.business}` : null,
    input.need ? `Bottleneck (their words): ${input.need}` : null,
    input.sourceUrl ? `Source: ${input.sourceUrl}` : null,
  ].filter(Boolean);
  try {
    await ghlRequest(TOKEN, 'POST', `/contacts/${contactId}/notes`, {
      body: noteLines.join('\n'),
    });
  } catch (_) {
    /* non-fatal */
  }

  let opportunity = await findPipelineOpportunity(contactId);
  if (!opportunity) {
    const created = await ghlRequest(TOKEN, 'POST', '/opportunities/', {
      locationId: LOC,
      pipelineId: PIPELINE_ID,
      pipelineStageId: STAGE_SOURCED_ID,
      contactId,
      name: input.business || `${input.firstName} — ${input.niche} LP`,
      status: 'open',
    });
    opportunity = created.opportunity;
  }

  // Speed-to-lead: task due in 1 hour so the lead never sits
  try {
    await ghlRequest(TOKEN, 'POST', `/contacts/${contactId}/tasks`, {
      title: `CALL LP LEAD — ${input.firstName}${input.business ? ` (${input.business})` : ''}`,
      body: `Growth Call request from /${input.niche}/. ${input.need ? `Said: "${input.need}"` : ''} Phone: ${input.phone}`,
      dueDate: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      completed: false,
    });
  } catch (_) {
    /* non-fatal */
  }

  return { ok: true, contactId, opportunityId: opportunity?.id, tags };
}

module.exports = { captureFunnelLead };
