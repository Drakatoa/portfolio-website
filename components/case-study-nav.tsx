"use client"

import { useEffect, useState } from "react"

interface SectionEntry {
  id: string
  label: string
}

// Sticky sub-navigation for case study pages. Scans the page's <section> h2
// headings on mount, assigns ids, and scroll-spies them so readers (especially
// recruiters) can jump straight to any part of the study, including the end.
export function CaseStudyNav() {
  const [sections, setSections] = useState<SectionEntry[]>([])
  const [active, setActive] = useState("")

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
      target.style.scrollMarginTop = "48px"
      secs.push({ id: target.id, label })
    }
    setSections(secs)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: "-15% 0px -75% 0px" },
    )
    for (const s of secs) {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  if (sections.length === 0) return null

  return (
    <nav className="sticky top-0 z-40 border-b border-white/20 bg-black/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 flex items-center gap-1 overflow-x-auto text-[11px] tracking-wider [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            onClick={(e) => {
              e.preventDefault()
              document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" })
            }}
            className={`whitespace-nowrap px-3 py-3 font-black transition-colors ${
              active === s.id
                ? "text-white border-b-2 border-white"
                : "text-white/50 hover:text-white"
            }`}
          >
            {`[${s.label}]`}
          </a>
        ))}
      </div>
    </nav>
  )
}
