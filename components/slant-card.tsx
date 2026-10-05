"use client"

import { useEffect, useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react"
import styles from "./slant-card.module.css"

// The case studies' parallelogram card: a white card whose left edge leans in at the top and
// whose right edge leans in at the bottom (8% of its width), over a thin outline frame offset
// behind it. The text follows the slant: two floats shaped like the empty corner triangles
// keep every line inside the card, and the block sits centred vertically. The card is as tall
// as its text plus the padding, at any width, so nothing is ever clipped.
//
// In a row (a grid with the default align-items: stretch), the row takes the tallest card's
// height and every card fills its cell, re-centring its text, so pairs and triples match.
//
//   <SlantCard>                     frame shifted 30px right, 40px down
//   <SlantCard offset={[35, 45]}>   frame shifted 35px, 45px
//
// `children` is the card's copy, with its own type classes (e.g. text-base md:text-lg,
// leading-relaxed, text-center). Leave out the old inset hacks (ml-16, max-w-[430px], w-135):
// the card sets the insets. `offset` is the frame's [x, y] shift in px (halved on phones).
export interface SlantCardProps {
  children: ReactNode
  offset?: [number, number]
  className?: string
}

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect

export function SlantCard({ children, offset = [30, 40], className = "" }: SlantCardProps) {
  const card = useRef<HTMLDivElement>(null)
  const body = useRef<HTMLDivElement>(null)
  const left = useRef<HTMLDivElement>(null)
  const right = useRef<HTMLDivElement>(null)
  const text = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    const el = card.current, b = body.current, l = left.current, r = right.current, t = text.current
    if (!el || !b || !l || !r || !t) return
    const px = (value: string) => parseFloat(value) || 0

    // Floats can't stretch to an auto-height parent, and the line widths depend on the card's
    // height (the slant's slope) and on where the block starts. So solve it: give the floats a
    // height, measure the text, grow if it needs it, centre the block, and repeat until the
    // numbers settle (two or three passes in practice).
    let last = { width: -1, text: -1, card: -1 }
    const layout = () => {
      el.dataset.ready = "" // drops the no-script insets (the floats take over)
      const padY = px(getComputedStyle(t).getPropertyValue("--pad-y"))
      // Used heights (border-box under the global reset), so ancestor transforms can't skew them.
      const measure = (top: number) => px(getComputedStyle(t).height) - top
      const apply = (h: number, top: number) => {
        l.style.height = r.style.height = `${h}px`
        t.style.paddingTop = `${top}px`
      }
      const settle = (start: number, grow: boolean) => {
        let h = start
        let top = padY
        for (let pass = 0; pass < 8; pass++) {
          apply(h, top)
          const textH = measure(top)
          const needH = grow ? Math.max(start, Math.ceil(textH + 2 * padY)) : h
          const nextH = pass < 4 ? needH : Math.max(h, needH) // later passes only grow, so a line that keeps re-wrapping can't ping-pong
          const nextTop = (nextH - textH) / 2
          if (Math.abs(nextH - h) < 1 && Math.abs(nextTop - top) < 1) break
          h = nextH
          top = nextTop
        }
        apply(h, top)
        // Belt and braces: if a last re-wrap made the block taller, grow rather than clip.
        const textH = measure(top)
        if (top + textH + padY > h) apply((h = Math.ceil(top + textH + padY)), top)
        return h
      }

      // 1. The card's own height: the copy plus --pad-y above and below. The body holds that
      //    height; the floats don't, so they never prop a grid row open.
      const natural = settle(0, true)
      b.style.height = `${natural}px`
      // 2. A grid row stretches the card to its tallest neighbour: re-centre in that height.
      const actual = px(getComputedStyle(el).height)
      if (actual > natural + 0.5) settle(actual, false)
      last = { width: t.clientWidth, text: measure(px(t.style.paddingTop)), card: actual }
    }
    layout()

    // Re-solve when the width, the copy's height or the card's height changes (resizes, web
    // fonts arriving, a neighbour growing). The text's content box ignores the padding set
    // here, and the work waits a frame so these changes never feed back into the same pass.
    let frame = 0
    const observer = new ResizeObserver(() => {
      const { width, text: textH, card: cardH } = last
      const textBox = t.clientWidth
      const nowText = px(getComputedStyle(t).height) - px(t.style.paddingTop)
      const nowCard = px(getComputedStyle(el).height)
      if (Math.abs(textBox - width) < 0.5 && Math.abs(nowText - textH) < 0.5 && Math.abs(nowCard - cardH) < 0.5) return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(layout)
    })
    observer.observe(t)
    observer.observe(el)
    return () => { cancelAnimationFrame(frame); observer.disconnect() }
  }, [])

  const style = { "--dx": `${offset[0]}px`, "--dy": `${offset[1]}px` } as CSSProperties
  return (
    <div ref={card} data-slant-card="" className={`${styles.card} ${className}`} style={style}>
      <svg className={styles.frame} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <polygon points="8,0 100,0 92,100 0,100" fill="none" stroke="white" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className={styles.fill} aria-hidden="true" />
      <div ref={body} className={styles.body}>
        <div ref={left} className={styles.edgeLeft} aria-hidden="true" />
        <div ref={right} className={styles.edgeRight} aria-hidden="true" />
        <div ref={text} data-slant-text="" className={styles.text}>{children}</div>
      </div>
    </div>
  )
}
