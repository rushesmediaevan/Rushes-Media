import { SHARED_CTA } from './site';

export interface PrimaryNavItem {
  href: string;
  label: string;
  key: 'services' | 'demand-loop' | 'examples';
  number: string;
  mobileSubtitle: string;
}

export const sitePrimaryNav: readonly PrimaryNavItem[] = [
  { href: '/#services', label: 'Services', key: 'services', number: '01', mobileSubtitle: 'What Rushes does' },
  { href: '/demand-loop/', label: 'How It Works', key: 'demand-loop', number: '02', mobileSubtitle: 'The Demand Loop' },
  { href: '/#examples', label: 'Industries', key: 'examples', number: '03', mobileSubtitle: 'Who we work with' },
];

export const homePrimaryNav: readonly PrimaryNavItem[] = [
  { ...sitePrimaryNav[0], href: '#services' },
  sitePrimaryNav[1],
  { ...sitePrimaryNav[2], href: '#examples' },
];

export function navCurrent(
  current: string | undefined,
  key: PrimaryNavItem['key'],
): 'page' | 'location' | undefined {
  if (current !== key) return undefined;
  return key === 'services' || key === 'examples' ? 'location' : 'page';
}

/** The four services, in the order the homepage presents them. */
export const serviceNav = [
  { href: '/brand-media/', label: 'Brand Media', note: 'Photography, video and campaign creative' },
  { href: '/campaigns/', label: 'Creative Campaigns', note: 'Google and Meta ads with landing pages' },
  { href: '/web/', label: 'Web & Landing', note: 'Websites and landing pages' },
  { href: '/follow-up/', label: 'AI & Business Systems', note: 'Connected tools, workflows and follow-up' },
] as const;

export function mobileNavLinks(current?: string, path?: string) {
  return [
    ...sitePrimaryNav.map((link) => ({
      href: link.href,
      label: link.label,
      // On a service page the specific service carries the current state, not the overview.
      current: link.key === 'services' && path ? undefined : navCurrent(current, link.key),
      children: link.key === 'services'
        ? serviceNav.map((service) => ({ href: service.href, label: service.label, current: service.href === path ? ('page' as const) : undefined }))
        : undefined,
    })),
    { href: '#book', label: SHARED_CTA.label, cta: true as const },
  ];
}
