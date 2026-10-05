import { Sparkle } from "@/components/landing/sparkle"
import styles from "@/components/landing/landing.module.css"

// The site colophon: the signature line, the "made with" line and the build date.
export function SiteFooter() {
  const built = new Date(process.env.NEXT_PUBLIC_BUILD_DATE ?? Date.now())
  return (
    <footer className={styles.colophon}>
      <p className={styles.signature}>© {built.getFullYear()} rajit goel <Sparkle className={styles.signatureStar} /> <a href="mailto:ragoel123@gmail.com">ragoel123@gmail.com</a></p>
      <p>made with <span className={styles.heart} aria-label="love">♥</span> and <span role="img" aria-label="tea">🍵</span> using <a href="https://nextjs.org/">next.js</a>, <a href="https://react.dev/">react</a>, <a href="https://threejs.org/">three.js</a>, and <a href="https://tailwindcss.com/">tailwind css</a>.</p>
      {/* NEXT_PUBLIC_BUILD_DATE is inlined at build time, so client navigations show the deploy date too. */}
      <p className={styles.updated}>last updated: <time dateTime={built.toISOString().slice(0, 10)}>{built.toLocaleDateString("en-US", { timeZone: "America/New_York", dateStyle: "long" }).toLowerCase()}</time></p>
    </footer>
  )
}
