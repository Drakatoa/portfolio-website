"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"
import { ArrowUpRight, Code, Play, X } from "lucide-react"
import type { Project } from "@/lib/projects"
import { projectLinks, type ProjectLink } from "@/lib/project-pages"
import { selectionStyle } from "@/lib/selection-geometry"
import { getProjectWedgeColors } from "@/lib/project-colors"
import { SelectionInk } from "@/components/landing/selection-ink"
import styles from "@/components/landing/landing.module.css"

const icon = (kind: ProjectLink["kind"]) => (kind === "code" ? <Code className="w-5 h-5" /> : kind === "video" ? <Play className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />)
const isEmbed = (url: string) => url.includes("drive.google.com") || url.includes("youtube.com") || url.includes("youtu.be")

// A project's links as P3R-blade actions: the first is primary (project-coloured echo), the
// rest are utility (pink). Videos open in a native dialog (Escape and focus return for free).
// `exclude` drops kinds that would point at the current page (the case study links itself).
export function ProjectActions({ project, exclude }: { project: Project; exclude?: ProjectLink["kind"][] }) {
  const links = projectLinks(project).filter((link) => !exclude?.includes(link.kind))
  const [video, setVideo] = useState<ProjectLink | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => { if (video && dialog.current && !dialog.current.open) dialog.current.showModal() }, [video])
  const wedge = getProjectWedgeColors(project.title)

  return (
    <div className={styles.projectActions} style={{ "--wedge-color": wedge.color, "--wedge-light": wedge.light } as CSSProperties}>
      {links.map((link, index) => {
        const className = `${styles.projectAction} ${index === 0 ? styles.primaryAction : styles.utilityAction} relative inline-block w-fit`
        const label = (
          <span className={`${styles.actionLabel} relative z-10 flex items-center gap-2 px-6 py-2.5 font-black italic tracking-tighter text-white whitespace-nowrap`}>
            <span className={styles.actionText}>{link.label}{icon(link.kind)}<SelectionInk>{link.label}{icon(link.kind)}</SelectionInk></span>
          </span>
        )
        if (link.kind === "video") return <button key={link.href} type="button" className={className} style={selectionStyle(link.label) as CSSProperties} onClick={() => setVideo(link)}>{label}</button>
        return <a key={link.href} href={link.href} className={className} style={selectionStyle(link.label) as CSSProperties} {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{label}</a>
      })}
      {video && (
        <dialog ref={dialog} aria-label={`${project.title} video`} className={styles.videoDialog} onClose={() => setVideo(null)}
          onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close() }}>
          <div className="relative w-full max-w-5xl mx-4">
            <button type="button" onClick={() => dialog.current?.close()} className="absolute -top-12 right-0 text-white/80 hover:text-white" aria-label="Close video"><X className="w-8 h-8" /></button>
            <div className="relative aspect-video bg-black border border-white/20">
              {isEmbed(video.href)
                ? <iframe src={video.href} allow="autoplay; fullscreen" allowFullScreen className="w-full h-full" title={`${project.title} video`} />
                : <video src={video.href} controls autoPlay className="w-full h-full" />}
            </div>
          </div>
        </dialog>
      )}
    </div>
  )
}
