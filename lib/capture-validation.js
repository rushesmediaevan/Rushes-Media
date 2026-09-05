/** Validate untrusted form JSON before configuration checks or upstream writes. */
function validateFields(raw, fields, required = []) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return { error: 'Invalid body', fieldErrors: {} };
  }
  const values = {};
  const fieldErrors = {};
  for (const [field, maxLength] of Object.entries(fields)) {
    const value = raw[field];
    if (value !== undefined && typeof value !== 'string') {
      fieldErrors[field] = 'Enter a text value.';
      continue;
    }
    values[field] = (value || '').trim();
    if (values[field].length > maxLength) fieldErrors[field] = `Use ${maxLength} characters or fewer.`;
    else if (required.includes(field) && !values[field]) fieldErrors[field] = 'This field is required.';
  }
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    fieldErrors.email = 'Enter a valid email address.';
  }
  if (values.phone && !/^[+\d\s().-]+$/.test(values.phone)) fieldErrors.phone = 'Enter a valid phone number.';
  if (values.phone && !/^[\d]{7,15}$/.test(values.phone.replace(/\D/g, ''))) fieldErrors.phone = 'Enter a valid phone number.';
  if (values.email) values.email = values.email.toLowerCase();
  return { values, fieldErrors, ...(Object.keys(fieldErrors).length ? { error: 'Check the highlighted fields.' } : {}) };
}

function configurationError() {
  return Object.assign(new Error('Service temporarily unavailable'), { status: 503, code: 'not_configured' });
}

module.exports = { validateFields, configurationError };
