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
  { href: '/#examples', label: 'Examples', key: 'examples', number: '03', mobileSubtitle: 'Selected applications' },
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

export function mobileNavLinks(current?: string) {
  return [
    ...sitePrimaryNav.map((link) => ({
      href: link.href,
      label: link.label,
      current: navCurrent(current, link.key),
    })),
    { href: '#book', label: SHARED_CTA.label, cta: true as const },
  ];
}
