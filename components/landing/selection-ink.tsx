import type { ReactNode } from "react"
import styles from "./landing.module.css"

// Persona 3 Reload selection: a pink echo and a white blade behind the label, plus a copy
// of the label in red clipped to the blade. The host label supplies --blade-* variables
// (selectionStyle) and decides when the selection is active.
export function SelectionInk({ children }: { children: ReactNode }) {
  return <>
    <span className={styles.bladeEcho} aria-hidden="true" />
    <span className={styles.blade} aria-hidden="true" />
    <span className={styles.bladeInk} aria-hidden="true">{children}</span>
  </>
}
