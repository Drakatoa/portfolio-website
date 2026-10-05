// Gallery images for the /projects/<slug> pages: the project's cover, then the curated manifest.
// Browser-safe: no fs or sharp here; scripts/tests/project-gallery.test.mjs checks the files on disk.
import type { Project } from "./projects"
import manifest from "./project-gallery.data.json" with { type: "json" }

export type GalleryImage = {
  src: string
  // Optional: the cover entry's size is not stored; render it with next/image `fill` or its own sizing.
  width?: number
  height?: number
  alt: string
  credit: string
  source: string
  // Where the original file was downloaded from (manifest entries only).
  origin?: string
}

export const galleryManifest: Record<string, GalleryImage[]> = manifest

// Projects whose gallery is still to come (no manifest images yet).
export const PENDING: string[] = []

// Projects allowed fewer than 3 images (sponsor constraint: only the public poster is usable).
export const MIN_EXCEPTIONS = ["arrestoriq"]

// Cover credits by slug. A cover that is the team's Devpost thumbnail names the team; the rest are portfolio art.
const COVER_CREDITS: Record<string, string> = {
  catfish: "Catfish team (HackGT 13)",
  appeara: "Appeara team (Hack the North 2026)",
}

// `slug` comes from projectSlug in ./project-pages, which the page already has.
export function projectGallery(project: Project, slug: string): GalleryImage[] {
  const cover: GalleryImage = { src: project.image, alt: `${project.title} cover`, credit: COVER_CREDITS[slug] ?? "Rajit Goel", source: COVER_CREDITS[slug] ? (project.links.devpost ?? "portfolio") : "portfolio" }
  const seen = new Set<string>()
  return [cover, ...(galleryManifest[slug] ?? [])].filter((image) => {
    if (seen.has(image.src)) return false
    seen.add(image.src)
    return true
  })
}
