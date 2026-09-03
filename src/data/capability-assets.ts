import type { VisualAsset } from './visual-assets';

/**
 * Capability-page imagery. Every entry is a labeled Rushes concept image; the
 * derivatives are produced by scripts/build-image-derivatives.mjs and recorded
 * in scripts/capability-assets-manifest.json. Small masters are capped to the
 * widths they can hold without upscaling.
 */

const MOBILE_MEDIA = '(max-width: 760px)';
const DESKTOP_MEDIA = '(min-width: 761px)';

export type CapabilityAssetId =
  | 'manor-terrace'
  | 'marble-kitchen'
  | 'coastal-street'
  | 'daylit-studio'
  | 'phone-counter-night'
  | 'porch-dusk-doorbell'
  | 'two-trucks-dawn';

interface CapabilityAssetInput {
  id: CapabilityAssetId;
  masterPath: string;
  masterWidth: number;
  masterHeight: number;
  masterSha256: string;
  desktopWidths: readonly number[];
  mobileWidths: readonly number[];
  desktopAspectRatio: '16 / 9' | '4 / 5';
  alt: string;
  scene: string;
  focalPoint?: string;
  sizes: string;
}

function srcset(input: CapabilityAssetInput, crop: 'desktop' | 'mobile', type: 'avif' | 'webp') {
  const widths = crop === 'desktop' ? input.desktopWidths : input.mobileWidths;
  return widths
    .map((width) => `/assets/images/capability/${input.id}-${crop}-${width}.${type} ${width}w`)
    .join(', ');
}

export function capabilityAssetFiles(input: Pick<CapabilityAssetInput, 'id' | 'desktopWidths' | 'mobileWidths'>) {
  return [
    ...input.desktopWidths.flatMap((width) => ['avif', 'webp'].map((type) => `assets/images/capability/${input.id}-desktop-${width}.${type}`)),
    ...input.mobileWidths.flatMap((width) => ['avif', 'webp'].map((type) => `assets/images/capability/${input.id}-mobile-${width}.${type}`)),
  ];
}

function capabilityAsset(input: CapabilityAssetInput): VisualAsset {
  const mobileWebp = srcset(input, 'mobile', 'webp');
  const fallbackWidth = input.mobileWidths.at(-1) ?? 800;
  return {
    id: `capability-${input.id}-2026-09-03`,
    truthClass: 'labeled-concept',
    publicationStatus: 'approved',
    sourceMaster: input.masterPath,
    sourceWidth: input.masterWidth,
    sourceHeight: input.masterHeight,
    sha256: input.masterSha256,
    sources: [
      { type: 'image/avif', media: MOBILE_MEDIA, srcset: srcset(input, 'mobile', 'avif') },
      { type: 'image/avif', media: DESKTOP_MEDIA, srcset: srcset(input, 'desktop', 'avif') },
      { type: 'image/webp', media: MOBILE_MEDIA, srcset: mobileWebp },
      { type: 'image/webp', media: DESKTOP_MEDIA, srcset: srcset(input, 'desktop', 'webp') },
    ],
    fallback: {
      src: `/assets/images/capability/${input.id}-mobile-${fallbackWidth}.webp`,
      srcset: mobileWebp,
      width: fallbackWidth,
      height: Math.round(fallbackWidth * 1.25),
      type: 'image/webp',
    },
    sizes: input.sizes,
    alt: input.alt,
    caption: `Original Rushes ${input.scene} concept visualization · fictional generated environment · not client work, a documented location, or a performance result.`,
    focalPoint: input.focalPoint ?? 'center',
    mobileFocalPoint: input.focalPoint ?? 'center',
    aspectRatio: input.desktopAspectRatio,
    mobileAspectRatio: '4 / 5',
  };
}

const FULL = { desktopWidths: [800, 1200, 1600], mobileWidths: [480, 800, 1200] } as const;
const SMALL = { desktopWidths: [800], mobileWidths: [480, 800] } as const;

export const capabilityAssetInputs = {
  manorTerrace: {
    id: 'manor-terrace',
    masterPath: 'rushes-content/website-image-library-2026-09-02/02_realism_pass_unused/04-manor-terrace-wide.png',
    masterWidth: 960,
    masterHeight: 1200,
    masterSha256: '79b601040569dbe0cbafa10da6308f4e2bfb8a0f69252542db75d75c5b0fa69f',
    ...SMALL,
    desktopAspectRatio: '4 / 5',
    alt: 'Stone balustrade terrace above a still lake at golden hour, with autumn trees turning orange.',
    scene: 'estate terrace',
    sizes: '(max-width: 760px) calc(100vw - 44px), 400px',
  },
  marbleKitchen: {
    id: 'marble-kitchen',
    masterPath: 'clients/rushes-media/assets/industry-pages/interior-design/masters/halewood-kitchen-master.png',
    masterWidth: 3712,
    masterHeight: 4608,
    masterSha256: '29a2d9650d32587157574d13f5bc71ef4b657ae10cd04eb96c6ed342535a716d',
    ...FULL,
    desktopAspectRatio: '4 / 5',
    alt: 'Kitchen with a veined marble island, white oak cabinetry, and morning light through steel-framed windows.',
    scene: 'residential kitchen',
    focalPoint: 'center 55%',
    sizes: '(max-width: 760px) calc(100vw - 44px), 32vw',
  },
  coastalStreet: {
    id: 'coastal-street',
    masterPath: 'rushes-content/website-revision-asset-pack-2026-08-31/masters/01-coastal-gpt-image-2-4k.png',
    masterWidth: 3840,
    masterHeight: 2160,
    masterSha256: '414f40dbdb9dd06fde4e10c2c6aaaa18c1098d7e61ce616b4f607c90efbb03aa',
    ...FULL,
    desktopAspectRatio: '16 / 9',
    alt: 'Sunlit coastal main street with a white clapboard storefront, navy awnings, and brick neighbors.',
    scene: 'coastal main street',
    sizes: '(max-width: 760px) calc(100vw - 44px), 56vw',
  },
  daylitStudio: {
    id: 'daylit-studio',
    masterPath: 'rushes-content/website-image-library-2026-09-02/02_realism_pass_unused/06-empty-industrial-studio.jpg',
    masterWidth: 3072,
    masterHeight: 5504,
    masterSha256: '8d8ce89298cb60cdf8d8b41388814588911a4ea6f3258eab2a7ad7eb70c66353',
    ...FULL,
    desktopAspectRatio: '4 / 5',
    alt: 'Empty industrial studio with a long row of steel-framed windows and a polished concrete floor in blue daylight.',
    scene: 'daylit studio',
    sizes: '(max-width: 760px) calc(100vw - 44px), 36vw',
  },
  phoneCounterNight: {
    id: 'phone-counter-night',
    masterPath: 'rushes-content/creative-bakeoff-2026-07-30/_rushes-plates/the-moment/phone-counter-night.jpg',
    masterWidth: 1072,
    masterHeight: 1344,
    masterSha256: '2f8913f8e3863fcdfe9f337eb94c6850630c11edde6d2b551de81c5990e3a7d0',
    ...SMALL,
    desktopAspectRatio: '4 / 5',
    alt: 'A phone lighting up on a kitchen counter at night beside a glass of water and a set of keys.',
    scene: 'evening request',
    sizes: '(max-width: 760px) 30vw, 300px',
  },
  porchDuskDoorbell: {
    id: 'porch-dusk-doorbell',
    masterPath: 'rushes-content/creative-bakeoff-2026-07-30/_rushes-plates/the-moment/porch-dusk-doorbell.jpg',
    masterWidth: 1072,
    masterHeight: 1344,
    masterSha256: '190aadf23a7b5c715ba6e532b45e2fe54826e6d0650354bf7eccb93a9a4d903c',
    ...SMALL,
    desktopAspectRatio: '4 / 5',
    alt: 'Front porch lit at dusk, door closed, planters on the steps.',
    scene: 'porch at dusk',
    sizes: '(max-width: 760px) 30vw, 300px',
  },
  twoTrucksDawn: {
    id: 'two-trucks-dawn',
    masterPath: 'rushes-content/creative-bakeoff-2026-07-30/_rushes-plates/the-moment/two-trucks-dawn.jpg',
    masterWidth: 1072,
    masterHeight: 1344,
    masterSha256: '2a971183858f6d61f6a26d04473435c91bf716fdd30504ecbd46f38c941527e7',
    ...SMALL,
    desktopAspectRatio: '4 / 5',
    alt: 'Two white work trucks parked in a frosted driveway at dawn.',
    scene: 'crew at dawn',
    sizes: '(max-width: 760px) 30vw, 300px',
  },
} as const satisfies Record<string, CapabilityAssetInput>;

export const capabilityAssets = Object.fromEntries(
  Object.entries(capabilityAssetInputs).map(([key, input]) => [key, capabilityAsset(input)]),
) as { [K in keyof typeof capabilityAssetInputs]: VisualAsset };

export const CAPABILITY_BROWSER_ASSET_FILES = Object.values(capabilityAssetInputs).flatMap((input) => capabilityAssetFiles(input));
