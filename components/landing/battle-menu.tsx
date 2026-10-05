"use client"

// Persona 5 battle command menu as one SVG in the game's own layout.
// Shapes: traced from plasticbruv's "Persona 5 Battle Menu" STL (CC BY 4.0),
// fitted onto the in-game menu at a single scale (see battle-menu-shapes.ts).
// Text positions/angles are measured from the same game frame
// (tools/hero-mock/out/menu-grid.png), in the 670x445 viewBox.
// The whole menu is centred on my chest (the gap between the two clusters).

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { BUTTON_SCALE, BUTTONS } from "./battle-menu-buttons"
import { MENU_RED_TOP, MENU_REDS, MENU_SHARDS, MENU_SLABS, MENU_VIEWBOX } from "./battle-menu-shapes"
import { useKnobs } from "./menu-knobs-store"
import { P5Word } from "./p5-word"
import styles from "./p5-ui.module.css"

type Glyph = "cross" | "triangle" | "square" | "circle" | "dpad" | "L2" | "R2"
type Cmd = {
  slab: keyof typeof MENU_SLABS
  word: string; boxed: number; sub: string; glyph: Glyph; href: string; external?: boolean
  // word placement measured from the game frame (viewBox units): top-left of the
  // capitals, rotation, the width the word spans and its cap height
  x: number; y: number; r: number; w: number; cap: number
  sx: number; sy: number; sr: number; ss: number // subtitle centre, angle, font size
  gx: number; gy: number; gr: number; sk: number // glyph centre, ring radius, socket radius (from the traced shape)
  fx: number; fy: number // fly-in origin
  turn?: number // extra rotation (deg) about the hub between the clusters
  lift?: number // extra vertical offset (viewBox units), applied with turn
  dx?: number // extra horizontal offset (viewBox units)
  // subtitle tweaks relative to its spot under the word: along/across the word, extra angle, size multiplier
  subDx?: number; subDy?: number; subR?: number; subS?: number
}

export const CMDS_BASE: Cmd[] = [
  { slab: "ORDER", word: "ORDER", boxed: 1, sub: "linkedin", glyph: "L2", href: "https://linkedin.com/in/ragoel", external: true,
    x: 72, y: 63, r: 20, w: 138.2, cap: 35.2, sx: 123.0, sy: 148.0, sr: 25.0, ss: 15.0, gx: 225.7, gy: 169.1, gr: 26.5, sk: 0, fx: -260, fy: -200,
    subDx: 6, subDy: -10.5, subR: 1.5, subS: 1.44 },
  { slab: "GUN", word: "GUN", boxed: 1, sub: "github", glyph: "dpad", href: "https://github.com/Drakatoa", external: true,
    x: 38.5, y: 223, r: -10.5, w: 107.7, cap: 36.9, sx: 112.0, sy: 268.0, sr: -12.0, ss: 15.0, gx: 184.0, gy: 228.0, gr: 33.0, sk: 36.0, fx: -320, fy: 60,
    subDx: 9.5, subDy: -7, subR: -6, subS: 1.44 },
  { slab: "PERSONA", word: "PERSONA", boxed: 5, sub: "about me", glyph: "triangle", href: "#about",
    x: 452.5, y: 120.5, r: -21.5, w: 145.4, cap: 31.8, sx: 497.0, sy: 157.0, sr: -17.0, ss: 15.0, gx: 435.8, gy: 156.6, gr: 26.5, sk: 29.5, fx: 240, fy: -240,
    subDx: -24, subDy: -8, subR: 2, subS: 1.443 },
  { slab: "ITEM", word: "ITEM", boxed: 2, sub: "grab my cv", glyph: "square", href: "/rajit-goel-cv.pdf", external: true,
    x: 373.5, y: 205, r: -2, w: 85, cap: 24.5, sx: 407.0, sy: 249.0, sr: -6.0, ss: 15.0, gx: 345.0, gy: 224.1, gr: 26.5, sk: 29.5, fx: 60, fy: -300,
    subDx: -5.5, subDy: -6.5, subR: 1.5, subS: 1.5 },
  { slab: "GUARD_SLOT", word: "ATTACK", boxed: 3, sub: "see my work", glyph: "circle", href: "#projects",
    x: 550, y: 230.5, r: 12.5, w: 150.5, cap: 32.1, sx: 568.0, sy: 302.0, sr: 18.0, ss: 15.0, gx: 511.9, gy: 259.0, gr: 26.5, sk: 29.5, fx: 320, fy: 100,
    subDx: -7.5, subDy: -7, subR: 0.5, subS: 1.44 },
  { slab: "ATTACK", word: "GUARD", boxed: 1, sub: "say hi", glyph: "cross", href: "mailto:ragoel123@gmail.com",
    x: 451, y: 299, r: 34, w: 146, cap: 36, sx: 437.0, sy: 365.0, sr: 35.0, ss: 15.0, gx: 403.9, gy: 307.5, gr: 26.5, sk: 29.5, fx: 140, fy: 300,
    subDx: 6.5, subDy: -8, subR: 0, subS: 1.44 },
]

const CAP = 0.7 // Jost cap height per em

/** Word scaled horizontally to the measured width (measured after fonts load). */
function FitWord({ c, ramp }: { c: Cmd; ramp?: [number, number] }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [sx, setSx] = useState(0.8)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const fit = () => { const n = el.offsetWidth; if (n) setSx(c.w / n) }
    fit()
    document.fonts?.ready.then(fit)
  }, [c.w, c.cap, ramp?.[0], ramp?.[1]])
  return (
    <span ref={ref} className={styles.fitWord} style={{ transform: `scaleX(${sx})` }}>
      <P5Word text={c.word} boxed={c.boxed} className={styles.cmdWord} variant="command" ramp={ramp} out={c.slab === "ORDER" || c.slab === "GUN" ? "left" : "right"} />
    </span>
  )
}

function GlyphIcon({ g, cx, cy, hot = false }: { g: Glyph; cx: number; cy: number; r?: number; sk?: number; hot?: boolean }) {
  const art = BUTTONS[g]
  if (!art) return null
  return (
    <g transform={`translate(${cx} ${cy}) scale(${BUTTON_SCALE}) translate(${-art.w / 2} ${-art.h / 2})`}>
      {art.paths.map((p, i) => (
        <path key={i} d={p.d}
          fill={i === 0 && hot && g !== "L2" ? "#fc0000" : p.fill ?? "none"}
          stroke={p.stroke} strokeWidth={p.strokeWidth} strokeLinejoin={p.strokeLinejoin as "round" | undefined}
          fillRule={p.fillRule as "evenodd" | undefined} />
      ))}
    </g>
  )
}

// Idle motion measured from the game (tools/hero-mock/ref/combat.mp4, 30fps): every
// command, on its own random clock (~0.8-1.3s), snaps 5-12 units along its own axis
// (outward or inward) in one frame, then creeps back at ~3 units/s. The red plates stay put.
const HUB = [300, 240] // between the two clusters
const KICK = { min: 5, max: 12, back: 3, every: [0.8, 1.3] as const, fps: 30 }

function useKicks(svg: React.RefObject<SVGSVGElement | null>, still = false) {
  useEffect(() => {
    const el = svg.current
    if (!el || still || matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const axes = CMDS_BASE.map((c) => {
      const dx = c.gx - HUB[0], dy = (c.gy - HUB[1]) * 0.5 // mostly sideways, like the game
      const n = Math.hypot(dx, dy) || 1
      return [dx / n, dy / n]
    })
    const st = CMDS_BASE.map(() => ({ x: 0, y: 0, next: 0.6 + Math.random() * 0.8 }))
    let raf = 0, last = -1, t0 = performance.now()
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      const f = Math.floor(((now - t0) / 1000) * KICK.fps)
      if (f === last) return // stepped at the game's 30fps
      const dt = last < 0 ? 0 : (f - last) / KICK.fps
      last = f
      const t = f / KICK.fps
      st.forEach((k, i) => {
        if (t >= k.next) {
          const m = (KICK.min + Math.random() * (KICK.max - KICK.min)) * (Math.random() < 0.5 ? -1 : 1)
          k.x = axes[i][0] * m; k.y = axes[i][1] * m
          k.next = t + KICK.every[0] + Math.random() * (KICK.every[1] - KICK.every[0])
        } else {
          const d = Math.hypot(k.x, k.y), step = KICK.back * dt
          const s = d > step ? (d - step) / d : 0
          k.x *= s; k.y *= s
        }
        el.style.setProperty(`--k${i}`, `${k.x.toFixed(1)}px ${k.y.toFixed(1)}px`)
      })
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [svg, still])
}
const kick = (i: number) => ({ translate: `var(--k${i}, 0px 0px)` })

/** Word with its subtitle centred underneath, as one unit (like the game). */
function CmdText({ c, ramp, sub, className }: { c: Cmd; ramp: [number, number]; sub: number; className?: string }) {
  // foreignObject clips its content, so leave room on every side for a subtitle wider
  // than its word and for the outlines (incl. the hover halo)
  const pad = c.cap * 2 + 20
  return (
    <foreignObject x={c.x - c.cap * 0.4 - pad} y={c.y - c.cap * 0.75 - pad} width={c.w * 2.2 + pad * 2} height={c.cap * 4.4 + pad * 2}
      transform={`rotate(${c.r} ${c.x} ${c.y})`} aria-hidden="true" className={className}>
      <span className={styles.cmdText} style={{ fontSize: c.cap / CAP, padding: `${c.cap * 0.45 + pad}px 0 0 ${c.cap * 0.4 + pad}px` }}>
        <FitWord c={c} ramp={ramp} />
        <span className={styles.subUnder}
          style={{ width: c.w, transform: `translate(${c.subDx ?? 0}px, ${c.subDy ?? 0}px) rotate(${c.subR ?? 0}deg)` }}>
          <span className={styles.cmdSub} style={{ fontSize: `${sub * (c.subS ?? 1)}em` }}>{c.sub}</span>
        </span>
      </span>
    </foreignObject>
  )
}

const EDGE = 2 // width of the white edge around a hovered command (viewBox units)

/** Kept for API compatibility: the red plates now render inside BattleMenu, over the photo. */
export function BattleMenuBackdrop() {
  return null
}

/** The command slabs, drawn in front of the cut-out.
 *  Two passes like the game: every slab first, then every word and button on
 *  top, so a slab never covers a neighbour's text. Each command's link carries an
 *  invisible copy of its slab as the hit area; hover colours the slab below. */
export function BattleMenu({ onNavigate, still = false, tune = false }: { onNavigate?: () => void; still?: boolean; tune?: boolean }) {
  const [hot, setHot] = useState<number | null>(null)
  const { cmds: tw, g } = useKnobs(tune)
  const CMDS = CMDS_BASE.map((c, i) => ({ ...c, ...tw[i] }))
  const ramp: [number, number] = [g.rampLo, g.rampHi]
  const svgRef = useRef<SVGSVGElement>(null)
  useKicks(svgRef, still || !g.kicks)
  const turn = (_c: Cmd) => undefined
  const anim = (c: Cmd, i: number) => ({ ["--fx" as string]: `${c.fx}px`, ["--fy" as string]: `${c.fy}px`, ["--d" as string]: `${i * 0.033}s` })
  return (
    <nav className={styles.menu} aria-label="Quick menu">
      <svg ref={svgRef} className={styles.menuSvg} viewBox={MENU_VIEWBOX.join(" ")}>
        <g>
          {/* red plates sit on top of the photo, under the slabs (like the game) */}
          <g className={styles.redIn} aria-hidden="true">
            {MENU_REDS.map((d, i) => <path key={i} d={d} fill="#fc0000" fillRule="nonzero" />)}
          </g>
          {/* loose black shards from the game frame: always black, not part of any command */}
          <path d={MENU_SHARDS} fill="#0c0c10" className={styles.redIn} aria-hidden="true" />
          <g aria-hidden="true">
            {CMDS.map((c, i) => (
              <g key={c.word} className={styles.cmd} style={anim(c, i)}>
                <path d={MENU_SLABS[c.slab]} transform={turn(c)} fillRule="nonzero" style={kick(i)}
                  className={`${styles.slabPath} ${hot === i ? styles.slabHot : ""}`} />
              </g>
            ))}
          </g>
          {/* bits of red the game paints over the slabs */}
          <path d={MENU_RED_TOP} fill="#fc0000" className={styles.redIn} aria-hidden="true" />
          {/* hovered command: a white copy of its slab, button disc and text, each grown by EDGE,
              then the red slab on top. Only the outer EDGE of the whole shape stays white, so the
              edge runs around the slab and curves around any text that sticks out of it. */}
          {hot !== null && (() => {
            const c = CMDS[hot]
            return (
              <g aria-hidden="true" pointerEvents="none" style={kick(hot)}>
                <g className={styles.focusHalo}>
                  <path d={MENU_SLABS[c.slab]} fillRule="nonzero" strokeWidth={EDGE * 2} />
                  {c.sk > 0 && <circle cx={c.gx} cy={c.gy} r={c.sk + EDGE} />}
                </g>
                <CmdText c={c} ramp={ramp} sub={g.sub} className={styles.haloText} />
                <path d={MENU_SLABS[c.slab]} className={styles.slabFocus} fillRule="nonzero" />
              </g>
            )
          })()}
          {CMDS.map((c, i) => (
            <a key={c.word} href={c.href} onClick={onNavigate} className={`${styles.cmd} ${styles.cmdLink} ${hot === i ? styles.cmdHot : ""}`}
              {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              aria-label={`${c.word}: ${c.sub}`} style={anim(c, i)}
              onMouseEnter={() => setHot(i)} onMouseLeave={() => setHot(null)} onFocus={() => setHot(i)} onBlur={() => setHot(null)}>
              <g transform={turn(c)} style={kick(i)}>
                <path d={MENU_SLABS[c.slab]} className={styles.hitPath} fillRule="nonzero" />
                <CmdText c={c} ramp={ramp} sub={g.sub} />
                <GlyphIcon g={c.glyph} cx={c.gx} cy={c.gy} r={c.gr} sk={c.sk} hot={hot === i} />
              </g>
            </a>
          ))}
        </g>
      </svg>
    </nav>
  )
}
