#!/usr/bin/env node
/**
 * Rushes site — static files + PLAYBOOK capture API.
 * Railway: set RUSHES_GHL_PIT_TOKEN + RUSHES_GHL_LOCATION_ID in service env.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { capturePlaybookLead, loadGhlConfig } = require('./lib/playbook-capture');

const ROOT = __dirname;
const PORT = Number(process.env.PORT || 3000);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

function parseBody(req, raw) {
  const ct = req.headers['content-type'] || '';
  if (ct.includes('application/json')) {
    try {
      return JSON.parse(raw || '{}');
    } catch {
      return null;
    }
  }
  if (ct.includes('application/x-www-form-urlencoded')) {
    return Object.fromEntries(new URLSearchParams(raw));
  }
  return null;
}

function sendJson(res, status, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
  });
  res.end(body);
}

function resolveFile(urlPath) {
  const safe = decodeURIComponent(urlPath.split('?')[0]);
  let filePath = path.join(ROOT, safe);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (!filePath.startsWith(ROOT)) return null;
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) return null;
  return filePath;
}

function serveStatic(req, res) {
  const urlPath = req.url === '/' ? '/index.html' : req.url;
  const filePath = resolveFile(urlPath);
  if (!filePath) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
    return;
  }
  const ext = path.extname(filePath).toLowerCase();
  const stat = fs.statSync(filePath);
  const lastModified = stat.mtime.toUTCString();
  const headers = {
    'Content-Type': MIME[ext] || 'application/octet-stream',
    // HTML revalidates every visit; assets cache for a week
    'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=604800',
    'Last-Modified': lastModified,
    'Accept-Ranges': 'bytes',
  };

  if (req.headers['if-modified-since'] === lastModified) {
    res.writeHead(304, headers);
    res.end();
    return;
  }

  // Byte-range support — Safari won't play <video> without it
  const range = req.headers.range && /^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
  if (range && (range[1] || range[2])) {
    let start = range[1] ? parseInt(range[1], 10) : stat.size - parseInt(range[2], 10);
    let end = range[1] && range[2] ? parseInt(range[2], 10) : stat.size - 1;
    if (Number.isNaN(start) || Number.isNaN(end) || start < 0 || start > end || start >= stat.size) {
      res.writeHead(416, { 'Content-Range': `bytes */${stat.size}` });
      res.end();
      return;
    }
    end = Math.min(end, stat.size - 1);
    res.writeHead(206, {
      ...headers,
      'Content-Range': `bytes ${start}-${end}/${stat.size}`,
      'Content-Length': end - start + 1,
    });
    if (req.method === 'HEAD') { res.end(); return; }
    fs.createReadStream(filePath, { start, end }).pipe(res);
    return;
  }

  res.writeHead(200, { ...headers, 'Content-Length': stat.size });
  if (req.method === 'HEAD') { res.end(); return; }
  fs.createReadStream(filePath).pipe(res);
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS' && req.url === '/api/playbook-capture') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    res.end();
    return;
  }

  if (req.method === 'GET' && req.url === '/api/health') {
    const { loc, token } = loadGhlConfig();
    sendJson(res, 200, {
      ok: true,
      ghlConfigured: Boolean(loc && token),
    });
    return;
  }

  if (req.method === 'POST' && req.url === '/api/playbook-capture') {
    try {
      const raw = await readBody(req);
      const body = parseBody(req, raw);
      if (!body) {
        sendJson(res, 400, { ok: false, error: 'Invalid body' });
        return;
      }
      const result = await capturePlaybookLead(body);
      sendJson(res, result.ok ? 200 : 400, result);
    } catch (err) {
      console.error('playbook-capture error:', err.message);
      sendJson(res, 500, { ok: false, error: 'Server error' });
    }
    return;
  }

  if (req.method === 'GET' || req.method === 'HEAD') {
    serveStatic(req, res);
    return;
  }

  res.writeHead(405, { 'Content-Type': 'text/plain' });
  res.end('Method not allowed');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Rushes site listening on 0.0.0.0:${PORT}`);
});
