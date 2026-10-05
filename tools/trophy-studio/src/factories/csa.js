// 011 UTD CSA shirt: the P.F. Wang's chef-tiger emblem (emblem art by Liz Michel;
// shirt art and design with Chloe Tee and Liz Michel). Navy line art on a cream body.
import vector from "../vectors/011-csa.js"
import { standingLogo } from "../logo.js"

export function create() {
  return standingLogo(vector, {
    height: 1.5, width: 1.7,
    layers: [
      { name: "backing", z0: -.07, z1: .04, bevel: .015, curveSegments: 3 },
      { name: "lines", z0: .01, z1: .08, bevel: .006, curveSegments: 3, back: true },
    ],
    foot: { width: .7, depth: .34 },
  }).group
}
