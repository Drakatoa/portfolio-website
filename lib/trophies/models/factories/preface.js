// 001 Preface: the F-block mark with its ✗/✓ assessment tiles. The F is negative
// space cut through the purple block, as in the original logo.
import vector from "../vectors/001-preface.js"
import { standingLogo } from "../logo.js"

export function create() {
  return standingLogo(vector, {
    height: 1.42, width: 1.5,
    layers: [
      { name: "block", z0: -.1, z1: .1, bevel: .025 },
      { name: "marks", z0: .06, z1: .14, bevel: .01, back: true },
    ],
    foot: { width: .95, depth: .36 },
  }).group
}
