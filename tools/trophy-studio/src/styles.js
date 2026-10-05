// Render styles for comparing looks. Every style uses the same models and camera;
// only lights, materials, outlines and (for Pixel) resolution change. Each style
// works inside the shared single-context scissor renderer, so any of them could
// be ported to lib/trophies/gallery.ts.
import * as THREE from "three"

export const STYLES = {
  site: { label: "Site", note: "current live lighting, unchanged", lights: { hemi: 2.8, key: 4, rim: .8 } },
  soft: { label: "Soft", note: "lower light + Khronos Neutral tone mapping; brand colours stop clipping to white", lights: { hemi: 1.5, key: 2.5, rim: 1.4 }, toneMapping: THREE.NeutralToneMapping, exposure: 1 },
  ink: { label: "Ink", note: "cel shading + dark outlines (Persona menu feel)", toon: true, outline: { color: "#050507", px: 1.7 }, lights: { hemi: 1.2, key: 2.4, rim: 1.6 } },
  noir: { label: "Noir", note: "grayscale cel shading + chalk outlines, matches the black-and-white site", toon: true, gray: true, outline: { color: "#eeece8", px: 1.3 }, lights: { hemi: .9, key: 3, rim: 2.4 }, rimColor: "#ffffff" },
  pixelNoir: { label: "Pixel Noir", note: "Noir rendered ~85 px tall (2–3 px pixels): grayscale cel, chalk outlines, 5 gray levels", toon: true, gray: true, outline: { color: "#eeece8", px: 1 }, pixel: 85, levels: 5, dither: .2, lights: { hemi: .9, key: 3, rim: 2.4 }, rimColor: "#ffffff" },
  pixel: { label: "Pixel", note: "cel shading rendered ~85 px tall (2–3 px pixels), 7 levels, light ordered dither, nearest upscale", toon: true, outline: { color: "#050507", px: 1 }, pixel: 85, levels: 7, dither: .2, lights: { hemi: 1.2, key: 2.4, rim: 1.6 } },
}

// Three-band ramp for cel shading.
const gradientMap = (() => {
  const texture = new THREE.DataTexture(new Uint8Array([70, 165, 255]), 3, 1, THREE.RedFormat)
  texture.minFilter = texture.magFilter = THREE.NearestFilter
  texture.generateMipmaps = false
  texture.needsUpdate = true
  return texture
})()

function grayscale(material, key) {
  material.onBeforeCompile = (shader) => {
    shader.fragmentShader = shader.fragmentShader.replace("#include <tonemapping_fragment>", `
      float lum = dot(gl_FragColor.rgb, vec3(.2126, .7152, .0722));
      gl_FragColor.rgb = vec3(smoothstep(.0, .85, lum));
      #include <tonemapping_fragment>`)
  }
  material.customProgramCacheKey = () => key
}

const variants = new WeakMap()
function variant(base, styleName) {
  const style = STYLES[styleName]
  if (!style.toon) return base
  let byStyle = variants.get(base)
  if (!byStyle) variants.set(base, (byStyle = {}))
  if (byStyle[styleName]) return byStyle[styleName]
  const material = new THREE.MeshToonMaterial({
    name: `${base.name}-${styleName}`, color: base.color, map: base.map || null, vertexColors: base.vertexColors,
    gradientMap, transparent: base.transparent, opacity: base.opacity, depthWrite: base.depthWrite, side: base.side,
    emissive: base.emissive || new THREE.Color(0), emissiveIntensity: base.emissiveIntensity ?? 1,
  })
  if (style.gray) grayscale(material, `gray-${styleName}`)
  byStyle[styleName] = material
  return material
}

// Screen-space inverted hull: pushes back faces out along smoothed normals by a fixed
// number of pixels, so outline weight is the same at 152 px and 450 px tiles.
const outlineMaterials = {}
export function outlineMaterial(styleName) {
  if (outlineMaterials[styleName]) return outlineMaterials[styleName]
  const { color, px } = STYLES[styleName].outline
  outlineMaterials[styleName] = new THREE.ShaderMaterial({
    name: `outline-${styleName}`,
    uniforms: { resolution: { value: new THREE.Vector2(300, 300) }, thickness: { value: px }, color: { value: new THREE.Color(color) } },
    vertexShader: `
      attribute vec3 smoothNormal;
      uniform vec2 resolution;
      uniform float thickness;
      void main() {
        vec4 clip = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        vec3 n = normalize(normalMatrix * smoothNormal);
        vec2 dir = (projectionMatrix * vec4(n, 0.0)).xy;
        float len = length(dir);
        if (len > 1e-5) clip.xy += dir / len * thickness * 2.0 / resolution * clip.w;
        gl_Position = clip;
      }`,
    fragmentShader: `uniform vec3 color; void main() { gl_FragColor = vec4(color, 1.0); }`,
    side: THREE.BackSide,
  })
  return outlineMaterials[styleName]
}

// Averages face normals of all vertices sharing a position, so hulls have no cracks at hard edges.
function ensureSmoothNormals(geometry) {
  if (geometry.attributes.smoothNormal) return
  const p = geometry.attributes.position
  const index = geometry.index
  const count = index ? index.count : p.count
  const sums = new Map()
  const key = (i) => `${Math.round(p.getX(i) * 1e4)},${Math.round(p.getY(i) * 1e4)},${Math.round(p.getZ(i) * 1e4)}`
  const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3(), n = new THREE.Vector3()
  for (let t = 0; t < count; t += 3) {
    const ia = index ? index.getX(t) : t, ib = index ? index.getX(t + 1) : t + 1, ic = index ? index.getX(t + 2) : t + 2
    a.fromBufferAttribute(p, ia); b.fromBufferAttribute(p, ib); c.fromBufferAttribute(p, ic)
    n.subVectors(c, b).cross(a.clone().sub(b))
    for (const i of [ia, ib, ic]) { const k = key(i); const s = sums.get(k) || new THREE.Vector3(); s.add(n); sums.set(k, s) }
  }
  const out = new Float32Array(p.count * 3)
  for (let i = 0; i < p.count; i++) { const s = sums.get(key(i)); (s && s.lengthSq() ? s.clone().normalize() : new THREE.Vector3(0, 1, 0)).toArray(out, i * 3) }
  geometry.setAttribute("smoothNormal", new THREE.BufferAttribute(out, 3))
}

// Prepares an exhibit once: remembers base materials and adds hidden outline hulls.
export function prepare(item) {
  if (item.styleMeshes) return
  item.styleMeshes = []
  item.holder.traverse((object) => {
    if (!object.isMesh || object.userData.outline) return
    item.styleMeshes.push(object)
    object.userData.base = object.material
    if (object.material.transparent) return
    ensureSmoothNormals(object.geometry)
    const hull = new THREE.Mesh(object.geometry, outlineMaterial("ink"))
    hull.userData.outline = true
    hull.visible = false
    object.add(hull)
    object.userData.hull = hull
  })
}

export function applyStyle(item, styleName, resolution) {
  prepare(item)
  const style = STYLES[styleName]
  if (item.currentStyle !== styleName) {
    for (const mesh of item.styleMeshes) {
      mesh.material = variant(mesh.userData.base, styleName)
      const hull = mesh.userData.hull
      if (hull) { hull.visible = !!style.outline; if (style.outline) hull.material = outlineMaterial(styleName) }
    }
    const { hemi, key, rim } = item.lights
    hemi.intensity = style.lights.hemi
    key.intensity = style.lights.key
    rim.intensity = style.lights.rim
    rim.color.set(style.rimColor || item.rimColor)
    item.currentStyle = styleName
  }
  if (style.outline) outlineMaterial(styleName).uniforms.resolution.value.copy(resolution)
}

// Pixel pass: render the tile into a small target, then draw it back with nearest
// sampling, posterized with a 4x4 ordered (Bayer) dither in sRGB space.
const targets = new Map()
const quadCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
const quadMaterial = new THREE.ShaderMaterial({
  uniforms: { tex: { value: null }, size: { value: new THREE.Vector2() }, levels: { value: 6 }, dither: { value: .55 } },
  vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,
  fragmentShader: `
    uniform sampler2D tex; uniform vec2 size; uniform float levels; uniform float dither; varying vec2 vUv;
    float bayer(vec2 p) {
      int x = int(mod(p.x, 4.0)), y = int(mod(p.y, 4.0)), i = x + y * 4;
      float m[16] = float[16](0.,8.,2.,10.,12.,4.,14.,6.,3.,11.,1.,9.,15.,7.,13.,5.);
      for (int k = 0; k < 16; k++) if (k == i) return m[k] / 16.0;
      return 0.0;
    }
    void main() {
      vec4 c = texture2D(tex, vUv);
      if (c.a < .5) discard;
      vec3 srgb = pow(clamp(c.rgb / max(c.a, 1e-4), 0.0, 1.0), vec3(1.0 / 2.2));
      vec3 q = floor(srgb * (levels - 1.0) + .5 + (bayer(floor(vUv * size)) - .5) * dither) / (levels - 1.0);
      gl_FragColor = vec4(q, 1.0);
    }`,
  depthTest: false, depthWrite: false, transparent: true,
})
const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), quadMaterial)
const quadScene = new THREE.Scene().add(quad)

// `style.pixel` is the target number of pixel rows; pixels stay whole CSS pixels (min 2).
export function pixelSize(style, cssHeight) { return Math.max(2, Math.round(cssHeight / style.pixel)) }

export function renderPixel(renderer, scene, camera, cssWidth, cssHeight, style, viewport) {
  const size = pixelSize(style, cssHeight)
  const w = Math.max(8, Math.round(cssWidth / size)), h = Math.max(8, Math.round(cssHeight / size))
  const key = `${w}x${h}`
  let target = targets.get(key)
  if (!target) { target = new THREE.WebGLRenderTarget(w, h, { minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter, depthBuffer: true }); targets.set(key, target) }
  const scissor = renderer.getScissorTest()
  renderer.setScissorTest(false)
  renderer.setRenderTarget(target)
  renderer.setClearColor(0, 0)
  renderer.clear(true, true, true)
  renderer.render(scene, camera)
  renderer.setRenderTarget(null)
  renderer.setScissorTest(scissor)
  viewport()
  quadMaterial.uniforms.tex.value = target.texture
  quadMaterial.uniforms.size.value.set(w, h)
  quadMaterial.uniforms.levels.value = style.levels
  quadMaterial.uniforms.dither.value = style.dither ?? .55
  renderer.render(quadScene, quadCamera)
}
