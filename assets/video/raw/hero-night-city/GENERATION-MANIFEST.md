# Rushes Media night-flight hero generation manifest

Local production record for the homepage hero generated and revised on
2026-08-26. These sources are archived for review and derivative production;
only the optimized posters and browser loop are published by the local build.

## Generation record

| Stage | Model and settings | Job ID | Displayed cost | Delivered file |
| --- | --- | --- | ---: | --- |
| Start frame | GPT Image 2, 16:9, high quality, 4K | `482d8e6f-54a5-4094-a129-6a1377cfe409` | 12 credits | `../../../images/references/hero-night-city/hero-night-city-start-4k.png` |
| Motion proof | Seedance 2.0, fast, 720p, 8 seconds, silent | `d774fb26-0870-49bd-946c-7c666bf5554b` | 28 credits | `hero-night-city-proof-720p.mp4` |
| Motion master | Seedance 2.0, standard, 4K, high bitrate, 8 seconds, silent | `054f8e4d-1ba3-4f29-9003-a99a51c34318` | 176 credits | `hero-night-city-master-4k.mp4` |

Displayed job costs total 216 credits. The workspace balance changed from
3000.53 to 2781.53 during this run, a 219-credit account delta. The Higgsfield
connector exposes no transaction ledger that attributes the additional three
credits, so the difference is recorded as unresolved rather than assigned to a
job. One invalid motion submission was rejected before a generation job was
created; it produced no media.

## Continuous-flight replacement

The first web derivative used a short end-to-start dissolve. Although it hid the
cut, the visible city geometry returned during the dissolve and read as a
backward camera move. That derivative is preserved in the archive and is no
longer the active browser file.

| Stage | Model and settings | Job ID | Displayed cost | Delivered file |
| --- | --- | --- | ---: | --- |
| Cloud start plate | Frame derived at 7.95 s from the original 4K master | n/a | 0 credits | `../../../images/references/hero-night-city/hero-night-city-cloud-start-4k.png` |
| Continuous motion master | Seedance 2.5, 16:9, 1080p, high bitrate, 15 seconds, silent | `14c725d4-7e3a-4a15-8457-c7297bf32051` | 135 credits | `hero-night-city-seedance25-master-1080p-high.mp4` |
| 4K archival finish | Bytedance Video Upscale, Pro, AIGC preset, 4K, 24 fps | `4d4533ff-d7c8-49dc-bdaf-f897b5dadac7` | 4 credits | `hero-night-city-seedance25-master-4k-upscaled.mp4` |

The two displayed replacement-job costs total 139 credits. The account balance
changed from 2781.53 to 2634.50 during this replacement pass, a 147.03-credit
account delta. The additional 8.03 credits are unresolved because the CLI does
not expose a transaction ledger; they are not assigned to either job. No batch
or automatic regeneration was submitted.

## Opening-visibility editorial trim

The generated motion was not altered or regenerated. A free, frame-exact
editorial trim removes the featureless opening and matching dense-cloud tail:
source frames 59 through 311 inclusive, or 2.458333 s through 13.000000 s
exclusive. The 253-frame result is 10.541667 seconds. Its first frame already
shows the horizon aperture, river geometry, and city lights; the closing frame
returns to matching cloud coverage with faint city light for the native loop
cut. This paired trim improves both full-frame and portrait endpoint similarity
over the nearest tested alternatives while retaining an immediate visible
opening.
There is no crossfade, fade, speed change, interpolation, reversal, duplicated
frame, color treatment, or new generation cost. The untouched 15-second source,
prior browser derivative, and full-length 4K upscale remain archived.
The web encode uses libx264 High level 4.2, slow preset, CRF 17, BT.709,
yuv420p, and fast-start. The matching archival 4K editorial derivative uses
libx264 High level 5.2, slow preset, CRF 15, BT.709, yuv420p, and fast-start.

## Verified media

| File | Directly measured properties | SHA-256 |
| --- | --- | --- |
| `../../../images/references/hero-night-city/hero-night-city-start-4k.png` | 3840x2160 PNG, 8,742,946 bytes | `96272aa7e90a5c287c4e7e4faf6ae05e6ed02692461f51fdd6910127b5389776` |
| `hero-night-city-proof-720p.mp4` | 1280x720, H.264 High, 24 fps, yuv420p, 8.041667 s, silent, 3,695,799 bytes | `eb4e3992dd2934811873cdd42943077dfb1168ea6c5cefb2e3543c5d7648629f` |
| `hero-night-city-master-4k.mp4` | 3840x2160, HEVC Main 10, 24 fps, yuv420p10le, 8.041667 s, silent, 28,967,449 bytes | `5ef2f38ba3bf878e1f10dc3934a5dbacc0de5ad3c834a9858fcca99d7bdcef34` |
| `../../../images/references/hero-night-city/hero-night-city-cloud-start-4k.png` | 3840x2160 16-bit RGB PNG, 5,962,463 bytes | `e141c27b8797bfb23e76aff6afaf4f350e0d3c9e9e296e4d461270471010da8d` |
| `hero-night-city-seedance25-master-1080p-high.mp4` | 1920x1080, HEVC Main 10, 24 fps, yuv420p10le, 15.041667 s, silent, 8.19 Mbps video, 15,437,431 bytes | `0a501b5fb752efbf01547f9cfa0e0e3298227e2ebbbbb932189afa7b9c7dd878` |
| `hero-night-city-seedance25-master-4k-upscaled.mp4` | 3840x2160, H.264 High, 24 fps, yuv420p, 15.041667 s, silent, 18.44 Mbps video, 34,673,173 bytes | `21397bbb429bb3d126d0b5b1bcef2a2960ca7a5abd6ca036e031f8c48175ecf0` |
| `hero-night-city-seedance25-editorial-trim-4k.mp4` | Frame-exact 4K editorial derivative: 3840x2160, H.264 High, 24 fps, yuv420p, 10.541667 s, silent, fast-start, 27.65 Mbps, 36,432,324 bytes | `f08d609f3b56c765e71b8a3d79b1465455f5890c1a0095f95706a5a8d4a7fb59` |
| `hero-night-city-loop-seedance20-crossfade-1080p.mp4` | Byte-identical archive of the retired 7.291667 s dissolve loop, 2,829,429 bytes | `c8f3a8ce59903e59999cd32bdb25eed5685ac3e5d2182824bbadb0257ec2587b` |
| `hero-night-city-loop-seedance25-full-cloud-1080p.mp4` | Byte-identical archive of the retired full-cloud browser derivative: 1920x1080, H.264 High, 24 fps, yuv420p, 15.041667 s, silent, fast-start, 3.55 Mbps video, 6,681,154 bytes | `f15d25fb7db4b70f027831d4de5ea3bb415c262ee57163377c756a6df3a6aeca` |
| `../../hero-loop.mp4` | Frame-exact editorial derivative: 1920x1080, H.264, 24 fps, yuv420p, 10.541667 s, silent, fast-start, 1.15 Mbps, 1,510,928 bytes | `2a946a7897b9b9ddc84acdf613a9716668903bd8594190dc73900a657ae0bcbe` |
| `../../../images/hero/hero-night-city-poster.jpg` | 1920x1080 JPEG, 184,263 bytes | `8bd5a2fe8309aef15f19e86ddf074247e4f545aeaceb1ceb2c479a2bf99855c5` |
| `../../../images/hero/hero-night-city-video-poster-665c792f.jpg` | Exact 1920x1080 first-frame JPEG for the editorial derivative, 43,621 bytes | `665c792f1d5be7901feed1d97a80a44dbb52ffc6326e28490dc48f31c6a5af02` |
| `../../../images/hero/hero-night-city-video-poster.jpg` | Preserved, unserved dense-cloud startup poster for the retired full-length derivative, 18,333 bytes | `e7035531a9b5d260c4b6a558f24c32f74e1e428d21be05d728cba36a0e884076` |
| `hero-clouds-sunrise-legacy.mp4` | Byte-identical archive of the prior public sunrise loop, 3,288,906 bytes | `1498d77c659ce1f803c89b3892f077a7632055de4363ecc9d173330c3b8b37c6` |

The active web loop contains no crossfade, reversal, speed ramp, or duplicated
frames. Its `moov` atom begins at byte 36 and precedes `mdat` at byte 3974. The
retired full-cloud and crossfade derivatives remain archived so no prior source
is lost.

## Locked creative direction

The approved source prompt specifies one photoreal, original East Coast river
city at deep blue hour, viewed through a stabilized 24 mm first-person flight
camera. The safe corridor remains centered, the city core stays center-right,
and the left side remains dark enough for existing cream and antique-gold type.
It explicitly excludes people, superheroes, armor, hands, aircraft, HUDs,
recognizable skylines, franchise elements, neon cyberpunk color, warped
horizons, and text.

The replacement motion prompt is preserved verbatim in
`SEEDANCE-2.5-CONTINUOUS-FLIGHT-PROMPT.txt`. It specifies one continuous
15-second silent shot with constant positive forward translation: begin inside
dark vapor, emerge into the original river city, sustain a stabilized flyover,
then enter a different cloud bank without slowing or reversing. It prohibits
cuts, roll, banking, zooms, focus racks, push-pull motion, exposure pumping,
skyline morphing, new objects, and lighting changes.

## Acceptance evidence

- The still was reviewed at 320, 375, 390, 414, 768, 1024, and 1440 CSS-pixel widths.
- The replacement was inspected as one-second contact sheets plus full-resolution
  4K frames in the cloud transition and city passage; no person, aircraft, HUD,
  recognizable landmark, skyline collapse, or direction reversal was found.
- The browser decoded the active derivative as 1920x1080 and 10.541667 seconds
  at 24 fps with the versioned source `2a946a78`.
- Three consecutive loops completed while remaining unpaused at ready state 4,
  with no media error and no browser console warning or error.
- Desktop 1440x900 and mobile 390x844 hero crops passed with no horizontal
  overflow; the center city corridor remains visible and the copy remains on
  the protected dark zone.
- Manual pause held the exact current time for 1.8 seconds and manual play
  resumed playback; reduced-motion, autoplay refusal, and visibility restart
  behavior remain covered by the isolated unit suite.
- The Growth Call anchor now clears the fixed navigation by 20.97 px at desktop
  and 22.15 px at mobile while preserving the exact iframe URL and 720 px frame.
- No live form, CRM request, successful capture POST, or analytics event was
  sent during QA.
