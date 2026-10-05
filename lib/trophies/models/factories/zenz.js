// 009 Zenz: the lotus mark raised on the app icon's pale-cyan rounded tile, as in the
// brand-identity board's "App Logo".
import * as THREE from "three"
import vector from "../vectors/009-zenz.js"
import { standingLogo, roundedRect, slab, mesh, logoMaterial } from "../logo.js"

export function create() {
  const tile = 1.36
  const { group } = standingLogo(vector, {
    height: tile * .5, width: tile * .84, bottom: .07 + tile * .25,
    layers: [// Hairline bevel: the strokes are only ~6 px wide in the source, and a wider bevel
    // closes the centre petal's pointed opening.
    { name: "lotus", z0: .03, z1: .11, bevel: .002, curveSegments: 4, tolerance: .2, back: true }],
    foot: { width: .7, depth: .34 },
  })
  group.add(mesh(slab(roundedRect(tile, tile, tile * .23, .07), -.05, .05, .02), logoMaterial("zenz-tile", "#c3f6fb"), "zenz-app-tile"))
  return group
}
