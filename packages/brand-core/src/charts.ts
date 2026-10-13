/** Round axis steps covering min–max in about `count` ticks, e.g. 0, 500, 1000, 1500. */
export function niceTicks(min: number, max: number, count = 5): number[] {
  const stepOf = (rough: number, corr: number) => {
    const dc = rough === 0 ? 1 : Math.floor(Math.log10(Math.abs(rough))) + 1
    const scale = dc !== 1 ? 0.05 : 0.1
    return (Math.ceil(rough / 10 ** dc / scale) + corr) * scale * 10 ** dc
  }
  const calc = (corr: number): { step: number; lo: number; hi: number } => {
    const step = stepOf((max - min) / (count - 1), corr)
    const middle = min <= 0 && max >= 0 ? 0 : (min + max) / 2 - (((min + max) / 2) % step)
    let below = Math.ceil((middle - min) / step)
    let up = Math.ceil((max - middle) / step)
    const total = below + up + 1
    if (total > count) return calc(corr + 1)
    if (total < count) {
      if (max > 0) up += count - total
      else below += count - total
    }
    return { step, lo: middle - below * step, hi: middle + up * step }
  }
  const { step, lo, hi } = calc(0)
  const out: number[] = []
  for (let v = lo; v <= hi + 0.1 * step + 1e-9; v += step) out.push(Number(v.toFixed(10)))
  return out
}

/** A smooth SVG path through evenly spaced points that never overshoots them (monotone cubic). */
export function monotonePath(pts: { x: number; y: number }[]): string {
  const n = pts.length
  if (n === 0) return ""
  if (n === 1) return `M${pts[0].x},${pts[0].y}`
  const dx = pts[1].x - pts[0].x
  const m: number[] = []
  for (let i = 0; i < n - 1; i++) m.push((pts[i + 1].y - pts[i].y) / dx)
  const t = [m[0]]
  for (let i = 1; i < n - 1; i++) t.push(m[i - 1] * m[i] <= 0 ? 0 : (m[i - 1] + m[i]) / 2)
  t.push(m[n - 2])
  if (n > 2) {
    t[0] = (3 * m[0] - t[1]) / 2
    t[n - 1] = (3 * m[n - 2] - t[n - 2]) / 2
  }
  let d = `M${pts[0].x},${pts[0].y}`
  for (let i = 0; i < n - 1; i++) {
    d += `C${pts[i].x + dx / 3},${pts[i].y + (t[i] * dx) / 3} ${pts[i + 1].x - dx / 3},${pts[i + 1].y - (t[i + 1] * dx) / 3} ${pts[i + 1].x},${pts[i + 1].y}`
  }
  return d
}
