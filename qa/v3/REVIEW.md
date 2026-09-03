# Rushes Media website v3 — review

Not pushed. Not deployed.

Worktree: `/Users/evanotoole/Documents/rushes-website-v3-2026-09-03`  
Branch: `cursor/website-v3-2026-09-03`  
Base: `origin/main` @ `567fe2fca8642682ff14f5cc488e1e9f68739d7f`  
Commit: the single commit on this branch (`feat(site): v3 — converged homepage and capability pages`). SHA is recorded after commit in the controller report.

Live (`origin/main` @ `567fe2f` on Railway) and the canonical dirty checkout (`/Users/evanotoole/Documents/rushes-os/website`) were not touched.

## Heights

| Surface | Width | scrollHeight | Gate |
|---|---|---|---|
| Homepage | 1440 | **6995 px** | ≤ 7000 |
| Homepage | 390 | **12602 px** | report only |
| Brand Media | 1440 | **4243 px** | ~4200 |

## npm test

**Green** on Node 22.23.1 (`nvm use 22.23.1 && npm test`):

- `astro check` — 0 errors
- 16 unit tests — pass
- build — 13 pages
- contract — 13 sitemap routes; homepage JS 14954/15360; review routes excluded
- smoke-built — pass
- smoke-dev — pass

## qa:site

**Green. No blocking failures.** Zero overflow at 320/375/390/414/768/1024/1440. Zero axe critical/serious on all twelve routes at 390 and 1440. Console only the known local BookingWidget `/api/health` 503.

Command (from OS, Node 22.23.1):

```
npm run qa:site -- --url http://127.0.0.1:4373 --routes /,/brand-media/,/campaigns/,/web/,/follow-up/,/demand-loop/,/industries/,/outdoor-living/,/hvac/,/med-spa/,/privacy/,/terms/ --out /Users/evanotoole/Documents/rushes-website-v3-2026-09-03/qa/site-qa-v3-2026-09-03
```

Report: `qa/site-qa-v3-2026-09-03/REPORT.md`

## Homepage section table

| Section | Production | A | B | v3 decision |
|---|---|---|---|---|
| Hero | Night-flight, “Media done right.”, Growth Call, secondary link, locked three-beat | New three-beat attempt | New three-beat attempt | **Production.** `Content → Attention · Systems → Conversion · Follow-up → Compounding`. Hero/Header files unchanged. Gold CTA contrast forced in post-lock CSS only. |
| Marquee | Present | Present | Present | **Production.** Contract requires `marquee-wrap`. |
| Opportunity | “Make the value of a strong business unmistakable” | Jumped to services | Jumped to services | **Production wording, tightened rhythm.** Directly after hero. Spacing/pull only. |
| Services head | “What we build” cards | Large Cormorant chapters, too tall | Sticky left rail + denser chapters | **A composition at B density.** No sticky rail. ~30% tighter; no chapter taller than one 1440×900 viewport. |
| Brand Media chapter | Card | Three-frame film | Rail-linked chapter | **A’s three-frame film, one row** (mill / bakery / restaurant). |
| Creative Campaigns | Card | One-idea three-crops | Similar, less condensed | **A’s three-crop strip**, condensed. Same submerged still. |
| Web chapter | Card + later mock-up in A/B | Fake browser / restaurant site | Same mock-up problem | **Cut every mock-up.** Daylit carriage-house venue. `data-slot="web-proof"` reserved for a real screenshot later. |
| AI & Business Systems | Card | Strong direction, slightly confusing | Weaker | **A’s object + expert copy.** Repeatable line: “Inquiries get captured, routed, answered, and kept moving.” Four beats (capture / route / respond / keep moving) with one example each. Deterministic SVG diagram. No AI people, dashboards, or tool shots. Capability, not “every business is broken.” |
| Demand Loop | Five-stage strip, “Build more demand. Make the business easier to run.” | Missing / “selected applications” first | “How the work can connect” blank band | **Production form, refined.** Tighter labels, one link to `/demand-loop/`. A’s connect band and B’s version **cut**. |
| Examples | Industry examples | Selected applications mosaic (liked) | Messy connect copy | **Loop first, then A’s mosaic.** Tiles deep-link to industry pages. |
| How the work can connect | n/a | Blank sentence band | Horribly labeled Demand Loop | **Cut.** |
| Process | Three steps | Similar | Similar | **Production, shortened.** |
| FAQ | Production FAQs | Longer | Longer | **Production, shortened.** |
| Booking | GHL widget | Duplicate CTAs | Duplicate CTAs | **Production.** Placeholder ≤ 600px. No extra Growth Call in page heroes. |
| Footer | In-site + legal | — | — | In-site Privacy/Terms with visible underline. |

## Brand Media section table

| Section | Production | A | B | v3 decision |
|---|---|---|---|---|
| Opening | Two-image, “Make what sets you apart visible.” | Full-bleed terrace (bad quality) | TOC / awkward UI | **Production two-image opening.** Coastal + med-spa. Not A’s terrace hero. Not B’s TOC. |
| Hero CTA | Growth Call in page hero | Same | Same | **Cut.** Header already has it. Headline + paragraph + “See the work” only. |
| Body | Live wording stronger in places; weak “What strong media makes visible” block; too long | Eight-answer structure, better length | Better phrasing in spots; “realistic example” | **A/B eight-answer structure with production lines.** Rebuilt “What strong media makes visible” inside the answers. |
| A realistic example | Absent / live variants | Present | Present | **Cut.** |
| Concept visualization captions | Present on some figures | Present | Present | **Cut from capability pages.** One footer line: “Some scenes are Rushes concept imagery, not client work.” |
| What owners want to ask | Present | Present | Present | **Kept.** |
| A strong starting point | Present (live) | — | — | **Cut.** |
| What you receive | Present (live) | — | — | **Cut.** |
| Length | Far too long | ~A/B length | ~A/B length | **4243 px at 1440.** |

This Brand Media template is the capability pattern for `/campaigns/`, `/web/`, `/follow-up/`, and `/demand-loop/` (each with its own two-image opening). Demand Loop keeps the five-stage strip plus `id="loop-stage-N"`.

## Industry routes

`/industries/`, `/outdoor-living/`, `/interior-design/`, `/hvac/`, `/med-spa/` stay generated, indexable, and in the sitemap. `/hardscape*` and `/pools*` keep redirects to `/outdoor-living/`. Removed from **primary nav only**. No 301s to `/#examples`. Started from `origin/main`, so `2c4b8fa` industry 301s were never applied.

Primary nav everywhere: Services → `/#services` · How It Works → `/demand-loop/` · Examples → `/#examples` · Book a Growth Call. Mobile label “Menu”.

## Imagery

Inbox checked at start and before final QA: `/Users/evanotoole/Documents/rushes-os/rushes-content/website-imagery-2026-09-02/inbox/` — **empty both times**. No new Evan images. No generations. No `MANIFEST.csv` rows.

| Slot | Asset used |
|---|---|
| Homepage Brand film | riverside mill, bakery, restaurant |
| Homepage Campaigns | campaigns-submerged ×3 crops |
| Homepage Web | `06-daylit-venue` (`data-slot="web-proof"`) |
| Homepage examples | outdoor, interior, HVAC, med-spa |
| Brand Media opening | coastal terrace + med-spa |
| Campaigns opening | submerged + bakery |
| Web opening | daylit + mill |
| Follow-up opening | restaurant + interior |
| Demand Loop opening | outdoor + HVAC |
| AI chapter | SVG/CSS diagram in site tokens (no plate beat it) |

### Unfilled slots

| Slot | Why empty | Crop spec when Evan supplies |
|---|---|---|
| Homepage / `/web/` real screenshot | No client site shot in inbox; mock-ups forbidden | Desktop 16:9 @ 2400w, mobile 4:5 @ 1200w. Drop into `data-slot="web-proof"` without layout change. |
| Campaign / ad proof set | Deferred until more built ads exist | Same crop spec; replace the three-crop strip sources. |
| AI plate | Inbox empty; diagram is the ship visual | Desktop 16:9 @ 2400w, mobile 4:5 @ 1200w. No people, faces, hands, logos, screens, or dashboards. |

`web-law-office` files remain in public/HOMEPAGE_ASSETS so the 36-derivative unit contract still holds. They are not referenced in homepage HTML.

## `scripts/site-contract.mjs`

**Not a route-ownership change.** Industry routes, sitemap membership, and Demand Loop-first inner-route order are unchanged from `origin/main`.

Lines that did change (asset lists only):

- Homepage `requiredAssets` (~154–167): HTML refs dropped unused law-office/coastal; added bakery, restaurant, daylit venue, and industry example tiles.
- `/demand-loop/` `extraAssets` (~304–311): opening pair (outdoor + HVAC) + brand-media.css. Demand Loop stays first in the inner-route array (sitemap order).
- `/brand-media/`, `/campaigns/`, `/web/`, `/follow-up/` `extraAssets`: two-image openings for the capability template.

`HOMEPAGE_BROWSER_ASSET_FILES` still lists all 36 homepage derivatives, including unused law-office files.

## Screenshots

Before = live `rushesmedia.com` @ `567fe2f`. After = this build at `http://127.0.0.1:4373`. Viewport pairs: 1440×900 and 390×844.

`qa/v3/screenshots/{route}-{width}-{before|after}.png` for:

`home`, `brand-media`, `campaigns`, `web`, `follow-up`, `demand-loop`, `industries`, `outdoor-living`, `hvac`, `med-spa`, `privacy`, `terms`.

qa:site also writes the after set at seven widths under `qa/site-qa-v3-2026-09-03/`.

## Protected files

`server.js`, `/api/*`, `railway.json`, `Dockerfile`, and `BookingWidget.astro` are byte-identical to `origin/main`. Homepage CSS lock prefix and Hero/Header files were not edited.

## Start the preview

```
cd /Users/evanotoole/Documents/rushes-website-v3-2026-09-03
nvm use 22.23.1
PORT=4373 HOST=127.0.0.1 node server.js
```

Open `http://127.0.0.1:4373/` and this file.
