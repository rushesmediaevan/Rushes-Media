import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  COMPATIBILITY_FILES,
  HERO_VIDEO_URL,
  PUBLIC_ASSET_FILES,
  REDIRECT_ROUTES,
  REVIEW_ASSET_FILES,
  REVIEW_COMPATIBILITY_FILES,
  SITE_CONTRACT,
} from './site-contract.mjs';

export const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export async function reservePort() {
  const server = createServer();
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });
  const address = server.address();
  const port = typeof address === 'object' && address ? address.port : null;
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
  assert.ok(port, 'Could not reserve a local smoke-test port.');
  return port;
}

export function credentialFreeEnv(extra = {}) {
  const environment = { ...process.env, ...extra };
  for (const variable of [
    'RUSHES_GHL_PIT_TOKEN',
    'RUSHES_GHL_LOCATION_ID',
    'PLAYBOOK_GHL_B64',
  ]) {
    delete environment[variable];
  }
  environment.ASTRO_TELEMETRY_DISABLED = '1';
  return environment;
}

export function spawnCaptured(command, args, options = {}) {
  const child = spawn(command, args, {
    cwd: projectRoot,
    stdio: ['ignore', 'pipe', 'pipe'],
    ...options,
  });
  const output = { value: '' };
  child.stdout.on('data', (chunk) => { output.value += chunk; });
  child.stderr.on('data', (chunk) => { output.value += chunk; });
  return { child, output };
}

export async function waitForReady(origin, child, output) {
  for (let attempt = 0; attempt < 120; attempt += 1) {
    if (child.exitCode !== null) {
      throw new Error(`Server exited before it became ready (${child.exitCode}).\n${output.value}`);
    }
    try {
      const response = await fetch(`${origin}/`);
      if (response.ok) return;
    } catch {
      // The local server may still be starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`Server did not become ready.\n${output.value}`);
}

export async function stopChild(child) {
  if (child.exitCode !== null) return;
  const exited = new Promise((resolve) => child.once('exit', resolve));
  child.kill('SIGTERM');
  await Promise.race([
    exited,
    new Promise((resolve) => setTimeout(resolve, 2000)),
  ]);
  if (child.exitCode === null) {
    child.kill('SIGKILL');
    await Promise.race([
      exited,
      new Promise((resolve) => setTimeout(resolve, 2000)),
    ]);
  }
}

export async function expectResponse(origin, route, expectedStatus, init = {}) {
  const response = await fetch(`${origin}${route}`, { redirect: 'manual', ...init });
  assert.equal(
    response.status,
    expectedStatus,
    `${init.method || 'GET'} ${route}: expected ${expectedStatus}, received ${response.status}`,
  );
  return response;
}

async function assertContentRoutes(origin, includeReviewRoutes) {
  const contentRoutes = SITE_CONTRACT.filter((entry) =>
    ['generated', 'compatibility'].includes(entry.owner) ||
      (includeReviewRoutes && entry.owner === 'review-only'),
  );
  assert.equal(
    contentRoutes.length,
    includeReviewRoutes ? 18 : 17,
    `The smoke matrix must cover ${includeReviewRoutes ? 18 : 17} content routes.`,
  );

  for (const route of contentRoutes) {
    const response = await expectResponse(origin, route.path, 200);
    const html = await response.text();
    assert.match(response.headers.get('content-type') || '', /text\/html/);
    if (route.title) {
      assert.ok(
        html.includes(route.title) || html.includes(route.title.replaceAll('&', '&amp;')),
        `${route.path} is missing its contracted title.`,
      );
    }
  }

  const queryRoute = await expectResponse(origin, '/call/?utm_source=smoke', 200);
  assert.match(await queryRoute.text(), /Your Growth Call/);
  await expectResponse(origin, '/call/teleprompter.html', includeReviewRoutes ? 200 : 404);
  await expectResponse(origin, '/work/', includeReviewRoutes ? 200 : 404);
}

async function assertAssets(origin, includeReviewRoutes) {
  const assetPaths = [
    ...PUBLIC_ASSET_FILES.map((file) => `/${file}`),
    ...COMPATIBILITY_FILES.filter((file) => !file.endsWith('index.html')).map((file) => `/${file}`),
    ...(includeReviewRoutes ? REVIEW_ASSET_FILES.map((file) => `/${file}`) : []),
    ...(includeReviewRoutes
      ? REVIEW_COMPATIBILITY_FILES.filter((file) => !file.endsWith('index.html')).map(
          (file) => `/${file}`,
        )
      : []),
    '/robots.txt',
    '/sitemap.xml',
  ];
  for (const assetPath of new Set(assetPaths)) {
    await expectResponse(origin, assetPath, 200);
  }

  for (const excludedPath of [
    '/README.md',
    '/funnel/README.md',
    '/CURSOR-BUILD-niche-lp-speed-to-lead.md',
    '/rushes-media-hardscape-lp-v1.md',
    '/inquire/form.js',
    '/book/index.html',
    ...(!includeReviewRoutes
      ? REVIEW_ASSET_FILES.map((file) => `/${file}`)
      : []),
  ]) {
    await expectResponse(origin, excludedPath, 404);
  }
}

async function assertRedirects(origin) {
  for (const route of REDIRECT_ROUTES) {
    const response = await expectResponse(origin, route.path, route.redirectStatus);
    assert.equal(response.headers.get('location'), route.redirectTo);
  }
}

async function assertApiNegatives(origin) {
  const health = await expectResponse(origin, '/api/health', 503);
  assert.deepEqual(await health.json(), { ok: false, ghlConfigured: false });

  for (const endpoint of ['/api/lead', '/api/playbook-capture']) {
    const response = await expectResponse(origin, endpoint, 204, { method: 'OPTIONS' });
    assert.equal(response.headers.get('access-control-allow-origin'), '*');
    assert.equal(response.headers.get('access-control-allow-methods'), 'POST, OPTIONS');
    assert.equal(response.headers.get('access-control-allow-headers'), 'Content-Type');
  }

  const malformed = await expectResponse(origin, '/api/lead', 400, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': '192.0.2.10' },
    body: '{',
  });
  assert.deepEqual(await malformed.json(), { ok: false, error: 'Invalid body' });

  const unsupported = await expectResponse(origin, '/api/playbook-capture', 400, {
    method: 'POST',
    headers: { 'content-type': 'text/plain' },
    body: 'not a supported body',
  });
  assert.deepEqual(await unsupported.json(), { ok: false, error: 'Invalid body' });

  const malformedPlaybook = await expectResponse(origin, '/api/playbook-capture', 400, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': '192.0.2.12' },
    body: '{',
  });
  assert.deepEqual(await malformedPlaybook.json(), { ok: false, error: 'Invalid body' });

  const unsupportedLead = await expectResponse(origin, '/api/lead', 400, {
    method: 'POST',
    headers: { 'content-type': 'text/plain', 'x-forwarded-for': '192.0.2.13' },
    body: 'not a supported body',
  });
  assert.deepEqual(await unsupportedLead.json(), { ok: false, error: 'Invalid body' });

  const leadWithoutCredentials = await expectResponse(origin, '/api/lead', 500, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': '192.0.2.11' },
    body: JSON.stringify({ name: 'Smoke Test', email: 'safe@example.test', phone: '6095550100' }),
  });
  assert.deepEqual(await leadWithoutCredentials.json(), { ok: false, error: 'Server error' });

  const playbookWithoutCredentials = await expectResponse(origin, '/api/playbook-capture', 500, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      firstName: 'Smoke',
      email: 'safe@example.test',
      businessType: 'Home services / trades',
      mainGoal: 'More calls / estimates',
      src: 'ig-growth',
    }),
  });
  assert.deepEqual(await playbookWithoutCredentials.json(), { ok: false, error: 'Server error' });

  await expectResponse(origin, '/api/health', 405, { method: 'POST' });
  await expectResponse(origin, '/api/lead', 404);
  await expectResponse(origin, '/api/playbook-capture', 404);

  for (let attempt = 0; attempt < 5; attempt += 1) {
    await expectResponse(origin, '/api/lead', 400, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-forwarded-for': '198.51.100.77' },
      body: '{',
    });
  }
  const limited = await expectResponse(origin, '/api/lead', 429, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': '198.51.100.77' },
    body: '{',
  });
  assert.deepEqual(await limited.json(), { ok: false, error: 'rate_limit' });
}

async function assertHttpFailures(origin) {
  await expectResponse(origin, '/this-route-should-not-exist', 404);
  await expectResponse(origin, '/this-route-should-not-exist', 404, { method: 'HEAD' });
  await expectResponse(origin, '/%E0%A4%A', 400);
  await expectResponse(origin, '/', 405, { method: 'PATCH' });
}

async function assertByteRanges(origin) {
  const route = HERO_VIDEO_URL;
  await expectResponse(origin, route, 405, { method: 'PATCH' });
  await expectResponse(origin, route, 405, { method: 'POST' });
  const head = await expectResponse(origin, route, 200, { method: 'HEAD' });
  const total = Number(head.headers.get('content-length'));
  assert.ok(Number.isInteger(total) && total > 16, 'Video must expose a positive Content-Length.');
  assert.equal(head.headers.get('accept-ranges'), 'bytes');

  const valid = await expectResponse(origin, route, 206, {
    headers: { range: 'bytes=0-15' },
  });
  assert.equal(valid.headers.get('content-length'), '16');
  assert.equal(valid.headers.get('content-range'), `bytes 0-15/${total}`);
  assert.equal(valid.headers.get('accept-ranges'), 'bytes');
  assert.equal((await valid.arrayBuffer()).byteLength, 16);

  const invalid = await expectResponse(origin, route, 416, {
    headers: { range: `bytes=${total}-` },
  });
  assert.equal(invalid.headers.get('content-range'), `bytes */${total}`);
}

export async function assertSiteContract(origin, { includeReviewRoutes = false } = {}) {
  await assertContentRoutes(origin, includeReviewRoutes);
  await assertAssets(origin, includeReviewRoutes);
  await assertRedirects(origin);
  await assertApiNegatives(origin);
  await assertHttpFailures(origin);
  await assertByteRanges(origin);
}
