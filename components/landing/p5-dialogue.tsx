"use client"

// Persona 5-style dialogue box, always on screen.
// Nameplate and box are Rajit's own vectors (tools/hero-mock/traced6) in an 800x226
// viewBox; the "next" arrow is a separate layer so it can animate.
// Click / Enter / Space: if the line is still typing, finish it; otherwise the box
// vanishes, plays the advance click, and fades back in from the right with the next line.

import { useEffect, useRef, useState } from "react"
import { P5Word } from "./p5-word"
import { GREETING, RAJIT_LINES } from "@/lib/rajit-lines"
import styles from "./p5-ui.module.css"

const CPS = 45 // typewriter characters per second
const OUT_MS = 90 // how long the box stays gone before re-entering

export function P5Dialogue({ name = "Rajit Goel" }: { name?: string }) {
  const [index, setIndex] = useState(-1) // -1 = greeting
  const [shown, setShown] = useState(0)
  const [phase, setPhase] = useState<"first" | "in" | "out">("first")
  const [entry, setEntry] = useState(0) // remount key for the re-entry animation
  const reduce = useRef(false)
  const click = useRef<HTMLAudioElement | null>(null)
  const typing = useRef(0) // rAF id of the typewriter, so a click can stop it
  const line = index < 0 ? GREETING : RAJIT_LINES[index]

  useEffect(() => {
    reduce.current = matchMedia("(prefers-reduced-motion: reduce)").matches
    click.current = new Audio("/sfx/p5-dialogue.mp3")
    click.current.volume = 0.6
  }, [])

  useEffect(() => {
    if (phase === "out") return
    if (reduce.current) { setShown(line.length); return }
    setShown(0)
    const start = performance.now() + (phase === "first" ? 420 : 200) // wait for the entrance
    const tick = (now: number) => {
      const n = Math.max(0, Math.min(line.length, Math.floor(((now - start) / 1000) * CPS)))
      setShown(n)
      if (n < line.length) typing.current = requestAnimationFrame(tick)
    }
    typing.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(typing.current)
  }, [line, entry, phase])

  function advance() {
    if (phase === "out") return
    // still typing: stop the typewriter and show the whole line, like the game
    if (shown < line.length) { cancelAnimationFrame(typing.current); setShown(line.length); return }
    const a = click.current
    if (a) { a.currentTime = 0; a.play().catch(() => {}) }
    setPhase("out")
    setTimeout(() => {
      setIndex((i) => (i + 1 >= RAJIT_LINES.length ? -1 : i + 1))
      setEntry((k) => k + 1)
      setPhase("in")
    }, reduce.current ? 0 : OUT_MS)
  }

  const cls = `${styles.dialogue} ${phase === "first" ? styles.dlgFirst : phase === "in" ? styles.dlgIn : styles.dlgOut}`
  return (
    <div className={styles.dialogueWrap}>
      <div key={entry} className={cls}>
        <button type="button" className={styles.dialogueHit} onClick={advance} aria-label={`${line} (next line)`} />
        <svg className={styles.dialogueArt} viewBox="0 0 800 226" aria-hidden="true">
          <g className={styles.boil}>
            {/* Rajit's traced nameplate + box (tools/hero-mock/traced6, placed per ref/nameplate-layout.png):
                layout px -> this 800x226 viewBox, fitted so the inner box lands on the old one */}
            <g transform="translate(60.91 10.37) scale(1.5377)">
              <path transform="translate(26 20) scale(0.99)" d="M388.5 14V0L0 33V92.5L408.5 117L388.5 14Z" fill="#050507" />
              <g transform="translate(30 26) scale(0.99)">
                <path d="M399 109.5L381.5 0L0 31.5V85.5L399 109.5Z" fill="#fff" />
                <polygon className={styles.edgeFlash} points="379,0 386,0 404,109.5 397,109.5" />
              </g>
              <path transform="translate(34 31) scale(0.99)" d="M390.5 100.5L371 0L0 30V75L390.5 100.5Z" fill="#050507" />
              {/* nameplate on top of the box */}
              <g transform="scale(0.99)">
                <path d="M149.5 33.5L15.5 58L0 37L125.5 0L149.5 33.5Z" fill="#fff" />
                <path d="M149.5 33.5L15.5 58L0 37L125.5 0L149.5 33.5ZM5.5 38L19 55L143.5 31L124 4L5.5 38Z" fill="#050507" fillRule="evenodd" />
              </g>
            </g>
          </g>
          <foreignObject x="77" y="33" width="190" height="52" transform="rotate(-13.5 172 59)">
            <span className={styles.tagText}><P5Word text={name} invert={1} /></span>
          </foreignObject>
          {/* next arrow: ghosts in, then cycles three poses */}
          <g className={styles.arrowIn}>
            <g className={styles.arrowCycle}>
              <polygon fill="#050507" points="616,184 744,60 802,122 708,164 645,188" />
              <polygon fill="#fff" points="630,176 744,70 791,122 700,156 645,178" />
            </g>
          </g>
        </svg>
        <p className={styles.dialogueText} aria-live="polite">
          {/* one text flow: the untyped rest is laid out (invisible) so typed letters never reflow */}
          <span className={styles.dlgLine}>
            <span>{line.slice(0, shown)}</span>
            <span className={styles.ghostText} aria-hidden="true">{line.slice(shown)}</span>
          </span>
        </p>
      </div>
    </div>
  )
}
