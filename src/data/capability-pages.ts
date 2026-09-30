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

/** Closing band on each service page, before booking: hire it alone, or connect it through the Demand Loop. */
export interface ServiceConnection { alone: string; together: string; }

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
}

export interface CampaignsBody {
  kind: 'campaigns';
  /** The five parts of a campaign drawn as connected circles, with what has to hold between each pair. */
  flow: SectionLead & {
    nodes: readonly string[];
    links: readonly (Point & { after: number })[];
  };
  matrix: SectionLead & { rows: readonly LabeledPoint[] };
}

export type WebDesignId = 'stonevale' | 'halewood';

export interface WebBody {
  kind: 'web';
  scope: SectionLead & { options: readonly Point[] };
  designs: SectionLead & {
    items: readonly { id: WebDesignId; name: string; label: string; body: string; features: readonly string[] }[];
  };
  capabilities: SectionLead & { groups: readonly Point[] };
  process: SectionLead & { steps: readonly NamedStep[] };
}

export interface SystemsBody {
  kind: 'systems';
  work: SectionLead & { items: readonly Point[]; visual: VisualAsset; inset: VisualAsset };
  example: SectionLead & {
    label: string;
    moments: readonly { time: string; stage: string; heading: string; body: string }[];
  };
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
    /** Show the Stonevale and Halewood website designs instead of the two photographs. */
    designShowcase?: boolean;
  };
  body: CapabilityBody;
  connect?: ServiceConnection;
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
  },
  connect: {
    alone: 'Brand Media can be the whole project: planning, the shoot, the edit and finished files for each place you use them.',
    together: 'The same shoot can supply your ads, your website and your follow-up, planned together around one goal.',
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
    secondaryLabel: 'See how a campaign works',
    secondaryTarget: '#what-this-is',
    visual: homepageAssets.campaignsSubmerged,
    insetVisual: revisionAssets.bakery,
  },
  body: {
    kind: 'campaigns',
    flow: {
      eye: 'How a campaign works',
      heading: 'One offer, carried from the ad to the inquiry.',
      intro:
        'A campaign is more than the ads. Rushes plans the offer, makes the creative, builds or improves the page people land on and checks that inquiries reach your team. Each part is built for the one that follows it.',
      nodes: ['Offer', 'Ad', 'Landing page', 'Inquiry', 'Customer'],
      links: [
        { after: 0, title: 'Give people a reason to care.', body: 'Choose the service to promote, the customers it suits and the strongest reason to pick your business. That choice shapes every ad and page.' },
        { after: 1, title: 'Keep the promise after the click.', body: 'The landing page repeats the offer from the ad, answers the obvious questions and shows relevant work, so visitors don’t have to start over.' },
        { after: 2, title: 'Make getting in touch easy.', body: 'A short form, a call button or a booking calendar, tested so every inquiry reaches the right person on your team.' },
        { after: 3, title: 'Learn which inquiries become work.', body: 'Review inquiry quality with your team and compare it with appointments and sales where your records allow. That decides what to change next.' },
      ],
    },
    matrix: {
      eye: 'Scope',
      heading: 'Google Ads, Meta ads, creative, landing pages and reporting.',
      intro: 'Hire campaign management on its own, or add creative and a landing page. Your proposal lists each service, deliverable and fee before work starts, and ad spend stays separate from Rushes fees.',
      rows: [
        { label: 'Google Ads', title: 'Reach people searching', body: 'Campaign setup and management around the services, searches and locations relevant to your business.', note: 'You own the account and approve the budget.' },
        { label: 'Meta ads', title: 'Introduce your offer', body: 'Facebook and Instagram campaigns with creative that explains the offer and gives people a reason to respond.', note: 'Rushes manages the agreed campaigns.' },
        { label: 'Creative', title: 'Give the campaign its message', body: 'Ad copy and visual assets matched to the offer. Photography, video and additional versions are scoped in the proposal.', note: 'You approve the claims and creative.' },
        { label: 'Landing pages', title: 'Turn interest into an inquiry', body: 'A focused page that answers buyer questions, shows relevant work and makes contacting you easy.', note: 'Use a suitable existing page or commission a new one.' },
        { label: 'Reporting', title: 'See what the spend produces', body: 'Spend, responses and inquiry quality, checked against the appointments and sales your team records.', note: 'Your team confirms sales outcomes.' },
      ],
    },
  },
  connect: {
    alone: 'Hire campaign management on its own when your creative and website already do their job.',
    together: 'Plan the photography, ads, landing page and follow-up as one campaign, so each part is made for the others.',
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
      'Websites and landing pages that explain what you do, show the quality of your work and make it easy for the right visitors to get in touch. Hire a focused improvement or a complete site.',
    secondaryLabel: 'See two recent designs',
    secondaryTarget: '#website-example',
    visual: revisionAssets.daylitVenue,
    insetVisual: homepageAssets.brandMediaRiversideMill,
    designShowcase: true,
  },
  body: {
    kind: 'web',
    scope: {
      eye: 'Scope',
      heading: 'Choose the scope that fits the job.',
      intro: 'We look at what you already have before recommending a rebuild.',
      options: [
        { title: 'A landing page', body: 'One offer, one audience and one clear next step. Often the destination for an ad campaign or a launch.' },
        { title: 'A full website', body: 'Room for several services, your work and the company behind it, with a clear way to get in touch from every page.' },
        { title: 'Improvements to your site', body: 'Fix a confusing service page, an awkward mobile layout or a difficult contact form without replacing everything.' },
      ],
    },
    designs: {
      eye: 'Website design',
      heading: 'Two sites, designed around how their customers decide.',
      intro:
        'Each design starts with what that kind of customer needs to see, what they need to know and what they’re ready to do next. The layout, photography and forms follow from those answers.',
      items: [
        {
          id: 'stonevale',
          name: 'Stonevale',
          label: 'Outdoor living design & build',
          body: 'An evening-led site for a builder of patios, outdoor kitchens and fire features. The homepage opens on a dusk film because that is when the work is used, and every section leads toward a design consultation.',
          features: [
            'Short dusk film in the homepage header',
            'Drag-to-compare view of a finished backyard',
            'Services organized by project type',
            'Consultation form that asks about the project first',
          ],
        },
        {
          id: 'halewood',
          name: 'Halewood',
          label: 'Interior design & residential build',
          body: 'A quieter, editorial site for a studio that designs and builds rooms. Large photography carries each page, and the services follow the order a project actually happens in.',
          features: [
            'Editorial layout led by full-width photography',
            'Room comparison with a draggable divider',
            'Services in project order: plan, materials, build, styling',
            'Consultation form that starts with which rooms are involved',
          ],
        },
      ],
    },
    capabilities: {
      eye: 'What the work covers',
      heading: 'Design, build and the details that make a site work.',
      groups: [
        { title: 'Design and development', body: 'Custom design and development for full websites and campaign landing pages, laid out for phones, tablets and large screens.' },
        { title: 'Content and navigation', body: 'Service pages written around the work you want to win, navigation that matches how customers look for it, and approved photos, projects and reviews placed where they help people decide.' },
        { title: 'Speed and search foundations', body: 'Fast-loading pages, correctly sized images, clear page titles and descriptions, a sitemap and structured data, so search engines can read the site. The site you’re reading is built this way.' },
        { title: 'Forms, booking and integrations', body: 'Contact forms, booking calendars and call buttons connected to your CRM or inbox, plus analytics and ad tracking when the project needs them. Each one is tested before launch.' },
        { title: 'Launch and support', body: 'Important existing URLs keep working after launch, and you receive the access you need. Updates and ongoing support are agreed separately if you want them.' },
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
  },
  connect: {
    alone: 'A website or landing page can be a standalone project, alongside the marketing you already run.',
    together: 'Build the site together with the photography, ads and follow-up that bring people to it.',
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
      'Rushes connects the tools you already use, cuts repeated data entry, organizes incoming requests and prepares the information your team needs, so everyone knows what happens next.',
    secondaryLabel: 'See what the work covers',
    secondaryTarget: '#what-this-is',
    visual: revisionAssets.restaurant,
    insetVisual: industryVisuals.interiorDesign,
  },
  body: {
    kind: 'systems',
    work: {
      eye: 'What the work covers',
      heading: 'Less retyping. Fewer lost requests. Clear owners.',
      intro:
        'We start by mapping how requests and information move through the business today, remove the steps that don’t need to exist, then connect and automate the rest. Most projects begin with the tools you already pay for.',
      items: [
        { title: 'Connect the tools you already use', body: 'Website forms, calendars, your CRM and email pass information to each other instead of relying on copy and paste.' },
        { title: 'Enter information once', body: 'A new inquiry creates the contact, the opportunity and the follow-up task in one step, with the service and source already filled in.' },
        { title: 'Organize incoming requests', body: 'Calls, forms and messages land in one list, sorted by service, location or urgency, so the right person picks each one up.' },
        { title: 'Prepare useful information', body: 'AI drafts first replies, summarizes long messages and pulls together a weekly view of open requests. Your team reviews and sends; pricing, approvals and customer conversations stay with them.' },
        { title: 'Make responsibilities clear', body: 'Every open request shows who owns it and when the next step is due, with reminders before anything slips.' },
      ],
      visual: capabilityAssets.routingTable,
      inset: capabilityAssets.phoneCounterNight,
    },
    example: {
      eye: 'An example',
      heading: 'An estimate request on a Saturday night.',
      intro: 'A homeowner fills in the website form after hours. This is what a connected system does with it.',
      label: 'One request, start to finish',
      moments: [
        { time: 'Saturday · 7:42 pm', stage: 'Capture', heading: 'The request lands in one place.', body: 'The form creates the contact in the CRM with the service, neighborhood and source attached. Nobody retypes it.' },
        { time: 'Saturday · 7:43 pm', stage: 'Reply', heading: 'A useful first reply goes out.', body: 'A text confirms the request and offers two appointment windows, so the homeowner isn’t left waiting until Monday.' },
        { time: 'Monday · 8:05 am', stage: 'Assign', heading: 'The right person has it, with context.', body: 'The replacement inquiry goes to the owner with the details and the first reply attached. Routine service requests stay with dispatch.' },
        { time: 'Day three', stage: 'Follow up', heading: 'Nothing is forgotten.', body: 'If the estimate still isn’t scheduled, a reminder appears on the owner’s list instead of the request disappearing into an inbox.' },
      ],
    },
  },
  connect: {
    alone: 'A systems project can stand on its own, starting with the tools and requests you already have.',
    together: 'Connect the systems to the photography, ads and website that bring new inquiries in.',
  },
  faq: {
    eyebrow: FAQ_EYEBROW,
    heading: 'AI and systems questions',
    items: [
      {
        question: 'What does AI consulting include?',
        answer:
          'We look at where your team’s time goes each week, recommend where AI or automation would actually help, and build it when the case is clear: drafting replies, sorting requests or summarizing information for someone to review.',
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
      {
        question: 'Which software do you build with?',
        answer:
          'We use the tools you already have wherever they can do the job. For CRM, forms, booking and text messaging we often build in GoHighLevel, and we connect other software through its built-in integrations or API when a project needs it.',
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
        'Each stage is a service you can hire on its own. Connected, each one is planned for the next: the photos are made for the ads, the ads lead to a page built for them, and every inquiry gets a prompt answer.',
      stages: loopStages,
    },
    chapters: [
      { ...loopStages[0], body: 'Photography and video show the work, the standard and the experience before the first conversation. This is where someone decides your business is worth a closer look.', asset: homepageAssets.brandMediaRiversideMill },
      { ...loopStages[1], body: 'Meta and Google campaigns put the strongest photos and message in front of the people most likely to want the service, and send them to a page that continues the same offer.', asset: homepageAssets.campaignsSubmerged },
      { ...loopStages[2], body: 'The page says who the service is for, explains the offer, shows enough work to judge fit and makes calling, booking or requesting an estimate straightforward.', asset: revisionAssets.daylitVenue },
      { ...loopStages[3], body: 'Every request lands in one place, reaches the right person with the details attached and gets a useful first reply while the customer is still interested.', asset: capabilityAssets.phoneCounterNight },
      { ...loopStages[4], body: 'Open inquiries and estimates stay on a list with an owner and a next date, so the interest the other stages created doesn’t sit unanswered.', asset: capabilityAssets.routingTable },
    ],
    thread: {
      eye: 'An example',
      heading: 'One finished project, from the first photo to a consultation.',
      intro:
        'The same offer runs through the photos, the ad, the page and the first reply, so the customer never has to start over. Here is how one outdoor living project could move through all five stages.',
      moments: [
        { stage: 'Attention', line: 'A finished patio is photographed so the stonework, the lighting and the setting are clear.' },
        { stage: 'Reach', line: 'The strongest photo becomes the ad, shown to homeowners nearby who are likely to want a similar project.' },
        { stage: loopStages[2].stage, line: 'The ad leads to a page about that kind of project, with more photos and a short estimate request.' },
        { stage: loopStages[3].stage, line: 'The homeowner gets a prompt reply and a choice of consultation times.' },
        { stage: loopStages[4].stage, line: 'After the consultation, the team follows up on the estimate and answers questions until the homeowner decides.' },
      ],
    },
    entry: {
      eye: 'Where to start',
      heading: 'Start where the biggest gap is.',
      intro:
        'Some businesses need better photos and video first. Some need a better website. Some need faster replies. We start with the gap that costs the most and add the next piece when it clearly helps.',
      options: [
        { title: 'Photos and video first', body: 'The work looks better in person than it does online.', href: '/brand-media/', label: 'See Brand Media' },
        { title: 'Website first', body: 'People visit the site, but too few of them get in touch.', href: '/web/', label: 'See Web & Landing' },
        { title: 'Replies first', body: 'Inquiries arrive, then wait too long for an answer or an owner.', href: '/follow-up/', label: 'See AI & Business Systems' },
      ],
    },
    boundary: {
      eye: 'You don’t need all of it',
      heading: 'Every service works on its own.',
      body: 'Connect them when two or more parts need to work together. On the Growth Call we’ll recommend where to start.',
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
          'Start with the service that would make the biggest difference now. Add the next one when it clearly helps.',
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
    heading: 'Talk through where to start.',
    body: 'We’ll look at what already works, where attention or replies are stalling, and whether one service or several connected ones is the right next step.',
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
  { href: '/brand-media/', label: 'Brand Media' },
  { href: '/campaigns/', label: 'Creative Campaigns' },
  { href: '/web/', label: 'Web & Landing' },
  { href: '/follow-up/', label: 'AI & Business Systems' },
  { href: '/#examples', label: 'Industries' },
] as const;
