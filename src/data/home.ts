import { industryVisuals, type VisualAsset } from './industry-pages';
import { homepageAssets } from './homepage-assets';
import { revisionAssets } from './revision-assets';

export interface HomeNavItem {
  href: string;
  label: string;
  number: string;
  mobileSubtitle: string;
}

export interface HomeService {
  href: string;
  stage: string;
  name: string;
  plainName: string;
  description: string;
  tags: readonly string[];
  tone: 'ink' | 'paper' | 'gold' | 'navy';
  visual?: VisualAsset;
}

export interface HomeAudience {
  href: string;
  routeLabel: string;
  label: string;
  summary: string;
  result: string;
  visual: VisualAsset;
}

export const primaryNavigation: readonly HomeNavItem[] = [
  { href: '#services', label: 'Services', number: '01', mobileSubtitle: 'What we build' },
  { href: '#system', label: 'Demand Loop', number: '02', mobileSubtitle: 'How the services connect' },
  { href: '#process', label: 'Process', number: '03', mobileSubtitle: 'Simple to start' },
  { href: '#faq', label: 'FAQ', number: '04', mobileSubtitle: 'What you need to know' },
];

export const heroFlow = [
  { from: 'Content', to: 'Attention' },
  { from: 'Systems', to: 'Conversion' },
  { from: 'Follow-up', to: 'Compounding' },
] as const;

export const marqueeItems = [
  'Brand Media',
  'Photo & Motion',
  'Creative Campaigns',
  'Web Experiences',
  'Landing Pages',
  'AI Consulting',
  'Business Systems',
  'Follow-up',
] as const;

export const audiences: readonly HomeAudience[] = [
  {
    href: '/outdoor-living/',
    routeLabel: 'Project-led design-build',
    label: 'Outdoor Living & Design-Build',
    summary:
      'Show the transformation, qualify the scope, and move the right homeowners toward a project consultation.',
    result: 'Better-fit project consultations',
    visual: industryVisuals.outdoorLiving,
  },
  {
    href: '/interior-design/',
    routeLabel: 'Considered consultation',
    label: 'Interior Design & Residential Build',
    summary:
      'Make taste, judgment, and process easier to understand before the first consultation.',
    result: 'Clearer fit before the consultation',
    visual: industryVisuals.interiorDesign,
  },
  {
    href: '/hvac/',
    routeLabel: 'Urgent and planned demand',
    label: 'HVAC Replacement & Home Comfort',
    summary:
      'Separate urgent service from planned replacement and respond before the homeowner moves on.',
    result: 'Faster response to replacement inquiries',
    visual: industryVisuals.hvac,
  },
  {
    href: '/med-spa/',
    routeLabel: 'Appointment-led service',
    label: 'Med Spa & Aesthetic Practices',
    summary:
      'Build service-specific trust, guide the right consultation request, and keep follow-up timely.',
    result: 'Better-qualified consultation requests',
    visual: revisionAssets.medSpa,
  },
] as const;

export const homeServices: readonly HomeService[] = [
  {
    href: '/brand-media/',
    stage: 'Creative expression',
    name: 'Brand Media',
    plainName: 'Show what makes the business worth choosing.',
    description:
      'Photography and video that make the business, its people, products, services, places, and point of view worth noticing across every channel.',
    tags: ['Photo & motion', 'Campaign creative', 'Organic content'],
    tone: 'ink',
    visual: homepageAssets.brandMediaRiversideMill,
  },
  {
    href: '/campaigns/',
    stage: 'Focused reach',
    name: 'Creative Campaigns',
    plainName: 'Reach more of the people most likely to need the service.',
    description:
      'Meta and Google campaigns pair strong creative with a clear message and next step.',
    tags: ['Meta', 'Google', 'Campaign management'],
    tone: 'paper',
    visual: homepageAssets.campaignsSubmerged,
  },
  {
    href: '/web/',
    stage: 'Digital experience',
    name: 'Web & Landing',
    plainName: 'Help interested buyers understand the service and act.',
    description:
      'Focused sites and landing pages answer key questions and make calling, booking, or requesting an estimate straightforward.',
    tags: ['Custom sites', 'Landing pages', 'Conversion UX'],
    tone: 'gold',
    visual: homepageAssets.webLawOffice,
  },
  {
    href: '/follow-up/',
    stage: 'Time & leverage',
    name: 'AI & Business Systems',
    plainName: 'Save time and make the business easier to run.',
    description:
      'Practical AI consulting, workflow automation, lead capture, and follow-up reduce repetitive work, strengthen handoffs, and keep opportunities moving.',
    tags: ['AI consulting', 'Workflow automation', 'Lead capture & follow-up'],
    tone: 'navy',
  },
];

export const systemSteps = [
  {
    stage: 'Attention',
    owner: 'Brand Media',
    title: 'Earn attention.',
    description: 'Make the reputation, expertise, and experience behind the business worth noticing.',
  },
  {
    stage: 'Reach',
    owner: 'Creative Campaigns',
    title: 'Extend the right reach.',
    description: 'Carry the strongest idea to more of the people most likely to value it.',
  },
  {
    stage: 'Decision',
    owner: 'Web & Landing',
    title: 'Make the value clear.',
    description: 'Help buyers understand the offer, judge fit, and take the next step.',
  },
  {
    stage: 'Response',
    owner: 'AI & Business Systems',
    title: 'Protect the handoff.',
    description: 'Route inquiries, preserve context, and make the next useful action clear while intent is high.',
  },
  {
    stage: 'Continuity',
    owner: 'AI & Business Systems',
    title: 'Keep opportunity moving.',
    description: 'Use practical automation and follow-up to save time and make the next step harder to lose.',
  },
] as const;

export const processSteps = [
  {
    phase: 'Focus',
    title: 'Choose the priority.',
    description:
      'We agree on the service, market, audience, or business priority that deserves attention first.',
    badge: 'Clear starting point',
  },
  {
    phase: 'Build',
    title: 'Build around it.',
    description:
      'Rushes builds the specific media, campaign, web, AI, or business-system work the priority requires without replacing what already works.',
    badge: 'Focused scope',
  },
  {
    phase: 'Improve',
    title: 'Learn from the response.',
    description:
      'Audience response and buyer actions show what to keep, change, or expand.',
    badge: 'Measured refinement',
  },
] as const;

export const faqs = [
  {
    question: 'What kinds of businesses do you work with?',
    answer:
      'Rushes works across industries. The best starting point is a business ready to invest in growth, stronger creative, a better customer experience, or systems that save time. The industry examples on this site show how the approach changes by business; they are not the full list of companies we can help.',
  },
  {
    question: 'How quickly can we get started?',
    answer:
      'Timing depends on the priority, access, and the work involved. The 30-minute Growth Call identifies the best place to start and the next practical step.',
  },
  {
    question: 'Do I have to be involved in the day-to-day?',
    answer:
      'You provide the business context and approvals. Rushes handles the creative or digital work and keeps the right people involved when buyer questions or business decisions need an answer.',
  },
  {
    question: 'What’s the commitment?',
    answer:
      'Engagements are built around the first meaningful priority, not a prebuilt package. The Growth Call establishes fit, timing, and whether a focused project or an ongoing engagement makes sense.',
  },
  {
    question: 'Can Rushes handle one capability or connect several?',
    answer:
      'Yes. Brand Media, campaigns, web, and AI or business systems can each stand alone. When several are useful, the Demand Loop connects them around one goal and one clear path from attention to action.',
  },
  {
    question: 'How do you measure results?',
    answer:
      'We choose a small set of signals that match the goal. Depending on the work, that may be audience response, qualified inquiries, booked conversations, or action on a page.',
  },
  {
    question: 'Do we need the full Demand Loop?',
    answer:
      'No. The Demand Loop is Rushes’ connected system, not a mandatory package. Start with the capability that matters now, then connect more of the path only when it creates useful leverage.',
  },
] as const;

export const footerLinks = [
  { href: '#services', label: 'Services' },
  { href: '/demand-loop/', label: 'Demand Loop' },
  { href: '/industries/', label: 'Industry examples' },
  { href: '#book', label: 'Book a Growth Call' },
] as const;
