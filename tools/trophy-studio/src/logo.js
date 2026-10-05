// Turns traced/vector logo layers (src/vectors/*.js) into deliberate, bevelled solids.
// Vector units are source pixels with y pointing down; output is world units, y up,
// centred on x = 0 with the artwork's bottom edge at `bottom`.
import * as THREE from "three"
import { SVGLoader } from "three/addons/loaders/SVGLoader.js"

export function shapesFrom(d) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg"><path d="${d}" fill="#000" fill-rule="evenodd"/></svg>`
  return new SVGLoader().parse(svg).paths.flatMap((path) => path.toShapes())
}

// Ramer-Douglas-Peucker on a closed contour; tolerance in source pixels.
function simplify(points, tolerance) {
  if (points.length < 8 || tolerance <= 0) return points
  const keep = new Uint8Array(points.length)
  // Closed contours start and end on the same point, so seed the recursion with the
  // vertex farthest from the start; otherwise the first chord has zero length.
  let far = 1
  for (let i = 1; i < points.length; i++) if (points[i].distanceTo(points[0]) > points[far].distanceTo(points[0])) far = i
  keep[0] = keep[far] = keep[points.length - 1] = 1
  const stack = [[0, far], [far, points.length - 1]]
  while (stack.length) {
    const [a, b] = stack.pop()
    let worst = 0, index = -1
    const A = points[a], B = points[b]
    const dx = B.x - A.x, dy = B.y - A.y, length = Math.hypot(dx, dy) || 1e-9
    for (let i = a + 1; i < b; i++) {
      const d = Math.abs(dy * points[i].x - dx * points[i].y + B.x * A.y - B.y * A.x) / length
      if (d > worst) { worst = d; index = i }
    }
    if (worst > tolerance) { keep[index] = 1; stack.push([a, index], [index, b]) }
  }
  const out = points.filter((_, i) => keep[i])
  return out.length >= 3 ? out : points
}

// Converts curved shapes to simplified polygons, so triangle counts stay in budget.
export function polygonShapes(d, { curveSegments = 5, tolerance = 0 } = {}) {
  return shapesFrom(d).map((shape) => {
    const { shape: outline, holes } = shape.extractPoints(curveSegments)
    const polygon = new THREE.Shape(simplify(outline, tolerance))
    polygon.holes = holes.map((hole) => new THREE.Path(simplify(hole, tolerance)))
    return polygon
  })
}

// Fits the artwork's union bounds into width/height and returns a pixel -> world mapper.
export function frame(vector, { height, width = Infinity, bottom = 0, layers }) {
  const box = new THREE.Box2()
  for (const layer of vector.layers) if (!layers || layers.includes(layer.name)) for (const shape of shapesFrom(layer.d)) for (const p of shape.getPoints(4)) box.expandByPoint(p)
  const size = box.getSize(new THREE.Vector2())
  const scale = Math.min(height / size.y, width / size.x)
  return {
    scale, box,
    size: new THREE.Vector2(size.x * scale, size.y * scale),
    apply(geometry) {
      geometry.translate(-(box.min.x + box.max.x) / 2, -box.max.y, 0)
      // (s, -s, -s) is a 180° turn about x: y points up again and face winding is preserved.
      geometry.scale(scale, -scale, -scale)
      geometry.translate(0, bottom, 0)
      return geometry
    },
  }
}

// Extrudes one layer so it spans z0..z1 (world units) with a small bevel.
export function extrudeLayer(vector, name, fit, { z0, z1, bevel = .012, curveSegments = 5, tolerance = Math.max(vector.width, vector.height) / 700 }) {
  const layer = vector.layers.find((l) => l.name === name)
  if (!layer) throw new Error(`No layer ${name} in ${vector.id}`)
  const b = Math.min(bevel, (z1 - z0) * .3) / fit.scale // extrusion happens in pixel space, before scaling
  const depth = (z1 - z0) / fit.scale - 2 * b
  const geometry = new THREE.ExtrudeGeometry(polygonShapes(layer.d, { curveSegments, tolerance }), { depth, curveSegments: 1, bevelEnabled: b > 0, bevelThickness: b, bevelSize: b * .8, bevelOffset: -b * .8, bevelSegments: 1 })
  if (vector.colors && layer.sample) paintFromGrid(geometry, vector)
  fit.apply(geometry)
  geometry.computeBoundingBox()
  geometry.translate(0, 0, z1 - geometry.boundingBox.max.z)
  geometry.computeVertexNormals()
  return geometry
}

// Samples the original artwork's colours (stored as a coarse grid) onto vertices,
// reproducing gradients without shipping a texture.
export function paintFromGrid(geometry, vector) {
  const { width, height, rgba } = vector.colors
  const bytes = Uint8Array.from(atob(rgba), (c) => c.charCodeAt(0))
  const cell = (gx, gy) => { const o = (gy * width + gx) * 4; return bytes[o + 3] ? [bytes[o], bytes[o + 1], bytes[o + 2]] : null }
  const nearest = (gx, gy) => {
    for (let r = 0; r < 6; r++) for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) {
      const x = gx + dx, y = gy + dy
      if (x < 0 || y < 0 || x >= width || y >= height) continue
      const c = cell(x, y); if (c) return c
    }
    return [200, 200, 200]
  }
  const p = geometry.attributes.position
  const colors = new Float32Array(p.count * 3)
  const color = new THREE.Color()
  for (let i = 0; i < p.count; i++) {
    const gx = THREE.MathUtils.clamp(Math.floor(p.getX(i) / vector.width * width), 0, width - 1)
    const gy = THREE.MathUtils.clamp(Math.floor(p.getY(i) / vector.height * height), 0, height - 1)
    const [r, g, b] = nearest(gx, gy)
    color.setRGB(r / 255, g / 255, b / 255, THREE.SRGBColorSpace).toArray(colors, i * 3)
  }
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
}

export function logoMaterial(name, colorOrVertex, options = {}) {
  const vertex = colorOrVertex === "vertex"
  return new THREE.MeshStandardMaterial({ name, color: vertex ? 0xffffff : colorOrVertex, vertexColors: vertex, roughness: .62, metalness: .08, ...options })
}

// A low faceted foot that the standing logo slots into: graphite, chamfered, one chalk keyline.
export function foot({ width = .7, depth = .34, height = .12, chalk, dark }) {
  const group = new THREE.Group()
  group.name = "foot"
  const shape = new THREE.Shape()
  const c = .035
  shape.moveTo(-width / 2, 0); shape.lineTo(width / 2, 0); shape.lineTo(width / 2, height - c); shape.lineTo(width / 2 - c, height); shape.lineTo(-width / 2 + c, height); shape.lineTo(-width / 2, height - c); shape.closePath()
  const geometry = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false })
  geometry.translate(0, 0, -depth / 2)
  group.add(Object.assign(new THREE.Mesh(geometry, dark), { name: "foot-block" }))
  const line = new THREE.Mesh(new THREE.BoxGeometry(width - .08, .014, .01), chalk)
  line.position.set(0, height * .45, depth / 2 + .004)
  line.name = "foot-keyline"
  group.add(line)
  return group
}

// Shared materials for logo factories, matching src/shared.js values.
export function siteMaterials() {
  return {
    chalk: new THREE.MeshStandardMaterial({ name: "chalk", color: "#eeece8", roughness: .55, metalness: .25, flatShading: true }),
    dark: new THREE.MeshStandardMaterial({ name: "graphite", color: "#353541", roughness: .55, metalness: .35, flatShading: true }),
  }
}

export function mesh(geometry, material, name) {
  const m = new THREE.Mesh(geometry, material)
  m.name = name
  return m
}

// Builds an upright logo trophy from a layer spec:
// { height, width, bottom, layers: [{ name, z0, z1, bevel, color | "vertex", back }], foot: { width, depth } | false }
// `back: true` repeats a raised layer on the rear face so the object reads from behind.
export function standingLogo(vector, spec) {
  const materials = siteMaterials()
  const fit = frame(vector, { height: spec.height, width: spec.width, bottom: spec.bottom ?? .07, layers: spec.fitLayers })
  const group = new THREE.Group()
  group.name = `${vector.id}-logo`
  for (const layer of spec.layers) {
    const material = layer.material || logoMaterial(`${vector.id}-${layer.name}`, layer.color || (layer.sample ? "vertex" : vector.layers.find((l) => l.name === layer.name).color || "#eeece8"), layer.options)
    group.add(mesh(extrudeLayer(vector, layer.name, fit, layer), material, `${vector.id}-${layer.name}`))
    if (layer.back) group.add(mesh(extrudeLayer(vector, layer.name, fit, { ...layer, z0: -layer.z1, z1: -layer.z0 }), material, `${vector.id}-${layer.name}-back`))
  }
  if (spec.foot !== false) group.add(foot({ width: spec.foot?.width ?? Math.max(.5, fit.size.x * .55), depth: spec.foot?.depth ?? .34, height: spec.foot?.height ?? .12, ...materials }))
  return { group, fit, materials }
}

// Rounded rectangle helper (app-icon tiles), centred on x, bottom at y0.
export function roundedRect(width, height, radius, y0 = 0) {
  const s = new THREE.Shape()
  const x = -width / 2, y = y0
  s.moveTo(x + radius, y)
  s.lineTo(x + width - radius, y); s.quadraticCurveTo(x + width, y, x + width, y + radius)
  s.lineTo(x + width, y + height - radius); s.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  s.lineTo(x + radius, y + height); s.quadraticCurveTo(x, y + height, x, y + height - radius)
  s.lineTo(x, y + radius); s.quadraticCurveTo(x, y, x + radius, y)
  return s
}

export function slab(shape, z0, z1, bevel = .02, curveSegments = 8) {
  const geometry = new THREE.ExtrudeGeometry(shape, { depth: z1 - z0 - 2 * bevel, curveSegments, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel * .8, bevelOffset: -bevel * .8, bevelSegments: 1 })
  geometry.translate(0, 0, z0 + bevel)
  return geometry
}
