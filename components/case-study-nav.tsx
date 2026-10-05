"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useEffect, useRef, useState, type CSSProperties } from "react"
import { selectionStyle } from "@/lib/selection-geometry"
import { getProjectWedgeColors } from "@/lib/project-colors"
import { SelectionInk } from "@/components/landing/selection-ink"
import landing from "@/components/landing/landing.module.css"
import styles from "./case-study.module.css"

// Smooth scrolling unless the reader asked for less motion.
const scrollBehavior = (): ScrollBehavior =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"

// WCAG relative luminance of a #rrggbb colour.
function luminance(hex: string): number {
  const n = parseInt(hex.slice(1), 16)
  const lin = (v: number) => { const c = v / 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4 }
  return 0.2126 * lin((n >> 16) & 255) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255)
}

interface SectionEntry {
  id: string
  label: string
}

// Sticky sub-navigation for case study pages. Scans the page's <section> h2
// headings on mount, assigns ids, and scroll-spies them so readers (especially
// recruiters) can jump straight to any part of the study, including the end.
// The active section carries the P3R blade, its echo in the project's colour.
export function CaseStudyNav({ title }: { title?: string }) {
  const [sections, setSections] = useState<SectionEntry[]>([])
  const [active, setActive] = useState("")
  const bar = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll("section h2"))
    const seen = new Set<string>()
    const secs: SectionEntry[] = []
    for (const h of headings) {
      const label = (h.textContent || "").trim()
      if (!label) continue
      const id = label
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
      if (!id || seen.has(id)) continue
      seen.add(id)
      const target = (h.closest("section") as HTMLElement | null) ?? (h as HTMLElement)
      if (!target.id) target.id = id
      secs.push({ id: target.id, label })
    }
    setSections(secs)

    // A section turns active when its top enters the band 15–25% down the viewport, and stays
    // active until the next one does. Every band crossing re-picks from the sections' positions,
    // so jumping back above the first section (Home, a top link) clears the selection.
    const observer = new IntersectionObserver(
      () => {
        const line = window.innerHeight * 0.25
        let current = ""
        for (const s of secs) {
          const el = document.getElementById(s.id)
          if (el && el.getBoundingClientRect().top <= line) current = s.id
        }
        setActive(current)
      },
      { rootMargin: "-15% 0px -75% 0px" },
    )
    for (const s of secs) {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  // Sections land just below the stuck bar.
  useEffect(() => {
    const offset = `${(bar.current?.offsetHeight ?? 48) + 8}px`
    for (const s of sections) {
      const el = document.getElementById(s.id)
      if (el) el.style.scrollMarginTop = offset
    }
    // Deep links: section ids only exist now, so the browser could not scroll to them on load.
    // The margins are set first, so the section lands below the bar.
    const hash = decodeURIComponent(location.hash.slice(1))
    if (sections.some((s) => s.id === hash)) document.getElementById(hash)?.scrollIntoView({ behavior: scrollBehavior(), block: "start" })
  }, [sections])

  // Longer bars scroll sideways: fade the edges that hide labels, and keep the active label
  // in view (centred) without moving the page.
  useEffect(() => {
    const row = track.current
    if (!row) return
    const update = () => {
      row.dataset.moreLeft = String(row.scrollLeft > 2)
      row.dataset.moreRight = String(row.scrollLeft + row.clientWidth < row.scrollWidth - 2)
    }
    update()
    row.addEventListener("scroll", update, { passive: true })
    const resize = new ResizeObserver(update)
    resize.observe(row)
    return () => { row.removeEventListener("scroll", update); resize.disconnect() }
  }, [sections])

  useEffect(() => {
    const row = track.current
    if (!row) return
    const link = row.querySelector<HTMLElement>('[aria-current="location"]')
    // Above the first section nothing is active: show the bar from its start.
    if (!link) { if (row.scrollLeft > 0) row.scrollTo({ left: 0, behavior: scrollBehavior() }); return }
    const left = link.offsetLeft // the track is the links' offset parent
    // The pinned "all projects" link covers the bar's start: the visible strip begins after it.
    const pinned = row.querySelector<HTMLElement>(`.${styles.back}`)?.offsetWidth ?? 0
    const fade = 56
    if (left < row.scrollLeft + pinned + 16 || left + link.offsetWidth > row.scrollLeft + row.clientWidth - fade) {
      row.scrollTo({ left: left - pinned - (row.clientWidth - pinned - link.offsetWidth) / 2, behavior: scrollBehavior() })
    }
  }, [active])

  const colors = title ? getProjectWedgeColors(title) : undefined
  // Dark project colours vanish on the dark bar: use the brightened variant (same hue) for them.
  const echo = colors && (luminance(colors.color) < 0.08 ? colors.light : colors.color)
  const style = echo ? ({ "--wedge-color": echo } as CSSProperties) : undefined
  // The link renders at once; the section entries follow hydration. The bar keeps its height either way.
  return (
    <nav ref={bar} aria-label="Case study sections" className={styles.bar} style={style}>
      <div ref={track} className={styles.track}>
        <Link href="/#projects" className={styles.back}><ArrowLeft size={16} aria-hidden="true" />all projects</Link>
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-current={active === s.id ? "location" : undefined}
            onClick={(e) => {
              e.preventDefault()
              const el = document.getElementById(s.id)
              if (!el) return
              el.scrollIntoView({ behavior: scrollBehavior(), block: "start" })
              // Keyboard users continue from the section, not from the bar.
              el.tabIndex = -1
              el.focus({ preventScroll: true })
            }}
            className={styles.sectionLink}
            style={selectionStyle(s.label) as CSSProperties}
          >
            <span className={landing.navLabel}>{s.label}<SelectionInk>{s.label}</SelectionInk></span>
          </a>
        ))}
      </div>
    </nav>
  )
}
