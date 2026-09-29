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

/** One closing line on each service page: it can be hired alone, and it can connect to the others. */
export interface ServiceConnection { body: string; }

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
  pair: ServiceConnection;
}

export interface CampaignsBody {
  kind: 'campaigns';
  matrix: SectionLead & { rows: readonly LabeledPoint[] };
  plan: SectionLead & { steps: readonly NamedStep[] };
  pair: ServiceConnection;
}

export interface WebBody {
  kind: 'web';
  scope: SectionLead & { options: readonly Point[]; includes: { title: string; items: readonly string[] } };
  example: SectionLead & { note: string; links: readonly { href: string; label: string }[] };
  process: SectionLead & { steps: readonly NamedStep[] };
  pair: ServiceConnection;
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
  pair: ServiceConnection;
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
    /** Replace the two concept photos with screenshots of the Rushes site (owned work). */
    siteShowcase?: boolean;
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

const FAQ_EYEBROW = 'Questions';
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
    secondaryLabel: 'See what you get',
    secondaryTarget: '#delivery',
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
      body: 'Brand Media can be the whole engagement. When it helps, the same shoot can also supply your ads, website and follow-up.',
    },
  },
  faq: {
    eyebrow: FAQ_EYEBROW,
    heading: 'Brand media questions',
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
    secondaryLabel: 'See what’s included',
    secondaryTarget: '#what-this-is',
    visual: homepageAssets.campaignsSubmerged,
    insetVisual: revisionAssets.bakery,
  },
  body: {
    kind: 'campaigns',
    matrix: {
      eye: 'What you can hire us for',
      heading: 'Ad management, creative and the page people land on.',
      intro: 'Hire campaign management on its own, or add creative and a landing page. Your proposal lists the services, deliverables and fees before work starts.',
      rows: [
        { label: 'Google Ads', title: 'Reach people searching', body: 'Campaign setup and management around the services, searches and locations relevant to your business.', note: 'You own the account and approve the budget.' },
        { label: 'Meta ads', title: 'Introduce your offer', body: 'Facebook and Instagram campaigns with creative that explains the offer and gives people a reason to respond.', note: 'Rushes manages the agreed campaigns.' },
        { label: 'Creative', title: 'Give the campaign its message', body: 'Ad copy and visual assets matched to the offer. Photography, video and additional versions are scoped in the proposal.', note: 'You approve the claims and creative.' },
        { label: 'Landing pages', title: 'Turn interest into an inquiry', body: 'A focused page that answers buyer questions, shows relevant work and makes contacting you easy.', note: 'Use a suitable existing page or commission a new one.' },
        { label: 'Reporting', title: 'See what the spend produces', body: 'Spend, responses and lead quality, checked against the appointments and sales your team records.', note: 'Your team confirms sales outcomes.' },
      ],
    },
    plan: {
      eye: 'How a campaign runs',
      heading: 'Start with the work you want more of.',
      steps: [
        { name: 'Choose the opportunity', body: 'Pick the service, customers and area to promote, and agree what makes an inquiry a good fit.' },
        { name: 'Agree on scope and budget', body: 'Ad spend stays separate from Rushes fees. You approve the budget and pay the platforms from your own account.' },
        { name: 'Match the ad and the page', body: 'Build ads and a page that carry the same offer, with relevant examples and an easy way to call, book or ask for a quote.' },
        { name: 'Launch and review', body: 'After you approve the work and tracking, we review inquiry quality with your team and adjust the message, targeting or page.' },
      ],
    },
    pair: {
      body: 'Campaign management can stand alone when your creative and website already work. Add creative or a landing page only when the campaign needs them.',
    },
  },
  faq: {
    eyebrow: FAQ_EYEBROW,
    heading: 'Campaign questions',
    items: [
      {
        question: 'How do we choose an ad budget, and who pays it?',
        answer:
          'We start with the service you want to sell, the area you serve, the value of a customer and any results from your current ads. Those inputs help us scope a test you can sustain and decide what would justify continuing it. You approve the budget before launch and pay the platforms through your own account and card. Rushes scopes creative, landing pages and management separately.',
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
        question: 'When can a campaign launch, and when will we know if it is working?',
        answer:
          'Launch depends on account access, approved creative, a working destination and verified inquiry tracking. We agree on that preparation and the review period in the project scope. Once ads run, clicks alone do not tell us whether they are working: we need relevant inquiries and your team’s feedback on appointments and sales. Small samples can be inconclusive, so we do not promise a result by a fixed date.',
      },
      {
        question: 'What should a campaign create?',
        answer:
          'An inquiry about work you want to win. Before launch, agree on the service, customer, area and other requirements that make an inquiry a fit. Then distinguish those inquiries from appointments and sales using your team’s records. A click or form submission alone does not establish a new customer.',
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
    secondaryLabel: 'See our own site',
    secondaryTarget: '#website-example',
    visual: revisionAssets.daylitVenue,
    insetVisual: homepageAssets.brandMediaRiversideMill,
    siteShowcase: true,
  },
  body: {
    kind: 'web',
    scope: {
      eye: 'What you can hire us for',
      heading: 'Choose the scope that fits the job.',
      intro: 'We look at what you already have before recommending a rebuild.',
      options: [
        { title: 'A landing page', body: 'One offer, one audience and one clear next step. Often the destination for an ad campaign or a launch.' },
        { title: 'A full website', body: 'Room for several services, your work and the company behind it, with a clear way to get in touch from every page.' },
        { title: 'Improvements to your site', body: 'Fix a confusing service page, an awkward mobile layout or a difficult contact form without replacing everything.' },
      ],
      includes: {
        title: 'Every project covers',
        items: [
          'Page content written around the work you want to win',
          'A design that works on phones and large screens',
          'Approved photos, projects and reviews placed where they help people decide',
          'Clear page titles and links, so important pages are easy to find',
          'A form, calendar or call button, tested to reach the right person',
        ],
      },
    },
    example: {
      eye: 'Our own website',
      heading: 'Designed and built by Rushes.',
      intro: 'The site you are on is our own build: the visual identity, service pages, buyer guides and booking, with an email option if the calendar does not load.',
      note: 'Our own work, not a client project.',
      links: [
        { href: '/', label: 'Homepage' },
        { href: '/campaigns/', label: 'A service page' },
        { href: '/articles/landing-page-or-full-website/', label: 'A buyer guide' },
        { href: '#book', label: 'Booking' },
      ],
    },
    process: {
      eye: 'How a project runs',
      heading: 'From first call to launch.',
      steps: [
        { name: 'Agree on scope', body: 'Talk through the work you want to attract and review your current site. Confirm the pages, content and who supplies each piece.' },
        { name: 'Design and build', body: 'Create the agreed pages and check them on phones and desktop screens. You review the work along the way.' },
        { name: 'Connect contact tools', body: 'Set up the form, booking or call options and confirm where each inquiry goes.' },
        { name: 'Launch and hand over', body: 'Check the live pages and links, keep important existing URLs working, and explain access and upkeep.' },
      ],
    },
    pair: {
      body: 'A website project can stand on its own. If you also need ads or creative, we can build them around the same offer so visitors find what brought them to the page.',
    },
  },
  faq: {
    eyebrow: FAQ_EYEBROW,
    heading: 'Website questions',
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
        question: 'Do you use a page builder, and who maintains the site?',
        answer:
          'The build approach depends on who will update the site. Before choosing it, we agree on who edits content, what access you receive and which ongoing support is included. The goal is a fast, accessible site your business owns.',
      },
      {
        question: 'What affects the cost and timing of a website project?',
        answer:
          'The scope matters more than the page count alone: writing content, creating or gathering approved images, connecting forms or booking tools, and preserving existing pages all affect the work. Timing also depends on account access, content readiness and review turnaround. Bring your current site, priorities and any deadline so we can agree on the work, responsibilities and launch requirements before the build. Confirm ongoing hosting, updates and support separately from the initial project.',
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
    heading: 'Practical AI and systems that give your team time back.',
    support:
      'Take repetitive admin off your team, connect the tools you already use, and make sure every inquiry gets an owner, a first reply and a next step. People keep the decisions.',
    secondaryLabel: 'See an example',
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
      body: 'A systems project can stand on its own. It can also connect to the media, ads and website that bring inquiries in.',
    },
  },
  faq: {
    eyebrow: FAQ_EYEBROW,
    heading: 'AI and systems questions',
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
    heading: 'Demand Loop questions',
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
