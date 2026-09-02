import {
  BOOKING_URL,
  GA4_MEASUREMENT_ID,
  GHL_TRACKING_ID,
  HERO_VIDEO_POSTER_PATH,
  HERO_VIDEO_URL,
  META_PIXEL_ID,
  SITE_CONTRACT,
  SITE_ORIGIN,
} from '../../scripts/site-contract.mjs';

export type SiteOwnership =
  | 'generated'
  | 'compatibility'
  | 'redirect'
  | 'api'
  | 'review-only'
  | 'auxiliary';

export interface OpenGraphSeo {
  type?: string;
  siteName?: string;
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
}

export interface TwitterSeo {
  card?: string;
  title?: string;
  description?: string;
  image?: string;
}

export interface PageSeo {
  title: string;
  description: string;
  canonical?: string;
  robots?: string;
  openGraph?: OpenGraphSeo;
  twitter?: TwitterSeo;
  jsonLd?: Record<string, unknown>;
}

export interface SiteContractEntry {
  path: string;
  owner: SiteOwnership;
  indexable: boolean;
  source?: string;
  title?: string;
  description?: string;
  canonical?: string;
  robots?: string;
  openGraph?: OpenGraphSeo;
  twitter?: TwitterSeo;
  jsonLd?: Record<string, unknown>;
  requiredCtas?: readonly string[];
  requiredScripts?: readonly string[];
  requiredAssets?: readonly string[];
  sitemap?: boolean;
  lastmod?: string;
  parentRoute?: string;
  breadcrumb?: readonly { name: string; path: string }[];
  lifecycleStatus?: 'active' | 'core-market' | 'specialty' | 'selective-hold' | 'stable' | 'review-only';
  primaryImage?: {
    status: 'held' | 'approved';
    truthClass: string;
    sourceMaster?: string;
    publicUrl?: string;
    width?: number;
    height?: number;
  };
  compatibilityDisposition?: string;
  redirectStatus?: number;
  redirectTo?: string;
  contentTextHash?: string;
}

export const siteContract = SITE_CONTRACT as SiteContractEntry[];

export const SITE = {
  origin: SITE_ORIGIN,
  name: 'Rushes Media',
  legalName: 'Rushes Group LLC (DBA Rushes Media)',
  address: '1636 Oak Avenue, Haddon Heights, NJ 08035',
  email: 'evan@rushesmedia.com',
  phoneDisplay: '(609) 405-9918',
  phoneHref: 'tel:+16094059918',
  bookingUrl: BOOKING_URL,
  ga4MeasurementId: GA4_MEASUREMENT_ID,
  heroVideoUrl: HERO_VIDEO_URL,
  heroVideoPosterUrl: HERO_VIDEO_POSTER_PATH,
  themeColor: '#0c1825',
  metaPixelId: META_PIXEL_ID,
  ghlTrackingId: GHL_TRACKING_ID,
  logoIcon: '/assets/images/logo-icon.png',
  logoWordmark: '/assets/images/logo-wordmark.png',
} as const;

export const HOME_FONT_URL =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap';

export const LEGAL_FONT_URL =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap';

export function faqPageSchema(
  faqs: ReadonlyArray<{ question: string; answer: string }>,
): Record<string, unknown> {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export const SHARED_CTA = {
  label: 'Book a Growth Call',
  href: '#book',
  iframeTitle: 'Book a Growth Call with Rushes Media',
} as const;

export const BOOKING_COPY = {
  loadingStatus: 'Loading available times…',
  frameOpenedStatus: 'Available times are loading…',
  readyStatus: 'Available times are ready.',
  delayedStatus: 'The calendar did not load here. Open it in a new tab, or request a time by email.',
  offlineStatus: 'You appear to be offline. Reconnect, then open the calendar in a new tab.',
  unavailableStatus: 'The calendar did not load here. Open it in a new tab, or request a time by email.',
  loadingKicker: '30-minute Growth Call',
  loadingTitle: 'Loading available times.',
  loadingBody: 'Choose a time that works for you.',
  fallbackKicker: 'Direct booking available',
  fallbackTitle: 'Open the calendar in a new tab.',
  fallbackBody:
    'The calendar did not load here. Use the direct link above, or request a time by email.',
  directLabel: 'Open calendar in a new tab',
  requestLabel: 'Request a time by email',
} as const;

export const homepageSeo: PageSeo = {
  title: 'Rushes Media | Media, Web, AI & Growth Systems',
  description:
    'Rushes helps businesses grow through exceptional media, creative campaigns, web experiences, practical AI consulting, and business systems.',
  canonical: `${SITE.origin}/`,
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: 'Rushes Media | Media, Web, AI & Growth Systems',
    description:
      'Rushes helps businesses grow through exceptional media, creative campaigns, web experiences, practical AI consulting, and business systems.',
    url: `${SITE.origin}/`,
    image: `${SITE.origin}/assets/images/hero/hero-bg.jpg`,
    imageWidth: 1920,
    imageHeight: 1080,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rushes Media | Media, Web, AI & Growth Systems',
    description:
      'Rushes helps businesses grow through exceptional media, creative campaigns, web experiences, practical AI consulting, and business systems.',
    image: `${SITE.origin}/assets/images/hero/hero-bg.jpg`,
  },
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE.name,
    url: `${SITE.origin}/`,
    description:
      'Rushes helps businesses grow through exceptional media, creative campaigns, web experiences, practical AI consulting, and business systems.',
    email: SITE.email,
    telephone: SITE.phoneDisplay,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1636 Oak Avenue',
      addressLocality: 'Haddon Heights',
      addressRegion: 'NJ',
      postalCode: '08035',
      addressCountry: 'US',
    },
    sameAs: ['https://www.instagram.com/rushes.media/'],
    image: `${SITE.origin}/assets/images/hero/hero-bg.jpg`,
    areaServed: [
      'South Jersey',
      'Philadelphia',
      'Main Line',
      'Bucks County',
      'Princeton',
      'Delaware',
    ],
  },
};
