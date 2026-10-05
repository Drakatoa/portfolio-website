// Quick still for iteration: node scripts/shot.mjs <id> <out.png> [angles=0,1.57,3.14] [size=450] [bg=dark]
// Renders the requested angles side by side through the real viewer page.
import { writeFileSync } from "node:fs"
import { PNG } from "pngjs"
import { openStudio } from "./browser.mjs"
const [id, out, angleList = "0,1.5708,3.1416", sizeArg = "450", bg = "dark"] = process.argv.slice(2)
const size = Number(sizeArg)
const angles = angleList.split(",").map(Number)
const sheet = new PNG({ width: size * angles.length, height: size })
for (const [index, angle] of angles.entries()) {
  const studio = await openStudio({ path: `/?still=${id}&angle=${angle}&w=${size}&h=${size}&bg=${bg}`, width: size, height: size, scale: 2 })
  await studio.page.waitForFunction(() => window.stillReady, null, { timeout: 60000 })
  const png = PNG.sync.read(await studio.page.screenshot({ clip: { x: 0, y: 0, width: size, height: size }, scale: "css" }))
  PNG.bitblt(png, sheet, 0, 0, size, size, index * size, 0)
  if (studio.errors.length) console.error(studio.errors.join("\n"))
  if (index === 0) console.log(JSON.stringify(await studio.page.evaluate((v) => window.studio.measure(v), id)))
  await studio.close()
}
writeFileSync(out, PNG.sync.write(sheet))
