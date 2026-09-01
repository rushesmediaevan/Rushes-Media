import type { PageSeo } from './site';
import { siteContract } from './site';

export type BuyingModelId =
  | 'project-led-design-build'
  | 'urgent-service-replacement'
  | 'consultation-appointment';
export type IndustryLifecycle = 'core-market';
export type IndustryVariant = 'design-build' | 'service-response' | 'consultation';
export type VisualTruthClass = 'labeled-concept' | 'owned-editorial' | 'client-proof';
export type VisualPublicationStatus = 'held' | 'approved';

export interface BuyingModel {
  id: BuyingModelId;
  name: string;
  positioning: string;
  childRoutes: readonly string[];
  commercialLogic: readonly string[];
}

export interface VisualSourceSet {
  type: 'image/avif' | 'image/webp';
  srcset: string;
  media?: string;
}

export interface VisualFallback {
  src: string;
  srcset?: string;
  width: number;
  height: number;
  type: 'image/jpeg' | 'image/png' | 'image/webp';
}

export interface VisualInputProvenance {
  assetPack: string;
  masterPath: string;
  masterSha256: string;
  desktopCropPath: string;
  desktopCropSha256: string;
  mobileCropPath: string;
  mobileCropSha256: string;
}

export interface VisualAsset {
  id: string;
  truthClass: VisualTruthClass;
  publicationStatus: VisualPublicationStatus;
  sourceMaster: string;
  sourceWidth: number;
  sourceHeight: number;
  sha256: string;
  sources: readonly VisualSourceSet[];
  fallback: VisualFallback;
  sizes: string;
  alt: string;
  caption: string;
  focalPoint: string;
  aspectRatio: string;
  mobileFocalPoint?: string;
  mobileAspectRatio?: string;
  inputProvenance?: VisualInputProvenance;
  socialImage?: string;
}

export interface IndustryPain { title: string; body: string; }
export interface IndustrySystemStep { name: string; body: string; }
export interface IndustryUseCase { name: string; body: string; }
export interface IndustryFaq { question: string; answer: string; }
export interface IndustryBookingClose { heading: string; body: string; bullets: readonly string[]; }

export interface IndustryProofModule {
  label: string;
  heading: string;
  body: string;
  status: 'workflow' | 'concept';
  asset?: VisualAsset;
}

export interface IndustryPage {
  family: 'industry';
  buyingModelId: BuyingModelId;
  lifecycle: IndustryLifecycle;
  variant: IndustryVariant;
  slug: string;
  route: string;
  eyebrow: string;
  heading: string;
  emphasis: string;
  lede: string;
  support: string;
  primaryCta: string;
  secondaryCta: string;
  secondaryTarget: string;
  journeyLabel: string;
  heroPath: readonly string[];
  heroAsset: VisualAsset;
  painIntro: string;
  painHeading: string;
  pains: readonly IndustryPain[];
  systemHeading: string;
  systemIntro: string;
  systemSteps: readonly IndustrySystemStep[];
  useCaseHeading: string;
  useCases: readonly IndustryUseCase[];
  proof: IndustryProofModule;
  fitHeading: string;
  faqHeading: string;
  goodFit: readonly string[];
  poorFit: readonly string[];
  faqs: readonly IndustryFaq[];
  regionHeading: string;
  region: string;
  bookingClose: IndustryBookingClose;
  contextualLinks: readonly { href: string; label: string }[];
  relatedRoute: { href: string; eyebrow: string; heading: string; body: string };
}

export interface IndustriesHub {
  family: 'industry-hub';
  eyebrow: string;
  heading: string;
  emphasis: string;
  lede: string;
  primaryCta: string;
  secondaryCta: string;
  sharedPath: readonly IndustrySystemStep[];
  adjacentFits: readonly string[];
  goodFit: readonly string[];
  poorFit: readonly string[];
  faqs: readonly IndustryFaq[];
  regionHeading: string;
  region: string;
  bookingClose: IndustryBookingClose;
}

function responsiveAsset(input: {
  id: string;
  slug: string;
  sourceMaster: string;
  sourceWidth: number;
  sourceHeight: number;
  sha256: string;
  widths?: readonly number[];
  fallbackWidth?: number;
  renderedHeight: number;
  alt: string;
  caption: string;
  focalPoint: string;
  aspectRatio: string;
  social?: boolean;
}): VisualAsset {
  const assetWidths = input.widths ?? [640, 960, 1440, 1920];
  const fallbackWidth = input.fallbackWidth ?? assetWidths.at(-1) ?? 1920;
  const srcset = (extension: 'avif' | 'webp' | 'jpg') =>
    assetWidths.map((width) => `/assets/images/industries/${input.slug}-${width}.${extension} ${width}w`).join(', ');
  return {
    id: input.id,
    truthClass: 'labeled-concept',
    publicationStatus: 'approved',
    sourceMaster: input.sourceMaster,
    sourceWidth: input.sourceWidth,
    sourceHeight: input.sourceHeight,
    sha256: input.sha256,
    sources: [
      { type: 'image/avif', srcset: srcset('avif') },
      { type: 'image/webp', srcset: srcset('webp') },
    ],
    fallback: {
      src: `/assets/images/industries/${input.slug}-${fallbackWidth}.jpg`,
      srcset: srcset('jpg'),
      width: fallbackWidth,
      height: input.renderedHeight,
      type: 'image/jpeg',
    },
    sizes: '(max-width: 960px) calc(100vw - 40px), (max-width: 1440px) 42vw, 610px',
    alt: input.alt,
    caption: input.caption,
    focalPoint: input.focalPoint,
    aspectRatio: input.aspectRatio,
    socialImage: input.social
      ? `/assets/images/industries/${input.slug}-social-1200x630.jpg`
      : undefined,
  };
}

export const industryVisuals = {
  outdoorLiving: responsiveAsset({
    id: 'outdoor-living-primary-2026-08-28',
    slug: 'outdoor-living-hero',
    sourceMaster: 'clients/rushes-media/assets/industry-pages/hardscape/masters/nano-banana-pro-4x5-4k-master.png',
    sourceWidth: 3712,
    sourceHeight: 4608,
    sha256: 'bb41361e45b37c1bcd9aaaa7a283e2401213823a96e2a93ff767dd0be20ea00f',
    renderedHeight: 2400,
    alt: 'Stone patio, seat wall and integrated outdoor kitchen behind an East Coast home at blue hour.',
    caption: 'Original Rushes outdoor-living concept visualization · synthetic property · not a completed client project or performance result',
    focalPoint: 'center 62%',
    aspectRatio: '4 / 5',
    social: true,
  }),
  outdoorLivingPool: responsiveAsset({
    id: 'outdoor-living-pool-specialty-2026-08-28',
    slug: 'outdoor-living-pool',
    sourceMaster: 'clients/rushes-media/assets/industry-pages/pools/masters/nano-banana-pro-4x5-4k-master.png',
    sourceWidth: 3712,
    sourceHeight: 4608,
    sha256: '25542e6def60791807033800a6569e03eccfcd9a3c2644c2454888dcaaead5db',
    renderedHeight: 2400,
    alt: 'Rectangular custom pool with stone coping and an integrated patio behind an East Coast home at dusk.',
    caption: 'Original Rushes pool-build concept visualization · synthetic property · not a completed client project or performance result',
    focalPoint: 'center 58%',
    aspectRatio: '4 / 5',
  }),
  interiorDesign: responsiveAsset({
    id: 'interior-design-primary-2026-08-28',
    slug: 'interior-design-hero',
    sourceMaster: 'clients/rushes-media/assets/industry-pages/interior-design/masters/recraft-v41-living-master.png',
    sourceWidth: 2688,
    sourceHeight: 1536,
    sha256: '896478829b39e8fc40c4a6e51457eafe66da888d8455c708e1b4ed550e0fa9be',
    renderedHeight: 1080,
    alt: 'Warm editorial living room with custom walnut shelving, tailored furnishings and morning light.',
    caption: 'Original Rushes residential design-build concept visualization · fictional studio and generated environment · not client work, a completed project or a performance result',
    focalPoint: 'center 52%',
    aspectRatio: '16 / 9',
    social: true,
  }),
  interiorDetail: responsiveAsset({
    id: 'interior-design-detail-2026-08-28',
    slug: 'interior-design-detail',
    sourceMaster: 'clients/rushes-media/assets/industry-pages/interior-design/masters/recraft-v41-kitchen-master.png',
    sourceWidth: 1792,
    sourceHeight: 2304,
    sha256: 'e48802ff98ff49a3ef7a3fc20536770859c1b31c5f7171428a4fbc66948586c3',
    widths: [640, 960, 1440],
    fallbackWidth: 1440,
    renderedHeight: 1800,
    alt: 'Detailed residential kitchen concept with warm timber cabinetry and natural window light.',
    caption: 'Original Rushes residential design-build concept visualization · fictional studio and generated environment · not client work',
    focalPoint: 'center',
    aspectRatio: '4 / 5',
  }),
  hvac: responsiveAsset({
    id: 'hvac-primary-2026-08-28',
    slug: 'hvac-hero',
    sourceMaster: 'clients/rushes-media/assets/industry-pages/hvac/masters/nano-banana-pro-4x5-4k-master.png',
    sourceWidth: 3712,
    sourceHeight: 4608,
    sha256: '59dbb278039907a4c37628a5ba059b3810a6d047688ef9fb702afb30e1d8eef8',
    renderedHeight: 2400,
    alt: 'Residential interior divided between warm and cool rooms with a thermostat and floor register visible.',
    caption: 'Original Rushes home-comfort campaign concept · synthetic residence · not a client installation, diagnosis, endorsement or performance result',
    focalPoint: 'center 55%',
    aspectRatio: '4 / 5',
    social: true,
  }),
  medSpa: responsiveAsset({
    id: 'med-spa-primary-2026-08-28',
    slug: 'med-spa-hero',
    sourceMaster: 'clients/rushes-media/assets/industry-pages/med-spa/masters/flux2pro-treatment-room-master.jpg',
    sourceWidth: 1072,
    sourceHeight: 1344,
    sha256: 'e5a913dc181b8f1a2f159bdf42718be8fce5fcf0ca7798bd53d9403b05dfbf67',
    widths: [640, 960],
    fallbackWidth: 960,
    renderedHeight: 1200,
    alt: 'Quiet aesthetic treatment room with a prepared bed, rolling stool, folded towels and a plant in warm evening light.',
    caption: 'Original Rushes aesthetic-practice concept visualization · person-free synthetic environment · no patient, provider, procedure, testimonial, treatment outcome or performance result is depicted',
    focalPoint: 'center 54%',
    aspectRatio: '4 / 5',
    social: true,
  }),
} as const;

export const buyingModels: readonly BuyingModel[] = [
  {
    id: 'project-led-design-build',
    name: 'Project-led Design & Build',
    positioning: 'Show the transformation. Qualify the scope. Protect a considered decision.',
    childRoutes: ['/outdoor-living/', '/interior-design/'],
    commercialLogic: [
      'Finished work and judgment create desire before an inquiry.',
      'Property, scope, territory, timing and capacity determine fit.',
      'The conversion is a qualified consultation, site walk or discovery call.',
    ],
  },
  {
    id: 'urgent-service-replacement',
    name: 'Urgent Service & Replacement',
    positioning: 'Catch the inquiry. Separate the intent. Route the right opportunity.',
    childRoutes: ['/hvac/'],
    commercialLogic: [
      'Urgent service and considered replacement can enter through the same door.',
      'Response and ownership must work while the office and field team are occupied.',
      'The conversion is a qualified replacement estimate on the correct calendar.',
    ],
  },
  {
    id: 'consultation-appointment',
    name: 'Consultation & Appointment',
    positioning: 'Choose the priority. Approve the claims. Connect interest to a held consult.',
    childRoutes: ['/med-spa/'],
    commercialLogic: [
      'A provider, service or location needs a defined capacity objective.',
      'Creative, consent and factual claims require practice-side ownership.',
      'The conversion is a qualified, held consultation—not an iframe load or DM.',
    ],
  },
] as const;

export const industriesHub: IndustriesHub = {
  family: 'industry-hub',
  eyebrow: 'Best-fit markets',
  heading: 'Different businesses are bought',
  emphasis: 'through different decisions.',
  lede: 'The business priority is specific; so is the decision path. Project-led design, urgent replacement, and consultation-led aesthetics require different proof, digital experiences, qualification, and follow-up—and not every engagement needs every capability.',
  primaryCta: 'Book a Growth Call',
  secondaryCta: 'Choose your market',
  sharedPath: [
    { name: 'Choose the work', body: 'Define the service, project, buyer, territory and capacity worth building around.' },
    { name: 'Show why it matters', body: 'Create buyer-aware media from real work, process, constraints and judgment.' },
    { name: 'Create qualified demand', body: 'Connect campaign and page to one commercial objective rather than a generic service menu.' },
    { name: 'Catch and route', body: 'Preserve source and context, acknowledge the inquiry and send it to the right owner.' },
    { name: 'Book and confirm', body: 'Move the right consultation or estimate onto the calendar with a clear next step.' },
    { name: 'Learn from outcomes', body: 'Use qualified and held appointments plus client-reported outcomes to improve the next cycle.' },
  ],
  adjacentFits: [
    'Roofing and exterior replacement',
    'Plumbing and electrical projects',
    'Specialty residential contractors',
    'Other owner-led, high-value local services',
  ],
  goodFit: [
    'A named decision-maker can approve the work.',
    'Customer, project, or client value and capacity can support deliberate investment.',
    'The desired work, service territory and primary conversion are defined.',
    'The team can report qualified, held appointments and business outcomes.',
  ],
  poorFit: [
    'The goal is cheap, anonymous or shared lead volume.',
    'The business cannot respond to or fulfill new opportunities.',
    'No one will approve claims or share what happened after the inquiry.',
    'The expectation is guaranteed closed jobs, treatments or revenue.',
  ],
  faqs: [
    { question: 'Why these industries?', answer: 'They reward the combination Rushes is built around: strong visual communication, focused demand, a clear buying path and disciplined follow-up. Each has meaningful economics and a conversion event the owner can actually measure.' },
    { question: 'Where do pools fit?', answer: 'Custom pool construction and substantial remodels sit inside Outdoor Living. They share the visual, property-led project journey while retaining their own qualification questions. Weekly service and maintenance do not.' },
    { question: 'Do you work with roofing, plumbing, electrical or other services?', answer: 'Potentially. HVAC is the current service-and-replacement anchor. Adjacent trades are evaluated by buyer journey, economics, capacity, response ownership and the outcome the business can measure.' },
    { question: 'Can I hire only one piece?', answer: 'Yes. Rushes maps the surrounding context, then scopes the smallest capable engagement—media, campaign, web, measurement, or follow-up—that materially supports the priority. Connected work is recommended only when the handoffs genuinely need it.' },
    { question: 'What happens on the Growth Call?', answer: 'In about 30 minutes, we inspect the work you want, how demand reaches you, what happens before an estimate or consult is booked, and whether the economics and capacity fit.' },
  ],
  regionHeading: 'Regional reach starts with operating fit.',
  region: 'Rushes is based in Haddon Heights and focuses first on South Jersey, Philadelphia, the Main Line, Bucks County and the surrounding tri-state market. Delivery is remote by default; on-site production is scoped where the work requires it.',
  bookingClose: {
    heading: 'Choose the right buying path before investing in tactics.',
    body: 'In 30 minutes, we’ll identify how customers decide, what already works, and which part of the experience offers the clearest opportunity to strengthen.',
    bullets: ['The market and work worth pursuing', 'The buying decision the system must support', 'The first handoff worth improving'],
  },
};

export const industryPages: readonly IndustryPage[] = [
  {
    family: 'industry',
    buyingModelId: 'project-led-design-build',
    lifecycle: 'core-market',
    variant: 'design-build',
    slug: 'outdoor-living',
    route: '/outdoor-living/',
    eyebrow: 'Outdoor Living & Residential Design-Build',
    heading: 'Turn finished spaces',
    emphasis: 'into the next right project.',
    lede: 'For established hardscape, landscape design-build and custom pool companies with work worth showing, a defined service area and capacity for more of the projects they actually want.',
    support: 'Rushes starts with the desired project mix, then applies project media, demand, qualification, booking, or estimate follow-up where it materially strengthens the path from inspiration to the right on-site conversation.',
    primaryCta: 'Book a Growth Call',
    secondaryCta: 'See the outdoor-living system',
    secondaryTarget: '#system',
    journeyLabel: 'The outdoor-living project path',
    heroPath: ['Finished space', 'Project intent', 'Design or site consultation', 'Estimate decision'],
    heroAsset: industryVisuals.outdoorLiving,
    painIntro: 'The highest-value breaks usually sit between portfolio attention, project qualification and the right on-site consultation.',
    painHeading: 'Great work can still disappear between the portfolio and the project walk.',
    pains: [
      { title: 'The best work leaves the jobsite—and stops working.', body: 'A finished patio, landscape or pool may earn one post, then disappear instead of helping the next homeowner understand the transformation.' },
      { title: 'Different projects enter through one generic form.', body: 'A retaining wall, full-property design and pool remodel do not share the same scope, timing, economics or estimator.' },
      { title: 'The inquiry competes with production.', body: 'Calls and forms can arrive during site walks, crew questions and active builds, while ownership of the next response remains unclear.' },
      { title: 'Critical project context appears too late.', body: 'Service area, property, project type, timing and budget readiness can surface after the wrong calendar has already been used.' },
      { title: 'The estimate becomes the end of the conversation.', body: 'Considered projects may span months, while sporadic follow-up and shifting seasons make good opportunities easy to lose track of.' },
    ],
    systemHeading: 'One path from the finished space to the right on-site conversation.',
    systemIntro: 'Hardscape, landscape design-build and pool construction can share one brand while keeping their project economics and qualification distinct.',
    systemSteps: [
      { name: 'Choose the project lanes', body: 'Define the hardscape, landscape design-build, custom pool and remodel work worth promoting; keep different economics routed separately.' },
      { name: 'Capture the transformation', body: 'Show the finished space, materials, constraints, process and decisions that make the work credible.' },
      { name: 'Build project-specific demand', body: 'Put the desired project—not a generic service list—in front of homeowners inside the real territory.' },
      { name: 'Qualify property and intent', body: 'Collect project lane, location, property context, timing and approved budget-readiness questions.' },
      { name: 'Book the right next step', body: 'Route the inquiry to a design consultation, site walk or estimate calendar owned by the right person.' },
      { name: 'Keep the decision moving', body: 'Use consented, useful follow-up for open estimates, longer planning windows and upcoming seasons.' },
      { name: 'Learn from the handoffs', body: 'Connect source to qualified inquiry, held consultation and client-reported outcome; a click or form fill is not a sold project.' },
    ],
    useCaseHeading: 'One outdoor-living system. Distinct project lanes.',
    useCases: [
      { name: 'Patios, outdoor kitchens & structural hardscape', body: 'Sell the design and complete experience instead of reducing the work to a commodity square-foot quote.' },
      { name: 'Landscape design-build & full-property plans', body: 'Turn planting, lighting, drainage and built features into one coherent project story and consultation path.' },
      { name: 'Custom pool construction & substantial remodels', body: 'Separate build or remodel intent from cleaning, repair and weekly-service inquiries.' },
      { name: 'Shoulder-season and open-estimate growth', body: 'Match promotion and useful follow-up to actual design and production capacity instead of waiting for the calendar to soften.' },
    ],
    proof: {
      label: 'Rushes system concept · not client work or a result',
      heading: 'One finished space can do more than sit in the portfolio.',
      body: 'This demonstration shows how one project can become editorial media, project-specific creative, a qualification path and useful follow-up. The pool scene represents a related specialty inside Outdoor Living. It demonstrates strategy and production only—not client performance.',
      status: 'concept',
      asset: industryVisuals.outdoorLivingPool,
    },
    fitHeading: 'Capacity and project mix before volume.',
    faqHeading: 'Before building project demand.',
    goodFit: [
      'Owner-led hardscape, premium landscape design-build, outdoor-living, custom pool construction or substantial pool-remodel company.',
      'Completed work and design judgment are genuinely worth showing.',
      'Territory, desired project mix and production capacity are defined.',
      'The team can respond and report qualified, held consultations and outcomes.',
    ],
    poorFit: [
      'Mowing, basic maintenance, weekly pool service, cleaning or low-ticket repair is the core offer.',
      'The goal is anonymous shared-lead volume rather than a defined project mix.',
      'No estimator or decision-maker can own response, creative approval or reporting.',
      'Rushes is expected to price, close, build or guarantee the project.',
    ],
    faqs: [
      { question: 'Do hardscape, landscape design-build and pool projects need separate campaigns?', answer: 'They can share one brand and one outdoor-living page, but the inquiry path should separate project type when scope, timing, estimator ownership or economics differ.' },
      { question: 'What if we are already booked months out?', answer: 'Then the priority may be project mix, next-season planning or open-estimate continuity—not more volume now. Rushes should not create demand the company cannot fulfill.' },
      { question: 'Do we need professional project photography?', answer: 'Rushes starts with a rights and asset audit. Existing project media may be enough to begin; new capture is scoped when needed. Synthetic concepts are labeled and never presented as completed client work.' },
      { question: 'Will this replace referrals?', answer: 'No. It adds an owned, measurable path around the reputation already generating referrals, so the company can better control project type, territory and timing.' },
      { question: 'Can Rushes guarantee sold projects?', answer: 'No. Rushes can own the agreed path to qualified booked consultations or estimates. The contractor owns pricing, design, estimating, sales, fulfillment and collection.' },
    ],
    regionHeading: 'Project demand follows the real service radius.',
    region: 'Rushes is based in Haddon Heights and focuses first on owner-led outdoor-living companies across South Jersey, Philadelphia, the Main Line, Bucks County and the surrounding tri-state market. The actual service radius, project calendar and on-site consultation model shape every campaign.',
    bookingClose: {
      heading: 'Turn the next finished project into the next right consultation.',
      body: 'Bring a recent project, the work you want more of and the way inquiries reach you today. We’ll identify the proof, qualification and booking handoff worth building first.',
      bullets: ['The project lanes worth promoting', 'The qualification that protects the site walk', 'The first project story to put to work'],
    },
    contextualLinks: [
      { href: '/brand-media/', label: 'Turn completed projects into buyer-ready media' },
      { href: '/campaigns/', label: 'Put the right project in front of the right homeowner' },
      { href: '/follow-up/', label: 'Protect the consultation and estimate handoff' },
      { href: '/demand-loop/', label: 'See the complete Demand Loop' },
    ],
    relatedRoute: {
      href: '/interior-design/',
      eyebrow: 'Related considered-project model',
      heading: 'Interior Design & Residential Design-Build',
      body: 'Another visually led, high-consideration sale—with different scope, consultation and proposal questions.',
    },
  },
  {
    family: 'industry',
    buyingModelId: 'project-led-design-build',
    lifecycle: 'core-market',
    variant: 'design-build',
    slug: 'interior-design',
    route: '/interior-design/',
    eyebrow: 'Interior Design & Residential Design-Build',
    heading: 'Make the caliber of the work clear',
    emphasis: 'before the first consultation.',
    lede: 'For principal-led interior design studios, kitchen and bath firms, residential design-build companies and custom cabinetry teams pursuing substantial, portfolio-led projects.',
    support: 'Rushes starts with the firm’s project mix and point of view, then strengthens editorial storytelling, inquiry design, consultation booking, or follow-up where it best protects the brand and principal’s time.',
    primaryCta: 'Book a Growth Call',
    secondaryCta: 'See the interior-project system',
    secondaryTarget: '#system',
    journeyLabel: 'The residential design-project path',
    heroPath: ['Finished room', 'Project scope', 'Discovery consultation', 'Proposal decision'],
    heroAsset: industryVisuals.interiorDesign,
    painIntro: 'The highest-value breaks usually sit between portfolio interest, scope clarity and the principal’s calendar.',
    painHeading: 'Taste can win attention while the wrong project still reaches the calendar.',
    pains: [
      { title: 'The portfolio proves taste, not fit.', body: 'Beautiful rooms attract attention, but the visitor may still not understand the firm’s scope, process, territory or minimum level of engagement.' },
      { title: '“I have a project” can mean four different businesses.', body: 'Full-home design, a kitchen renovation, design-build construction and custom cabinetry need different questions and next steps.' },
      { title: 'Qualification happens on the principal’s calendar.', body: 'Rooms, property, timing, budget readiness and decision ownership can remain unknown until a valuable consultation slot is already taken.' },
      { title: 'The process feels invisible from the outside.', body: 'Procurement, construction responsibility, design phases and the homeowner’s role are often clearer to the firm than to the buyer.' },
      { title: 'A proposal can go quiet without a useful next touch.', body: 'A considered decision needs context and continuity, while referrals alone do not give the firm control over timing or project mix.' },
    ],
    systemHeading: 'Editorial proof, project qualification and consultation—designed as one experience.',
    systemIntro: 'The path should protect the firm’s point of view while making scope, responsibility and next steps easier for the right homeowner to understand.',
    systemSteps: [
      { name: 'Choose the desired project mix', body: 'Define the full-home, kitchen-and-bath, design-build and cabinetry work the firm wants more of.' },
      { name: 'Build editorial proof', body: 'Show the finished room, material decisions, constraints, process and point of view—not a disconnected gallery.' },
      { name: 'Set the engagement expectations', body: 'Explain territory, service model, project stages and any firm-approved scope thresholds before inquiry.' },
      { name: 'Create project-aware demand', body: 'Build campaigns and pages around the buyer’s desired space and the firm’s actual way of working.' },
      { name: 'Qualify before the calendar', body: 'Collect property, rooms, project type, timing, budget readiness and decision-team context approved by the firm.' },
      { name: 'Book and prepare the consultation', body: 'Route the right project to discovery or a site visit and make the homeowner’s next step explicit.' },
      { name: 'Support the considered decision', body: 'Use consented, useful follow-up, then measure qualified inquiry, held consultation and client-reported outcome.' },
    ],
    useCaseHeading: 'A stronger path for the residential work worth protecting.',
    useCases: [
      { name: 'Full-home & multi-room design', body: 'Show how one design point of view carries across rooms, phases and major decisions.' },
      { name: 'Kitchen & bath projects', body: 'Separate serious renovation intent from product-only or isolated-install requests.' },
      { name: 'Residential design-build', body: 'Explain who owns design, construction and the homeowner handoff before the first site meeting.' },
      { name: 'Custom cabinetry & architectural millwork', body: 'Turn material, detail and fabrication quality into a scope-aware inquiry rather than a generic cabinet quote.' },
    ],
    proof: {
      label: 'Rushes design concept · fictional studio · not client work',
      heading: 'Show the taste—and the path to working together.',
      body: 'This concept demonstrates how editorial project storytelling, qualification and consultation design can work together. It is not a real studio, delivered client project or evidence of performance.',
      status: 'concept',
      asset: industryVisuals.interiorDetail,
    },
    fitHeading: 'Protect the calendar before adding volume.',
    faqHeading: 'Before shaping the consultation path.',
    goodFit: [
      'Principal-led interior designer, kitchen-and-bath studio, residential design-build firm or custom cabinetry team.',
      'Distinctive rights-cleared work and a substantial project scope.',
      'Defined territory, capacity and consultation process.',
      'A decision-maker can approve creative and report held consultations and outcomes.',
    ],
    poorFit: [
      'Low-ticket handyman, repair or isolated commodity-install work is the core offer.',
      'The goal is mass quote requests with no project screening.',
      'The firm lacks portfolio rights, project capacity or direct principal involvement.',
      'Rushes is expected to fabricate a portfolio, imply unearned credentials or guarantee signed projects.',
    ],
    faqs: [
      { question: 'Will marketing make the brand feel generic?', answer: 'It should do the opposite. Rushes begins with the firm’s actual work, point of view and engagement model; the conversion path supports that identity instead of replacing it with a lead template.' },
      { question: 'Do design-only and design-build inquiries need different paths?', answer: 'Usually, yes. They may share one brand, but responsibility, scope, timeline and consultation questions differ. The routing should match the firm’s real service model.' },
      { question: 'What should the inquiry form ask?', answer: 'Only what helps the firm make a better next-step decision: property and location, rooms, project type, timing, budget readiness and who is involved. The principal approves the final qualification language.' },
      { question: 'Do we need a large professional portfolio first?', answer: 'Not necessarily. Rushes audits rights-cleared work before recommending capture. Any generated environment remains visibly labeled as a concept and is never represented as a completed client project.' },
      { question: 'Can Rushes guarantee signed design projects?', answer: 'No. Rushes can own the agreed path to qualified booked consultations. The firm owns scope, fees, proposal, sales, design, construction and collection.' },
    ],
    regionHeading: 'A regional brand can still feel deliberately selective.',
    region: 'Rushes is based in Haddon Heights and focuses first on principal-led firms across South Jersey, Philadelphia, the Main Line, Bucks County and the surrounding tri-state market. On-site project capture is scoped only when the work requires it; strategy, page, campaign and follow-up delivery can remain remote.',
    bookingClose: {
      heading: 'Protect the principal’s calendar without flattening the brand.',
      body: 'Bring the project mix, service model and current inquiry path. We’ll identify what the right homeowner needs to understand before a consultation belongs on the calendar.',
      bullets: ['The projects and engagement model to protect', 'The proof and scope cues the buyer needs', 'The qualification that earns a consultation'],
    },
    contextualLinks: [
      { href: '/brand-media/', label: 'Turn finished rooms into an editorial proof library' },
      { href: '/web/', label: 'Build a project-aware consultation page' },
      { href: '/follow-up/', label: 'Support the consultation and proposal handoff' },
      { href: '/demand-loop/', label: 'See the complete Demand Loop' },
    ],
    relatedRoute: {
      href: '/outdoor-living/',
      eyebrow: 'Related considered-project model',
      heading: 'Outdoor Living & Residential Design-Build',
      body: 'A similarly visual project sale shaped by property, territory, season and an on-site consultation.',
    },
  },
  {
    family: 'industry',
    buyingModelId: 'urgent-service-replacement',
    lifecycle: 'core-market',
    variant: 'service-response',
    slug: 'hvac',
    route: '/hvac/',
    eyebrow: 'HVAC Replacement & Home Comfort',
    heading: 'Make the next replacement opportunity',
    emphasis: 'easier to catch, route and book.',
    lede: 'For owner-led residential HVAC companies that want more of the right replacement estimates without disrupting service and dispatch.',
    support: 'Rushes starts with the shop’s real priority and coverage, then improves creative, intake, routing, booking, or estimate follow-up where it best supports replacement opportunity and team capacity.',
    primaryCta: 'Book a Growth Call',
    secondaryCta: 'See the HVAC system',
    secondaryTarget: '#system',
    journeyLabel: 'The replacement-opportunity path',
    heroPath: ['Comfort problem', 'Service or replacement route', 'Estimate calendar', 'Decision follow-up'],
    heroAsset: industryVisuals.hvac,
    painIntro: 'The highest-value breaks usually sit between the first call, replacement qualification and estimator ownership.',
    painHeading: 'A replacement opportunity can vanish before the right person sees it.',
    pains: [
      { title: 'Service and replacement intent enter through the same door.', body: 'A tune-up, no-cool call and replacement conversation should not become one indistinguishable queue.' },
      { title: 'The inquiry arrives while the team is occupied.', body: 'Calls and forms still need clear ownership after hours and when the office, dispatcher or field team is handling active work.' },
      { title: 'Replacement context appears too late.', body: 'System age, home-comfort problem, service history and approved financing interest can surface only after several touches.' },
      { title: 'Peak weather hides the shoulder season.', body: 'Demand and install capacity need a deliberate plan beyond the weeks when the phone is already ringing.' },
      { title: 'An unsold estimate loses its context.', body: 'Useful, consented follow-up can preserve the decision without pretending every open estimate will close.' },
    ],
    systemHeading: 'One response path that respects both service urgency and replacement value.',
    systemIntro: 'The system follows the shop’s real dispatch, sales and estimator ownership rather than forcing every homeowner into the same queue.',
    systemSteps: [
      { name: 'Choose the opportunity', body: 'Define the replacement, selected home-comfort or reactivation objective that fits territory and install capacity.' },
      { name: 'Make the comfort problem specific', body: 'Build creative around recognizable homeowner situations instead of interchangeable equipment advertising.' },
      { name: 'Capture source and context', body: 'Bring calls and forms in with campaign, service-area and opportunity information intact.' },
      { name: 'Separate the route', body: 'Send urgent service, routine service and replacement interest to the appropriate owner and next step.' },
      { name: 'Acknowledge and book', body: 'Use the company’s real response, estimator, calendar and confirmation workflow.' },
      { name: 'Protect the estimate', body: 'Use consented follow-up for open replacement opportunities without invented urgency, savings or rebates.' },
      { name: 'Report what happened', body: 'Connect source to qualified opportunity, held replacement estimate and client-reported outcome; never count a click as an installation.' },
    ],
    useCaseHeading: 'Built around replacement value—not just more phone volume.',
    useCases: [
      { name: 'Residential replacement & changeouts', body: 'Give a qualified replacement opportunity a clear path to the right estimator.' },
      { name: 'Service-versus-replacement intake', body: 'Preserve urgent service routing while identifying homeowners ready for a replacement conversation.' },
      { name: 'Shoulder-season install demand', body: 'Build around real crew and install capacity instead of waiting for extreme weather.' },
      { name: 'Unsold replacement-estimate follow-up', body: 'Keep useful context around an open decision with consented messages and approved offers.' },
    ],
    proof: {
      label: 'Rushes campaign concept · not a client result',
      heading: 'Make the comfort problem feel specific.',
      body: 'This Rushes concept translates an uneven-temperature problem into a coordinated visual system. It demonstrates creative strategy and production—not a real diagnosis, client campaign or measured result.',
      status: 'concept',
    },
    fitHeading: 'Install capacity before demand.',
    faqHeading: 'Before changing the intake and estimate path.',
    goodFit: [
      'Owner-led residential replacement and installation company.',
      'Defined territory, verified decision-maker and available install capacity.',
      'Service, sales and after-hours ownership can be mapped.',
      'Calls, forms, held estimates and outcomes can be measured.',
    ],
    poorFit: [
      'No replacement capacity or a commercial-RFP-only business.',
      'Cheap tune-up volume is the only objective.',
      'No one owns routing, estimate follow-up or outcome reporting.',
      'Rushes is expected to diagnose, price, sell, install or guarantee revenue.',
    ],
    faqs: [
      { question: 'Is this just about generating more calls?', answer: 'No. Discovery determines whether the real priority is replacement mix, after-hours response, routing, estimate follow-up or new demand matched to capacity.' },
      { question: 'Does this replace our dispatcher or office team?', answer: 'No. It gives calls and forms clearer context, acknowledgment and routing around the people already responsible for service and sales.' },
      { question: 'Can the system separate service from replacement opportunities?', answer: 'Yes, when the company’s intake rules, territory and team ownership are defined. Rushes follows the actual workflow instead of inventing a generic one.' },
      { question: 'Can we mention financing, rebates or energy savings?', answer: 'Only when the company offers them and approves the exact current language. Rushes does not invent availability, rates, eligibility, savings, diagnostics or utility claims.' },
      { question: 'Can Rushes guarantee installations?', answer: 'No. Rushes can own the qualified-opportunity and booking path defined in the agreement. The HVAC company owns diagnosis, pricing, sales, installation and collection.' },
    ],
    regionHeading: 'Coverage and estimator ownership define the route.',
    region: 'Rushes is based in Haddon Heights and focuses first on owner-led residential HVAC companies across South Jersey, Philadelphia, the Main Line, Bucks County and the surrounding tri-state market. Service radius, dispatch coverage, estimator ownership and install capacity determine the actual campaign.',
    bookingClose: {
      heading: 'Route more replacement intent to the right estimator.',
      body: 'Bring the service area, install capacity and current call or form path. We’ll identify where replacement opportunities lose context and which response handoff should change first.',
      bullets: ['The replacement work and territory worth pursuing', 'The service-versus-replacement route', 'The first response or estimate gap to fix'],
    },
    contextualLinks: [
      { href: '/campaigns/', label: 'Build demand around a specific comfort problem' },
      { href: '/web/', label: 'Give service and replacement interest a clear route' },
      { href: '/follow-up/', label: 'Protect the call, estimate and confirmation handoffs' },
      { href: '/demand-loop/', label: 'See the complete Demand Loop' },
    ],
    relatedRoute: {
      href: '/industries/',
      eyebrow: 'Compare the buying paths',
      heading: 'Why HVAC needs its own system',
      body: 'Replacement urgency, service routing and estimator ownership differ from a considered design-build project.',
    },
  },
  {
    family: 'industry',
    buyingModelId: 'consultation-appointment',
    lifecycle: 'core-market',
    variant: 'consultation',
    slug: 'med-spa',
    route: '/med-spa/',
    eyebrow: 'Med Spa & Aesthetic Practice Growth',
    heading: 'Give treatment interest',
    emphasis: 'a clear path to the right consult.',
    lede: 'For owner-led med spas and aesthetic practices ready to fill defined provider, treatment or location capacity with practice-approved claims.',
    support: 'Rushes starts with one practice-approved priority, then applies creative, qualification, consult booking, or consented follow-up only where it supports the right capacity and measurable outcome.',
    primaryCta: 'Book a Growth Call',
    secondaryCta: 'See the consult-growth system',
    secondaryTarget: '#system',
    journeyLabel: 'The aesthetic-consult path',
    heroPath: ['Approved priority', 'Qualified interest', 'Consult booking', 'Practice-reported outcome'],
    heroAsset: industryVisuals.medSpa,
    painIntro: 'The highest-value breaks usually sit between treatment interest, approved qualification and the correct consult calendar.',
    painHeading: 'Attention can reach the practice without reaching the right consult calendar.',
    pains: [
      { title: 'The promotion and the calendar are out of sync.', body: 'A treatment, provider, device or location can be promoted without a clear view of the capacity the practice is actually ready to fill.' },
      { title: 'Interest enters through disconnected doors.', body: 'Calls, forms, direct messages and scheduling tools can lose the service, source or owner needed for the next step.' },
      { title: 'The inquiry does not explain enough.', body: 'Requested service, preferred location or provider, timing and new-versus-existing-patient context may remain unclear until staff begins chasing details.' },
      { title: 'A booking is mistaken for the outcome.', body: 'The meaningful path continues through confirmation, held consult and the practice’s own reported business result.' },
      { title: 'Claims, consent and measurement lack one owner.', body: 'Creative approvals, database use and reporting need a documented practice-side decision-maker before work begins.' },
    ],
    systemHeading: 'One approved growth priority, connected to a measurable consult path.',
    systemIntro: 'The practice owns medical, legal and compliance approval. Rushes builds only the commercial path supported by those approved facts.',
    systemSteps: [
      { name: 'Choose one growth priority', body: 'Define the provider, location, device or approved treatment category the practice has capacity and reason to grow.' },
      { name: 'Set the approval boundary', body: 'The practice approves every factual treatment, pricing, eligibility, before-and-after and compliance statement.' },
      { name: 'Build treatment-aware demand', body: 'Connect approved positioning and creative to one clear consult objective rather than a generic services menu.' },
      { name: 'Qualify and route interest', body: 'Collect the minimum approved context needed to route the right service, provider, location and next step.' },
      { name: 'Book and confirm the consult', body: 'Use the practice’s real scheduler, staff ownership and reminder workflow; an iframe load is not a booked consult.' },
      { name: 'Follow up with consent', body: 'Support incomplete bookings, no-shows, open consult decisions or approved database segments only where a valid consent basis exists.' },
      { name: 'Measure the business path', body: 'Connect source to qualified inquiry, held consult and aggregate client-reported outcome without inventing treatment or revenue claims.' },
    ],
    useCaseHeading: 'Built around approved priorities and available provider capacity.',
    useCases: [
      { name: 'Provider, device or location launch', body: 'Build around a time-bound capacity trigger with direct owner and practice-side approval.' },
      { name: 'Consult-led treatment category', body: 'Give one approved service line a clearer education, qualification and booking path.' },
      { name: 'Incomplete booking and no-show follow-up', body: 'Use approved reminders and staff ownership to protect the consult handoff without counting a reminder as a result.' },
      { name: 'Consented reactivation or membership continuity', body: 'Use only approved segments, messages and offers with a documented consent basis.' },
    ],
    proof: {
      label: 'Rushes workflow concept · not client work or a result',
      heading: 'One approved priority. One measurable consult path.',
      body: 'This concept demonstrates how a practice-approved growth priority can connect creative, qualification, booking and consented follow-up. It is not a client campaign, medical claim, testimonial or proof of growth.',
      status: 'concept',
    },
    fitHeading: 'Approved capacity before promotion.',
    faqHeading: 'Before connecting promotion to the consult calendar.',
    goodFit: [
      'Owner-led med spa or aesthetic practice with a named economic buyer directly involved.',
      'A current provider, device, location or treatment-category priority with real capacity.',
      'The practice owns approval of treatment, pricing, before-and-after, medical and compliance language.',
      'Booking access, consent basis and aggregate business outcomes can be measured safely.',
    ],
    poorFit: [
      'A generic front-desk request or follower-growth brief with no economic owner.',
      'Unsupported clinical claims, unapproved before-and-after material or implied treatment guarantees.',
      'No provider capacity, booking access, consent basis or outcome reporting.',
      'Rushes is expected to provide medical or legal advice or guarantee revenue.',
    ],
    faqs: [
      { question: 'Does Rushes write medical or treatment claims?', answer: 'Rushes drafts marketing language from practice-approved facts, but the practice owns medical, legal and compliance approval. Rushes does not provide medical or legal advice.' },
      { question: 'Which services should we market?', answer: 'Start with one service, provider, device or location where the practice has capacity, approved positioning, workable economics and a measurable consult path—not a generic menu of everything offered.' },
      { question: 'Can this work with our existing booking and CRM tools?', answer: 'Often, yes. Rushes first maps the current scheduler, forms, staff ownership and data access, then scopes only the connections the approved objective needs.' },
      { question: 'Can we reactivate our database?', answer: 'Only with a documented consent basis, approved segmentation and practice-approved messages. The practice remains responsible for its privacy and compliance obligations.' },
      { question: 'Can Rushes guarantee treatments, memberships or revenue?', answer: 'No. Rushes can own the agreed path to qualified booked consults. The practice owns candidacy, care, pricing, consult conversion, treatment delivery and collection.' },
    ],
    regionHeading: 'Provider capacity matters more than radius alone.',
    region: 'Rushes is based in Haddon Heights and focuses first on owner-led practices across South Jersey, Philadelphia, the Main Line, Bucks County and the surrounding tri-state market. Direct decision access, approved claims, provider capacity, consent and measurable consult ownership remain the operating gate.',
    bookingClose: {
      heading: 'Fill the right consult capacity with approved, measurable demand.',
      body: 'Bring the provider, treatment or location priority the practice is ready to grow. We’ll inspect the approval, qualification, booking and follow-up path around that capacity.',
      bullets: ['The approved priority and available capacity', 'The qualification the practice actually needs', 'The consult handoff the team can own'],
    },
    contextualLinks: [
      { href: '/campaigns/', label: 'Build a campaign around one approved growth priority' },
      { href: '/web/', label: 'Create a clearer treatment-to-consult path' },
      { href: '/follow-up/', label: 'Protect booking, confirmation and consented follow-up' },
      { href: '/demand-loop/', label: 'See the complete Demand Loop' },
    ],
    relatedRoute: {
      href: '/industries/',
      eyebrow: 'Compare the buying paths',
      heading: 'Four industries. Different handoffs.',
      body: 'See how considered projects, replacement urgency and aesthetic consults change qualification and follow-up.',
    },
  },
];

export function industryPageSeo(page: IndustryPage): PageSeo {
  const contract = siteContract.find((entry) => entry.path === page.route);
  if (!contract?.title || !contract.description) {
    throw new Error(`Industry route is missing SEO contract data: ${page.route}`);
  }
  return {
    title: contract.title,
    description: contract.description,
    canonical: contract.canonical,
    robots: contract.robots,
    openGraph: contract.openGraph,
    twitter: contract.twitter,
    jsonLd: contract.jsonLd,
  };
}

export function industriesHubSeo(): PageSeo {
  const contract = siteContract.find((entry) => entry.path === '/industries/');
  if (!contract?.title || !contract.description) {
    throw new Error('Industries hub is missing SEO contract data.');
  }
  return {
    title: contract.title,
    description: contract.description,
    canonical: contract.canonical,
    robots: contract.robots,
    openGraph: contract.openGraph,
    twitter: contract.twitter,
    jsonLd: contract.jsonLd,
  };
}
