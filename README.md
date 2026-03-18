# Rushes Media Site

This project contains:

- `index.html` (main local page)
- `rushes-media.html` (alternate page variant)
- `RushesMediaSite.jsx` (Framer component version)

## Run locally (recommended)

This site is static, so you only need a local HTTP server.

```bash
cd "/Users/evanotoole/Documents/site"
python3 -m http.server 8080
```

Then open:

- `http://localhost:8080/index.html`
- `http://localhost:8080/rushes-media.html`

## Optional formatting tool

If you want formatting support, create a virtual environment and install the dependency:

```bash
cd "/Users/evanotoole/Documents/site"
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

The JSX file can be formatted with:

```bash
source .venv/bin/activate
js-beautify -r -t -s 2 "RushesMediaSite.jsx"
```

## Framer component note

`RushesMediaSite.jsx` is designed for Framer and imports `addPropertyControls` from `framer`, so it is meant to be pasted into a Framer code file rather than run directly in this static site folder.
