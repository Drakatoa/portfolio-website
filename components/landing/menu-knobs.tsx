"use client"

// Knobs panel for the battle menu (review only: /hero-mock?knobs).
// Every change applies live; "copy values" puts the result on the clipboard to bake in.
import { useState } from "react"
import { CMDS_BASE } from "./battle-menu"
import { GLOBAL_DEFAULTS, knobs, useKnobs, type CmdTweak, type MenuGlobals } from "./menu-knobs-store"
import styles from "./p5-ui.module.css"

type Key = keyof CmdTweak
const WORD: [Key, string, number, number, number][] = [
  ["x", "x", 0, 669, 0.5], ["y", "y", 0, 445, 0.5], ["r", "angle", -60, 60, 0.5],
  ["cap", "size (cap height)", 6, 60, 0.1], ["w", "width", 15, 260, 0.5],
]
const SUBK: [Key, string, number, number, number][] = [
  ["subDx", "along word", -80, 80, 0.5], ["subDy", "across word", -40, 40, 0.5],
  ["subR", "extra angle", -40, 40, 0.5], ["subS", "size ×", 0.4, 2.5, 0.01],
]
const SUB_DEFAULTS: CmdTweak = { subDx: 0, subDy: 0, subR: 0, subS: 1 }

function Row({ label, value, min, max, step, onChange }: { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void }) {
  return (
    <label className={styles.knobRow}>
      <span>{label}</span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
      <input type="number" min={min} max={max} step={step} value={Number(value.toFixed(2))} onChange={(e) => onChange(Number(e.target.value))} />
    </label>
  )
}

export function MenuKnobs() {
  const { cmds, g } = useKnobs(true)
  const [sel, setSel] = useState(0)
  const [copied, setCopied] = useState(false)
  const base = CMDS_BASE[sel]
  const cur = { ...SUB_DEFAULTS, ...base, ...cmds[sel] } as Required<CmdTweak>

  const out = () => JSON.stringify({
    globals: g,
    cmds: CMDS_BASE.map((c, i) => {
      const m = { ...SUB_DEFAULTS, ...c, ...cmds[i] } as typeof c & Required<CmdTweak>
      return { word: c.word, x: m.x, y: m.y, r: m.r, w: m.w, cap: m.cap, subDx: m.subDx, subDy: m.subDy, subR: m.subR, subS: m.subS }
    }),
  }, null, 1)

  const gRow = (k: keyof MenuGlobals, label: string, min: number, max: number, step: number) => (
    <Row label={label} value={g[k] as number} min={min} max={max} step={step} onChange={(v) => knobs.setG({ [k]: v })} />
  )

  return (
    <aside className={styles.knobs} aria-label="Menu knobs">
      <div className={styles.knobTabs}>
        {CMDS_BASE.map((c, i) => (
          <button key={c.word} type="button" aria-pressed={sel === i} onClick={() => setSel(i)}>
            {c.word}{cmds[i] ? "•" : ""}
          </button>
        ))}
      </div>
      <h3>{base.word} · word</h3>
      {WORD.map(([k, l, a, b, s]) => <Row key={k} label={l} value={cur[k]} min={a} max={b} step={s}
        // size keeps the word's proportions (width follows); width alone stretches it
        onChange={(v) => knobs.setCmd(sel, k === "cap" ? { cap: v, w: +(cur.w * v / cur.cap).toFixed(1) } : { [k]: v })} />)}
      <h3>{base.word} · subtitle “{base.sub}”</h3>
      {SUBK.map(([k, l, a, b, s]) => <Row key={k} label={l} value={cur[k]} min={a} max={b} step={s} onChange={(v) => knobs.setCmd(sel, { [k]: v })} />)}
      <button type="button" onClick={() => knobs.resetCmd(sel)}>reset {base.word}</button>
      <h3>all commands</h3>
      {gRow("sub", "subtitle size (× word)", 0.15, 0.9, 0.01)}
      {gRow("rampLo", "letter size, inner end", 0.5, 1.4, 0.01)}
      {gRow("rampHi", "letter size, outer end", 0.6, 2, 0.01)}
      <label className={styles.knobCheck}><input type="checkbox" checked={g.pin} onChange={(e) => knobs.setG({ pin: e.target.checked })} /> keep menu open</label>
      <label className={styles.knobCheck}><input type="checkbox" checked={g.kicks} onChange={(e) => knobs.setG({ kicks: e.target.checked })} /> idle in/out motion</label>
      <div className={styles.knobActions}>
        <button type="button" onClick={async () => {
          try { await navigator.clipboard.writeText(out()); setCopied(true); setTimeout(() => setCopied(false), 1500) } catch { prompt("Copy these values:", out()) }
        }}>{copied ? "copied ✓" : "copy values"}</button>
        <button type="button" onClick={() => { if (confirm("Reset every knob?")) knobs.resetAll() }}>reset all</button>
      </div>
      <p className={styles.knobNote}>Paste the copied values back to Claude to bake them in. Globals default: sub {GLOBAL_DEFAULTS.sub}, letters {GLOBAL_DEFAULTS.rampLo}→{GLOBAL_DEFAULTS.rampHi}.</p>
    </aside>
  )
}
