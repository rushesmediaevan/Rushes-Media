# SEO/GEO implementation — September 7, 2026

## Scope and acceptance criteria

Outcome: prepare a validated, reviewable change set for the current public site with consistent broad-company wording, a useful Web & Landing FAQ, and a measured mobile-performance diagnosis/fix where justified.

Base: `origin/main` at `817b6d0`. Isolated branch: `codex/seo-geo-20260907`. The canonical checkout contains unrelated in-progress changes and is not edited.

Implementation plan:
1. Correct the narrow Brand Media note in `src/pages/llms.txt.ts`; preserve actual service details, contact information, and geography. Verify generated text.
2. Add a factual website-versus-landing-page answer in `src/data/capability-pages.ts`; use its existing FAQ/schema rendering. Verify visible answer and JSON-LD agree.
3. Capture an independent mobile Lighthouse baseline, inspect resource/LCP evidence, and change only supported bottlenecks. Preserve hero artwork, motion controls, navigation, layout, booking behavior, and reduced-motion behavior.
4. Run Astro checks, unit tests, production build/contracts/smoke checks and browser QA at desktop and 390px. No real form submissions. Record measured limits; simulated testing is not physical-device proof.

Existing Okara PR #1 remains separate and unmerged. No deployment, tracker mutation, outreach, or live setting changes are included.

## Results

### Implemented

- `llms.txt`: replace the contractor/hardscape-only Brand Media note with owner-led-business wording and explicit standalone availability. No new claims about AI citations.
- `/web/`: add a website-versus-landing-page FAQ. Existing rendering generates both the visible answer and matching FAQPage JSON-LD. No title/description rewrite or invented engagement policy.
- Homepage: preload the existing still background as well as the existing video poster. They are different files. The live trace identified `section#hero` as LCP, with its still image discovered after CSS.
- Shared layout: fetch Google Fonts CSS using a style preload, then apply it on load; retain a normal stylesheet in `noscript`. Existing fonts, font-display behavior, and all first-party layout CSS remain intact. This permits a brief fallback-font interval; no layout shift appeared in the measured runs.
- Update the existing built contract to enforce broad Brand Media wording and the still-image preload. The old contract explicitly required `high-end contractors`.

### Independent performance evidence

Lighthouse 13.4.1, default simulated mobile profile, separate headless Chrome runs. Recorded September 7 local time (September 8 UTC). The full local JSON reports are retained alongside this file but ignored by Git.

| Run | Performance | FCP | LCP | CLS |
| --- | ---: | ---: | ---: | ---: |
| Live before, 02:26:34 UTC | 67 | 3.047s | 9.122s | 0 |
| Local before, 02:27:15 UTC | 74 | 3.224s | 5.334s | 0 |
| Local after, 02:28:47 UTC | 83 | 1.956s | 4.357s | 0 |
| Local confirmation, 02:30:46 UTC | 84 | 1.804s | 4.354s | 0 |

Use the local before/after comparison to assess this patch. Live and localhost differ in transport and analytics behavior and are not interchangeable. These are lab simulations, not CrUX or actual visitor outcomes. LCP improved locally but remains above 2.5s; this patch does not claim to finish all performance optimization or improve rankings/citations.

The live run identified the still background `hero-night-city-poster.jpg` (184,263 resource bytes), not the Open Graph image. The pre-existing video poster is `hero-night-city-video-poster-665c792f.jpg` (43,621 bytes). Google Fonts CSS was also reported as render blocking. No blanket CSS deferral or hero-media replacement was applied.

### Validation

- Node 22.23.1; Astro check: zero errors/warnings (23 informational hints, including existing CommonJS hints and inline handler analysis).
- All 41 unit tests passed.
- Production build passed. Built contract: 8 sitemap routes, 13 GA4-tagged public pages, FAQ/schema parity, review routes excluded.
- Production and development smoke tests passed.
- Browser: homepage reviewed at 390px and 1440px; native mobile menu opens/closes with correct expanded state; new FAQ expands and reads correctly.
- Homepage, all five core service pages, privacy, and terms: no horizontal overflow at 390px.
- JavaScript-disabled Web page: `noscript` font stylesheet present, fonts loaded, no horizontal overflow.
- Reduced-motion homepage: video paused, still fallback active, control labeled Play background video. Emulation overrides reset afterward.
- Browser console checked on homepage: no warnings/errors. Local calendar uses its existing direct-link/email fallback; no real booking or form submission performed.
- `git diff --check` passed.

### Review and limits

Local preview: http://localhost:4387/web/ . Screenshots: `home-mobile.png`, `home-desktop.png`, `web-faq-mobile.png`.

Nothing deployed or pushed. Okara PR #1 remains open/unmerged and is not incorporated; its description edit is optional editorial work, not a demonstrated growth fix. GEO prompt saving/baseline completion is not verified from this workspace. No claims of physical iOS/Android testing, restored Okara tools, new citations, or improved revenue.

After approval and release, remeasure the production site under the same Lighthouse profile and assess GSC/GA4 and saved GEO prompts over consistent reporting periods. Preserve the current site's dirty checkout when integrating this branch.
