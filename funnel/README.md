# Rushes niche landing pages + speed-to-lead

Config-driven acquisition LPs for Rushes Media ads. **No GHL** — form posts to a small Node handler that emails Evan, auto-replies to the lead, appends to `data/leads/`, and optionally texts via Twilio.

**Blueprint:** `website/rushes-media-hardscape-lp-v1.md` · **Offer:** `offers/rushes-media-offer-ladder.md` §2–3

---

## Clone a new niche (no code changes)

1. Copy `funnel/niches/hardscape.json` → `funnel/niches/<your-niche>.json`
2. Edit copy, `id`, `slug`, and `urlPath` (must match JSON filename)
3. Add `website/<slug>/index.html` — copy `website/hardscape/index.html` and set `window.__RUSHES_NICHE_ID__ = '<slug>'`
4. Restart the site server — niche is live at `https://rushesmedia.com/<slug>/`

Optional: use `https://rushesmedia.com/funnel/?niche=<slug>` without the stub folder (query param only).

---

## Run locally

From **repo root** (not inside `website/` — lead handler lives in `scripts/`):

```bash
npm install
npm run site
```

- Main site: http://127.0.0.1:3000/
- Hardscape LP: http://127.0.0.1:3000/hardscape/
- Health: http://127.0.0.1:3000/api/health

**Production:** Railway currently runs `python3 -m http.server` on `website/` only — **lead capture will not work until start command uses Node** (`node ../scripts/serve-rushes-site.js` from repo root, or deploy lead API separately). Static HTML can still be served; form submit needs the API.

---

## Environment variables (repo-root `.env` only — never commit)

| Variable | Required | Purpose |
|----------|----------|---------|
| `LEAD_ALERT_EMAIL` | For email alerts | Evan inbox for new leads |
| `SMTP_HOST` | For email | e.g. `smtp.gmail.com` |
| `SMTP_PORT` | For email | Usually `587` |
| `SMTP_USER` | For email | SMTP login |
| `SMTP_PASS` | For email | App password |
| `SMTP_FROM` | For email | From address (often same as user) |
| `EVAN_PHONE` or `LEAD_ALERT_PHONE` | Optional | SMS alert to Evan |
| `TWILIO_ACCOUNT_SID` | Optional | SMS when all three Twilio vars set |
| `TWILIO_AUTH_TOKEN` | Optional | |
| `TWILIO_FROM_NUMBER` | Optional | E.164, e.g. `+15551234567` |
| `LEADS_DATA_DIR` | Optional | Default: `data/leads/` at repo root |
| `LEAD_RATE_LIMIT_MAX` | Optional | Default `5` per IP per hour |
| `RUSHES_SITE_PORT` | Optional | Default `3000` |

When Twilio or SMTP is unset, the handler **logs a no-op** and still stores the lead.

---

## Manual test (end-to-end)

1. `npm run site`
2. Open http://127.0.0.1:3000/hardscape/ — confirm hero, mechanism, proof slots say **pending** (no fake stats)
3. Resize to ~390px width — form readable, CTA visible
4. Submit the form with test data (use a real email you can check if SMTP is configured)
5. Confirm:
   - Redirect to `/thanks/?niche=hardscape`
   - New line in `data/leads/leads.jsonl` and row in `data/leads/leads.csv`
   - Console shows SMTP/Twilio skip or success (no crash)
6. `curl -s http://127.0.0.1:3000/api/health` → lists `hardscape` in niches

**Automated smoke (store only, no email):**

```bash
node scripts/test-lead-submit.js
```

---

## Form contract

`POST /api/lead` · `Content-Type: application/json`

```json
{
  "niche": "hardscape",
  "name": "Jane Owner",
  "business": "Example Hardscape LLC",
  "phone": "8565550100",
  "email": "jane@example.com",
  "need": "Slow follow-up from job site",
  "website": "",
  "source_url": "http://127.0.0.1:3000/hardscape/",
  "calendarUrl": ""
}
```

- Honeypot: non-empty `website` → silent 200 (spam)
- Rate limit: 5 POSTs / IP / hour (default)

---

## Files

| Path | Role |
|------|------|
| `funnel/niches/*.json` | Niche copy + structure |
| `funnel/index.html` | Shell (query `?niche=`) |
| `funnel/funnel.js` | Render + submit |
| `funnel/funnel.css` | Rushes brand styles |
| `../hardscape/index.html` | Pretty URL for first niche |
| `../../scripts/serve-rushes-site.js` | Static + API |
| `../../scripts/lib/rushes-leads/` | Store, notify, validate |

---

## Proof slots

Do **not** add metrics or testimonials in JSON until client-reported data exists. Use `status: "pending"` and honest copy per `knowledge/niches/landscaping-hardscaping-WEDGE.md` §9.
