#!/usr/bin/env node
/**
 * Build art-directed AVIF/WebP derivatives for a capability-page image.
 *
 * Usage:
 *   node scripts/build-image-derivatives.mjs <master-path> <slug> [--desktop 16:9|4:5|3:2|1:1] [--mobile 4:5]
 *        [--max-desktop 1600] [--max-mobile 1200] [--focal 50,50]
 *
 * Writes assets/images/capability/<slug>-{desktop,mobile}-<width>.{avif,webp}
 * using the same encoder settings recorded in scripts/revision-assets-manifest.json,
 * and records dimensions, bytes and sha256 in scripts/capability-assets-manifest.json.
 */
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = path.join(projectRoot, 'assets/images/capability');
const manifestPath = path.join(projectRoot, 'scripts/capability-assets-manifest.json');

const ENCODING = {
  avif: { quality: 55, effort: 7, chromaSubsampling: '4:2:0', bitdepth: 10 },
  webp: { quality: 82, effort: 6, smartSubsample: true },
  resizeKernel: 'lanczos3',
};
const DESKTOP_WIDTHS = [800, 1200, 1600];
const MOBILE_WIDTHS = [480, 800, 1200];

function parseArgs(argv) {
  const [master, slug, ...rest] = argv;
  if (!master || !slug) {
    console.error('Usage: build-image-derivatives.mjs <master-path> <slug> [--desktop 16:9] [--mobile 4:5] [--max-desktop 1600] [--max-mobile 1200] [--focal 50,50]');
    process.exit(1);
  }
  const options = { desktop: '16:9', mobile: '4:5', maxDesktop: 1600, maxMobile: 1200, focal: [50, 50] };
  for (let index = 0; index < rest.length; index += 2) {
    const key = rest[index];
    const value = rest[index + 1];
    if (key === '--desktop') options.desktop = value;
    else if (key === '--mobile') options.mobile = value;
    else if (key === '--max-desktop') options.maxDesktop = Number(value);
    else if (key === '--max-mobile') options.maxMobile = Number(value);
    else if (key === '--focal') options.focal = value.split(',').map(Number);
    else throw new Error(`Unknown option ${key}`);
  }
  return { master, slug, options };
}

function ratio(text) {
  const [w, h] = text.split(':').map(Number);
  return w / h;
}

/** Crop the master to the target ratio around a focal point (percent), never upscaling. */
function cropBox(meta, targetRatio, focal) {
  const sourceRatio = meta.width / meta.height;
  let width = meta.width;
  let height = meta.height;
  if (sourceRatio > targetRatio) width = Math.round(meta.height * targetRatio);
  else height = Math.round(meta.width / targetRatio);
  const left = Math.min(Math.max(Math.round((meta.width - width) * (focal[0] / 100)), 0), meta.width - width);
  const top = Math.min(Math.max(Math.round((meta.height - height) * (focal[1] / 100)), 0), meta.height - height);
  return { left, top, width, height };
}

async function main() {
  const { master, slug, options } = parseArgs(process.argv.slice(2));
  const masterPath = path.resolve(projectRoot, master);
  const source = sharp(masterPath, { limitInputPixels: false });
  const meta = await source.metadata();
  await mkdir(outputDir, { recursive: true });

  let manifest = { version: 1, encoding: ENCODING, assets: {} };
  try {
    manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
  } catch {
    // first run
  }

  const jobs = [
    { crop: 'desktop', ratio: ratio(options.desktop), widths: DESKTOP_WIDTHS.filter((w) => w <= options.maxDesktop) },
    { crop: 'mobile', ratio: ratio(options.mobile), widths: MOBILE_WIDTHS.filter((w) => w <= options.maxMobile) },
  ];

  for (const job of jobs) {
    const box = cropBox(meta, job.ratio, options.focal);
    for (const width of job.widths) {
      const targetWidth = Math.min(width, box.width);
      const height = Math.round(targetWidth / job.ratio);
      for (const format of ['avif', 'webp']) {
        const file = `${slug}-${job.crop}-${width}.${format}`;
        const pipeline = sharp(masterPath, { limitInputPixels: false })
          .extract(box)
          .resize({ width: targetWidth, height, kernel: ENCODING.resizeKernel, fit: 'cover' });
        const buffer = format === 'avif'
          ? await pipeline.avif(ENCODING.avif).toBuffer()
          : await pipeline.webp(ENCODING.webp).toBuffer();
        await writeFile(path.join(outputDir, file), buffer);
        manifest.assets[file] = [targetWidth, height, buffer.length, createHash('sha256').update(buffer).digest('hex')];
        console.log(`${file} ${targetWidth}x${height} ${buffer.length} bytes`);
      }
    }
  }

  manifest.assets = Object.fromEntries(Object.entries(manifest.assets).sort(([a], [b]) => a.localeCompare(b)));
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`Master ${meta.width}x${meta.height}; manifest updated at ${path.relative(projectRoot, manifestPath)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
