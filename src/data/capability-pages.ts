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
  title: 'Demand, not boosted posts — Rushes Media',
  description:
    'Meta and Google campaigns built around one credible idea, a focused conversion path and measurable qualified opportunities. Ad spend stays in the client-owned account.',
  eyebrow: 'Creative campaigns',
  breadcrumb: ['Home', 'Services', 'Campaigns'],
  current: 'services',
  hero: {
    heading: 'Demand, not boosted posts.',
    support:
      'Build campaigns around one valuable service, a credible creative idea, and a conversion path the business can actually operate. Ad spend stays on the client’s account and card.',
    secondaryLabel: 'See the work',
    secondaryTarget: '#what-this-is',
    visual: homepageAssets.campaignsSubmerged,
    insetVisual: revisionAssets.bakery,
  },
  body: {
    kind: 'campaigns',
    leak: {
      eye: 'What this is',
      heading: 'A campaign is one idea, carried to the right people, with a path after the click.',
      intro:
        'Paid media magnifies whatever happens after the click. Spend exposes every disconnected handoff, so Rushes checks each one before launch and judges the work by qualified conversations, not by activity inside the ads manager.',
      nodes: ['Idea', 'Ad', 'Landing', 'Response', 'Outcome'],
      pains: [
        { after: 0, title: 'The offer is a service menu.', body: 'The campaign asks the buyer to decode a long list instead of recognizing one problem, use case, or desired project.' },
        { after: 1, title: 'Creative has no job.', body: 'Assets are rotated because they look different, not because each tests a clear hook, angle, proof type, or objection.' },
        { after: 2, title: 'The landing path is generic.', body: 'Paid intent is sent to a homepage or broad form that loses the promise, source, and context that earned the click.' },
        { after: 3, title: 'A lead is counted as the outcome.', body: 'Spend is reported against platform events while qualification, held appointments, and business outcomes stay unknown.' },
      ],
    },
    matrix: {
      eye: 'Campaign operating matrix',
      heading: 'Every ad needs an accountable path after the click.',
      intro: 'The matrix is defined before activation so creative approval, spend control, and outcome ownership stay separate.',
      rows: [
        { label: 'Creative', title: 'One testable idea', body: 'Hook, angle, awareness, proof type, and call to action are named before a variant runs.', note: 'Rushes proposes · owner approves' },
        { label: 'Spend', title: 'Client-controlled budget', body: 'Platform access, geography, schedule, budget, and the conditions for pausing or stopping spend are explicit.', note: 'Owner authorizes · platform charges owner' },
        { label: 'Landing', title: 'Message continuity', body: 'The page continues the exact promise and asks for one appropriate next action.', note: 'Rushes builds · owner verifies offer' },
        { label: 'Response', title: 'Named handoff owner', body: 'The inquiry retains source and context, then reaches the person responsible for the next step.', note: 'System routes · team responds' },
        { label: 'Learning', title: 'Business-level signal', body: 'Qualified and held appointments plus client-reported outcomes inform the next creative decision.', note: 'No result claim without evidence' },
      ],
    },
    experiment: {
      eye: 'How the work happens',
      heading: 'A campaign is a controlled commercial experiment.',
      intro: 'Copy approval is not launch approval. The exact creative, destination, budget, and tracking state are reviewed before spend begins.',
      steps: [
        { name: 'Choose the objective', body: 'Define the service, buyer, territory, capacity, and meaningful conversion.' },
        { name: 'Build the decision plan', body: 'Name the hook, angle, proof, format, call to action, landing page, decision signals, and next action.' },
        { name: 'Create the campaign path', body: 'Produce the creative and focused landing experience with accurate source and consent handling.' },
        { name: 'Verify before activation', body: 'Confirm the approved creative and destination, budget, tracking, response coverage, and the conditions for pausing or stopping spend.' },
        { name: 'Read qualified outcomes', body: 'Use downstream appointment and client-reported signals to keep, stop, or revise the next test.' },
      ],
      asset: capabilityAssets.coastalStreet,
    },
    pair: {
      alone: {
        eye: 'When it stands alone',
        heading: 'Hire campaigns when the offer and handoff are already clear.',
        body: 'A business with a defined service, buyer, and response path can run campaigns without rebuilding the website or the brand library first.',
      },
      loop: {
        eye: 'How it can connect',
        heading: 'Inside the Demand Loop, the same idea travels from attention to a booked next step.',
        body: 'Brand Media supplies the frames. The page continues the promise. Follow-up keeps the inquiry moving. That connection is available when it creates leverage.',
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
        question: 'Do you launch as soon as the ads are designed?',
        answer:
          'No. Exact creative approval, landing behavior, tracking, budget, response coverage and the conditions for pausing or stopping spend are separate launch gates.',
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
    heading: 'Find the campaign worth funding.',
    body: 'Bring the service, territory, capacity and any prior spend. We’ll define the first useful test, the path after the click and the conditions that justify launch.',
    note: NOTE,
  },
};

export const webCapability: CapabilityPage = {
  family: 'service',
  slug: 'web',
  title: 'A site that books — Rushes Media',
  description: 'Custom sites and landing pages with one job: call, book, or request the estimate. Built for the campaign behind it.',
  eyebrow: 'Web & landing',
  breadcrumb: ['Home', 'Services', 'Web'],
  current: 'services',
  hero: {
    heading: 'Make the value clear. Make the next step easy.',
    support:
      'Build a fast, distinctive digital experience that communicates the offer, makes the evidence easy to judge, and gives the right visitor a clear next step on any device.',
    secondaryLabel: 'See the work',
    secondaryTarget: '#what-this-is',
    visual: revisionAssets.daylitVenue,
    insetVisual: homepageAssets.brandMediaRiversideMill,
  },
  body: {
    kind: 'web',
    ladder: {
      eye: 'What this is',
      heading: 'Five decisions, in the order a buyer needs them.',
      intro:
        'A site or landing page that helps the right visitor understand and act. The page names the buyer, explains the offer, shows enough evidence to judge fit, and makes calling, booking, or requesting an estimate straightforward. The composition changes by route. The decision sequence stays explicit.',
      rungs: [
        { label: '01 · Relevance', title: 'Is this for me?', body: 'Name the buyer, problem, service, or project with enough specificity to earn the next scroll.' },
        { label: '02 · Value', title: 'Why this path?', body: 'Explain the commercial idea and how it differs from a disconnected vendor or a generic service list.' },
        { label: '03 · Evidence', title: 'Why believe it?', body: 'Use inspected real proof, a labeled concept, or a functional demonstration with an honest boundary.' },
        { label: '04 · Fit', title: 'Should I continue?', body: 'Clarify territory, scope, timing, capacity, and poor-fit conditions before the calendar.' },
        { label: '05 · Action', title: 'What happens next?', body: 'Provide one visible primary action, a reliable fallback, and clear expectations for the handoff.' },
      ],
    },
    pains: {
      eye: 'Why it matters commercially',
      heading: 'A beautiful page can still lose the decision.',
      intro: 'Web quality is not a hero screenshot. The message, proof, structure, speed, and handoff have to survive the full path from entry to action.',
      items: [
        { title: 'The first screen tries to say everything.', body: 'A broad promise and a crowded service list force the visitor to work out who the page is for and what to do.' },
        { title: 'Proof lacks a truth label.', body: 'Concept work, demonstrations, and client evidence are presented without enough context to judge what is actually being shown.' },
        { title: 'Mobile is a compressed desktop.', body: 'Type, navigation, media crops, and forms technically fit while the hierarchy and the action become harder to use.' },
        { title: 'The call to action ends at a widget.', body: 'A form or calendar loads with no fallback, source context, ownership, or confirmation path.' },
      ],
    },
    process: {
      eye: 'How the work happens',
      heading: 'Build the decision path before decorating the page.',
      intro: 'The work begins with the offer, buyer, and next action, then carries that decision through every device and handoff.',
      steps: [
        { name: 'Clarify the offer and buyer', body: 'Define who the page is for, what they need to understand, and the one action the page should earn.' },
        { name: 'Write the decision path', body: 'Sequence relevance, value, evidence, fit, and objections so the visitor never has to decode the next step.' },
        { name: 'Design for action on every device', body: 'Use hierarchy, media, and responsive composition to keep the offer and primary action clear from phone to desktop.' },
        { name: 'Connect the inquiry or booking handoff', body: 'Preserve the source and context, then route the action to a visible owner with a reliable fallback.' },
        { name: 'Verify the released experience', body: 'Check the live page, links, mobile behavior, accessibility, and the complete path into the calendar or inquiry queue.' },
      ],
      asset: capabilityAssets.daylitStudio,
    },
    pair: {
      alone: {
        eye: 'When it stands alone',
        heading: 'Hire web work when the destination is the constraint.',
        body: 'A business can keep its current campaigns and media and still need a page that continues the promise and completes the handoff.',
      },
      loop: {
        eye: 'How it can connect',
        heading: 'Inside the Demand Loop, the page is where attention becomes a request.',
        body: 'Campaigns send the right people. The site holds the argument. Follow-up keeps the request moving. Use the page alone, or connect the path.',
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
        question: 'Can you improve an existing site without rebuilding it?',
        answer:
          'Often, yes. Rushes first identifies whether the real problem is positioning, structure, proof, mobile usability or the handoff after inquiry. A rebuild is recommended only when the current system cannot support the required path.',
      },
      {
        question: 'Do you use a page builder?',
        answer:
          'The implementation depends on the site being maintained. What matters is a fast, accessible experience that the business can own and update.',
      },
      {
        question: 'How do you handle concept visuals?',
        answer:
          'They are labeled as Rushes concept imagery and never presented as completed client work, performance evidence or a testimonial.',
      },
    ],
  },
  booking: {
    eyebrow: GROWTH_CALL,
    heading: 'Give the right visitor one clear next step.',
    body: 'We’ll inspect the offer, proof, mobile path and booking handoff, then recommend whether to rebuild, focus or keep the current site.',
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

const loopStages: readonly LoopStage[] = [
  { stage: 'Attention', name: 'Earn attention', capability: 'Brand Media', href: '/brand-media/', purpose: 'Show the reputation, work, and value that make the business worth choosing.' },
  { stage: 'Reach', name: 'Extend the reach', capability: 'Creative Campaigns', href: '/campaigns/', purpose: 'Put the strongest idea in front of more of the right people.' },
  { stage: 'Decision', name: 'Make the value clear', capability: 'Web & Landing', href: '/web/', purpose: 'Give interested buyers a focused place to understand the offer and act.' },
  { stage: 'Response', name: 'Turn interest into conversation', capability: 'AI & Business Systems', href: '/follow-up/', purpose: 'Route inquiries, preserve context, and make the next useful action clear.' },
  { stage: 'Continuity', name: 'Keep opportunity moving', capability: 'AI & Business Systems', href: '/follow-up/', purpose: 'Use practical automation and follow-up to save time and keep opportunities moving.' },
];

export const demandLoopCapability: CapabilityPage = {
  family: 'mechanism',
  slug: 'demand-loop',
  title: 'The Demand Loop | Rushes Media',
  description:
    'The Rushes system connecting Brand Media, campaigns, web, AI-supported business systems, lead capture, and follow-up around one clear path from attention to action.',
  eyebrow: 'The connected system',
  breadcrumb: ['Home', 'Demand Loop'],
  current: 'demand-loop',
  hero: {
    heading: 'The Demand Loop. Make attention lead somewhere.',
    support:
      'The Demand Loop connects the work around growth. Brand Media earns attention. Creative Campaigns extend the reach. Web turns interest into action. AI and business systems reduce friction, speed up response, and help the team keep opportunities moving.',
    secondaryLabel: 'See how it connects',
    secondaryTarget: '#loop-stages',
    visual: industryVisuals.outdoorLiving,
    insetVisual: industryVisuals.hvac,
  },
  body: {
    kind: 'demand-loop',
    loop: {
      eye: 'Five connected moments',
      heading: 'From attention to action, without the usual gaps.',
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
        { stage: 'Decision', line: 'The click lands on a page that continues the same story and asks for one clear next step.' },
        { stage: 'Response', line: 'The inquiry arrives with its source attached and gets a first reply while interest is high.' },
        { stage: 'Continuity', line: 'The open estimate stays on the list, with a next date, until it becomes a decision.' },
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
