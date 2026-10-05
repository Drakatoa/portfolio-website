// 014 Eukarya: the game's own Tiktaalik (Assets/Animals/Tiktaalik/tetrapod.fbx, the
// water-to-land stage) taken from a frame of its Walk clip, then given a baked
// spine bend so it hauls out of the water onto a rock. All adjustments are here.
import * as THREE from "three"
import { loadRig, pose, bakeSkinned } from "./common.js"

export const POSE = {
  clip: "Armature|Walk",
  time: .5, // fraction of the 0.96 s clip: lateral S-flex with front fins forward
  length: 2.05, // snout to tail tip before bending, world units
  // Baked bend along the body axis (x = 0 tail, x = 1 snout, normalized).
  chestPivot: .46, chestLift: THREE.MathUtils.degToRad(40),
  neckPivot: .74, neckLift: THREE.MathUtils.degToRad(16),
  tailPivot: .34, tailDip: THREE.MathUtils.degToRad(-6),
}
export const WATER = { level: .1, color: "#6f9c9a" }
const SHORE_X = -.12

function smooth(edge0, edge1, x) { const t = THREE.MathUtils.clamp((x - edge0) / (edge1 - edge0), 0, 1); return t * t * (3 - 2 * t) }

// Rotates the part of the body beyond a pivot around the lateral (z) axis, easing in
// over a short span so the mesh bends like a spine instead of hinging.
function bend(v, pivot, angle, span, forward) {
  const weight = forward ? smooth(pivot, pivot + span, v.x) : smooth(pivot, pivot - span, v.x)
  if (!weight) return
  const a = angle * weight
  const dx = v.x - pivot
  const dy = v.y
  v.x = pivot + dx * Math.cos(a) - dy * Math.sin(a)
  v.y = dx * Math.sin(a) + dy * Math.cos(a)
}

// A faceted shore boulder with a flat underside, sized so its crown meets the front fins.
function rock(material, top) {
  const geometry = new THREE.IcosahedronGeometry(.5, 0)
  geometry.scale(.82, 1, .8)
  geometry.rotateY(.5)
  geometry.rotateZ(.18)
  const p = geometry.attributes.position
  for (let i = 0; i < p.count; i++) p.setY(i, Math.max(0, p.getY(i)))
  geometry.computeBoundingBox()
  geometry.scale(1, top / geometry.boundingBox.max.y, 1)
  geometry.computeVertexNormals()
  const mesh = new THREE.Mesh(geometry, material)
  mesh.name = "shore-rock"
  return mesh
}

// A thin translucent slab over the platter's left half, following its 12-sided outline.
function water() {
  const radius = 1.0
  const shape = new THREE.Shape()
  const points = []
  for (let i = 3; i <= 9; i++) { const a = i * Math.PI / 6; points.push([Math.cos(a) * radius, Math.sin(a) * radius]) }
  shape.moveTo(SHORE_X + .1, points[0][1])
  for (const [x, z] of points) shape.lineTo(x, z)
  shape.lineTo(SHORE_X - .08, points[points.length - 1][1])
  shape.closePath()
  const geometry = new THREE.ExtrudeGeometry(shape, { depth: WATER.level, bevelEnabled: false })
  geometry.rotateX(Math.PI / 2)
  geometry.translate(0, WATER.level, 0)
  const material = new THREE.MeshStandardMaterial({ name: "eukarya-water", color: WATER.color, roughness: .15, metalness: .05, transparent: true, opacity: .5, depthWrite: false })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.name = "water"
  mesh.renderOrder = 2
  return mesh
}

export async function build() {
  const rig = await loadRig("/sources/eukarya/tetrapod.fbx")
  const clip = rig.clips.find((c) => c.name === POSE.clip)
  pose(rig, POSE.clip, clip.duration * POSE.time)
  const geometry = bakeSkinned(rig.mesh)
  const head = rig.bones.Head_end.getWorldPosition(new THREE.Vector3())
  const tail = rig.bones.Tail_end.getWorldPosition(new THREE.Vector3())
  const fins = ["FFootL", "FFootR"].map((name) => rig.bones[name].getWorldPosition(new THREE.Vector3()))

  // Align tail -> snout with +X, normalize so the tail is x = 0 and the snout x = 1.
  const yaw = Math.atan2(-(head.z - tail.z), head.x - tail.x)
  const toAxis = new THREE.Matrix4().makeRotationY(-yaw)
  const length = head.clone().applyMatrix4(toAxis).x - tail.clone().applyMatrix4(toAxis).x
  const origin = tail.clone().applyMatrix4(toAxis)
  const p = geometry.attributes.position
  const v = new THREE.Vector3()
  const deform = (point) => {
    point.applyMatrix4(toAxis).sub(origin).divideScalar(length)
    bend(point, POSE.tailPivot, POSE.tailDip, .25, false)
    bend(point, POSE.chestPivot, POSE.chestLift, .18, true)
    bend(point, POSE.neckPivot, POSE.neckLift, .12, true)
    return point.multiplyScalar(POSE.length)
  }
  for (let i = 0; i < p.count; i++) { deform(v.fromBufferAttribute(p, i)); p.setXYZ(i, v.x, v.y, v.z) }
  fins.forEach(deform)
  geometry.computeVertexNormals()

  // Centre on the platter, rest the tail tip just above the floor (under water),
  // then grow the boulder until its crown meets the front fins.
  geometry.computeBoundingBox()
  const box = geometry.boundingBox
  const shift = new THREE.Vector3(-(box.min.x + box.max.x) / 2, .015 - box.min.y, -(box.min.z + box.max.z) / 2)
  geometry.translate(shift.x, shift.y, shift.z)
  fins.forEach((fin) => fin.add(shift))
  const finCenter = fins[0].clone().add(fins[1]).multiplyScalar(.5)
  const rockMesh = rock(new THREE.MeshStandardMaterial({ name: "chalk", color: "#eeece8", roughness: .55, metalness: .25, flatShading: true }), Math.min(fins[0].y, fins[1].y) - .01)
  rockMesh.position.set(finCenter.x + .1, 0, finCenter.z * .4)
  // Keep the boulder inside the platter's usable radius.
  rockMesh.geometry.computeBoundingSphere()
  const reach = Math.hypot(rockMesh.position.x, rockMesh.position.z) + rockMesh.geometry.boundingSphere.radius * .9
  if (reach > 1.08) rockMesh.position.x -= reach - 1.08

  const texture = new THREE.TextureLoader().load("/sources/eukarya/Tiktaalik.png")
  texture.colorSpace = THREE.SRGBColorSpace
  texture.userData.mimeType = "image/jpeg"
  await new Promise((resolve) => { const check = () => (texture.image ? resolve() : setTimeout(check, 20)); check() })
  const creature = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ name: "tiktaalik-painted", map: texture, roughness: .7, metalness: .05, flatShading: true }))
  creature.name = "tiktaalik-haul-out"
  const group = new THREE.Group()
  group.name = "014-eukarya"
  group.add(rockMesh, creature, water())
  return group
}
