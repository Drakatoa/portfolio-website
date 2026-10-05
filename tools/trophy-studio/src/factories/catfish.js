// 015 Catfish: the "catfish." wordmark (Instrument Serif) in the app's ink, raised on a
// paper-coloured backing cut to the word's silhouette so the dark letters read on the dark
// site, with the full stop in the app's red. Standing on a graphite foot like the other wordmarks.
import vector from "../vectors/015-catfish.js"
import { standingLogo } from "../logo.js"

export function create() {
  return standingLogo(vector, {
    height: .84, width: 1.98, bottom: .11,
    layers: [
      { name: "paper", color: "#e8dfcf", z0: -.06, z1: .06, bevel: .02, curveSegments: 3, options: { emissive: "#3a3426", roughness: .8, metalness: 0 } },
      { name: "word", z0: .03, z1: .1, bevel: .01, curveSegments: 3, tolerance: .8, back: true },
      { name: "stop", z0: .03, z1: .1, bevel: .01, curveSegments: 4, back: true },
    ],
    foot: { width: 1.7, depth: .36, height: .13 },
  }).group
}
