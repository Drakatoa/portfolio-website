// Exports every trophy model (without the shared platter) to models/*.glb, then
// records triangles, materials, bounds and bytes in docs/stats.json.
import { writeFileSync, readFileSync, mkdirSync, statSync } from "node:fs"
import { join } from "node:path"
import { NodeIO } from "@gltf-transform/core"
import { ALL_EXTENSIONS } from "@gltf-transform/extensions"
import { dedup, prune, weld } from "@gltf-transform/functions"
import { openStudio, root } from "./browser.mjs"
import { GLB } from "./models.mjs"

const slug = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS)
const studio = await openStudio({ path: "/?still=001" })
await studio.page.waitForFunction(() => window.studio)
const list = await studio.page.evaluate(() => window.studio.trophies.map(({ id, title, status, artifact }) => ({ id, title, status, artifact })))
const rows = []
mkdirSync(join(root, "models"), { recursive: true })
for (const entry of list) {
  const { base64, stats } = await studio.page.evaluate((id) => window.studio.exportModel(id), entry.id)
  let file = GLB[entry.id]
  if (!file) {
    // Factory trophies: the factory is the source of truth; this GLB is a derived copy.
    file = `${entry.id}-${slug(entry.title)}.glb`
    const document = await io.readBinary(Buffer.from(base64, "base64"))
    await document.transform(weld(), dedup(), prune())
    writeFileSync(join(root, "models", file), await io.writeBinary(document))
  }
  const bytes = statSync(join(root, "models", file)).size
  rows.push({ ...entry, file, bytes, triangles: stats.triangles, materials: stats.materials, min: stats.min.map((v) => +v.toFixed(3)), max: stats.max.map((v) => +v.toFixed(3)), radius: +stats.radius.toFixed(3) })
  console.log(`${entry.id} ${String(stats.triangles).padStart(6)} tris ${String(bytes).padStart(8)} B  r=${stats.radius.toFixed(2)} h=${stats.max[1].toFixed(2)}  ${file}`)
}
mkdirSync(join(root, "docs"), { recursive: true })
writeFileSync(join(root, "docs/stats.json"), JSON.stringify(rows, null, 2) + "\n")
const errors = studio.errors.filter((e) => !/status of 404/.test(e))
if (errors.length) console.error(errors.join("\n"))
await studio.close()
