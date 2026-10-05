// Per-project facts for the trophy gallery: filter categories, year, and Rajit's role.
// Roles come from each case study's ROLE line or Rajit's own project descriptions.
export type ProjectCategory = "games" | "tools" | "design"

type Facts = { categories: ProjectCategory[]; year: string; role: string }
const facts: Record<string, Facts> = {
  "001": { categories: ["design"], year: "2025", role: "wireframing, prototyping & code" },
  "002": { categories: ["tools", "design"], year: "2025", role: "full-stack, database & prototyping" },
  "003": { categories: ["games"], year: "2025", role: "programming & UI/UX" },
  "004": { categories: ["tools"], year: "2025", role: "frontend & backend" },
  "005": { categories: ["tools"], year: "2025", role: "whiteboard & APIs" },
  "006": { categories: ["design"], year: "2025", role: "lead researcher & UX designer" },
  "007": { categories: ["tools"], year: "2025", role: "frontend" },
  "008": { categories: ["design"], year: "2024", role: "visual designer & brand strategist" },
  "009": { categories: ["design"], year: "2024", role: "UI/UX designer" },
  "010": { categories: ["design"], year: "2025", role: "UI/UX designer" },
  "011": { categories: ["design"], year: "2025", role: "layout & typography" },
  "012": { categories: ["games"], year: "2026", role: "programming & UX" },
  "013": { categories: ["tools"], year: "2026", role: "search, filtering & comparison tools" },
  "014": { categories: ["games"], year: "2026", role: "camera, UI/UX & audio" },
  "015": { categories: ["games"], year: "2026", role: "full-stack, game server & AI personas" },
  "016": { categories: ["games"], year: "2026", role: "weapon pipeline, enemy AI & audio" },
}

export function projectFacts(id: string): Facts {
  return facts[id]
}

export function inCategory(id: string, category: ProjectCategory) {
  return facts[id].categories.includes(category)
}
