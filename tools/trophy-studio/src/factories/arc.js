// 010 Arc: the 'A' with its arched crossbar raised on the dark app-icon tile.
import vector from "../vectors/010-arc.js"
import { standingLogo, roundedRect, slab, mesh, logoMaterial } from "../logo.js"

export function create() {
  const tile = 1.34
  const { group } = standingLogo(vector, {
    height: tile * .6, width: tile, bottom: .07 + tile * .2,
    layers: [{ name: "A", z0: .02, z1: .12, bevel: .02, back: true }],
    foot: { width: .7, depth: .34 },
  })
  group.add(mesh(slab(roundedRect(tile, tile, tile * .2, .07), -.07, .06, .025), logoMaterial("arc-tile", "#2c2d33", { metalness: .4, roughness: .4 }), "arc-app-tile"))
  return group
}
