# Trophy asset inventory — first pass

Date: 2026-10-02. Statistics are for the model only, without the shared platter. They come from `npm run stats` (`docs/stats.json`). Bounds are in world units, where the platter top is y = 0. The limits are radius ≤ 1.12 and height ≤ 1.9.

**Status key**
- **original game mesh**: the project's own 3D asset, posed and converted.
- **new model from project sources**: built here from verified project material.
- **traced (provisional)**: vectorized with potrace from the project's exported logo raster. Replace with the original vectors when available.

## Access and blockers

| Source | Result |
|---|---|
| Figma | The official plugin `figma@claude-plugins-official` (v2.2.120) is installed. Its server `https://mcp.figma.com/mcp` reports **Needs authentication**. Nothing was changed in the MCP configuration. Until authorization, no Figma file or node was opened: not the ARC prototype (`6SD371fF4AKi2JseX9QSwZ`, node 15-12), not Zenz (`kgl4D7CnXkYnVTUd5uUc8E`, node 103-626), and not a portfolio file. No Figma node references can be given yet. |
| GitHub MCP | Failed to connect (HTTP 400). All repository reads used the authenticated `gh` CLI, read-only. |
| Repositories | Read-only sparse clones were made in the session scratchpad. Pinned copies of the files actually used are listed in `scripts/fetch-sources.mjs` and stored in git-ignored `sources/`. No other repository was modified. |
| SVG masters | None exist in the project repositories. `Auralis/frontend/src/logo.svg` is the React template logo. `ideatehackutd2025/public/icon.svg` is a framework template icon. |

## Per project

### 003 — Project Pawkour · original game mesh
- **Inspected:** `Drakatoa/Project-Pawkour@7fd6725` (public, no licence file). The playable cat is the `Kitty_001` prefab instance in `Assets/Scenes/Tutorial.unity`. Its overrides wire `cameraTransform`, `jumpAudioSource` and the low, medium and high velocity music clips. In `Level 1.unity` the `Player` is a Unity capsule with no cat mesh. All branches are merged into `main`. The key art is `public/projectpawkour.png`: a faceted cyan paw with a black leaping cat.
- **Asset:** `Assets/ithappy/Animals_FREE/Meshes/Kitty_001.fbx` (1,406 tris, 1 skinned mesh), clip `Kitty_001_run` (0.67 s).
- **Provenance and licence:** third party: ithappy, [*Animals FREE*](https://assetstore.unity.com/packages/3d/characters/animals/animals-free-260727), **Standard Unity Asset Store EULA**. That EULA allows modification, and distribution of an asset embedded in an application with substantial original content. It does not allow standalone redistribution. The trophy is a modified, posed bake embedded in the portfolio. The raw FBX is git-ignored. **Action for Rajit:** add the free pack to your own Unity Asset Store account before publishing, so the licence is held by you rather than only by a teammate's seat.
- **Changes:**
  - Pose is frame t = 0.82 of the game's own run clip, with no bone overrides. Turned to face +X, pitched up 24°, scaled to 1.66 long. Hind toes rest on the ledge edge, so it needs no support rod.
  - The atlas texture is watermarked ("ithappy"), so it is **not shipped**. Each face's palette colour was baked into vertex colours, taking the median of an 11×11 window to reject the watermark. This recovers the tuxedo look: black body, white paws and tail tip, green eyes, pink ears.
  - The lab ledge (graphite, cyan key-art band) is new geometry.
- **Uncertainty:** the ledge is generic lab geometry, not a game prop. The lab kit in the repo is also third party ("3D Laboratory Environment with Apparatus").
- **Stats:** 1,458 tris · 4 materials · 163 KB · radius 0.84 · height 1.59.

### 014 — Eukarya · original game mesh
- **Inspected:** `a-sriel/Eukarya@b9f2546` (public, **no licence file**). Contributors: a-sriel, Lcmiller411, Drakatoa, snail620. `Assets/Animals/` holds team-made creatures, with Blender sources in `BlendFiles/`. The textures listed in `assets_list.txt` are Poly Haven CC0 and none are used here.
- **Asset:** `Assets/Animals/Tiktaalik/tetrapod.fbx` (612 tris) plus the hand-painted `Tiktaalik.png`, committed by a-sriel on 2026-03-18. Tiktaalik is the game's water-to-land stage and matches the tetrapod in the key art `public/eukarya.png`.
- **Changes:**
  - Pose is frame t = 0.5 of the game's `Armature|Walk` clip (lateral S-flex).
  - A baked, smoothed spine bend: tail dips 6°, chest lifts 40°, neck lifts 16°. The front fins rest on a new faceted chalk shore rock, and the tail sits under a new translucent water slab (opacity 0.5).
  - The texture is embedded as JPEG.
- **Uncertainty:** the asset is the team's work and the repository has no licence. **Confirm with a-sriel** (likely modeller) and credit them. The bend is a baked transform, not an authored animation pose.
- **Stats:** 660 tris · 3 materials · 100 KB · radius 1.05 · height 0.87.

### 012 — Sonare.live · new model from project sources
- **Inspected:** `Drakatoa/magical-mirai-competition-2026@62c8a3e`, **private**. The README credits Drakatoa and Porukana. Sources:
  - Title logo `public/assets/title vars/full-color.png`: the "i" of LIVE is a gold microphone, plus a four-point sparkle and a ♫.
  - `src/ui/gesture-shapes.js`: the gesture vocabulary.
  - The released game on itch.io (linked from `lib/projects.ts`).
- **Concept:**
  - The faceted gold microphone from the logo, leaning like the "i".
  - The game's **Koi Swim** gesture, using the generator verbatim (`y = 0.32·sin 2πt`, 48 points). It is wrapped 165° around the mic as a tapered teal (#39C5BB) stroke rising out of a graphite base.
  - A chalk four-point sparkle ends the stroke.
- **Miku figure (stopped):** `public/assets/Miku Final Rig V1.vrm` (22,596 tris, MToon) carries VRM 1.0 metadata: `allowRedistribution: false`, `modification: "prohibited"`, `avatarPermission: "onlyAuthor"`, `commercialUsage: "personalNonProfit"`, and `authors`/`name` set to `"undefined"`. Rajit said the team made it. A posed bake using the game's `Finger Point Top Right.vrma` was started, but the session's permission check blocked it, so it was not built.
  - **Before revisiting:** update the VRM's own licence metadata in the game repository to reflect team ownership.
  - **Credit:** Hatsune Miku © Crypton Future Media, INC. www.piapro.net (Piapro Character License; non-commercial).
  - The VRM and two `.vrma` files were already copied into git-ignored `sources/sonare/` and are listed in `fetch-sources.mjs`. Delete them if this direction is dropped.
- **Uncertainty:** the microphone is modeled from the 2D logo; there is no 3D mic asset in the game.
- **Stats:** 1,428 tris · 6 materials · 37 KB · radius 0.77 · height 1.33.

### 001 — Preface · traced (provisional)
- **Source:** `Drakatoa/aed-preface-atcm4341@15e0cc5` `src/assets/preface-logo.png` (774×866, transparent). No licence file; Rajit's capstone team.
- **Concept:** the purple F-block. The F is cut through as negative space, with its ✗/✓ assessment tiles. Lavender marks sit raised on both faces.
- **Uncertainty:** traced, not the Figma master. Colours are taken from the PNG (#70587C, #C7B5DA).
- **Stats:** 1,664 tris · 4 materials · 106 KB · radius 0.65 · height 1.49.

### 002 — Aegis · traced (provisional)
- **Source:** `Drakatoa/Aegis@d109d3b` `icons/logo.png` (476×524, transparent). No licence file.
- **Concept:** a navy shield with the gold rim and studs, the cyan swirl and the gold sun in three depth layers. Rim and swirl are repeated on the back.
- **Stats:** 5,016 tris · 5 materials · 316 KB · radius 0.62 · height 1.57.

### 004 — Auralis · traced (provisional)
- **Source:** portfolio `public/auralisproject.png`, crop of the nine-bar mark. The same bar rhythm appears in `Auralis/ai-sfx-landing/public/images/pixelsfx-logo-new.png` (`Drakatoa/Auralis@34b2b77`).
- **Concept:** the nine-bar waveform as standing slabs. Each carries the original cyan-to-magenta gradient, sampled from the artwork into vertex colours with no texture. Scanline gaps were closed vertically before tracing.
- **Uncertainty:** the bar ends are traced from a glowing raster, so the corners are slightly irregular.
- **Stats:** 1,058 tris · 3 materials · 101 KB · radius 0.95 · height 1.15.

### 005 — Ideate · traced (provisional)
- **Source:** `Drakatoa/ideatehackutd2025@cadaa6d` `public/ideate-logo.png`.
- **Concept:** the speech bubble and circuit-brain with their original gradient. They sit on a deep-navy plate cut to the bubble silhouette, the mark's backdrop in `public/ideateproject.png`. The plate physically supports the inner sketch.
- **Stats:** 3,100 tris · 4 materials · 266 KB · radius 0.66 · height 1.52.

### 013 — ArrestorIQ · traced (provisional)
- **Source:** portfolio `public/arrestoriq.png`, the green "Ar" disc only. The Emerson logo in the same image is excluded, as a sponsor trademark.
- **Concept:** a thick disc in the sampled greens. The dark "page" (the disc minus the bright lower-right fold) is a separate raised layer, so its curled edge casts a visible lip over the fold. White "Ar" sits on top.
- **Not done:** a flame-arrestor cutaway. The public poster `public/arrestoriqposter.pdf` was not inspected for this pass, and no engineering geometry or measurements were used.
- **Uncertainty:** the fold boundary is traced by colour (bright greens: g > 168 and g − r > 125), so its curve follows the raster.
- **Stats:** 1,440 tris · 5 materials · 126 KB · radius 0.69 · height 1.43.

### 006 — Design for Inclusion · traced (provisional)
- **Source:** portfolio `public/deiproject.png`.
- **Concept:** the D, E and I letters in the case study's nonbinary-flag colours (yellow, white, purple), standing on a graphite foot, the flag's black.
- **Excluded:** the UTD monogram (a university trademark) and "at".
- **Uncertainty:** this is lettering rather than an object. No stronger recognisable artifact was found in the case-study images reviewed (thumbnail only).
- **Stats:** 584 tris · 5 materials · 40 KB · radius 1.00 · height 0.89.

### 007 — HackMate · traced (provisional)
- **Source:** portfolio `public/hackmateproject.png`. The repository `Evelas78/HackMate` is **private**; its `frontend/src/assets/hackmateLogo2.png` matches but was only read as a research copy.
- **Concept:** the `/>/` mark as three separate standing pieces (a team side by side) with the pink-violet gradient. A slim graphite post holds the chevron, which floats in 2D.
- **Stats:** 464 tris · 3 materials · 44 KB · radius 0.81 · height 1.43.

### 008 — Hometown Olympics: New Delhi · traced (provisional) · hypothetical identity project
- **Source:** portfolio `public/delhi-logo-with-symbolism.png`.
- **Concept:** the lotus-torch emblem. Petals keep their red-orange-yellow gradient and the blue torch base is raised; both sit on a closed graphite silhouette plate.
- **Excluded:** the "2024 new delhi" wordmark and the **Olympic rings** (IOC marks).
- **Stats:** 2,914 tris · 5 materials · 239 KB · radius 0.88 · height 1.45.

### 009 — Zenz · traced (provisional)
- **Source:** portfolio `public/zenzproject.png` (lotus crop, upsampled 4×). Brand board `public/zenz-brand-identity-logo-typography.png`.
- **Concept:** the pink lotus line mark (#EC76C3) raised on the app icon's pale-cyan rounded tile, as in the board's "App Logo".
- **Fix (review):** the centre petal is an outline with an open interior, as in the logo. A bevel wider than the ~6 px strokes had closed its pointed opening into a pink tip; the lotus layer now uses a hairline bevel and a finer contour tolerance.
- **Uncertainty:** the tile colour #C3F6FB was matched by eye, and the Figma file is not accessed.
- **Stats:** 11,340 tris · 4 materials · 701 KB · radius 0.68 · height 1.43. Within budget, but the finer contour tolerance doubled it; a cleaner vector source would cut it back.

### 010 — Arc · traced (provisional)
- **Source:** portfolio `public/arcproject.png`. The brand board `arc-brand-identity.png` notes "Arc logo was done in Figma using vector art", so the master exists but is not accessible yet.
- **Concept:** the white A with its arched crossbar, raised on the dark app-icon tile.
- **Stats:** 1,076 tris · 4 materials · 71 KB · radius 0.67 · height 1.41.

### 011 — UTD CSA shirt · traced (provisional)
- **Source:** portfolio `public/csa-front-emblem-liz-art.png` (6970×7162). **Emblem art by Liz Michel**; shirt art and design with **Chloe Tee and Liz Michel**, per `lib/projects.ts`.
- **Concept:** the P.F. Wang's chef-tiger emblem. Navy line art sits on a cream body on both faces, and the hat and spatula break the circle.
- **Fix (review):** the cream body is now continuous. The ring is broken where the hat and spatula cross it, so the earlier outside fill leaked in and removed part of the cream. The backing now adds the ring disc fitted to the line art: centre (4531, 1258) in source px, outer radius 726. The crop is now x 3760–5550 and y 360–2020 (source px). It holds the whole emblem, including the spatula head, which an earlier crop cut off on the right, and it stops above the wordmark at y 2044.
- **Not attempted:** the Wang-riding-the-Lao-Gan-Ma figurine. It would need invented 3D anatomy from flat line art, and the brief prefers the verified emblem.
- **Excluded:** the "P.F. WANG'S" wordmark and the P.F. Chang's reference artwork on the same sheet.
- **Stats:** 11,804 tris · 4 materials · 756 KB · radius 0.81 · height 1.57.

### 015 — Catfish · traced (provisional)
- **Source:** the Devpost thumbnail (`devpost.com/software/catfish-training-against-romance-scams`, 1200×800), copied to `sources/logos/catfish-thumb.png`. Crop x 62–544, y 297–495 (source px): the "catfish." wordmark only, set in Instrument Serif (OFL). Traced from the raster at 4× upscale; the curves were clean enough that a re-render from the font was not needed.
- **Concept:** the wordmark in the app's ink (`#24251f`), raised on both faces of a paper-coloured (`#f6f3ec`) backing cut to the word's silhouette (grown 7 px), so the dark letters read on the dark site. The full stop is the app's red (`#aa392d`); the thumbnail sets it in ink, so it is split out at source x ≥ 496. Graphite foot like the other wordmarks.
- **Stats:** 5,924 tris · 5 materials · 380 KB · radius 0.99 · height 0.86.

### 016 — Appeara · traced (provisional)
- **Source:** the Devpost thumbnail (`devpost.com/software/ink-bound`, 1070×620), copied to `sources/logos/appeara-thumb.png`. Crop x 356–716, y 79–439 (source px): the app icon only; the APPEARA wordmark is excluded. The icon is about 352 px tall, so it is traced at 4× upscale.
- **Concept:** the icon in layers, back to front: the dark rounded-square plate; the dark outline (every fill grown by the outline width, about 5 px); the lavender character with its original shading sampled onto vertices, its face features and inner lines left open to show the outline; the pencil, its tan tip and pink eraser, behind the hand; and the drawn star. The back is the plain plate, like Ideate.
- **Stats:** 6,092 tris · 9 materials · 496 KB · radius 0.68 · height 1.43.

## Brightness and render styles

The logos looked too bright under the site's lighting (hemisphere 2.8 plus key light 4, no tone mapping), because light brand colours clip toward white. Two changes:
- Logo materials are now less glossy (roughness 0.62, metalness 0.08 instead of 0.45 and 0.15).
- The **Soft** style is proposed: lower light plus Khronos Neutral tone mapping.

Compare Soft and the stylised options (Ink, Noir, Pixel Noir, Pixel) at `/?styles` and in `out/sheets/styles-*.png`.

## Remaining rough spots and specific fixes

1. **All 11 logos are traced.** Authorize Figma MCP, export each logo node as SVG, and replace `src/vectors/*.js`.
2. **014 Eukarya** has the lowest silhouette (0.87). At 152×155 the creature reads as a small lizard on a disc. Fixes:
   - Scale the creature up about 15%.
   - Rotate it diagonally across the platter (more length within the radius).
   - Make the rock a taller ledge.

   The fins are placed from bone joints, so check each fin–rock contact in the turntable.
3. **012 Sonare:** the stroke's lead-in from the base is thin, so the support reads weakly. Fixes:
   - Thicken the first 15% of the stroke.
   - Or end it in the base slot.

   The stroke also passes close to the mic head in some views.
4. **011 CSA** is the heaviest model (756 KB). Its fine interior lines blur at phone size, and the back shows the art mirrored. Fixes:
   - Raise the trace tolerance and thicken the lines by about 1.5 px before tracing.
   - Or keep the back plain cream with the ring only.
5. **003 Pawkour:** the black cat on the graphite ledge relies on its white paws and rim light at 152 px. A slightly lighter ledge top would help. The ledge is generic, not a game prop.
6. **004 Auralis:** rebuild the bars as measured rounded rectangles instead of traced glow edges.
7. **009 Zenz:** the lotus is still small within the tile at phone size; enlarge it to about 90% of the tile width. A Figma vector would also cut its 11k triangles.
8. **013 ArrestorIQ:** the fold is now raised relief. Consider the cutaway only after checking the public poster for what is safe to show.
9. **Letters and marks on the back are mirrored** (DEI, the Preface ✗/✓, Delhi's torch, CSA). Decide whether backs should be plain.
