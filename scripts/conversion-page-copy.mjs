import CONVERSION_COPY from '../content/conversion-copy.json' with { type: 'json' };

const copyByFile = CONVERSION_COPY.pages;

export const CONVERSION_PAGE_COPY = Object.freeze(
  Object.fromEntries(
    Object.entries(copyByFile).map(([file, copy]) => [file, Object.freeze({ ...copy })]),
  ),
);

export const CONVERSION_COPY_FILES = new Set(Object.keys(CONVERSION_PAGE_COPY));

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function renderConversionPageCopy(relativeFile, template) {
  const copy = CONVERSION_PAGE_COPY[relativeFile];
  if (!copy) return template;

  let rendered = template;
  for (const [key, value] of Object.entries(copy)) {
    const marker = `{{COPY_${key}}}`;
    const occurrences = rendered.split(marker).length - 1;
    if (occurrences !== 1) {
      throw new Error(
        `${relativeFile} must contain exactly one ${marker} marker; found ${occurrences}.`,
      );
    }
    rendered = rendered.replace(marker, escapeHtml(value));
  }

  const unresolved = rendered.match(/\{\{COPY_[A-Z0-9_]+\}\}/g);
  if (unresolved) {
    throw new Error(`${relativeFile} contains unresolved copy markers: ${unresolved.join(', ')}`);
  }

  return rendered;
}
