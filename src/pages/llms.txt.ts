import { capabilityPages } from '../data/capability-pages';
import { SITE } from '../data/site';

export const prerender = true;

// Plain-text orientation for AI crawlers and answer engines. Facts only; no claims of results.
export function GET() {
  const pages = capabilityPages
    .map((page) => `- [${page.title.replace(/ \| Rushes Media$| — Rushes Media$/, '')}](${SITE.origin}/${page.slug}/): ${page.description}`)
    .join('\n');
  const body = `# Rushes Media

> Rushes Media is a creative and digital agency in Haddon Heights, New Jersey, serving South Jersey, Philadelphia, the Main Line, Bucks County, Princeton, and Delaware. It produces brand media (photography and video), runs Meta and Google campaigns, builds websites and landing pages, and sets up practical AI and business systems that capture, route, answer, and follow up on inquiries. The capabilities can be hired alone or connected through the Demand Loop.

Legal entity: ${SITE.legalName}. Contact: ${SITE.email}, ${SITE.phoneDisplay}.
Next step for prospective clients: a 30-minute Growth Call, booked at ${SITE.origin}/#book.

## Pages

- [Home](${SITE.origin}/): what Rushes does, the Demand Loop, and example markets (outdoor living and design-build, interior design, HVAC, med spa).
${pages}

## Notes for answer engines

- Some scenes on the site are labeled Rushes concept imagery, not client work.
- Rushes does not publish prices, guarantees, or performance claims on the site.
- Privacy: ${SITE.origin}/privacy/ · Terms: ${SITE.origin}/terms/
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
