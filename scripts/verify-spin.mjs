// Idle spin check. Needs `npx next dev -p 3000`. Run: node scripts/verify-spin.mjs
import { createRequire } from "node:module"
import { readdirSync } from "node:fs"
import { homedir } from "node:os"
import { join } from "node:path"

const require = createRequire(new URL("../tools/trophy-studio/package.json", import.meta.url))
const { chromium } = require("playwright-core")
const cache = join(homedir(), "Library/Caches/ms-playwright")
const build = readdirSync(cache).filter((name) => /^chromium-\d+$/.test(name)).sort().reverse()[0]
const browser = await chromium.launch({ executablePath: join(cache, build, "chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing"), args: ["--use-angle=metal", "--ignore-gpu-blocklist"] })
const failures = []

// Two screenshots of one trophy tile 600 ms apart: different bytes means it moved.
async function moves(page, id) {
  const tile = page.locator(`[data-trophy="${id}"]`)
  const a = await tile.screenshot()
  await page.waitForTimeout(600)
  const b = await tile.screenshot()
  return !a.equals(b)
}

for (const reducedMotion of ["no-preference", "reduce"]) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion })
  await page.goto("http://localhost:3000/#projects", { waitUntil: "networkidle" })
  await page.waitForFunction(() => document.querySelector("[data-ready='true']"), null, { timeout: 60000 })
  await page.locator('[data-trophy="002"]').scrollIntoViewIfNeeded()
  await page.waitForTimeout(800)
  const idle = await moves(page, "002")
  if (reducedMotion === "reduce") {
    if (idle) failures.push("reduced motion: trophy 002 moved without interaction")
  } else {
    if (!idle) failures.push("trophy 002 is not spinning on load")
    const box = await page.locator('[data-trophy="002"]').boundingBox()
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
    await page.mouse.down(); await page.mouse.up()
    await page.waitForTimeout(200)
    if (await moves(page, "002")) failures.push("trophy 002 kept spinning after being picked up")
    if (!(await moves(page, "001"))) failures.push("picking up 002 stopped 001 too")
    await page.getByRole("button", { name: "Reset AEGIS trophy" }).click()
    await page.waitForTimeout(200)
    if (!(await moves(page, "002"))) failures.push("reset did not restart the spin")
  }
  await page.close()
}
// Touch: a vertical page-scroll swipe over a trophy must not count as picking it up.
{
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true })
  const page = await context.newPage()
  await page.goto("http://localhost:3000/#projects", { waitUntil: "networkidle" })
  await page.waitForFunction(() => document.querySelector("[data-ready='true']"), null, { timeout: 60000 })
  await page.locator('[data-trophy="002"]').scrollIntoViewIfNeeded()
  await page.waitForTimeout(800)
  const box = await page.locator('[data-trophy="002"]').boundingBox()
  const cdp = await context.newCDPSession(page)
  const x = Math.round(box.x + box.width / 2), y = Math.round(box.y + box.height / 2 - 60)
  await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y }] })
  for (let i = 1; i <= 6; i++) await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x, y: y + i * 20 }] })
  await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] })
  await page.waitForTimeout(300)
  if (!(await moves(page, "002"))) failures.push("touch: vertical swipe stopped trophy 002")
  if (!(await page.getByRole("button", { name: "Reset AEGIS trophy" }).isDisabled())) failures.push("touch: vertical swipe enabled the reset button")
  await context.close()
}
await browser.close()
if (failures.length) { console.error(failures.join("\n")); process.exit(1) }
console.log("ok: trophies spin on load, stop when picked up, restart on reset, stay still under reduced motion")
