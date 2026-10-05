// Where each project lives and which links it has. Pure functions over lib/projects.ts data,
// shared by the trophy grid, the /projects/[slug] page and the coverage tests.
import type { Project } from "./projects"

export type ProjectLink = {
  kind: "case-study" | "project" | "code" | "video" | "devpost"
  href: string
  label: string
  // Opens in a new tab (other sites, PDFs). Videos open in the page's dialog instead.
  external: boolean
}

const usable = (href?: string): href is string => !!href && href !== "#"

export function projectSlug(project: Project) {
  return project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

// One click from a trophy: the case study when there is one, otherwise the project's own page.
export function projectHref(project: Project) {
  return project.links.caseStudy || `/projects/${projectSlug(project)}`
}

export function projectDestinationLabel(project: Project): "case study" | "project" {
  return project.links.caseStudy ? "case study" : "project"
}

// The trophy caption's hook: the first sentence of Rajit's own description.
export function projectHook(project: Project) {
  return project.description.match(/^.+?[.?!](?=\s|$)/)?.[0] ?? project.description
}

export function caseStudyDir(project: Project) {
  return project.links.caseStudy?.match(/^\/case-studies\/([^/?#]+)/)?.[1] ?? null
}

// Same order as the carousel showed them: primary first, then code, video, devpost.
export function projectLinks(project: Project): ProjectLink[] {
  const { caseStudy, project: live, projectLabel, code, videoUrl, videoLabel, devpost } = project.links
  const links: ProjectLink[] = []
  if (usable(caseStudy)) links.push({ kind: "case-study", href: caseStudy, label: "VIEW CASE STUDY", external: false })
  if (usable(live)) links.push({ kind: "project", href: live, label: projectLabel ?? "VIEW PROJECT", external: true })
  if (usable(code)) links.push({ kind: "code", href: code, label: "CODE", external: true })
  if (usable(videoUrl)) links.push({ kind: "video", href: videoUrl, label: videoLabel ?? "WATCH VIDEO", external: false })
  if (usable(devpost)) links.push({ kind: "devpost", href: devpost, label: "DEVPOST", external: true })
  return links
}
