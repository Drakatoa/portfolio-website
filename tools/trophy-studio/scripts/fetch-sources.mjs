// Downloads the exact source files the trophies are built from, pinned to the
// commits that were inspected. Files land in sources/ (git-ignored): third-party
// meshes must not be redistributed as standalone files, and teammates' raw
// project files stay in their own repositories. Requires an authenticated `gh`.
import { execFileSync } from "node:child_process"
import { mkdirSync, writeFileSync, existsSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")

export const sources = [
  // 003 Project Pawkour: the playable cat (Kitty_001 prefab instance in Assets/Scenes/Tutorial.unity).
  // Third-party: ithappy "Animals FREE", Standard Unity Asset Store EULA.
  { repo: "Drakatoa/Project-Pawkour", sha: "7fd6725a13f4a11adc65bb9b16ccd93f3b7d4496", path: "Assets/ithappy/Animals_FREE/Meshes/Kitty_001.fbx", to: "pawkour/Kitty_001.fbx" },
  { repo: "Drakatoa/Project-Pawkour", sha: "7fd6725a13f4a11adc65bb9b16ccd93f3b7d4496", path: "Assets/ithappy/Animals_FREE/Textures/Texture.png", to: "pawkour/Texture.png" },
  { repo: "Drakatoa/Project-Pawkour", sha: "7fd6725a13f4a11adc65bb9b16ccd93f3b7d4496", path: "Assets/ithappy/Animals_FREE/Animations/Other_Animations/Kitty_001_run.anim", to: "pawkour/Kitty_001_run.anim" },
  // 014 Eukarya: team-authored Tiktaalik (committed by a-sriel, 2026-03-18). No licence file in the repository.
  { repo: "a-sriel/Eukarya", sha: "b9f2546868243bd0b162969d87d7efa5cdff0296", path: "Assets/Animals/Tiktaalik/tetrapod.fbx", to: "eukarya/tetrapod.fbx" },
  { repo: "a-sriel/Eukarya", sha: "b9f2546868243bd0b162969d87d7efa5cdff0296", path: "Assets/Animals/Tiktaalik/Tiktaalik.png", to: "eukarya/Tiktaalik.png" },
  { repo: "a-sriel/Eukarya", sha: "b9f2546868243bd0b162969d87d7efa5cdff0296", path: "Assets/Animals/Tiktaalik/walk.anim", to: "eukarya/walk.anim" },
  // Logos exported by the original projects (no vector masters were available, see docs/asset-inventory.md).
  { repo: "Drakatoa/aed-preface-atcm4341", sha: "15e0cc5f11fa2cc41ee921d561e214364beaa891", path: "src/assets/preface-logo.png", to: "logos/preface-logo.png" },
  { repo: "Drakatoa/Aegis", sha: "d109d3bd3dcf406738e433c5e3290c6260f12f93", path: "icons/logo.png", to: "logos/aegis-logo.png" },
  { repo: "Drakatoa/ideatehackutd2025", sha: "cadaa6d342ae271db3b0321a8350c1603bcc8b97", path: "public/ideate-logo.png", to: "logos/ideate-logo.png" },
  // 012 Sonare.live is a private repository: only Rajit's own released title art is read, never the Miku VRM.
  { repo: "Drakatoa/magical-mirai-competition-2026", sha: "62c8a3e567df346ac543a070a348b591b2faa131", path: "public/assets/title vars/full-color.png", to: "logos/sonare-title.png" },
  { repo: "Drakatoa/magical-mirai-competition-2026", sha: "62c8a3e567df346ac543a070a348b591b2faa131", path: "src/ui/gesture-shapes.js", to: "sonare/gesture-shapes.js" },
  // Team-made Miku VRM and the game's own gesture pose (Rajit confirmed team ownership, 2026-10-02).
  // Character: Hatsune Miku (c) Crypton Future Media, INC. www.piapro.net, Piapro Character License.
  { repo: "Drakatoa/magical-mirai-competition-2026", sha: "62c8a3e567df346ac543a070a348b591b2faa131", path: "public/assets/Miku Final Rig V1.vrm", to: "sonare/miku.vrm" },
  { repo: "Drakatoa/magical-mirai-competition-2026", sha: "62c8a3e567df346ac543a070a348b591b2faa131", path: "public/assets/Finger Point Top Right.vrma", to: "sonare/finger-point-top-right.vrma" },
  { repo: "Drakatoa/magical-mirai-competition-2026", sha: "62c8a3e567df346ac543a070a348b591b2faa131", path: "public/assets/Miku Idle Test Pose.vrma", to: "sonare/idle.vrma" },
]

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  for (const { repo, sha, path, to } of sources) {
    const target = join(root, "sources", to)
    if (existsSync(target) && !process.argv.includes("--force")) { console.log(`keep ${to}`); continue }
    mkdirSync(dirname(target), { recursive: true })
    const url = `repos/${repo}/contents/${path.split("/").map(encodeURIComponent).join("/")}?ref=${sha}`
    const bytes = execFileSync("gh", ["api", url, "-H", "Accept: application/vnd.github.raw"], { maxBuffer: 64 << 20 })
    writeFileSync(target, bytes)
    console.log(`${to} ${bytes.length} bytes`)
  }
}
