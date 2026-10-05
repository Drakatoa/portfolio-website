"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ArrowLeft } from "lucide-react"
import type { Project } from "@/lib/projects"
import { projectFacts } from "@/lib/landing-projects"
import { projectGallery } from "@/lib/project-gallery"
import { projectSlug } from "@/lib/project-pages"
import { ProjectGallery } from "@/components/project-gallery"
import { ProjectActions } from "@/components/project-actions"
import { ProjectHackathon } from "@/components/project-hackathon"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import landing from "@/components/landing/landing.module.css"
import styles from "./project-page.module.css"

// One project with room to breathe: a large trophy you can turn, then the full write-up and
// every link the carousel used to show.
export function ProjectPage({ project }: { project: Project }) {
  const root = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)
  const facts = projectFacts(project.id)
  const gallery = projectGallery(project, projectSlug(project))

  useEffect(() => {
    if (!root.current || !canvas.current) return
    let dispose: (() => void) | undefined
    let cancelled = false
    import("@/lib/trophies/gallery").then(({ createGallery }) => {
      if (cancelled || !root.current || !canvas.current) return
      dispose = createGallery(canvas.current, root.current, [project], () => setReady(false)).dispose
      setReady(true)
    }).catch(() => { if (!cancelled) setReady(false) })
    return () => { cancelled = true; dispose?.() }
  }, [project])

  return (
    <div className={landing.site}>
      <a href="#main" className={landing.skipLink}>skip to content</a>
      <SiteHeader base="/" />
      <main id="main" className={styles.page}>
        <div ref={root} className={styles.hero} data-ready={ready}>
          <canvas ref={canvas} className={styles.canvas} aria-hidden="true" />
          <div className={styles.trophy} data-trophy={project.id} role="img" aria-label={`${project.title} trophy, drag to turn`}>
            <Image className={styles.poster} src={project.image} alt="" fill sizes="(max-width: 760px) 90vw, 560px" />
          </div>
          <div className={styles.copy}>
            <Link href="/#projects" className={styles.back}><ArrowLeft size={18} aria-hidden="true" />all projects</Link>
            <p className={styles.status}>{project.status}</p>
            <h1 className={styles.title}>{project.title} <span className={styles.year}>{facts.year}</span></h1>
            <p className={styles.hook}>{facts.role}</p>
          </div>
        </div>
        <section className={styles.body} aria-label="About this project">
          <ul className={landing.projectTags} aria-label="Technologies">{project.tech.map((tag) => <li key={tag} className={landing.projectTag}>{tag}</li>)}</ul>
          <p className={styles.description}>{project.description}</p>
          <ProjectHackathon project={project} />
          {gallery.length > 1 && <ProjectGallery images={gallery} title={project.title} />}
          <ProjectActions project={project} />
        </section>
      </main>
      <div className={styles.footer}><SiteFooter /></div>
    </div>
  )
}
