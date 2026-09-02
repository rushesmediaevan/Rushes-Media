import type { VisualAsset } from './industry-pages';

const DEFAULT_ASSET_PACK =
  'rushes-content/website-revision-asset-pack-2026-08-31';
const MOBILE_MEDIA = '(max-width: 760px)';
const DESKTOP_MEDIA = '(min-width: 761px)';

interface RevisionAssetInput {
  id: '02-bakery' | '04-restaurant' | '05-medspa' | '06-daylit-venue' | '07-coastal-terrace';
  assetPack?: string;
  masterFile: string;
  masterPath?: string;
  masterWidth: number;
  masterHeight: number;
  masterSha256: string;
  desktopFile: string;
  desktopSha256: string;
  mobileFile: string;
  mobileSha256: string;
  desktopCropPath?: string;
  mobileCropPath?: string;
  desktopAspectRatio: '16 / 9' | '4 / 5';
  desktopWidth: number;
  desktopHeight: number;
  alt: string;
  caption: string;
  focalPoint?: string;
  mobileFocalPoint?: string;
}

function srcset(id: RevisionAssetInput['id'], crop: 'desktop' | 'mobile', type: 'avif' | 'webp') {
  const widths = crop === 'desktop' ? [800, 1200, 1600] : [480, 800, 1200];
  return widths
    .map((width) => `/assets/images/revision/${id}-${crop}-${width}.${type} ${width}w`)
    .join(', ');
}

function revisionAsset(input: RevisionAssetInput): VisualAsset {
  const assetPack = input.assetPack ?? DEFAULT_ASSET_PACK;
  const masterPath = input.masterPath ?? `${assetPack}/masters/${input.masterFile}`;
  const mobileWebp = srcset(input.id, 'mobile', 'webp');
  return {
    id: `revision-${input.id}-2026-08-31`,
    truthClass: 'labeled-concept',
    publicationStatus: 'approved',
    sourceMaster: masterPath,
    sourceWidth: input.masterWidth,
    sourceHeight: input.masterHeight,
    sha256: input.masterSha256,
    sources: [
      { type: 'image/avif', media: MOBILE_MEDIA, srcset: srcset(input.id, 'mobile', 'avif') },
      { type: 'image/avif', media: DESKTOP_MEDIA, srcset: srcset(input.id, 'desktop', 'avif') },
      { type: 'image/webp', media: MOBILE_MEDIA, srcset: mobileWebp },
      { type: 'image/webp', media: DESKTOP_MEDIA, srcset: srcset(input.id, 'desktop', 'webp') },
    ],
    fallback: {
      src: `/assets/images/revision/${input.id}-mobile-1200.webp`,
      srcset: mobileWebp,
      width: 1200,
      height: 1500,
      type: 'image/webp',
    },
    sizes: '(max-width: 760px) calc(100vw - 40px), 50vw',
    alt: input.alt,
    caption: input.caption,
    focalPoint: input.focalPoint ?? 'center',
    mobileFocalPoint: input.mobileFocalPoint ?? 'center',
    aspectRatio: input.desktopAspectRatio,
    mobileAspectRatio: '4 / 5',
    inputProvenance: {
      assetPack,
      masterPath,
      masterSha256: input.masterSha256,
      desktopCropPath: input.desktopCropPath ?? `${assetPack}/web/${input.desktopFile}`,
      desktopCropSha256: input.desktopSha256,
      mobileCropPath: input.mobileCropPath ?? `${assetPack}/web/${input.mobileFile}`,
      mobileCropSha256: input.mobileSha256,
    },
  };
}

const disclosure = (scene: string) =>
  `Original Rushes ${scene} concept visualization · fictional generated environment · not client work, a documented location, or a performance result.`;

export const revisionAssets = {
  bakery: revisionAsset({
    id: '02-bakery',
    masterFile: '02-bakery-overhead-4k.png',
    masterWidth: 3840,
    masterHeight: 2160,
    masterSha256: 'dba96b4c851b1a33dc55006f0d4051c2e410893e859358a32efb65ded10d481f',
    desktopFile: '02-bakery-desktop-2400x1350.webp',
    desktopSha256: 'fef6762a9be645475a9272981c587f9a5e85d9b93e9731c4adf6470ec7defbc3',
    mobileFile: '02-bakery-mobile-1200x1500.webp',
    mobileSha256: '5f3883fed89f121c6673b35bfdd7553cf3b7860b50db9aa57d2bcafd217ea722',
    desktopAspectRatio: '16 / 9',
    desktopWidth: 2400,
    desktopHeight: 1350,
    alt: 'Overhead view of a baker’s flour-dusted worktable with proofing dough, linen, scraper, and bread basket.',
    caption: disclosure('bakery craft'),
  }),
  restaurant: revisionAsset({
    id: '04-restaurant',
    masterFile: '04-restaurant-gpt-image-2-4k.png',
    masterWidth: 2480,
    masterHeight: 3312,
    masterSha256: 'ed45569a2add5f3cbd7a64c742c3b628bed9ba08317d8417466103271967f8b7',
    desktopFile: '04-restaurant-desktop-1600x2000.webp',
    desktopSha256: 'b80a085961395ca1c3207446ead3db01b21d4daf3bafe9a55b2e01f01fa3bec6',
    mobileFile: '04-restaurant-mobile-1200x1500.webp',
    mobileSha256: '33a2e552a5a3701d4805a952eceb75c37898965f76996e7ca9bf2984a7f32601',
    desktopAspectRatio: '4 / 5',
    desktopWidth: 1600,
    desktopHeight: 2000,
    alt: 'Warm, sunlit restaurant dining room with set wooden tables and plaster walls.',
    caption: disclosure('hospitality'),
  }),
  medSpa: revisionAsset({
    id: '05-medspa',
    masterFile: '05-medspa-nano-banana-pro-4k.png',
    masterWidth: 3712,
    masterHeight: 4608,
    masterSha256: 'f1cb218b489b8b655cd95adfc48cadc36e23f26f4e53e261bd596d446fcf4393',
    desktopFile: '05-medspa-desktop-1600x2000.webp',
    desktopSha256: '71656b63b53da8423f26af2ffb6cec988d9820af67dbc7866976f4224eebfc93',
    mobileFile: '05-medspa-mobile-1200x1500.webp',
    mobileSha256: '73dace283a5bb9abc3d50f0da065a00c504f4954c0e73c0d13345892b391b8b0',
    desktopAspectRatio: '4 / 5',
    desktopWidth: 1600,
    desktopHeight: 2000,
    alt: 'Minimal, daylit aesthetic treatment room with a prepared treatment bed, pale wood cabinetry, and a small rolling cart.',
    caption: disclosure('aesthetic-practice'),
  }),
  daylitVenue: revisionAsset({
    id: '06-daylit-venue',
    masterFile: '06-daylit-venue-gpt-image-2-4k.png',
    masterWidth: 2480,
    masterHeight: 3312,
    masterSha256: 'a42f82532010f3b2f17726950f30d28097675738b0ac729f03064eefaf63f34f',
    desktopFile: '06-daylit-venue-desktop-1600x2000.webp',
    desktopSha256: '0ceadc06bd0824730aa6e3e5527cbfd2abc93e5e5d6d95010691e5b0da6ae76e',
    mobileFile: '06-daylit-venue-mobile-1200x1500.webp',
    mobileSha256: '5a36dabb6c0e20009dc5faa191a8ea953eabd237eb5eae649da837721dcf1a90',
    desktopAspectRatio: '4 / 5',
    desktopWidth: 1600,
    desktopHeight: 2000,
    alt: 'Daylit timber-framed venue with long worktables, indoor trees, and a garden view.',
    caption: disclosure('daylit venue'),
  }),
  coastalTerrace: revisionAsset({
    id: '07-coastal-terrace',
    assetPack: 'CREATIVE - OPEN THIS/4 - GENERATED IMAGE LIBRARY/Rushes Social and Brand',
    masterFile: 'assets - generated - 06-hospitality.png',
    masterPath: 'CREATIVE - OPEN THIS/4 - GENERATED IMAGE LIBRARY/Rushes Social and Brand/assets - generated - 06-hospitality.png',
    masterWidth: 1856,
    masterHeight: 2304,
    masterSha256: 'b4465bdda906d85d282cc26538f580c963478f8e03a8f6d49bc110bb3c4dec7d',
    desktopFile: '07-coastal-terrace-desktop-1600.webp',
    desktopSha256: 'df61030b0f08c74d19e8bf733fd25cd6154b3edac5325320f4ce23e602ff17db',
    mobileFile: '07-coastal-terrace-mobile-1200.webp',
    mobileSha256: 'e42010c523cd709ef70a2d332a7f74f2e233e3af40ef6f9e5caf55ec4d7a12e0',
    desktopCropPath: 'website/assets/images/revision/07-coastal-terrace-desktop-1600.webp',
    mobileCropPath: 'website/assets/images/revision/07-coastal-terrace-mobile-1200.webp',
    desktopAspectRatio: '4 / 5',
    desktopWidth: 1600,
    desktopHeight: 2000,
    alt: 'Sunlit coastal terrace with blue shutters, bougainvillea, a canvas chair, and an open view across the water.',
    caption: disclosure('coastal hospitality'),
    focalPoint: 'center 52%',
    mobileFocalPoint: 'center 52%',
  }),
} as const;

export const revisionAssetIds = Object.values(revisionAssets).map((asset) => asset.id);
