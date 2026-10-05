"use client"

// Live tuning for the battle menu (review only, /hero-mock?knobs).
// Overrides per command plus a few globals; remembered in this browser.
import { useSyncExternalStore } from "react"

export type CmdTweak = Partial<{
  x: number; y: number; r: number; w: number; cap: number // word: anchor, angle, width, cap height
  subDx: number; subDy: number; subR: number; subS: number // subtitle: offset along/across the word, extra angle, size multiplier
}>
export type MenuGlobals = { sub: number; rampLo: number; rampHi: number; pin: boolean; kicks: boolean }
export type KnobState = { cmds: Record<number, CmdTweak>; g: MenuGlobals }

export const GLOBAL_DEFAULTS: MenuGlobals = { sub: 0.42, rampLo: 0.84, rampHi: 1.28, pin: true, kicks: true }
const KEY = "p5-menu-knobs"
const EMPTY: KnobState = { cmds: {}, g: GLOBAL_DEFAULTS }

let state: KnobState = EMPTY
let loaded = false
const subs = new Set<() => void>()

function load() {
  if (loaded) return
  loaded = true
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) { const v = JSON.parse(raw); state = { cmds: v.cmds ?? {}, g: { ...GLOBAL_DEFAULTS, ...v.g } } }
  } catch {}
}

function set(next: KnobState) {
  state = next
  try { localStorage.setItem(KEY, JSON.stringify(state)) } catch {}
  subs.forEach((f) => f())
}

export const knobs = {
  get: () => { load(); return state },
  setCmd: (i: number, t: CmdTweak) => set({ ...state, cmds: { ...state.cmds, [i]: { ...state.cmds[i], ...t } } }),
  setG: (g: Partial<MenuGlobals>) => set({ ...state, g: { ...state.g, ...g } }),
  resetCmd: (i: number) => { const c = { ...state.cmds }; delete c[i]; set({ ...state, cmds: c }) },
  resetAll: () => set({ cmds: {}, g: GLOBAL_DEFAULTS }),
}

/** Knob overrides; `enabled` false returns the defaults (the live page ignores stored tweaks). */
export function useKnobs(enabled: boolean): KnobState {
  const s = useSyncExternalStore(
    (f) => { subs.add(f); return () => subs.delete(f) },
    knobs.get,
    () => EMPTY,
  )
  return enabled ? s : EMPTY
}
