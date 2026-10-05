import { test } from "node:test"
import assert from "node:assert/strict"
import { existsSync } from "node:fs"
import { projects } from "../../lib/projects.ts"
import { hackathonFor } from "../../lib/hackathons.ts"

const byId = (id) => projects.find((p) => p.id === id)

test("every Devpost project has a hackathon with a real logo and a devpost URL", () => {
  const withDevpost = projects.filter((p) => p.links.devpost)
  assert.ok(withDevpost.length >= 3)
  for (const project of withDevpost) {
    const hackathon = hackathonFor(project)
    assert.ok(hackathon, `${project.title} has no hackathon`)
    assert.ok(existsSync(new URL(`../../public${hackathon.logo}`, import.meta.url)), `${hackathon.logo} missing`)
    assert.match(hackathon.url, /^https:\/\/[a-z0-9-]+\.devpost\.com\/$/)
  }
})

test("hackathon names and awards", () => {
  assert.deepEqual(
    [hackathonFor(byId("015"))?.name, hackathonFor(byId("015"))?.award],
    ["HackGT 13: Seaside Market", undefined],
  )
  assert.deepEqual(
    [hackathonFor(byId("016"))?.name, hackathonFor(byId("016"))?.award],
    ["Hack the North 2026", "Top 10, Sentry track"],
  )
  assert.deepEqual(
    [hackathonFor(byId("005"))?.name, hackathonFor(byId("005"))?.award],
    ["HackUTD 2025: Lost in the Pages", "Honorable Mention, NVIDIA track (top 5 of 100+)"],
  )
})

test("Catfish and Appeara links", () => {
  const catfish = byId("015")
  const appeara = byId("016")
  assert.equal(catfish.title, "CATFISH")
  assert.equal(catfish.links.project, "https://catfish-eight.vercel.app")
  assert.equal(catfish.links.projectLabel, "PLAY IT")
  assert.equal(catfish.links.devpost, "https://devpost.com/software/catfish-training-against-romance-scams")
  assert.equal(catfish.links.videoUrl, "https://www.youtube.com/embed/tHjDgC-W2qI")
  assert.equal(catfish.links.code, undefined)
  assert.equal(appeara.title, "APPEARA")
  assert.equal(appeara.links.code, "https://github.com/RiddhRam/Appeara")
  assert.equal(appeara.links.devpost, "https://devpost.com/software/ink-bound")
  assert.equal(appeara.links.videoUrl, "https://www.youtube.com/embed/M4CBEt53Thw")
})
