// Shared customer-facing explanation for the homepage and Demand Loop page.
export const demandLoopIntroduction = 'Rushes connects compelling media, targeted campaigns, websites built to convert, and timely follow-up to help turn interest in your business into paying customers.';

export const demandLoopSteps = [
  { stage: 'Attention', name: 'Earn attention', capability: 'Brand Media', href: '/brand-media/', purpose: 'Show the work, expertise, and value that make your business worth choosing.' },
  { stage: 'Reach', name: 'Reach the right people', capability: 'Creative Campaigns', href: '/campaigns/', purpose: 'Put your strongest creative in front of the people most likely to become customers.' },
  { stage: 'Inquiries', name: 'Turn interest into inquiries', capability: 'Web & Landing', href: '/web/', purpose: 'Give potential customers a website that answers their questions, builds confidence, and makes contacting you easy.' },
  { stage: 'Conversations', name: 'Start the conversation', capability: 'AI & Business Systems', href: '/follow-up/', purpose: 'Help interested buyers get an answer, book a consultation, or request an estimate while their interest is fresh.' },
  { stage: 'Follow-up', name: 'Follow through to the sale', capability: 'AI & Business Systems', href: '/follow-up/', purpose: 'Support your team with timely follow-up on open inquiries, consultations, and estimates—giving more opportunities a chance to become revenue.' },
] as const;
