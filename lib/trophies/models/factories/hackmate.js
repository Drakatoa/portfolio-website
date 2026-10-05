// 007 HackMate: the />/ mark as three separate standing pieces (a team side by side),
// carrying the original pink-to-violet gradient. The chevron, which floats in the
// 2D mark, rests on one slim graphite post.
import * as THREE from "three"
import vector from "../vectors/007-hackmate.js"
import { standingLogo, mesh } from "../logo.js"

export function create() {
  const footHeight = .13
  const { group, materials } = standingLogo(vector, {
    height: 1.42, width: 1.6, bottom: .1,
    layers: [{ name: "mark", sample: true, z0: -.12, z1: .12, bevel: .03 }],
    foot: { width: 1.45, depth: .4, height: footHeight },
  })
  // Find the chevron's lowest point: the lowest vertex within the middle third of the mark.
  const p = group.getObjectByName("007-mark").geometry.attributes.position
  let low = null
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i)
    if (Math.abs(x - .05) < .22 && y > .2 && (!low || y < low.y)) low = { x, y }
  }
  const height = low.y - footHeight + .04
  const post = mesh(new THREE.BoxGeometry(.07, height, .07), materials.dark, "chevron-post")
  post.position.set(low.x, footHeight + height / 2 - .02, 0)
  group.add(post)
  return group
}
