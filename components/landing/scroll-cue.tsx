"use client"

import { ChevronDown } from "lucide-react"
import styles from "./landing.module.css"

// Eases the page down to a section instead of jumping there. Any wheel, touch or key input
// hands control back to the visitor; reduced motion jumps directly.
export function gentleScrollTo(id: string) {
  const target = document.getElementById(id)
  if (!target) return
  const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - 16)
  const land = () => target.focus({ preventScroll: true })
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) { window.scrollTo({ top, behavior: "instant" }); land(); return }
  const start = window.scrollY
  const distance = top - start
  const duration = Math.min(1400, Math.max(700, Math.abs(distance) * .6))
  const ease = (t: number) => (t < .5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)
  let cancelled = false
  const cancel = () => { cancelled = true }
  const events = ["wheel", "touchstart", "keydown"] as const
  events.forEach((name) => window.addEventListener(name, cancel, { once: true, passive: true }))
  const cleanup = () => events.forEach((name) => window.removeEventListener(name, cancel))
  let startTime = 0
  const step = (now: number) => {
    if (cancelled) return cleanup()
    if (!startTime) startTime = now
    const progress = Math.min(1, (now - startTime) / duration)
    window.scrollTo({ top: start + distance * ease(progress), behavior: "instant" })
    if (progress < 1) requestAnimationFrame(step)
    else { cleanup(); land() }
  }
  requestAnimationFrame(step)
}

// The old landing page's bouncing "scroll to projects" cue, redrawn for this design. It is a
// link (works without JS) that eases the page down when it can.
export function ScrollCue({ target = "projects", label = "scroll to projects" }: { target?: string; label?: string }) {
  return (
    <a href={`#${target}`} className={styles.scrollCue} onClick={(event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
      event.preventDefault()
      gentleScrollTo(target)
    }}>
      <span>{label}</span>
      <ChevronDown aria-hidden="true" />
    </a>
  )
}
