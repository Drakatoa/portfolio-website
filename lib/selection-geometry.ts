// Persona 3 Reload selection blade, measured frame-by-frame from a 60 fps capture of the
// P3R menu (see docs/redesign/p3r-selection-study.md). The game's menu words are all a
// similar length, so its blade proportions are really fixed distances: the tip sits ~0.35em
// inside the word, the top corner ~0.72em past its end and the bottom corner ~0.24em past it.
// Using those em distances (not percentages of the label width) keeps long titles from
// getting a far-off tip and a huge overhang. The flare below the baseline grows with the
// label's length, so short labels get a slim blade instead of a fat triangle.
const TIP = .35 // em in from the label's left edge
const TOP_OVERHANG = .72 // em past the label's right edge
const BOTTOM_OVERHANG = .24 // em past the label's right edge
const TIP_Y = .58 // fraction of a line height, measured from the line's top

// Slight per-label variation, as P3R's menu items differ: flare scale and top-corner height.
const BLADES = [
  { flare: 1, top: -.04 },
  { flare: .74, top: .10 },
  { flare: .88, top: -.08 },
] as const

// The blade is drawn in a box that extends 1em left, 1.5em right, .5em above and .9em below
// the label (see .blade in landing.module.css). Heights use the line-height unit (lh) and are
// anchored to the label's last line, so a title that wraps on a phone gets the same blade as
// a one-line title, under its final line, instead of one huge wedge across every line.
const BOX = { left: 1, right: 1.5, top: .5, bottom: .9 }

function selectionHash(label: string) {
  let hash = 0
  for (const character of label.toLowerCase()) hash = (hash * 31 + character.charCodeAt(0)) >>> 0
  return hash
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

// Hosts with padding (trophy titles) set --blade-pad / --blade-pad-y so the blade follows
// the text rather than the padded box.
const PAD = "var(--blade-pad, 0px)"
const PAD_Y = "var(--blade-pad-y, 0px)"

export function selectionStyle(label: string) {
  const blade = BLADES[selectionHash(label) % BLADES.length]
  const length = label.trim().replace(/\s+/g, " ").length
  const flare = clamp(.062 * length, .12, .5) * blade.flare
  const top = blade.top * Math.min(1, length / 7)
  // Corner heights, measured up from the bottom of the last line.
  const tipY = `100% - ${PAD_Y} - ${(1 - TIP_Y).toFixed(3)}lh`
  const topY = `100% - ${PAD_Y} - ${(1 - top).toFixed(3)}lh`
  const bottomY = `100% - ${PAD_Y} + ${flare.toFixed(3)}lh`
  return {
    // Red ink: the label's own text, clipped to the blade (label coordinates).
    "--blade-clip": `polygon(calc(${PAD} + ${TIP}em) calc(${tipY}), calc(100% - ${PAD} + ${TOP_OVERHANG}em) calc(${topY}), calc(100% - ${PAD} + ${BOTTOM_OVERHANG}em) calc(${bottomY}))`,
    // White blade and pink echo: the same triangle in the enlarged box, whose bottom edge is
    // .9em below the label's (so the label's bottom is at 100% - .9em).
    "--blade-box-clip": `polygon(calc(${PAD} + ${BOX.left + TIP}em) calc(${tipY} - ${BOX.bottom}em), calc(100% - ${PAD} - ${BOX.right - TOP_OVERHANG}em) calc(${topY} - ${BOX.bottom}em), calc(100% - ${PAD} - ${BOX.right - BOTTOM_OVERHANG}em) calc(${bottomY} - ${BOX.bottom}em))`,
    // The echo's pulse grows from the corner below the tip (tip x, bottom y).
    "--echo-origin": `calc(${PAD} + ${BOX.left + TIP}em) calc(${bottomY} - ${BOX.bottom}em)`,
  }
}
