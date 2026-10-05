// Helpers for turning rigged game meshes into static, posed trophy geometry.
import * as THREE from "three"
import { FBXLoader } from "three/addons/loaders/FBXLoader.js"
import { GLTFExporter } from "three/addons/exporters/GLTFExporter.js"

export async function loadRig(url) {
  const manager = new THREE.LoadingManager()
  // The FBX files point at texture paths from the original Unity/Blender projects; textures are assigned explicitly.
  manager.setURLModifier((value) => (/\.(png|jpe?g|tga|psd)$/i.test(value) ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMB/6XqMwAAAABJRU5ErkJggg==" : value))
  const root = await new FBXLoader(manager).loadAsync(url)
  let mesh = null
  root.traverse((child) => { if (child.isSkinnedMesh && !mesh) mesh = child })
  const bones = {}
  root.traverse((child) => { if (child.isBone) bones[child.name] = child })
  return { root, mesh, bones, clips: root.animations }
}

// Samples one frame of an original animation clip, then layers explicit local
// rotations (radians, XYZ) on top so every adjustment is recorded in the pose file.
export function pose(rig, clipName, time, overrides = {}) {
  const mixer = new THREE.AnimationMixer(rig.root)
  if (clipName) {
    const clip = rig.clips.find((c) => c.name === clipName)
    if (!clip) throw new Error(`Missing clip ${clipName}: ${rig.clips.map((c) => c.name)}`)
    mixer.clipAction(clip).play()
    mixer.setTime(time)
  }
  for (const [name, [x, y, z]] of Object.entries(overrides)) {
    const bone = rig.bones[name]
    if (!bone) throw new Error(`Missing bone ${name}`)
    bone.quaternion.multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(x, y, z)))
  }
  rig.root.updateMatrixWorld(true)
  rig.mesh.skeleton.update()
  mixer.stopAllAction()
}

// Bakes the current skinned pose into a plain, non-indexed geometry in root space.
export function bakeSkinned(mesh) {
  const source = mesh.geometry.index ? mesh.geometry.toNonIndexed() : mesh.geometry.clone()
  const position = source.attributes.position
  const out = new THREE.BufferGeometry()
  const baked = new Float32Array(position.count * 3)
  const v = new THREE.Vector3()
  mesh.updateMatrixWorld(true)
  for (let i = 0; i < position.count; i++) {
    v.fromBufferAttribute(position, i)
    mesh.applyBoneTransform(i, v)
    v.applyMatrix4(mesh.matrixWorld)
    v.toArray(baked, i * 3)
  }
  out.setAttribute("position", new THREE.BufferAttribute(baked, 3))
  if (source.attributes.uv) out.setAttribute("uv", source.attributes.uv.clone())
  out.computeVertexNormals()
  return out
}

export async function loadImageData(url, size) {
  const image = await new THREE.ImageLoader().loadAsync(url)
  const canvas = document.createElement("canvas")
  canvas.width = size || image.width
  canvas.height = size || image.height
  const context = canvas.getContext("2d", { willReadFrequently: true })
  context.drawImage(image, 0, 0, canvas.width, canvas.height)
  return { canvas, data: context.getImageData(0, 0, canvas.width, canvas.height) }
}

// Replaces a palette-atlas texture with one flat color per face (median of a small
// window, which rejects the semi-transparent watermark lettering in the atlas).
export function bakePaletteColors(geometry, { data }, window = 5) {
  const uv = geometry.attributes.uv
  const colors = new Float32Array(uv.count * 3)
  const sample = (u, v) => {
    const cx = Math.round(THREE.MathUtils.clamp(u, 0, 1) * (data.width - 1))
    const cy = Math.round((1 - THREE.MathUtils.clamp(v, 0, 1)) * (data.height - 1))
    const channels = [[], [], []]
    for (let dy = -window; dy <= window; dy++) for (let dx = -window; dx <= window; dx++) {
      const x = THREE.MathUtils.clamp(cx + dx, 0, data.width - 1)
      const y = THREE.MathUtils.clamp(cy + dy, 0, data.height - 1)
      const o = (y * data.width + x) * 4
      for (let c = 0; c < 3; c++) channels[c].push(data.data[o + c])
    }
    return channels.map((list) => list.sort((a, b) => a - b)[Math.floor(list.length * .3)] / 255)
  }
  const color = new THREE.Color()
  for (let i = 0; i < uv.count; i += 3) {
    const u = (uv.getX(i) + uv.getX(i + 1) + uv.getX(i + 2)) / 3
    const v = (uv.getY(i) + uv.getY(i + 1) + uv.getY(i + 2)) / 3
    const [r, g, b] = sample(u, v)
    color.setRGB(r, g, b, THREE.SRGBColorSpace)
    for (let k = 0; k < 3; k++) color.toArray(colors, (i + k) * 3)
  }
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
  geometry.deleteAttribute("uv")
  return geometry
}

export function exportGLB(object) {
  return new GLTFExporter().parseAsync(object, { binary: true, onlyVisible: true })
}

export function toBase64(buffer) {
  const bytes = new Uint8Array(buffer)
  let binary = ""
  for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000))
  return btoa(binary)
}
