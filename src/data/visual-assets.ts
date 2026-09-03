// Shared visual-asset contract and the industry concept visuals that feed the homepage and capability pages.

export type VisualTruthClass = 'labeled-concept' | 'owned-editorial' | 'client-proof';
export type VisualPublicationStatus = 'held' | 'approved';

export interface VisualSourceSet {
  type: 'image/avif' | 'image/webp';
  srcset: string;
  media?: string;
}

export interface VisualFallback {
  src: string;
  srcset?: string;
  width: number;
  height: number;
  type: 'image/jpeg' | 'image/png' | 'image/webp';
}

export interface VisualInputProvenance {
  assetPack: string;
  masterPath: string;
  masterSha256: string;
  desktopCropPath: string;
  desktopCropSha256: string;
  mobileCropPath: string;
  mobileCropSha256: string;
}

export interface VisualAsset {
  id: string;
  truthClass: VisualTruthClass;
  publicationStatus: VisualPublicationStatus;
  sourceMaster: string;
  sourceWidth: number;
  sourceHeight: number;
  sha256: string;
  sources: readonly VisualSourceSet[];
  fallback: VisualFallback;
  sizes: string;
  alt: string;
  caption: string;
  focalPoint: string;
  aspectRatio: string;
  mobileFocalPoint?: string;
  mobileAspectRatio?: string;
  inputProvenance?: VisualInputProvenance;
  socialImage?: string;
}

function responsiveAsset(input: {
  id: string;
  slug: string;
  sourceMaster: string;
  sourceWidth: number;
  sourceHeight: number;
  sha256: string;
  widths?: readonly number[];
  fallbackWidth?: number;
  renderedHeight: number;
  alt: string;
  caption: string;
  focalPoint: string;
  aspectRatio: string;
  social?: boolean;
}): VisualAsset {
  const assetWidths = input.widths ?? [640, 960, 1440, 1920];
  const fallbackWidth = input.fallbackWidth ?? assetWidths.at(-1) ?? 1920;
  const srcset = (extension: 'avif' | 'webp' | 'jpg') =>
    assetWidths.map((width) => `/assets/images/industries/${input.slug}-${width}.${extension} ${width}w`).join(', ');
  return {
    id: input.id,
    truthClass: 'labeled-concept',
    publicationStatus: 'approved',
    sourceMaster: input.sourceMaster,
    sourceWidth: input.sourceWidth,
    sourceHeight: input.sourceHeight,
    sha256: input.sha256,
    sources: [
      { type: 'image/avif', srcset: srcset('avif') },
      { type: 'image/webp', srcset: srcset('webp') },
    ],
    fallback: {
      src: `/assets/images/industries/${input.slug}-${fallbackWidth}.jpg`,
      srcset: srcset('jpg'),
      width: fallbackWidth,
      height: input.renderedHeight,
      type: 'image/jpeg',
    },
    sizes: '(max-width: 960px) calc(100vw - 40px), (max-width: 1440px) 42vw, 610px',
    alt: input.alt,
    caption: input.caption,
    focalPoint: input.focalPoint,
    aspectRatio: input.aspectRatio,
    socialImage: input.social
      ? `/assets/images/industries/${input.slug}-social-1200x630.jpg`
      : undefined,
  };
}

export const industryVisuals = {
  outdoorLiving: responsiveAsset({
    id: 'outdoor-living-primary-2026-08-28',
    slug: 'outdoor-living-hero',
    sourceMaster: 'clients/rushes-media/assets/industry-pages/hardscape/masters/nano-banana-pro-4x5-4k-master.png',
    sourceWidth: 3712,
    sourceHeight: 4608,
    sha256: 'bb41361e45b37c1bcd9aaaa7a283e2401213823a96e2a93ff767dd0be20ea00f',
    renderedHeight: 2400,
    alt: 'Stone patio, seat wall and integrated outdoor kitchen behind an East Coast home at blue hour.',
    caption: 'Original Rushes outdoor-living concept visualization · synthetic property · not a completed client project or performance result',
    focalPoint: 'center 62%',
    aspectRatio: '4 / 5',
    social: true,
  }),
  outdoorLivingPool: responsiveAsset({
    id: 'outdoor-living-pool-specialty-2026-08-28',
    slug: 'outdoor-living-pool',
    sourceMaster: 'clients/rushes-media/assets/industry-pages/pools/masters/nano-banana-pro-4x5-4k-master.png',
    sourceWidth: 3712,
    sourceHeight: 4608,
    sha256: '25542e6def60791807033800a6569e03eccfcd9a3c2644c2454888dcaaead5db',
    renderedHeight: 2400,
    alt: 'Rectangular custom pool with stone coping and an integrated patio behind an East Coast home at dusk.',
    caption: 'Original Rushes pool-build concept visualization · synthetic property · not a completed client project or performance result',
    focalPoint: 'center 58%',
    aspectRatio: '4 / 5',
  }),
  interiorDesign: responsiveAsset({
    id: 'interior-design-primary-2026-08-28',
    slug: 'interior-design-hero',
    sourceMaster: 'clients/rushes-media/assets/industry-pages/interior-design/masters/recraft-v41-living-master.png',
    sourceWidth: 2688,
    sourceHeight: 1536,
    sha256: '896478829b39e8fc40c4a6e51457eafe66da888d8455c708e1b4ed550e0fa9be',
    renderedHeight: 1080,
    alt: 'Warm editorial living room with custom walnut shelving, tailored furnishings and morning light.',
    caption: 'Original Rushes residential design-build concept visualization · fictional studio and generated environment · not client work, a completed project or a performance result',
    focalPoint: 'center 52%',
    aspectRatio: '16 / 9',
    social: true,
  }),
  hvac: responsiveAsset({
    id: 'hvac-primary-2026-08-28',
    slug: 'hvac-hero',
    sourceMaster: 'clients/rushes-media/assets/industry-pages/hvac/masters/nano-banana-pro-4x5-4k-master.png',
    sourceWidth: 3712,
    sourceHeight: 4608,
    sha256: '59dbb278039907a4c37628a5ba059b3810a6d047688ef9fb702afb30e1d8eef8',
    renderedHeight: 2400,
    alt: 'Residential interior divided between warm and cool rooms with a thermostat and floor register visible.',
    caption: 'Original Rushes home-comfort campaign concept · synthetic residence · not a client installation, diagnosis, endorsement or performance result',
    focalPoint: 'center 55%',
    aspectRatio: '4 / 5',
    social: true,
  }),
  medSpa: responsiveAsset({
    id: 'med-spa-primary-2026-08-28',
    slug: 'med-spa-hero',
    sourceMaster: 'clients/rushes-media/assets/industry-pages/med-spa/masters/flux2pro-treatment-room-master.jpg',
    sourceWidth: 1072,
    sourceHeight: 1344,
    sha256: 'e5a913dc181b8f1a2f159bdf42718be8fce5fcf0ca7798bd53d9403b05dfbf67',
    widths: [640, 960],
    fallbackWidth: 960,
    renderedHeight: 1200,
    alt: 'Quiet aesthetic treatment room with a prepared bed, rolling stool, folded towels and a plant in warm evening light.',
    caption: 'Original Rushes aesthetic-practice concept visualization · person-free synthetic environment · no patient, provider, procedure, testimonial, treatment outcome or performance result is depicted',
    focalPoint: 'center 54%',
    aspectRatio: '4 / 5',
    social: true,
  }),
} as const;
