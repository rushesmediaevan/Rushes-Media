import type { BrandMediaPage } from './brand-media';
import { brandMediaPage } from './brand-media';
import type { PageSeo } from './site';
import { SITE } from './site';

export interface HeadingSegment { kind: 'text' | 'emphasis'; text: string; }
export interface CommercialPoint { title: string; body: string; }
export interface CommercialStep { name: string; body: string; }
export interface CommercialFaq { question: string; answer: string; }
export interface ServiceSignatureItem { label: string; title: string; body: string; note?: string; }
export interface CommercialOutcome { heading: string; measure: string; contrast: string; }
export interface BookingClose { heading: string; body: string; bullets: readonly string[]; }

export interface ServicePage {
  family: 'service';
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  heading: readonly HeadingSegment[];
  lede: string;
  outcome: CommercialOutcome;
  problemHeading: string;
  problemIntro: string;
  pains: readonly CommercialPoint[];
  signature: {
    kind: 'capture-board' | 'campaign-matrix' | 'page-anatomy' | 'response-rail';
    eyebrow: string;
    heading: string;
    intro: string;
    items: readonly ServiceSignatureItem[];
  };
  processHeading: string;
  processIntro: string;
  process: readonly CommercialStep[];
  ownerResponsibilities: readonly string[];
  rushesResponsibilities: readonly string[];
  deliverables: readonly string[];
  proofBoundary: string;
  ownershipHeading: string;
  fitHeading: string;
  faqHeading: string;
  bookingClose: BookingClose;
  goodFit: readonly string[];
  poorFit: readonly string[];
  faqs: readonly CommercialFaq[];
}

export interface DemandLoopStep {
  stage: string;
  name: string;
  capability: string;
  purpose: string;
}

export interface MechanismPage {
  family: 'mechanism';
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  heading: readonly HeadingSegment[];
  lede: string;
  thesis: string;
  steps: readonly DemandLoopStep[];
  goodFit: readonly string[];
  poorFit: readonly string[];
  faqs: readonly CommercialFaq[];
}

export type InnerPage = BrandMediaPage | ServicePage | MechanismPage;

const servicePages: readonly ServicePage[] = [
  {
    family: 'service',
    slug: 'campaigns',
    title: 'Demand, not boosted posts — Rushes Media',
    description: 'Meta and Google campaigns built around one credible idea, a focused conversion path and measurable qualified opportunities. Ad spend stays in the client-owned account.',
    eyebrow: 'Creative campaigns',
    heading: [
      { kind: 'text', text: 'Demand, ' },
      { kind: 'emphasis', text: 'not boosted posts.' },
    ],
    lede: 'Build campaigns around one valuable service, a credible creative idea and a conversion path the business can actually operate. Ad spend stays on the client’s account and card.',
    outcome: {
      heading: 'Paid attention supports a clear idea and a path built for qualified conversations.',
      measure: 'Qualified, held appointments',
      contrast: 'Clicks and leads alone',
    },
    problemHeading: 'Spend exposes every disconnected handoff.',
    problemIntro: 'Paid media magnifies whatever happens after the click. Before launch, Rushes checks positioning, destination, response, and outcome reporting, then scopes only what the objective requires.',
    pains: [
      { title: 'The offer is a service menu.', body: 'The campaign asks the buyer to decode a long list instead of recognizing one problem, use case or desired project.' },
      { title: 'Creative has no job.', body: 'Assets are rotated because they look different, not because each tests a clear hook, angle, proof type or objection.' },
      { title: 'The landing path is generic.', body: 'Paid intent is sent to a homepage or broad form that loses the promise, source and context that earned the click.' },
      { title: 'A lead is counted as the outcome.', body: 'Spend is reported against platform events while qualification, held appointments and business outcomes stay unknown.' },
    ],
    signature: {
      kind: 'campaign-matrix',
      eyebrow: 'Campaign operating matrix',
      heading: 'Every ad needs an accountable path after the click.',
      intro: 'The matrix is defined before activation so creative approval, spend control and outcome ownership remain separate.',
      items: [
        { label: 'Creative', title: 'One testable idea', body: 'Hook, angle, awareness, proof type and CTA are named before a variant runs.', note: 'Rushes proposes · owner approves' },
        { label: 'Spend', title: 'Client-controlled budget', body: 'Platform access, geography, schedule, budget and the conditions for pausing or stopping spend are explicit.', note: 'Owner authorizes · platform charges owner' },
        { label: 'Landing', title: 'Message continuity', body: 'The page continues the exact promise and asks for one appropriate next action.', note: 'Rushes builds · owner verifies offer' },
        { label: 'Response', title: 'Named handoff owner', body: 'The inquiry retains source and context, then reaches the person responsible for the next step.', note: 'System routes · team responds' },
        { label: 'Learning', title: 'Business-level signal', body: 'Qualified and held appointments plus client-reported outcomes inform the next creative decision.', note: 'No result claim without evidence' },
      ],
    },
    processHeading: 'A campaign is a controlled commercial experiment.',
    processIntro: 'Copy approval is not launch approval. The exact creative, destination, budget and tracking state are reviewed before spend begins.',
    process: [
      { name: 'Choose the objective', body: 'Define the service, buyer, territory, capacity and meaningful conversion.' },
      { name: 'Build the decision plan', body: 'Name the hook, angle, proof, format, CTA, landing page, decision signals and next action.' },
      { name: 'Create the campaign path', body: 'Produce the creative and focused landing experience with accurate source and consent handling.' },
      { name: 'Verify before activation', body: 'Confirm the approved creative and destination, budget, tracking, response coverage and conditions for pausing or stopping spend.' },
      { name: 'Read qualified outcomes', body: 'Use downstream appointment and client-reported signals to keep, stop or revise the next test.' },
    ],
    ownerResponsibilities: ['Approve the exact live creative, claims, offer and spend.', 'Keep platform billing and account ownership under the business.', 'Respond to opportunities and report qualification, held appointments and outcomes.'],
    rushesResponsibilities: ['Develop the campaign concept and decision plan.', 'Build creative, landing and routing around the approved objective.', 'Monitor agreed signals and recommend keep, stop or revise actions.'],
    deliverables: ['Campaign decision plan', 'Approved creative set', 'Focused landing path', 'Source-to-outcome reporting plan'],
    proofBoundary: 'A campaign is judged through qualified and held appointments plus the outcomes the business can accurately report, not platform activity alone.',
    ownershipHeading: 'Launch control stays separate from creative approval.',
    fitHeading: 'Fund the test only when the handoff is ready.',
    faqHeading: 'Before a dollar goes live.',
    bookingClose: {
      heading: 'Find the campaign worth funding.',
      body: 'Bring the service, territory, capacity and any prior spend. We’ll define the first useful test, the path after the click and the conditions that justify launch.',
      bullets: ['The offer and buyer worth testing', 'The path after the click', 'The approval and response conditions for launch'],
    },
    goodFit: ['There is a defined service, buyer, territory and capacity objective.', 'The business can approve creative and respond to demand.', 'Spend and downstream outcomes can be reviewed honestly.'],
    poorFit: ['The request is anonymous lead volume at any quality.', 'No one owns response or reports what happened after inquiry.', 'The expectation is guaranteed leads, jobs or revenue.'],
    faqs: [
      { question: 'Who pays the ad platforms?', answer: 'The business does. Spend stays on the client-owned account and card; Rushes scopes creative, structure and management separately.' },
      { question: 'Do you launch as soon as the ads are designed?', answer: 'No. Exact creative approval, landing behavior, tracking, budget, response coverage and the conditions for pausing or stopping spend are separate launch gates.' },
      { question: 'What should a campaign create?', answer: 'More of the right people reaching a clear next step. Depending on the business, that may be a qualified estimate, consultation, or purchase conversation.' },
    ],
  },
  {
    family: 'service',
    slug: 'web',
    title: 'A site that books — Rushes Media',
    description: 'Custom sites and landing pages with one job: call, book, or request the estimate. Built for the campaign behind it.',
    eyebrow: 'Web & landing',
    heading: [
      { kind: 'text', text: 'Make the value clear. ' },
      { kind: 'emphasis', text: 'Make the next step easy.' },
    ],
    lede: 'Build a fast, distinctive digital experience that communicates the offer, makes the evidence easy to judge, and gives the right visitor a clear next step on any device.',
    outcome: {
      heading: 'The right visitor can understand the offer, judge fit and take one clear next step.',
      measure: 'Calls, bookings and qualified requests',
      contrast: 'Traffic alone',
    },
    problemHeading: 'A beautiful page can still lose the decision.',
    problemIntro: 'Web quality is not a hero screenshot. The message, proof, structure, accessibility, speed, routing and follow-up have to survive the full path from entry to action.',
    pains: [
      { title: 'The first screen tries to say everything.', body: 'A broad promise and a crowded service list force the visitor to determine who the page is for and what to do.' },
      { title: 'Proof lacks a truth label.', body: 'Concept work, demonstrations and client evidence are presented without enough context for a visitor to judge what is actually being shown.' },
      { title: 'Mobile is a compressed desktop.', body: 'Type, navigation, media crops and forms technically fit while the hierarchy and action become harder to use.' },
      { title: 'The CTA ends at a widget.', body: 'A form or calendar loads with no fallback, source context, ownership or confirmation path.' },
    ],
    signature: {
      kind: 'page-anatomy',
      eyebrow: 'Conversion-page anatomy',
      heading: 'Five decisions, in the order a buyer needs them.',
      intro: 'The composition changes by route. The decision sequence stays explicit.',
      items: [
        { label: '01 / Relevance', title: 'Is this for me?', body: 'Name the buyer, problem, service or project with enough specificity to earn the next scroll.' },
        { label: '02 / Value', title: 'Why this path?', body: 'Explain the commercial idea and how it differs from a disconnected vendor or generic service list.' },
        { label: '03 / Evidence', title: 'Why believe it?', body: 'Use inspected real proof, a labeled concept, or a functional demonstration with an honest boundary.' },
        { label: '04 / Fit', title: 'Should I continue?', body: 'Clarify territory, scope, timing, capacity and poor-fit conditions before the calendar.' },
        { label: '05 / Action', title: 'What happens next?', body: 'Provide one visible primary action, a reliable fallback and clear expectations for the handoff.' },
      ],
    },
    processHeading: 'Build the decision path before decorating the page.',
    processIntro: 'The work begins with the offer, buyer and next action, then carries that decision through every device and handoff.',
    process: [
      { name: 'Clarify the offer and buyer', body: 'Define who the page is for, what they need to understand and the one action the page should earn.' },
      { name: 'Write the decision path', body: 'Sequence relevance, value, evidence, fit and objections so the visitor never has to decode the next step.' },
      { name: 'Design for action on every device', body: 'Use hierarchy, media and responsive composition to keep the offer and primary action clear from phone to desktop.' },
      { name: 'Connect the inquiry or booking handoff', body: 'Preserve the source and context, then route the action to a visible owner with a reliable fallback.' },
      { name: 'Verify the released experience', body: 'Check the live page, links, mobile behavior, accessibility and complete path into the calendar or inquiry queue.' },
    ],
    ownerResponsibilities: ['Approve positioning, offers, proof and public claims.', 'Provide access to accurate business information and owned assets.', 'Own response, fulfillment and downstream outcome reporting.'],
    rushesResponsibilities: ['Translate the buyer path into content architecture and interface design.', 'Build and validate the approved page system.', 'Verify the released booking or inquiry path before handoff.'],
    deliverables: ['Offer and conversion map', 'Responsive page system', 'Accessible booking or inquiry path', 'Release-ready handoff verification'],
    proofBoundary: 'Rushes distinguishes a working preview from a released site and verifies the inquiry or booking path before handoff.',
    ownershipHeading: 'The site is complete when the handoff works.',
    fitHeading: 'Clarity before a redesign.',
    faqHeading: 'Before choosing a platform or scope.',
    bookingClose: {
      heading: 'Give the right visitor one clear next step.',
      body: 'We’ll inspect the offer, proof, mobile path and booking handoff, then recommend whether to rebuild, focus or keep the current site.',
      bullets: ['The decision the page has to support', 'The proof and objections that matter', 'The cleanest route into a real response'],
    },
    goodFit: ['The route has a defined buyer and next action.', 'Accurate proof and business facts can be supplied.', 'The team will maintain the destination and response path.'],
    poorFit: ['The goal is a visual reskin without commercial clarity.', 'Private or unapproved client material must be implied as public proof.', 'No one owns the form, phone or calendar after launch.'],
    faqs: [
      { question: 'Can you improve an existing site without rebuilding it?', answer: 'Often, yes. Rushes first identifies whether the real problem is positioning, structure, proof, mobile usability or the handoff after inquiry. A rebuild is recommended only when the current system cannot support the required path.' },
      { question: 'Do you use a page builder?', answer: 'The implementation depends on the site being maintained. What matters is a fast, accessible experience that the business can own and update.' },
      { question: 'How do you handle concept visuals?', answer: 'They are labeled as original Rushes concept visualizations and never presented as completed client work, performance evidence or a testimonial.' },
    ],
  },
  {
    family: 'service',
    slug: 'follow-up',
    title: 'AI Consulting & Business Systems | Rushes Media',
    description: 'Practical AI consulting, workflow automation, lead capture, and follow-up systems that save time and make the business easier to run.',
    eyebrow: 'AI & business systems',
    heading: [
      { kind: 'text', text: 'Save time. ' },
      { kind: 'emphasis', text: 'Make the business easier to run.' },
    ],
    lede: 'Use practical AI and better workflows to reduce repetitive work, connect the tools the team already uses, improve response, and create more time for customers and growth.',
    outcome: {
      heading: 'Useful systems remove friction without making the business feel less human.',
      measure: 'Time saved, faster response and cleaner handoffs',
      contrast: 'Automation for its own sake',
    },
    problemHeading: 'Good businesses lose time to work that should be easier.',
    problemIntro: 'Repetitive admin, disconnected tools, scattered information, and inconsistent handoffs consume attention. Rushes identifies where AI or a better system can create useful leverage without replacing human judgment.',
    pains: [
      { title: 'Repetitive work consumes the day.', body: 'Information is copied, summarized, sorted, or chased manually even when a dependable system could handle the first pass.' },
      { title: 'Useful context is scattered.', body: 'Customer details, conversations, files, and next actions live in separate tools or depend on one person remembering everything.' },
      { title: 'Opportunities lose momentum.', body: 'Calls, forms, and messages arrive while the team is busy, then wait too long for ownership or a useful response.' },
      { title: 'AI has no defined job.', body: 'Tools are added because they are new, not because they solve a clear problem or save meaningful time.' },
    ],
    signature: {
      kind: 'response-rail',
      eyebrow: 'Practical systems map',
      heading: 'Start with the work that creates the most friction.',
      intro: 'The right solution may be AI consulting, a workflow improvement, a focused automation, or a better connection between existing tools.',
      items: [
        { label: 'Understand', title: 'Find the real bottleneck', body: 'Map the task, the people involved, the information they need, and what a better outcome would look like.' },
        { label: 'Simplify', title: 'Remove unnecessary work first', body: 'Fix the process before automating it, so the system does not make a messy workflow move faster.' },
        { label: 'Connect', title: 'Keep useful context together', body: 'Link the right forms, calendars, CRM records, documents, or internal tools without replacing what already works.' },
        { label: 'Automate', title: 'Give AI a clear job', body: 'Use AI for defined work such as organizing information, preparing a first pass, routing requests, or surfacing the next action.' },
        { label: 'Handoff', title: 'Keep people in control', body: 'Send decisions, exceptions, and customer-facing moments to the right person with enough context to act.' },
        { label: 'Improve', title: 'Learn where time is still being lost', body: 'Review the workflow in use and refine the parts that create more leverage for the team.' },
      ],
    },
    processHeading: 'AI should solve a real business problem.',
    processIntro: 'Rushes scopes the smallest useful system around a clear outcome, the tools already in place, and the people who will use it.',
    process: [
      { name: 'Choose the problem', body: 'Define the recurring task, missed handoff, or growth constraint worth improving.' },
      { name: 'Map the current workflow', body: 'See how information moves today, where time is lost, and which parts need human judgment.' },
      { name: 'Design the useful system', body: 'Choose the right mix of process, software, AI, automation, and team ownership.' },
      { name: 'Test real conditions', body: 'Verify permissions, exceptions, failure states, consent, and handoffs before the workflow is relied on.' },
      { name: 'Refine in use', body: 'Watch how the team uses the system and improve the parts that save time or strengthen the customer experience.' },
    ],
    ownerResponsibilities: ['Explain the current workflow and desired outcome.', 'Approve access, customer-facing language, consent, and decision boundaries.', 'Keep a person responsible for exceptions and final decisions.'],
    rushesResponsibilities: ['Identify the practical AI or systems opportunity.', 'Design and implement the approved workflow.', 'Test normal use, exceptions, permissions, and handoffs before release.'],
    deliverables: ['Workflow and opportunity map', 'Practical AI or automation plan', 'Connected system or workflow', 'Testing and operating guidance'],
    proofBoundary: 'A system is useful when it saves meaningful time, reduces preventable friction, or improves an important handoff in real use.',
    ownershipHeading: 'AI supports the team. People stay in control.',
    fitHeading: 'Start with one useful improvement.',
    faqHeading: 'Where AI and better systems can help.',
    bookingClose: {
      heading: 'Find the work worth making easier.',
      body: 'We’ll look at where the team loses time, where opportunities lose momentum, and whether practical AI or a better business system could create useful leverage.',
      bullets: ['The recurring work consuming time', 'The tools and people involved', 'The smallest useful improvement to make first'],
    },
    goodFit: ['The business has a recurring workflow or handoff worth improving.', 'The team can explain the current process and use the result.', 'Access, consent, and decision boundaries can be defined.'],
    poorFit: ['The request is to add AI without a clear problem to solve.', 'No one can own exceptions or final decisions.', 'The workflow depends on access or customer use the business cannot approve.'],
    faqs: [
      { question: 'What does AI consulting include?', answer: 'Rushes identifies where AI can save time or improve a workflow, recommends the right approach, and can help implement the system when the opportunity is clear.' },
      { question: 'Does this replace our team?', answer: 'No. The goal is to reduce repetitive work and give people better context. Judgment, approvals, customer care, and important decisions stay with the team.' },
      { question: 'Can this work with our current tools?', answer: 'Often, yes. Rushes first maps what is already in place, then improves or connects only the parts the business actually needs.' },
    ],
  },
];

export const demandLoopPage: MechanismPage = {
  family: 'mechanism',
  slug: 'demand-loop',
  title: 'The Demand Loop | Rushes Media',
  description: 'The Rushes system connecting Brand Media, campaigns, web, AI-supported business systems, lead capture, and follow-up around one clear path from attention to action.',
  eyebrow: 'The connected system',
  heading: [
    { kind: 'text', text: 'The Demand Loop. ' },
    { kind: 'emphasis', text: 'Make attention lead somewhere.' },
  ],
  lede: 'The Demand Loop connects the work around growth. Brand Media earns attention. Creative Campaigns extend the reach. Web turns interest into action. AI and business systems reduce friction, speed up response, and help the team keep opportunities moving.',
  thesis: 'Use one capability or connect the full path. The goal is more visibility, more qualified conversations, a clearer path to revenue, and less time lost behind the scenes.',
  steps: [
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
  goodFit: ['Several parts of the buyer journey need to work together.', 'The business wants one clear idea carried from attention to action.', 'There is value in connecting visibility, response, and follow-up.'],
  poorFit: ['One focused service would solve the immediate priority.', 'The current path already works and only needs a targeted improvement.', 'The business does not need added reach, capture, or follow-up right now.'],
  faqs: [
    { question: 'Do we need every service?', answer: 'No. Brand Media, Creative Campaigns, Web, and AI or business systems can each stand alone. The Demand Loop is useful when two or more parts need to work together.' },
    { question: 'Can Rushes work with our current tools?', answer: 'Usually. Rushes keeps what already works and improves the parts that are limiting the next business priority.' },
    { question: 'Where should we start?', answer: 'Start with the service or handoff that would create the most useful change now. Expand only when the next connection becomes valuable.' },
    { question: 'What happens on the Growth Call?', answer: 'We look at what the business wants to improve, what already works, and the clearest creative, growth, AI, or systems move to make next.' },
  ],
};

export const innerPages: readonly InnerPage[] = [brandMediaPage, ...servicePages, demandLoopPage];

export const innerPageNavigation = [
  { href: '/demand-loop/', label: 'Demand Loop' },
  { href: '/brand-media/', label: 'Brand media' },
  { href: '/campaigns/', label: 'Campaigns' },
  { href: '/web/', label: 'Web' },
  { href: '/follow-up/', label: 'AI & business systems' },
  { href: '/industries/', label: 'Industry examples' },
] as const;

export function innerPageSeo(page: InnerPage): PageSeo {
  const canonical = `${SITE.origin}/${page.slug}/`;
  return {
    title: page.title,
    description: page.description,
    canonical,
    openGraph: { title: page.title, description: page.description, url: canonical },
  };
}
