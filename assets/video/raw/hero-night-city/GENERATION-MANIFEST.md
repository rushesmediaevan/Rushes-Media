# Rushes Media night-flight hero generation manifest

Local production record for the homepage hero generated on 2026-08-26. These
sources are archived for review and derivative production; only the optimized
poster and web loop are published by the local build.

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

## Verified media

| File | Directly measured properties | SHA-256 |
| --- | --- | --- |
| `../../../images/references/hero-night-city/hero-night-city-start-4k.png` | 3840x2160 PNG, 8,742,946 bytes | `96272aa7e90a5c287c4e7e4faf6ae05e6ed02692461f51fdd6910127b5389776` |
| `hero-night-city-proof-720p.mp4` | 1280x720, H.264 High, 24 fps, yuv420p, 8.041667 s, silent, 3,695,799 bytes | `eb4e3992dd2934811873cdd42943077dfb1168ea6c5cefb2e3543c5d7648629f` |
| `hero-night-city-master-4k.mp4` | 3840x2160, HEVC Main 10, 24 fps, yuv420p10le, 8.041667 s, silent, 28,967,449 bytes | `5ef2f38ba3bf878e1f10dc3934a5dbacc0de5ad3c834a9858fcca99d7bdcef34` |
| `../../hero-loop.mp4` | 1920x1080, H.264 High, 24 fps, yuv420p, 7.291667 s, silent, fast-start, 2,829,429 bytes | `c8f3a8ce59903e59999cd32bdb25eed5685ac3e5d2182824bbadb0257ec2587b` |
| `../../../images/hero/hero-night-city-poster.jpg` | 1920x1080 JPEG, 184,263 bytes | `8bd5a2fe8309aef15f19e86ddf074247e4f545aeaceb1ceb2c479a2bf99855c5` |
| `hero-clouds-sunrise-legacy.mp4` | Byte-identical archive of the prior public sunrise loop, 3,288,906 bytes | `1498d77c659ce1f803c89b3892f077a7632055de4363ecc9d173330c3b8b37c6` |

The web loop uses a 0.75-second end-to-start crossfade to conceal the hard
loop. Its `moov` atom begins at byte 36 and precedes `mdat` at byte 2986.

## Locked creative direction

The approved source prompt specifies one photoreal, original East Coast river
city at deep blue hour, viewed through a stabilized 24 mm first-person flight
camera. The safe corridor remains centered, the city core stays center-right,
and the left side remains dark enough for existing cream and antique-gold type.
It explicitly excludes people, superheroes, armor, hands, aircraft, HUDs,
recognizable skylines, franchise elements, neon cyberpunk color, warped
horizons, and text.

The approved motion prompt specifies one continuous eight-second silent shot:
enter through dark vapor, glide above the cloud deck with stable city geometry
and physically believable parallax, then finish inside a matching deep-indigo
cloud veil. It prohibits cuts, roll, banking, zooms, focus racks, exposure
pumping, skyline morphing, new objects, and lighting changes.

## Acceptance evidence

- The still was reviewed at 320, 375, 390, 414, 768, 1024, and 1440 CSS-pixel widths.
- The browser decoded the active loop as 1920x1080 and 7.292 seconds.
- Three consecutive loops completed without pausing, decode errors, or console warnings.
- Before/after captures at all three seams retained matching framing and cloud coverage.
- No live form, CRM request, tracking event, deployment, push, commit, or additional generation was performed.
