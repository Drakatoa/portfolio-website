import { useId } from "react"
import Image from "next/image"
import { Trophy } from "lucide-react"
import type { Project } from "@/lib/projects"
import { hackathonFor } from "@/lib/hackathons"
import styles from "./project-hackathon.module.css"

// "Submitted to" block: the hackathon and any award. The Devpost write-up is already a project action.
export function ProjectHackathon({ project }: { project: Project }) {
  const labelId = useId()
  const hackathon = hackathonFor(project)
  if (!hackathon) return null
  return (
    <section className={styles.block} aria-labelledby={labelId}>
      <p id={labelId} className={styles.label}>Submitted to</p>
      <a className={styles.row} href={hackathon.url} target="_blank" rel="noopener noreferrer">
        <Image className={styles.logo} src={hackathon.logo} alt="" width={48} height={48} />
        <span className={styles.name}>{hackathon.name}</span>
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
      {hackathon.award && <p className={styles.award}><Trophy size={16} aria-hidden="true" />{hackathon.award}</p>}
    </section>
  )
}
