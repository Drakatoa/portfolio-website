import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { projects } from "../../lib/projects.ts"
import { projectSlug, projectHref, projectDestinationLabel, projectLinks, caseStudyDir, projectHook } from "../../lib/project-pages.ts"

test("slugs are unique and URL-safe", () => {
  const slugs = projects.map(projectSlug)
  assert.equal(new Set(slugs).size, projects.length)
  for (const slug of slugs) assert.match(slug, /^[a-z0-9]+(-[a-z0-9]+)*$/)
  assert.equal(projectSlug(projects.find((p) => p.id === "005")), "ideate-ai-whiteboard")
  assert.equal(projectSlug(projects.find((p) => p.id === "012")), "sonare-live")
})

test("case studies are one click away; everything else gets /projects/<slug>", () => {
  for (const project of projects) {
    if (project.links.caseStudy) {
      assert.equal(projectHref(project), project.links.caseStudy)
      assert.equal(projectDestinationLabel(project), "case study")
    } else {
      assert.equal(projectHref(project), `/projects/${projectSlug(project)}`)
      assert.equal(projectDestinationLabel(project), "project")
    }
  }
})

test("projectLinks lists every link a project defines, nothing invented", () => {
  for (const project of projects) {
    const hrefs = projectLinks(project).map((link) => link.href).sort()
    const { caseStudy, project: live, code, videoUrl, devpost } = project.links
    const expected = [caseStudy, live, code, videoUrl, devpost].filter((href) => href && href !== "#").sort()
    assert.deepEqual(hrefs, expected, project.title)
  }
  const sonare = projectLinks(projects.find((p) => p.id === "012"))
  assert.deepEqual(sonare.map((l) => [l.kind, l.label]), [["project", "PLAY GAME"], ["code", "CODE"]])
  const pawkour = projectLinks(projects.find((p) => p.id === "003"))
  assert.deepEqual(pawkour.find((l) => l.kind === "video"), { kind: "video", href: projects.find((p) => p.id === "003").links.videoUrl, label: "WATCH SPEEDRUN", external: false })
})

test("projectHook is the first sentence of the project's own description", () => {
  const byId = (id) => projects.find((p) => p.id === id)
  assert.equal(projectHook(byId("012")), "What if your webcam was a rhythm game controller?")
  assert.equal(projectHook(byId("013")), "10,000+ flame arrestor configurations, one validated platform.")
  for (const project of projects) assert.ok(project.description.startsWith(projectHook(project)), project.title)
})

test("caseStudyDir maps /case-studies/<dir> to the page folder", () => {
  assert.equal(caseStudyDir(projects.find((p) => p.id === "001")), "preface")
  assert.equal(caseStudyDir(projects.find((p) => p.id === "012")), null)
})

// Nothing is removed: links a case-study project had in the carousel must exist on its case-study page.
test("every case-study project's other links appear on its case-study page", () => {
  for (const project of projects) {
    const dir = caseStudyDir(project)
    if (!dir) continue
    const source = readFileSync(new URL(`../../app/case-studies/${dir}/page.tsx`, import.meta.url), "utf8")
    // Reskinned pages render every link from lib/projects.ts through <ProjectActions project={project} …>.
    if (/<ProjectActions\s+project=\{project\}/.test(source)) continue
    for (const link of projectLinks(project)) {
      if (link.kind === "case-study") continue
      assert.ok(source.includes(link.href), `${project.title}: ${link.kind} ${link.href} missing from app/case-studies/${dir}/page.tsx`)
    }
  }
})
