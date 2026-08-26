import { SITE } from '../data/site';

export const prerender = true;

export function GET() {
  const body = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /thanks/
Disallow: /playbook-thanks/
Disallow: /playbook/
Disallow: /call/
Disallow: /work/
Disallow: /ops/

Sitemap: ${SITE.origin}/sitemap.xml
`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
