// 005 Ideate: the speech bubble with its circuit-brain sketch, raised on a deep-navy
// plate (the mark's own backdrop in the project art) cut to the bubble's silhouette so the inner sketch is physically supported.
import vector from "../vectors/005-ideate.js"
import { standingLogo } from "../logo.js"

export function create() {
  return standingLogo(vector, {
    height: 1.45, width: 1.4,
    layers: [
      { name: "plate", z0: -.06, z1: .03, bevel: .015, curveSegments: 3 },
      { name: "mark", sample: true, z0: 0, z1: .1, bevel: .012, curveSegments: 3, options: { emissive: "#15151f" } },
    ],
    foot: { width: .6, depth: .32 },
  }).group
}
