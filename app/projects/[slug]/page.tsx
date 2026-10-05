import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { projects } from "@/lib/projects"
import { projectSlug } from "@/lib/project-pages"
import { ProjectPage } from "@/components/project-page"

// Projects with a case study live at /case-studies/*; these pages cover the rest.
const ownPage = projects.filter((project) => !project.links.caseStudy)
const find = (slug: string) => ownPage.find((project) => projectSlug(project) === slug)

export const dynamicParams = false
export function generateStaticParams() {
  return ownPage.map((project) => ({ slug: projectSlug(project) }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = find((await params).slug)
  return project ? { title: `${project.title} — Rajit Goel`, description: project.description.slice(0, 155) } : {}
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const project = find((await params).slug)
  if (!project) notFound()
  return <ProjectPage project={project} />
}
