"use client"

import Link from "next/link"
import type { CSSProperties } from "react"
import { selectionStyle } from "@/lib/selection-geometry"
import styles from "./landing.module.css"
import { SelectionInk } from "./selection-ink"

// Each link carries its own Persona 3 Reload blade: like the game menu, the old selection
// disappears instantly and the new one pops in, rather than one highlight sliding across.
// `base` prefixes the in-page anchors: "" on the landing, "/" on other pages.
export function HeaderNav({ base = "" }: { base?: string }) {
  const links = [
    { href: `${base}#projects`, label: "work" },
    { href: `${base}#about`, label: "about" },
    { href: `${base}#interests`, label: "fun stuff" },
  ]
  return (
    <nav aria-label="Main navigation" className={styles.headerNav}>
      {links.map((link) => {
        const props = { style: selectionStyle(link.label) as CSSProperties, "data-label": link.label, href: link.href }
        const label = <span className={styles.navLabel}>{link.label}<SelectionInk>{link.label}</SelectionInk></span>
        // Off the landing these are page navigations; on it they stay plain in-page anchors.
        return base ? <Link key={link.label} {...props}>{label}</Link> : <a key={link.label} {...props}>{label}</a>
      })}
    </nav>
  )
}
