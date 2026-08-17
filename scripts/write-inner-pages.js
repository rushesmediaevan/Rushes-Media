#!/usr/bin/env node
/** One-shot writer for Demand Loop inner pages. Re-run if copy changes. */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BOOK =
  'https://api.leadconnectorhq.com/widget/booking/1GUofnPSyYefy2VOSxKO';

const pages = [
  {
    dir: 'brand-media',
    title: 'The job is the ad — Rushes Media',
    desc: 'Reels, stills, and brand work from real jobs — then the campaign, the page, and the follow-up that books the estimate.',
    eye: 'Brand media',
    h1: 'The job is the ad. <em>Start using it.</em>',
    lede: 'Reels, stills, and brand work from real jobs — not a content calendar of filler. The point is not being on Instagram. The point is that the right local buyer sees proof before they ever call.',
    body: [
      'You already have the footage. It is on your phone from the job you finished Tuesday. We turn that into the thing people see — then it has to run as a campaign, land on a page, and get answered in minutes.',
    ],
    pull: 'Then it has to run as a campaign, land on a page, and get answered in minutes. That’s the Demand Loop.',
  },
  {
    dir: 'campaigns',
    title: 'Demand, not boosted posts — Rushes Media',
    desc: 'Meta and Google campaigns built around a real idea. Spend stays on your card. The calendar moves when the page and follow-up are wired.',
    eye: 'Creative campaigns',
    h1: 'Demand, <em>not boosted posts.</em>',
    lede: 'Meta and Google built around a real idea. Spend stays on your card. We build the creative and the structure. If the page and the follow-up aren’t wired, spend is a bill.',
    body: [
      'We don’t sell more ads. We run demand into one page, catch the person, and book the estimate — or tell you straight if it isn’t a fit.',
    ],
    pull: 'Campaigns are one piece. The calendar moves when all four run.',
  },
  {
    dir: 'web',
    title: 'A site that books — Rushes Media',
    desc: 'Custom sites and landing pages with one job: call, book, or request the estimate. Built for the campaign behind it.',
    eye: 'Web & landing',
    h1: 'A site that books. <em>Not a brochure.</em>',
    lede: 'Custom sites and landing pages with one job: call, book, or request the estimate. Fast on a phone. Clear. Built for the campaign behind it.',
    body: [
      'Traffic to a page that doesn’t book is wasted. Follow-up that waits until tonight is worse. The site is one piece of the Demand Loop — not a package you buy off this page.',
    ],
    pull: 'Traffic to a page that doesn’t book is wasted. Follow-up that waits until tonight is worse.',
  },
  {
    dir: 'follow-up',
    title: 'Answer in minutes — Rushes Media',
    desc: 'Forms, calls, and DMs into one place. Text back while they’re still holding the phone. Confirmations so the estimate actually shows.',
    eye: 'Lead capture & follow-up',
    h1: 'Answer in minutes. <em>That’s who they book.</em>',
    lede: 'Forms, calls, and DMs into one place. Text back while they’re still holding the phone. Confirmations so the estimate actually shows.',
    body: [
      'This is the part most shops skip. It only works if the work is worth showing and the campaign is sending the right people. It is not a standalone “text-back” product.',
    ],
    pull: 'This is the part most shops skip. It only works if the work is worth showing and the campaign is sending the right people.',
  },
  {
    dir: 'demand-loop',
    title: 'The Demand Loop — Rushes Media',
    desc: 'Show the work, put it in front of ready buyers, catch them, book the estimate, run it tighter next month. One system. 20-minute Growth Call.',
    eye: 'The mechanism',
    h1: 'The Demand Loop. <em>One path to the calendar.</em>',
    lede: 'Show the real work → make it into creative → put it in front of the right people → one page → catch the lead → follow up in minutes → book the estimate → track it → do it sharper.',
    body: [
      'Everyone sells one piece — content, or ads, or a website. The money falls through the gaps. The Loop closes every gap. That is what we install. Public door is a 20-minute Growth Call. We do not quote a menu on this page.',
    ],
    pull: 'You are hiring the path from attention to a booked calendar — not a media buyer.',
  },
  {
    dir: 'hardscape',
    title: 'Marketing for outdoor living contractors — Rushes Media',
    desc: 'Turn patio and outdoor living jobs into booked estimates. Content, campaigns, a page that converts, and follow-up in minutes.',
    eye: 'Outdoor living',
    h1: 'Booked estimates from the jobs <em>you already finish.</em>',
    lede: 'For owner-operated hardscape and outdoor living companies. The backyard is the proof. The gap is what happens in the five minutes after someone reaches out.',
    body: [
      'We film the work, run demand, land it on one page, and book the estimate while you’re still on site. If your average job can’t support the work, we’ll say so on the call.',
    ],
    pull: 'He called twice. You were on a job. He booked the other guy. That’s the problem we actually solve.',
  },
  {
    dir: 'hvac',
    title: 'Marketing for HVAC replacement companies — Rushes Media',
    desc: 'Replacements on the board, not missed calls in the truck. Demand campaigns, a page that books, follow-up in minutes.',
    eye: 'HVAC replacement',
    h1: 'Replacements on the board, <em>not missed calls in the truck.</em>',
    lede: 'For owner-operated HVAC shops doing changeouts worth the floor. Every missed call in the field is a replacement walking.',
    body: [
      'Posting more doesn’t fix that. A system that answers in minutes does — and it uses the installs you already do as the ad. 20-minute Growth Call. We’ll look at how work reaches you.',
    ],
    pull: 'That missed call was a changeout. Your competitor already booked it.',
  },
  {
    dir: 'pools',
    title: 'Marketing for pool companies — Rushes Media',
    desc: 'The backyard is the ad. Campaigns, a page that books, and follow-up so the estimate lands on your calendar.',
    eye: 'Pools',
    h1: 'The backyard is the ad.',
    lede: 'For pool builders and outdoor spa companies whose work is already photogenic — and whose follow-up isn’t.',
    body: [
      'We turn finished jobs into demand, send people to one page, and book the estimate in minutes. Same Demand Loop as outdoor living. Same Growth Call.',
    ],
    pull: 'If the work is the proof, stop hiding it in a camera roll.',
  },
  {
    dir: 'med-spa',
    title: 'Med spa marketing for owners — Rushes Media',
    desc: 'Consults booked, not sitting in a DM. Owner on the call. Media, campaigns, page, and follow-up as one path.',
    eye: 'Med spa · owner access',
    h1: 'Consults booked, <em>not sitting in a DM.</em>',
    lede: 'For owners — not the front desk queue. The room is expensive. The grid often isn’t. End of day is too late.',
    body: [
      'We show the work, put it in front of the right people, and book the consult in minutes. Same machine as the trades. The calendar word is consults. The Growth Call is still 20 minutes, owner only.',
    ],
    pull: 'Front desk gets to the DMs. Sometimes. By then the consult is gone.',
  },
];

const loopNav = `
  <div class="loop-links">
    <a href="/demand-loop/">Demand Loop</a>
    <a href="/brand-media/">Brand media</a>
    <a href="/campaigns/">Campaigns</a>
    <a href="/web/">Web</a>
    <a href="/follow-up/">Follow-up</a>
    <a href="/hardscape/">Outdoor living</a>
    <a href="/hvac/">HVAC</a>
    <a href="/pools/">Pools</a>
    <a href="/med-spa/">Med spa</a>
  </div>`;

function html(p) {
  const body = p.body.map((t) => `<p>${t}</p>`).join('\n      ');
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${p.title}</title>
  <meta name="description" content="${p.desc}" />
  <link rel="canonical" href="https://rushesmedia.com/${p.dir}/" />
  <meta name="theme-color" content="#0c1825" />
  <meta property="og:title" content="${p.title}" />
  <meta property="og:description" content="${p.desc}" />
  <meta property="og:url" content="https://rushesmedia.com/${p.dir}/" />
  <link rel="icon" type="image/png" href="/assets/images/logo-icon.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/assets/inner-page.css" />
  <script src="/assets/meta-pixel.js" defer></script>
</head>
<body>
<nav>
  <a href="/" class="logo" aria-label="Rushes Media — home">
    <img src="/assets/images/logo-icon.png" alt="" class="logo-crest" />
    <img src="/assets/images/logo-wordmark.png" alt="Rushes Media" class="logo-wordmark" />
  </a>
  <a href="#book" class="nav-cta">Book a Growth Call</a>
</nav>
<main>
  <span class="eye">${p.eye}</span>
  <h1>${p.h1}</h1>
  <p class="lede">${p.lede}</p>
  ${body}
  <blockquote class="pull">${p.pull}</blockquote>
  <p>Nobody buys a single piece off this page. The Growth Call is how we see whether the whole Loop fits.</p>
  ${loopNav}
  <section id="book">
    <span class="eye">Growth Call</span>
    <h2>Book a Growth Call</h2>
    <p class="book-sub">20 minutes. No deck. Name, phone, and SMS preferences are on the last step inside the calendar.</p>
    <div class="cal-wrap">
      <iframe src="${BOOK}" title="Book a Growth Call with Rushes Media" allow="clipboard-write"></iframe>
    </div>
  </section>
</main>
<footer>
  <p class="ft-copy">
    <a href="/">Home</a> · <a href="/privacy/">Privacy</a> · <a href="/terms/">Terms</a><br />
    Rushes Group LLC (DBA Rushes Media)
  </p>
  <a class="back" href="/">← Back to home</a>
</footer>
</body>
</html>
`;
}

for (const p of pages) {
  const dir = path.join(ROOT, p.dir);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html(p));
  console.log('wrote', p.dir);
}
