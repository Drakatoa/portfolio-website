# Trophy integration notes

Prepared 2026-10-02. **Applied 2026-10-02** after Rajit's review, using the Soft style:
- Steps 1–4 are done.
- Step 5 (fallback images) is not applied; the poster still uses `project.image`.
- Step 6 is done: `DESIGN.md` and `docs/redesign/asset-sources.md` are updated.

To update a model later, edit it in the studio and copy `src/logo.js`, `src/factories/*.js` and `src/vectors/*.js` to `lib/trophies/models/`, or `models/003-*.glb` and `models/014-*.glb` to `public/trophies/`. The site and studio copies are currently identical.

## Artifact map

| ID | Project | Trophy | Ship as | Studio source |
|---|---|---|---|---|
| 001 | Preface | F-block mark with ✗/✓ tiles | factory | `src/factories/preface.js` + `src/vectors/001-preface.js` |
| 002 | Aegis | Shield, swirl, sun | factory | `aegis.js` + `002-aegis.js` |
| 012 | Sonare.live | Logo mic + Koi Swim gesture ribbon | factory | `sonare.js` |
| 003 | Project Pawkour | Game cat taking off from lab ledge | **GLB** | `models/003-project-pawkour.glb` (from `bake/pawkour.js`) |
| 004 | Auralis | Nine-bar waveform | factory | `auralis.js` + `004-auralis.js` |
| 005 | Ideate | Bubble + circuit-brain on navy plate | factory | `ideate.js` + `005-ideate.js` |
| 013 | ArrestorIQ | "Ar" disc | factory | `arrestoriq.js` + `013-arrestoriq.js` |
| 014 | Eukarya | Game Tiktaalik hauling out of water | **GLB** | `models/014-eukarya.glb` (from `bake/eukarya.js`) |
| 006 | Design for Inclusion | DEI letters, nonbinary-flag colours | factory | `inclusion.js` + `006-inclusion.js` |
| 007 | HackMate | `/>/` as three standing pieces | factory | `hackmate.js` + `007-hackmate.js` |
| 008 | Hometown Olympics: New Delhi | Lotus-torch emblem | factory | `delhi.js` + `008-delhi.js` |
| 009 | Zenz | Lotus on app-icon tile | factory | `zenz.js` + `009-zenz.js` |
| 010 | Arc | Arched-crossbar A on app tile | factory | `arc.js` + `010-arc.js` |
| 011 | UTD CSA | P.F. Wang's emblem | factory | `csa.js` + `011-csa.js` |
| 015 | Catfish | "catfish." wordmark on a paper backing, red full stop | factory | `catfish.js` + `015-catfish.js` |
| 016 | Appeara | App icon: character, pencil and star on the dark tile | factory | `appeara.js` + `016-appeara.js` |

Every studio file path above is under `tools/trophy-studio/`.

**Why factories for the logos:** the 13 vector modules total about 390 KB of path data (396,154 bytes raw), and need no network requests. The equivalent GLBs total about 2.4 MB. Only the two game meshes need GLB, because they carry baked skinning and one texture.

All models already respect the shared conventions:
- Pivot at the platter centre, upright, standing on y = 0.
- Radius ≤ 1.05, height ≤ 1.59.
- Designed for the existing camera (35°, `[0, 2.3, 5.2]` looking at `[0, .65, 0]`) and for `initialAngle = -.32`.

No camera change is needed.

## Smallest changes

1. **Copy files.**
   - Move `src/logo.js`, `src/factories/*.js` and `src/vectors/*.js` to `lib/trophies/models/`. They are plain ES modules; `allowJs` is on. Rename them to `.ts` only if you want types.
   - Copy `models/003-project-pawkour.glb` and `models/014-eukarya.glb` to `public/trophies/`.
   - Optionally copy `out/fallback/*.png` to `public/trophies/fallback/`.
2. **`lib/trophies/gallery.ts` → `artifact(project)`:**
   - Keep the three platter cylinders exactly as they are.
   - Delete the per-ID `if (project.id === …)` branches, the wordmark `else` branch, and the side accent posts.
   - Add the model from a lookup:
     ```ts
     import { trophyModels } from "./models" // { [id]: () => THREE.Object3D | Promise<THREE.Object3D> }
     const made = trophyModels[project.id]?.()
     if (made instanceof Promise) made.then((model) => { if (!disposed) { group.add(model); invalidate() } })
     else if (made) group.add(made)
     ```
     `artifact` needs access to `disposed` and `invalidate`. Create those before the exhibits, or pass a callback. The GLB entries use `GLTFLoader().loadAsync("/trophies/<file>.glb")` and return `gltf.scene`.
   - After this, `FontLoader`, `TextGeometry` and `barlow-condensed-black-italic.json` are unused. Remove the imports; whether to delete the font JSON and `scripts/build-trophy-font.py` is a separate decision.
3. **Disposal.** `dispose()` frees geometries and materials but **not textures**, and 014 has one. Add texture disposal next to the material loop:
   ```ts
   materials.forEach((m) => { for (const v of Object.values(m)) if (v instanceof THREE.Texture) v.dispose(); m.dispose() })
   ```
   Pending GLB loads must check `disposed` before adding to a scene (the guard shown in step 2). The filter remount already recreates the context, so no other change is needed.
4. **Rendering contract.** Unchanged: one shared context, on-demand `invalidate()`, viewport culling, DPR cap 1.5, no autoplay, touch `pan-y`, keyboard rotate and reset. The studio's turntable spin must **not** be ported.
   - 014's water uses `transparent` with `depthWrite: false` and `renderOrder = 2`. It renders correctly in the existing scissor loop, because each exhibit is its own scene.
5. **Fallback (optional).** `trophy-collection.tsx` currently shows `project.image` until WebGL is ready or if it fails. Showing `/trophies/fallback/<id>.png` instead would make the fallback match the object. Leave this until after review if the poster behaviour should stay.
6. **Docs.** Update the "Trophy collection" section of `DESIGN.md`, which still describes procedural placeholders and extruded wordmarks. Add credits to `docs/redesign/asset-sources.md`:
   - ithappy Animals FREE (Standard Unity Asset Store EULA).
   - Eukarya team / a-sriel (Tiktaalik).
   - Liz Michel and Chloe Tee (CSA emblem).
   - Traced provenance for the other logos.

## Optional: a render style

The studio compares six styles: Site, Soft, Ink, Noir, Pixel Noir and Pixel. See `tools/trophy-studio/src/styles.js` and `out/sheets/styles-*.png`. Porting one is local to `gallery.ts`:

- **Soft** is the smallest change. Use these values, set on the renderer once:
  - Hemisphere 1.5, key 2.5, rim 1.4.
  - `renderer.toneMapping = THREE.NeutralToneMapping`.

  No new materials are needed. It is the proposed answer to the logos looking too bright.
- **Ink and Noir:**
  - Swap each `MeshStandardMaterial` for a `MeshToonMaterial` with the 3-band `gradientMap`; Noir adds the grayscale `onBeforeCompile`.
  - Add one hidden-until-styled hull child per opaque mesh, using the `smoothNormal` attribute and the screen-space outline `ShaderMaterial`.
  - Before each exhibit's `render()`, set the outline `resolution` uniform to the tile's device-pixel size.
  - Dispose of the hull materials and the gradient texture in `dispose()`.
- **Pixel and Pixel Noir:**
  - Add one small `WebGLRenderTarget` per tile size (cache them by size) and one full-screen quad.
  - In the scissor loop, render the exhibit into the target, then draw the quad into the tile viewport. Use `renderPixel()` as the reference.
  - Dispose of the targets in `dispose()`.

  This adds one extra draw per visible tile, still on demand.

Keep the platter, camera and on-demand loop unchanged whichever style is chosen.

## Before shipping

- Replace the traced logo vectors with Figma exports once the Figma MCP is authorized (see the inventory).
- Rajit adds ithappy *Animals FREE* to his own Unity Asset Store account. Confirm Tiktaalik use and credit with the Eukarya team.
- Fix or accept the rough spots listed at the end of `tools/trophy-studio/docs/asset-inventory.md`.
- Verify in the real page: drag, keyboard rotate and reset, filter remount, desktop and phone, reduced motion, and the WebGL-failure fallback.
