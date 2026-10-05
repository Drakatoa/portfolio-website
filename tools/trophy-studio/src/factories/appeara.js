// 016 Appeara: the app icon in layers, back to front like Ideate's plate and mark: the dark
// rounded-square plate, the raised dark outline, the lavender character (its face features
// and inner lines are open, showing the outline layer), the pencil with its pink eraser
// (behind the hand), and the drawn star.
import vector from "../vectors/016-appeara.js"
import { standingLogo } from "../logo.js"

export function create() {
  return standingLogo(vector, {
    height: 1.36, width: 1.36, bottom: .07,
    layers: [
      { name: "plate", z0: -.07, z1: .04, bevel: .025, curveSegments: 4, options: { metalness: .3, roughness: .45 } },
      { name: "ink", z0: .02, z1: .07, bevel: .006, curveSegments: 3, tolerance: .9 },
      { name: "star", z0: .02, z1: .075, bevel: .004, curveSegments: 3 },
      { name: "pencil", z0: .02, z1: .085, bevel: .008, curveSegments: 3 },
      { name: "tip", z0: .02, z1: .085, bevel: .008, curveSegments: 3 },
      { name: "eraser", z0: .02, z1: .085, bevel: .008, curveSegments: 3 },
      { name: "body", color: "#c9bef2", z0: .02, z1: .1, bevel: .01, curveSegments: 3, tolerance: .9, options: { emissive: "#2f2a5c", roughness: .7, metalness: 0 } },
    ],
    foot: { width: .7, depth: .34 },
  }).group
}
