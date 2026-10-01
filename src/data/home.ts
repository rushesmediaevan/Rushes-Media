import { industryVisuals, type VisualAsset } from './visual-assets';
import { homepageAssets } from './homepage-assets';
import { homePrimaryNav } from './navigation';
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
  label: string;
  /** One line on the card. */
  intro: string;
  /** The fuller example shown when the card is selected. */
  example: string;
  visual: VisualAsset;
}

export const primaryNavigation: readonly HomeNavItem[] = homePrimaryNav.map(({ href, label, number, mobileSubtitle }) => ({
  href,
  label,
  number,
  mobileSubtitle,
}));

export const heroFlow = [
  { from: 'Photo & video', to: 'Attention' },
  { from: 'Ads & websites', to: 'Inquiries' },
  { from: 'AI & systems', to: 'Time back' },
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
    label: 'Outdoor Living & Design-Build',
    intro: 'Show finished projects to homeowners planning one.',
    example:
      'A finished pool and patio is easier to sell when people can picture themselves using it. We photograph the project, make ads for homeowners in your area and build a page that explains the work and invites an estimate request. Then we track which inquiries become projects.',
    visual: industryVisuals.outdoorLiving,
  },
  {
    label: 'Interior Design & Residential Build',
    intro: 'Show your work and what working with you involves.',
    example:
      'Before hiring a designer or builder, people want to see what you can do and what working with you involves. Project photography and short walkthrough videos show the details. A clear website explains your services and helps the right clients request a consultation.',
    visual: industryVisuals.interiorDesign,
  },
  {
    label: 'HVAC & Home Comfort',
    intro: 'Separate urgent repairs from planned replacements.',
    example:
      'A homeowner with a broken AC needs a clear way to call now. Someone planning a replacement needs help comparing options. We build ads and pages for each situation, make sure inquiries reach your team and track which ones turn into booked work.',
    visual: industryVisuals.hvac,
  },
  {
    label: 'Med Spas & Aesthetic Practices',
    intro: 'Answer the questions people have before they book.',
    example:
      'People want to know who will treat them, what the appointment involves and whether a service suits them. We create practitioner videos and clear service pages, then connect relevant ads to consultation booking. Your clinicians review treatment information before it goes live.',
    visual: revisionAssets.medSpa,
  },
] as const;

export const audienceTrackingNote =
  'We track calls, consultations and booked work, using your records to see what the marketing contributes.';

export const homeServices: readonly HomeService[] = [
  {
    href: '/brand-media/',
    stage: 'Photography & video',
    name: 'Brand Media',
    plainName: 'Show what makes the business worth choosing.',
    description:
      'Photography and video that make the business, its people, products, services, places, and point of view worth noticing across every channel.',
    tags: ['Brand photography', 'Video & reels', 'Campaign creative'],
    tone: 'ink',
    visual: homepageAssets.brandMediaRiversideMill,
  },
  {
    href: '/campaigns/',
    stage: 'Advertising',
    name: 'Creative Campaigns',
    plainName: 'Reach more of the people most likely to need the service.',
    description:
      'Google and Meta campaigns that pair strong creative with a clear message and a landing page that gives people a reason to get in touch.',
    tags: ['Google Ads', 'Meta ads', 'Campaign management'],
    tone: 'paper',
    visual: homepageAssets.campaignsSubmerged,
  },
  {
    href: '/web/',
    stage: 'Websites',
    name: 'Web & Landing',
    plainName: 'Help interested buyers understand the service and act.',
    description:
      'Focused sites and landing pages answer key questions and make calling, booking, or requesting an estimate straightforward.',
    tags: ['Custom websites', 'Landing pages', 'Forms & booking'],
    tone: 'gold',
    visual: revisionAssets.daylitVenue,
  },
  {
    href: '/follow-up/',
    stage: 'Tools & workflows',
    name: 'AI & Business Systems',
    plainName: 'Less repeated admin. Clearer handoffs.',
    description:
      'Practical AI and better workflows connect the tools you already use, cut repeated data entry and make sure every request has an owner and a next step.',
    tags: ['AI consulting', 'Workflow automation', 'Lead capture & follow-up'],
    tone: 'navy',
  },
];

export const brandMediaFilm = [
  homepageAssets.brandMediaRiversideMill,
  revisionAssets.bakery,
  revisionAssets.restaurant,
] as const;

export const systemsBeats = [
  {
    label: 'Connect',
    heading: 'Your tools share information.',
    example: 'A website form creates the contact in your CRM with the service and source attached.',
  },
  {
    label: 'Organize',
    heading: 'Requests arrive sorted.',
    example: 'Calls, forms and messages land in one list, grouped by service and location.',
  },
  {
    label: 'Prepare',
    heading: 'The first draft is ready.',
    example: 'AI drafts the reply or summarizes a long message for someone to check and send.',
  },
  {
    label: 'Assign',
    heading: 'Everyone knows who owns what.',
    example: 'Each open request shows an owner and a next date, with reminders before anything slips.',
  },
] as const;

import { demandLoopSteps } from './demand-loop';

export const systemSteps = demandLoopSteps.map((step) => ({
  stage: step.stage,
  owner: step.capability,
  title: `${step.name}.`,
  description: step.purpose,
}));

export const faqs = [
  {
    question: 'What kinds of businesses do you work with?',
    answer:
      'Rushes works across industries. The best starting point is a business ready to invest in growth, stronger creative, a better customer experience, or systems that save time. The examples on this site show how the approach changes by business; they are not the full list of companies we can help.',
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
      'Yes. Photo and video, campaigns, websites and AI or business systems can each be hired on their own. When several are useful, we connect them around one goal. We call that the Demand Loop, and it is never a required package.',
  },
  {
    question: 'How do you measure results?',
    answer:
      'We choose a small set of signals that match the goal. Depending on the work, that may be audience response, qualified inquiries, booked conversations, or action on a page.',
  },
] as const;

export const footerLinks = [
  { href: '/articles/', label: 'Articles' },
  { href: '#services', label: 'Services' },
  { href: '/demand-loop/', label: 'Demand Loop' },
  { href: '#examples', label: 'Industries' },
  { href: '#book', label: 'Book a Growth Call' },
] as const;
