import { cp, mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  CONVERSION_COPY_FILES,
  renderConversionPageCopy,
} from './conversion-page-copy.mjs';
import {
  ASTRO_ROUTE_DIRECTORIES,
  COMPATIBILITY_FILES,
  PUBLIC_ASSET_FILES,
  REVIEW_ASSET_FILES,
  REVIEW_COMPATIBILITY_FILES,
} from './site-contract.mjs';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicRoot = path.join(projectRoot, '.astro-public');

if (path.basename(publicRoot) !== '.astro-public') {
  throw new Error(`Refusing to replace unexpected directory: ${publicRoot}`);
}

await rm(publicRoot, { recursive: true, force: true });
await mkdir(publicRoot, { recursive: true });

const includeReviewRoutes = process.env.RUSHES_INCLUDE_REVIEW_ROUTES === '1';
const publicFiles = [
  ...PUBLIC_ASSET_FILES,
  ...COMPATIBILITY_FILES,
  ...(includeReviewRoutes ? REVIEW_ASSET_FILES : []),
  ...(includeReviewRoutes ? REVIEW_COMPATIBILITY_FILES : []),
];
for (const relativeFile of publicFiles) {
  const source = path.join(projectRoot, relativeFile);
  const target = path.join(publicRoot, relativeFile);
  const sourceStat = await stat(source).catch(() => null);
  if (!sourceStat?.isFile()) {
    throw new Error(`Compatibility file is missing: ${relativeFile}`);
  }
  await mkdir(path.dirname(target), { recursive: true });
  if (CONVERSION_COPY_FILES.has(relativeFile)) {
    const template = await readFile(source, 'utf8');
    await writeFile(target, renderConversionPageCopy(relativeFile, template));
  } else {
    await cp(source, target);
  }
}

for (const routeDirectory of ASTRO_ROUTE_DIRECTORIES) {
  const collision = path.join(publicRoot, routeDirectory, 'index.html');
  if (await stat(collision).catch(() => null)) {
    throw new Error(`Astro/compatibility route collision: /${routeDirectory}/`);
  }
}

console.log(
  `Prepared Astro public files: ${publicFiles.length} allowlisted files (${includeReviewRoutes ? 'local review' : 'release'} mode).`,
);
