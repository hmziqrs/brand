import { hash, rng } from "./rings.ts"

const f2 = (n: number) => Number(n.toFixed(2))

export type HorizonArc = {
  r: number
  segments: string[]
  accent: boolean
  end?: [number, number]
}

/** Half rings rising from a horizon at (cx, cy), each broken into a few arcs. The ring
 * at `accent` is one long arc with a dot where it ends: the sun's path. */
export function horizonArcs(seed: string, { cx, cy, radii, accent }: { cx: number; cy: number; radii: number[]; accent: number }): HorizonArc[] {
  const random = rng(hash(seed) + 61)
  const point = (r: number, a: number): [number, number] => [f2(cx + r * Math.cos(a)), f2(cy + r * Math.sin(a))]
  const arc = (r: number, a0: number, a1: number) => {
    const [x0, y0] = point(r, a0)
    const [x1, y1] = point(r, a1)
    return `M${x0} ${y0}A${f2(r)} ${f2(r)} 0 0 1 ${x1} ${y1}`
  }
  return radii.map((r, i) => {
    if (i === accent) {
      const to = Math.PI * (1.42 + random() * 0.34)
      return { r, segments: [arc(r, Math.PI, to)], accent: true, end: point(r, to) }
    }
    const segments: string[] = []
    const gap = () => Math.min(0.5, (10 + random() * 26) / r)
    let a = Math.PI + random() * 0.06
    while (a < 2 * Math.PI - 0.05) {
      const span = 0.35 + random() * 1.4
      const b = Math.min(2 * Math.PI, a + span)
      segments.push(arc(r, a, b))
      a = b + gap()
    }
    return { r, segments, accent: false }
  })
}
