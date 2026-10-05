import * as THREE from "three"
import type { Project } from "@/lib/projects"
import { getProjectWedgeColors } from "@/lib/project-colors"
import { trophyModels } from "./models"

const initialAngle = -.32

function disposeObject(object: THREE.Object3D) {
  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return
    child.geometry.dispose()
    for (const material of Array.isArray(child.material) ? child.material : [child.material]) {
      for (const value of Object.values(material)) if (value instanceof THREE.Texture) value.dispose()
      material.dispose()
    }
  })
}

// Project trophies from tools/trophy-studio on the shared faceted platter. Logo trophies
// are built in code; the two game meshes (003, 014) load as GLB and appear when ready.
function artifact(project: Project, onLoad: (model: THREE.Object3D) => void) {
  const group = new THREE.Group()
  const chalk = new THREE.MeshStandardMaterial({ color: "#eeece8", roughness: .55, metalness: .25, flatShading: true })
  const dark = new THREE.MeshStandardMaterial({ color: "#353541", roughness: .55, metalness: .35, flatShading: true })
  const add = (geometry: THREE.BufferGeometry, material: THREE.Material, y: number) => {
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.y = y
    group.add(mesh)
  }

  // One faceted platter, shared across the whole collection's visual language.
  add(new THREE.CylinderGeometry(1.18, 1.28, .16, 12), dark, -.14)
  add(new THREE.CylinderGeometry(1.2, 1.2, .025, 12), chalk, -.045)
  add(new THREE.CylinderGeometry(1.05, 1.05, .018, 12), dark, -.02)

  const made = trophyModels[project.id]?.()
  if (made instanceof Promise) made.then(onLoad).catch(() => {})
  else if (made) group.add(made)

  group.rotation.y = initialAngle
  return group
}

// Idle spin: trophies turn slowly until someone picks one up (reset starts it again).
const SPIN_SPEED = .45 // radians per second, ≈14 s per turn

// onTurn reports whether an exhibit is away from its resting angle (drag, rotate) or back (reset).
export function createGallery(canvas: HTMLCanvasElement, root: HTMLElement, projects: Project[], onUnavailable: () => void, onTurn: (id: string, turned: boolean) => void = () => {}) {
  // Ask for the context ourselves: when the browser refuses one (too many contexts, GPU reset),
  // throw a plain error so callers fall back to the poster images instead of Three logging a crash.
  const gl = canvas.getContext("webgl2", { alpha: true, antialias: true, powerPreference: "low-power" })
  if (!gl || gl.isContextLost()) throw new Error("WebGL unavailable")
  const renderer = new THREE.WebGLRenderer({ canvas, context: gl })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
  renderer.setClearColor(0x000000, 0)
  renderer.autoClear = false
  // "Soft" lighting from the trophy studio: lower light plus Khronos Neutral tone
  // mapping, so light brand colours keep their hue instead of clipping to white.
  renderer.toneMapping = THREE.NeutralToneMapping
  let frame = 0
  let disposed = false
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  let lastFrame = 0
  const invalidate = () => { if (!frame && !disposed) frame = requestAnimationFrame(paint) }
  const exhibits = projects.map((project) => {
    const element = root.querySelector<HTMLElement>(`[data-trophy="${project.id}"]`)!
    const scene = new THREE.Scene()
    const model = artifact(project, (loaded) => {
      // A GLB that arrives after the view was released is freed instead of shown.
      if (disposed) disposeObject(loaded)
      else { model.add(loaded); invalidate() }
    })
    scene.add(model, new THREE.HemisphereLight(0xffffff, 0x42404e, 1.5))
    const key = new THREE.DirectionalLight(0xffffff, 2.5)
    key.position.set(-3, 5, 4)
    scene.add(key)
    const rim = new THREE.DirectionalLight(getProjectWedgeColors(project.title).light, 1.4)
    rim.position.set(3, 2, -3)
    scene.add(rim)
    const camera = new THREE.PerspectiveCamera(35, 1, .1, 30)
    camera.position.set(0, 2.3, 5.2)
    camera.lookAt(0, .65, 0)
    return { id: project.id, element, scene, model, camera, spinning: !reducedMotion }
  })
  function paint(now: number) {
    frame = 0
    if (disposed || document.hidden) { lastFrame = 0; return }
    // Cap the step so a resumed loop doesn't jump the trophies forward.
    const step = lastFrame ? Math.min((now - lastFrame) / 1000, .05) : 0
    lastFrame = now
    const width = window.innerWidth
    const height = window.innerHeight
    if (canvas.clientWidth !== width || canvas.clientHeight !== height || canvas.width !== Math.floor(width * renderer.getPixelRatio()) || canvas.height !== Math.floor(height * renderer.getPixelRatio())) renderer.setSize(width, height, false)
    renderer.setScissorTest(false)
    renderer.clear(true, true, true)
    renderer.setScissorTest(true)
    let animating = false
    for (const exhibit of exhibits) {
      const { element, camera, scene, model } = exhibit
      const rect = element.getBoundingClientRect()
      if (rect.bottom <= 0 || rect.top >= height || rect.right <= 0 || rect.left >= width) continue
      if (exhibit.spinning) { model.rotation.y += SPIN_SPEED * step; animating = true }
      camera.aspect = rect.width / rect.height
      camera.updateProjectionMatrix()
      renderer.setViewport(rect.left, height - rect.bottom, rect.width, rect.height)
      renderer.setScissor(Math.max(0, rect.left), Math.max(0, height - rect.bottom), Math.min(width, rect.right) - Math.max(0, rect.left), Math.min(height, rect.bottom) - Math.max(0, rect.top))
      renderer.render(scene, camera)
    }
    // Keep the loop alive only while an on-screen trophy is spinning; otherwise render on demand.
    if (animating) invalidate()
    else lastFrame = 0
  }
  const removers: (() => void)[] = []
  for (const exhibit of exhibits) {
    const { element, model } = exhibit
    let pointer: number | null = null
    let x = 0
    let y = 0
    let startX = 0
    let held = false
    const down = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0) return
      pointer = event.pointerId; x = event.clientX; y = event.clientY; startX = x
      element.setPointerCapture(pointer)
      // A mouse/pen press picks the trophy up and stops its idle spin (it stays put until reset).
      // A touch might be a page scroll, so it only counts once it moves horizontally.
      held = event.pointerType !== "touch"
      if (held) { exhibit.spinning = false; onTurn(exhibit.id, true) }
    }
    const move = (event: PointerEvent) => {
      if (event.pointerId !== pointer) return
      if (!held) {
        if (Math.abs(event.clientX - startX) <= 6) return
        held = true
        exhibit.spinning = false
        onTurn(exhibit.id, true)
      }
      model.rotation.y += (event.clientX - x) * .012
      onTurn(element.dataset.trophy!, true)
      // Touch keeps vertical page scrolling; mouse also allows a bounded tilt.
      if (event.pointerType !== "touch") model.rotation.x = THREE.MathUtils.clamp(model.rotation.x + (event.clientY - y) * .005, -.25, .25)
      x = event.clientX; y = event.clientY
      invalidate()
    }
    const up = () => { pointer = null }
    element.addEventListener("pointerdown", down)
    element.addEventListener("pointermove", move)
    element.addEventListener("pointerup", up)
    element.addEventListener("pointercancel", up)
    element.addEventListener("lostpointercapture", up)
    removers.push(() => {
      element.removeEventListener("pointerdown", down); element.removeEventListener("pointermove", move)
      element.removeEventListener("pointerup", up); element.removeEventListener("pointercancel", up); element.removeEventListener("lostpointercapture", up)
    })
  }
  const lost = (event: Event) => { event.preventDefault(); onUnavailable() }
  canvas.addEventListener("webglcontextlost", lost)
  window.addEventListener("scroll", invalidate, { passive: true })
  window.addEventListener("resize", invalidate)
  document.addEventListener("visibilitychange", invalidate)
  const resize = new ResizeObserver(invalidate)
  resize.observe(root)
  // Webfonts can change the collection's position after it has been mounted.
  document.fonts.ready.then(invalidate)
  invalidate()
  return {
    rotate(id: string, amount: number) { const item = exhibits.find((entry) => entry.id === id); if (item) { item.spinning = false; item.model.rotation.y += amount; onTurn(id, true); invalidate() } },
    reset(id: string) { const item = exhibits.find((entry) => entry.id === id); if (item) { item.model.rotation.set(0, initialAngle, 0); item.spinning = !reducedMotion; onTurn(id, false); invalidate() } },
    dispose() {
      disposed = true; cancelAnimationFrame(frame); resize.disconnect(); removers.forEach((remove) => remove())
      window.removeEventListener("scroll", invalidate); window.removeEventListener("resize", invalidate)
      document.removeEventListener("visibilitychange", invalidate); canvas.removeEventListener("webglcontextlost", lost)
      // Frees geometries, materials and textures (the Eukarya GLB carries one).
      for (const { scene } of exhibits) disposeObject(scene)
      renderer.dispose(); renderer.forceContextLoss()
    },
  }
}
