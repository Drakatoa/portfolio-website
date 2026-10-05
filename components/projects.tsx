"use client"

import { useEffect, useMemo, useState, type CSSProperties } from "react"
import dynamic from "next/dynamic"
import { projects } from "@/lib/projects"
import { inCategory, type ProjectCategory } from "@/lib/landing-projects"
import { Info } from "lucide-react"
import { SelectionInk } from "@/components/landing/selection-ink"
import { selectionStyle } from "@/lib/selection-geometry"
import { Sparkle } from "./landing/sparkle"
import styles from "./landing/landing.module.css"

const TrophyCollection = dynamic(() => import("./landing/trophy-collection").then((module) => module.TrophyCollection), {
  ssr: false,
  loading: () => <p role="status">Opening the collection…</p>,
})

type Filter = "all" | ProjectCategory
const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "ALL" }, { value: "games", label: "GAMES" }, { value: "tools", label: "TOOLS" }, { value: "design", label: "DESIGN" },
]
const isFilter = (value: unknown): value is Filter => FILTERS.some((filter) => filter.value === value)

// The trophy grid is the projects section: every trophy opens its case study or project page.
export function Projects() {
  const [filter, setFilter] = useState<Filter>("all")
  // ?filter= deep links; the old "case-studies" / "code" values simply fall back to ALL.
  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("filter")
    if (isFilter(value)) setFilter(value)
  }, [])
  const shown = useMemo(() => (filter === "all" ? projects : projects.filter((project) => inCategory(project.id, filter))), [filter])
  const count = (value: Filter) => (value === "all" ? projects.length : projects.filter((project) => inCategory(project.id, value)).length)

  return (
    <section id="projects" className={`${styles.restoredProjects} relative`} aria-label="Projects" tabIndex={-1}>
      <div className="relative z-10 w-full flex flex-col p-6 md:p-8 lg:px-16 lg:pt-16">
        <div className={`${styles.projectHeader} w-full mb-8`}>
          <div className="flex items-center justify-between mb-6">
            <div className={styles.galleryTitle}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">TROPHY GALLERY</h2>
              {/* The one place the interaction is explained: shown on hover or keyboard focus. */}
              <button type="button" className={styles.galleryHint} aria-describedby="gallery-hint"><Info aria-hidden="true" /><span className="sr-only">How the gallery works</span></button>
              <span id="gallery-hint" role="tooltip" className={styles.galleryHintText}>Drag a trophy to turn it. Click a project name to open it.</span>
            </div>
            <Sparkle className={styles.sparkle} />
          </div>
          <div className="h-px w-full bg-white mb-6" />
          <div className={styles.projectFilters}>
            {FILTERS.map(({ value, label }) => {
              const text = `${label} (${count(value)})`
              return (
                <button key={value} type="button" onClick={() => setFilter(value)} aria-pressed={filter === value} style={selectionStyle(label.toLowerCase()) as CSSProperties}
                  className={`${styles.wedgeFilter} px-4 py-2 text-sm font-black tracking-wider ${filter === value ? "text-white" : "text-white/70 hover:text-white"}`}>
                  <span className={styles.navLabel}>{text}<SelectionInk>{text}</SelectionInk></span>
                </button>
              )
            })}
          </div>
        </div>
        <TrophyCollection key={filter} projects={shown} />
      </div>
    </section>
  )
}
