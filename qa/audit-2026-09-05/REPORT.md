# Rushes Media website audit and repairs

Prepared September 5, 2026. **Local implementation for visual approval; not deployed.**

The Astro/static-site structure is sound. This repair preserves the current design, imagery, positioning, routes, booking destination, and existing work while replacing fragile interaction code and strengthening capture failure handling.

## Review package and provenance

- Isolated checkout: `/Users/evanotoole/Documents/rushes-website-audit-2026-09-05`.
- Branch: `codex/website-audit-fixes-2026-09-05`.
- Original checkout: `/Users/evanotoole/Documents/rushes-os/website`, original HEAD `d705cf4493fbfcc8eedf20641d44383b1bafb624`.
- Baseline snapshot commit: `7b162b8`. All audit fixes are measured against this snapshot, not against a production assumption.
- The six pre-existing tracked changes were preserved separately: `assets/capability-pages.css`, `scripts/assert-built-contract.mjs`, `src/components/capability/BrandMediaBody.astro`, `src/components/home/ServicesSection.astro`, `src/data/capability-pages.ts`, and `src/pages/llms.txt.ts`. This baseline contains 40 additions and four deletions.
- The 59 untracked assets copied into the isolated checkout remain outside the audit patch. No source edits were made in the original checkout.
- `prior-working-tree.patch` records the tracked baseline changes. `audit-fixes.patch` contains only this repair. Screenshots are local QA artifacts, intentionally excluded from Git by the existing repository policy.

## Repaired defects

| Priority | Repair | Evidence |
| --- | --- | --- |
| High | Replaced the homepage and both confirmation-page circles with a conventional gold arrow, cream/navy outline, 2×2 hotspot, and native fallback. Removed movement listeners, circle markup, enlargement rules, and active-page `cursor: none`. | Shared `assets/interaction.css` and `assets/cursor.svg`; browser confirmed arrow CSS without JavaScript, native cursor under forced colors, and no hidden cursor rules with the SVG blocked. |
| High | Booking failure states can recover. Late authenticated readiness restores the frame; retry creates a fresh iframe and timer; reconnect starts a new attempt. Direct-calendar and email alternatives remain available. | Five booking regression tests plus the real browser fixture, whose ready signal arrives after nine seconds, beyond the eight-second timeout. |
| High | Required contact/opportunity work completes before SMS. Missing IDs in successful-looking CRM responses are treated as upstream failures. Optional acknowledgement failures do not turn a stored lead into a retry prompt. | Mocked CRM failure/retry sends only one SMS, after required writes; malformed response and acceptance-uncertainty tests. |
| High | Removed unconditional GA4/Meta lead conversions from confirmation visits. A successful, non-spam form capture emits one event per provider; failed capture and duplicate pending submissions do not. | Eight form/tracking regression tests. Tracking exceptions do not block navigation; attribution survives confirmation redirects. |
| Medium | Restored browser validation, required fields, length limits, focused field errors, retained values, and both HTTP-success plus `ok: true` confirmation. Form actions use POST; the scorecard has a no-JavaScript email alternative. | Browser required-field and credential-free service-failure checks; payload/type/selection tests. |
| Medium | Added a 64 KiB body limit, five attempts per IP per hour shared across both capture endpoints, bounded 5,000-entry limiter storage, ten-second upstream deadlines, a 30-second request deadline, and a 35-second browser deadline. No automatic external-write retries. | HTTP tests exercise declared and chunked oversized bodies, both endpoint rate limits, configuration failure, and a real slow-body deadline. Mocked upstream tests cover aborts and no retries. |
| Medium | Homepage menu uses a native modal dialog with Escape, focus restoration, scroll restoration, and closure above 960px. Hidden floating CTA is inert and hidden from accessibility navigation. | Browser Escape/resize checks, keyboard tab checks, FAQ toggling, and unchanged menu appearance. |
| Lower | Five capability pages now have Open Graph/Twitter defaults using the existing approved hero image. Confirmation pages respect reduced motion. Removed the obsolete unconfigured Google Ads conversion block. | Build contracts and browser animation checks. |

The acknowledgement status fields distinguish `accepted`, `failed`, `unknown`, and (for SMS) `not_consented`. Existing successful response fields remain available. Provider acceptance is **not** confirmation of email or SMS delivery. A saved scorecard capture still reaches its download page when optional email sending fails.

Capture endpoints return structured field errors with HTTP 400; excessive bodies use 413, local submission limits use 429 with `Retry-After`, missing configuration uses 503, upstream errors use 502, and timeouts use 504. Error responses do not expose upstream credentials or payloads.

## Validation

`PATH=/Users/evanotoole/.nvm/versions/node/v22.23.1/bin:$PATH npm test`

- Node 22.23.1: **41 tests pass**, up from 16 in the preserved baseline.
- Astro check: **zero errors and zero warnings**; informational hints remain.
- Build and contract assertions pass: eight sitemap routes, 13 GA4-tagged public pages, no review routes in production output, and 223 allowlisted assets.
- Development and production HTTP smoke tests pass.
- Mock services or removed credentials were used for all capture tests. No real contacts, opportunities, messages, marketing enrollment, or bookings were created.
- All 13 public content routes were checked at **320, 390, 768, 1024, and 1440px**: **65 checks, zero horizontal overflows**. See `layout-results.json`.
- Browser checks cover Escape, native dialog behavior, desktop resize, hidden floating CTA focus exclusion, keyboard FAQ operation, iframe entry/exit, late readiness, reconnect, validation, retained form values, reduced motion, disabled JavaScript, forced colors, and a blocked cursor asset. See `interaction-results.json`.
- Native dialog focus can move to browser chrome at its boundary, as normal browser behavior allows; it did not move to a background page control.
- Before/after screenshots show the existing design. The playing hero video can show a different frame between captures; it was not replaced.

Browser interaction and layout checks used Chromium in the app browser. **Safari, Firefox, physical touch devices, and assistive-technology combinations are not certified by this run.** A narrow viewport is not proof of touch-device behavior. The system cursor itself is not included in page screenshots; computed CSS and fallback behavior were checked separately.

## Fresh performance measurements

These are three alternating samples per version at 1440×900 on localhost with cache disabled, unthrottled CPU/network, third-party services suppressed, and a 1.8-second observation after navigation. They are early laboratory samples, **not Lighthouse scores or production Core Web Vitals**. Raw results: `performance-results.json`.

| Measurement | Before | After |
| --- | ---: | ---: |
| First-party JavaScript, build contract | 14,954 bytes | 10,581 bytes |
| Homepage HTML response | 59,307 bytes | 50,237 bytes |
| Median first contentful paint | 128 ms | 116 ms |
| Median early LCP candidate | 128 ms | 116 ms |
| Median DOMContentLoaded | 76.8 ms | 60.7 ms |
| Observed layout-shift sum | 0.000099 | 0.000099 |

JavaScript decreased by about **29%**. The timing samples show no obvious local regression, but are too small and environment-specific to establish a production speed improvement. Refresh throttled production Lighthouse and field measurements after a separately approved release, including third-party booking/analytics costs.

## Visual evidence

- [Mobile before](before-home-390.jpg) / [mobile after](after-home-390.jpg).
- [Desktop before](before-home-1440.jpg) / [desktop after](after-home-1440.jpg).
- [Mobile menu](after-menu-390.jpg), [mobile booking fallback](after-booking-fallback-390.jpg), and [retained form after service failure](after-form-failure-390.jpg).
- Tablet/home views: [768px](after-home-768.jpg), [1024px](after-home-1024.jpg), and [320px](after-home-320.jpg).
- [Brand Media mobile page](after-brand-media-390.jpg) and [mock calendar ready](after-mock-calendar-ready-1440.jpg).
- [JavaScript disabled](after-no-javascript-1440.jpg).

## Remaining limitations and optional improvements

1. **Release validation:** Safari/Firefox and a physical phone still need separate checks. Actual GHL booking behavior, accepted-message delivery, and production GA4/Meta receipt remain external verification steps. No live settings or deployment changed.
2. **Retry scope:** Moving acknowledgements after required CRM work fixes the reproduced duplicate-SMS path. It does not provide durable exactly-once delivery if a connection is lost after the provider accepts a message, or if a visitor deliberately resubmits a completed form. A persistent idempotency ledger would be a separate, larger enhancement.
3. **Rate-limit scope:** The bounded limiter is per server process, resets on restart, and depends on the deployment proxy supplying trustworthy client-IP headers. Multiple instances need a shared store for a consistent global limit. This is not a bot-prevention system.
4. **Tracking scope:** Events are tied to confirmed browser capture, not visits. Browser blockers or navigation/network loss can still prevent provider receipt. Direct-calendar bookings are a different conversion and should be measured from verified booking events.
5. **Work-example links:** Make it clearer which examples open detailed work and which explain an application. Add direct links when a real, approved project page exists; do not turn concept imagery into implied client proof.
6. **Verified proof:** Add concise project examples with approved client identity, scope, original media, and independently supported outcomes. Keep concept imagery labeled as concept work.
7. **Copy:** The capability introductions and Demand Loop explanation repeat some themes. A separate editorial pass could shorten them while keeping each service specific. This repair does not rewrite the current positioning.
8. **Maintainability:** Shared cursor rules and booking code are consolidated. The large legacy homepage stylesheet still contains historical overrides; a broader cleanup should be staged independently with screenshot comparisons.

## Calendar description — draft for separate approval

> A 30-minute conversation about your business, what is working now, and the priority you want to move forward. We’ll identify the most useful next step across media, campaigns, web, or business systems. Choose a time below.

This replaces the internal setup notes identified in the earlier audit. It is a **draft only**; the live GHL calendar description has not been edited.

## Review and release boundary

Review the patch and screenshots against baseline `7b162b8`, then approve the visual result. Publishing, changes to the live calendar description, and real provider-delivery checks remain separate actions. The original dirty checkout and copied untracked assets have been preserved.
