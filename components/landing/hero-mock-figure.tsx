"use client"

// Hero mock: Hack the North greyscale cut-out, P5 battle menu on hover/focus
// (tap to toggle on touch), dialogue box always on screen underneath.
import { useEffect, useRef, useState } from "react"
import { BattleMenu, BattleMenuBackdrop } from "./battle-menu"
import { MenuKnobs } from "./menu-knobs"
import { useKnobs } from "./menu-knobs-store"
import { P5Dialogue } from "./p5-dialogue"
import styles from "./landing.module.css"

const srOnly = { position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" } as const

export function HeroMockFigure() {
  const [open, setOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const zone = useRef<HTMLDivElement>(null)
  // /hero-mock?knobs: live tuning panel, menu pinned open
  const [tune, setTune] = useState(false)
  useEffect(() => { setTune(new URLSearchParams(location.search).has("knobs")) }, [])
  const { g } = useKnobs(tune)
  const pinned = tune && g.pin

  const show = () => { clearTimeout(closeTimer.current); setOpen(true) }
  const hide = () => { clearTimeout(closeTimer.current); closeTimer.current = setTimeout(() => setOpen(false), 180) }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false) }
    const onDown = (e: PointerEvent) => { if (zone.current && !zone.current.contains(e.target as Node)) setOpen(false) }
    addEventListener("keydown", onKey)
    addEventListener("pointerdown", onDown)
    return () => { removeEventListener("keydown", onKey); removeEventListener("pointerdown", onDown); clearTimeout(closeTimer.current) }
  }, [])

  return (
    <figure className={styles.portrait} style={{ paddingBottom: 0 }}>
      <div ref={zone} style={{ position: "relative" }}
        onPointerEnter={(e) => { if (e.pointerType === "mouse") show() }}
        onPointerLeave={(e) => { if (e.pointerType === "mouse") hide() }}
        onFocus={(e) => { if ((e.target as HTMLElement).matches(":focus-visible")) show() }}
        onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) hide() }}>
        {(open || pinned) && <BattleMenuBackdrop />}
        <button type="button" aria-expanded={open} aria-label="Open the quick menu"
          onClick={(e) => { if ((e.nativeEvent as PointerEvent).pointerType !== "mouse") setOpen((o) => !o) }}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen((o) => !o) } }}
          style={{ position: "relative", zIndex: 1, display: "block", width: "100%", padding: 0, border: 0, background: "none", cursor: "pointer" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/avatar/persona/htn-photo-bw.webp?v=thumbfix" alt="Rajit giving a thumbs-up, wearing glasses and a Hack the North lanyard."
            style={{ display: "block", width: "100%", height: "auto" }} draggable={false} />
        </button>
        {(open || pinned) && <BattleMenu tune={tune} onNavigate={() => setOpen(false)} />}
      </div>
      <P5Dialogue name="Rajit Goel" />
      {tune && <MenuKnobs />}
      <figcaption><h1 id="intro-title" style={srOnly}>rajit goel</h1></figcaption>
    </figure>
  )
}
