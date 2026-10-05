// 003 Project Pawkour: the game's playable cat (ithappy Kitty_001, as instanced in
// Assets/Scenes/Tutorial.unity) frozen at the full-stretch frame of its own run
// clip, taking off from a lab ledge. Every pose decision lives in this file.
import * as THREE from "three"
import { loadRig, pose, bakeSkinned, loadImageData, bakePaletteColors } from "./common.js"

export const POSE = {
  clip: "Kitty_001_run",
  time: .82, // fraction of the 0.67 s clip: front legs reaching, hind legs pushing off
  overrides: {}, // none: the frame is used exactly as animated
  pitch: THREE.MathUtils.degToRad(24), // whole-body take-off angle
  length: 1.66, // nose-to-tail-tip, world units
}

// Lab ledge proportions follow the game's low-poly lab blocks; cyan is the key-art paw color.
const LEDGE = { left: -.66, right: -.16, depth: .74, height: .6, chamfer: .07 }
export const CYAN = "#3fd3e3"

function ledge(materials) {
  const group = new THREE.Group()
  group.name = "lab-ledge"
  const { left, right, depth, height, chamfer } = LEDGE
  const profile = new THREE.Shape()
  profile.moveTo(left, 0)
  profile.lineTo(right, 0)
  profile.lineTo(right, height - chamfer)
  profile.lineTo(right - chamfer, height)
  profile.lineTo(left, height)
  profile.closePath()
  const block = new THREE.ExtrudeGeometry(profile, { depth, bevelEnabled: false })
  block.translate(0, 0, -depth / 2)
  group.add(Object.assign(new THREE.Mesh(block, materials.dark), { name: "ledge" }))
  // Cyan band across the front face under the take-off edge, echoing the key-art paw,
  // a cyan chamfer strip on the corner itself, and one chalk panel seam below.
  const band = new THREE.Mesh(new THREE.BoxGeometry(right - left - .1, .045, .014), materials.cyan)
  band.position.set((left + right) / 2 - .02, height - .13, depth / 2 + .006)
  band.name = "cyan-band"
  const strip = new THREE.Mesh(new THREE.BoxGeometry(chamfer * Math.SQRT2 * .7, .012, depth + .002), materials.cyan)
  strip.position.set(right - chamfer / 2 + .004, height - chamfer / 2 + .004, 0)
  strip.rotation.z = -Math.PI / 4
  strip.name = "edge-strip"
  const seam = new THREE.Mesh(new THREE.BoxGeometry(right - left - .1, .02, .012), materials.chalk)
  seam.position.set((left + right) / 2 - .02, height * .33, depth / 2 + .006)
  seam.name = "panel-seam"
  group.add(band, strip, seam)
  return group
}

export async function build() {
  const rig = await loadRig("/sources/pawkour/Kitty_001.fbx")
  const clip = rig.clips.find((c) => c.name === POSE.clip)
  pose(rig, POSE.clip, clip.duration * POSE.time, POSE.overrides)
  const palette = await loadImageData("/sources/pawkour/Texture.png")
  const geometry = bakePaletteColors(bakeSkinned(rig.mesh), palette)

  // The rig faces +Z; turn it to leap toward +X, pitch it up, then scale to length.
  geometry.rotateY(Math.PI / 2)
  geometry.rotateZ(POSE.pitch)
  geometry.computeBoundingBox()
  const size = geometry.boundingBox.getSize(new THREE.Vector3())
  const scale = POSE.length / size.x
  geometry.scale(scale, scale, scale)
  geometry.computeBoundingBox()
  const box = geometry.boundingBox
  geometry.translate(0, 0, -(box.min.z + box.max.z) / 2)

  // Find the rear-most low point (hind toes) and plant it on the ledge's take-off edge.
  const p = geometry.attributes.position
  const midX = (box.min.x + box.max.x) / 2
  let toe = null
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i)
    if (x < midX && (!toe || y < toe.y)) toe = new THREE.Vector3(x, y, p.getZ(i))
  }
  geometry.translate(LEDGE.right - .07 - toe.x, LEDGE.height - .004 - toe.y, 0)
  geometry.computeVertexNormals()

  const materials = {
    dark: new THREE.MeshStandardMaterial({ name: "graphite", color: "#353541", roughness: .55, metalness: .35, flatShading: true }),
    chalk: new THREE.MeshStandardMaterial({ name: "chalk", color: "#eeece8", roughness: .55, metalness: .25, flatShading: true }),
    cyan: new THREE.MeshStandardMaterial({ name: "pawkour-cyan", color: CYAN, roughness: .4, metalness: .1, emissive: CYAN, emissiveIntensity: .25 }),
  }
  const cat = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ name: "kitty-baked-palette", vertexColors: true, roughness: .62, metalness: .05, flatShading: true }))
  cat.name = "kitty-001-run-takeoff"
  const group = new THREE.Group()
  group.name = "003-project-pawkour"
  group.add(ledge(materials), cat)
  // Centre the composition on the platter pivot.
  const all = new THREE.Box3().setFromObject(group)
  group.children.forEach((child) => { child.position.x -= (all.min.x + all.max.x) / 2 })
  return group
}
