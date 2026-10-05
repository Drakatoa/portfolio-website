// Persona-style lettering, seeded from the word so it never changes between renders.
//   "tag"     - name tag: tilted, varied letters, one inverted (light on dark)
//   "command" - battle command: upright heavy letters, first letter large, mixed
//               sizes, one letter boxed (black on white) like GU[A]RD / PERSO[N]A
import styles from "./p5-ui.module.css"

function rng(seed: string) {
  let h = 2166136261
  for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619)
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507)
    h = Math.imul(h ^ (h >>> 13), 3266489909)
    return ((h ^= h >>> 16) >>> 0) / 4294967296
  }
}

export function P5Word({ text, className, invert = 1, variant = "tag", boxed, out = "right", ramp = [0.84, 1.28] }: {
  text: string; className?: string; invert?: number; variant?: "tag" | "command"; boxed?: number
  out?: "left" | "right" // command words grow toward their outer end, like the game's fanned menu
  ramp?: [number, number] // command letter size at the inner and outer end (em)
}) {
  const r = rng(text)
  const letters = [...text]
  const slots = letters.map((_, i) => i).filter((i) => i > 0 && letters[i] !== " ")
  const inverted = new Set<number>()
  if (boxed !== undefined) { if (boxed >= 0) inverted.add(boxed) }
  else for (let k = 0; k < invert && slots.length; k++) inverted.add(slots.splice(Math.floor(r() * slots.length), 1)[0])
  const cmd = variant === "command"
  return (
    <span className={`${styles.word} ${cmd ? styles.wordCmd : ""} ${className ?? ""}`} aria-label={text}>
      {letters.map((c, i) => {
        const n = Math.max(1, letters.length - 1)
        const t = out === "right" ? i / n : 1 - i / n // 0 at the inner end, 1 at the outer end
        const rot = cmd ? (t - 0.5) * 7 + (r() - 0.5) * (inverted.has(i) ? 10 : 5) : (r() - 0.5) * 16
        // command letters grow strictly from the inner end (by the button) to the outer end
        const scale = cmd ? ramp[0] + t * (ramp[1] - ramp[0]) + (r() - 0.5) * 0.03 : i === 0 ? 1.22 : 0.9 + r() * 0.28
        const lift = (r() - 0.5) * (cmd ? 0.08 : 0.12)
        return (
          <span key={i} aria-hidden="true" className={inverted.has(i) ? styles.inv : undefined}
            style={cmd
              // command letters: real font sizes, so spacing follows each letter's width
              ? { fontSize: `${scale.toFixed(2)}em`, transform: `translateY(${lift}em) rotate(${rot.toFixed(1)}deg)` }
              : { transform: `translateY(${lift}em) rotate(${rot.toFixed(1)}deg) scale(${scale.toFixed(2)})` }}>
            {c === " " ? " " : c}
          </span>
        )
      })}
    </span>
  )
}
