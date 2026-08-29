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
export const HERO_VIDEO_POSTER_PATH = '/assets/images/hero/hero-night-city-video-poster-665c792f.jpg';
// The homepage remains hydration-free. This 11 KiB ceiling includes the owned
// loading/fallback and delegated CTA telemetry required for resilient booking.
// The bounded increase covers the no-hydration booking readiness probe and its
// designed blocked-frame fallback; the approved hero runtime remains unchanged.
export const HOMEPAGE_FIRST_PARTY_JS_BUDGET = 14 * 1024;

const industryDerivativeFiles = (slug, widths, social = false) => [
  ...widths.flatMap((width) => ['avif', 'webp', 'jpg'].map(
    (extension) => `assets/images/industries/${slug}-${width}.${extension}`,
  )),
  ...(social ? [`assets/images/industries/${slug}-social-1200x630.jpg`] : []),
];

const INDUSTRY_ASSETS = {
  outdoorLiving: industryDerivativeFiles('outdoor-living-hero', [640, 960, 1440, 1920], true),
  outdoorLivingPool: industryDerivativeFiles('outdoor-living-pool', [640, 960, 1440, 1920]),
  interiorDesign: industryDerivativeFiles('interior-design-hero', [640, 960, 1440, 1920], true),
  interiorDetail: industryDerivativeFiles('interior-design-detail', [640, 960, 1440]),
  hvac: industryDerivativeFiles('hvac-hero', [640, 960, 1440, 1920], true),
  medSpa: industryDerivativeFiles('med-spa-hero', [640, 960], true),
  hubSocial: ['assets/images/industries/industries-hub-social-1200x630.jpg'],
};

export const INDUSTRY_BROWSER_ASSET_FILES = [...new Set(Object.values(INDUSTRY_ASSETS).flat())];
const publicAssetUrls = (files) => files.map((file) => `/${file}`);

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
 * @property {Record<string, string | number>=} openGraph
 * @property {Record<string, string>=} twitter
 * @property {Record<string, unknown>=} jsonLd
 * @property {string=} parentRoute
 * @property {{name: string, path: string}[]=} breadcrumb
 * @property {'active' | 'core-market' | 'specialty' | 'selective-hold' | 'stable' | 'review-only'=} lifecycleStatus
 * @property {{status: 'held' | 'approved', truthClass: string, sourceMaster?: string, publicUrl?: string, width?: number, height?: number}=} primaryImage
 * @property {string=} compatibilityDisposition
 * @property {number=} redirectStatus
 * @property {string=} redirectTo
 * @property {string=} contentTextHash
 */

function routeSchema(path, title, description, breadcrumb, image) {
  const canonical = `${SITE_ORIGIN}${path}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': canonical,
        url: canonical,
        name: title,
        description,
        ...(image ? { image } : {}),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumb.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: `${SITE_ORIGIN}${item.path}`,
        })),
      },
    ],
  };
}

/** @type {SiteContractEntry[]} */
export const SITE_CONTRACT = [
  {
    path: '/',
    owner: 'generated',
    indexable: true,
    source: 'src/pages/index.astro',
    title: 'Rushes Media — booked estimates from the work you already do',
    description:
      'Content, campaigns, a page that converts, and follow-up in minutes. One system for owners who can take more of the right work.',
    canonical: `${SITE_ORIGIN}/`,
    requiredAssets: [
      '/assets/images/hero/hero-bg.jpg',
      HERO_VIDEO_POSTER_PATH,
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
      '/industries/',
      '/outdoor-living/',
      '/interior-design/',
      '/hvac/',
      '/med-spa/',
    ],
    requiredScripts: [
      GA4_LOADER_PREFIX,
      '/assets/meta-pixel.js',
      'https://link.msgsndr.com/js/external-tracking.js',
    ],
    sitemap: true,
    lastmod: '2026-08-29',
    lifecycleStatus: 'active',
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
      '@graph': [
        {
          '@type': 'ProfessionalService',
          name: 'Rushes Media',
          url: `${SITE_ORIGIN}/`,
          description:
            'Rushes Media builds content, campaigns, websites, and follow-up systems for owner-operated local businesses — so more qualified estimates land on the calendar.',
          email: 'evan@rushesmedia.com',
          telephone: '(609) 405-9918',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '1636 Oak Avenue',
            addressLocality: 'Haddon Heights',
            addressRegion: 'NJ',
            postalCode: '08035',
            addressCountry: 'US',
          },
          sameAs: ['https://www.instagram.com/rushes.media/'],
          image: `${SITE_ORIGIN}/assets/images/hero/hero-bg.jpg`,
          areaServed: ['South Jersey', 'Philadelphia', 'Main Line', 'Bucks County', 'Princeton', 'Delaware'],
        },
        {
          '@type': 'FAQPage',
          // Q&A copy must stay in sync with `faqs` in src/data/home.ts; the built-contract assertion enforces it.
          mainEntity: [
            {
              '@type': 'Question',
              name: 'What kinds of businesses do you work with?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Our best fit today is owner-led outdoor living and design-build, interior design and residential build, HVAC replacement, and med spa or aesthetic practices. Pools sit inside the broader outdoor-living path rather than as a separate specialty. We’re based in South Jersey and focus first on Philadelphia, the Main Line, Bucks County, and the wider Mid-Atlantic. Adjacent local-service businesses are evaluated by inquiry rather than given a page that pretends expertise.',
              },
            },
            {
              '@type': 'Question',
              name: 'How quickly can we get started?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'A Growth Call is usually within 48 hours of you reaching out. After we agree on fit, we stand up the core system — site or landing page, capture, follow-up, and campaign structure — and start proving booked estimates in the first 30 days.',
              },
            },
            {
              '@type': 'Question',
              name: 'Do I have to be involved in the day-to-day?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'No. You run the business and close the work. We run the media, campaigns, and follow-up. You’ll review creative and stay reachable for estimate calls — that’s the partnership.',
              },
            },
            {
              '@type': 'Question',
              name: 'What’s the commitment?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Flat monthly. In the first 30 days live, if we aren’t booking you real estimates, you don’t pay for month two — we prove it before you’re locked in. Exact numbers and any shared upside are set on the Growth Call from your real job values. We don’t guarantee closed jobs; we own the path to the calendar.',
              },
            },
            {
              '@type': 'Question',
              name: 'Do you do content, campaigns, or both?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Both — and they work better together. Content builds trust. Campaigns put that proof in front of ready buyers. Pages and follow-up turn interest into booked estimates. Selling only posts or only spend is how leads fall between vendors.',
              },
            },
            {
              '@type': 'Question',
              name: 'How do you measure results?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Booked estimates (or booked consults), show rate, cost per booked estimate where spend is live, and speed-to-lead. You get reporting tied to the calendar — not follower counts.',
              },
            },
            {
              '@type': 'Question',
              name: 'Why don’t you call yourselves a “marketing agency”?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Because owners don’t buy “marketing.” They buy more of the right people on the calendar. We build media, campaigns, web, and follow-up as one system — not four separate vendors. You’re hiring the full path, not a media buyer.',
              },
            },
          ],
        },
      ],
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
    },
    {
      path: '/brand-media/',
      source: 'brand-media/index.html',
      title: 'The job is the ad — Rushes Media',
      description:
        'Reels, stills, and brand work from real jobs — then the campaign, the page, and the follow-up that books the estimate.',
    },
    {
      path: '/campaigns/',
      source: 'campaigns/index.html',
      title: 'Demand, not boosted posts — Rushes Media',
      description:
        'Meta and Google campaigns built around a real idea. Spend stays on your card. The calendar moves when the page and follow-up are wired.',
    },
    {
      path: '/web/',
      source: 'web/index.html',
      title: 'A site that books — Rushes Media',
      description:
        'Custom sites and landing pages with one job: call, book, or request the estimate. Built for the campaign behind it.',
    },
    {
      path: '/follow-up/',
      source: 'follow-up/index.html',
      title: 'Answer in minutes — Rushes Media',
      description:
        'Forms, calls, and DMs into one place. Text back while they’re still holding the phone. Confirmations so the estimate actually shows.',
    },
  ].map((route) => ({
    ...route,
    owner: /** @type {const} */ ('generated'),
    indexable: true,
    source: 'src/pages/[slug]/index.astro',
    canonical: `${SITE_ORIGIN}${route.path}`,
    requiredAssets: [
      '/assets/inner-page.css',
      '/assets/images/logo-icon.png',
      '/assets/images/logo-wordmark.png',
    ],
    requiredCtas: ['#book', BOOKING_URL],
    requiredScripts: [GA4_LOADER_PREFIX, '/assets/meta-pixel.js'],
    sitemap: true,
    lastmod: '2026-08-29',
    lifecycleStatus: 'stable',
    openGraph: {
      title: route.title,
      description: route.description,
      url: `${SITE_ORIGIN}${route.path}`,
    },
    compatibilityDisposition: 'Astro service or mechanism route with a shared conversion contract',
  })),
  {
    path: '/industries/',
    owner: 'generated',
    indexable: true,
    source: 'src/pages/industries/index.astro',
    title: 'Marketing Systems by Industry | Rushes Media',
    description:
      'Explore connected media, campaign, conversion and follow-up systems for outdoor living, interior design, HVAC replacement and aesthetic practices.',
    canonical: `${SITE_ORIGIN}/industries/`,
    requiredAssets: [
      '/assets/industry-page.css',
      '/assets/images/logo-icon.png',
      '/assets/images/logo-wordmark.png',
      ...publicAssetUrls([
        ...INDUSTRY_ASSETS.outdoorLiving.filter((file) => !file.includes('-social-')),
        ...INDUSTRY_ASSETS.interiorDesign.filter((file) => !file.includes('-social-')),
        ...INDUSTRY_ASSETS.hvac.filter((file) => !file.includes('-social-')),
        ...INDUSTRY_ASSETS.medSpa.filter((file) => !file.includes('-social-')),
        ...INDUSTRY_ASSETS.hubSocial,
      ]),
    ],
    requiredCtas: [
      '#book',
      BOOKING_URL,
      '/outdoor-living/',
      '/interior-design/',
      '/hvac/',
      '/med-spa/',
    ],
    requiredScripts: [GA4_LOADER_PREFIX, '/assets/meta-pixel.js'],
    sitemap: true,
    lastmod: '2026-08-28',
    lifecycleStatus: 'core-market',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Industries', path: '/industries/' },
    ],
    openGraph: {
      title: 'Marketing Systems by Industry | Rushes Media',
      description:
        'Explore connected media, campaign, conversion and follow-up systems for outdoor living, interior design, HVAC replacement and aesthetic practices.',
      url: `${SITE_ORIGIN}/industries/`,
      image: `${SITE_ORIGIN}/assets/images/industries/industries-hub-social-1200x630.jpg`,
      imageWidth: 1200,
      imageHeight: 630,
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Marketing Systems by Industry | Rushes Media',
      description:
        'Explore connected media, campaign, conversion and follow-up systems for outdoor living, interior design, HVAC replacement and aesthetic practices.',
      image: `${SITE_ORIGIN}/assets/images/industries/industries-hub-social-1200x630.jpg`,
    },
    jsonLd: routeSchema(
      '/industries/',
      'Marketing Systems by Industry | Rushes Media',
      'Explore connected media, campaign, conversion and follow-up systems for outdoor living, interior design, HVAC replacement and aesthetic practices.',
      [
        { name: 'Home', path: '/' },
        { name: 'Industries', path: '/industries/' },
      ],
      `${SITE_ORIGIN}/assets/images/industries/industries-hub-social-1200x630.jpg`,
    ),
    primaryImage: {
      status: 'approved',
      truthClass: 'labeled-concept',
      sourceMaster: 'composite of the approved Outdoor Living and HVAC concept masters',
      publicUrl: '/assets/images/industries/industries-hub-social-1200x630.jpg',
      width: 1200,
      height: 630,
    },
    compatibilityDisposition: 'Astro market-selection hub for three buying models and four core markets',
  },
  ...[
    {
      path: '/outdoor-living/',
      source: 'src/pages/[slug]/index.astro',
      title: 'Outdoor Living Contractor Marketing | Rushes Media',
      description:
        'Marketing systems for hardscape, landscape design-build, and custom pool contractors—connecting project media, qualification, booking, and follow-up.',
      parentRoute: '/industries/',
      lifecycleStatus: /** @type {const} */ ('core-market'),
      breadcrumbName: 'Outdoor Living & Design-Build',
      assetFiles: [...INDUSTRY_ASSETS.outdoorLiving, ...INDUSTRY_ASSETS.outdoorLivingPool],
      socialImage: '/assets/images/industries/outdoor-living-hero-social-1200x630.jpg',
      primaryImage: {
        status: /** @type {const} */ ('approved'),
        truthClass: 'labeled-concept',
        sourceMaster: 'clients/rushes-media/assets/industry-pages/hardscape/masters/nano-banana-pro-4x5-4k-master.png',
        publicUrl: '/assets/images/industries/outdoor-living-hero-1920.jpg',
        width: 1920,
        height: 2400,
      },
    },
    {
      path: '/interior-design/',
      source: 'src/pages/[slug]/index.astro',
      title: 'Interior Design Marketing Systems | Rushes Media',
      description:
        'Marketing systems for interior designers, kitchen and bath studios, residential design-build firms, and cabinetry teams seeking better-fit consultations.',
      parentRoute: '/industries/',
      lifecycleStatus: /** @type {const} */ ('core-market'),
      breadcrumbName: 'Interior Design & Residential Build',
      assetFiles: [...INDUSTRY_ASSETS.interiorDesign, ...INDUSTRY_ASSETS.interiorDetail],
      socialImage: '/assets/images/industries/interior-design-hero-social-1200x630.jpg',
      primaryImage: {
        status: /** @type {const} */ ('approved'),
        truthClass: 'labeled-concept',
        sourceMaster: 'clients/rushes-media/assets/industry-pages/interior-design/masters/recraft-v41-living-master.png',
        publicUrl: '/assets/images/industries/interior-design-hero-1920.jpg',
        width: 1920,
        height: 1080,
      },
    },
    {
      path: '/hvac/',
      source: 'src/pages/[slug]/index.astro',
      title: 'HVAC Marketing for Replacement Estimates | Rushes Media',
      description:
        'Connect HVAC campaigns, call and form capture, service-versus-replacement routing, booking, and estimate follow-up around qualified changeout opportunities.',
      parentRoute: '/industries/',
      lifecycleStatus: /** @type {const} */ ('core-market'),
      breadcrumbName: 'HVAC Replacement & Home Comfort',
      assetFiles: INDUSTRY_ASSETS.hvac,
      socialImage: '/assets/images/industries/hvac-hero-social-1200x630.jpg',
      primaryImage: {
        status: /** @type {const} */ ('approved'),
        truthClass: 'labeled-concept',
        sourceMaster: 'clients/rushes-media/assets/industry-pages/hvac/masters/nano-banana-pro-4x5-4k-master.png',
        publicUrl: '/assets/images/industries/hvac-hero-1920.jpg',
        width: 1920,
        height: 2400,
      },
    },
    {
      path: '/med-spa/',
      source: 'src/pages/[slug]/index.astro',
      title: 'Med Spa Marketing for Qualified Consults | Rushes Media',
      description:
        'Connect approved treatment positioning, campaign creative, consult capture, booking, and consented follow-up around services and provider capacity.',
      parentRoute: '/industries/',
      lifecycleStatus: /** @type {const} */ ('core-market'),
      breadcrumbName: 'Med Spa & Aesthetic Practices',
      assetFiles: INDUSTRY_ASSETS.medSpa,
      socialImage: '/assets/images/industries/med-spa-hero-social-1200x630.jpg',
      primaryImage: {
        status: /** @type {const} */ ('approved'),
        truthClass: 'labeled-concept',
        sourceMaster: 'clients/rushes-media/assets/industry-pages/med-spa/masters/flux2pro-treatment-room-master.jpg',
        publicUrl: '/assets/images/industries/med-spa-hero-960.jpg',
        width: 960,
        height: 1200,
      },
    },
  ].map((route) => {
    const breadcrumb = [
      { name: 'Home', path: '/' },
      { name: 'Industries', path: '/industries/' },
      { name: route.breadcrumbName, path: route.path },
    ];
    return {
      path: route.path,
      owner: /** @type {const} */ ('generated'),
      indexable: route.sitemap !== false,
      source: route.source,
      title: route.title,
      description: route.description,
      canonical: `${SITE_ORIGIN}${route.path}`,
      requiredAssets: [
        '/assets/industry-page.css',
        '/assets/images/logo-icon.png',
        '/assets/images/logo-wordmark.png',
        ...publicAssetUrls(route.assetFiles),
      ],
      requiredCtas: ['#book', BOOKING_URL],
      requiredScripts: [GA4_LOADER_PREFIX, '/assets/meta-pixel.js'],
      sitemap: true,
      lastmod: '2026-08-28',
      parentRoute: route.parentRoute,
      breadcrumb,
      lifecycleStatus: route.lifecycleStatus,
      primaryImage: route.primaryImage,
      openGraph: {
        title: route.title,
        description: route.description,
        url: `${SITE_ORIGIN}${route.path}`,
        image: `${SITE_ORIGIN}${route.socialImage}`,
        imageWidth: 1200,
        imageHeight: 630,
      },
      twitter: {
        card: 'summary_large_image',
        title: route.title,
        description: route.description,
        image: `${SITE_ORIGIN}${route.socialImage}`,
      },
      jsonLd: routeSchema(
        route.path,
        route.title,
        route.description,
        breadcrumb,
        `${SITE_ORIGIN}${route.primaryImage.publicUrl}`,
      ),
      compatibilityDisposition: 'substantial Astro market page; retired niche aliases redirect here where applicable',
    };
  }),
  {
    path: '/privacy/',
    owner: 'generated',
    indexable: true,
    source: 'src/pages/privacy/index.astro',
    title: 'Privacy Policy — Rushes Media',
    description:
      'Privacy Policy for Rushes Group LLC (DBA Rushes Media), including SMS and text messaging consent.',
    canonical: `${SITE_ORIGIN}/privacy/`,
    requiredAssets: ['/assets/images/logo-icon.png', '/assets/images/logo-wordmark.png'],
    requiredCtas: [`${SITE_ORIGIN}/terms/`, `${SITE_ORIGIN}/#book`],
    requiredScripts: [GA4_LOADER_PREFIX],
    sitemap: true,
    lastmod: '2026-08-13',
    lifecycleStatus: 'stable',
    contentTextHash: '2b2324a64bf0e6ec754d2d790ce82a17e6fe1d190db53e248699b689ac7534cf',
    compatibilityDisposition: 'legacy legal page retired after parity',
  },
  {
    path: '/terms/',
    owner: 'generated',
    indexable: true,
    source: 'src/pages/terms/index.astro',
    title: 'Terms of Service & SMS Program — Rushes Media',
    description:
      'Terms of Service and SMS messaging program terms for Rushes Group LLC (DBA Rushes Media).',
    canonical: `${SITE_ORIGIN}/terms/`,
    requiredAssets: ['/assets/images/logo-icon.png', '/assets/images/logo-wordmark.png'],
    requiredCtas: [`${SITE_ORIGIN}/privacy/`, `${SITE_ORIGIN}/#book`],
    requiredScripts: [GA4_LOADER_PREFIX],
    sitemap: true,
    lastmod: '2026-08-13',
    lifecycleStatus: 'stable',
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
  ...[
    {
      path: '/work/',
      title: 'Rushes Media — local portfolio concept review',
      requiredAssets: [
        '/assets/work/work-review.css',
        '/assets/work/work-review.js',
        '/assets/work/stonevale/hero-poster.jpg',
        '/assets/work/halewood/hero-poster.jpg',
      ],
    },
    {
      path: '/work/stonevale/',
      title: 'Stonevale Outdoor Living — fictional website concept by Rushes Media',
      parentRoute: '/work/',
      requiredAssets: [
        '/assets/work/work-review.css',
        '/assets/work/work-review.js',
        '/assets/work/stonevale/hero-dusk-web.mp4',
        '/assets/work/stonevale/hero-poster.jpg',
        '/assets/work/stonevale/patio-after.jpg',
        '/assets/work/stonevale/patio-before.jpg',
        '/assets/work/stonevale/outdoor-kitchen.jpg',
        '/assets/work/stonevale/fire-bowl.jpg',
      ],
    },
    {
      path: '/work/halewood/',
      title: 'Halewood Interiors — fictional website concept by Rushes Media',
      parentRoute: '/work/',
      requiredAssets: [
        '/assets/work/work-review.css',
        '/assets/work/work-review.js',
        '/assets/work/halewood/hero-living-web.mp4',
        '/assets/work/halewood/hero-poster.jpg',
        '/assets/work/halewood/living-after.jpg',
        '/assets/work/halewood/living-before.jpg',
        '/assets/work/halewood/kitchen.jpg',
        '/assets/work/halewood/sconce-detail.jpg',
      ],
    },
  ].map((entry) => ({
    ...entry,
    owner: /** @type {const} */ ('review-only'),
    indexable: false,
    source: 'src/pages/work/[...path].astro',
    robots: 'noindex,nofollow',
    sitemap: false,
    lifecycleStatus: /** @type {const} */ ('review-only'),
    compatibilityDisposition: 'local review build only; intentionally absent from release output',
  })),
  ...[
    '/hardscape',
    '/hardscape/',
    '/hardscape/index.html',
    '/pools',
    '/pools/',
    '/pools/index.html',
  ].map((path) => ({
    path,
    owner: /** @type {const} */ ('redirect'),
    indexable: false,
    source: 'server.js',
    sitemap: false,
    redirectStatus: 301,
    redirectTo: '/outdoor-living/',
    compatibilityDisposition: 'retired niche alias consolidated into Outdoor Living',
  })),
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
  {
    path: '/favicon.ico',
    owner: 'redirect',
    indexable: false,
    source: 'server.js',
    sitemap: false,
    redirectStatus: 302,
    redirectTo: '/assets/images/logo-icon.png',
    compatibilityDisposition: 'browser favicon alias to the established Rushes icon',
  },
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

const canonicalContentRedirects = SITE_CONTRACT
  .filter((entry) => entry.owner === 'generated')
  .flatMap((entry) => {
    const variants = entry.path === '/'
      ? ['/index.html']
      : [entry.path.slice(0, -1), `${entry.path}index.html`];
    return variants.map((path) => ({
      path,
      owner: /** @type {const} */ ('redirect'),
      indexable: false,
      source: 'server.js',
      sitemap: false,
      redirectStatus: 301,
      redirectTo: entry.path,
      compatibilityDisposition: 'canonical directory redirect',
    }));
  });

SITE_CONTRACT.push(...canonicalContentRedirects);

export const ASTRO_ROUTES = SITE_CONTRACT.filter((entry) => entry.owner === 'generated');
export const INDEXABLE_ROUTES = SITE_CONTRACT.filter(
  (entry) => entry.indexable === true && entry.sitemap === true,
);
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
];

export const PUBLIC_ASSET_FILES = [
  'assets/inner-page.css',
  'assets/industry-page.css',
  'assets/meta-pixel.js',
  'assets/images/hero/hero-bg.jpg',
  'assets/images/hero/hero-night-city-poster.jpg',
  HERO_VIDEO_POSTER_PATH.slice(1),
  'assets/images/logo-icon.png',
  'assets/images/logo-wordmark.png',
  'assets/video/hero-loop.mp4',
  ...INDUSTRY_BROWSER_ASSET_FILES,
];

export const REVIEW_ASSET_FILES = [
  'assets/proof/industry-hardscape-hero-prototype.png',
  'assets/proof/pf-004-hardscape-campaign.png',
  'assets/proof/pf-005-hvac-campaign.png',
  'assets/proof/pf-006-visual-range.png',
  'assets/work/work-review.css',
  'assets/work/work-review.js',
  'assets/work/stonevale/hero-dusk-web.mp4',
  'assets/work/stonevale/hero-poster.jpg',
  'assets/work/stonevale/patio-after.jpg',
  'assets/work/stonevale/patio-before.jpg',
  'assets/work/stonevale/outdoor-kitchen.jpg',
  'assets/work/stonevale/fire-bowl.jpg',
  'assets/work/halewood/hero-living-web.mp4',
  'assets/work/halewood/hero-poster.jpg',
  'assets/work/halewood/living-after.jpg',
  'assets/work/halewood/living-before.jpg',
  'assets/work/halewood/kitchen.jpg',
  'assets/work/halewood/sconce-detail.jpg',
];

export const ASTRO_ROUTE_DIRECTORIES = new Set(
  [...ASTRO_ROUTES, ...REVIEW_ONLY_ROUTES]
    .filter((entry) => entry.path !== '/')
    .map((entry) => entry.path.split('/')[1]),
);

export function contractForPath(pathname) {
  return SITE_CONTRACT.find((entry) => entry.path === pathname);
}
