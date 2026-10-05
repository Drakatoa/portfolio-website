// 012 Sonare.live: an original trophy built from the game's own visual language,
// not from the Miku VRM (a third-party character model that must not be redistributed).
// - The microphone is the "i" of LIVE in Sonare's title logo (warm gold, faceted head).
// - The ribbon is the game's "Koi Swim" gesture, the exact generator from
//   src/ui/gesture-shapes.js (y = 0.32 sin 2πt), wrapped around the mic as a drawn
//   stroke that rises out of the base. A four-point sparkle from the logo ends it.
import * as THREE from "three"

const TEAL = "#39c5bb" // project colour, Miku teal
const GOLD = { light: "#efcd7b", mid: "#c98a3e", dark: "#8b5a2b" }

// Koi Swim, verbatim from Sonare's gesture vocabulary (normalized unit space, y down).
export function koiSwim() {
  const pts = []
  for (let i = 0; i < 48; i++) {
    const t = i / 47
    pts.push({ x: -0.5 + t, y: 0.32 * Math.sin(t * Math.PI * 2) })
  }
  return pts
}

// Sweeps a flat band along a path, its face turned outward from the y axis,
// tapering like a brush stroke at both ends.
function ribbon(points, { width, thickness, taperIn = .14, taperOut = .1 }) {
  const curve = new THREE.CatmullRomCurve3(points, false, "centripetal")
  const samples = 140
  const positions = []
  const indices = []
  const ring = []
  for (let i = 0; i <= samples; i++) {
    const u = i / samples
    const p = curve.getPointAt(u)
    const t = curve.getTangentAt(u)
    const radial = new THREE.Vector3(p.x, 0, p.z)
    if (radial.lengthSq() < 1e-6) radial.set(0, 0, 1)
    radial.normalize()
    const n = radial.sub(t.clone().multiplyScalar(radial.dot(t))).normalize()
    const b = new THREE.Vector3().crossVectors(t, n).normalize()
    const taper = Math.min(1, u / taperIn, (1 - u) / taperOut)
    const w = width * (.25 + .75 * Math.sin(Math.min(1, taper) * Math.PI / 2)) / 2
    const h = thickness / 2
    for (const [sb, sn] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) positions.push(...p.clone().addScaledVector(b, sb * w).addScaledVector(n, sn * h).toArray())
    ring.push(i * 4)
  }
  for (let i = 0; i < samples; i++) for (let k = 0; k < 4; k++) {
    const a = i * 4 + k, b = i * 4 + (k + 1) % 4, c = (i + 1) * 4 + (k + 1) % 4, d = (i + 1) * 4 + k
    indices.push(a, b, c, a, c, d)
  }
  const last = samples * 4
  indices.push(0, 2, 1, 0, 3, 2, last, last + 1, last + 2, last, last + 2, last + 3)
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3))
  geometry.setIndex(indices)
  geometry.computeVertexNormals()
  return geometry
}

function sparkle(outer, inner, depth) {
  const shape = new THREE.Shape()
  for (let i = 0; i < 8; i++) {
    const a = Math.PI / 2 + i * Math.PI / 4
    const r = i % 2 ? inner : outer
    if (i) shape.lineTo(Math.cos(a) * r, Math.sin(a) * r); else shape.moveTo(Math.cos(a) * r, Math.sin(a) * r)
  }
  shape.closePath()
  const geometry = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelThickness: depth * .3, bevelSize: inner * .25, bevelSegments: 1 })
  geometry.center()
  return geometry
}

function microphone(materials) {
  const mic = new THREE.Group()
  mic.name = "logo-microphone"
  const handle = new THREE.Mesh(new THREE.CylinderGeometry(.1, .062, .78, 12), materials.goldMid)
  handle.position.y = .39
  const switchPlate = new THREE.Mesh(new THREE.BoxGeometry(.035, .12, .03), materials.goldDark)
  switchPlate.position.set(0, .5, .088)
  switchPlate.rotation.x = -.04
  const collar = new THREE.Mesh(new THREE.CylinderGeometry(.15, .115, .07, 14), materials.goldDark)
  collar.position.y = .81
  const head = new THREE.Mesh(new THREE.IcosahedronGeometry(.235, 1), materials.goldLight)
  head.position.y = 1.0
  mic.add(handle, switchPlate, collar, head)
  return mic
}

export function create() {
  const materials = {
    goldLight: new THREE.MeshStandardMaterial({ name: "sonare-gold-light", color: GOLD.light, roughness: .38, metalness: .35, flatShading: true }),
    goldMid: new THREE.MeshStandardMaterial({ name: "sonare-gold", color: GOLD.mid, roughness: .42, metalness: .35 }),
    goldDark: new THREE.MeshStandardMaterial({ name: "sonare-gold-dark", color: GOLD.dark, roughness: .5, metalness: .3 }),
    teal: new THREE.MeshStandardMaterial({ name: "sonare-teal", color: TEAL, roughness: .35, metalness: .1, emissive: TEAL, emissiveIntensity: .22, side: THREE.DoubleSide }),
    chalk: new THREE.MeshStandardMaterial({ name: "chalk", color: "#eeece8", roughness: .55, metalness: .25, flatShading: true }),
    dark: new THREE.MeshStandardMaterial({ name: "graphite", color: "#353541", roughness: .55, metalness: .35, flatShading: true }),
  }
  const group = new THREE.Group()
  group.name = "012-sonare-live"

  const base = new THREE.Mesh(new THREE.CylinderGeometry(.26, .3, .08, 12), materials.dark)
  base.position.y = .04
  base.name = "base"
  const mic = microphone(materials)
  mic.position.y = .06
  mic.rotation.z = -.2 // leans like the "i" in the title logo
  group.add(base, mic)

  // Koi Swim wrapped on a cylinder: x -> angle around the mic, -y -> height (screen y is down).
  const radius = .64
  const arc = THREE.MathUtils.degToRad(165)
  const swim = koiSwim().map(({ x, y }) => {
    const angle = x * arc
    return new THREE.Vector3(Math.sin(angle) * radius, .8 - y * 1.25 + x * .3, Math.cos(angle) * radius)
  })
  // Lead-in: the stroke rises out of the base before it starts swimming.
  const first = swim[0]
  const startAngle = Math.atan2(first.x, first.z)
  const lead = [.22, .4].map((r, i) => new THREE.Vector3(Math.sin(startAngle - .5 + i * .25) * r, .06 + i * .16, Math.cos(startAngle - .5 + i * .25) * r))
  const stroke = new THREE.Mesh(ribbon([...lead, ...swim], { width: .11, thickness: .028 }), materials.teal)
  stroke.name = "koi-swim-gesture"
  group.add(stroke)

  const end = swim[swim.length - 1]
  const star = new THREE.Mesh(sparkle(.13, .035, .04), materials.chalk)
  star.position.copy(end).add(new THREE.Vector3(0, .1, 0))
  // Face the sparkle between the stroke's outward direction and the viewer.
  star.lookAt(star.position.clone().add(new THREE.Vector3(end.x, 0, end.z).normalize().add(new THREE.Vector3(0, 0, 1.5))))
  star.name = "sparkle"
  group.add(star)
  return group
}
