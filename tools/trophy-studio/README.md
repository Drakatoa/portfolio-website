# Trophy studio

Authoring and review workspace for the 14 project trophies shown in the landing page's TROPHIES view. The site uses copies of these models in `lib/trophies/models/` (factories, `logo.js`, vectors) and `public/trophies/` (the two GLBs), with the **Soft** style's lighting. After changing a model here, copy it across again; see `docs/claude-handoffs/trophy-integration-notes.md`. The studio has its own `package.json`; the portfolio's root dependencies are untouched.

## Preview

```sh
cd tools/trophy-studio
npm ci
npm run dev        # http://localhost:5187
```

- `/` is the contact sheet. Each trophy is shown at the live tile sizes: 152×155 (360 px phone), 164×180 (390 px phone) and 332×250 (desktop), plus side and back views. Use **dark / light** to switch the background.
- `/?id=003` opens one trophy. It shows an interactive turntable (drag to turn; auto-spin stops off-screen and is off under reduced motion), the source reference beside it, front, three-quarter, side and back views, the phone sizes, and its statistics.
- `/?styles` compares render styles side by side at the desktop tile size; `/?styles&size=phone` does the same at 164×180. The **style** menu in the top bar applies a style to every page, and `?style=noir` sets one in the URL.
- `/?still=003&angle=0&w=332&h=250&bg=none` renders one still (add `&style=`). The scripts use this mode.
- `/vectors.html` shows the 2D check of every traced logo layer.

The viewer draws every tile with one WebGL context and scissor rectangles, using the same camera, lights and platter as `lib/trophies/gallery.ts`. In the **Site** style, what you see here is what the live collection would draw at the same CSS size.

## Render styles (`src/styles.js`)

| Style | What changes |
|---|---|
| Site | The live lighting, unchanged (hemisphere 2.8, key 4, rim 0.8; no tone mapping) |
| Soft | Lower light plus Khronos Neutral tone mapping, so brand colours stop clipping toward white. This is the proposed fix for "the logo shading is too bright". |
| Ink | Cel shading (3-band ramp) plus dark screen-space outlines of constant pixel width (inverted hull on smoothed normals) |
| Noir | Grayscale cel shading plus chalk outlines and a white rim, matching the black-and-white site |
| Pixel Noir | Noir rendered about 85 px tall, then upscaled with nearest-neighbour filtering: 2 px pixels on phones and 3 px on desktop. Five gray levels, light 4×4 ordered dither. |
| Pixel | Ink rendered about 85 px tall, 7 levels per channel, light ordered dither |

All styles run inside the shared single-context scissor renderer, with no extra canvases or post-processing chain. Each could be ported to `gallery.ts`; see `docs/claude-handoffs/trophy-integration-notes.md`.

## Rebuild

```sh
npm run fetch      # pinned source files into sources/ (git-ignored, needs `gh`)
npm run trace      # exported logos -> src/vectors/*.js (potrace, per colour layer)
npm run bake       # game meshes -> models/003-*.glb, models/014-*.glb
npm run stats      # every model -> models/*.glb + docs/stats.json
npm run render     # out/sheets (incl. styles-*.png), out/views, out/fallback, out/compare
node scripts/render.mjs --styles   # only the style comparison sheets
node scripts/review-blades.mjs     # site's P3R highlights: every blade, desktop + phone (needs localhost:3000)
```

The raw sources stay out of git. One of them, the cat mesh, is a third-party Unity Asset Store asset and must not be redistributed as a standalone file.

## Layout

| Path | What it is |
|---|---|
| `src/styles.js` | Render styles: cel materials, outline hulls, pixel pass |
| `src/shared.js` | Platter, materials, lights, camera and bounds, copied from `gallery.ts` |
| `src/registry.js` | One entry per project ID: artifact, evidence status, `create()` |
| `src/factories/*.js` | Editable Three.js factories (12 trophies) |
| `src/logo.js` | Vector layer → bevelled solid, standing-logo builder, contour simplifier |
| `src/vectors/*.js` | Traced logo layers (editable SVG path data + sampled colour grid) |
| `bake/pawkour.js`, `bake/eukarya.js` | Pose and composition for the two game-mesh trophies; every pose decision is in these files |
| `models/*.glb` | Final models (model only, no platter). 003 and 014 are the source of truth; the other 12 are derived copies of their factories |
| `out/fallback/*.png` | Static fallback per model, 664×500 transparent (2× desktop tile), initial angle |
| `out/sheets/` | Contact sheets on dark and light; `styles-desktop.png` and `styles-phone.png` compare the six styles |
| `out/views/` | Per model: front, side and back at 450 px and at the 164×180 phone tile, on dark (left) and light (right) |
| `out/compare/` | Model beside its source reference, captured from the browser detail page (003, 014, 012, 002, 008) |
| `out/reference/` | Original animation frames used to choose poses; 2D trace check |
| `docs/asset-inventory.md` | Per-ID evidence, provenance and licence, concept, uncertainty, statistics |
| `docs/stats.json` | Machine-readable statistics |

## Status (first pass, 2026-10-02)

- **Game meshes used directly:** 003 Pawkour (the game's playable cat, posed from its own run clip) and 014 Eukarya (the team's Tiktaalik, posed from its walk clip with a baked spine bend).
- **New model from project sources:** 012 Sonare.live (the title-logo microphone plus the game's exact Koi Swim gesture). A Miku-figure variant was started at Rajit's request and stopped; see the inventory.
- **Logos:** 11 trophies are **traced from exported rasters and are provisional**. Figma vectors were not reachable: the official Figma MCP plugin is configured but not authorized. When it is authorized, replace `src/vectors/*.js` with exported paths; the factories only need `{ width, height, layers: [{ name, d }] }`.
- Review fixes (2026-10-02):
  - Zenz's centre petal is open again; a bevel wider than the strokes had filled its tip.
  - The CSA emblem body is fully cream; the backing now includes the fitted ring disc.
  - ArrestorIQ's fold is modeled as a raised dark page over the bright quadrant.
  - Logo materials are less glossy (roughness 0.62, metalness 0.08).
- All models are within budget; exact figures are in `docs/stats.json`.
- Known rough spots are listed at the end of `docs/asset-inventory.md`.
