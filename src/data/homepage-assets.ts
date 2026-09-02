import type { VisualAsset } from './industry-pages';

const MOBILE_MEDIA = '(max-width: 760px)';
const DESKTOP_MEDIA = '(min-width: 761px)';

interface HomepageAssetInput {
  id:
    | 'campaigns-submerged'
    | 'brand-media-riverside-mill'
    | 'web-law-office';
  assetPack: string;
  masterPath: string;
  masterWidth: number;
  masterHeight: number;
  masterSha256: string;
  desktopCropSha256: string;
  mobileCropSha256: string;
  alt: string;
  caption: string;
  focalPoint?: string;
  mobileFocalPoint?: string;
}

function srcset(id: HomepageAssetInput['id'], crop: 'desktop' | 'mobile', type: 'avif' | 'webp') {
  const widths = crop === 'desktop' ? [800, 1200, 1600] : [480, 800, 1200];
  return widths
    .map((width) => `/assets/images/homepage/${id}-${crop}-${width}.${type} ${width}w`)
    .join(', ');
}

function homepageAsset(input: HomepageAssetInput): VisualAsset {
  const mobileWebp = srcset(input.id, 'mobile', 'webp');

  return {
    id: `homepage-${input.id}-2026-09-01`,
    truthClass: 'labeled-concept',
    publicationStatus: 'approved',
    sourceMaster: input.masterPath,
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
      src: `/assets/images/homepage/${input.id}-mobile-1200.webp`,
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
    aspectRatio: '4 / 3',
    mobileAspectRatio: '4 / 5',
    inputProvenance: {
      assetPack: input.assetPack,
      masterPath: input.masterPath,
      masterSha256: input.masterSha256,
      desktopCropPath: `website/assets/images/homepage/${input.id}-desktop-1600.webp`,
      desktopCropSha256: input.desktopCropSha256,
      mobileCropPath: `website/assets/images/homepage/${input.id}-mobile-1200.webp`,
      mobileCropSha256: input.mobileCropSha256,
    },
  };
}

const disclosure = (scene: string) =>
  `Original Rushes ${scene} concept visualization · fictional generated image · not client work, a documented location, or a performance result.`;

export const homepageAssets = {
  brandMediaRiversideMill: homepageAsset({
    id: 'brand-media-riverside-mill',
    assetPack: 'rushes-content/website-revision-asset-pack-2026-08-31',
    masterPath:
      'rushes-content/website-revision-asset-pack-2026-08-31/masters/03-riverside-mill-nano-banana-pro-4k.png',
    masterWidth: 5504,
    masterHeight: 3072,
    masterSha256: '5e8f193589f169c8a619e99aad018a316d95807ff021b1bfc448eeab26306f06',
    desktopCropSha256: 'dcf2ecde49363212be06e4d54757f7e700186ea828940e337926c1a5e323c224',
    mobileCropSha256: '90740ebd3146b099cc9b19d83785157c849bff8ef789fb573b048dd8c44889a4',
    alt: 'Tree-lined brick and stone courtyard opening through a broad arch to a river.',
    caption: disclosure('riverside hospitality'),
    focalPoint: 'center 46%',
    mobileFocalPoint: 'center 48%',
  }),
  campaignsSubmerged: homepageAsset({
    id: 'campaigns-submerged',
    assetPack: 'rushes-content/operator/spec-lab/2026-08-24-4k-aesthetic-catalog-vol3',
    masterPath:
      'rushes-content/operator/spec-lab/2026-08-24-4k-aesthetic-catalog-vol3/assets/higgsfield/finals/18-nano-banana-2-4k.png',
    masterWidth: 3712,
    masterHeight: 4608,
    masterSha256: 'd89710bac0e593ad4b7aba146e92ca9537347fa8d8478cd3f57f011f1774aaf3',
    desktopCropSha256: '3d194105fec7d71bd1d466ecb51efed1f80ad3296c3d6ceec5ad0e0edf555cea',
    mobileCropSha256: '7f022bfe30e5467f8297aea30db5625d9d8a7586f14815d7faa4118f921cf3ca',
    alt: 'Blue textile installation suspended through weathered stone arches above a reflective pool.',
    caption: disclosure('surreal campaign'),
  }),
  webLawOffice: homepageAsset({
    id: 'web-law-office',
    assetPack: 'rushes-content/portfolio-stills-2026-08-22',
    masterPath: 'rushes-content/portfolio-stills-2026-08-22/03-law-office.png',
    masterWidth: 3840,
    masterHeight: 2160,
    masterSha256: '708cd1a1b63b7372ca75008b7860c8a93f6fe9112692e16cd671e544e266c8bb',
    desktopCropSha256: 'c45569aef80159eee8ec1907e3251456f40293f64101bc03af68ba6b4ad7f276',
    mobileCropSha256: 'ebee090f6a3881148914444f90cc5c4cb02922b7923510d987d3e9b4fcff565f',
    alt: 'Dark conference room overlooking a city skyline at blue hour.',
    caption: disclosure('office'),
  }),
} as const;

export const homepageAssetIds = Object.values(homepageAssets).map((asset) => asset.id);
