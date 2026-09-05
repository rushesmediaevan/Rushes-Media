// Local-only browser fixture. No capture endpoints or external services.
// Run after npm run build: node qa/audit-2026-09-05/browser-harness.mjs
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve('dist');
const origin = 'http://127.0.0.1:4191';
http.createServer(async (req, res) => {
  if (req.method !== 'GET') { res.writeHead(405); res.end(); return; }
  const url = new URL(req.url, origin);
  if (url.pathname === '/api/health') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ ok: true, ghlConfigured: true })); return;
  }
  if (url.pathname === '/calendar') {
    res.setHeader('Content-Type', 'text/html');
    res.end('<!doctype html><html lang="en"><title>Mock calendar</title><body><h1>Mock calendar — no bookings</h1><button>First calendar control</button><button>Last calendar control</button><script>setTimeout(() => parent.postMessage("[iFrameResizerChild]Ready", location.origin), 9000);</script></body></html>');
    return;
  }
  try {
    let file = path.resolve(root, '.' + decodeURIComponent(url.pathname));
    if (!file.startsWith(root + path.sep) && file !== root) throw Error('Outside root');
    if ((await fs.stat(file)).isDirectory()) file = path.join(file, 'index.html');
    let content = await fs.readFile(file);
    const ext = path.extname(file);
    if (ext === '.html') content = Buffer.from(content.toString().replaceAll('https://api.leadconnectorhq.com/widget/booking/1GUofnPSyYefy2VOSxKO', origin + '/calendar'));
    res.setHeader('Content-Type', ({ '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.png': 'image/png', '.woff2': 'font/woff2', '.mp4': 'video/mp4' })[ext] || 'application/octet-stream');
    res.end(content);
  } catch { res.writeHead(404); res.end('Not found'); }
}).listen(4191, '127.0.0.1', () => console.log('Local mock calendar fixture: ' + origin));
