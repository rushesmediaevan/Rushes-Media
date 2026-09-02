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
// The homepage remains hydration-free. This 15 KiB ceiling includes the owned
// loading/fallback and delegated CTA telemetry required for resilient booking.
// The bounded 15 KiB ceiling covers both visible-frame and credential-free
// reachability checks; the approved hero runtime remains unchanged.
export const HOMEPAGE_FIRST_PARTY_JS_BUDGET = 15 * 1024;

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

const revisionDerivativeFiles = (slug) => [
  ...[800, 1200, 1600].flatMap((width) => ['avif', 'webp'].map(
    (extension) => `assets/images/revision/${slug}-desktop-${width}.${extension}`,
  )),
  ...[480, 800, 1200].flatMap((width) => ['avif', 'webp'].map(
    (extension) => `assets/images/revision/${slug}-mobile-${width}.${extension}`,
  )),
];

const REVISION_ASSETS = {
  bakery: revisionDerivativeFiles('02-bakery'),
  restaurant: revisionDerivativeFiles('04-restaurant'),
  medSpa: revisionDerivativeFiles('05-medspa'),
  daylitVenue: revisionDerivativeFiles('06-daylit-venue'),
  coastalTerrace: revisionDerivativeFiles('07-coastal-terrace'),
};

export const REVISION_BROWSER_ASSET_FILES = [
  ...REVISION_ASSETS.bakery,
  ...REVISION_ASSETS.restaurant,
  ...REVISION_ASSETS.medSpa,
  ...REVISION_ASSETS.daylitVenue,
  ...REVISION_ASSETS.coastalTerrace,
];

const homepageDerivativeFiles = (slug) => [
  ...[800, 1200, 1600].flatMap((width) => ['avif', 'webp'].map(
    (extension) => `assets/images/homepage/${slug}-desktop-${width}.${extension}`,
  )),
  ...[480, 800, 1200].flatMap((width) => ['avif', 'webp'].map(
    (extension) => `assets/images/homepage/${slug}-mobile-${width}.${extension}`,
  )),
];

const HOMEPAGE_ASSETS = {
  brandMediaRiversideMill: homepageDerivativeFiles('brand-media-riverside-mill'),
  campaignsSubmerged: homepageDerivativeFiles('campaigns-submerged'),
  webLawOffice: homepageDerivativeFiles('web-law-office'),
};

export const HOMEPAGE_BROWSER_ASSET_FILES = Object.values(HOMEPAGE_ASSETS).flat();

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
    title: 'Rushes Media | Media, Web, AI & Growth Systems',
    description:
      'Rushes helps businesses grow through exceptional media, creative campaigns, web experiences, practical AI consulting, and business systems.',
    canonical: `${SITE_ORIGIN}/`,
    requiredAssets: [
      '/assets/images/hero/hero-bg.jpg',
      HERO_VIDEO_POSTER_PATH,
      '/assets/video/hero-loop.mp4',
      '/assets/images/logo-icon.png',
      '/assets/images/logo-wordmark.png',
      ...publicAssetUrls(HOMEPAGE_BROWSER_ASSET_FILES),
      ...publicAssetUrls(INDUSTRY_ASSETS.outdoorLiving.filter((file) => !file.includes('-social-'))),
      ...publicAssetUrls(REVISION_ASSETS.medSpa),
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
    lastmod: '2026-09-02',
    lifecycleStatus: 'active',
    openGraph: {
      type: 'website',
      siteName: 'Rushes Media',
      title: 'Rushes Media | Media, Web, AI & Growth Systems',
      description:
        'Rushes helps businesses grow through exceptional media, creative campaigns, web experiences, practical AI consulting, and business systems.',
      url: `${SITE_ORIGIN}/`,
      image: `${SITE_ORIGIN}/assets/images/hero/hero-bg.jpg`,
      imageWidth: 1920,
      imageHeight: 1080,
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Rushes Media | Media, Web, AI & Growth Systems',
      description:
        'Rushes helps businesses grow through exceptional media, creative campaigns, web experiences, practical AI consulting, and business systems.',
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
            'Rushes helps businesses grow through exceptional media, creative campaigns, web experiences, practical AI consulting, and business systems.',
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
                text: 'Rushes works across industries. The best starting point is a business ready to invest in growth, stronger creative, a better customer experience, or systems that save time. The industry examples on this site show how the approach changes by business; they are not the full list of companies we can help.',
              },
            },
            {
              '@type': 'Question',
              name: 'How quickly can we get started?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Timing depends on the priority, access, and the work involved. The 30-minute Growth Call identifies the best place to start and the next practical step.',
              },
            },
            {
              '@type': 'Question',
              name: 'Do I have to be involved in the day-to-day?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'You provide the business context and approvals. Rushes handles the creative or digital work and keeps the right people involved when buyer questions or business decisions need an answer.',
              },
            },
            {
              '@type': 'Question',
              name: 'What’s the commitment?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Engagements are built around the first meaningful priority, not a prebuilt package. The Growth Call establishes fit, timing, and whether a focused project or an ongoing engagement makes sense.',
              },
            },
            {
              '@type': 'Question',
              name: 'Can Rushes handle one capability or connect several?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. Brand Media, campaigns, web, and AI or business systems can each stand alone. When several are useful, the Demand Loop connects them around one goal and one clear path from attention to action.',
              },
            },
            {
              '@type': 'Question',
              name: 'How do you measure results?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'We choose a small set of signals that match the goal. Depending on the work, that may be audience response, qualified inquiries, booked conversations, or action on a page.',
              },
            },
            {
              '@type': 'Question',
              name: 'Do we need the full Demand Loop?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'No. The Demand Loop is Rushes’ connected system, not a mandatory package. Start with the capability that matters now, then connect more of the path only when it creates useful leverage.',
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
      title: 'The Demand Loop | Rushes Media',
      description:
        'The Rushes system connecting Brand Media, campaigns, web, AI-supported business systems, lead capture, and follow-up around one clear path from attention to action.',
      lastmod: '2026-09-02',
    },
    {
      path: '/brand-media/',
      source: 'brand-media/index.html',
      title: 'Brand Media: Photo, Video & Creative | Rushes Media',
      description:
        'Photo, video, and campaign creative that makes a business easier to notice, understand, and choose.',
      lastmod: '2026-09-02',
      extraAssets: [
        '/assets/brand-media.css',
        ...publicAssetUrls([
          ...INDUSTRY_ASSETS.outdoorLivingPool,
          ...INDUSTRY_ASSETS.medSpa.filter((file) => !file.includes('-social-')),
          ...REVISION_ASSETS.restaurant,
          ...REVISION_ASSETS.daylitVenue,
          ...REVISION_ASSETS.coastalTerrace,
        ]),
      ],
    },
    {
      path: '/campaigns/',
      source: 'campaigns/index.html',
      title: 'Demand, not boosted posts — Rushes Media',
      description:
        'Meta and Google campaigns built around one credible idea, a focused conversion path and measurable qualified opportunities. Ad spend stays in the client-owned account.',
      lastmod: '2026-09-02',
    },
    {
      path: '/web/',
      source: 'web/index.html',
      title: 'A site that books — Rushes Media',
      description:
        'Custom sites and landing pages with one job: call, book, or request the estimate. Built for the campaign behind it.',
      lastmod: '2026-09-02',
    },
    {
      path: '/follow-up/',
      source: 'follow-up/index.html',
      title: 'AI Consulting & Business Systems | Rushes Media',
      description:
        'Practical AI consulting, workflow automation, lead capture, and follow-up systems that save time and make the business easier to run.',
      lastmod: '2026-09-02',
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
      ...(route.extraAssets ?? []),
    ],
    requiredCtas: ['#book', BOOKING_URL],
    requiredScripts: [GA4_LOADER_PREFIX, '/assets/meta-pixel.js'],
    sitemap: true,
    lastmod: route.lastmod,
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
    title: 'Industry Examples | Rushes Media',
    description:
      'See how Rushes adapts media, campaigns, web, AI, and business systems to different industries, customer journeys, and growth opportunities.',
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
    lastmod: '2026-09-02',
    lifecycleStatus: 'core-market',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Industries', path: '/industries/' },
    ],
    openGraph: {
      title: 'Industry Examples | Rushes Media',
      description:
        'See how Rushes adapts media, campaigns, web, AI, and business systems to different industries, customer journeys, and growth opportunities.',
      url: `${SITE_ORIGIN}/industries/`,
      image: `${SITE_ORIGIN}/assets/images/industries/industries-hub-social-1200x630.jpg`,
      imageWidth: 1200,
      imageHeight: 630,
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Industry Examples | Rushes Media',
      description:
        'See how Rushes adapts media, campaigns, web, AI, and business systems to different industries, customer journeys, and growth opportunities.',
      image: `${SITE_ORIGIN}/assets/images/industries/industries-hub-social-1200x630.jpg`,
    },
    jsonLd: routeSchema(
      '/industries/',
      'Industry Examples | Rushes Media',
      'See how Rushes adapts media, campaigns, web, AI, and business systems to different industries, customer journeys, and growth opportunities.',
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
      lastmod: '2026-09-02',
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
  'assets/brand-media.css',
  'assets/meta-pixel.js',
  'assets/images/hero/hero-bg.jpg',
  'assets/images/hero/hero-night-city-poster.jpg',
  HERO_VIDEO_POSTER_PATH.slice(1),
  'assets/images/logo-icon.png',
  'assets/images/logo-wordmark.png',
  'assets/video/hero-loop.mp4',
  ...HOMEPAGE_BROWSER_ASSET_FILES,
  ...REVISION_BROWSER_ASSET_FILES,
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
