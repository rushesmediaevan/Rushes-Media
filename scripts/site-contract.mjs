import SITE_FACTS from './site-facts.json' with { type: 'json' };

export const {
  SITE_ORIGIN,
  BOOKING_URL,
  GA4_MEASUREMENT_ID,
  HERO_VIDEO_VERSION,
  META_PIXEL_ID,
  GHL_TRACKING_ID,
} = SITE_FACTS;

export const GA4_LOADER_PREFIX = 'https://www.googletagmanager.com/gtag/js?id=';
export const HERO_VIDEO_URL = `/assets/video/hero-loop.mp4?v=${HERO_VIDEO_VERSION}`;
export const HOMEPAGE_FIRST_PARTY_JS_BUDGET = 6652;

/** @typedef {'generated' | 'compatibility' | 'review-only' | 'redirect' | 'api' | 'auxiliary'} RouteOwner */

/**
 * @typedef {object} SiteContractEntry
 * @property {string} path
 * @property {RouteOwner} owner
 * @property {boolean} indexable
 * @property {string=} source
 * @property {string=} title
 * @property {string=} description
 * @property {string=} canonical
 * @property {string=} robots
 * @property {string[]=} requiredAssets
 * @property {string[]=} requiredCtas
 * @property {string[]=} requiredScripts
 * @property {boolean=} sitemap
 * @property {string=} lastmod
 * @property {string=} changefreq
 * @property {string=} priority
 * @property {Record<string, string | number>=} openGraph
 * @property {Record<string, string>=} twitter
 * @property {Record<string, unknown>=} jsonLd
 * @property {string=} compatibilityDisposition
 * @property {number=} redirectStatus
 * @property {string=} redirectTo
 * @property {string=} contentTextHash
 */

/** @type {SiteContractEntry[]} */
export const SITE_CONTRACT = [
  {
    path: '/',
    owner: 'generated',
    indexable: true,
    source: 'index.html',
    title: 'Rushes Media — booked estimates from the work you already do',
    description:
      'Content, campaigns, a page that converts, and follow-up in minutes. One system for owners who can take more of the right work.',
    canonical: `${SITE_ORIGIN}/`,
    requiredAssets: [
      '/assets/images/hero/hero-bg.jpg',
      '/assets/images/hero/hero-night-city-video-poster.jpg',
      '/assets/video/hero-loop.mp4',
      '/assets/images/logo-icon.png',
      '/assets/images/logo-wordmark.png',
    ],
    requiredCtas: [
      '#book',
      '/brand-media/',
      '/campaigns/',
      '/web/',
      '/follow-up/',
      '/hardscape/',
      '/hvac/',
      '/pools/',
      '/med-spa/',
    ],
    requiredScripts: [
      GA4_LOADER_PREFIX,
      '/assets/meta-pixel.js',
      'https://link.msgsndr.com/js/form_embed.js',
      'https://link.msgsndr.com/js/external-tracking.js',
    ],
    sitemap: true,
    lastmod: '2026-08-13',
    changefreq: 'weekly',
    priority: '1.0',
    openGraph: {
      type: 'website',
      siteName: 'Rushes Media',
      title: 'Rushes Media — booked estimates from the work you already do',
      description:
        'Content, campaigns, a page that converts, and follow-up in minutes. One system for owners who can take more of the right work.',
      url: `${SITE_ORIGIN}/`,
      image: `${SITE_ORIGIN}/assets/images/hero/hero-bg.jpg`,
      imageWidth: 1920,
      imageHeight: 1080,
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Rushes Media — booked estimates from the work you already do',
      description:
        'Content, campaigns, a page that converts, and follow-up in minutes. One system for owners who can take more of the right work.',
      image: `${SITE_ORIGIN}/assets/images/hero/hero-bg.jpg`,
    },
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Rushes Media',
      url: `${SITE_ORIGIN}/`,
      description:
        'Rushes Media builds content, campaigns, websites, and follow-up systems for owner-operated local businesses — so more qualified estimates land on the calendar.',
      email: 'evan@rushesmedia.com',
      image: `${SITE_ORIGIN}/assets/images/hero/hero-bg.jpg`,
      areaServed: ['South Jersey', 'Philadelphia', 'Main Line', 'Bucks County', 'Princeton', 'Delaware'],
    },
    compatibilityDisposition: 'legacy root retained as an inert baseline fixture',
  },
  ...[
    {
      path: '/demand-loop/',
      source: 'demand-loop/index.html',
      title: 'The Demand Loop — Rushes Media',
      description:
        'Show the work, put it in front of ready buyers, catch them, book the estimate, run it tighter next month. One system. 30-minute Growth Call.',
      priority: '0.9',
    },
    {
      path: '/brand-media/',
      source: 'brand-media/index.html',
      title: 'The job is the ad — Rushes Media',
      description:
        'Reels, stills, and brand work from real jobs — then the campaign, the page, and the follow-up that books the estimate.',
      priority: '0.8',
    },
    {
      path: '/campaigns/',
      source: 'campaigns/index.html',
      title: 'Demand, not boosted posts — Rushes Media',
      description:
        'Meta and Google campaigns built around a real idea. Spend stays on your card. The calendar moves when the page and follow-up are wired.',
      priority: '0.8',
    },
    {
      path: '/web/',
      source: 'web/index.html',
      title: 'A site that books — Rushes Media',
      description:
        'Custom sites and landing pages with one job: call, book, or request the estimate. Built for the campaign behind it.',
      priority: '0.8',
    },
    {
      path: '/follow-up/',
      source: 'follow-up/index.html',
      title: 'Answer in minutes — Rushes Media',
      description:
        'Forms, calls, and DMs into one place. Text back while they’re still holding the phone. Confirmations so the estimate actually shows.',
      priority: '0.8',
    },
    {
      path: '/hardscape/',
      source: 'hardscape/index.html',
      title: 'Marketing for outdoor living contractors — Rushes Media',
      description:
        'Turn patio and outdoor living jobs into booked estimates. Content, campaigns, a page that converts, and follow-up in minutes.',
      priority: '0.8',
    },
    {
      path: '/hvac/',
      source: 'hvac/index.html',
      title: 'Marketing for HVAC replacement companies — Rushes Media',
      description:
        'Replacements on the board, not missed calls in the truck. Demand campaigns, a page that books, follow-up in minutes.',
      priority: '0.8',
    },
    {
      path: '/pools/',
      source: 'pools/index.html',
      title: 'Marketing for pool companies — Rushes Media',
      description:
        'The backyard is the ad. Campaigns, a page that books, and follow-up so the estimate lands on your calendar.',
      priority: '0.8',
    },
    {
      path: '/med-spa/',
      source: 'med-spa/index.html',
      title: 'Med spa marketing for owners — Rushes Media',
      description:
        'Consults booked, not sitting in a DM. Owner on the call. Media, campaigns, page, and follow-up as one path.',
      priority: '0.7',
    },
  ].map((route) => ({
    ...route,
    owner: /** @type {const} */ ('generated'),
    indexable: true,
    canonical: `${SITE_ORIGIN}${route.path}`,
    requiredAssets: [
      '/assets/inner-page.css',
      '/assets/images/logo-icon.png',
      '/assets/images/logo-wordmark.png',
    ],
    requiredCtas: ['#book', BOOKING_URL],
    requiredScripts: [GA4_LOADER_PREFIX, '/assets/meta-pixel.js'],
    sitemap: true,
    lastmod: '2026-08-13',
    changefreq: 'monthly',
    openGraph: {
      title: route.title,
      description: route.description,
      url: `${SITE_ORIGIN}${route.path}`,
    },
    compatibilityDisposition: 'legacy generated page retired after parity',
  })),
  {
    path: '/privacy/',
    owner: 'generated',
    indexable: true,
    source: 'privacy/index.html',
    title: 'Privacy Policy — Rushes Media',
    description:
      'Privacy Policy for Rushes Group LLC (DBA Rushes Media), including SMS and text messaging consent.',
    canonical: `${SITE_ORIGIN}/privacy/`,
    requiredAssets: ['/assets/images/logo-icon.png', '/assets/images/logo-wordmark.png'],
    requiredCtas: [`${SITE_ORIGIN}/terms/`, `${SITE_ORIGIN}/#book`],
    requiredScripts: [GA4_LOADER_PREFIX],
    sitemap: true,
    lastmod: '2026-08-13',
    changefreq: 'yearly',
    priority: '0.2',
    contentTextHash: '2b2324a64bf0e6ec754d2d790ce82a17e6fe1d190db53e248699b689ac7534cf',
    compatibilityDisposition: 'legacy legal page retired after parity',
  },
  {
    path: '/terms/',
    owner: 'generated',
    indexable: true,
    source: 'terms/index.html',
    title: 'Terms of Service & SMS Program — Rushes Media',
    description:
      'Terms of Service and SMS messaging program terms for Rushes Group LLC (DBA Rushes Media).',
    canonical: `${SITE_ORIGIN}/terms/`,
    requiredAssets: ['/assets/images/logo-icon.png', '/assets/images/logo-wordmark.png'],
    requiredCtas: [`${SITE_ORIGIN}/privacy/`, `${SITE_ORIGIN}/#book`],
    requiredScripts: [GA4_LOADER_PREFIX],
    sitemap: true,
    lastmod: '2026-08-13',
    changefreq: 'yearly',
    priority: '0.2',
    contentTextHash: '2192125406c7b207b84ab40e07d5300521928e08a1522c403a795bff65aaeee4',
    compatibilityDisposition: 'legacy legal page retired after parity',
  },
  {
    path: '/call/',
    owner: 'compatibility',
    indexable: false,
    source: 'call/index.html',
    title: 'Your Growth Call — Rushes Media',
    robots: 'noindex',
    requiredScripts: [GA4_LOADER_PREFIX],
    compatibilityDisposition: 'explicit compatibility layer',
  },
  {
    path: '/funnel/',
    owner: 'compatibility',
    indexable: false,
    source: 'funnel/index.html',
    title: 'Rushes Media — Growth Call',
    robots: 'noindex',
    requiredScripts: [GA4_LOADER_PREFIX],
    compatibilityDisposition: 'explicit compatibility layer; retirement unconfirmed',
  },
  {
    path: '/playbook/',
    owner: 'compatibility',
    indexable: false,
    source: 'playbook/index.html',
    title: 'Get the scorecard — Rushes Media',
    robots: 'noindex',
    requiredScripts: [GA4_LOADER_PREFIX],
    compatibilityDisposition: 'explicit compatibility layer; next migration slice',
  },
  {
    path: '/playbook-thanks/',
    owner: 'compatibility',
    indexable: false,
    source: 'playbook-thanks/index.html',
    title: 'Scorecard on the way — Rushes Media',
    robots: 'noindex',
    requiredScripts: [GA4_LOADER_PREFIX],
    compatibilityDisposition: 'explicit compatibility layer; migrate with playbook',
  },
  {
    path: '/thanks/',
    owner: 'compatibility',
    indexable: false,
    source: 'thanks/index.html',
    title: 'Thanks — Rushes Media',
    robots: 'noindex',
    requiredScripts: [GA4_LOADER_PREFIX],
    compatibilityDisposition: 'explicit compatibility layer',
  },
  {
    path: '/work/',
    owner: 'review-only',
    indexable: false,
    source: 'work/index.html',
    title: 'Rushes — Work, systems, and honest proof',
    robots: 'noindex,nofollow',
    compatibilityDisposition: 'local review only; publication approval required',
  },
  ...['/inquire', '/inquire/', '/inquire/index.html', '/connect', '/connect/', '/connect/index.html', '/contact', '/contact/', '/contact/index.html'].map(
    (path) => ({
      path,
      owner: /** @type {const} */ ('redirect'),
      indexable: false,
      source: 'server.js',
      sitemap: false,
      redirectStatus: 301,
      redirectTo: '/#book',
      compatibilityDisposition: 'authoritative redirect; legacy browser file excluded',
    }),
  ),
  ...['/book', '/book/'].map((path) => ({
    path,
    owner: /** @type {const} */ ('redirect'),
    indexable: false,
    source: 'server.js',
    sitemap: false,
    redirectStatus: 302,
    redirectTo: BOOKING_URL,
    compatibilityDisposition: 'authoritative booking redirect',
  })),
  ...['/api/health', '/api/lead', '/api/playbook-capture'].map((path) => ({
    path,
    owner: /** @type {const} */ ('api'),
    indexable: false,
    source: 'server.js',
    sitemap: false,
    compatibilityDisposition: 'preserved Node API',
  })),
  {
    path: '/robots.txt',
    owner: 'auxiliary',
    indexable: false,
    source: 'src/pages/robots.txt.ts',
    sitemap: false,
    compatibilityDisposition: 'Astro-generated crawler policy endpoint',
  },
  {
    path: '/sitemap.xml',
    owner: 'auxiliary',
    indexable: false,
    source: 'src/pages/sitemap.xml.ts',
    sitemap: false,
    compatibilityDisposition: 'Astro-generated sitemap endpoint',
  },
  {
    path: '/call/teleprompter.html',
    owner: 'auxiliary',
    indexable: false,
    source: 'call/teleprompter.html',
    robots: 'noindex',
    compatibilityDisposition: 'auxiliary compatibility file',
  },
];

export const ASTRO_ROUTES = SITE_CONTRACT.filter((entry) => entry.owner === 'generated');
export const INDEXABLE_ROUTES = SITE_CONTRACT.filter((entry) => entry.sitemap === true);
export const REDIRECT_ROUTES = SITE_CONTRACT.filter((entry) => entry.owner === 'redirect');
export const GENERATED_ENDPOINT_ROUTES = SITE_CONTRACT.filter(
  (entry) => entry.owner === 'auxiliary' && entry.source?.startsWith('src/pages/'),
);
export const COMPATIBILITY_ROUTES = SITE_CONTRACT.filter(
  (entry) => entry.owner === 'compatibility',
);
export const REVIEW_ONLY_ROUTES = SITE_CONTRACT.filter((entry) => entry.owner === 'review-only');

export const COMPATIBILITY_FILES = [
  'call/index.html',
  'funnel/index.html',
  'funnel/funnel.css',
  'funnel/funnel.js',
  'funnel/niches/hardscape.json',
  'playbook/index.html',
  'playbook-thanks/index.html',
  'thanks/index.html',
];

export const REVIEW_COMPATIBILITY_FILES = [
  'call/teleprompter.html',
  'work/index.html',
];

export const PUBLIC_ASSET_FILES = [
  'assets/inner-page.css',
  'assets/meta-pixel.js',
  'assets/images/hero/hero-bg.jpg',
  'assets/images/hero/hero-night-city-poster.jpg',
  'assets/images/hero/hero-night-city-video-poster.jpg',
  'assets/images/logo-icon.png',
  'assets/images/logo-wordmark.png',
  'assets/video/hero-loop.mp4',
];

export const REVIEW_ASSET_FILES = [
  'assets/proof/pf-004-hardscape-campaign.png',
  'assets/proof/pf-005-hvac-campaign.png',
  'assets/proof/pf-006-visual-range.png',
];

export const ASTRO_ROUTE_DIRECTORIES = new Set(
  ASTRO_ROUTES.filter((entry) => entry.path !== '/').map((entry) => entry.path.split('/')[1]),
);

export function contractForPath(pathname) {
  return SITE_CONTRACT.find((entry) => entry.path === pathname);
}
