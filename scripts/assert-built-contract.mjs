import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  ASTRO_ROUTE_DIRECTORIES,
  COMPATIBILITY_FILES,
  GA4_MEASUREMENT_ID,
  GHL_TRACKING_ID,
  HERO_VIDEO_URL,
  HERO_VIDEO_VERSION,
  HOMEPAGE_FIRST_PARTY_JS_BUDGET,
  INDEXABLE_ROUTES,
  META_PIXEL_ID,
  PUBLIC_ASSET_FILES,
  REDIRECT_ROUTES,
  REVIEW_ASSET_FILES,
  SITE_CONTRACT,
} from './site-contract.mjs';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = path.join(projectRoot, 'dist');
const publicRoot = path.join(projectRoot, '.astro-public');

function decodeHtml(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
}

function attributesFromTag(tag) {
  const attributes = {};
  for (const match of tag.matchAll(/([:\w-]+)(?:=(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)) {
    attributes[match[1].toLowerCase()] = decodeHtml(match[2] ?? match[3] ?? match[4] ?? '');
  }
  return attributes;
}

function tags(html, tagName) {
  return [...html.matchAll(new RegExp(`<${tagName}\\b[^>]*>`, 'gi'))].map((match) =>
    attributesFromTag(match[0]),
  );
}

function metaContent(html, key, value) {
  const meta = tags(html, 'meta').find((entry) => entry[key] === value);
  return meta?.content;
}

function linkHref(html, rel) {
  return tags(html, 'link').find((entry) => entry.rel === rel)?.href;
}

function pageFile(routePath) {
  return routePath === '/'
    ? path.join(distRoot, 'index.html')
    : path.join(distRoot, routePath.slice(1), 'index.html');
}

async function walkFiles(root, directory = root) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walkFiles(root, absolute)));
    else files.push(path.relative(root, absolute));
  }
  return files.sort();
}

function inlineExecutableBytes(html) {
  let bytes = 0;
  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    const attributes = attributesFromTag(`<script${match[1]}>`);
    if (attributes.type === 'application/ld+json' || attributes.src) continue;
    bytes += Buffer.byteLength(match[2]);
  }
  return bytes;
}

function visibleText(html) {
  return decodeHtml(
    html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' '),
  )
    .replaceAll('&nbsp;', ' ')
    .replace(/&#(\d+);/g, (_, codePoint) => String.fromCodePoint(Number(codePoint)))
    .replace(/&#x([0-9a-f]+);/gi, (_, codePoint) => String.fromCodePoint(Number.parseInt(codePoint, 16)))
    .replace(/\s+/g, ' ')
    .trim();
}

function localScriptSources(html) {
  return tags(html, 'script')
    .map((attributes) => attributes.src)
    .filter(Boolean)
    .filter((source) => new URL(source, 'https://rushes.local/').origin === 'https://rushes.local');
}

async function firstPartyScriptBytes(html) {
  let bytes = inlineExecutableBytes(html);
  for (const source of localScriptSources(html)) {
    const url = new URL(source, 'https://rushes.local/');
    const relativeFile = decodeURIComponent(url.pathname).replace(/^\/+/, '');
    const absoluteFile = path.resolve(distRoot, relativeFile);
    assert.ok(
      absoluteFile.startsWith(`${distRoot}${path.sep}`),
      `Local script escapes dist: ${source}`,
    );
    bytes += Buffer.byteLength(await readFile(absoluteFile));
  }
  return bytes;
}

const ownership = new Map();
for (const route of SITE_CONTRACT) {
  assert.ok(!ownership.has(route.path), `Route has two owners: ${route.path}`);
  ownership.set(route.path, route.owner);
}
for (const route of REDIRECT_ROUTES) {
  assert.ok(Number.isInteger(route.redirectStatus), `${route.path} is missing redirect status.`);
  assert.ok(route.redirectTo, `${route.path} is missing redirect destination.`);
}

const generatedRoutes = SITE_CONTRACT.filter((route) => route.owner === 'generated');
assert.equal(generatedRoutes.length, 12, 'Exactly 12 indexable routes must be Astro-generated.');
assert.equal(INDEXABLE_ROUTES.length, 12, 'Exactly 12 routes must be in the sitemap contract.');

const publicHtmlRoutes = SITE_CONTRACT.filter((route) =>
  ['generated', 'compatibility'].includes(route.owner),
);
assert.equal(publicHtmlRoutes.length, 17, 'Exactly 17 HTML routes belong in the public release.');

for (const route of publicHtmlRoutes) {
  const html = await readFile(pageFile(route.path), 'utf8');
  const ga4Blocks = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)].filter((match) =>
    match[1].includes(GA4_MEASUREMENT_ID),
  );
  assert.equal(ga4Blocks.length, 1, `${route.path} must contain one GA4 installation block.`);
  assert.equal(
    (ga4Blocks[0][1].match(/googletagmanager\.com\/gtag\/js\?id=/g) || []).length,
    1,
    `${route.path} must contain one GA4 loader.`,
  );
  assert.equal(
    (ga4Blocks[0][1].match(/gtag\(['"]config['"]/g) || []).length,
    1,
    `${route.path} must configure GA4 once.`,
  );
  for (const localHostMarker of ["'localhost'", "'127.0.0.1'", "'[::1]'", "endsWith('.test')"]) {
    assert.ok(
      ga4Blocks[0][1].includes(localHostMarker),
      `${route.path} GA4 local/test suppression is missing ${localHostMarker}.`,
    );
  }
  for (const script of route.requiredScripts || []) {
    assert.ok(html.includes(script), `${route.path} is missing contracted script ${script}.`);
  }
}

for (const route of generatedRoutes) {
  const html = await readFile(pageFile(route.path), 'utf8');
  const title = decodeHtml(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || '');
  assert.equal(title, route.title, `${route.path} title drifted.`);
  assert.equal(metaContent(html, 'name', 'description'), route.description, `${route.path} description drifted.`);
  assert.equal(linkHref(html, 'canonical'), route.canonical, `${route.path} canonical drifted.`);
  assert.equal(metaContent(html, 'name', 'robots'), route.robots, `${route.path} robots shape drifted.`);

  const expectedOpenGraph = route.openGraph || {};
  const openGraphMap = {
    type: 'og:type',
    siteName: 'og:site_name',
    title: 'og:title',
    description: 'og:description',
    url: 'og:url',
    image: 'og:image',
    imageWidth: 'og:image:width',
    imageHeight: 'og:image:height',
  };
  for (const [field, property] of Object.entries(openGraphMap)) {
    const actual = metaContent(html, 'property', property);
    const expected = expectedOpenGraph[field];
    assert.equal(actual, expected === undefined ? undefined : String(expected), `${route.path} ${property} drifted.`);
  }

  const expectedTwitter = route.twitter || {};
  for (const field of ['card', 'title', 'description', 'image']) {
    assert.equal(
      metaContent(html, 'name', `twitter:${field}`),
      expectedTwitter[field],
      `${route.path} twitter:${field} drifted.`,
    );
  }

  for (const href of route.requiredCtas || []) {
    assert.ok(
      html.includes(`href="${href}"`) || html.includes(`src="${href}"`),
      `${route.path} is missing CTA ${href}.`,
    );
  }
  for (const asset of route.requiredAssets || []) {
    assert.ok(html.includes(asset), `${route.path} is missing asset reference ${asset}.`);
    assert.ok((await stat(path.join(distRoot, asset.slice(1)))).isFile(), `${asset} was not built.`);
  }
  for (const script of route.requiredScripts || []) {
    assert.ok(html.includes(script), `${route.path} is missing script ${script}.`);
  }
  if (route.contentTextHash) {
    const textHash = createHash('sha256').update(visibleText(html)).digest('hex');
    assert.equal(textHash, route.contentTextHash, `${route.path} legal copy drifted.`);
  }
}

const homepageHtml = await readFile(path.join(distRoot, 'index.html'), 'utf8');
const homepageCss = (
  await Promise.all(
    tags(homepageHtml, 'link')
      .filter((entry) => entry.rel === 'stylesheet' && entry.href?.startsWith('/_astro/'))
      .map((entry) => readFile(path.join(distRoot, entry.href.slice(1)), 'utf8')),
  )
).join('\n');
const homepageSchemaText = homepageHtml.match(
  /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/i,
)?.[1];
assert.ok(homepageSchemaText, 'Homepage JSON-LD is missing.');
assert.deepEqual(JSON.parse(homepageSchemaText), SITE_CONTRACT[0].jsonLd);
for (const proofLabel of [
  'More Booked Estimates',
  'First Responder Wins',
  'Speed to Lead',
  'Prove It First',
]) {
  assert.ok(homepageHtml.includes(proofLabel), `Homepage proof label is missing: ${proofLabel}`);
}
for (const utmKey of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']) {
  assert.ok(homepageHtml.includes(utmKey), `Homepage attribution is missing ${utmKey}.`);
}
assert.ok(homepageHtml.includes('slice(0,120)'), 'Homepage attribution must truncate at 120 characters.');
assert.ok(homepageHtml.includes(GHL_TRACKING_ID), 'Homepage GHL tracking ID drifted.');
assert.ok(homepageHtml.includes('https://link.msgsndr.com/js/external-tracking.js'));
assert.ok(homepageHtml.includes('https://link.msgsndr.com/js/form_embed.js'));
assert.ok(homepageHtml.includes('/assets/images/hero/hero-night-city-video-poster.jpg'));
assert.ok(
  homepageCss.includes('/assets/images/hero/hero-night-city-poster.jpg'),
  'Reduced-motion hero fallback poster is missing from the built stylesheet.',
);
assert.ok(homepageHtml.includes(HERO_VIDEO_URL), 'Homepage hero video cache key drifted.');
const heroVideoHash = createHash('sha256')
  .update(await readFile(path.join(distRoot, 'assets/video/hero-loop.mp4')))
  .digest('hex');
assert.ok(
  heroVideoHash.startsWith(HERO_VIDEO_VERSION),
  'Homepage hero video cache key does not match the built media bytes.',
);
assert.ok(
  homepageHtml.includes('id="book" class="booking-anchor"'),
  'Homepage booking anchor must remain separate from the full-height calendar card.',
);
assert.ok(
  homepageHtml.includes('id="rushes-growth-call-calendar"'),
  'Homepage Growth Call calendar iframe is missing.',
);
assert.ok(homepageHtml.includes('class="hero-media-toggle"'));
assert.ok(homepageHtml.includes('aria-controls="hero-background-video"'));
assert.ok(!/<video[^>]+autoplay/i.test(homepageHtml), 'Hero video must not autoplay before preference detection.');
assert.ok(!homepageHtml.includes('astro-island'), 'Homepage emitted an Astro island.');
assert.ok(homepageHtml.includes('motion-opt-in'), 'Reduced-motion playback opt-in is missing.');
const metaPixel = await readFile(path.join(distRoot, 'assets/meta-pixel.js'), 'utf8');
assert.ok(metaPixel.includes(META_PIXEL_ID), 'Meta Pixel ID drifted.');
assert.ok(metaPixel.includes("'localhost'"), 'Meta Pixel localhost suppression is missing.');
assert.ok(metaPixel.includes("'[::1]'"), 'Meta Pixel IPv6 localhost suppression is missing.');

assert.deepEqual(
  localScriptSources(homepageHtml),
  ['/assets/meta-pixel.js'],
  'Homepage emitted an unapproved local browser script.',
);
const builtFirstPartyBytes = await firstPartyScriptBytes(homepageHtml);
assert.ok(
  builtFirstPartyBytes <= HOMEPAGE_FIRST_PARTY_JS_BUDGET,
  `Homepage first-party JS exceeds its ${HOMEPAGE_FIRST_PARTY_JS_BUDGET}-byte legacy ceiling (${builtFirstPartyBytes}).`,
);

for (const route of SITE_CONTRACT.filter(
  (entry) => entry.owner === 'generated' && !['/', '/privacy/', '/terms/'].includes(entry.path),
)) {
  const html = await readFile(pageFile(route.path), 'utf8');
  assert.ok(!html.includes('astro-island'), `${route.path} emitted an Astro island.`);
  assert.ok(!/<script[^>]+type="module"/i.test(html), `${route.path} emitted client module JS.`);
  assert.ok(!/_astro\/[^"']+\.js/.test(html), `${route.path} emitted Astro runtime JS.`);
  assert.ok(html.includes(`data-page-family=`), `${route.path} lost its semantic family discriminator.`);
}

const sitemap = await readFile(path.join(distRoot, 'sitemap.xml'), 'utf8');
const sitemapLocations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
assert.deepEqual(
  sitemapLocations,
  INDEXABLE_ROUTES.map((route) => route.canonical),
  'Sitemap membership or order drifted.',
);
assert.ok(!sitemap.includes('/work/'), '/work/ must remain outside the sitemap.');
assert.ok(!sitemap.includes('/funnel/'), '/funnel/ must remain outside the sitemap.');

const funnelRoute = SITE_CONTRACT.find((route) => route.path === '/funnel/');
const funnelHtml = await readFile(path.join(distRoot, 'funnel/index.html'), 'utf8');
assert.equal(metaContent(funnelHtml, 'name', 'robots'), funnelRoute?.robots);

const robots = await readFile(path.join(distRoot, 'robots.txt'), 'utf8');
assert.equal(
  robots,
  'User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /thanks/\nDisallow: /playbook-thanks/\nDisallow: /playbook/\nDisallow: /call/\nDisallow: /work/\nDisallow: /ops/\n\nSitemap: https://rushesmedia.com/sitemap.xml\n',
);

assert.ok(!homepageHtml.includes('href="/work/"'), '/work/ must remain absent from navigation.');
const workHtml = await readFile(path.join(projectRoot, 'work/index.html'), 'utf8');
assert.equal(metaContent(workHtml, 'name', 'robots'), 'noindex,nofollow');
for (const marker of ['Concept — not client result', 'width="1900" height="1862" loading="lazy"']) {
  assert.ok(workHtml.includes(marker), `/work/ is missing review-only proof marker: ${marker}`);
}
assert.ok(!workHtml.includes(GA4_MEASUREMENT_ID), '/work/ must remain untracked while it is review-only.');
await assert.rejects(
  stat(path.join(distRoot, 'work/index.html')),
  { code: 'ENOENT' },
  '/work/ leaked into the release build.',
);

const teleprompterHtml = await readFile(path.join(projectRoot, 'call/teleprompter.html'), 'utf8');
assert.ok(!teleprompterHtml.includes(GA4_MEASUREMENT_ID), 'Teleprompter must not include GA4.');
await assert.rejects(
  stat(path.join(distRoot, 'call/teleprompter.html')),
  { code: 'ENOENT' },
  'Teleprompter leaked into the release build.',
);
for (const reviewAsset of REVIEW_ASSET_FILES) {
  await assert.rejects(
    stat(path.join(distRoot, reviewAsset)),
    { code: 'ENOENT' },
    `Review-only asset leaked into release build: ${reviewAsset}`,
  );
}

const thanksHtml = await readFile(path.join(distRoot, 'thanks/index.html'), 'utf8');
assert.equal(
  (thanksHtml.match(/<script\b/gi) || []).length,
  (thanksHtml.match(/<\/script>/gi) || []).length,
  '/thanks/ contains an unclosed script.',
);
assert.ok(thanksHtml.includes('AW-REPLACE_ME/REPLACE_ME_LABEL'));
assert.ok(thanksHtml.includes("!adsConversionId.includes('REPLACE_ME')"));
assert.ok(thanksHtml.includes("endsWith('.test')"));
assert.ok(thanksHtml.includes("'[::1]'"));

const stagedFiles = await walkFiles(publicRoot);
assert.deepEqual(
  stagedFiles,
  [...PUBLIC_ASSET_FILES, ...COMPATIBILITY_FILES].sort(),
  '.astro-public contains a file outside the explicit allowlist.',
);
assert.ok(stagedFiles.every((file) => !file.endsWith('.md')), 'Documentation leaked into the browser build.');
for (const directory of ASTRO_ROUTE_DIRECTORIES) {
  assert.ok(
    !stagedFiles.includes(`${directory}/index.html`),
    `Migrated route still exists in .astro-public: /${directory}/`,
  );
}

console.log(
  `Built contract assertions passed: 12 sitemap routes; 17 GA4-tagged public pages; homepage JS ${builtFirstPartyBytes}/${HOMEPAGE_FIRST_PARTY_JS_BUDGET} legacy bytes; review routes excluded.`,
);
