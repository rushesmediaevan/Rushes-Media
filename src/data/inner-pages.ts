import type { PageSeo } from './site';
import { SITE } from './site';

export interface HeadingSegment { kind: 'text' | 'emphasis'; text: string; }
export interface CommercialPoint { title: string; body: string; }
export interface CommercialStep { name: string; body: string; }
export interface CommercialFaq { question: string; answer: string; }
export interface ServiceSignatureItem { label: string; title: string; body: string; note?: string; }

export interface ServicePage {
  family: 'service';
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  heading: readonly HeadingSegment[];
  lede: string;
  commercialQuestion: string;
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
  goodFit: readonly string[];
  poorFit: readonly string[];
  faqs: readonly CommercialFaq[];
}

export interface DemandLoopStep {
  name: string;
  purpose: string;
  input: string;
  rushes: string;
  owner: string;
  output: string;
  failure: string;
  tool?: string;
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
  phases: readonly { number: string; label: string; range: string; objective: string }[];
  steps: readonly DemandLoopStep[];
  ownerInputs: readonly string[];
  rushesInputs: readonly string[];
  handoffRules: readonly CommercialPoint[];
  goodFit: readonly string[];
  poorFit: readonly string[];
  faqs: readonly CommercialFaq[];
}

export type InnerPage = ServicePage | MechanismPage;

const servicePages: readonly ServicePage[] = [
  {
    family: 'service',
    slug: 'brand-media',
    title: 'The job is the ad — Rushes Media',
    description: 'Reels, stills, and brand work from real jobs — then the campaign, the page, and the follow-up that books the estimate.',
    eyebrow: 'Brand media',
    heading: [
      { kind: 'text', text: 'The job is the ad. ' },
      { kind: 'emphasis', text: 'Start using it.' },
    ],
    lede: 'Turn real work, process and judgment into media that helps the right local buyer understand the caliber of the business before the first conversation.',
    commercialQuestion: 'Will the right buyer understand why this work is worth a conversation?',
    problemHeading: 'A camera roll is not a proof system.',
    problemIntro: 'Good work often exists in scattered phone footage, one-off posts and finished-project photos with no buyer story attached. The missing piece is not more volume. It is deliberate capture, selection and use.',
    pains: [
      { title: 'The strongest work disappears.', body: 'A finished job gets one post, then stops helping the next prospect understand the transformation, decisions or constraints.' },
      { title: 'Capture has no commercial brief.', body: 'Wide shots, details and process clips are collected without knowing which buyer question each frame should answer.' },
      { title: 'Polish is mistaken for proof.', body: 'A beautiful edit cannot replace permission, accurate context or a clear connection between the work and the service being sold.' },
      { title: 'Media ends at publishing.', body: 'The same source material is not deliberately carried into campaigns, focused pages, sales follow-up and estimate conversations.' },
    ],
    signature: {
      kind: 'capture-board',
      eyebrow: 'The capture board',
      heading: 'One job. Four useful evidence layers.',
      intro: 'The shot list begins with the buyer decision, then works backward to the media the business can truthfully collect.',
      items: [
        { label: '01 / Context', title: 'Show the whole problem', body: 'Location, property, starting condition and the scope the buyer needs to recognize.', note: 'Wide / establishing / before context' },
        { label: '02 / Judgment', title: 'Show the decisions', body: 'Materials, constraints, process and tradeoffs that make the work credible.', note: 'Detail / process / owner explanation' },
        { label: '03 / Result', title: 'Show the finished experience', body: 'A clear transformation without inventing a client claim, metric or testimonial.', note: 'Reveal / use / finished detail' },
        { label: '04 / Route', title: 'Give the evidence a job', body: 'Organic post, campaign concept, page proof or one-to-one follow-up—each with a defined next action.', note: 'Channel / audience / action' },
      ],
    },
    processHeading: 'From real work to reusable commercial evidence.',
    processIntro: 'Story and shot choice stay grounded in the actual job. Nothing is published simply because it was captured.',
    process: [
      { name: 'Choose the business objective', body: 'Name the work, buyer, territory and next action the media should support.' },
      { name: 'Build the capture plan', body: 'Translate buyer questions into a measured list of scenes, details, explanations and permissions.' },
      { name: 'Capture and select', body: 'Organize the strongest truthful source material before editing or multiplying formats.' },
      { name: 'Shape the narrative', body: 'Build a restrained story with clear context, useful pacing and no unsupported claims.' },
      { name: 'Deploy and learn', body: 'Place the approved media where it can support demand, conversion and follow-up; learn from qualified outcomes.' },
    ],
    ownerResponsibilities: [
      'Identify work worth showing and secure any required property, client or employee permissions.',
      'Make someone available to explain the real decisions, constraints and process.',
      'Approve story, shot selection, claims and final use before publication.',
    ],
    rushesResponsibilities: [
      'Turn the commercial objective into a capture and edit brief.',
      'Organize, edit and adapt approved source material for its intended buyer path.',
      'Keep concept visualization, functional demonstration and real client proof visibly distinct.',
    ],
    deliverables: ['Capture brief and shot plan', 'Selected photo and motion stories', 'Channel-ready approved variants', 'Usage and proof-boundary notes'],
    proofBoundary: 'Rushes does not present generated visuals as completed client work. Real client material is published only with permission and accurate context.',
    goodFit: ['Work and judgment are genuinely worth documenting.', 'The owner can identify the buyer and commercial objective.', 'Approvals and permissions can be handled before publication.'],
    poorFit: ['The request is filler content with no buyer purpose.', 'There is no access to real work, process or credible source material.', 'The expectation is fabricated social proof or an invented result.'],
    faqs: [
      { question: 'Do we need a large production day?', answer: 'Not always. The right format depends on the work, access and objective. A focused capture plan can be more useful than a large shoot with no deployment path.' },
      { question: 'Can existing phone footage be useful?', answer: 'Often, yes. Rushes first audits resolution, orientation, continuity, permissions and whether the footage answers a buyer question before recommending new capture.' },
      { question: 'Does Rushes post without approval?', answer: 'No. Story, selections, claims and final use require approval. Media production and publication are separate decisions.' },
    ],
  },
  {
    family: 'service',
    slug: 'campaigns',
    title: 'Demand, not boosted posts — Rushes Media',
    description: 'Meta and Google campaigns built around a real idea. Spend stays on your card. The calendar moves when the page and follow-up are wired.',
    eyebrow: 'Creative campaigns',
    heading: [
      { kind: 'text', text: 'Demand, ' },
      { kind: 'emphasis', text: 'not boosted posts.' },
    ],
    lede: 'Build campaigns around one valuable service, a credible creative idea and a conversion path the business can actually operate. Ad spend stays on the client’s account and card.',
    commercialQuestion: 'Is paid attention connected to a page, response owner and measurable business outcome?',
    problemHeading: 'Spend exposes every disconnected handoff.',
    problemIntro: 'A media buy cannot rescue weak positioning, an unfocused page, delayed response or missing outcome reporting. Campaign work begins by defining what must happen after the click.',
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
        { label: 'Spend', title: 'Client-controlled budget', body: 'Platform access, geography, schedule, budget and kill criteria are explicit.', note: 'Owner authorizes · platform charges owner' },
        { label: 'Landing', title: 'Message continuity', body: 'The page continues the exact promise and asks for one appropriate next action.', note: 'Rushes builds · owner verifies offer' },
        { label: 'Response', title: 'Named handoff owner', body: 'The inquiry retains source and context, then reaches the person responsible for the next step.', note: 'System routes · team responds' },
        { label: 'Learning', title: 'Business-level signal', body: 'Qualified and held appointments plus client-reported outcomes inform the next creative decision.', note: 'No result claim without evidence' },
      ],
    },
    processHeading: 'A campaign is a controlled commercial experiment.',
    processIntro: 'Copy approval is not launch approval. The exact creative, destination, budget and tracking state are reviewed before spend begins.',
    process: [
      { name: 'Choose the objective', body: 'Define the service, buyer, territory, capacity and meaningful conversion.' },
      { name: 'Build the learning plan', body: 'Name hook, angle, awareness, proof, format, CTA, landing page, kill criteria and next action.' },
      { name: 'Create the campaign path', body: 'Produce the creative and focused landing experience with accurate source and consent handling.' },
      { name: 'Verify before activation', body: 'Check approvals, account ownership, budget, event behavior, response coverage and negative cases.' },
      { name: 'Read qualified outcomes', body: 'Use downstream appointment and client-reported signals to keep, stop or revise the next test.' },
    ],
    ownerResponsibilities: ['Approve the exact live creative, claims, offer and spend.', 'Keep platform billing and account ownership under the business.', 'Respond to opportunities and report qualification, held appointments and outcomes.'],
    rushesResponsibilities: ['Develop the campaign concept and learning matrix.', 'Build creative, landing and routing around the approved objective.', 'Monitor agreed signals and recommend keep, stop or revise actions.'],
    deliverables: ['Campaign learning matrix', 'Approved creative set', 'Focused landing path', 'Source-to-outcome reporting plan'],
    proofBoundary: 'Platform configuration, a passing tracking test or an active status does not prove a healthy campaign or commercial result. Rushes reports each state separately.',
    goodFit: ['There is a defined service, buyer, territory and capacity objective.', 'The business can approve creative and respond to demand.', 'Spend and downstream outcomes can be reviewed honestly.'],
    poorFit: ['The request is anonymous lead volume at any quality.', 'No one owns response or reports what happened after inquiry.', 'The expectation is guaranteed leads, jobs or revenue.'],
    faqs: [
      { question: 'Who pays the ad platforms?', answer: 'The business does. Spend stays on the client-owned account and card; Rushes scopes creative, structure and management separately.' },
      { question: 'Do you launch as soon as the ads are designed?', answer: 'No. Exact creative approval, landing behavior, tracking, budget, response coverage and kill criteria are separate launch gates.' },
      { question: 'What counts as success?', answer: 'The meaningful measure is defined for the business—usually qualified and held estimates or consultations, then client-reported outcomes. Platform events are diagnostic signals, not the final result.' },
    ],
  },
  {
    family: 'service',
    slug: 'web',
    title: 'A site that books — Rushes Media',
    description: 'Custom sites and landing pages with one job: call, book, or request the estimate. Built for the campaign behind it.',
    eyebrow: 'Web & landing',
    heading: [
      { kind: 'text', text: 'A site that books. ' },
      { kind: 'emphasis', text: 'Not a brochure.' },
    ],
    lede: 'Build a fast, focused path that helps the right visitor understand the offer, trust the evidence, qualify themselves and take one clear next action on any device.',
    commercialQuestion: 'Can a visitor understand the offer and take the right next step without decoding the company?',
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
    processHeading: 'Built from route purpose, then verified as a system.',
    processIntro: 'Every route receives a defined audience, SEO role and next action before the component system is applied.',
    process: [
      { name: 'Map the route', body: 'Define audience, intent, source traffic, commercial question, proof state and next action.' },
      { name: 'Write the decision path', body: 'Sequence the message, objections, evidence, qualification and CTA before visual polish.' },
      { name: 'Design the composition', body: 'Use hierarchy, media, density and color shifts to make each route purposeful without losing the Rushes system.' },
      { name: 'Build accessibly', body: 'Use semantic, responsive, keyboard-usable components with reduced-motion behavior and resilient loading states.' },
      { name: 'Verify the full path', body: 'Test metadata, canonicals, links, overflow, console state, booking, tracking suppression and failure cases.' },
    ],
    ownerResponsibilities: ['Approve positioning, offers, proof and public claims.', 'Provide access to accurate business information and owned assets.', 'Own response, fulfillment and downstream outcome reporting.'],
    rushesResponsibilities: ['Translate the buyer path into content architecture and interface design.', 'Build and validate the approved route system.', 'Keep analytics, booking and release states distinct and testable.'],
    deliverables: ['Route and conversion map', 'Responsive page system', 'Accessible booking or inquiry path', 'Local and release QA evidence'],
    proofBoundary: 'A local build, green test or generated screenshot is not a live release. Rushes reports local validation, repository state and production evidence separately.',
    goodFit: ['The route has a defined buyer and next action.', 'Accurate proof and business facts can be supplied.', 'The team will maintain the destination and response path.'],
    poorFit: ['The goal is a visual reskin without commercial clarity.', 'Private or unapproved client material must be implied as public proof.', 'No one owns the form, phone or calendar after launch.'],
    faqs: [
      { question: 'Do all pages need to look different?', answer: 'They need to answer different commercial questions. Shared navigation, typography and interaction patterns create trust; composition and modules change where the buyer journey changes.' },
      { question: 'Do you use a page builder?', answer: 'The implementation depends on the system being maintained. The requirement is not a specific builder—it is a fast, accessible and verifiable route that the business can own.' },
      { question: 'How do you handle concept visuals?', answer: 'They are labeled as original Rushes concept visualizations and never presented as completed client work, performance evidence or a testimonial.' },
    ],
  },
  {
    family: 'service',
    slug: 'follow-up',
    title: 'Answer in minutes — Rushes Media',
    description: 'Forms, calls, and DMs into one place. Text back while they’re still holding the phone. Confirmations so the estimate actually shows.',
    eyebrow: 'Lead capture & follow-up',
    heading: [
      { kind: 'text', text: 'Answer in minutes. ' },
      { kind: 'emphasis', text: 'That’s who they book.' },
    ],
    lede: 'Give every qualified inquiry a clear owner, fast acknowledgement, useful routing and consent-aware follow-up from first contact through the scheduled estimate or consultation.',
    commercialQuestion: 'Who owns the next useful action the moment an inquiry arrives?',
    problemHeading: 'The lead does not disappear. Ownership does.',
    problemIntro: 'Calls, forms and messages can arrive while everyone is serving customers. A response system has to preserve context, respect consent and make the next human action unmistakable.',
    pains: [
      { title: 'Channels create separate queues.', body: 'Phone calls, web forms and social messages reach different people with no shared view of source, urgency or prior contact.' },
      { title: 'Automation replies without routing.', body: 'An instant acknowledgement is sent, but no person is assigned the next useful action or escalation.' },
      { title: 'Qualification happens too late.', body: 'Territory, service, project, timing or capacity mismatch appears after calendar time is already consumed.' },
      { title: 'Follow-up ignores consent and outcome.', body: 'Sequences continue without a valid basis or stop at “sent” while booking, show and sale state remain unknown.' },
    ],
    signature: {
      kind: 'response-rail',
      eyebrow: 'The response rail',
      heading: 'One inquiry. A visible owner at every handoff.',
      intro: 'The timing is an operating target, not a claim about current performance. Exact rules are scoped to staffing, channel and consent.',
      items: [
        { label: 'T+00 / Capture', title: 'Preserve the source and request', body: 'Create one record with channel, campaign, page and the information the buyer actually supplied.' },
        { label: 'First available minutes', title: 'Acknowledge and assign', body: 'Confirm receipt, set an expectation and identify the human or queue responsible for the next action.' },
        { label: 'Same response window', title: 'Qualify and route', body: 'Separate service, replacement, project or consultation intent; send it to the right owner and calendar.' },
        { label: 'After booking', title: 'Confirm the handoff', body: 'Use accurate reminders and internal ownership so a booked slot has the best chance to become a held conversation.' },
        { label: 'If still open', title: 'Follow up usefully', body: 'Recover incomplete bookings and unresolved opportunities only where purpose, timing and consent support it.' },
        { label: 'After the outcome', title: 'Close the loop', body: 'Record qualified, held, won, lost or still-open state so the next demand decision uses business evidence.' },
      ],
    },
    processHeading: 'Automation supports the owner. It does not erase responsibility.',
    processIntro: 'The system is designed around real team coverage, escalation and consent—not an imaginary always-on office.',
    process: [
      { name: 'Map every entry point', body: 'Inventory calls, forms, messages, calendars and current owners without replacing the live CRM with a disconnected surface.' },
      { name: 'Define states and ownership', body: 'Name what qualifies, who responds, when escalation occurs and what ends a sequence.' },
      { name: 'Build the minimum useful automation', body: 'Acknowledge, route, remind and surface exceptions while preserving human judgment.' },
      { name: 'Test negative cases', body: 'Verify missing credentials, duplicate submissions, invalid consent, failed vendor calls and blocked destinations.' },
      { name: 'Measure held outcomes', body: 'Separate delivered messages and booked slots from held appointments and client-reported business results.' },
    ],
    ownerResponsibilities: ['Define who can respond and during which hours.', 'Approve qualification, consent language and escalation rules.', 'Update appointment and business outcomes truthfully.'],
    rushesResponsibilities: ['Map channels, states, routing and failure behavior.', 'Implement the approved automation and operator visibility.', 'Test delivery boundaries without sending real contacts during QA.'],
    deliverables: ['Entry-point and ownership map', 'Qualification and routing rules', 'Consented follow-up sequences', 'Exception and outcome reporting'],
    proofBoundary: 'A configured workflow, successful API response or delivered message does not prove a held appointment, sale or healthy live system.',
    goodFit: ['The business receives valuable inquiries but handoffs are inconsistent.', 'A real person or team can own response and outcomes.', 'Consent and stop conditions can be defined.'],
    poorFit: ['The goal is unsolicited messaging without a valid basis.', 'No one can take the human follow-up or sales conversation.', 'The business wants delivery counts reported as revenue.'],
    faqs: [
      { question: 'Does this replace our office team?', answer: 'No. It gives the team clearer context, ownership and exception handling. Diagnosis, sales judgment, scheduling decisions and customer care remain human responsibilities.' },
      { question: 'Do you send texts during QA?', answer: 'No real lead, SMS, CRM or booking action is required for local verification. Negative tests use suppressed credentials or controlled fixtures.' },
      { question: 'What should reporting show?', answer: 'Source, response state, qualification, booking, held status and client-reported outcome—clearly separated from technical delivery events.' },
    ],
  },
];

export const demandLoopPage: MechanismPage = {
  family: 'mechanism',
  slug: 'demand-loop',
  title: 'The Demand Loop — Rushes Media',
  description: 'Show the work, put it in front of ready buyers, catch them, book the estimate, run it tighter next month. One system. 30-minute Growth Call.',
  eyebrow: 'The mechanism',
  heading: [
    { kind: 'text', text: 'The Demand Loop. ' },
    { kind: 'emphasis', text: 'One path to the calendar.' },
  ],
  lede: 'Nine accountable handoffs connect real work to a qualified, held estimate or consultation—then carry the outcome back into the next decision.',
  thesis: 'The Loop is not a software bundle. It is the operating agreement between what Rushes builds and what the owner must approve, answer, deliver and report.',
  phases: [
    { number: 'I', label: 'Earn attention', range: '01—03', objective: 'Turn real work and a defined commercial objective into credible demand.' },
    { number: 'II', label: 'Convert intent', range: '04—07', objective: 'Preserve the promise, qualify the opportunity and book the correct next step.' },
    { number: 'III', label: 'Recover & learn', range: '08—09', objective: 'Keep worthwhile opportunities visible and use outcomes to improve the next cycle.' },
  ],
  steps: [
    {
      name: 'Capture real work and proof',
      purpose: 'Document the work, judgment, process and buyer context worth showing.',
      input: 'Approved access, real job or process, permissions and commercial objective.',
      rushes: 'Build the capture brief, organize source and identify truthful evidence.',
      owner: 'Provide access, context and permission; approve what can be shown.',
      output: 'A reusable, truth-labeled evidence library.',
      failure: 'Footage is collected without context, permission or a buyer purpose.',
      tool: 'Media capture and asset library',
    },
    {
      name: 'Shape positioning and creative',
      purpose: 'Translate the evidence into one buyer-aware idea and next action.',
      input: 'Evidence library, desired work, buyer language and objections.',
      rushes: 'Develop positioning, concepts, copy and format recommendations.',
      owner: 'Verify claims, pricing context, capacity and brand fit.',
      output: 'Approved creative and message system.',
      failure: 'Polish substitutes for a clear offer, or an unapproved claim enters the work.',
      tool: 'Creative brief and approval record',
    },
    {
      name: 'Distribute through campaigns and channels',
      purpose: 'Place the approved idea where the defined buyer can encounter it.',
      input: 'Approved creative, territory, budget, channels and learning plan.',
      rushes: 'Build distribution structure and monitor the agreed signals.',
      owner: 'Authorize spend and retain account and billing control.',
      output: 'Attributed attention entering a known path.',
      failure: 'A campaign is activated without exact approval, response coverage or kill criteria.',
      tool: 'Client-owned campaign accounts',
    },
    {
      name: 'Land intent on a focused page',
      purpose: 'Continue the promise and help the visitor make the next decision.',
      input: 'Campaign context, buyer questions, proof and primary action.',
      rushes: 'Design and build the route, mobile hierarchy and resilient CTA.',
      owner: 'Confirm offer accuracy, proof permission and destination ownership.',
      output: 'A fast, accessible conversion path.',
      failure: 'Traffic lands on a generic page, a hidden CTA or an unsupported proof claim.',
      tool: 'Focused website or landing route',
    },
    {
      name: 'Capture and qualify the lead',
      purpose: 'Preserve source and collect only the context needed for the next step.',
      input: 'Visitor action, source parameters and approved qualification fields.',
      rushes: 'Implement capture, validation, attribution and error behavior.',
      owner: 'Define real fit, territory, capacity and disqualification rules.',
      output: 'A routed opportunity with enough context to act.',
      failure: 'A form submission is counted as success before quality or ownership is known.',
      tool: 'Form, call tracking or approved intake',
    },
    {
      name: 'Respond and route in minutes',
      purpose: 'Acknowledge the inquiry and make human ownership explicit.',
      input: 'Qualified context, staff coverage, routing and consent rules.',
      rushes: 'Configure acknowledgement, assignment, escalation and visibility.',
      owner: 'Provide the human responder and honor the service expectation.',
      output: 'A useful next action owned by the correct person.',
      failure: 'Automation replies, but the opportunity remains unowned or reaches the wrong queue.',
      tool: 'Shared CRM and routing rules',
    },
    {
      name: 'Book the estimate or consultation',
      purpose: 'Move the right opportunity onto the right calendar with clear expectations.',
      input: 'Qualified intent, calendar availability and the correct appointment type.',
      rushes: 'Connect the booking path, preserve context and verify failure states.',
      owner: 'Maintain availability, attend the handoff and conduct the conversation.',
      output: 'A booked appointment with an identified owner.',
      failure: 'An iframe load or calendar click is reported as a booked or held appointment.',
      tool: 'Business-owned calendar',
    },
    {
      name: 'Follow up on open opportunities',
      purpose: 'Recover incomplete bookings, unbooked inquiries and unresolved estimates where appropriate.',
      input: 'Current state, consent, reason for follow-up and a useful next action.',
      rushes: 'Build approved reminders, tasks and stop conditions.',
      owner: 'Handle judgment calls, estimates, objections and sales follow-through.',
      output: 'An opportunity that advances, closes or is accurately marked.',
      failure: 'Generic sequences continue without consent, context or an exit condition.',
      tool: 'Consented SMS, email and operator tasks',
    },
    {
      name: 'Attribute outcomes and improve',
      purpose: 'Use business evidence to decide what to keep, stop or change.',
      input: 'Source, qualification, booking, held status and client-reported outcome.',
      rushes: 'Reconcile the path and recommend the next controlled change.',
      owner: 'Report what happened after the appointment, including lost and open states.',
      output: 'A sharper next cycle with an evidence-backed priority.',
      failure: 'Technical events or configured systems are presented as revenue or healthy live performance.',
      tool: 'Outcome reporting and learning record',
    },
  ],
  ownerInputs: ['The work and buyer worth pursuing', 'Accurate offers, constraints and public claims', 'Access, permissions, capacity and response coverage', 'Appointment, sales and fulfillment outcomes'],
  rushesInputs: ['Positioning and creative direction', 'Campaign, page and handoff design', 'Capture, routing and follow-up implementation', 'Attribution, QA and improvement recommendations'],
  handoffRules: [
    { title: 'Every stage has an owner.', body: 'A system event is not complete until the next person or queue can take the defined action.' },
    { title: 'Every claim has a source.', body: 'Client proof, functional demonstration and synthetic concept visualization remain visibly different.' },
    { title: 'Every conversion has a state.', body: 'Loaded, submitted, qualified, booked, held, won and paid are not interchangeable labels.' },
    { title: 'Every automation has a stop.', body: 'Consent, disqualification, reply, booking, loss and manual ownership can end or redirect follow-up.' },
  ],
  goodFit: ['An owner can define valuable work, territory and capacity.', 'The business can approve evidence and respond to opportunities.', 'Appointment and outcome states can be reported honestly.', 'The economics support a connected acquisition system.'],
  poorFit: ['The goal is disconnected content, software or cheap shared leads.', 'There is no response owner or fulfillment capacity.', 'The business will not approve claims or report outcomes.', 'The expectation is guaranteed jobs, revenue or a hands-off sales replacement.'],
  faqs: [
    { question: 'Do we need every stage on day one?', answer: 'No. The full path is mapped first, then the smallest valuable failure is fixed without pretending the remaining handoffs are solved.' },
    { question: 'Can Rushes work with our current tools?', answer: 'Usually. Tools are kept where they support the handoff. The system is not rebuilt merely to create a new dashboard or replace a working owner-controlled account.' },
    { question: 'Who owns the leads and accounts?', answer: 'The business retains ownership of its accounts, spend and customer relationships. Exact access and responsibilities are defined in the agreement.' },
    { question: 'What does Rushes measure?', answer: 'The path from source through qualification, booking and held appointment, then the business outcomes the client can accurately report. Technical activity is labeled separately.' },
    { question: 'What happens on the Growth Call?', answer: 'In about 30 minutes, we inspect the work you want, the current handoffs, the response and fulfillment reality, and whether one bounded next step is commercially sensible.' },
  ],
};

export const innerPages: readonly InnerPage[] = [...servicePages, demandLoopPage];

export const innerPageNavigation = [
  { href: '/demand-loop/', label: 'Demand Loop' },
  { href: '/brand-media/', label: 'Brand media' },
  { href: '/campaigns/', label: 'Campaigns' },
  { href: '/web/', label: 'Web' },
  { href: '/follow-up/', label: 'Follow-up' },
  { href: '/industries/', label: 'Best-fit industries' },
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
