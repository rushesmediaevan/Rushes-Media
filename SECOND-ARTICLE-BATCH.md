# Second article batch

## Prepared changes

- Brand shoot guide: destination-based brief, hypothetical capture examples, deliverables, approval and handoff. Removes performance guarantees, arbitrary setup counts and implied mandatory campaign bundling.
- Follow-up guide: inquiry review, responsibility, next actions, failure handling and measurement. Removes unverified response-speed statistics, unsupported claims about most businesses and invented Rushes results.
- Campaigns FAQ: pre-spend checklist drawn from the existing page's documented launch conditions. Existing account-ownership FAQ retained.
- Web intro: names website and landing page design explicitly while preserving the page's offer/evidence/next-step meaning.
- Demand Loop: no edit. Its existing opening already defines the framework and links the capabilities. The vendor's small impression sample does not justify a rewrite.

## Measurement inspection

- `src/scripts/booking-widget.mjs`: `booking_section_view` emits at the visibility threshold; `growth_call_click` measures a click. Neither is a completed booking.
- `assets/form-runtime.js`: `generate_lead` queues only after an HTTP-success response whose JSON has `ok: true`, excluding responses marked spam. This is form capture, not booked-call confirmation or proof GA4 received it.
- No completed-booking event was found in the inspected booking-widget module. GA4 Admin key-event settings and the scheduler's confirmation integration remain unverified. No production forms were submitted and no tracking configuration was changed.

## Verification

Node 22 full `npm test`: Astro check, 41 unit tests, build, route/metadata contracts and built/development smoke checks pass. Contract covers 12 sitemap routes and 17 GA4-tagged pages. Both new articles checked at 390px: one H1 each, no horizontal overflow; no warning/error console entries observed in the article preview. Index navigation to the brand guide checked. Existing article layout and production article-registry packaging retained.

This batch is prepared for review, not deployed. Keyword demand and ranking effects are not proven by these content changes.
