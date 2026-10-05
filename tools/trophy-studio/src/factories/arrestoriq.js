// 013 ArrestorIQ: the app's green 'Ar' disc with its folded corner as a raised page (its own mark; the sponsor's logo and any
// engineering data are deliberately excluded). Disc colours are sampled from the artwork.
import vector from "../vectors/013-arrestoriq.js"
import { standingLogo } from "../logo.js"

export function create() {
  return standingLogo(vector, {
    height: 1.36, width: 1.4,
    layers: [
      { name: "disc", sample: true, z0: -.09, z1: .05, bevel: .03, curveSegments: 10 },
      // The dark page is raised over the bright fold, so its curled edge casts a visible lip.
      { name: "page", sample: true, z0: .0, z1: .12, bevel: .02, curveSegments: 10 },
      { name: "letters", z0: .08, z1: .17, bevel: .012 },
    ],
    foot: { width: .6, depth: .34 },
  }).group
}
