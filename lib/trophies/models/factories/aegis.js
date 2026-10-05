// 002 Aegis: the extension's shield with its swirl, sun and gold rim, layered in depth.
import vector from "../vectors/002-aegis.js"
import { standingLogo } from "../logo.js"

export function create() {
  return standingLogo(vector, {
    height: 1.5, width: 1.5,
    layers: [
      { name: "shield", z0: -.09, z1: .09, bevel: .03 },
      { name: "gold", z0: .05, z1: .125, bevel: .008, back: true, options: { metalness: .45, roughness: .35 } },
      { name: "swirl", z0: .05, z1: .15, bevel: .016, back: true },
    ],
    foot: { width: .62, depth: .34 },
  }).group
}
