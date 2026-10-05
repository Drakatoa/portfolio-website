// Builds models/*.glb from the original game meshes (see bake/*.js), then welds,
// de-duplicates and prunes them. Run `npm run fetch` first if sources/ is empty.
import { writeFileSync, mkdirSync } from "node:fs"
import { join } from "node:path"
import { NodeIO } from "@gltf-transform/core"
import { dedup, prune, weld } from "@gltf-transform/functions"
import { ALL_EXTENSIONS } from "@gltf-transform/extensions"
import { openStudio, root } from "./browser.mjs"

import { GLB } from "./models.mjs"

const only = process.argv.slice(2)
const studio = await openStudio({ path: "/bake/index.html" })
await studio.page.waitForFunction(() => window.ready)
mkdirSync(join(root, "models"), { recursive: true })
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS)
for (const id of await studio.page.evaluate(() => window.bakeIds)) {
  if (only.length && !only.includes(id)) continue
  const base64 = await studio.page.evaluate((value) => window.bake(value), id)
  const document = await io.readBinary(Buffer.from(base64, "base64"))
  await document.transform(weld(), dedup(), prune())
  const bytes = await io.writeBinary(document)
  writeFileSync(join(root, "models", GLB[id]), bytes)
  console.log(`${GLB[id]} ${bytes.length} bytes`)
}
const errors = studio.errors.filter((e) => !/status of 404/.test(e))
if (errors.length) console.error(errors.join("\n"))
await studio.close()
