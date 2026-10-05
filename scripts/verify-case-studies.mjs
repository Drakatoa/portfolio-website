// Browser acceptance for the case study pages. Needs `npx next dev -p 3000`.
// Run: node scripts/verify-case-studies.mjs
import { createRequire } from "node:module"
import { readdirSync } from "node:fs"
import { homedir } from "node:os"
import { join } from "node:path"
import { projects } from "../lib/projects.ts"
import { projectLinks } from "../lib/project-pages.ts"

const require = createRequire(new URL("../tools/trophy-studio/package.json", import.meta.url))
const { chromium } = require("playwright-core")
const cache = join(homedir(), "Library/Caches/ms-playwright")
const build = readdirSync(cache).filter((name) => /^chromium-\d+$/.test(name)).sort().reverse()[0]
const browser = await chromium.launch({ executablePath: join(cache, build, "chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing") })
const base = "http://localhost:3000"
const failures = []
const studies = projects.filter((project) => project.links.caseStudy)

for (const project of studies) {
  const path = project.links.caseStudy
  const tag = project.title
  const fail = (message) => failures.push(`${tag}: ${message}`)

  // Desktop: frame, section bar, links.
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
  page.on("pageerror", (error) => fail(`page error: ${error.message}`))
  // The site ships no favicon, so the browser's automatic /favicon.ico request 404s; that is not a page error.
  const real = (msg) => msg.type() === "error" && !msg.location().url.endsWith("/favicon.ico")
  page.on("console", (msg) => { if (real(msg)) fail(`console error: ${msg.text()}`) })
  const response = await page.goto(base + path, { waitUntil: "networkidle" })
  if (!response || response.status() !== 200) { fail(`${path} returned ${response?.status()}`); await page.close(); continue }

  if (!(await page.locator('header a[aria-label="Rajit Goel, home"]').count())) fail("header wordmark missing")
  for (const href of ["/#projects", "/#about", "/#interests"]) {
    if (!(await page.locator(`header a[href="${href}"]`).count())) fail(`header nav link ${href} missing`)
  }
  if (!(await page.locator("footer").count())) fail("footer colophon missing")

  const entries = page.locator('nav[aria-label="Case study sections"] a')
  const count = await entries.count()
  if (count < 5) fail(`section bar has ${count} entries, expected at least 5`)
  else {
    const target = (await entries.nth(2).getAttribute("href")).slice(1)
    await entries.nth(2).click()
    await page.waitForFunction((id) => { const el = document.getElementById(id); return el && Math.abs(el.getBoundingClientRect().top) <= 120 }, target, { timeout: 5000 })
      .catch(() => fail(`clicking the 3rd section entry did not bring #${target} to the top`))
  }

  const html = await page.content()
  for (const link of projectLinks(project)) {
    if (link.kind === "case-study") continue
    if (!html.includes(link.href) && !html.includes(link.href.replaceAll("&", "&amp;"))) fail(`${link.kind} ${link.href} not rendered`)
  }
  await page.close()

  // Phone: no horizontal overflow, no SlantCard text overflowing its card.
  const phone = await browser.newPage({ viewport: { width: 390, height: 844 } })
  phone.on("pageerror", (error) => fail(`390px page error: ${error.message}`))
  phone.on("console", (msg) => { if (real(msg)) fail(`390px console error: ${msg.text()}`) })
  await phone.goto(base + path, { waitUntil: "networkidle" })
  // `.site { overflow: clip }` hides overflow from scrollWidth, so measure element rects instead.
  // SlantCard's decorative frame (aria-hidden) and the sideways-scrolling section bar are exempt.
  const overflowing = await phone.evaluate(() => [...document.querySelectorAll("main *")].filter((el) => {
    if (el.closest('[aria-hidden="true"]')) return false
    const r = el.getBoundingClientRect()
    return r.width > 0 && (r.right > innerWidth + 1 || r.left < -1)
  }).slice(0, 5).map((el) => `${el.tagName.toLowerCase()}.${String(el.className).split(" ")[0]}`))
  if (overflowing.length) fail(`horizontal overflow at 390px: ${overflowing.join(", ")}`)
  const clipped = await phone.evaluate(() => [...document.querySelectorAll("[data-slant-card]")].filter((card) => {
    const text = card.querySelector("[data-slant-text]")
    return text && text.scrollHeight > text.clientHeight + 1
  }).length)
  if (clipped) fail(`${clipped} SlantCard(s) overflow their text at 390px`)
  await phone.close()
}
await browser.close()

if (failures.length) { console.error(failures.join("\n")); process.exit(1) }
console.log(`ok: ${studies.length} case studies, header/footer present, section bar scrolls, every link rendered, no overflow at 390px, no console errors`)
