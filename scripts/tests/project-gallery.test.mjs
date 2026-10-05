import { test } from "node:test"
import assert from "node:assert/strict"
import { existsSync, statSync } from "node:fs"
import { fileURLToPath } from "node:url"
import sharp from "sharp"
import { projects } from "../../lib/projects.ts"
import { projectSlug } from "../../lib/project-pages.ts"
import { projectGallery, galleryManifest, PENDING, MIN_EXCEPTIONS } from "../../lib/project-gallery.ts"

const publicPath = (src) => new URL(`../../public${src}`, import.meta.url)
const galleryProjects = projects.filter((p) => !p.links.caseStudy)

test("every non-case-study project has 3-8 gallery images, unless pending or a documented exception", () => {
  for (const project of galleryProjects) {
    const slug = projectSlug(project)
    const count = (galleryManifest[slug] ?? []).length
    if (PENDING.includes(slug)) continue
    if (MIN_EXCEPTIONS.includes(slug)) {
      assert.ok(count >= 1 && count <= 8, `${slug}: ${count} images`)
      continue
    }
    assert.ok(count >= 3 && count <= 8, `${slug}: ${count} images, expected 3-8`)
  }
})

test("every manifest image exists, is small, and carries dimensions, alt, credit and source", async () => {
  const slugs = galleryProjects.map(projectSlug)
  for (const [slug, images] of Object.entries(galleryManifest)) {
    assert.ok(slugs.includes(slug), `${slug} is not a gallery project`)
    const srcs = images.map((image) => image.src)
    assert.equal(new Set(srcs).size, srcs.length, `${slug}: duplicate src`)
    for (const image of images) {
      const file = publicPath(image.src)
      assert.ok(existsSync(file), `${slug}: ${image.src} missing`)
      assert.ok(statSync(file).size <= 300 * 1024, `${slug}: ${image.src} over 300 KB`)
      const { width, height } = await sharp(fileURLToPath(file)).metadata()
      assert.deepEqual([image.width, image.height], [width, height], `${slug}: ${image.src} dimensions`)
      for (const field of ["alt", "credit", "source"]) {
        assert.ok(typeof image[field] === "string" && image[field].trim(), `${slug}: ${image.src} ${field}`)
      }
    }
  }
})

test("PENDING contains only slugs with no images yet", () => {
  const slugs = galleryProjects.map(projectSlug)
  for (const slug of PENDING) {
    assert.ok(slugs.includes(slug), `${slug} is not a gallery project`)
    assert.equal((galleryManifest[slug] ?? []).length, 0, `${slug} has images, remove it from PENDING`)
  }
  for (const slug of MIN_EXCEPTIONS) assert.ok(slugs.includes(slug), `${slug} is not a gallery project`)
})

test("projectGallery puts the cover first, then the manifest, de-duplicated by src", async () => {
  for (const project of galleryProjects) {
    const gallery = projectGallery(project, projectSlug(project))
    const manifest = galleryManifest[projectSlug(project)] ?? []
    assert.equal(gallery[0].src, project.image)
    assert.equal(gallery[0].alt, `${project.title} cover`)
    const slug = projectSlug(project)
    const credit = { catfish: "Catfish team (HackGT 13)", appeara: "Appeara team (Hack the North 2026)" }[slug]
    assert.equal(gallery[0].credit, credit ?? "Rajit Goel")
    assert.equal(gallery[0].source, credit ? project.links.devpost : "portfolio")
    const srcs = gallery.map((g) => g.src)
    assert.equal(new Set(srcs).size, srcs.length)
    assert.deepEqual(srcs.slice(1), manifest.map((m) => m.src).filter((s) => s !== project.image))
    const { width, height } = await sharp(fileURLToPath(publicPath(project.image))).metadata()
    assert.ok(width > 0 && height > 0, project.image)
  }
})
