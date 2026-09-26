import type { VisualAsset } from './visual-assets';
import { industryVisuals } from './visual-assets';
import { homepageAssets } from './homepage-assets';
import { revisionAssets } from './revision-assets';
import { capabilityAssets } from './capability-assets';
import { faqPageSchema, SITE } from './site';

export interface CommercialFaq { question: string; answer: string; }

export interface SectionLead {
  eye: string;
  heading: string;
  intro?: string;
}

export interface Point { title: string; body: string; }
export interface LabeledPoint { label: string; title: string; body: string; note?: string; }
export interface NamedStep { name: string; body: string; }

/** Shared closing pair on every capability page: hire it alone, or connect it. */
export interface StandalonePair {
  alone: { eye: string; heading: string; body: string };
  loop: { eye: string; heading: string; body: string; href: string; label: string };
}

export interface BrandMediaBody {
  kind: 'brand-media';
  manifesto: SectionLead & {
    pull: string;
    paragraphs: readonly string[];
    asset: VisualAsset;
  };
  audience: SectionLead & {
    paragraphs: readonly string[];
  };
  gallery: SectionLead & {
    items: readonly { label: string; heading: string; body: string; asset: VisualAsset }[];
  };
  delivery: SectionLead & {
    stages: readonly LabeledPoint[];
    spread: { eye: string; heading: string; formats: readonly { name: string; ratio: string; use: string }[] };
  };
  pair: StandalonePair;
}

export interface CampaignsBody {
  kind: 'campaigns';
  leak: SectionLead & {
    nodes: readonly string[];
    pains: readonly (Point & { after: number })[];
  };
  matrix: SectionLead & { rows: readonly LabeledPoint[] };
  experiment: SectionLead & { steps: readonly NamedStep[]; asset: VisualAsset };
  pair: StandalonePair;
}

export interface WebBody {
  kind: 'web';
  ladder: SectionLead & { rungs: readonly LabeledPoint[] };
  pains: SectionLead & { items: readonly Point[] };
  process: SectionLead & { steps: readonly NamedStep[]; asset: VisualAsset };
  pair: StandalonePair;
}

export interface SystemsBody {
  kind: 'systems';
  request: SectionLead & {
    label: string;
    moments: readonly { time: string; stage: string; heading: string; body: string }[];
    assets: readonly VisualAsset[];
  };
  map: SectionLead & { steps: readonly LabeledPoint[] };
  control: SectionLead & {
    ai: { title: string; items: readonly string[] };
    people: { title: string; items: readonly string[] };
  };
  pair: StandalonePair;
}

export interface LoopStage {
  stage: string;
  name: string;
  capability: string;
  href: string;
  purpose: string;
}

export interface DemandLoopBody {
  kind: 'demand-loop';
  loop: SectionLead & { stages: readonly LoopStage[] };
  chapters: readonly (LoopStage & { body: string; asset: VisualAsset })[];
  thread: SectionLead & { moments: readonly { stage: string; line: string }[] };
  entry: SectionLead & { options: readonly { title: string; body: string; href: string; label: string }[] };
  boundary: { eye: string; heading: string; body: string };
}

export type CapabilityBody = BrandMediaBody | CampaignsBody | WebBody | SystemsBody | DemandLoopBody;

export interface CapabilityPage {
  family: 'brand-media' | 'service' | 'mechanism';
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  breadcrumb: readonly string[];
  current: 'services' | 'demand-loop';
  hero: {
    heading: string;
    support: string;
    secondaryLabel: string;
    secondaryTarget: string;
    visual: VisualAsset;
    insetVisual: VisualAsset;
  };
  body: CapabilityBody;
  faq: {
    eyebrow: string;
    heading: string;
    items: readonly CommercialFaq[];
  };
  booking: {
    eyebrow: string;
    heading: string;
    body: string;
    note: string;
  };
}

const FAQ_EYEBROW = 'What owners want to ask';
const GROWTH_CALL = '30-minute Growth Call';
const NOTE = 'Choose a time that works for you.';

export const brandMediaCapability: CapabilityPage = {
  family: 'brand-media',
  slug: 'brand-media',
  title: 'Brand Media: Photo, Video & Creative | Rushes Media',
  description:
    'Photo, video, and campaign creative that makes a business easier to notice, understand, and choose.',
  eyebrow: 'Brand Media',
  breadcrumb: ['Home', 'Services', 'Brand Media'],
  current: 'services',
  hero: {
    heading: 'Make what sets you apart visible.',
    support:
      'Rushes plans and produces photo, video, and campaign creative that shows people what the business offers, why it matters, and what makes it worth choosing.',
    secondaryLabel: 'See the work',
    secondaryTarget: '#what-this-is',
    visual: revisionAssets.coastalTerrace,
    insetVisual: industryVisuals.medSpa,
  },
  body: {
    kind: 'brand-media',
    manifesto: {
      eye: 'What this is',
      heading: 'Brand Media is the work of making the offer visible.',
      pull: 'If the value is hard to see, the next conversation is harder to start.',
      paragraphs: [
        'Photography, video, and campaign creative that help people recognize the product, place, craft, or point of view — and understand why it is worth choosing.',
        'Strong companies still lose ground when the work, the room, or the product is more impressive in person than it is in the first image someone meets. Brand Media closes that gap.',
      ],
      asset: capabilityAssets.manorTerrace,
    },
    audience: {
      eye: 'For contractors',
      heading: 'Make the finished job the first thing a buyer sees.',
      intro:
        'High-end contractors, hardscape companies, and outdoor living businesses already have the asset. It is sitting on the completed site.',
      paragraphs: [
        'Rushes produces original brand photography and video of that work — real jobs, real materials, real finish — not stock, and not a folder of unused files.',
        'The capture is planned for the places a buyer actually meets the business: paid campaigns, the website, and follow-up. Wide frames for attention, detail for a closer look, process for the page that has to earn the next conversation.',
        'Inside the Demand Loop, the same idea can travel from the first image to the booked estimate. That connection is available. It is not required.',
      ],
    },
    gallery: {
      eye: 'What strong media makes visible',
      heading: 'Show the outcome, the standard, and the experience.',
      intro:
        'People decide from what they can see. The frames have to make the result obvious, the quality recognizable, and the experience easy to imagine — without a paragraph doing the work the picture should do.',
      items: [
        {
          label: 'The outcome',
          heading: 'Make the benefit visible.',
          body: 'Show the product, transformation, service, or result people are actually buying.',
          asset: industryVisuals.outdoorLivingPool,
        },
        {
          label: 'The standard',
          heading: 'Make quality easier to recognize.',
          body: 'Show the decisions, details, and materials that separate the offer from a cheaper alternative.',
          asset: capabilityAssets.marbleKitchen,
        },
        {
          label: 'The experience',
          heading: 'Let people picture themselves in it.',
          body: 'Use environment, light, and atmosphere to make the experience feel real before they buy.',
          asset: revisionAssets.restaurant,
        },
      ],
    },
    delivery: {
      eye: 'What Rushes delivers',
      heading: 'From creative direction to ready-to-use versions.',
      intro:
        'Rushes defines the story before production, captures the people, products, or places required, and delivers versions shaped for each channel in scope.',
      stages: [
        {
          label: 'Direction',
          title: 'A concept built around the offer and audience.',
          body: 'Rushes decides what the media needs to communicate before production begins.',
        },
        {
          label: 'Capture',
          title: 'Photo and motion made for the idea.',
          body: 'Rushes directs, captures, and edits the people, products, spaces, or activity needed to tell the story.',
        },
        {
          label: 'Versions',
          title: 'Finished assets shaped for their use.',
          body: 'Approved reels, stills, ad creative, and web-ready versions arrive in the formats agreed for each channel.',
        },
      ],
      spread: {
        eye: 'One frame, four uses',
        heading: 'The same capture is cut for every place it has to work.',
        formats: [
          { name: 'Feed', ratio: '4:5', use: 'Organic stills and short cuts' },
          { name: 'Story', ratio: '9:16', use: 'Reels and campaign creative' },
          { name: 'Web', ratio: '16:9', use: 'Hero, service, and landing-page assets' },
          { name: 'Sales', ratio: '1:1', use: 'Project recaps and selected visuals' },
        ],
      },
    },
    pair: {
      alone: {
        eye: 'When it stands alone',
        heading: 'Hire Brand Media without a campaign, a website, or a system.',
        body: 'A company that already has demand can still need a clearer visual record of the work. Brand Media can be the entire engagement.',
      },
      loop: {
        eye: 'How it can connect',
        heading: 'Inside the Demand Loop, the same idea can travel further.',
        body: 'The first frame can become campaign creative, a web hero, and a follow-through asset. That connection is available. It is not required.',
        href: '/demand-loop/',
        label: 'See the Demand Loop',
      },
    },
  },
  faq: {
    eyebrow: FAQ_EYEBROW,
    heading: FAQ_EYEBROW,
    items: [
      {
        question: 'Can Rushes work with media we already have?',
        answer:
          'Yes, when the source material is strong enough. Rushes reviews what is usable, finds the clearest story already present, and plans only the additional capture needed to fill important gaps.',
      },
      {
        question: 'Does every project require a full production day?',
        answer:
          'No. Rushes can plan a focused capture around one product, service, person, or location, then expand the production when the story and intended uses require it. The business confirms any required property, client, or employee permissions before publication.',
      },
      {
        question: 'Where does the finished media get used?',
        answer:
          'Organic content, paid campaigns, focused pages, and sales follow-up. Each approved version is prepared for its intended use rather than exported as one file for every channel.',
      },
      {
        question: 'Does Rushes produce brand photography and video for high-end contractors?',
        answer:
          'Yes. Rushes plans and produces original photography and video for high-end contractors, hardscape companies, and outdoor living businesses, then delivers versions for campaigns, the website, and follow-up.',
      },
      {
        question: 'Is contractor brand media just documenting the job?',
        answer:
          'No. Job-site photos record what was built. Brand media is made for a buyer who has not stood on that site yet, so scope, quality, and finish are visible in the first image they meet.',
      },
    ],
  },
  booking: {
    eyebrow: GROWTH_CALL,
    heading: 'Bring the offer that deserves a clearer story.',
    body: 'We’ll review what you sell, how it is being presented now, and the first photo, video, or campaign idea that could make its value clearer to the right audience.',
    note: NOTE,
  },
};

export const campaignsCapability: CapabilityPage = {
  family: 'service',
  slug: 'campaigns',
  title: 'Meta & Google Ads Campaign Management | Rushes Media',
  description:
    'Meta and Google campaigns built around one credible idea, a focused conversion path and measurable qualified opportunities. Ad spend stays in the client-owned account.',
  eyebrow: 'Creative campaigns',
  breadcrumb: ['Home', 'Services', 'Campaigns'],
  current: 'services',
  hero: {
    heading: 'Reach the right people. Give them a reason to choose you.',
    support:
      'Google and Meta ad management, campaign creative, and landing pages for established businesses. Connect the attention your ads earn to inquiries your team can turn into customers.',
    secondaryLabel: 'See a campaign example',
    secondaryTarget: '#campaign-example',
    visual: homepageAssets.campaignsSubmerged,
    insetVisual: revisionAssets.bakery,
  },
  body: {
    kind: 'campaigns',
    leak: {
      eye: 'What this is',
      heading: 'Put your next business opportunity in front of the right audience.',
      intro:
        'Promote a valuable service, support a launch, or reach a new market. Rushes brings the message, ads and destination together so potential customers understand what you offer and how to take the next step.',
      nodes: ['Idea', 'Ad', 'Landing', 'Response', 'Outcome'],
      pains: [
        { after: 0, title: 'Give people a clear reason to care.', body: 'Choose the service or offer to promote, the customers it suits, and the strongest reason to consider your business.' },
        { after: 1, title: 'Make the ad and page work together.', body: 'Carry the offer from the ad to a relevant page, with useful examples and a clear way to inquire.' },
        { after: 2, title: 'Make contacting you straightforward.', body: 'Help visitors call, request a quote or book a conversation. Check that inquiries reach the right person.' },
        { after: 3, title: 'Learn which inquiries become business.', body: 'Review lead quality with your team. Connect campaign reporting to appointments and sales where reliable records are available.' },
      ],
    },
    matrix: {
      eye: 'What you can hire us for',
      heading: 'Ad management, creative and the page people land on.',
      intro: 'Hire campaign management on its own, or include creative and landing-page work. Your proposal spells out the services, deliverables and fees before work starts.',
      rows: [
        { label: 'Google Ads', title: 'Reach people searching', body: 'Campaign setup and management around the services, searches and locations relevant to your business.', note: 'You own the account and approve the budget.' },
        { label: 'Meta ads', title: 'Introduce your offer', body: 'Facebook and Instagram campaigns with creative that explains the offer and gives people a reason to respond.', note: 'Rushes manages the agreed campaigns.' },
        { label: 'Creative', title: 'Give the campaign its message', body: 'Ad copy and visual assets matched to the offer. Photography, video and additional versions are scoped in the proposal.', note: 'You approve the claims and creative.' },
        { label: 'Landing pages', title: 'Turn interest into an inquiry', body: 'A focused page that answers buyer questions, shows relevant work and makes contacting you easy.', note: 'Use a suitable existing page or commission a new one.' },
        { label: 'Reporting', title: 'See what the spend produces', body: 'Review spend, responses and lead quality, then use verified appointment and sales records to inform the next changes.', note: 'Your team confirms sales outcomes.' },
      ],
    },
    experiment: {
      eye: 'How the work happens',
      heading: 'Start with the business you want more of.',
      intro: 'Bring your priority service, the customers you want to reach and any previous advertising. We’ll recommend a starting scope and explain what it needs to work.',
      steps: [
        { name: 'Choose the opportunity', body: 'Agree on the service, audience and area to promote, and what makes an inquiry a good fit.' },
        { name: 'Agree on scope and budget', body: 'Separate platform ad spend from Rushes fees. Confirm the included creative, pages and campaign management.' },
        { name: 'Prepare the ads and page', body: 'Build the agreed assets and check that the page answers the questions raised by the ad.' },
        { name: 'Approve and launch', body: 'Review the finished work, budget and tracking with you before activating the campaign.' },
        { name: 'Review and improve', body: 'Use campaign data and feedback from your team to adjust the message, targeting or page.' },
      ],
      asset: capabilityAssets.coastalStreet,
    },
    pair: {
      alone: {
        eye: 'When it stands alone',
        heading: 'Keep what works. Hire the help you need.',
        body: 'Campaign management can stand alone when you have suitable creative and a working website. A full rebuild is not a prerequisite.',
      },
      loop: {
        eye: 'How it can connect',
        heading: 'Connect ads, creative and your website.',
        body: 'The Demand Loop brings these services together when your project needs them. We can also improve how inquiries reach your team.',
        href: '/demand-loop/',
        label: 'See the Demand Loop',
      },
    },
  },
  faq: {
    eyebrow: FAQ_EYEBROW,
    heading: FAQ_EYEBROW,
    items: [
      {
        question: 'Who pays the ad platforms?',
        answer:
          'The business does. Spend stays on the client-owned account and card; Rushes scopes creative, structure and management separately.',
      },
      {
        question: 'What should we agree on before spending money on ads?',
        answer:
          'Agree on the offer, creative, destination, budget, tracking, response coverage and the conditions for pausing spend. Keep the platform budget separate from the scope for creative and management, and define the qualified next step the campaign should create.',
      },
      {
        question: 'Can I hire you just to manage ads?',
        answer:
          'Yes. Ad management can be a standalone service. We first review your offer, existing creative, destination page and tracking, then explain any work needed before launch. You do not have to buy a new website or a full service package.',
      },
      {
        question: 'What should a campaign create?',
        answer:
          'More of the right people reaching a clear next step. Depending on the business, that may be a qualified estimate, consultation, or purchase conversation.',
      },
    ],
  },
  booking: {
    eyebrow: GROWTH_CALL,
    heading: 'Let’s talk about the business you want to grow.',
    body: 'Bring your priority service, target area and any current ads. We’ll discuss what is working, where you want to go, and the campaign support that fits.',
    note: NOTE,
  },
};

export const webCapability: CapabilityPage = {
  family: 'service',
  slug: 'web',
  title: 'Website & Landing Page Design | Rushes Media',
  description: 'Custom websites and landing pages that explain your offer, show your work, and make it easy for the right visitors to inquire or book.',
  eyebrow: 'Web & landing',
  breadcrumb: ['Home', 'Services', 'Web'],
  current: 'services',
  hero: {
    heading: 'Make the value clear. Make the next step easy.',
    support:
      'Business websites and campaign landing pages that show what you do, give people confidence in your work, and turn interest into inquiries. Hire a focused improvement or a complete site.',
    secondaryLabel: 'Explore our own site',
    secondaryTarget: '#website-example',
    visual: revisionAssets.daylitVenue,
    insetVisual: homepageAssets.brandMediaRiversideMill,
  },
  body: {
    kind: 'web',
    ladder: {
      eye: 'What this is',
      heading: 'A website that helps people choose your business.',
      intro:
        'Your site should explain your services, show the quality of your work and make the next step easy. We plan the content, design the pages and connect the inquiry tools around what your business needs.',
      rungs: [
        { label: '01 · Content', title: 'Explain the work you want to win.', body: 'Organize your services and write clear page content around the projects and customers you want to attract.' },
        { label: '02 · Design', title: 'Present your business at its best.', body: 'Build a visual direction around your brand, with layouts that work on phones and larger screens.' },
        { label: '03 · Work', title: 'Show people what you can do.', body: 'Put approved project examples, photographs and testimonials where they help visitors judge your fit.' },
        { label: '04 · Discovery', title: 'Make the important pages easy to find.', body: 'Use clear page titles, descriptive content and useful links between services and supporting information.' },
        { label: '05 · Inquiries', title: 'Give interest somewhere to go.', body: 'Connect the agreed contact form, calendar or phone action, and check how your team receives inquiries.' },
      ],
    },
    pains: {
      eye: 'Choose the right scope',
      heading: 'One campaign page or a complete business website.',
      intro: 'The right scope depends on what visitors need to know and where they are coming from. We review what you already have before recommending a rebuild.',
      items: [
        { title: 'A landing page for one offer.', body: 'Give an ad campaign or launch a focused destination, with the details visitors need and one clear next step.' },
        { title: 'A website for the whole business.', body: 'Help visitors explore several services, see your work and understand the company behind it.' },
        { title: 'An improvement to an existing site.', body: 'Address a confusing service page, awkward mobile layout or difficult inquiry process without replacing the entire site.' },
        { title: 'A site your team can maintain.', body: 'Agree on who updates content, what access you receive and which ongoing support is included before choosing the build approach.' },
      ],
    },
    process: {
      eye: 'How the work happens',
      heading: 'From the first conversation to a working website.',
      intro: 'We agree on the pages, content, responsibilities and launch needs before the build. You review the work along the way.',
      steps: [
        { name: 'Review your goals and current site', body: 'Discuss the work you want to attract, the customers you serve and what your current website does well.' },
        { name: 'Agree on pages and content', body: 'Define the scope, gather approved examples and confirm who supplies or approves each piece of content.' },
        { name: 'Design and build', body: 'Create the agreed pages and check the layouts on phones and desktop screens.' },
        { name: 'Connect your contact tools', body: 'Set up the agreed form, booking or call options and verify where customer requests go.' },
        { name: 'Review, launch and hand over', body: 'Check the live pages and links, preserve important existing URLs, and explain access and ongoing maintenance.' },
      ],
      asset: capabilityAssets.daylitStudio,
    },
    pair: {
      alone: {
        eye: 'When it stands alone',
        heading: 'A website project can stand on its own.',
        body: 'Keep your current advertising or marketing team. Hire Rushes for the website, landing page or specific improvement you need.',
      },
      loop: {
        eye: 'How it can connect',
        heading: 'Bring the website and campaign together.',
        body: 'When you also need ads or creative, Rushes can build them around the same offer so visitors find what brought them to the page.',
        href: '/demand-loop/',
        label: 'See the Demand Loop',
      },
    },
  },
  faq: {
    eyebrow: FAQ_EYEBROW,
    heading: FAQ_EYEBROW,
    items: [
      {
        question: 'Do I need a landing page or a full website?',
        answer:
          'A landing page focuses on one offer or campaign and one next step, such as an inquiry, call or booking. A full website gives visitors room to explore multiple services, understand the business and find the right path. The choice depends on what visitors need to decide and where they are coming from.',
      },
      {
        question: 'Can you improve an existing site without rebuilding it?',
        answer:
          'Often, yes. We review the content, design, mobile experience and contact tools first. The recommendation may be one improved page, a focused landing page or a larger rebuild, depending on what the existing site can support.',
      },
      {
        question: 'Do you use a page builder?',
        answer:
          'The implementation depends on the site being maintained. What matters is a fast, accessible experience that the business can own and update.',
      },
      {
        question: 'What do you need from me to start?',
        answer:
          'Bring your current website, priority services, target customers and any deadline. We will identify the brand files, approved project examples, content and account access needed for the agreed scope. You approve public claims and finished content before launch.',
      },
    ],
  },
  booking: {
    eyebrow: GROWTH_CALL,
    heading: 'Let’s look at what your website needs to do.',
    body: 'Bring your current site and the project you have in mind. We’ll discuss whether a focused improvement, landing page or full website fits the work you want to win.',
    note: NOTE,
  },
};

export const systemsCapability: CapabilityPage = {
  family: 'service',
  slug: 'follow-up',
  title: 'AI Consulting & Business Systems | Rushes Media',
  description:
    'Practical AI consulting, workflow automation, lead capture, and follow-up systems that save time and make the business easier to run.',
  eyebrow: 'AI & business systems',
  breadcrumb: ['Home', 'Services', 'AI & business systems'],
  current: 'services',
  hero: {
    heading: 'Inquiries get captured, routed, answered, and kept moving.',
    support:
      'Practical AI and better workflows reduce repetitive work, connect the tools the team already uses, and give every request an owner, a first reply, and a next date.',
    secondaryLabel: 'See the work',
    secondaryTarget: '#what-this-is',
    visual: revisionAssets.restaurant,
    insetVisual: industryVisuals.interiorDesign,
  },
  body: {
    kind: 'systems',
    request: {
      eye: 'What this is',
      heading: 'The operating path from first inquiry to a visible next step.',
      intro:
        'Rushes designs how calls, forms, and messages are captured, who sees them, what the first reply says, and how open items stay on a list instead of in someone’s memory. Here is one request, followed through the system.',
      label: 'One example request',
      moments: [
        { time: 'Saturday · 7:42 pm', stage: 'Capture', heading: 'Every request lands in one place.', body: 'An estimate request arrives after hours and is logged with the service and neighborhood before anyone picks up.' },
        { time: 'Saturday · 7:43 pm', stage: 'Respond', heading: 'A useful first reply goes out while intent is high.', body: 'A text confirms the request and offers two appointment windows, so the homeowner is not left waiting until Monday.' },
        { time: 'Monday · 8:05 am', stage: 'Route', heading: 'The right person sees it, with context.', body: 'The replacement inquiry reaches the owner with the source, the service, and the reply already attached. Routine service stays with dispatch.' },
        { time: 'Day three', stage: 'Keep moving', heading: 'Open items stay visible until they close.', body: 'The unanswered estimate surfaces as a reminder instead of disappearing into the inbox.' },
      ],
      assets: [capabilityAssets.phoneCounterNight, capabilityAssets.porchDuskDoorbell, capabilityAssets.twoTrucksDawn],
    },
    map: {
      eye: 'How the work happens',
      heading: 'Give AI a defined job. Keep people in control.',
      intro:
        'Map the current path, remove unnecessary steps, connect the tools already in place, automate the first pass, and send exceptions to a person. AI organizes, drafts, and routes. Judgment stays with the team.',
      steps: [
        { label: 'Understand', title: 'Find the real bottleneck', body: 'Map the task, the people involved, the information they need, and what a better outcome would look like.' },
        { label: 'Simplify', title: 'Remove unnecessary work first', body: 'Fix the process before automating it, so the system does not make a messy workflow move faster.' },
        { label: 'Connect', title: 'Keep useful context together', body: 'Link the right forms, calendars, CRM records, documents, or internal tools without replacing what already works.' },
        { label: 'Automate', title: 'Give AI a clear job', body: 'Use AI for defined work such as organizing information, preparing a first pass, routing requests, or surfacing the next action.' },
        { label: 'Handoff', title: 'Keep people in control', body: 'Send decisions, exceptions, and customer-facing moments to the right person with enough context to act.' },
        { label: 'Improve', title: 'Learn where time is still being lost', body: 'Review the workflow in use and refine the parts that create more leverage for the team.' },
      ],
    },
    control: {
      eye: 'Why it matters commercially',
      heading: 'Good work still stalls when the handoff is invisible.',
      intro:
        'A strong offer can still lose the Saturday request, the missed call, or the estimate that needed one more follow-up. The system’s job is to keep that work moving without making the business feel less human.',
      ai: {
        title: 'AI takes the first pass',
        items: ['Logging and organizing incoming requests', 'Drafting the first reply for review', 'Routing by service, urgency, and territory', 'Surfacing the next action and the open list'],
      },
      people: {
        title: 'People keep the decisions',
        items: ['Pricing, scope, and approvals', 'Exceptions and unusual requests', 'Customer-facing conversations', 'Final judgment on every opportunity'],
      },
    },
    pair: {
      alone: {
        eye: 'When it stands alone',
        heading: 'Hire the system when response is the constraint.',
        body: 'A business can already have strong media and a working website and still need a cleaner path from inquiry to a booked conversation.',
      },
      loop: {
        eye: 'How it can connect',
        heading: 'Inside the Demand Loop, follow-up protects the demand the other work creates.',
        body: 'Media and campaigns can create attention. The site can collect it. The system makes sure it does not sit unanswered. Use the capability on its own, or connect the path.',
        href: '/demand-loop/',
        label: 'See the Demand Loop',
      },
    },
  },
  faq: {
    eyebrow: FAQ_EYEBROW,
    heading: FAQ_EYEBROW,
    items: [
      {
        question: 'What does AI consulting include?',
        answer:
          'Rushes identifies where AI can save time or improve a workflow, recommends the right approach, and can help implement the system when the opportunity is clear.',
      },
      {
        question: 'Does this replace our team?',
        answer:
          'No. The goal is to reduce repetitive work and give people better context. Judgment, approvals, customer care, and important decisions stay with the team.',
      },
      {
        question: 'Can this work with our current tools?',
        answer:
          'Often, yes. Rushes first maps what is already in place, then improves or connects only the parts the business actually needs.',
      },
    ],
  },
  booking: {
    eyebrow: GROWTH_CALL,
    heading: 'Find the work worth making easier.',
    body: 'We’ll look at where requests lose momentum, which tools the team already uses, and the smallest useful system to put in place first.',
    note: NOTE,
  },
};

import { demandLoopIntroduction, demandLoopSteps } from './demand-loop';
const loopStages: readonly LoopStage[] = demandLoopSteps;

export const demandLoopCapability: CapabilityPage = {
  family: 'mechanism',
  slug: 'demand-loop',
  title: 'The Demand Loop | Rushes Media',
  description:
    'The Demand Loop connects Rushes Media’s media, campaigns, websites and follow-up to help turn attention into inquiries, conversations and revenue.',
  eyebrow: 'The connected system',
  breadcrumb: ['Home', 'Demand Loop'],
  current: 'demand-loop',
  hero: {
    heading: 'The Demand Loop. Turn attention into revenue.',
    support: demandLoopIntroduction,
    secondaryLabel: 'See how it connects',
    secondaryTarget: '#loop-stages',
    visual: industryVisuals.outdoorLiving,
    insetVisual: industryVisuals.hvac,
  },
  body: {
    kind: 'demand-loop',
    loop: {
      eye: 'Five connected stages',
      heading: 'A clearer path from attention to paying customers.',
      intro:
        'Use one capability or connect the full path. The goal is more visibility, more qualified conversations, a clearer path to revenue, and less time lost behind the scenes.',
      stages: loopStages,
    },
    chapters: [
      { ...loopStages[0], body: 'Photography and video make the offer, the standard, and the experience visible before the first conversation. This is where a buyer decides the business is worth a closer look.', asset: homepageAssets.brandMediaRiversideMill },
      { ...loopStages[1], body: 'Meta and Google campaigns carry the strongest idea to more of the people most likely to value it, with a path after the click that keeps the promise.', asset: homepageAssets.campaignsSubmerged },
      { ...loopStages[2], body: 'The page names the buyer, explains the offer, shows enough evidence to judge fit, and makes calling, booking, or requesting an estimate straightforward.', asset: revisionAssets.daylitVenue },
      { ...loopStages[3], body: 'Every request lands in one place, reaches the right person with context, and gets a useful first reply while intent is high.', asset: capabilityAssets.phoneCounterNight },
      { ...loopStages[4], body: 'Open items stay visible until they close or get a next date, so the work the other stages created does not sit unanswered.', asset: capabilityAssets.twoTrucksDawn },
    ],
    thread: {
      eye: 'What it creates',
      heading: 'One idea, carried from the first frame to a booked conversation.',
      intro:
        'The same offer can appear in media, in a campaign, on a page, and in the first reply. Each step keeps the context instead of starting over. Here is how one project story travels the loop.',
      moments: [
        { stage: 'Attention', line: 'A finished project is photographed so the result, the detail, and the setting are unmistakable.' },
        { stage: 'Reach', line: 'The strongest frame becomes the campaign, aimed at the homeowners most likely to want that project.' },
        { stage: loopStages[2].stage, line: 'The click lands on a page that explains the project and makes requesting an estimate easy.' },
        { stage: loopStages[3].stage, line: 'The interested homeowner gets a reply and a clear way to arrange a consultation.' },
        { stage: loopStages[4].stage, line: 'The team follows up on the estimate, answers questions, and helps the homeowner decide whether to go ahead.' },
      ],
    },
    entry: {
      eye: 'Where to start',
      heading: 'Start with the constraint, then connect only what helps.',
      intro:
        'Some businesses need media first. Some need a page. Some need response. Rushes starts with the gap that is costing the most, then adds the next connection when it creates leverage.',
      options: [
        { title: 'Media first', body: 'The work is stronger in person than it is in the first image someone meets.', href: '/brand-media/', label: 'Open Brand Media' },
        { title: 'Page first', body: 'Attention already arrives, but the destination loses the decision.', href: '/web/', label: 'Open Web & Landing' },
        { title: 'Response first', body: 'Inquiries arrive, then wait too long for an owner or a first reply.', href: '/follow-up/', label: 'Open AI & Business Systems' },
      ],
    },
    boundary: {
      eye: 'When it is not required',
      heading: 'The Demand Loop is the connection, not the company.',
      body: 'Brand Media, campaigns, web, and systems can each stand alone. The loop is useful when two or more parts of the path need to work together. The Growth Call is where the first move gets named.',
    },
  },
  faq: {
    eyebrow: FAQ_EYEBROW,
    heading: FAQ_EYEBROW,
    items: [
      {
        question: 'Do we need every service?',
        answer:
          'No. Brand Media, Creative Campaigns, Web, and AI or business systems can each stand alone. The Demand Loop is useful when two or more parts need to work together.',
      },
      {
        question: 'Can Rushes work with our current tools?',
        answer:
          'Usually. Rushes keeps what already works and improves the parts that are limiting the next business priority.',
      },
      {
        question: 'Where should we start?',
        answer:
          'Start with the service or handoff that would create the most useful change now. Expand only when the next connection becomes valuable.',
      },
      {
        question: 'What happens on the Growth Call?',
        answer:
          'We look at what the business wants to improve, what already works, and the clearest creative, growth, AI, or systems move to make next.',
      },
    ],
  },
  booking: {
    eyebrow: GROWTH_CALL,
    heading: 'Find the clearest way to connect the work.',
    body: 'We’ll look at what already works, where attention or response is stalling, and whether one capability or a connected path is the right next move.',
    note: NOTE,
  },
};

export const capabilityPages: readonly CapabilityPage[] = [
  brandMediaCapability,
  campaignsCapability,
  webCapability,
  systemsCapability,
  demandLoopCapability,
];

/**
 * Structured data for a capability page, built from the page's own content so the
 * markup and the schema can never drift. Geography is deliberately omitted: Rushes
 * sells to owner-led businesses anywhere, and areaServed here would signal otherwise.
 */
const BREADCRUMB_PATHS: Record<string, string> = { Home: '/', Services: '/#services' };

const SERVICE_TYPES: Record<string, string> = {
  'brand-media': 'Brand photography and video production',
  campaigns: 'Meta and Google advertising campaign management',
  web: 'Website and landing page design and development',
  'follow-up': 'AI consulting and business systems automation',
};

export function capabilityPageSchema(page: CapabilityPage): Record<string, unknown> {
  const url = `${SITE.origin}/${page.slug}/`;
  const provider = { '@type': 'ProfessionalService', name: SITE.name, url: `${SITE.origin}/` };
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebPage',
      '@id': url,
      url,
      name: page.title,
      description: page.description,
      isPartOf: { '@type': 'WebSite', name: SITE.name, url: `${SITE.origin}/` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: page.breadcrumb.map((name, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name,
        item:
          index === page.breadcrumb.length - 1
            ? url
            : `${SITE.origin}${BREADCRUMB_PATHS[name] ?? '/'}`,
      })),
    },
    faqPageSchema(page.faq.items),
  ];

  const serviceType = SERVICE_TYPES[page.slug];
  if (serviceType) {
    graph.push({
      '@type': 'Service',
      '@id': `${url}#service`,
      name: page.eyebrow,
      serviceType,
      description: page.description,
      url,
      provider,
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

export const innerPageNavigation = [
  { href: '/demand-loop/', label: 'Demand Loop' },
  { href: '/brand-media/', label: 'Brand media' },
  { href: '/campaigns/', label: 'Campaigns' },
  { href: '/web/', label: 'Web' },
  { href: '/follow-up/', label: 'AI & business systems' },
  { href: '/#examples', label: 'Examples' },
] as const;
