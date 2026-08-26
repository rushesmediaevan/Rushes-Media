# Rushes Media Site

The Rushes marketing site uses Astro for the homepage, nine service/industry pages, and the privacy/terms pair. The Node server serves the built site and continues to own lead-capture APIs and production redirects. Approved legacy pages remain on an explicit compatibility layer.

## Requirements

- Node.js 22.12 or newer in the Node 22 release line
- npm

With nvm installed:

```bash
nvm use
npm ci
```

## Develop locally

```bash
npm run dev
```

Astro prints the local preview URL, normally `http://localhost:4321/`. The dev command starts the Node backend on a temporary local port, proxies API and redirect routes, and stages the local-review-only `/work/` and teleprompter pages. Those two pages are deliberately excluded from release builds.

## Validate

```bash
npm test
```

This runs Astro checks, isolated Node tests, the production build, built-contract assertions, a production-server smoke, and an Astro-development smoke. Credential variables are removed during HTTP failure tests, so validation never sends a successful GHL capture.

## Production shape

```bash
npm run build
npm start
```

`server.js` requires and serves `dist/`; it never falls back to the legacy project root. It also handles `/api/lead`, `/api/playbook-capture`, `/api/health`, and the redirect routes. `/api/health` returns `503` unless the production GHL location and token are both configured. Railway detects the multi-stage Dockerfile, runs the full suite under Node 22.23.1, and copies only runtime files into the final image.

## Migration rule

The route contract in `scripts/site-contract.mjs` controls Astro ownership, compatibility staging, redirects, sitemap membership, analytics expectations, assets, and tests. Keep backend-only modules in `lib/`. The root `index.html` remains an inert legacy fixture and is never served in production.
