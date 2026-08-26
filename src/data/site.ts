import {
  BOOKING_URL,
  GA4_MEASUREMENT_ID,
  GHL_TRACKING_ID,
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
  changefreq?: 'weekly' | 'monthly' | 'yearly';
  priority?: string;
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

export const SHARED_CTA = {
  label: 'Book a Growth Call',
  href: '#book',
  iframeTitle: 'Book a Growth Call with Rushes Media',
} as const;

export const homepageSeo: PageSeo = {
  title: 'Rushes Media — booked estimates from the work you already do',
  description:
    'Content, campaigns, a page that converts, and follow-up in minutes. One system for owners who can take more of the right work.',
  canonical: `${SITE.origin}/`,
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: 'Rushes Media — booked estimates from the work you already do',
    description:
      'Content, campaigns, a page that converts, and follow-up in minutes. One system for owners who can take more of the right work.',
    url: `${SITE.origin}/`,
    image: `${SITE.origin}/assets/images/hero/hero-bg.jpg`,
    imageWidth: 1920,
    imageHeight: 1080,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rushes Media — booked estimates from the work you already do',
    description:
      'Content, campaigns, a page that converts, and follow-up in minutes. One system for owners who can take more of the right work.',
    image: `${SITE.origin}/assets/images/hero/hero-bg.jpg`,
  },
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE.name,
    url: `${SITE.origin}/`,
    description:
      'Rushes Media builds content, campaigns, websites, and follow-up systems for owner-operated local businesses — so more qualified estimates land on the calendar.',
    email: SITE.email,
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
