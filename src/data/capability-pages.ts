import type { VisualAsset } from './industry-pages';
import { industryVisuals } from './industry-pages';
import { homepageAssets } from './homepage-assets';
import { revisionAssets } from './revision-assets';
export interface CommercialFaq { question: string; answer: string; }
export interface DemandLoopStep {
  stage: string;
  name: string;
  capability: string;
  purpose: string;
}

export interface CapabilityAnswer {
  id: string;
  eye: string;
  heading: string;
  body: string;
}

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
  answers: readonly CapabilityAnswer[];
  loopSteps?: readonly DemandLoopStep[];
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
  answers: [
    {
      id: 'what-this-is',
      eye: 'What this is',
      heading: 'Brand Media is the work of making the offer visible.',
      body: 'Photography, video, and campaign creative that help people recognize the product, place, craft, or point of view — and understand why it is worth choosing.',
    },
    {
      id: 'why',
      eye: 'Why it matters commercially',
      heading: 'If the value is hard to see, the next conversation is harder to start.',
      body: 'Strong companies still lose ground when the work, the room, or the product is more impressive in person than it is in the first image someone meets. Brand Media closes that gap.',
    },
    {
      id: 'visible',
      eye: 'What strong media makes visible',
      heading: 'Show the outcome, the standard, and the experience.',
      body: 'People decide from what they can see. The frames have to make the result obvious, the quality recognizable, and the experience easy to imagine — without a paragraph doing the work the picture should do.',
    },
    {
      id: 'creates',
      eye: 'What Rushes can create',
      heading: 'Direction, capture, and ready-to-use versions.',
      body: 'A concept built around the offer, new stills and motion, and finished assets prepared for organic, campaign, web, and sales use.',
    },
    {
      id: 'how',
      eye: 'How the work happens',
      heading: 'Decide what must be seen, then make those frames.',
      body: 'Rushes defines the story before production, captures the people, products, or places required, and delivers versions shaped for each channel in scope.',
    },
    {
      id: 'alone',
      eye: 'When it stands alone',
      heading: 'Hire Brand Media without a campaign, a website, or a system.',
      body: 'A company that already has demand can still need a clearer visual record of the work. Brand Media can be the entire engagement.',
    },
    {
      id: 'loop',
      eye: 'How it can connect',
      heading: 'Inside the Demand Loop, the same idea can travel further.',
      body: 'The first frame can become campaign creative, a web hero, and a follow-through asset. That connection is available. It is not required.',
    },
  ],
  faq: {
    eyebrow: 'What owners want to ask',
    heading: 'What owners want to ask',
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
    eyebrow: '30-minute Growth Call',
    heading: 'Bring the offer that deserves a clearer story.',
    body: 'We’ll review what you sell, how it is being presented now, and the first photo, video, or campaign idea that could make its value clearer to the right audience.',
    note: 'Choose a time that works for you.',
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
  answers: [
    {
      id: 'what-this-is',
      eye: 'What this is',
      heading: 'A campaign is one idea, carried to the right people, with a path after the click.',
      body: 'Meta and Google campaigns pair strong creative with a clear message and next step. The work is judged by qualified conversations, not by activity inside the ads manager.',
    },
    {
      id: 'why',
      eye: 'Why it matters commercially',
      heading: 'Spend exposes every disconnected handoff.',
      body: 'Paid media magnifies whatever happens after the click. Before launch, Rushes checks positioning, destination, response, and outcome reporting, then scopes only what the objective requires.',
    },
    {
      id: 'creates',
      eye: 'What Rushes can create',
      heading: 'Every ad needs an accountable path after the click.',
      body: 'A named offer, a testable creative idea, a landing path that keeps the promise, and a response owner. Copy approval is not launch approval.',
    },
    {
      id: 'how',
      eye: 'How the work happens',
      heading: 'A campaign is a controlled commercial experiment.',
      body: 'Choose the objective, build the decision plan, create the path, verify before activation, and read qualified outcomes. The exact creative, destination, budget, and tracking state are reviewed before spend begins.',
    },
    {
      id: 'alone',
      eye: 'When it stands alone',
      heading: 'Hire campaigns when the offer and handoff are already clear.',
      body: 'A business with a defined service, buyer, and response path can run campaigns without rebuilding the website or the brand library first.',
    },
    {
      id: 'loop',
      eye: 'How it can connect',
      heading: 'Inside the Demand Loop, the same idea travels from attention to a booked next step.',
      body: 'Brand Media supplies the frames. The page continues the promise. Follow-up keeps the inquiry moving. That connection is available when it creates leverage.',
    },
  ],
  faq: {
    eyebrow: 'What owners want to ask',
    heading: 'What owners want to ask',
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
    eyebrow: '30-minute Growth Call',
    heading: 'Find the campaign worth funding.',
    body: 'Bring the service, territory, capacity and any prior spend. We’ll define the first useful test, the path after the click and the conditions that justify launch.',
    note: 'Choose a time that works for you.',
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
  answers: [
    {
      id: 'what-this-is',
      eye: 'What this is',
      heading: 'A site or landing page that helps the right visitor understand and act.',
      body: 'The page names the buyer, explains the offer, shows enough evidence to judge fit, and makes calling, booking, or requesting an estimate straightforward.',
    },
    {
      id: 'why',
      eye: 'Why it matters commercially',
      heading: 'A beautiful page can still lose the decision.',
      body: 'Web quality is not a hero screenshot. The message, proof, structure, speed, and handoff have to survive the full path from entry to action.',
    },
    {
      id: 'creates',
      eye: 'What Rushes can create',
      heading: 'Five decisions, in the order a buyer needs them.',
      body: 'Relevance, value, evidence, fit, and one clear action. The composition changes by route. The decision sequence stays explicit.',
    },
    {
      id: 'how',
      eye: 'How the work happens',
      heading: 'Build the decision path before decorating the page.',
      body: 'Clarify the offer and buyer, write the path, design for action on every device, connect the inquiry or booking handoff, and verify the released experience.',
    },
    {
      id: 'alone',
      eye: 'When it stands alone',
      heading: 'Hire web work when the destination is the constraint.',
      body: 'A business can keep its current campaigns and media and still need a page that continues the promise and completes the handoff.',
    },
    {
      id: 'loop',
      eye: 'How it can connect',
      heading: 'Inside the Demand Loop, the page is where attention becomes a request.',
      body: 'Campaigns send the right people. The site holds the argument. Follow-up keeps the request moving. Use the page alone, or connect the path.',
    },
  ],
  faq: {
    eyebrow: 'What owners want to ask',
    heading: 'What owners want to ask',
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
    eyebrow: '30-minute Growth Call',
    heading: 'Give the right visitor one clear next step.',
    body: 'We’ll inspect the offer, proof, mobile path and booking handoff, then recommend whether to rebuild, focus or keep the current site.',
    note: 'Choose a time that works for you.',
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
  answers: [
    {
      id: 'what-this-is',
      eye: 'What this is',
      heading: 'The operating path from first inquiry to a visible next step.',
      body: 'Rushes designs how calls, forms, and messages are captured, who sees them, what the first reply says, and how open items stay on a list instead of in someone’s memory.',
    },
    {
      id: 'why',
      eye: 'Why it matters commercially',
      heading: 'Good work still stalls when the handoff is invisible.',
      body: 'A strong offer can still lose the Saturday request, the missed call, or the estimate that needed one more follow-up. The system’s job is to keep that work moving without making the business feel less human.',
    },
    {
      id: 'creates',
      eye: 'What Rushes can create',
      heading: 'Capture, route, respond, keep moving.',
      body: 'One inbox for incoming demand. A named owner with context. A useful first reply while intent is high. Open items that stay visible until they close or get a next date.',
    },
    {
      id: 'how',
      eye: 'How the work happens',
      heading: 'Give AI a defined job. Keep people in control.',
      body: 'Map the current path, remove unnecessary steps, connect the tools already in place, automate the first pass, and send exceptions to a person. AI organizes, drafts, and routes. Judgment stays with the team.',
    },
    {
      id: 'alone',
      eye: 'When it stands alone',
      heading: 'Hire the system when response is the constraint.',
      body: 'A business can already have strong media and a working website and still need a cleaner path from inquiry to a booked conversation.',
    },
    {
      id: 'loop',
      eye: 'How it can connect',
      heading: 'Inside the Demand Loop, follow-up protects the demand the other work creates.',
      body: 'Media and campaigns can create attention. The site can collect it. The system makes sure it does not sit unanswered. Use the capability on its own, or connect the path.',
    },
  ],
  faq: {
    eyebrow: 'What owners want to ask',
    heading: 'What owners want to ask',
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
    eyebrow: '30-minute Growth Call',
    heading: 'Find the work worth making easier.',
    body: 'We’ll look at where requests lose momentum, which tools the team already uses, and the smallest useful system to put in place first.',
    note: 'Choose a time that works for you.',
  },
};

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
  loopSteps: [
    {
      stage: 'Attention',
      name: 'Earn attention',
      capability: 'Brand Media',
      purpose: 'Show the reputation, work, and value that make the business worth choosing.',
    },
    {
      stage: 'Reach',
      name: 'Extend the reach',
      capability: 'Creative Campaigns',
      purpose: 'Put the strongest idea in front of more of the right people.',
    },
    {
      stage: 'Decision',
      name: 'Make the value clear',
      capability: 'Web & Landing',
      purpose: 'Give interested buyers a focused place to understand the offer and act.',
    },
    {
      stage: 'Response',
      name: 'Turn interest into conversation',
      capability: 'AI & Business Systems',
      purpose: 'Route inquiries, preserve context, and make the next useful action clear.',
    },
    {
      stage: 'Continuity',
      name: 'Keep opportunity moving',
      capability: 'AI & Business Systems',
      purpose: 'Use practical automation and follow-up to save time and keep opportunities moving.',
    },
  ],
  answers: [
    {
      id: 'what-this-is',
      eye: 'What this is',
      heading: 'Five connected moments, from attention to a next step the business can run.',
      body: 'Use one capability or connect the full path. The goal is more visibility, more qualified conversations, a clearer path to revenue, and less time lost behind the scenes.',
    },
    {
      id: 'why',
      eye: 'Why it matters commercially',
      heading: 'Disconnected work creates attention that nobody can finish.',
      body: 'A strong video, a live ad, and a website can still fail if the inquiry has no owner. The Demand Loop is the connection when those parts need to work together.',
    },
    {
      id: 'creates',
      eye: 'What it creates',
      heading: 'One idea, carried from the first frame to a booked conversation.',
      body: 'The same offer can appear in media, in a campaign, on a page, and in the first reply. Each step keeps the context instead of starting over.',
    },
    {
      id: 'how',
      eye: 'How the work happens',
      heading: 'Start with the constraint, then connect only what helps.',
      body: 'Some businesses need media first. Some need a page. Some need response. Rushes starts with the gap that is costing the most, then adds the next connection when it creates leverage.',
    },
    {
      id: 'alone',
      eye: 'When it is not required',
      heading: 'The Demand Loop is the connection, not the company.',
      body: 'Brand Media, campaigns, web, and systems can each stand alone. The loop is useful when two or more parts of the path need to work together.',
    },
    {
      id: 'loop',
      eye: 'Where to start',
      heading: 'Start with the service or handoff that would create the most useful change now.',
      body: 'Expand only when the next connection becomes valuable. The Growth Call is where that first move gets named.',
    },
  ],
  faq: {
    eyebrow: 'What owners want to ask',
    heading: 'What owners want to ask',
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
    eyebrow: '30-minute Growth Call',
    heading: 'Find the clearest way to connect the work.',
    body: 'We’ll look at what already works, where attention or response is stalling, and whether one capability or a connected path is the right next move.',
    note: 'Choose a time that works for you.',
  },
};

export const capabilityPages: readonly CapabilityPage[] = [
  brandMediaCapability,
  campaignsCapability,
  webCapability,
  systemsCapability,
  demandLoopCapability,
];
