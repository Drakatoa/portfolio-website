// 008 Hometown Olympics: New Delhi (a hypothetical identity project): the lotus-torch
// emblem only. Petals keep their original gradient; the wordmark and the Olympic rings
// are deliberately excluded.
import vector from "../vectors/008-delhi.js"
import { standingLogo } from "../logo.js"

export function create() {
  return standingLogo(vector, {
    height: 1.5, width: 1.75, bottom: .06,
    layers: [
      { name: "plate", z0: -.07, z1: .02, bevel: .015, curveSegments: 3 },
      { name: "petals", sample: true, z0: -.02, z1: .1, bevel: .014, curveSegments: 3 },
      { name: "torch", z0: -.04, z1: .09, bevel: .014, curveSegments: 3, back: true },
    ],
    foot: { width: .55, depth: .32 },
  }).group
}
