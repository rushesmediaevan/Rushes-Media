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
  HERO_VIDEO_POSTER_PATH,
  HERO_VIDEO_URL,
  HERO_VIDEO_VERSION,
  HOMEPAGE_FIRST_PARTY_JS_BUDGET,
  INDEXABLE_ROUTES,
  META_PIXEL_ID,
  PUBLIC_ASSET_FILES,
  REDIRECT_ROUTES,
  REVIEW_ASSET_FILES,
  REVIEW_ONLY_ROUTES,
  SITE_CONTRACT,
} from './site-contract.mjs';
import { CONVERSION_PAGE_COPY } from './conversion-page-copy.mjs';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = path.join(projectRoot, 'dist');
const publicRoot = path.join(projectRoot, '.astro-public');
const homepageLock = JSON.parse(
  await readFile(path.join(projectRoot, 'scripts/homepage-lock.json'), 'utf8'),
);

for (const [relativeFile, expectedHash] of Object.entries(homepageLock.protectedFiles)) {
  const sourceHash = createHash('sha256')
    .update(await readFile(path.join(projectRoot, relativeFile)))
    .digest('hex');
  assert.equal(
    sourceHash,
    expectedHash,
    `Approved homepage lock from ${homepageLock.baseCommit} drifted: ${relativeFile}`,
  );
}
const protectedCssSource = await readFile(
  path.join(projectRoot, homepageLock.homepageCssProtectedPrefix.path),
  'utf8',
);
const protectedCssPrefix = protectedCssSource
  .split(/(?<=\n)/)
  .slice(0, homepageLock.homepageCssProtectedPrefix.lineCount)
  .join('');
assert.equal(
  createHash('sha256').update(protectedCssPrefix).digest('hex'),
  homepageLock.homepageCssProtectedPrefix.sha256,
  `Approved homepage header/hero CSS from ${homepageLock.baseCommit} drifted.`,
);

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

function jsonLdDocuments(html) {
  return [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
    .map((match) => JSON.parse(match[1]));
}

function pageFile(routePath) {
  return routePath === '/'
    ? path.join(distRoot, 'index.html')
    : path.join(distRoot, routePath.slice(1), 'index.html');
}

function pngDimensions(buffer) {
  assert.equal(
    buffer.subarray(0, 8).toString('hex'),
    '89504e470d0a1a0a',
    'Industry prototype is not a valid PNG.',
  );
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
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
assert.equal(generatedRoutes.length, 13, 'Exactly 13 content routes must be Astro-generated.');
assert.equal(INDEXABLE_ROUTES.length, 13, 'Exactly 13 routes must be in the sitemap contract.');
assert.equal(
  generatedRoutes.filter((route) => route.indexable).length,
  13,
  'Exactly 13 generated routes must remain indexable.',
);

const publicHtmlRoutes = SITE_CONTRACT.filter((route) =>
  ['generated', 'compatibility'].includes(route.owner),
);
assert.equal(publicHtmlRoutes.length, 18, 'Exactly 18 HTML routes belong in the public release.');

for (const route of publicHtmlRoutes) {
  const html = await readFile(pageFile(route.path), 'utf8');
  assert.ok(
    !/\b(?:20-minute|20 minutes|twenty minutes)\b/i.test(html),
    `${route.path} still advertises the retired 20-minute Growth Call duration.`,
  );
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
  if (route.jsonLd) {
    const documents = jsonLdDocuments(html);
    assert.equal(documents.length, 1, `${route.path} must emit one JSON-LD document.`);
    assert.deepEqual(documents[0], route.jsonLd, `${route.path} JSON-LD drifted.`);
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
for (const approvedHomepageMarker of [
  'Media<br',
  '<em>done right.</em>',
  'We make the content, campaigns, and brand work that get you noticed',
  'Book a Growth Call',
  'Our Services',
  '>Services</a>',
  '>System</a>',
  '>Process</a>',
  '>FAQ</a>',
]) {
  assert.ok(
    homepageHtml.includes(approvedHomepageMarker),
    `Approved homepage marker drifted: ${approvedHomepageMarker}`,
  );
}
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
assert.ok(homepageHtml.includes('~30 minutes'), 'Homepage Growth Call duration drifted from 30 minutes.');
assert.ok(homepageHtml.includes('Best fit today'), 'Homepage lost the truthful industry-fit framing.');
assert.ok(homepageHtml.includes('Outdoor Living &amp; Design-Build'));
assert.ok(homepageHtml.includes('Interior Design &amp; Residential Build'));
assert.ok(homepageHtml.includes('HVAC Replacement &amp; Home Comfort'));
assert.ok(homepageHtml.includes('Med Spa &amp; Aesthetic Practices'));
assert.ok(homepageHtml.includes('href="/industries/"'));
assert.ok(!homepageHtml.includes('href="/hardscape/"'), 'Retired hardscape URL leaked into homepage links.');
assert.ok(!homepageHtml.includes('href="/pools/"'), 'Retired pools URL leaked into homepage links.');
assert.ok(homepageHtml.includes(GHL_TRACKING_ID), 'Homepage GHL tracking ID drifted.');
assert.ok(homepageHtml.includes('https://link.msgsndr.com/js/external-tracking.js'));
assert.ok(
  !homepageHtml.includes('https://link.msgsndr.com/js/form_embed.js'),
  'The GHL resize runtime must not hide the owned booking widget iframe.',
);
assert.ok(homepageHtml.includes(HERO_VIDEO_POSTER_PATH));
const heroPosterVersion = path.basename(HERO_VIDEO_POSTER_PATH).match(/-([a-f0-9]{8})\.jpg$/)?.[1];
assert.ok(heroPosterVersion, 'Homepage hero poster filename is missing its content hash.');
const heroPosterHash = createHash('sha256')
  .update(await readFile(path.join(distRoot, HERO_VIDEO_POSTER_PATH.slice(1))))
  .digest('hex');
assert.ok(
  heroPosterHash.startsWith(heroPosterVersion),
  'Homepage hero poster cache key does not match the built image bytes.',
);
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
for (const resilientBookingMarker of [
  'data-booking-status',
  'Opening the secure 30-minute calendar',
  'data-booking-direct',
  'Open the calendar directly',
  'data-booking-state="loading"',
  'data-booking-loading',
  'data-booking-fallback',
  'data-booking-src',
  'Calendar frame opened. Confirming availability',
  'The embedded calendar did not finish loading',
  "showUnavailable('unavailable'",
  'getBoundingClientRect',
  'data-initial-iframe-hidden',
  "mode: 'no-cors'",
  "credentials: 'omit'",
]) {
  assert.ok(homepageHtml.includes(resilientBookingMarker), `Homepage booking fail-safe is missing: ${resilientBookingMarker}`);
}
assert.ok(!homepageHtml.includes('Calendar loaded. Choose a time'), 'Iframe load alone must not claim that the third-party calendar hydrated.');
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
      assert.ok(html.includes('data-booking-direct'), `${route.path} lost the direct booking fallback.`);
      assert.ok(html.includes('Request a time by email'), `${route.path} lost the owned accessible booking fallback.`);
      assert.ok(
        html.includes('mailto:evan@rushesmedia.com?subject=30-minute%20Growth%20Call%20request'),
        `${route.path} accessible booking fallback destination drifted.`,
      );
  assert.ok(html.includes('data-booking-status'), `${route.path} lost the booking loading status.`);
  assert.ok(html.includes('data-booking-state="loading"'), `${route.path} lost the booking loading state.`);
  assert.ok(html.includes('data-booking-loading'), `${route.path} lost the designed booking loading plate.`);
  assert.ok(html.includes('data-booking-fallback'), `${route.path} lost the collapsed booking failure state.`);
  assert.ok(html.includes("showUnavailable('unavailable'"), `${route.path} lost the unavailable-frame state.`);
  assert.ok(html.includes('data-booking-click-ready'), `${route.path} lost delegated Growth Call click tracking.`);
  assert.ok(html.includes('a[href="#book"]'), `${route.path} no longer tracks every in-page Growth Call control.`);
}

const industryMarkers = new Map([
  ['/industries/', ['Three buying models', 'Choose the buying model', 'Shared commercial discipline']],
  ['/outdoor-living/', ['The outdoor-living project path', 'One outdoor-living system. Distinct project lanes.', 'Do hardscape, landscape design-build and pool projects need separate campaigns?']],
  ['/interior-design/', ['The residential design-project path', 'A stronger path for the residential work worth protecting.', 'Will marketing make the brand feel generic?']],
  ['/hvac/', ['The replacement-opportunity path', 'Built around replacement value—not just more phone volume.', 'Does this replace our dispatcher or office team?']],
  ['/med-spa/', ['The aesthetic-consult path', 'Built around approved priorities and available provider capacity.', 'Does Rushes write medical or treatment claims?']],
]);
const industryTexts = [];
for (const [routePath, markers] of industryMarkers) {
  const route = SITE_CONTRACT.find((entry) => entry.path === routePath);
  assert.ok(route, `Missing industry contract route ${routePath}.`);
  const html = await readFile(pageFile(routePath), 'utf8');
  const text = visibleText(html);
  assert.ok(text.length > 2500, `${routePath} is still too thin to be a substantial industry page.`);
  industryTexts.push(text);
  for (const marker of markers) {
    assert.ok(html.includes(marker), `${routePath} is missing its distinct content marker: ${marker}`);
  }
  assert.ok(html.includes('/assets/industry-page.css'), `${routePath} lost the industry design system.`);
  assert.ok(html.includes('data-industry-booking-frame'), `${routePath} lost its booking frame.`);
  for (const utmKey of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']) {
    assert.ok(html.includes(utmKey), `${routePath} attribution is missing ${utmKey}.`);
  }
  assert.ok(html.includes('slice(0,120)'), `${routePath} attribution must truncate at 120 characters.`);
  assert.ok(html.includes('growth_call_click'), `${routePath} lost its Growth Call click event.`);
  assert.ok(html.includes('booking_section_view'), `${routePath} lost meaningful booking visibility.`);
  assert.ok(html.includes('industry_route'), `${routePath} lost its established industry analytics dimension.`);
  assert.ok(html.includes("host.endsWith('.test')"), `${routePath} analytics test-host suppression is missing.`);
  assert.ok(!html.includes('astro-island'), `${routePath} emitted an Astro island.`);
  assert.ok(!html.includes('/assets/proof/'), `${routePath} leaked a review-only proof asset into release HTML.`);
  assert.ok(!html.includes('data-review-only-asset'), `${routePath} leaked private review markup.`);
  assert.equal(route.primaryImage?.status, 'approved', `${routePath} primary-image gate drifted.`);
  assert.ok(html.includes('data-visual-truth="labeled-concept"'), `${routePath} lost its visual truth label.`);
  assert.ok(
    html.includes('not a completed client project') ||
      html.includes('not client work') ||
      html.includes('not a client installation') ||
      html.includes('no patient'),
    `${routePath} lost its visible concept disclosure.`,
  );
  for (const source of tags(html, 'source').filter((entry) => entry.type?.startsWith('image/'))) {
    assert.ok(source.srcset?.includes('w'), `${routePath} emitted an image source without width descriptors.`);
    assert.ok(source.sizes, `${routePath} emitted an image source without sizes.`);
  }
  for (const image of tags(html, 'img').filter((entry) => entry.src?.includes('/assets/images/industries/'))) {
    assert.ok(Number(image.width) > 0 && Number(image.height) > 0, `${routePath} image lacks measured dimensions.`);
    assert.ok(image.alt, `${routePath} industry image lacks descriptive alt text.`);
  }
}
assert.equal(new Set(industryTexts).size, industryTexts.length, 'Industry pages emitted repeated boilerplate documents.');

const sitemap = await readFile(path.join(distRoot, 'sitemap.xml'), 'utf8');
const sitemapLocations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
const expectedSitemapPaths = [
  '/',
  '/demand-loop/',
  '/brand-media/',
  '/campaigns/',
  '/web/',
  '/follow-up/',
  '/industries/',
  '/outdoor-living/',
  '/interior-design/',
  '/hvac/',
  '/med-spa/',
  '/privacy/',
  '/terms/',
];
assert.deepEqual(
  sitemapLocations,
  expectedSitemapPaths.map((routePath) => `https://rushesmedia.com${routePath}`),
  'Sitemap membership or order drifted.',
);
assert.deepEqual(
  INDEXABLE_ROUTES.map((route) => route.path),
  expectedSitemapPaths,
  'Executable sitemap contract drifted from the independent expected list.',
);
assert.ok(!sitemap.includes('/work/'), '/work/ must remain outside the sitemap.');
assert.ok(!sitemap.includes('/funnel/'), '/funnel/ must remain outside the sitemap.');
assert.ok(sitemap.includes('/med-spa/'), '/med-spa/ must be present in the sitemap.');
assert.ok(sitemap.includes('/industries/'), '/industries/ must be present in the sitemap.');
assert.ok(!sitemap.includes('/hardscape/'), 'Retired /hardscape/ must remain outside the sitemap.');
assert.ok(!sitemap.includes('/pools/'), 'Retired /pools/ must remain outside the sitemap.');
assert.ok(!sitemap.includes('<priority>'), 'Sitemap must not emit meaningless priority values.');
assert.ok(!sitemap.includes('<changefreq>'), 'Sitemap must not emit meaningless changefreq values.');
const sitemapLastmods = [...sitemap.matchAll(/<lastmod>(.*?)<\/lastmod>/g)].map((match) => match[1]);
assert.deepEqual(
  sitemapLastmods,
  INDEXABLE_ROUTES.map((route) => route.lastmod).filter(Boolean),
  'Sitemap significant-content lastmod values drifted.',
);

const medSpaRoute = SITE_CONTRACT.find((route) => route.path === '/med-spa/');
const medSpaHtml = await readFile(pageFile('/med-spa/'), 'utf8');
assert.equal(medSpaRoute?.indexable, true);
assert.equal(medSpaRoute?.sitemap, true);
assert.equal(metaContent(medSpaHtml, 'name', 'robots'), undefined);

for (const retiredRoute of ['/hardscape/', '/pools/']) {
  await assert.rejects(
    stat(pageFile(retiredRoute)),
    { code: 'ENOENT' },
    `${retiredRoute} was built despite redirect-only ownership.`,
  );
}

const funnelRoute = SITE_CONTRACT.find((route) => route.path === '/funnel/');
const funnelHtml = await readFile(path.join(distRoot, 'funnel/index.html'), 'utf8');
const funnelScript = await readFile(path.join(distRoot, 'funnel/funnel.js'), 'utf8');
assert.equal(metaContent(funnelHtml, 'name', 'robots'), funnelRoute?.robots);
assert.ok(
  funnelScript.includes('https://api.leadconnectorhq.com/widget/booking/1GUofnPSyYefy2VOSxKO'),
  '/funnel/ lost the exact 30-minute Growth Call destination.',
);
assert.ok(funnelScript.includes('id="project-details"'), '/funnel/ project-details form anchor drifted.');
assert.ok(funnelScript.includes('Open the 30-minute Growth Call calendar'), '/funnel/ lost its direct booking action.');
assert.ok(
  funnelScript.includes('Choose the right path for your market.') &&
    funnelScript.includes('renderFallback('),
  '/funnel/ lost its missing-market booking fail-safe.',
);
for (const utmKey of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']) {
  assert.ok(funnelScript.includes(utmKey), `/funnel/ attribution is missing ${utmKey}.`);
}
assert.ok(funnelScript.includes('slice(0,120)'), '/funnel/ attribution must truncate at 120 characters.');

const robots = await readFile(path.join(distRoot, 'robots.txt'), 'utf8');
assert.equal(
  robots,
  'User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /thanks/\nDisallow: /playbook-thanks/\nDisallow: /playbook/\nDisallow: /call/\nDisallow: /work/\nDisallow: /ops/\n\nSitemap: https://rushesmedia.com/sitemap.xml\n',
);
assert.ok(!robots.includes('Disallow: /med-spa/'), 'Robots must allow crawling /med-spa/ so noindex can be observed.');

assert.ok(!homepageHtml.includes('href="/work/"'), '/work/ must remain absent from navigation.');
assert.deepEqual(
  REVIEW_ONLY_ROUTES.map((route) => route.path),
  ['/work/', '/work/stonevale/', '/work/halewood/'],
  'Review-route inventory drifted.',
);
for (const route of REVIEW_ONLY_ROUTES) {
  assert.equal(route.robots, 'noindex,nofollow', `${route.path} lost its review robots contract.`);
  assert.equal(route.sitemap, false, `${route.path} entered the sitemap contract.`);
  await assert.rejects(
    stat(pageFile(route.path)),
    { code: 'ENOENT' },
    `${route.path} leaked into the release build.`,
  );
}

const workRouteSource = await readFile(
  path.join(projectRoot, 'src/pages/work/[...path].astro'),
  'utf8',
);
const workLayoutSource = await readFile(
  path.join(projectRoot, 'src/layouts/WorkReviewLayout.astro'),
  'utf8',
);
const workPageSource = await readFile(
  path.join(projectRoot, 'src/components/work/WorkConceptPage.astro'),
  'utf8',
);
const workScriptSource = await readFile(path.join(projectRoot, 'assets/work/work-review.js'), 'utf8');
const dockerfileSource = await readFile(path.join(projectRoot, 'Dockerfile'), 'utf8');
assert.ok(
  dockerfileSource.includes('COPY scripts/site-facts.json scripts/site-contract.mjs ./scripts/'),
  'The production image no longer contains the route contract required by server.js.',
);
assert.ok(
  dockerfileSource.includes('COPY content ./content'),
  'The production image no longer contains centralized conversion copy required by the API runtime.',
);
assert.ok(
  workRouteSource.includes("Reflect.get(process.env, 'RUSHES_INCLUDE_REVIEW_ROUTES') !== '1'"),
  'Review routes are no longer gated behind the explicit build flag.',
);
assert.ok(workLayoutSource.includes('noindex,nofollow'), 'Work review layout lost noindex,nofollow.');
assert.ok(!workLayoutSource.includes(GA4_MEASUREMENT_ID), 'Work review layout must remain untracked.');
for (const disclosure of [
  'Fictional company · synthetic media · no client result',
  'not a Rushes client before-and-after',
  'not a Rushes client renovation or result',
  'Local demonstration—nothing entered here can be sent or saved.',
]) {
  assert.ok(
    workPageSource.includes(disclosure) ||
      (await readFile(path.join(projectRoot, 'src/data/work-concepts.ts'), 'utf8')).includes(disclosure),
    `Work review source lost truth boundary: ${disclosure}`,
  );
}
for (const forbiddenAction of ['tel:', 'fetch(', 'XMLHttpRequest', 'sendBeacon', 'action=']) {
  assert.ok(
    !`${workLayoutSource}\n${workPageSource}\n${workScriptSource}`.includes(forbiddenAction),
    `Work review source contains a forbidden live action: ${forbiddenAction}`,
  );
}
for (const fabricatedMarker of ['180+', 'Since 2009', 'four weeks of work', 'year five looks like year one']) {
  assert.ok(!workPageSource.includes(fabricatedMarker), `Work review source retained fabricated proof: ${fabricatedMarker}`);
}
for (const interactionMarker of [
  "event.preventDefault()",
  "setPointerCapture",
  "pointercancel",
  "ArrowDown",
  "ArrowUp",
  "Home",
  "End",
  "visibilitychange",
  "prefers-reduced-motion: reduce",
]) {
  assert.ok(
    `${workScriptSource}\n${await readFile(path.join(projectRoot, 'assets/work/work-review.css'), 'utf8')}`.includes(interactionMarker),
    `Work review interaction contract lost ${interactionMarker}.`,
  );
}

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

const hardscapePrototype = await readFile(
  path.join(projectRoot, 'assets/proof/industry-hardscape-hero-prototype.png'),
);
assert.deepEqual(
  pngDimensions(hardscapePrototype),
  { width: 1122, height: 1402 },
  'Hardscape zero-credit prototype dimensions drifted.',
);
assert.equal(
  createHash('sha256').update(hardscapePrototype).digest('hex'),
  'd8260c8d878020d0ca593eccbcc7287985e4554accac77e38ad5ac02e07ee805',
  'Hardscape zero-credit prototype bytes drifted from the provenance record.',
);

const thanksHtml = await readFile(path.join(distRoot, 'thanks/index.html'), 'utf8');
const thanksText = visibleText(thanksHtml);
for (const value of Object.values(CONVERSION_PAGE_COPY['thanks/index.html'])) {
  assert.ok(thanksHtml.includes(value), `/thanks/ lost centralized conversion copy: ${value}`);
}
for (const rejectedPhrase of [
  'Got it.',
  'Talk soon.',
  'I personally',
  'Skip the wait',
  'Founder, Rushes Media',
]) {
  assert.ok(!thanksText.includes(rejectedPhrase), `/thanks/ retained rejected founder-speak: ${rejectedPhrase}`);
}
assert.ok(!/\{\{COPY_[A-Z0-9_]+\}\}/.test(thanksHtml), '/thanks/ contains unresolved copy markers.');
assert.ok(thanksHtml.includes('30-minute Growth Call'), '/thanks/ Growth Call duration drifted from 30 minutes.');
assert.ok(thanksHtml.includes('data-booking-return'), '/thanks/ lost its booking return action.');
for (const utmKey of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']) {
  assert.ok(thanksHtml.includes(utmKey), `/thanks/ booking return is missing ${utmKey}.`);
}
assert.ok(thanksHtml.includes('slice(0, 120)'), '/thanks/ attribution must truncate at 120 characters.');
assert.equal(
  (thanksHtml.match(/<script\b/gi) || []).length,
  (thanksHtml.match(/<\/script>/gi) || []).length,
  '/thanks/ contains an unclosed script.',
);
assert.ok(thanksHtml.includes('AW-REPLACE_ME/REPLACE_ME_LABEL'));
assert.ok(thanksHtml.includes("!adsConversionId.includes('REPLACE_ME')"));
assert.ok(thanksHtml.includes("endsWith('.test')"));
assert.ok(thanksHtml.includes("'[::1]'"));

const playbookHtml = await readFile(path.join(distRoot, 'playbook/index.html'), 'utf8');
const playbookText = visibleText(playbookHtml);
for (const value of Object.values(CONVERSION_PAGE_COPY['playbook/index.html'])) {
  assert.ok(playbookHtml.includes(value), `/playbook/ lost centralized conversion copy: ${value}`);
}
for (const rejectedPhrase of ['Two or more under 5', 'leads are leaking somewhere', 'Send my scorecard']) {
  assert.ok(
    !playbookText.includes(rejectedPhrase),
    `/playbook/ retained rejected generic or first-person copy: ${rejectedPhrase}`,
  );
}
assert.ok(!/\{\{COPY_[A-Z0-9_]+\}\}/.test(playbookHtml), '/playbook/ contains unresolved copy markers.');

const playbookThanksHtml = await readFile(path.join(distRoot, 'playbook-thanks/index.html'), 'utf8');
const playbookThanksText = visibleText(playbookThanksHtml);
for (const value of Object.values(CONVERSION_PAGE_COPY['playbook-thanks/index.html'])) {
  assert.ok(
    playbookThanksHtml.includes(value),
    `/playbook-thanks/ lost centralized conversion copy: ${value}`,
  );
}
for (const rejectedPhrase of ['give it a couple of minutes', 'worth a conversation', 'Founder, Rushes Media']) {
  assert.ok(
    !playbookThanksText.includes(rejectedPhrase),
    `/playbook-thanks/ retained rejected casual or founder copy: ${rejectedPhrase}`,
  );
}
assert.ok(
  !/\{\{COPY_[A-Z0-9_]+\}\}/.test(playbookThanksHtml),
  '/playbook-thanks/ contains unresolved copy markers.',
);
assert.ok(playbookThanksHtml.includes('data-booking-return'), '/playbook-thanks/ lost its booking return action.');
for (const utmKey of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']) {
  assert.ok(playbookThanksHtml.includes(utmKey), `/playbook-thanks/ booking return is missing ${utmKey}.`);
}
assert.ok(
  playbookThanksHtml.includes('slice(0, 120)'),
  '/playbook-thanks/ attribution must truncate at 120 characters.',
);

const callHtml = await readFile(path.join(distRoot, 'call/index.html'), 'utf8');
const callText = visibleText(callHtml);
for (const value of Object.values(CONVERSION_PAGE_COPY['call/index.html'])) {
  assert.ok(callHtml.includes(value), `/call/ lost centralized conversion copy: ${value}`);
}
for (const rejectedPhrase of ['pitch dump', '60 seconds from Evan', 'Video landing here', 'Founder-led.']) {
  assert.ok(!callText.includes(rejectedPhrase), `/call/ retained unfinished or founder-centric copy: ${rejectedPhrase}`);
}
assert.ok(!/\{\{COPY_[A-Z0-9_]+\}\}/.test(callHtml), '/call/ contains unresolved copy markers.');

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
  `Built contract assertions passed: 13 sitemap routes; 18 GA4-tagged public pages; homepage JS ${builtFirstPartyBytes}/${HOMEPAGE_FIRST_PARTY_JS_BUDGET} legacy bytes; review routes excluded.`,
);
