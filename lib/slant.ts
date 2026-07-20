// Single source of truth for the site's trapezoid/parallelogram slant angle.
// Every slanted shape derives its horizontal offset from this angle so the
// geometry reads as one consistent system (offset = height * tan(SLANT_DEG)).

export const SLANT_DEG = 14
export const SLANT_TAN = Math.tan((SLANT_DEG * Math.PI) / 180) // ~0.249

export const slantOffset = (heightPx: number): number =>
  Math.round(heightPx * SLANT_TAN * 10) / 10

// Shapes driven by a --slant CSS variable (set per element/breakpoint in px),
// so the angle stays constant regardless of the element's width.
export const parallelogramClip =
  "polygon(var(--slant) 0, 100% 0, calc(100% - var(--slant)) 100%, 0 100%)"

export const trapezoidClip =
  "polygon(0 0, 100% 0, calc(100% - var(--slant)) 100%, 0 100%)"
