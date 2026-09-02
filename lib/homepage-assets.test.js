const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
const test = require('node:test');

const manifest = require('../scripts/homepage-assets-manifest.json');
const projectRoot = path.resolve(__dirname, '..');
const assetRoot = path.join(projectRoot, 'assets/images/homepage');
const registryPath = path.join(projectRoot, 'src/data/homepage-assets.ts');

const sourceAndCropHashes = [
  '5e8f193589f169c8a619e99aad018a316d95807ff021b1bfc448eeab26306f06',
  'dcf2ecde49363212be06e4d54757f7e700186ea828940e337926c1a5e323c224',
  '90740ebd3146b099cc9b19d83785157c849bff8ef789fb573b048dd8c44889a4',
  'd89710bac0e593ad4b7aba146e92ca9537347fa8d8478cd3f57f011f1774aaf3',
  '3d194105fec7d71bd1d466ecb51efed1f80ad3296c3d6ceec5ad0e0edf555cea',
  '7f022bfe30e5467f8297aea30db5625d9d8a7586f14815d7faa4118f921cf3ca',
  '708cd1a1b63b7372ca75008b7860c8a93f6fe9112692e16cd671e544e266c8bb',
  'c45569aef80159eee8ec1907e3251456f40293f64101bc03af68ba6b4ad7f276',
  'ebee090f6a3881148914444f90cc5c4cb02922b7923510d987d3e9b4fcff565f',
];

test('homepage registry retains art direction, provenance, and visible concept language', () => {
  const source = fs.readFileSync(registryPath, 'utf8');
  assert.match(source, /\(max-width: 760px\)/);
  assert.match(source, /\(min-width: 761px\)/);
  assert.match(source, /aspectRatio: '4 \/ 3'/);
  assert.match(source, /mobileAspectRatio: '4 \/ 5'/);
  assert.match(source, /fallback:[\s\S]*-mobile-1200\.webp/);
  assert.match(source, /publicationStatus: 'approved'/);
  assert.match(source, /fictional generated image/);
  assert.match(source, /not client work/);
  for (const hash of sourceAndCropHashes) assert.ok(source.includes(hash), `Missing input SHA-256 ${hash}.`);
});

test('all 36 homepage derivatives match dimensions, bytes, hashes, budgets, and decode', async () => {
  const entries = Object.entries(manifest.assets);
  assert.equal(entries.length, 36);

  const { HOMEPAGE_BROWSER_ASSET_FILES } = await import('../scripts/site-contract.mjs');
  assert.deepEqual(
    entries.map(([file]) => `assets/images/homepage/${file}`).sort(),
    [...HOMEPAGE_BROWSER_ASSET_FILES].sort(),
  );

  const budgetFor = (file) => {
    if (file.endsWith('.avif')) return file.includes('-mobile-') ? 300_000 : 400_000;
    return file.includes('-mobile-') ? 550_000 : 700_000;
  };

  for (const [file, [expectedWidth, expectedHeight, expectedBytes, expectedHash]] of entries) {
    const absolute = path.join(assetRoot, file);
    const bytes = fs.readFileSync(absolute);
    assert.equal(bytes.length, expectedBytes, `${file} byte count drifted.`);
    assert.equal(
      crypto.createHash('sha256').update(bytes).digest('hex'),
      expectedHash,
      `${file} SHA-256 drifted.`,
    );
    assert.ok(bytes.length <= budgetFor(file), `${file} exceeds its practical slot budget.`);

    const metadata = await sharp(bytes, { failOn: 'error' }).metadata();
    assert.equal(metadata.width, expectedWidth, `${file} width drifted.`);
    assert.equal(metadata.height, expectedHeight, `${file} height drifted.`);
    assert.equal(metadata.mediaType, file.endsWith('.avif') ? 'image/avif' : 'image/webp');
    if (file.endsWith('.avif')) {
      assert.equal(metadata.compression, 'av1');
      assert.equal(metadata.bitsPerSample, 10);
    }

    const decoded = await sharp(bytes, { failOn: 'error' }).stats();
    assert.ok(decoded.channels.length >= 3, `${file} did not decode into color channels.`);
  }
});
