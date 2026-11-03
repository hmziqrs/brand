/*
 * The ring field: two sets of thin rings off the edges and a few stars, in a
 * 100×100 box the picture covers. Moving the pointer anywhere on the page
 * drifts the stars one way and the rings the other, each set at its own
 * depth. Nothing moves for reduced motion.
 */

export type RingSet = { cx: number; cy: number; radii: number[]; depth: number }
export type RingStar = { x: number; y: number; r: number }

export const ringFieldSets: RingSet[] = [
  { cx: 104, cy: 18, radii: [14, 20, 26, 32, 38], depth: 1 },
  { cx: -6, cy: 92, radii: [10, 16, 22, 28], depth: 1.6 },
]

export const ringFieldStars: RingStar[] = Array.from({ length: 26 }, (_, i) => {
  const a = Math.sin(i * 12.9898) * 43758.5453
  const b = Math.sin(i * 78.233) * 12345.678
  return { x: (a - Math.floor(a)) * 100, y: (b - Math.floor(b)) * 100, r: 0.12 + ((((a * 7) % 1) + 1) % 1) * 0.16 }
})

/** The accent ring: the first set's third ring. */
export const isAccentRing = (set: number, ring: number) => set === 0 && ring === 2

/** Where a star sits for a pointer offset (mx, my), each −1…1. */
export const starAt = (star: RingStar, mx: number, my: number) => ({ cx: star.x + mx * 0.4, cy: star.y + my * 0.4 })

/** A ring set's translate for a pointer offset, as an SVG transform. */
export const setTransform = (set: RingSet, mx: number, my: number) => `translate(${(-mx * set.depth * 1.2).toFixed(2)} ${(-my * set.depth * 1.2).toFixed(2)})`

/** Eases a pointer offset (−1…1 across `host`) after the pointer and hands each step to `onFrame`. Returns the cleanup. */
export function driftRingField(host: Element, onFrame: (mx: number, my: number) => void) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {}
  let raf = 0
  let tx = 0
  let ty = 0
  let mx = 0
  let my = 0
  const loop = () => {
    mx += (tx - mx) * 0.05
    my += (ty - my) * 0.05
    onFrame(mx, my)
    raf = Math.abs(tx - mx) + Math.abs(ty - my) > 0.0005 ? requestAnimationFrame(loop) : 0
  }
  const on = (e: PointerEvent) => {
    const r = host.getBoundingClientRect()
    tx = ((e.clientX - r.left) / r.width - 0.5) * 2
    ty = ((e.clientY - r.top) / r.height - 0.5) * 2
    if (!raf) raf = requestAnimationFrame(loop)
  }
  addEventListener("pointermove", on, { passive: true })
  return () => {
    removeEventListener("pointermove", on)
    cancelAnimationFrame(raf)
  }
}
