"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState, type CSSProperties } from "react"
import { ArrowRight, RotateCw } from "lucide-react"
import type { Project } from "@/lib/projects"
import { projectHref, projectDestinationLabel, projectHook } from "@/lib/project-pages"
import { projectFacts } from "@/lib/landing-projects"
import { getProjectWedgeColors } from "@/lib/project-colors"
import { SelectionInk } from "./selection-ink"
import { selectionStyle } from "@/lib/selection-geometry"
import styles from "./trophies.module.css"
import landing from "./landing.module.css"

export function TrophyCollection({ projects }: { projects: Project[] }) {
  const root = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const controller = useRef<{ rotate: (id: string, amount: number) => void; reset: (id: string) => void } | null>(null)
  const [ready, setReady] = useState(false)
  const [unavailable, setUnavailable] = useState(false)
  // Trophies turned away from their resting angle; "reset" only applies to these.
  const [turned, setTurned] = useState<Record<string, boolean>>({})
  // Like the original grid: three tags, then "+N" reveals the rest on hover, focus or tap.
  const [openTags, setOpenTags] = useState<Record<string, boolean>>({})
  const showTags = (id: string, open: boolean) => setOpenTags((current) => ({ ...current, [id]: open }))

  useEffect(() => {
    const element = root.current
    const surface = canvas.current
    if (!element || !surface) return
    let cancelled = false
    let dispose: (() => void) | undefined
    setReady(false)
    setUnavailable(false)
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      import("@/lib/trophies/gallery").then(({ createGallery }) => {
        if (cancelled) return
        const gallery = createGallery(surface, element, projects, () => setUnavailable(true), (id, moved) => setTurned((current) => (current[id] === moved ? current : { ...current, [id]: moved })))
        controller.current = gallery
        dispose = gallery.dispose
        setReady(true)
      }).catch(() => { if (!cancelled) setUnavailable(true) })
    }, { rootMargin: "160px" })
    observer.observe(element)
    return () => { cancelled = true; observer.disconnect(); dispose?.(); controller.current = null }
  }, [projects])

  return (
    <div ref={root} className={styles.collection} data-ready={ready && !unavailable}>
      <canvas ref={canvas} className={styles.canvas} aria-hidden="true" />
      <ul className={styles.shelf} aria-label="Project trophies">
        {projects.map((project) => {
          const facts = projectFacts(project.id)
          const extraTags = project.tech.slice(3)
          const tagsOpen = !!openTags[project.id]
          return (
          <li key={project.id} className={styles.exhibit}>
            {/* Carried over from the original grid: Aigis says hi above the Aegis trophy. */}
            {project.id === "002" && <Image className={styles.easterEgg} src="/aigis-easter-egg.png" alt="" width={759} height={95} />}
            <div className={styles.object} data-trophy={project.id} role="group" aria-label={`${project.title} trophy`}>
              <div className={styles.poster}>
                <Image src={project.image} alt="" fill sizes="(max-width: 760px) 80vw, 30vw" className="object-contain" />
              </div>
            </div>
            <div className={styles.caption}>
              <Link href={projectHref(project)} className={`${styles.inspect} ${landing.projectRow}`} aria-label={`${project.title}: ${projectDestinationLabel(project)}`}>
                {/* The blade's echo uses the project colour the original grid used on its primary button. */}
                <span className={landing.projectName} data-long-title={project.title.length > 20} style={{ ...selectionStyle(project.title), "--wedge-color": getProjectWedgeColors(project.title).color } as CSSProperties}>
                  {project.title}<SelectionInk>{project.title}</SelectionInk>
                </span>
                <span className={styles.year}>{facts.year}</span>
                <span className={styles.destination}>{projectDestinationLabel(project)} <ArrowRight size={15} aria-hidden="true" /></span>
              </Link>
              <p className={styles.hook}>{projectHook(project)}</p>
              <p className={styles.meta}>{facts.role}</p>
              <ul className={styles.tags} aria-label={`${project.title} technologies`}>
                {(tagsOpen ? project.tech : project.tech.slice(0, 3)).map((tag) => <li key={tag} className={landing.projectTag}>{tag}</li>)}
                {extraTags.length > 0 && !tagsOpen && (
                  <li className={styles.moreItem}><button type="button" className={`${landing.projectTag} ${styles.moreTags}`} aria-label={`Show ${extraTags.length} more technologies`}
                    onMouseEnter={() => showTags(project.id, true)} onFocus={() => showTags(project.id, true)} onClick={() => showTags(project.id, true)}>+{extraTags.length}</button></li>
                )}
              </ul>
              <div className={styles.controls}>
                <button type="button" disabled={!ready || unavailable} onClick={() => controller.current?.rotate(project.id, Math.PI / 4)} aria-label={`Turn ${project.title} trophy`}><RotateCw size={15} aria-hidden="true" />turn</button>
                <button type="button" disabled={!ready || unavailable || !turned[project.id]} onClick={() => controller.current?.reset(project.id)} aria-label={`Reset ${project.title} trophy`}>reset</button>
              </div>
            </div>
          </li>
          )
        })}
      </ul>
    </div>
  )
}
