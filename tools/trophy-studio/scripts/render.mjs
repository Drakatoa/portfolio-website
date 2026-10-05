// Review renders through the real viewer page (same single-context scissor renderer
// as the site): contact sheets on dark and light, per-object views at portfolio
// sizes, source comparisons, and a transparent static fallback per model.
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { PNG } from "pngjs"
import { openStudio, root } from "./browser.mjs"

const out = (...p) => join(root, "out", ...p)
for (const dir of ["sheets", "views", "fallback", "compare"]) mkdirSync(out(dir), { recursive: true })
const only = process.argv.slice(2).filter((a) => !a.startsWith("--"))

async function fullPage(path, file, width = 1500) {
  const studio = await openStudio({ path, width, height: 900 })
  await studio.page.emulateMedia({ reducedMotion: "reduce" })
  await studio.page.waitForFunction(() => window.studio)
  await studio.page.evaluate(() => window.studio.ready())
  const height = await studio.page.evaluate(() => document.documentElement.scrollHeight)
  await studio.page.setViewportSize({ width, height })
  await studio.page.waitForTimeout(800)
  await studio.page.screenshot({ path: file })
  const errors = studio.errors.filter((e) => !/status of 404/.test(e))
  await studio.close()
  return errors
}

async function still(id, angle, w, h, bg, scale = 2) {
  const studio = await openStudio({ path: `/?still=${id}&angle=${angle}&w=${w}&h=${h}&bg=${bg}`, width: w, height: h, scale })
  await studio.page.waitForFunction(() => window.stillReady, null, { timeout: 60000 })
  const png = await studio.page.screenshot({ clip: { x: 0, y: 0, width: w, height: h }, omitBackground: bg === "none" })
  await studio.close()
  return PNG.sync.read(png)
}

function grid(images, columns, gap = 0, background = [5, 5, 7, 255]) {
  const w = Math.max(...images.map((i) => i.width)), h = Math.max(...images.map((i) => i.height))
  const rows = Math.ceil(images.length / columns)
  const sheet = new PNG({ width: columns * w + (columns - 1) * gap, height: rows * h + (rows - 1) * gap })
  for (let i = 0; i < sheet.data.length; i += 4) sheet.data.set(background, i)
  images.forEach((image, index) => PNG.bitblt(image, sheet, 0, 0, image.width, image.height, (index % columns) * (w + gap), Math.floor(index / columns) * (h + gap)))
  return sheet
}

const studio = await openStudio({ path: "/?still=001" })
await studio.page.waitForFunction(() => window.studio)
const ids = (await studio.page.evaluate(() => window.studio.trophies.map((t) => t.id))).filter((id) => !only.length || only.includes(id))
await studio.close()

if (process.argv.includes("--styles")) {
  for (const [file, query] of [["styles-desktop.png", "?styles"], ["styles-phone.png", "?styles&size=phone"]]) {
    const errors = await fullPage(`/${query}`, out("sheets", file), 1900)
    console.log(file, errors.length ? errors : "")
  }
  process.exit(0)
}
if (!only.length) {
  for (const bg of ["dark", "light"]) {
    const errors = await fullPage(`/?bg=${bg}`, out("sheets", `contact-sheet-${bg}.png`))
    console.log(`contact-sheet-${bg}.png`, errors.length ? errors : "")
  }
  for (const [file, query] of [["styles-desktop.png", "?styles"], ["styles-phone.png", "?styles&size=phone"]]) {
    const errors = await fullPage(`/${query}`, out("sheets", file), 1900)
    console.log(file, errors.length ? errors : "")
  }
}
for (const id of ids) {
  // Front / side / back at 450 and at the 390px-phone tile (164x180), on dark and light.
  const views = []
  for (const bg of ["dark", "light"]) for (const angle of [0, Math.PI / 2, Math.PI]) views.push(await still(id, angle, 450, 450, bg, 1))
  for (const bg of ["dark", "light"]) for (const angle of [0, Math.PI / 2, Math.PI]) {
    const small = await still(id, angle, 164, 180, bg, 1)
    const padded = new PNG({ width: 450, height: 450 })
    const fill = bg === "dark" ? [5, 5, 7, 255] : [244, 243, 239, 255]
    for (let i = 0; i < padded.data.length; i += 4) padded.data.set(fill, i)
    PNG.bitblt(small, padded, 0, 0, 164, 180, 143, 135)
    views.push(padded)
  }
  writeFileSync(out("views", `${id}.png`), PNG.sync.write(grid(views, 6)))
  // Static fallback: the live desktop tile at 2x, transparent, initial angle.
  writeFileSync(out("fallback", `${id}.png`), PNG.sync.write(await still(id, 0, 332, 250, "none", 2)))
  console.log(`views/${id}.png fallback/${id}.png`)
}
// Source reference beside the model: the three games and the two strongest logos.
for (const id of ["003", "014", "012", "002", "008"].filter((id) => ids.includes(id))) {
  const errors = await fullPage(`/?id=${id}`, out("compare", `${id}.png`), 1100)
  console.log(`compare/${id}.png`, errors.length ? errors : "")
}
