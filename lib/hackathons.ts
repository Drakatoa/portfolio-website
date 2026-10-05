import type { Project } from "./projects"

export type Hackathon = { name: string; url: string; logo: string; award?: string }

// Keyed by project id. Only projects submitted to a hackathon appear here.
const hackathons: Record<string, Hackathon> = {
  "005": {
    name: "HackUTD 2025: Lost in the Pages",
    url: "https://hackutd-2025.devpost.com/",
    logo: "/hackathons/hackutd2025.webp",
    award: "Honorable Mention, NVIDIA track (top 5 of 100+)",
  },
  "015": {
    name: "HackGT 13: Seaside Market",
    url: "https://hackgt13.devpost.com/",
    logo: "/hackathons/hackgt13.webp",
  },
  "016": {
    name: "Hack the North 2026",
    url: "https://hackthenorth2026.devpost.com/",
    logo: "/hackathons/htn2026.webp",
    award: "Top 10, Sentry track",
  },
}

export function hackathonFor(project: Project): Hackathon | undefined {
  return hackathons[project.id]
}
