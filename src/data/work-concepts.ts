export interface WorkConcept {
  slug: 'stonevale' | 'halewood';
  name: string;
  descriptor: string;
  theme: 'stonevale' | 'halewood';
  title: string;
  description: string;
  locationLine: string;
  heroTitle: string;
  heroEmphasis: string;
  heroBody: string;
  heroVideo: string;
  heroPoster: string;
  heroWidth: number;
  heroHeight: number;
  statement: string;
  comparison: {
    eyebrow: string;
    title: string;
    body: string;
    startingImage: string;
    startingAlt: string;
    finishedImage: string;
    finishedAlt: string;
  };
  servicesEyebrow: string;
  servicesTitle: string;
  services: readonly { title: string; body: string }[];
  gallery: readonly {
    src: string;
    alt: string;
    caption: string;
    width: number;
    height: number;
  }[];
  processTitle: string;
  process: readonly { number: string; title: string; body: string }[];
  formTitle: string;
  formBody: string;
  projectLabel: string;
  projectPlaceholder: string;
}

export const workConcepts: readonly WorkConcept[] = [
  {
    slug: 'stonevale',
    name: 'Stonevale',
    descriptor: 'Outdoor Living',
    theme: 'stonevale',
    title: 'Stonevale Outdoor Living — fictional website concept by Rushes Media',
    description:
      'A fictional Outdoor Living design-build website concept created by Rushes Media for local visual and interaction review.',
    locationLine: 'Outdoor-living design-build concept · South Jersey',
    heroTitle: 'Your backyard,',
    heroEmphasis: 'built for the long evenings.',
    heroBody:
      'A complete fictional website direction for an outdoor-living builder: project storytelling, qualification, design consultation, and a calmer path from finished work to inquiry.',
    heroVideo: '/assets/work/stonevale/hero-dusk-web.mp4',
    heroPoster: '/assets/work/stonevale/hero-poster.jpg',
    heroWidth: 2304,
    heroHeight: 1296,
    statement:
      'The concept makes material quality and project scale visible before the form. It is designed to help a serious homeowner understand the work, the process, and whether a design consultation is the right next step.',
    comparison: {
      eyebrow: 'Functional demonstration',
      title: 'One property. Two synthetic design states.',
      body: 'Drag the handle to review the comparison interaction. Both frames are generated concept imagery—not a Rushes client before-and-after.',
      startingImage: '/assets/work/stonevale/patio-before.jpg',
      startingAlt: 'Synthetic starting-state concept of a plain residential backyard.',
      finishedImage: '/assets/work/stonevale/patio-after.jpg',
      finishedAlt: 'Synthetic finished-state concept of a bluestone patio with seating wall and fire feature.',
    },
    servicesEyebrow: 'Concept service architecture',
    servicesTitle: 'A premium outdoor-living story without the generic gallery dump.',
    services: [
      {
        title: 'Patios & Terraces',
        body: 'Show material, drainage, edge detail, and how the space connects to the house—not just a wide finished photo.',
      },
      {
        title: 'Outdoor Kitchens',
        body: 'Frame cooking, hosting, utilities, shelter, and circulation as one coordinated design-build decision.',
      },
      {
        title: 'Fire & Gathering',
        body: 'Explain the room the feature creates, the season it extends, and the constraints that shape a credible plan.',
      },
      {
        title: 'Lighting & Planting',
        body: 'Use the softer layers to show how a finished environment works after sunset and across the season.',
      },
    ],
    gallery: [
      {
        src: '/assets/work/stonevale/outdoor-kitchen.jpg',
        alt: 'Synthetic architectural concept of a stone outdoor kitchen beneath a cedar pergola.',
        caption: 'Concept detail · stone and cedar',
        width: 1400,
        height: 1800,
      },
      {
        src: '/assets/work/stonevale/fire-bowl.jpg',
        alt: 'Synthetic architectural concept of a gas fire bowl on a bluestone patio at dusk.',
        caption: 'Concept detail · fire and blue hour',
        width: 1400,
        height: 1800,
      },
    ],
    processTitle: 'A clearer path from inspiration to a qualified design conversation.',
    process: [
      {
        number: '01',
        title: 'Project fit',
        body: 'State service area, project lanes, timing, and economic fit before a homeowner requests a meeting.',
      },
      {
        number: '02',
        title: 'Design consultation',
        body: 'Collect the property, intended use, priorities, and readiness needed for a useful first conversation.',
      },
      {
        number: '03',
        title: 'Plan and proposal',
        body: 'Show what the fictional client would receive without inventing schedules, warranties, prices, or completed results.',
      },
      {
        number: '04',
        title: 'Project story',
        body: 'Turn approved finished work into the next buyer’s education, with real provenance and permission when used publicly.',
      },
    ],
    formTitle: 'Review the consultation moment.',
    formBody:
      'This local form demonstrates hierarchy, focus behavior, validation, and completion feedback. It cannot send, call, book, track, or contact anyone.',
    projectLabel: 'What would the project be?',
    projectPlaceholder: 'Patio, outdoor kitchen, complete outdoor space…',
  },
  {
    slug: 'halewood',
    name: 'Halewood',
    descriptor: 'Interiors · Design + Build',
    theme: 'halewood',
    title: 'Halewood Interiors — fictional website concept by Rushes Media',
    description:
      'A fictional Interior Design and Residential Build website concept created by Rushes Media for local visual and interaction review.',
    locationLine: 'Interior design and residential-build concept · Philadelphia Main Line',
    heroTitle: 'Rooms that',
    heroEmphasis: 'hold their light.',
    heroBody:
      'A complete fictional website direction for a residential studio: editorial restraint, process clarity, project qualification, and a considered consultation path.',
    heroVideo: '/assets/work/halewood/hero-living-web.mp4',
    heroPoster: '/assets/work/halewood/hero-poster.jpg',
    heroWidth: 2560,
    heroHeight: 1440,
    statement:
      'The concept treats judgment as the product. It gives the images room to breathe while explaining scope, collaboration, and the decisions a serious homeowner needs before a consultation.',
    comparison: {
      eyebrow: 'Functional demonstration',
      title: 'One room. Two synthetic design states.',
      body: 'Drag the handle to review the comparison interaction. Both frames are generated concept imagery—not a Rushes client renovation or result.',
      startingImage: '/assets/work/halewood/living-before.jpg',
      startingAlt: 'Synthetic starting-state concept of a living room during renovation.',
      finishedImage: '/assets/work/halewood/living-after.jpg',
      finishedAlt: 'Synthetic finished-state concept of a living room with walnut millwork and limestone fireplace.',
    },
    servicesEyebrow: 'Concept service architecture',
    servicesTitle: 'Design and residential build explained as one considered journey.',
    services: [
      {
        title: 'Interior Architecture',
        body: 'Show plan, proportion, circulation, and the structural decisions beneath a finished composition.',
      },
      {
        title: 'Material Direction',
        body: 'Make the palette, millwork, stone, metal, and lighting choices legible without reducing the work to a mood board.',
      },
      {
        title: 'Residential Build',
        body: 'Clarify how design intent moves through estimating, coordination, fabrication, and installation.',
      },
      {
        title: 'Final Layer',
        body: 'Use styling and documentation as the completion of the design story—not as unsupported proof of a real project.',
      },
    ],
    gallery: [
      {
        src: '/assets/work/halewood/kitchen.jpg',
        alt: 'Synthetic interior concept of an oak kitchen with a stone island and brass fittings.',
        caption: 'Concept detail · oak and stone',
        width: 1400,
        height: 1800,
      },
      {
        src: '/assets/work/halewood/sconce-detail.jpg',
        alt: 'Synthetic interior detail of a brass sconce against a softly textured plaster wall.',
        caption: 'Concept detail · plaster and brass',
        width: 1400,
        height: 1800,
      },
    ],
    processTitle: 'A calmer path from inspiration to a qualified residential consultation.',
    process: [
      {
        number: '01',
        title: 'Project fit',
        body: 'State project type, geographic fit, decision-makers, timeline, and readiness before the meeting request.',
      },
      {
        number: '02',
        title: 'Design consultation',
        body: 'Collect the rooms, pain points, architectural context, and desired level of design-build involvement.',
      },
      {
        number: '03',
        title: 'Scope and direction',
        body: 'Show how a fictional studio could define concept, documentation, procurement, and build ownership without fake promises.',
      },
      {
        number: '04',
        title: 'Editorial proof',
        body: 'Publish only real, approved project stories with truthful credits, permissions, and no invented homeowner result.',
      },
    ],
    formTitle: 'Review the consultation moment.',
    formBody:
      'This local form demonstrates hierarchy, focus behavior, validation, and completion feedback. It cannot send, call, book, track, or contact anyone.',
    projectLabel: 'Which rooms would be involved?',
    projectPlaceholder: 'Kitchen, living room, full first floor…',
  },
] as const;

export const workConceptBySlug = new Map(workConcepts.map((concept) => [concept.slug, concept]));
