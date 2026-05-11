# Rushes Hero Backdrop — FAL Prompt Brief

**Locked:** 2026-05-11
**Source aesthetic:** `brand/RUSHES-AESTHETIC-LOCK.md` + `rushes-visual/knowledge/sonic-references.md` (Quadeca *Vanisher, Horizon Scraper* + Bennett Coast + EDEN registers).
**Target file:** `website/assets/video/hero-loop.mp4` (replaces current loop)
**Spec:** 16:9 · 5–10s · loopable · no overlay text · subject reads at quarter-scale (because navy overlay sits on top + headline sits on top of that).

---

## DESIGN INTENT (read before prompting)

The hero is **the brand decision in 1.5 seconds.** It is not an album film, not a stock harbor reel, not a tech-bro gradient. It is **Northeast coastal old-money atmosphere as a sales tool**: confident, premium, *implied competence*. The viewer should feel they walked into the right room — not into a Quadeca music video.

**What the backdrop must do for the headline "Media done right.":**

1. **Leave the upper-left quadrant breathable.** The headline anchors lower-left and reads ~14vw. The horizon, sun-source, or focal motion should sit roughly **right of center / lower third** so it doesn't fight the type.
2. **Carry a single warm directional source** — late-day Atlantic sun, lighthouse beam, or harbor lamp through fog — that the headline's gold italic ("done right.") can answer to. Cream/navy/gold palette wins; nothing fluorescent.
3. **Hold tension and afterglow simultaneously.** Bennett Coast "warm forward motion" + Quadeca "hope and dread held together." Slow movement, weather, scale. No frantic cuts, no whip-pans, no drone-orbit clichés.
4. **Move slowly enough to loop.** Sub-handheld drift, ocean swell, fog roll, sail flap — motion that loops cleanly at 5–8 seconds without a visible cut point. **No hard subjects entering or leaving frame.**

**Hard bans (every prompt):**
- No people with readable faces (silhouettes OK)
- No logos, no signage, no readable type
- No drone orbits, no whip-pans, no rapid cuts
- No HDR, no oversaturation, no neon, no "epic" cinematography clichés
- No tropical / palm-tree / Florida register — this is Northeast harbor, cold air, salt
- No CGI-clean water; weather and grain are features

---

## MODEL ROUTING (FAL)

| Model | When to pick it | Notes |
|-------|-----------------|-------|
| **`fal-ai/veo3`** (Google Veo 3) | Premium tier, best for cinematic atmospheric pieces with light + weather + horizon. **First pick.** | Higher cost / pricing. Use for the one you ship. |
| **`fal-ai/kling-video/v2.5-turbo/pro/text-to-video`** | Cheaper iteration, very strong on slow cinematic + golden hour. **Second pick.** | Run 3-5 here first to find the right composition, then re-roll the winner on Veo 3. |
| **`fal-ai/seedance-1-0-pro/text-to-video`** | Best handheld / "real footage" feel — boat bow gliding, hand entering frame, salt-on-lens. | Strong for prompt 2 + 4 below. |
| **`fal-ai/wan-25-preview/text-to-video`** | Strong atmospheric weather (fog roll, mist, rain on water). | Strong for prompt 3. |
| **`fal-ai/flux-pro/v1.1-ultra`** (image fallback) | If video budget is tight, render a still and ken-burns it in CSS. | Use 21:9 ratio, then animate scale+translate in CSS. |

**Default test path:** burn 3 generations on **Kling 2.5 Pro** at ~$0.35 each, pick the winner, re-roll once on **Veo 3** for the final.

---

## OUTPUT SPEC FOR EVERY PROMPT

- Aspect: **16:9** (1920×1080 minimum; Veo 3 supports up to 1920×1080 / 8s)
- Duration: **5–8s**
- Frame rate: 24 fps preferred
- Audio: **none** (mute; the site has no audio)
- Camera motion: **slow drift, slow push, or static** — no zoom, no orbit
- Subject placement: **right-of-center or background-anchored**, leave upper-left + lower-left clean

---

## THE PROMPTS (5 options, run all on Kling, pick winner)

### 01 — Harbor Light at Dusk (lead candidate)

```
Slow handheld push toward a weathered white Northeast lighthouse with a faded red cupola, partially obscured by drifting coastal fog. Late autumn dusk, twenty minutes after sunset — the sky holds a low band of warm honey-gold horizon transitioning into deep navy above. A single warm lamp glows inside the lighthouse lantern room. Background: cold dark Atlantic, slow ocean swell, salt mist drifting right to left across frame. Foreground: weathered cedar driftwood silhouette lower right, slightly out of focus. Shot on 35mm anamorphic, Kodak Vision3 500T pushed one stop, film grain present and earned. Color grade: deep navy shadows, cream mist, antique gold highlight in the lamp and horizon band only. Mood: earned quiet, premium maritime, hope and weight held together. Composition leaves clean negative space in the upper-left quadrant and a clean lower-left foreground. No people, no faces, no logos, no text, no signage, no boats with readable hull markings. Loopable 8 seconds — fog drifts continuously without a visible cut, swell rises and falls once. No HDR, no oversaturation, no tropical look, no palm trees, no neon, no drone orbit, no whip-pan.
```

### 02 — Sailboat Bow at Golden Hour

```
Slow first-person drift from the bow of a vintage wooden sailboat as it cuts gently through calm late-afternoon Atlantic water. The camera is fixed on the bowsprit; the bow rises and falls almost imperceptibly with the swell. Right side of frame: a furled white mainsail catches low golden light from the setting sun, which is positioned roughly two-thirds right and just above the horizon line. Distant left: a faint smudge of coastline at the horizon. Water: cold steel-blue with warm gold ripples reflecting off the sun's mirror line. Shot on 35mm, Kodak Portra 800, slight handheld micro-shake, anamorphic lens flare allowed only on the sun. Color grade: navy water, cream sail, antique gold sun reflection. No people visible, no faces, no hands, no logos, no readable type, no boat hardware brand names. Composition leaves the upper-left and entire left third clean. Loopable 6 seconds — the swell completes one cycle, the camera does not pan, the sun does not move. No HDR, no tropical color, no neon, no drone, no whip-pan, no rapid cuts.
```

### 03 — Fog Roll Across Harbor

```
Static wide shot of a Northeast working harbor at first light — roughly 6:15 AM in October. Foreground (lower right): the dark silhouette of a weathered wooden dock piling with a single brass cleat catching faint warm light. Mid-ground: thick coastal fog rolling slowly from right to left across the harbor mouth, partially revealing and re-concealing the masts of two anchored sailboats. Background: faint cool blue pre-dawn sky with one band of warm gold along the eastern horizon, half-veiled by fog. Water surface: glass-still, no chop. The fog is the motion — it drifts continuously, swallowing and releasing the masts. Shot on 35mm, Ilford HP5 pushed for tonal grain, monochrome lean with one warm gold tint reserved for the horizon and cleat highlight only. Color grade: cool navy 90% of frame, cream fog, narrow antique gold band. No people, no faces, no readable type, no boat names, no flags, no signage. Composition: upper-left and lower-left clean. Loopable 8 seconds — fog drift is continuous, no visible cut point. No HDR, no neon, no tropical, no rapid motion, no drone, no whip-pan.
```

### 04 — Sail Flapping Against Sun (abstract texture)

```
Tight medium shot, low angle looking up at a weathered cream canvas sail flapping slowly in coastal wind, backlit by a hazy late-afternoon sun positioned just behind and to the right of the sail's edge. The fabric ripples in slow waves — left-to-right, then settling, then rippling again. Visible texture: hand-stitched seams, faded canvas weave, one old painted number "26" partially visible at the lower edge. Background visible only at the sail's edges: pale gold haze sky, no detail. Below the sail's lower edge: faint blurred horizon line, suggestion of distant ocean grass or dune. Shot on 35mm, Kodak Portra 400, soft lens flare from the sun bleed at the right edge. Color grade: cream sail dominant, navy in the deep fabric shadows, antique gold sun bleed. No people visible, no hands, no faces, no boat hardware, no logos, no readable text except the partial "26" weathered into the canvas. Loopable 6 seconds — fabric ripple completes one full cycle. No HDR, no oversaturation, no tropical color, no neon, no rapid motion, no drone, no whip-pan.
```

### 05 — Stone Jetty at Blue Hour

```
Slow static wide of a granite stone jetty extending right-to-left into a calm pre-storm Atlantic. The horizon line sits one-third from the bottom. Sky: heavy navy-grey weather above, with a narrow band of warm honey-gold breaking through the cloud bank at the horizon, two-thirds right. Water: slow swell rolling against the jetty's outer edge, gentle white foam wash that recedes and returns. Foreground: weathered granite stones, lichen, faint salt crust catching the low gold light. No structures visible beyond the jetty. Shot on 35mm anamorphic, Kodak Vision3 250D, film grain present. Color grade: navy sky and water dominant, cream foam, antique gold horizon break. No people, no faces, no boats, no birds in focus, no logos, no readable type, no signage. Composition: upper-left and lower-left clean, the gold horizon break and the swell impact sit right of center. Loopable 8 seconds — one full swell cycle, no camera movement. No HDR, no oversaturation, no neon, no tropical, no drone orbit, no whip-pan, no rapid cuts.
```

---

## POST-GEN CHECKLIST (before swapping into the site)

1. **Loop test.** Drop the MP4 into a 10-second loop in QuickTime. If you can see the cut, re-roll or trim.
2. **Headline overlay test.** Open the file at full screen, slide a navy `#0c1825` rectangle over the upper-left 40% at 0.55 opacity. Can you imagine "Media / done right." reading cleanly? If the answer is no, the focal subject is too left or too bright in the wrong quadrant.
3. **Tone test.** Stand back 6 feet from the monitor. Does it feel like Bennett Coast / Quadeca, or does it feel like a stock 4K harbor reel? If stock — kill it.
4. **Compress to ≤4 MB.** Use `ffmpeg -i in.mp4 -c:v libx264 -crf 26 -preset slow -an -movflags +faststart -vf "scale=1920:1080,fps=24" hero-loop.mp4`. Mute audio (`-an`), strip metadata, web-optimize.
5. **Drop to `website/assets/video/hero-loop.mp4`.** No code changes needed — the existing `<video>` tag picks it up.
6. **Update the poster.** Pull a still from the loop (`ffmpeg -i hero-loop.mp4 -ss 00:00:02 -vframes 1 hero-bg.jpg`) and replace `website/assets/images/hero/hero-bg.jpg` so the pre-load frame matches.

---

## RUNNER (drop-in Node script when ready)

When the prompt is locked, mirror the pattern from `scripts/pd-fal-gen.js` — swap the model id, change `image_size` → `aspect_ratio: "16:9"`, set `duration: "8s"`, and stream the resulting MP4 to `website/assets/video/hero-loop.mp4`. Don't generate from the playground UI for the final — script it so the prompt is reproducible.
