// Shared trophy conventions, copied from lib/trophies/gallery.ts so studio renders
// match the live collection: platter, materials, lights and camera framing.
import * as THREE from "three"

export const INITIAL_ANGLE = -.32
// Usable volume above the platter top (y = 0). Every model must stay inside this
// cylinder through a full turn so nothing clips at the exhibit edges.
export const BOUNDS = { radius: 1.12, height: 1.9 }

export function baseMaterials(accent = "#95959f") {
  return {
    chalk: new THREE.MeshStandardMaterial({ name: "chalk", color: "#eeece8", roughness: .55, metalness: .25, flatShading: true }),
    dark: new THREE.MeshStandardMaterial({ name: "graphite", color: "#353541", roughness: .55, metalness: .35, flatShading: true }),
    accent: new THREE.MeshStandardMaterial({ name: "accent", color: accent, roughness: .5, metalness: .2 }),
  }
}

// One faceted platter, shared across the whole collection's visual language.
// Its top face sits at y = -0.011; models are authored standing on y = 0.
export function createPlatter(materials) {
  const group = new THREE.Group()
  group.name = "platter"
  const add = (geometry, material, y) => { const mesh = new THREE.Mesh(geometry, material); mesh.position.y = y; group.add(mesh) }
  add(new THREE.CylinderGeometry(1.18, 1.28, .16, 12), materials.dark, -.14)
  add(new THREE.CylinderGeometry(1.2, 1.2, .025, 12), materials.chalk, -.045)
  add(new THREE.CylinderGeometry(1.05, 1.05, .018, 12), materials.dark, -.02)
  return group
}

export function addLights(scene, rimColor) {
  const hemi = new THREE.HemisphereLight(0xffffff, 0x42404e, 2.8)
  scene.add(hemi)
  const key = new THREE.DirectionalLight(0xffffff, 4)
  key.position.set(-3, 5, 4)
  scene.add(key)
  const rim = new THREE.DirectionalLight(rimColor, .8)
  rim.position.set(3, 2, -3)
  scene.add(rim)
  return { hemi, key, rim }
}

export function createCamera(aspect = 1) {
  const camera = new THREE.PerspectiveCamera(35, aspect, .1, 30)
  camera.position.set(0, 2.3, 5.2)
  camera.lookAt(0, .65, 0)
  return camera
}

// Same rule as lib/project-colors.ts getProjectWedgeColors().
export function brighten(hex, amount = .4) {
  const n = parseInt(hex.slice(1), 16)
  const lift = (v) => Math.min(255, v + Math.floor((255 - v) * amount))
  return `#${((lift(n >> 16 & 255) << 16) | (lift(n >> 8 & 255) << 8) | lift(n & 255)).toString(16).padStart(6, "0")}`
}

export function disposeObject(object) {
  const geometries = new Set()
  const materials = new Set()
  const textures = new Set()
  object.traverse((child) => {
    if (!child.isMesh) return
    geometries.add(child.geometry)
    for (const material of [].concat(child.material)) {
      materials.add(material)
      for (const value of Object.values(material)) if (value && value.isTexture) textures.add(value)
    }
  })
  geometries.forEach((g) => g.dispose()); materials.forEach((m) => m.dispose()); textures.forEach((t) => t.dispose())
}

// Measures what the production collection will receive (model only, no platter).
export function measure(object) {
  object.updateMatrixWorld(true)
  let triangles = 0
  const materials = new Set()
  let radius = 0
  const box = new THREE.Box3()
  const v = new THREE.Vector3()
  object.traverse((child) => {
    if (!child.isMesh) return
    const g = child.geometry
    triangles += (g.index ? g.index.count : g.attributes.position.count) / 3
    for (const m of [].concat(child.material)) materials.add(m.name || m.uuid)
    const p = g.attributes.position
    for (let i = 0; i < p.count; i++) {
      v.fromBufferAttribute(p, i).applyMatrix4(child.matrixWorld)
      box.expandByPoint(v)
      radius = Math.max(radius, Math.hypot(v.x, v.z))
    }
  })
  return { triangles, materials: materials.size, min: box.min.toArray(), max: box.max.toArray(), radius }
}
