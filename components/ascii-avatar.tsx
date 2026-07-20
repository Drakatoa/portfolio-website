"use client"

import { useEffect, useRef } from "react"

// ASCII avatar for the hero. Samples a source image into a character grid and
// renders it statically, with occasional glitch bands as the only motion.
// Designed so the source can later be swapped for a three.js/VRM render target
// without changing this component's API.
const RAMP = " .:-=+*#%@"
const COLS = 96

interface AsciiAvatarProps {
  src?: string
  className?: string
}

export function AsciiAvatar({ src = "/ascii-art.png", className = "" }: AsciiAvatarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf = 0
    let disposed = false
    let visible = true
    let luma: Float32Array | null = null
    let gw = 0
    let gh = 0
    let glitchUntil = 0
    let glitchRow = 0
    let glitchH = 0
    let nextGlitch = performance.now() + 4000 + Math.random() * 8000

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const img = new window.Image()
    img.src = src
    img.onload = () => {
      if (disposed) return
      const aspect = img.height / img.width
      gw = COLS
      // character cells are roughly twice as tall as wide
      gh = Math.max(1, Math.round((COLS * aspect) / 2))
      const off = document.createElement("canvas")
      off.width = gw
      off.height = gh
      const octx = off.getContext("2d")
      if (!octx) return
      octx.drawImage(img, 0, 0, gw, gh)
      const data = octx.getImageData(0, 0, gw, gh).data
      luma = new Float32Array(gw * gh)
      for (let i = 0; i < gw * gh; i++) {
        const r = data[i * 4]
        const g = data[i * 4 + 1]
        const b = data[i * 4 + 2]
        const a = data[i * 4 + 3]
        luma[i] = ((0.2126 * r + 0.7152 * g + 0.0722 * b) / 255) * (a / 255)
      }
      raf = requestAnimationFrame(draw)
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    io.observe(canvas)

    function draw(now: number) {
      if (disposed) return
      raf = requestAnimationFrame(draw)
      if (!visible || document.hidden || !luma || !ctx || !canvas) return

      if (!reduced && now > nextGlitch) {
        glitchUntil = now + 120 + Math.random() * 120
        glitchRow = Math.floor(Math.random() * gh)
        glitchH = 1 + Math.floor(Math.random() * 3)
        nextGlitch = now + 5000 + Math.random() * 10000
      }
      const glitching = !reduced && now < glitchUntil

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      if (w === 0 || h === 0) return
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr)
        canvas.height = Math.round(h * dpr)
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.fillStyle = "#000"
      ctx.fillRect(0, 0, w, h)

      // object-contain sizing: 1x2 cell units, centered
      const s = Math.min(w / gw, h / (2 * gh))
      const cellW = s
      const cellH = 2 * s
      const ox = (w - gw * cellW) / 2
      const oy = (h - gh * cellH) / 2

      ctx.font = `${Math.ceil(cellH)}px "Courier New", monospace`
      ctx.textBaseline = "top"

      for (let y = 0; y < gh; y++) {
        const rowGlitch = glitching && y >= glitchRow && y < glitchRow + glitchH
        for (let x = 0; x < gw; x++) {
          let v = luma[y * gw + x]
          if (v < 0.04) continue
          let ch: string
          if (rowGlitch) {
            ch = RAMP[1 + Math.floor(Math.random() * (RAMP.length - 1))]
            v = Math.min(1, v + 0.3)
          } else {
            ch = RAMP[Math.min(RAMP.length - 1, Math.floor(v * RAMP.length))]
          }
          const alpha = 0.35 + 0.65 * Math.min(1, v)
          ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`
          ctx.fillText(ch, ox + x * cellW, oy + y * cellH)
        }
      }

      // reduced motion: paint a single static frame and stop
      if (reduced) cancelAnimationFrame(raf)
    }

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [src])

  return <canvas ref={canvasRef} className={className} role="img" aria-label="ASCII art avatar" />
}
