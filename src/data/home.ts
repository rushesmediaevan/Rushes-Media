export interface HomeNavItem {
  href: string;
  label: string;
  number: string;
  mobileSubtitle: string;
}

export interface HomeProofItem {
  value: string;
  suffix?: string;
  label: string;
  text: string;
}

export interface HomeService {
  href: string;
  number: string;
  name: string;
  plainName: string;
  description: string;
  tags: readonly string[];
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
  'Creative Campaigns',
  'Web Design',
  'Lead Capture',
  'Speed-to-Lead',
  'Follow-up',
  'Booked Estimates',
  'Organic Content',
] as const;

export const proofItems: readonly HomeProofItem[] = [
  {
    value: '↑',
    label: 'More Booked Estimates',
    text: 'That’s the point. Content and campaigns only matter if they put the right people on your calendar.',
  },
  {
    value: '78',
    suffix: '%',
    label: 'First Responder Wins',
    text: 'Of buyers go with whoever answers first. We build follow-up so that can be you — in minutes, not tomorrow.',
  },
  {
    value: '<5',
    suffix: 'm',
    label: 'Speed to Lead',
    text: 'Capture and contact while interest is hot. Slow follow-up is where most marketing spend dies.',
  },
  {
    value: '30',
    suffix: 'd',
    label: 'Prove It First',
    text: 'We prove real estimates are booking before you’re locked into month two. Risk sits on our side.',
  },
];

export const audiences = [
  { href: '/hardscape/', label: 'Outdoor living', text: 'Booked estimates from the jobs you already finish.' },
  { href: '/hvac/', label: 'HVAC', text: 'Replacements on the board, not missed calls in the truck.' },
  { href: '/pools/', label: 'Pools', text: 'The backyard is the ad.' },
  { href: '/med-spa/', label: 'Med spa', text: 'Consults booked, not sitting in a DM.' },
] as const;

export const homeServices: readonly HomeService[] = [
  {
    href: '/brand-media/',
    number: '01',
    name: 'Brand Media',
    plainName: 'Get your brand in front of real customers',
    description:
      'Reels, organic content, photography, and brand work from your real jobs — so the right local buyers see proof before they ever call.',
    tags: ['Organic Content', 'Reels & Video', 'Photography', 'Brand Identity'],
  },
  {
    href: '/campaigns/',
    number: '02',
    name: 'Creative Campaigns',
    plainName: 'Campaigns that drive customers, not just clicks',
    description:
      'Meta and Google campaigns built around a real creative idea — not a boosted post. We build the creative and structure; ad spend stays on your card.',
    tags: ['Meta Campaigns', 'Google Campaigns', 'Creative Strategy', 'Offer Design'],
  },
  {
    href: '/web/',
    number: '03',
    name: 'Web & Landing',
    plainName: 'A site that turns visitors into buyers',
    description:
      'Custom sites and landing pages designed to convert — fast on mobile, clear on every device, built so the visitor takes one clear action: call, book, or request an estimate.',
    tags: ['Custom Sites', 'Landing Pages', 'Local SEO', 'Conversion UX'],
  },
  {
    href: '/follow-up/',
    number: '04',
    name: 'Lead Capture & Follow-up',
    plainName: 'Catch every lead, answer fast, never lose one',
    description:
      'Forms, calls, and DMs into one system. Speed-to-lead reply in minutes. SMS and email that keep the conversation alive until the estimate is booked.',
    tags: ['Speed-to-Lead', 'SMS & Email', 'CRM & Pipeline', 'Booking'],
  },
];

export const systemSteps = [
  { icon: '◈', number: '01', name: 'Brand Media', description: 'Reels, content, and brand work that earn attention', stat: '+', statLabel: 'Trust' },
  { icon: '◉', number: '02', name: 'Creative Campaigns', description: 'Campaigns with real creative — customers, not just clicks', stat: '$', statLabel: 'Reach' },
  { icon: '▣', number: '03', name: 'Web & Landing', description: 'A site built so the visitor takes one clear action', stat: '↑', statLabel: 'Convert' },
  { icon: '◎', number: '04', name: 'Lead Capture', description: 'Every inbound captured and answered in minutes', stat: '<5m', statLabel: 'Reply' },
  { icon: '⬡', number: '05', name: 'Follow-up', description: 'SMS & email that book the estimate on your calendar', stat: '↻', statLabel: 'Compound' },
] as const;

export const processSteps = [
  {
    number: '01',
    title: 'Growth Call',
    description:
      'We look at how work comes in today, what’s working, and where estimates stall — then recommend the clearest next step. Or an honest no.',
    badge: '~30 minutes',
  },
  {
    number: '02',
    title: 'System Build',
    description:
      'We install the pieces that fit — creative, campaigns, site, and follow-up — wired for how your business actually books work.',
    badge: 'First 30 days',
  },
  {
    number: '03',
    title: 'Launch & Compound',
    description:
      'We prove booked estimates before you’re locked into month two, then keep tightening what works. Long-term partner, not a project that disappears.',
    badge: 'Ongoing',
  },
] as const;

export const faqs = [
  {
    question: 'What kinds of businesses do you work with?',
    answer:
      'Owner-operated local businesses where attention should turn into booked estimates — hardscape and outdoor living, HVAC, med spa and aesthetics, and similar high-ticket service operators. We’re based in South Jersey and work across Philly, the Main Line, Bucks, and the wider tri-state. The right partnership outweighs the zip code.',
  },
  {
    question: 'How quickly can we get started?',
    answer:
      'A Growth Call is usually within 48 hours of you reaching out. After we agree on fit, we stand up the core system — site or landing page, capture, follow-up, and campaign structure — and start proving booked estimates in the first 30 days.',
  },
  {
    question: 'Do I have to be involved in the day-to-day?',
    answer:
      'No. You run the business and close the work. We run the media, campaigns, and follow-up. You’ll review creative and stay reachable for estimate calls — that’s the partnership.',
  },
  {
    question: 'What’s the commitment?',
    answer:
      'Flat monthly. In the first 30 days live, if we aren’t booking you real estimates, you don’t pay for month two — we prove it before you’re locked in. Exact numbers and any shared upside are set on the Growth Call from your real job values. We don’t guarantee closed jobs; we own the path to the calendar.',
  },
  {
    question: 'Do you do content, campaigns, or both?',
    answer:
      'Both — and they work better together. Content builds trust. Campaigns put that proof in front of ready buyers. Pages and follow-up turn interest into booked estimates. Selling only posts or only spend is how leads fall between vendors.',
  },
  {
    question: 'How do you measure results?',
    answer:
      'Booked estimates (or booked consults), show rate, cost per booked estimate where spend is live, and speed-to-lead. You get reporting tied to the calendar — not follower counts.',
  },
  {
    question: 'Why don’t you call yourselves a “marketing agency”?',
    answer:
      'Because owners don’t buy “marketing.” They buy more of the right people on the calendar. We build media, campaigns, web, and follow-up as one system — not four separate vendors. You’re hiring the full path, not a media buyer.',
  },
] as const;

export const footerLinks = [
  { href: '#services', label: 'Services' },
  { href: '/demand-loop/', label: 'Demand Loop' },
  { href: '/hardscape/', label: 'Outdoor living' },
  { href: '#book', label: 'Book a Growth Call' },
] as const;
