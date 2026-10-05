// Traces each project's exported logo into editable vector layers (src/vectors/*.js).
// PROVISIONAL: no Figma or SVG masters were reachable (Figma MCP needs authorization;
// project repositories only ship PNG exports). Replace these with the original vectors
// when available; the factories only depend on the { width, height, layers } shape.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs"
import { join } from "node:path"
import { PNG } from "pngjs"
import potrace from "potrace"
import { root } from "./browser.mjs"

const pub = (file) => join(root, "../../public", file)
const src = (file) => join(root, "sources", file)
const near = (r, g, b, [R, G, B], tolerance) => Math.hypot(r - R, g - G, b - B) < tolerance
const opaque = (a) => a > 128

// Appeara icon colour classes (crop px). Lavender needs real blue lift so the plate's anti-aliased rim is excluded;
// white is only taken well inside the icon, where it can only be the eyes.
const lavender = (r, g, b) => b > 140 && b - r > 12
const eyeWhite = (r, g, b, x, y) => Math.min(r, g, b) > 225 && x > 30 && x < 330 && y > 30 && y < 330
const appearaFill = (r, g, b, x, y) => lavender(r, g, b) || eyeWhite(r, g, b, x, y) || (r - b > 40 && r > 170)

// Each layer: match(r, g, b, a, x, y) -> boolean, in crop pixel coordinates.
// "silhouette" layers fill everything enclosed by the matched ink (flood fill from the crop border).
export const LOGOS = [
  { id: "001", name: "preface", file: src("logos/preface-logo.png"), source: "Drakatoa/aed-preface-atcm4341 src/assets/preface-logo.png",
    layers: [
      { name: "block", color: "#70587c", match: (r, g, b, a) => opaque(a) },
      { name: "marks", color: "#c7b5da", match: (r, g, b, a) => opaque(a) && r > 160 && b > 185 },
    ] },
  { id: "002", name: "aegis", file: src("logos/aegis-logo.png"), source: "Drakatoa/Aegis icons/logo.png",
    layers: [
      { name: "shield", color: "#3a3576", match: (r, g, b, a) => opaque(a) },
      { name: "gold", color: "#f5cf32", match: (r, g, b, a) => opaque(a) && r > 190 && g > 140 && b < 130 },
      { name: "swirl", color: "#5ad0ff", match: (r, g, b, a) => opaque(a) && b > 200 && g > 160 && r < 160 },
    ] },
  { id: "004", name: "auralis", file: pub("auralisproject.png"), crop: [584, 352, 204, 126], upscale: 4, source: "portfolio public/auralisproject.png (Auralis landing art)",
    layers: [{ name: "bars", sample: true, close: [0, 3], match: (r, g, b) => Math.max(r, g, b) > 150 && Math.max(r, g, b) - Math.min(r, g, b) > 90 }] },
  { id: "005", name: "ideate", optTolerance: 1, file: src("logos/ideate-logo.png"), crop: [10, 10, 300, 340], upscale: 2, source: "Drakatoa/ideatehackutd2025 public/ideate-logo.png",
    layers: [
      { name: "plate", color: "#0b0d24", silhouette: true, match: (r, g, b, a) => a > 150 },
      { name: "mark", sample: true, match: (r, g, b, a) => a > 150 },
    ] },
  { id: "006", name: "inclusion", file: pub("deiproject.png"), crop: [612, 296, 372, 162], upscale: 2, source: "portfolio public/deiproject.png",
    layers: [
      // Fill plus white keyline, separated by each letter's column so outlines stay with their letter.
      { name: "D", color: "#fff33a", match: (r, g, b, a, x) => x < 128 && Math.max(r, g, b) > 140 },
      { name: "E", color: "#f3f1ec", match: (r, g, b, a, x) => x >= 128 && x < 252 && Math.max(r, g, b) > 140 },
      { name: "I", color: "#9b59d0", match: (r, g, b, a, x) => x >= 252 && Math.max(r, g, b) > 140 },
    ] },
  { id: "007", name: "hackmate", file: pub("hackmateproject.png"), crop: [440, 190, 500, 410], upscale: 1, source: "portfolio public/hackmateproject.png",
    layers: [{ name: "mark", sample: true, match: (r, g, b) => r + b > 230 }] },
  { id: "008", name: "delhi", optTolerance: 1.2, file: pub("delhi-logo-with-symbolism.png"), crop: [360, 100, 360, 280], upscale: 3, source: "portfolio public/delhi-logo-with-symbolism.png",
    // Lotus petals and the blue torch base only: the wordmark and Olympic rings are excluded.
    layers: [
      { name: "petals", sample: true, match: (r, g, b, a, x, y) => r > 170 && b < 120 && g < 215 && (y < 222 || (x > 130 && x < 230)) },
      { name: "torch", color: "#1d3f9a", match: (r, g, b, a, x, y) => b > 110 && r < 90 && x > 125 && x < 235 },
      { name: "plate", color: "#353541", silhouette: true, close: [6, 6], match: (r, g, b, a, x, y) => (r > 170 && b < 120 && g < 215 && (y < 222 || (x > 130 && x < 230))) || (b > 110 && r < 90 && x > 125 && x < 235) },
    ] },
  { id: "009", name: "zenz", optTolerance: 1, file: pub("zenzproject.png"), crop: [252, 138, 244, 144], upscale: 4, source: "portfolio public/zenzproject.png",
    layers: [{ name: "lotus", color: "#ec76c3", match: (r, g, b) => r > 170 && g < 160 }] },
  { id: "010", name: "arc", file: pub("arcproject.png"), crop: [883, 327, 654, 653], upscale: 1, source: "portfolio public/arcproject.png",
    layers: [{ name: "A", color: "#f4f4f2", match: (r, g, b) => r > 170 && g > 170 && b > 170 }] },
  { id: "011", name: "csa", optTolerance: .8, file: pub("csa-front-emblem-liz-art.png"), crop: [3760, 360, 1790, 1660], downscale: 2, source: "portfolio public/csa-front-emblem-liz-art.png (emblem art: Liz Michel)",
    layers: [
      // The ring is broken where the hat and spatula cross it, so add the fitted ring disc
      // (centre 771,898, outer radius 726 in crop px; the crop holds the full spatula and stops above the wordmark) to keep the whole emblem body cream.
      { name: "backing", color: "#feecc8", silhouette: true, disc: [771, 898, 726], match: (r, g, b, a) => opaque(a) && r < 110 },
      { name: "lines", color: "#455668", match: (r, g, b, a) => opaque(a) && r < 110 },
    ] },
  { id: "013", name: "arrestoriq", file: pub("arrestoriq.png"), crop: [680, 540, 400, 410], upscale: 1, source: "portfolio public/arrestoriq.png (ArrestorIQ mark only; Emerson logo excluded)",
    layers: [
      // The bright lower-right quadrant is the revealed fold; the dark "page" sits above it.
      { name: "disc", sample: true, silhouette: true, match: (r, g, b) => g > r + 30 },
      { name: "page", sample: true, close: [2, 2], turdSize: 400, match: (r, g, b) => g > r + 30 && !(g > 168 && g - r > 125) },
      { name: "letters", color: "#ffffff", enclosed: true, match: (r, g, b) => r > 215 && g > 215 && b > 215 },
    ] },
  // The "catfish." wordmark (Instrument Serif, ink #24251f on paper #f6f3ec), traced from the 1200x800 Devpost thumbnail.
  // The thumbnail sets the full stop in ink; it is split out (source x >= 496) so the factory can colour it the app's red.
  { id: "015", name: "catfish", optTolerance: .4, file: src("logos/catfish-thumb.png"), crop: [62, 297, 482, 198], upscale: 4, source: "Devpost thumbnail for Catfish (devpost.com/software/catfish-training-against-romance-scams), \"catfish.\" wordmark only",
    layers: [
      { name: "paper", color: "#f6f3ec", silhouette: true, close: [6, 6], grow: 7, match: (r, g, b) => r + g + b < 420 },
      { name: "word", color: "#24251f", match: (r, g, b, a, x) => x < 434 && r + g + b < 420 },
      { name: "stop", color: "#aa392d", match: (r, g, b, a, x) => x >= 434 && r + g + b < 420 },
    ] },
  // The Appeara app icon (dark rounded square, lavender character with pencil and star), traced from the 1070x620
  // Devpost thumbnail; the icon is only 352 px tall there, so it is upscaled 4x before tracing.
  { id: "016", name: "appeara", optTolerance: .5, file: src("logos/appeara-thumb.png"), crop: [356, 79, 360, 360], upscale: 4, source: "Devpost thumbnail for Appeara (devpost.com/software/ink-bound), app icon only; the APPEARA wordmark is excluded",
    layers: [
      { name: "plate", color: "#1c2131", silhouette: true, close: [2, 2], match: (r, g, b) => Math.max(r, g, b) < 150 || b - r > 8 || r - b > 40 },
      // The dark outline and face features: every coloured fill grown by the outline's width (about 5 px), so the
      // lines between and inside the fills are covered while the open gap under the chin stays plate.
      { name: "ink", color: "#0c0e1a", grow: 5, within: "plate", match: (r, g, b, a, x, y) => appearaFill(r, g, b, x, y) },
      // Fill only: face features and inner lines stay open, so they show the ink layer behind.
      { name: "body", sample: true, match: (r, g, b, a, x, y) => lavender(r, g, b) || eyeWhite(r, g, b, x, y) },
      { name: "pencil", color: "#f3b23c", match: (r, g, b) => r > 180 && g > 100 && b < 110 && r - b > 80 },
      { name: "tip", color: "#f2d0a6", match: (r, g, b) => r > 200 && g > 160 && b > 120 && b < 200 && r - b > 30 },
      { name: "eraser", color: "#e0657e", match: (r, g, b) => r > 170 && g < 150 && b > 90 && r - b > 30 },
      { name: "star", color: "#dcd6fa", grow: 1, within: "plate", match: (r, g, b, a, x, y) => x >= 285 && y >= 280 && b > 140 && b - r > 20 },
    ] },
]

function load(file) { return PNG.sync.read(readFileSync(file)) }

function coverage(png, logo, layer) {
  const [x0, y0, w, h] = logo.crop || [0, 0, png.width, png.height]
  const mask = new Float32Array(w * h)
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const o = ((y0 + y) * png.width + x0 + x) * 4
    const d = png.data
    mask[y * w + x] = layer.match(d[o], d[o + 1], d[o + 2], d[o + 3], x, y) ? 1 : 0
  }
  if (layer.disc) {
    const [cx, cy, radius] = layer.disc
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (Math.hypot(x - cx, y - cy) <= radius) mask[y * w + x] = 1
  }
  // "grow": dilate by a disc of this radius (crop px), e.g. an outline ring around a fill or a
  // backing margin. It runs before "silhouette", so gaps the growth closes off are filled too.
  if (layer.grow) growMask(mask, w, h, layer.grow)
  if (layer.close) closeMask(mask, w, h, layer.close)
  if (layer.silhouette || layer.enclosed) {
    // Flood fill the "outside" from the border through unmatched pixels.
    const outside = new Uint8Array(w * h)
    const stack = []
    const push = (x, y) => { if (x < 0 || y < 0 || x >= w || y >= h) return; const i = y * w + x; if (outside[i] || mask[i]) return; outside[i] = 1; stack.push(i) }
    for (let x = 0; x < w; x++) { push(x, 0); push(x, h - 1) }
    for (let y = 0; y < h; y++) { push(0, y); push(w - 1, y) }
    while (stack.length) { const i = stack.pop(); const x = i % w, y = (i / w) | 0; push(x + 1, y); push(x - 1, y); push(x, y + 1); push(x, y - 1) }
    if (layer.silhouette) for (let i = 0; i < mask.length; i++) mask[i] = outside[i] ? 0 : 1
    if (layer.enclosed) {
      // Matched pixels that are not reachable from the border through other matched pixels.
      const ink = new Uint8Array(w * h)
      for (let i = 0; i < mask.length; i++) ink[i] = mask[i] ? 1 : 0
      const seen = new Uint8Array(w * h)
      const s = []
      const go = (x, y) => { if (x < 0 || y < 0 || x >= w || y >= h) return; const i = y * w + x; if (seen[i] || !ink[i]) return; seen[i] = 1; s.push(i) }
      for (let x = 0; x < w; x++) { go(x, 0); go(x, h - 1) }
      for (let y = 0; y < h; y++) { go(0, y); go(w - 1, y) }
      while (s.length) { const i = s.pop(); const x = i % w, y = (i / w) | 0; go(x + 1, y); go(x - 1, y); go(x, y + 1); go(x, y - 1) }
      for (let i = 0; i < mask.length; i++) mask[i] = ink[i] && !seen[i] ? 1 : 0
    }
  }
  // "within": keep only pixels that are also inside another layer of the same logo.
  if (layer.within) {
    const other = coverage(png, logo, logo.layers.find((l) => l.name === layer.within)).mask
    for (let i = 0; i < mask.length; i++) mask[i] = Math.min(mask[i], other[i])
  }
  return { mask, w, h }
}

function growMask(mask, w, h, radius) {
  const src = Float32Array.from(mask)
  const r = Math.ceil(radius)
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    if (src[y * w + x]) continue
    search: for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) {
      const xx = x + dx, yy = y + dy
      if (xx < 0 || yy < 0 || xx >= w || yy >= h || dx * dx + dy * dy > radius * radius) continue
      if (src[yy * w + xx]) { mask[y * w + x] = 1; break search }
    }
  }
}

// Morphological closing (dilate then erode) with a box of radius [rx, ry]: bridges
// scanline gaps and narrow cuts so silhouettes and backing plates come out solid.
function closeMask(mask, w, h, [rx, ry]) {
  const pass = (src, dilate) => {
    const tmp = new Float32Array(w * h), out = new Float32Array(w * h)
    const pick = dilate ? Math.max : Math.min
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { let v = dilate ? 0 : 1; for (let d = -rx; d <= rx; d++) { const xx = x + d; if (xx >= 0 && xx < w) v = pick(v, src[y * w + xx]) } tmp[y * w + x] = v }
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { let v = dilate ? 0 : 1; for (let d = -ry; d <= ry; d++) { const yy = y + d; if (yy >= 0 && yy < h) v = pick(v, tmp[yy * w + x]) } out[y * w + x] = v }
    return out
  }
  mask.set(pass(pass(mask, true), false))
}

function resample({ mask, w, h }, factor) {
  if (factor === 1) return { mask, w, h }
  const W = Math.round(w * factor), H = Math.round(h * factor)
  const out = new Float32Array(W * H)
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const sx = Math.min(w - 1.001, Math.max(0, (x + .5) / factor - .5)), sy = Math.min(h - 1.001, Math.max(0, (y + .5) / factor - .5))
    const ix = Math.floor(sx), iy = Math.floor(sy), fx = sx - ix, fy = sy - iy
    const at = (xx, yy) => mask[yy * w + xx]
    out[y * W + x] = at(ix, iy) * (1 - fx) * (1 - fy) + at(ix + 1, iy) * fx * (1 - fy) + at(ix, iy + 1) * (1 - fx) * fy + at(ix + 1, iy + 1) * fx * fy
  }
  return { mask: out, w: W, h: H }
}

function toPng({ mask, w, h }) {
  const png = new PNG({ width: w, height: h })
  for (let i = 0; i < mask.length; i++) { const v = mask[i] > .5 ? 0 : 255; png.data[i * 4] = png.data[i * 4 + 1] = png.data[i * 4 + 2] = v; png.data[i * 4 + 3] = 255 }
  return PNG.sync.write(png)
}

const trace = (buffer, options) => new Promise((resolve, reject) => potrace.trace(buffer, options, (error, svg) => (error ? reject(error) : resolve(svg))))

// A coarse RGB grid of the crop so factories can sample original gradients onto faces.
function colorGrid(png, logo, size = 48) {
  const [x0, y0, w, h] = logo.crop || [0, 0, png.width, png.height]
  const gw = size, gh = Math.max(1, Math.round(size * h / w))
  const bytes = []
  for (let gy = 0; gy < gh; gy++) for (let gx = 0; gx < gw; gx++) {
    // Average opaque, saturated-enough pixels of the cell; fall back to the plain average.
    let r = 0, g = 0, b = 0, n = 0
    for (let y = Math.floor(gy * h / gh); y < Math.floor((gy + 1) * h / gh); y++) for (let x = Math.floor(gx * w / gw); x < Math.floor((gx + 1) * w / gw); x++) {
      const o = ((y0 + y) * png.width + x0 + x) * 4
      if (png.data[o + 3] < 128) continue
      const keep = logo.layers.some((layer) => layer.sample && layer.match(png.data[o], png.data[o + 1], png.data[o + 2], png.data[o + 3], x, y))
      if (!keep) continue
      r += png.data[o]; g += png.data[o + 1]; b += png.data[o + 2]; n++
    }
    bytes.push(n ? r / n : 0, n ? g / n : 0, n ? b / n : 0, n ? 255 : 0)
  }
  return { width: gw, height: gh, rgba: Buffer.from(bytes.map(Math.round)).toString("base64") }
}

const only = process.argv.slice(2)
mkdirSync(join(root, "src/vectors"), { recursive: true })
for (const logo of LOGOS) {
  if (only.length && !only.includes(logo.id)) continue
  const png = load(logo.file)
  const factor = logo.upscale || 1 / (logo.downscale || 1)
  const [, , cw, ch] = logo.crop || [0, 0, png.width, png.height]
  const layers = []
  for (const layer of logo.layers) {
    const sampled = resample(coverage(png, logo, layer), factor)
    const svg = await trace(toPng(sampled), { threshold: 128, turdSize: layer.turdSize ?? Math.max(2, 6 * factor * factor), optTolerance: logo.optTolerance ?? .35, alphaMax: 1, turnPolicy: potrace.Potrace.TURNPOLICY_MINORITY })
    const d = (svg.match(/ d="([^"]+)"/) || [])[1] || ""
    // Store paths in crop pixel units regardless of the tracing scale.
    const scaled = d.replace(/-?\d+(\.\d+)?/g, (n) => String(+(Number(n) / factor).toFixed(2)))
    layers.push({ name: layer.name, ...(layer.color ? { color: layer.color } : {}), ...(layer.sample ? { sample: true } : {}), d: scaled })
    console.log(`${logo.id} ${layer.name}: ${scaled.length} chars`)
  }
  const vector = { id: logo.id, source: logo.source, crop: logo.crop || null, width: cw, height: ch, provenance: "Traced with potrace from the exported raster; provisional until original vectors are available.", layers, ...(logo.layers.some((l) => l.sample) ? { colors: colorGrid(png, logo) } : {}) }
  writeFileSync(join(root, `src/vectors/${logo.id}-${logo.name}.js`), `// Generated by scripts/trace-logos.mjs. ${vector.provenance}\n// Source: ${logo.source}\nexport default ${JSON.stringify(vector, null, 1)}\n`)
}
