// Review viewer. Like lib/trophies/gallery.ts it uses ONE WebGL context and draws
// each tile through a scissor rectangle, on demand, so what you see here is what
// the live collection's renderer will produce at the same CSS size.
import * as THREE from "three"
import { trophies } from "./registry.js"
import { STYLES, applyStyle, renderPixel, pixelSize } from "./styles.js"
import { INITIAL_ANGLE, BOUNDS, baseMaterials, createPlatter, addLights, createCamera, brighten, measure } from "./shared.js"

// Mirrors getProjectColor() in lib/project-colors.ts (rim light colour per project).
export function siteColor(title) {
  const t = title.toUpperCase()
  const rules = [["PREFACE", "#70587C"], ["AEGIS", "#5AD0FF"], ["IDEATE", "#5870BC"], ["INCLUSION", "#400C23"], ["ZENZ", "#EC76C3"], ["ARC", "#444549"], ["CSA", "#455668"], ["DELHI", "#FF6B35"], ["SONARE", "#39C5BB"], ["ARRESTOR", "#E8742C"], ["EUKARYA", "#6FBF73"]]
  for (const [key, color] of rules) if (t.includes(key)) return color
  return "#95959f"
}

const exhibits = new Map()
async function exhibit(entry) {
  if (exhibits.has(entry.id)) return exhibits.get(entry.id)
  const promise = (async () => {
    const scene = new THREE.Scene()
    const holder = new THREE.Group()
    const materials = baseMaterials(siteColor(entry.title))
    holder.add(createPlatter(materials))
    const model = await entry.create()
    holder.add(model)
    scene.add(holder)
    const rimColor = brighten(siteColor(entry.title), .4)
    const lights = addLights(scene, rimColor)
    const camera = createCamera()
    return { entry, scene, holder, model, camera, lights, rimColor, stats: measure(model) }
  })()
  exhibits.set(entry.id, promise)
  return promise
}

const params = new URLSearchParams(location.search)
const canvas = document.querySelector("#gl")
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, preserveDrawingBuffer: true })
renderer.setPixelRatio(Math.min(window.devicePixelRatio, params.has("still") ? 2 : 1.5))
renderer.setClearColor(0, 0)
renderer.autoClear = false
const tiles = [] // { element, item, angle(), tilt, style? }
let currentStyle = STYLES[params.get("style")] ? params.get("style") : "site"
const resolution = new THREE.Vector2()
let frame = 0
let spinning = false

function paint() {
  frame = 0
  const width = window.innerWidth, height = window.innerHeight
  renderer.setSize(width, height, false)
  renderer.setScissorTest(false)
  renderer.clear(true, true, true)
  renderer.setScissorTest(true)
  for (const tile of tiles) {
    if (!tile.item) continue
    const rect = tile.element.getBoundingClientRect()
    if (rect.bottom <= 0 || rect.top >= height || rect.right <= 0 || rect.left >= width) continue
    const { camera, scene, holder } = tile.item
    holder.rotation.set(tile.tilt || 0, INITIAL_ANGLE + tile.angle(), 0)
    camera.aspect = rect.width / rect.height
    camera.updateProjectionMatrix()
    const viewport = () => {
      renderer.setViewport(rect.left, height - rect.bottom, rect.width, rect.height)
      renderer.setScissor(Math.max(0, rect.left), Math.max(0, height - rect.bottom), Math.min(width, rect.right) - Math.max(0, rect.left), Math.min(height, rect.bottom) - Math.max(0, rect.top))
    }
    const styleName = tile.style || currentStyle
    const style = STYLES[styleName]
    renderer.toneMapping = style.toneMapping ?? THREE.NoToneMapping
    renderer.toneMappingExposure = style.exposure ?? 1
    if (style.pixel) { const size = pixelSize(style, rect.height); resolution.set(Math.round(rect.width / size), Math.round(rect.height / size)) }
    else resolution.set(rect.width * renderer.getPixelRatio(), rect.height * renderer.getPixelRatio())
    applyStyle(tile.item, styleName, resolution)
    viewport()
    if (style.pixel) renderPixel(renderer, scene, camera, rect.width, rect.height, style, viewport)
    else renderer.render(scene, camera)
  }
  if (spinning) invalidate()
}
const invalidate = () => { if (!frame) frame = requestAnimationFrame(paint) }
window.addEventListener("scroll", invalidate, { passive: true })
window.addEventListener("resize", invalidate)

function tile(parent, entry, { w, h, angle = 0, label, className = "tile" }) {
  const element = document.createElement("figure")
  element.className = className
  element.style.width = `${w}px`
  element.style.height = `${h}px`
  if (label) { const caption = document.createElement("figcaption"); caption.textContent = label; element.append(caption) }
  parent.append(element)
  const record = { element, item: null, angle: typeof angle === "function" ? angle : () => angle }
  tiles.push(record)
  exhibit(entry).then((item) => { record.item = item; invalidate() })
  return record
}

const SIZES = [
  { w: 152, h: 155, label: "phone 360 · 152×155" },
  { w: 164, h: 180, label: "phone 390 · 164×180" },
  { w: 332, h: 250, label: "desktop · 332×250" },
]
const BADGES = { "original-asset": "original game mesh", "original-vector": "original vector", "traced-export": "traced from exported logo (provisional)", "source-grounded": "new model from project sources", fallback: "fallback" }

function contactSheet(root) {
  for (const entry of trophies) {
    const row = document.createElement("section")
    row.className = "row"
    row.innerHTML = `<header><a href="?id=${entry.id}">${entry.id} · ${entry.title}</a><span class="badge" data-status="${entry.status}">${BADGES[entry.status]}</span><p>${entry.artifact}</p></header>`
    const strip = document.createElement("div")
    strip.className = "strip"
    row.append(strip)
    root.append(row)
    for (const size of SIZES) tile(strip, entry, size)
    tile(strip, entry, { w: 250, h: 250, angle: Math.PI / 2, label: "side" })
    tile(strip, entry, { w: 250, h: 250, angle: Math.PI, label: "back" })
  }
}

async function detail(root, entry) {
  root.innerHTML = `<p><a href="./">← all trophies</a></p><h1>${entry.id} · ${entry.title}</h1><p class="meta">${entry.artifact} — <span class="badge" data-status="${entry.status}">${BADGES[entry.status]}</span></p>`
  const top = document.createElement("div")
  top.className = "detail"
  root.append(top)
  let turn = 0, drag = null, last = performance.now()
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches
  const spinBox = document.createElement("label")
  spinBox.innerHTML = `<input type="checkbox" ${reduce ? "" : "checked"}> turntable (pauses when off-screen or with reduced motion)`
  spinBox.className = "spin"
  const turntable = tile(top, entry, { w: 450, h: 450, angle: () => {
    const now = performance.now()
    if (spinBox.firstChild.checked && !drag && visible) turn += (now - last) * .0006
    last = now
    return turn
  }, label: "drag to turn", className: "tile turntable" })
  let visible = true
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; spinning = visible && spinBox.firstChild.checked; invalidate() }).observe(turntable.element)
  spinBox.firstChild.addEventListener("change", () => { spinning = spinBox.firstChild.checked; invalidate() })
  spinning = !reduce
  turntable.element.addEventListener("pointerdown", (e) => { drag = e.clientX; turntable.element.setPointerCapture(e.pointerId) })
  turntable.element.addEventListener("pointermove", (e) => { if (drag === null) return; turn += (e.clientX - drag) * .012; drag = e.clientX; invalidate() })
  turntable.element.addEventListener("pointerup", () => { drag = null })
  const reference = document.createElement("figure")
  reference.className = "reference"
  reference.innerHTML = `<img src="${entry.reference}" alt="Source reference for ${entry.title}"><figcaption>source reference</figcaption>`
  top.append(reference)
  root.append(spinBox)
  const views = document.createElement("div")
  views.className = "strip"
  root.append(views)
  for (const [label, angle] of [["front", 0], ["three-quarter", Math.PI / 4], ["side", Math.PI / 2], ["back", Math.PI]]) tile(views, entry, { w: 300, h: 300, angle, label })
  const small = document.createElement("div")
  small.className = "strip"
  root.append(small)
  for (const size of SIZES) tile(small, entry, size)
  for (const angle of [Math.PI / 2, Math.PI]) tile(small, entry, { ...SIZES[1], angle, label: angle > 2 ? "phone · back" : "phone · side" })
  const item = await exhibit(entry)
  const { stats } = item
  const pre = document.createElement("pre")
  pre.textContent = `triangles ${stats.triangles}\nmaterials ${stats.materials}\nbounds min ${stats.min.map((v) => v.toFixed(2))} max ${stats.max.map((v) => v.toFixed(2))}\nmax radius ${stats.radius.toFixed(2)} (limit ${BOUNDS.radius}) · height ${stats.max[1].toFixed(2)} (limit ${BOUNDS.height})`
  root.append(pre)
}

// Side-by-side style comparison: one row per trophy, one column per style.
function styleSheet(root) {
  if (params.get("size") === "phone") document.body.dataset.size = "phone"
  const head = document.createElement("div")
  head.className = "style-head"
  head.innerHTML = `<span></span>${Object.values(STYLES).map((s) => `<span><b>${s.label}</b><br>${s.note}</span>`).join("")}`
  root.append(head)
  for (const entry of trophies) {
    const row = document.createElement("section")
    row.className = "style-row"
    row.innerHTML = `<a href="?id=${entry.id}">${entry.id}<br>${entry.title}</a>`
    root.append(row)
    for (const name of Object.keys(STYLES)) {
      const size = params.get("size") === "phone" ? { w: 164, h: 180 } : { w: 332, h: 250 }
      tile(row, entry, size).style = name
    }
  }
}

// Single still for scripted renders: ?still=003&angle=0&w=450&h=450
async function still(root, entry) {
  document.body.classList.add("still")
  const w = Number(params.get("w") || 450), h = Number(params.get("h") || 450)
  const record = tile(root, entry, { w, h, angle: Number(params.get("angle") || 0), className: "tile bare" })
  record.tilt = Number(params.get("tilt") || 0)
  await exhibit(entry)
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
  paint()
  window.stillReady = true
}

const app = document.querySelector("#app")
document.body.dataset.bg = params.get("bg") || "dark"
document.querySelector("#bg")?.addEventListener("click", () => { document.body.dataset.bg = document.body.dataset.bg === "dark" ? "light" : "dark" })
const id = params.get("id") || params.get("still")
const entry = trophies.find((t) => t.id === id)
const picker = document.querySelector("#style")
if (picker) {
  picker.innerHTML = Object.entries(STYLES).map(([name, s]) => `<option value="${name}" ${name === currentStyle ? "selected" : ""}>${s.label}</option>`).join("")
  picker.addEventListener("change", () => { currentStyle = picker.value; const url = new URL(location.href); url.searchParams.set("style", currentStyle); history.replaceState(null, "", url); invalidate() })
}
if (params.has("styles")) styleSheet(app)
else if (params.has("still") && entry) still(app, entry)
else if (entry) detail(app, entry)
else contactSheet(app)

// Model-only GLB export (no platter) for stats and as an integration-ready copy.
async function exportModel(id) {
  const { GLTFExporter } = await import("three/addons/exporters/GLTFExporter.js")
  const model = await trophies.find((t) => t.id === id).create()
  const buffer = await new GLTFExporter().parseAsync(model, { binary: true })
  const bytes = new Uint8Array(buffer)
  let binary = ""
  for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000))
  return { base64: btoa(binary), stats: measure(model) }
}

window.studio = { trophies, exhibit, exportModel, measure: async (id) => (await exhibit(trophies.find((t) => t.id === id))).stats, ready: () => Promise.all(trophies.map(exhibit)).then(() => { invalidate(); return true }) }
