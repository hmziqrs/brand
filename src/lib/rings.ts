/*
 * The rings are drawn from a name, so the same name always gets the same
 * rings and every site, project or post gets its own. Plain functions with
 * no imports, so pages built with anything can copy them as they are.
 */

/** FNV-1a: a stable number from a string. */
export function hash(text: string) {
  let h = 2166136261
  for (const c of text) {
    h ^= c.charCodeAt(0)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/** mulberry32: a small seeded random number generator, 0 to 1. */
export function rng(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export type Arc = {
  r: number
  /** stroke-dasharray: the drawn part, then the gap. */
  dash: string
  /** Degrees to turn the circle, so the gaps don't line up. */
  rotate: number
  accent: boolean
  /** Where the accent ring's arc ends: its dot goes here. */
  end?: [number, number]
}

const f2 = (n: number) => n.toFixed(2)

/**
 * Circles around (cx, cy), each with one gap. The ring at `accent` gets a
 * longer gap and a dot where it ends. Draws from `random` in a fixed order,
 * so the same seed always gives the same picture.
 */
export function arcs(
  random: () => number,
  { cx, cy, radii, accent, accentGap, gap: [min, range] }: {
    cx: number
    cy: number
    radii: number[]
    accent: number
    accentGap: number
    gap: [min: number, range: number]
  },
): Arc[] {
  return radii.map((r, i) => {
    const c = 2 * Math.PI * r
    const isAccent = i === accent
    const gap = c * (isAccent ? accentGap : min + random() * range)
    const rotate = random() * 360
    const arc: Arc = { r, dash: `${f2(c - gap)} ${f2(gap)}`, rotate: Number(f2(rotate)), accent: isAccent }
    if (isAccent) {
      const a = (rotate * Math.PI) / 180 + (c - gap) / r
      arc.end = [Number(f2(cx + r * Math.cos(a))), Number(f2(cy + r * Math.sin(a)))]
    }
    return arc
  })
}
