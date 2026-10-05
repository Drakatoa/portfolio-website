// 006 Design for Inclusion: the case study's DEI letters in the nonbinary-flag colours
// (yellow, white, purple), standing on black — the flag's fourth colour — as the foot.
import vector from "../vectors/006-inclusion.js"
import { standingLogo } from "../logo.js"

export function create() {
  return standingLogo(vector, {
    height: .92, width: 1.86, bottom: .11,
    layers: [
      { name: "D", z0: -.13, z1: .13, bevel: .025 },
      { name: "E", z0: -.13, z1: .13, bevel: .025 },
      { name: "I", z0: -.13, z1: .13, bevel: .025 },
    ],
    foot: { width: 1.95, depth: .42, height: .14 },
  }).group
}
