"use client"

import type { ReactNode } from "react"
import { projects, type Project } from "@/lib/projects"
import { projectFacts } from "@/lib/landing-projects"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CaseStudyNav } from "@/components/case-study-nav"
import landing from "@/components/landing/landing.module.css"
import page from "@/components/project-page.module.css"
import styles from "./case-study.module.css"

// The project whose case study lives at /case-studies/<dir>.
export function caseStudyProject(dir: string): Project {
  const project = projects.find((p) => p.links.caseStudy === `/case-studies/${dir}`)
  if (!project) throw new Error(`No project links to /case-studies/${dir}`)
  return project
}

// The landing's frame around a case study: the site header, the sticky
// section bar (with "← all projects" pinned at its start) and the colophon. The page's own sections go in `children`, unchanged; the
// module scopes the display type onto their headings.
export function CaseStudyShell({ project, children }: { project: Project; children: ReactNode }) {
  return (
    <div className={`${landing.site} ${styles.page}`}>
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
      <a href="#main" className={landing.skipLink}>skip to content</a>
      <SiteHeader base="/" />
      <CaseStudyNav title={project.title} />
      <main id="main" className={styles.content}>{children}</main>
      <div className={styles.column}><SiteFooter /></div>
    </div>
  )
}

// Hero pieces: the white "CASE STUDY" chip and the year · role line under the title.
export function CaseStudyLabel() {
  return <span className={`${page.status} ${styles.caseLabel}`}>CASE STUDY</span>
}

export function CaseStudyMeta({ project, className = "" }: { project: Project; className?: string }) {
  const facts = projectFacts(project.id)
  return (
    <div className={`${styles.meta} ${className}`}>
      <span className={styles.year}>{facts.year}</span>
      <span className={styles.role}>{facts.role}</span>
    </div>
  )
}

// A section's number ("01"), in muted display italic above its heading.
export function SectionNumber({ children }: { children: ReactNode }) {
  return <span className={styles.number}>{children}</span>
}

// The lightbox's close and prev/next buttons: square, framed, like the project gallery's.
export const lightboxControl = styles.control
