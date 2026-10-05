import Link from "next/link"
import { HeaderNav } from "@/components/landing/header-nav"
import styles from "@/components/landing/landing.module.css"

// The site header shared by the landing and the case studies: the wordmark and the P3R
// navigation. `base` is "" on the landing (in-page anchors) and "/" elsewhere.
export function SiteHeader({ base = "" }: { base?: string }) {
  return (
    <header className={styles.header}>
      {base
        ? <Link href={base} aria-label="Rajit Goel, home" className={styles.wordmark}>RAJIT GOEL</Link>
        : <a href="#" aria-label="Rajit Goel, home" className={styles.wordmark}>RAJIT GOEL</a>}
      <HeaderNav base={base} />
    </header>
  )
}
