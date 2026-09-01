import { industryVisuals, type VisualAsset } from './industry-pages';
import { revisionAssets } from './revision-assets';

export interface HomeNavItem {
  href: string;
  label: string;
  number: string;
  mobileSubtitle: string;
}

export interface HomeProofItem {
  label: string;
  text: string;
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
  { href: '#system', label: 'System', number: '02', mobileSubtitle: 'How it connects' },
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
  'Measurement',
  'Follow-up',
  'Automation',
] as const;

export const proofItems: readonly HomeProofItem[] = [
  {
    label: 'Creative signal',
    text: 'Does the work make the business, offer, or experience easier to notice and understand?',
  },
  {
    label: 'Qualified demand',
    text: 'When reach is in scope, are the right people finding the intended next step?',
  },
  {
    label: 'Digital action',
    text: 'Can interested buyers understand fit and act without unnecessary friction?',
  },
  {
    label: 'Handoff quality',
    text: 'When inquiry or booking is in scope, is the response timely, owned, and measurable?',
  },
];

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
      'Photography and video that make the business—its people, products, services, places, and point of view—worth noticing across every channel.',
    tags: ['Photo & motion', 'Campaign creative', 'Organic content'],
    tone: 'ink',
    visual: revisionAssets.bakery,
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
  },
  {
    href: '/follow-up/',
    stage: 'Response & continuity',
    name: 'Lead Capture & Follow-up',
    plainName: 'Turn qualified interest into a timely conversation.',
    description:
      'Calls, forms, and messages receive a useful response, then follow-up through booking and confirmation.',
    tags: ['Lead capture', 'Speed to lead', 'Booking follow-up'],
    tone: 'navy',
  },
];

export const systemSteps = [
  { stage: 'Attention', title: 'Earn attention.', description: 'Show people what makes the business worth choosing.', owner: 'Brand Media' },
  { stage: 'Reach', title: 'Reach likely buyers.', description: 'Put the service in front of people who are likely to need it.', owner: 'Creative Campaigns' },
  { stage: 'Decision', title: 'Make the next step clear.', description: 'Explain the service and make calling, booking, or requesting an estimate simple.', owner: 'Web & Landing' },
  { stage: 'Response', title: 'Respond while intent is high.', description: 'Give each qualified inquiry a fast, useful response.', owner: 'Lead Capture & Follow-up' },
  { stage: 'Booking', title: 'Book and confirm.', description: 'Make the estimate or consultation easy to schedule and confirm.', owner: 'Lead Capture & Follow-up' },
] as const;

export const systemOwners = [
  { label: 'Brand Media', className: 'media' },
  { label: 'Creative Campaigns', className: 'campaigns' },
  { label: 'Web & Landing', className: 'web' },
  { label: 'Lead Capture & Follow-up', className: 'follow-up' },
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
      'Rushes builds the specific media, campaign, page, measurement, or follow-up scope the priority requires—without replacing what already works.',
    badge: 'Focused scope',
  },
  {
    phase: 'Improve',
    title: 'Learn from the response.',
    description:
      'Audience response, buyer actions, and agreed commercial signals show what to keep, change, or expand.',
    badge: 'Measured refinement',
  },
] as const;

export const faqs = [
  {
    question: 'What kinds of businesses do you work with?',
    answer:
      'Rushes works with strong local and regional companies whose reputation, work, or experience deserves a better public expression. Our deepest current market knowledge is outdoor living and residential design-build, interior design, HVAC replacement, and med spa or aesthetic practices. Adjacent businesses are evaluated by the opportunity, economics, capacity, and operating fit.',
  },
  {
    question: 'How quickly can we get started?',
    answer:
      'Timing depends on scope, access, and the first priority worth advancing. The 30-minute Growth Call identifies that priority; the next step is scoped around the specific media, campaign, web, measurement, or follow-up work required.',
  },
  {
    question: 'Do I have to be involved in the day-to-day?',
    answer:
      'You stay responsible for business facts, approvals, sales, and delivery. Rushes runs the agreed creative or digital scope, and the right owner remains reachable for any buyer, inquiry, or operational handoff included in the work.',
  },
  {
    question: 'What’s the commitment?',
    answer:
      'Scope, timing, and pricing follow the first meaningful priority—not a prebuilt package. The Growth Call determines whether a focused project or a longer engagement makes sense. Rushes owns the agreed work and measurement; the business owns sales, fulfillment, and collection.',
  },
  {
    question: 'Can Rushes handle one capability or connect several?',
    answer:
      'Either. Brand Media, campaigns, web, measurement, and follow-up can each be scoped independently. Rushes connects them only when the business priority genuinely benefits from a shared idea, experience, or handoff.',
  },
  {
    question: 'How do you measure results?',
    answer:
      'Measurement follows the agreed objective. That may include attention and engagement for media, qualified demand for campaigns, decision and action for web, or response and held appointments when follow-up is in scope. Sales and revenue remain business-reported outcomes.',
  },
  {
    question: 'Do we need the full Demand Loop?',
    answer:
      'No. The Demand Loop is a map, not a mandatory package. Rushes starts with the strongest opportunity and scopes only the capabilities needed now, while making sure they can connect cleanly if the work expands.',
  },
] as const;

export const footerLinks = [
  { href: '#services', label: 'Services' },
  { href: '/demand-loop/', label: 'Demand Loop' },
  { href: '/industries/', label: 'Best-fit industries' },
  { href: '#book', label: 'Book a Growth Call' },
] as const;
