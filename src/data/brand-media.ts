import { industryVisuals, type VisualAsset } from './industry-pages';
import { revisionAssets } from './revision-assets';

export interface BrandMediaPoint {
  label: string;
  heading: string;
  body: string;
}

export interface BrandMediaVisualStory {
  label: string;
  heading: string;
  body: string;
  visual?: VisualAsset;
  treatment: 'feature' | 'wide' | 'portrait';
}

export interface BrandMediaUse {
  channel: string;
  examples: string;
}

export interface BrandMediaPage {
  family: 'brand-media';
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  breadcrumb: readonly string[];
  hero: {
    heading: string;
    support: string;
    audience: string;
    disclosure: string;
    secondaryLabel: string;
    secondaryTarget: string;
    visual: VisualAsset;
    insetVisual: VisualAsset;
  };
  distinction: {
    eyebrow: string;
    heading: string;
    body: string;
    items: readonly BrandMediaPoint[];
    connection: string;
  };
  visualStory: {
    eyebrow: string;
    heading: string;
    intro: string;
    items: readonly BrandMediaVisualStory[];
    disclosure: string;
  };
  delivery: {
    eyebrow: string;
    heading: string;
    intro: string;
    deliverables: readonly BrandMediaPoint[];
    usesHeading: string;
    uses: readonly BrandMediaUse[];
  };
  fit: {
    eyebrow: string;
    heading: string;
    intro: string;
    cues: readonly string[];
    visual: VisualAsset;
  };
  faq: {
    eyebrow: string;
    heading: string;
    items: readonly { question: string; answer: string }[];
  };
  booking: {
    eyebrow: string;
    heading: string;
    body: string;
    note: string;
  };
}

export const brandMediaPage: BrandMediaPage = {
  family: 'brand-media',
  slug: 'brand-media',
  title: 'Brand Media: Photo, Video & Creative | Rushes Media',
  description:
    'Photo, video, and campaign creative that makes a business easier to notice, understand, and choose.',
  eyebrow: 'Brand Media',
  breadcrumb: ['Home', 'Services', 'Brand Media'],
  hero: {
    heading: 'Make what sets you apart visible.',
    support:
      'Rushes plans and produces photo, video, and campaign creative that shows people what your business offers, why it matters, and what makes it worth choosing.',
    audience: 'For businesses with more value to show than their current media communicates.',
    disclosure:
      'Original Rushes concept visualizations—art-direction examples, not completed client work or results.',
    secondaryLabel: 'See why Brand Media matters',
    secondaryTarget: '#what-media-does',
    visual: industryVisuals.interiorDetail,
    insetVisual: industryVisuals.medSpa,
  },
  distinction: {
    eyebrow: 'Where it fits',
    heading: 'Brand Media makes the value visible. It can stand alone—or strengthen every channel around it.',
    body:
      'They carry the same offer, but they do different work in the buying decision.',
    items: [
      {
        label: 'Brand Media',
        heading: 'Give people a reason to stop and pay attention.',
        body:
          'Photo, video, and campaign creative make the offer, expertise, product, or experience easier to recognize and understand.',
      },
      {
        label: 'Web',
        heading: 'Give interested buyers a clear next step.',
        body:
          'The page explains the offer, answers the questions that hold up action, and makes calling, booking, or inquiring straightforward.',
      },
    ],
    connection:
      'Inside the Demand Loop, one clear idea carries from the first impression to the inquiry or booking.',
  },
  visualStory: {
    eyebrow: 'What strong media makes visible',
    heading: 'Show what makes the choice worth making.',
    intro:
      'Show the outcome people want, the expertise behind it, and the experience they can expect.',
    items: [
      {
        label: 'The outcome',
        heading: 'Make the benefit visible.',
        body: 'Show the product, transformation, service, or result people are actually buying.',
        visual: industryVisuals.outdoorLivingPool,
        treatment: 'feature',
      },
      {
        label: 'The expertise',
        heading: 'Make quality easier to recognize.',
        body:
          'Show the decisions, details, people, or process that separate the offer from a cheaper alternative.',
        treatment: 'wide',
      },
      {
        label: 'The experience',
        heading: 'Let people picture themselves in it.',
        body:
          'Use environment, movement, and human context to make the experience feel real before they buy.',
        visual: revisionAssets.restaurant,
        treatment: 'portrait',
      },
    ],
    disclosure:
      'Original Rushes concept visualizations created for art direction. They are not completed client work or results.',
  },
  delivery: {
    eyebrow: 'What you receive',
    heading: 'From creative direction to ready-to-use assets.',
    intro:
      'Rushes develops the idea, captures new material or works with approved source footage, and prepares versions for every channel in scope.',
    deliverables: [
      {
        label: 'Direction',
        heading: 'A concept built around the offer and audience.',
        body: 'Rushes defines what the media needs to communicate before production begins.',
      },
      {
        label: 'Production',
        heading: 'Photo and motion made for the idea.',
        body: 'Rushes directs, captures, and edits the people, products, spaces, or activity needed to tell the story.',
      },
      {
        label: 'Delivery',
        heading: 'Finished assets shaped for their use.',
        body: 'Approved reels, stills, ad creative, and web-ready versions arrive in the formats agreed for each channel.',
      },
    ],
    usesHeading: 'Where the work can go',
    uses: [
      {
        channel: 'Organic',
        examples: 'Reels, stills, short cuts',
      },
      {
        channel: 'Campaigns',
        examples: 'Paid social and campaign creative',
      },
      {
        channel: 'Web',
        examples: 'Hero, service, and landing-page assets',
      },
      {
        channel: 'Sales follow-up',
        examples: 'Project recaps and selected visuals',
      },
    ],
  },
  fit: {
    eyebrow: 'A strong starting point',
    heading: 'Start with what people need to see.',
    intro:
      'Brand Media works best when there is something specific to communicate and access to the people, products, places, process, or source material needed to show it truthfully.',
    cues: [
      'A product, service, experience, or point of view worth showing.',
      'A clear offer or business priority.',
      'Permission to capture or use the necessary people, places, and materials.',
    ],
    visual: revisionAssets.daylitVenue,
  },
  faq: {
    eyebrow: 'Before production',
    heading: 'What owners usually ask first.',
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
    body:
      'We’ll review what you sell, how it is being presented now, and the first photo, video, or campaign idea that could make its value clearer to the right audience.',
    note: 'Choose a time that works for you.',
  },
};
