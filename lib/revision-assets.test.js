const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
const test = require('node:test');

const manifest = require('../scripts/revision-assets-manifest.json');
const projectRoot = path.resolve(__dirname, '..');
const assetRoot = path.join(projectRoot, 'assets/images/revision');
const registryPath = path.join(projectRoot, 'src/data/revision-assets.ts');

const sourceHashes = [
  'dba96b4c851b1a33dc55006f0d4051c2e410893e859358a32efb65ded10d481f',
  'fef6762a9be645475a9272981c587f9a5e85d9b93e9731c4adf6470ec7defbc3',
  '5f3883fed89f121c6673b35bfdd7553cf3b7860b50db9aa57d2bcafd217ea722',
  'ed45569a2add5f3cbd7a64c742c3b628bed9ba08317d8417466103271967f8b7',
  'b80a085961395ca1c3207446ead3db01b21d4daf3bafe9a55b2e01f01fa3bec6',
  '33a2e552a5a3701d4805a952eceb75c37898965f76996e7ca9bf2984a7f32601',
  'f1cb218b489b8b655cd95adfc48cadc36e23f26f4e53e261bd596d446fcf4393',
  '71656b63b53da8423f26af2ffb6cec988d9820af67dbc7866976f4224eebfc93',
  '73dace283a5bb9abc3d50f0da065a00c504f4954c0e73c0d13345892b391b8b0',
  'a42f82532010f3b2f17726950f30d28097675738b0ac729f03064eefaf63f34f',
  '0ceadc06bd0824730aa6e3e5527cbfd2abc93e5e5d6d95010691e5b0da6ae76e',
  '5a36dabb6c0e20009dc5faa191a8ea953eabd237eb5eae649da837721dcf1a90',
  'b4465bdda906d85d282cc26538f580c963478f8e03a8f6d49bc110bb3c4dec7d',
  'df61030b0f08c74d19e8bf733fd25cd6154b3edac5325320f4ce23e602ff17db',
  'e42010c523cd709ef70a2d332a7f74f2e233e3af40ef6f9e5caf55ec4d7a12e0',
];

test('revision registry retains approved input provenance and art direction', () => {
  const source = fs.readFileSync(registryPath, 'utf8');
  assert.match(source, /website-revision-asset-pack-2026-08-31/);
  assert.match(source, /\(max-width: 760px\)/);
  assert.match(source, /\(min-width: 761px\)/);
  assert.match(source, /mobileAspectRatio: '4 \/ 5'/);
  assert.match(source, /fallback:[\s\S]*-mobile-1200\.webp/);
  for (const hash of sourceHashes) assert.ok(source.includes(hash), `Missing input SHA-256 ${hash}.`);
});

test('all 60 responsive derivatives match dimensions, bytes, hashes, and decode', async () => {
  const entries = Object.entries(manifest.assets);
  assert.equal(entries.length, 60);

  const { REVISION_BROWSER_ASSET_FILES } = await import('../scripts/site-contract.mjs');
  assert.deepEqual(
    entries.map(([file]) => `assets/images/revision/${file}`).sort(),
    [...REVISION_BROWSER_ASSET_FILES].sort(),
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
