import type { PageSeo } from './site';
import { SITE } from './site';

export type InnerPageFamily = 'service' | 'industry' | 'mechanism';

export interface HeadingSegment {
  kind: 'text' | 'emphasis';
  text: string;
}

export interface InnerPage {
  family: InnerPageFamily;
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  heading: readonly HeadingSegment[];
  lede: string;
  bodyParagraphs: readonly string[];
  pullQuote: string;
}

export const innerPages: readonly InnerPage[] = [
  {
    family: 'service',
    slug: 'brand-media',
    title: 'The job is the ad — Rushes Media',
    description:
      'Reels, stills, and brand work from real jobs — then the campaign, the page, and the follow-up that books the estimate.',
    eyebrow: 'Brand media',
    heading: [
      { kind: 'text', text: 'The job is the ad. ' },
      { kind: 'emphasis', text: 'Start using it.' },
    ],
    lede:
      'Reels, stills, and brand work from real jobs — not a content calendar of filler. The point is not being on Instagram. The point is that the right local buyer sees proof before they ever call.',
    bodyParagraphs: [
      'You already have the footage. It is on your phone from the job you finished Tuesday. We turn that into the thing people see — then it has to run as a campaign, land on a page, and get answered in minutes.',
    ],
    pullQuote:
      'Then it has to run as a campaign, land on a page, and get answered in minutes. That’s the Demand Loop.',
  },
  {
    family: 'service',
    slug: 'campaigns',
    title: 'Demand, not boosted posts — Rushes Media',
    description:
      'Meta and Google campaigns built around a real idea. Spend stays on your card. The calendar moves when the page and follow-up are wired.',
    eyebrow: 'Creative campaigns',
    heading: [
      { kind: 'text', text: 'Demand, ' },
      { kind: 'emphasis', text: 'not boosted posts.' },
    ],
    lede:
      'Meta and Google built around a real idea. Spend stays on your card. We build the creative and the structure. If the page and the follow-up aren’t wired, spend is a bill.',
    bodyParagraphs: [
      'We don’t sell more ads. We run demand into one page, catch the person, and book the estimate — or tell you straight if it isn’t a fit.',
    ],
    pullQuote: 'Campaigns are one piece. The calendar moves when all four run.',
  },
  {
    family: 'service',
    slug: 'web',
    title: 'A site that books — Rushes Media',
    description:
      'Custom sites and landing pages with one job: call, book, or request the estimate. Built for the campaign behind it.',
    eyebrow: 'Web & landing',
    heading: [
      { kind: 'text', text: 'A site that books. ' },
      { kind: 'emphasis', text: 'Not a brochure.' },
    ],
    lede:
      'Custom sites and landing pages with one job: call, book, or request the estimate. Fast on a phone. Clear. Built for the campaign behind it.',
    bodyParagraphs: [
      'Traffic to a page that doesn’t book is wasted. Follow-up that waits until tonight is worse. The site is one piece of the Demand Loop — not a package you buy off this page.',
    ],
    pullQuote:
      'Traffic to a page that doesn’t book is wasted. Follow-up that waits until tonight is worse.',
  },
  {
    family: 'service',
    slug: 'follow-up',
    title: 'Answer in minutes — Rushes Media',
    description:
      'Forms, calls, and DMs into one place. Text back while they’re still holding the phone. Confirmations so the estimate actually shows.',
    eyebrow: 'Lead capture & follow-up',
    heading: [
      { kind: 'text', text: 'Answer in minutes. ' },
      { kind: 'emphasis', text: 'That’s who they book.' },
    ],
    lede:
      'Forms, calls, and DMs into one place. Text back while they’re still holding the phone. Confirmations so the estimate actually shows.',
    bodyParagraphs: [
      'This is the part most shops skip. It only works if the work is worth showing and the campaign is sending the right people. It is not a standalone “text-back” product.',
    ],
    pullQuote:
      'This is the part most shops skip. It only works if the work is worth showing and the campaign is sending the right people.',
  },
  {
    family: 'mechanism',
    slug: 'demand-loop',
    title: 'The Demand Loop — Rushes Media',
    description:
      'Show the work, put it in front of ready buyers, catch them, book the estimate, run it tighter next month. One system. 20-minute Growth Call.',
    eyebrow: 'The mechanism',
    heading: [
      { kind: 'text', text: 'The Demand Loop. ' },
      { kind: 'emphasis', text: 'One path to the calendar.' },
    ],
    lede:
      'Show the real work → make it into creative → put it in front of the right people → one page → catch the lead → follow up in minutes → book the estimate → track it → do it sharper.',
    bodyParagraphs: [
      'Everyone sells one piece — content, or ads, or a website. The money falls through the gaps. The Loop closes every gap. That is what we install. Public door is a 20-minute Growth Call. We do not quote a menu on this page.',
    ],
    pullQuote:
      'You are hiring the path from attention to a booked calendar — not a media buyer.',
  },
  {
    family: 'industry',
    slug: 'hardscape',
    title: 'Marketing for outdoor living contractors — Rushes Media',
    description:
      'Turn patio and outdoor living jobs into booked estimates. Content, campaigns, a page that converts, and follow-up in minutes.',
    eyebrow: 'Outdoor living',
    heading: [
      { kind: 'text', text: 'Booked estimates from the jobs ' },
      { kind: 'emphasis', text: 'you already finish.' },
    ],
    lede:
      'For owner-operated hardscape and outdoor living companies. The backyard is the proof. The gap is what happens in the five minutes after someone reaches out.',
    bodyParagraphs: [
      'We film the work, run demand, land it on one page, and book the estimate while you’re still on site. If your average job can’t support the work, we’ll say so on the call.',
    ],
    pullQuote:
      'He called twice. You were on a job. He booked the other guy. That’s the problem we actually solve.',
  },
  {
    family: 'industry',
    slug: 'hvac',
    title: 'Marketing for HVAC replacement companies — Rushes Media',
    description:
      'Replacements on the board, not missed calls in the truck. Demand campaigns, a page that books, follow-up in minutes.',
    eyebrow: 'HVAC replacement',
    heading: [
      { kind: 'text', text: 'Replacements on the board, ' },
      { kind: 'emphasis', text: 'not missed calls in the truck.' },
    ],
    lede:
      'For owner-operated HVAC shops doing changeouts worth the floor. Every missed call in the field is a replacement walking.',
    bodyParagraphs: [
      'Posting more doesn’t fix that. A system that answers in minutes does — and it uses the installs you already do as the ad. 20-minute Growth Call. We’ll look at how work reaches you.',
    ],
    pullQuote: 'That missed call was a changeout. Your competitor already booked it.',
  },
  {
    family: 'industry',
    slug: 'pools',
    title: 'Marketing for pool companies — Rushes Media',
    description:
      'The backyard is the ad. Campaigns, a page that books, and follow-up so the estimate lands on your calendar.',
    eyebrow: 'Pools',
    heading: [{ kind: 'text', text: 'The backyard is the ad.' }],
    lede:
      'For pool builders and outdoor spa companies whose work is already photogenic — and whose follow-up isn’t.',
    bodyParagraphs: [
      'We turn finished jobs into demand, send people to one page, and book the estimate in minutes. Same Demand Loop as outdoor living. Same Growth Call.',
    ],
    pullQuote: 'If the work is the proof, stop hiding it in a camera roll.',
  },
  {
    family: 'industry',
    slug: 'med-spa',
    title: 'Med spa marketing for owners — Rushes Media',
    description:
      'Consults booked, not sitting in a DM. Owner on the call. Media, campaigns, page, and follow-up as one path.',
    eyebrow: 'Med spa · owner access',
    heading: [
      { kind: 'text', text: 'Consults booked, ' },
      { kind: 'emphasis', text: 'not sitting in a DM.' },
    ],
    lede:
      'For owners — not the front desk queue. The room is expensive. The grid often isn’t. End of day is too late.',
    bodyParagraphs: [
      'We show the work, put it in front of the right people, and book the consult in minutes. Same machine as the trades. The calendar word is consults. The Growth Call is still 20 minutes, owner only.',
    ],
    pullQuote: 'Front desk gets to the DMs. Sometimes. By then the consult is gone.',
  },
] as const;

export const innerPageNavigation = [
  { href: '/demand-loop/', label: 'Demand Loop' },
  { href: '/brand-media/', label: 'Brand media' },
  { href: '/campaigns/', label: 'Campaigns' },
  { href: '/web/', label: 'Web' },
  { href: '/follow-up/', label: 'Follow-up' },
  { href: '/hardscape/', label: 'Outdoor living' },
  { href: '/hvac/', label: 'HVAC' },
  { href: '/pools/', label: 'Pools' },
  { href: '/med-spa/', label: 'Med spa' },
] as const;

export function innerPageSeo(page: InnerPage): PageSeo {
  const canonical = `${SITE.origin}/${page.slug}/`;
  return {
    title: page.title,
    description: page.description,
    canonical,
    openGraph: {
      title: page.title,
      description: page.description,
      url: canonical,
    },
  };
}
