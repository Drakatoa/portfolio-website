// 004 Auralis: the nine-bar waveform mark, each bar a standing slab carrying the
// original cyan-to-magenta gradient (sampled from the artwork as vertex colours).
import vector from "../vectors/004-auralis.js"
import { standingLogo } from "../logo.js"

export function create() {
  return standingLogo(vector, {
    height: 1.05, width: 1.8, bottom: .1,
    layers: [{ name: "bars", sample: true, z0: -.12, z1: .12, bevel: .03, options: { emissive: "#101418", roughness: .35 } }],
    foot: { width: 1.86, depth: .4, height: .13 },
  }).group
}
