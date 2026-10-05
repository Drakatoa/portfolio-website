// Browser acceptance for the trophy grid + project pages. Needs `npx next dev -p 3000`.
// Run: node scripts/verify-projects.mjs
import { createRequire } from "node:module"
import { readdirSync } from "node:fs"
import { homedir } from "node:os"
import { join } from "node:path"
import { projects } from "../lib/projects.ts"
import { projectHref, projectLinks, projectSlug } from "../lib/project-pages.ts"
import { projectGallery } from "../lib/project-gallery.ts"
import { hackathonFor } from "../lib/hackathons.ts"

const require = createRequire(new URL("../tools/trophy-studio/package.json", import.meta.url))
const { chromium } = require("playwright-core")
const cache = join(homedir(), "Library/Caches/ms-playwright")
const build = readdirSync(cache).filter((name) => /^chromium-\d+$/.test(name)).sort().reverse()[0]
const browser = await chromium.launch({ executablePath: join(cache, build, "chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing") })
const base = "http://localhost:3000"
const failures = []

for (const viewport of [{ width: 1280, height: 900 }, { width: 390, height: 844 }]) {
  const page = await browser.newPage({ viewport })
  page.on("pageerror", (error) => failures.push(`${viewport.width}px page error: ${error.message}`))
  await page.goto(`${base}/#projects`, { waitUntil: "networkidle" })
  for (const project of projects) {
    const caption = page.locator(`a[aria-label^="${project.title}:"]`)
    const href = await caption.getAttribute("href").catch(() => null)
    if (href !== projectHref(project)) failures.push(`${viewport.width}px ${project.title}: caption href ${href}, expected ${projectHref(project)}`)
  }
  if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) failures.push(`${viewport.width}px: horizontal overflow on home`)
  await page.close()
}

const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
for (const project of projects) {
  const destination = projectHref(project)
  const response = await page.goto(base + destination, { waitUntil: "networkidle" })
  if (!response || response.status() !== 200) { failures.push(`${project.title}: ${destination} returned ${response?.status()}`); continue }
  const html = await page.content()
  for (const link of projectLinks(project)) {
    if (link.kind === "case-study" || link.kind === "video") continue
    if (!html.includes(link.href) && !html.includes(link.href.replaceAll("&", "&amp;"))) failures.push(`${project.title}: ${link.kind} ${link.href} not on ${destination}`)
  }
  const video = projectLinks(project).find((link) => link.kind === "video")
  if (video && !project.links.caseStudy) {
    await page.getByRole("button", { name: new RegExp(video.label, "i") }).click()
    if (!(await page.locator(`dialog[open] iframe[src="${video.href}"]`).count())) failures.push(`${project.title}: video dialog did not open`)
    await page.keyboard.press("Escape")
  }
  // Gallery: every thumbnail loads; the lightbox opens and steps (single-image galleries only open).
  const slug = projectSlug(project)
  if (destination.startsWith("/projects/")) {
    const expected = projectGallery(project, slug).length
    const imgs = page.locator('section[aria-label$=" gallery"] img')
    const count = await imgs.count()
    if (expected < 2) {
      // A cover-only gallery repeats the hero poster, so the page hides it.
      if (count) failures.push(`${project.title}: cover-only gallery should be hidden, found ${count} images`)
    } else {
    if (count !== expected) failures.push(`${project.title}: ${count} gallery images, expected ${expected}`)
    for (let i = 0; i < count; i++) {
      const img = imgs.nth(i)
      await img.scrollIntoViewIfNeeded()
      const ok = await page.waitForFunction((el) => el.complete && el.naturalWidth > 0, await img.elementHandle(), { timeout: 5000 }).then(() => true, () => false)
      if (!ok) failures.push(`${project.title}: gallery image ${i + 1} did not load`)
    }
    if (count) {
      await page.locator('section[aria-label$=" gallery"] button').first().click()
      const opened = await page.waitForSelector("dialog[open]", { timeout: 3000 }).then(() => true, () => false)
      const shown = page.locator("dialog[open] figure img")
      if (!opened || !(await shown.count())) failures.push(`${project.title}: lightbox did not open`)
      else if (count > 1) {
        const before = await shown.getAttribute("src")
        await page.keyboard.press("ArrowRight")
        await page.waitForFunction((src) => document.querySelector("dialog[open] figure img")?.getAttribute("src") !== src, before, { timeout: 3000 }).catch(() => {})
        if ((await page.locator("dialog[open] figure img").getAttribute("src")) === before) failures.push(`${project.title}: ArrowRight did not change the lightbox image`)
      }
      await page.keyboard.press("Escape")
      if (await page.locator("dialog[open]").count()) failures.push(`${project.title}: lightbox did not close on Escape`)
    }
    }
  }
  const hackathon = hackathonFor(project)
  if (hackathon) {
    const block = await page.locator('section[aria-labelledby]:has-text("Submitted to")').innerText().catch(() => "")
    if (!block.includes(hackathon.name)) failures.push(`${project.title}: hackathon "${hackathon.name}" not shown`)
    if (hackathon.award && !block.includes(hackathon.award)) failures.push(`${project.title}: hackathon award not shown`)
  }
}
await browser.close()

if (failures.length) { console.error(failures.join("\n")); process.exit(1) }
console.log(`ok: ${projects.length} trophies, each destination 200, every link present, video dialogs open, galleries load and step, hackathon blocks shown`)
