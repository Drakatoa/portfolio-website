// Hovers every P3R-highlightable element on the running site (http://localhost:3000) and
// tiles each blade into a contact sheet per viewport: out/blades/<viewport>-<group>.png.
// Usage: start the portfolio dev server, then `node scripts/review-blades.mjs`.
import { chromium } from "playwright-core"
import { PNG } from "pngjs"
import { mkdirSync, readdirSync, writeFileSync } from "node:fs"; import { homedir } from "node:os"; import { join } from "node:path"
const cache = join(homedir(), "Library/Caches/ms-playwright"); const build = readdirSync(cache).filter((n) => /^chromium-\d+$/.test(n)).sort().reverse()[0]
const browser = await chromium.launch({ executablePath: join(cache, build, "chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing"), args: ["--use-angle=metal"] })
mkdirSync("out/blades", { recursive: true })
async function shoot(page, locator, shots, label) {
  await locator.scrollIntoViewIfNeeded(); await page.mouse.move(2, 2); await page.waitForTimeout(80)
  await locator.hover(); await page.waitForTimeout(260) // after the 100ms pop, before the next pulse peaks
  const host = locator.locator("xpath=.//*[contains(@class,'navLabel') or contains(@class,'projectName') or contains(@class,'actionText')]").first()
  const box = await (await host.count() ? host : locator).boundingBox()
  const vp = page.viewportSize()
  const clip = { x: Math.max(0, box.x - 50), y: Math.max(0, box.y - 28), width: 0, height: 0 }
  clip.width = Math.min(vp.width - clip.x, box.width + 50 + 110); clip.height = Math.min(vp.height - clip.y, box.height + 28 + 50)
  const png = PNG.sync.read(await page.screenshot({ clip }))
  shots.push({ png, label })
}
function sheet(shots, file, columns) {
  const scale = shots[0].png.width / (shots[0].png.width) // 1
  const cw = Math.max(...shots.map((s) => s.png.width)), ch = Math.max(...shots.map((s) => s.png.height))
  const rows = Math.ceil(shots.length / columns)
  const out = new PNG({ width: cw * columns, height: ch * rows })
  for (let i = 0; i < out.data.length; i += 4) out.data.set([30, 30, 36, 255], i)
  shots.forEach((s, i) => PNG.bitblt(s.png, out, 0, 0, s.png.width, s.png.height, (i % columns) * cw, Math.floor(i / columns) * ch))
  writeFileSync(file, PNG.sync.write(out))
}
for (const [name, viewport, touch] of [["desktop", { width: 1280, height: 900 }, false], ["phone", { width: 390, height: 844 }, false]]) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 })
  const errors = []; page.on("pageerror", (e) => errors.push(e.message))
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle", timeout: 120000 })
  const shots = { nav: [], filters: [], actions: [], trophies: [] }
  for (const a of await page.locator("nav[aria-label='Main navigation'] a").all()) if (await a.isVisible()) await shoot(page, a, shots.nav, await a.innerText())
  for (const re of [/^ALL/, /^GAMES/, /^TOOLS/, /^DESIGN/]) { const b = page.getByRole("button", { name: re }).first(); await shoot(page, b, shots.filters, re.source) }
  // Every project page's actions.
  for (const slug of ["sonare-live", "project-pawkour", "auralis", "ideate-ai-whiteboard", "arrestoriq", "eukarya", "hackmate"]) {
    await page.goto(`http://localhost:3000/projects/${slug}`, { waitUntil: "networkidle" })
    for (const a of await page.locator("[class*='projectAction']").all()) if (await a.isVisible()) await shoot(page, a, shots.actions, `${slug}: ${await a.innerText()}`)
  }
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" })
  for (const b of await page.locator("a[aria-label*=': case study'], a[aria-label*=': project']").all()) await shoot(page, b, shots.trophies, await b.getAttribute("aria-label"))
  for (const [group, list] of Object.entries(shots)) if (list.length) sheet(list, `out/blades/${name}-${group}.png`, name === "phone" ? 2 : 3)
  console.log(name, Object.fromEntries(Object.entries(shots).map(([k, v]) => [k, v.length])), errors.length ? errors : "no errors")
  await page.close()
}
await browser.close()
