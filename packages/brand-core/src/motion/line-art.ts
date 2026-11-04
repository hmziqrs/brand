/*
 * Line drawings for picture cards: twelve kinds of thin-line pictures in a
 * 320×200 box. The part nearest the cursor lights in oxide; at rest, and for
 * reduced motion, each kind shows its resting picture.
 */

export type LineArtKind = "lanes" | "rings" | "fan" | "bars" | "window" | "surfaces" | "phone" | "webview" | "native" | "edge" | "database" | "terminal"

export const lineArtKinds: LineArtKind[] = ["lanes", "rings", "fan", "bars", "window", "surfaces", "phone", "webview", "native", "edge", "database", "terminal"]

/** One element of a drawing; `attrs` left undefined are absent. */
export type LineArtShape = {
  tag: "rect" | "line" | "circle" | "ellipse" | "path"
  attrs: Record<string, string | number | undefined>
  class?: string
  style?: string
}

/** Where the cursor is across the host (0–1 each way), whether it is over it, and whether motion is reduced. */
export type LineArtState = { x: number; y: number; on: boolean; still: boolean }

const line = "stroke-foreground/45"
const faint = "stroke-foreground/25"
const ease = "transition-[fill,stroke,width,opacity] duration-200 motion-reduce:transition-none"
const eased = (cls: string) => `${ease} ${cls}`

const lanes = [
  { y: 56, marks: [30, 64, 118, 150, 206, 252] },
  { y: 100, marks: [44, 96, 170, 228, 272] },
  { y: 144, marks: [24, 82, 132, 190, 240, 286] },
]
const modules = [148, 120, 156, 96, 132]
const slots = [16, 92, 168, 244]
const routes = [70, 52, 84, 46, 60]
const nodes: [number, number][] = [
  [206, 34],
  [252, 52],
  [290, 84],
  [300, 124],
  [276, 158],
  [230, 172],
  [196, 150],
]
const tiles: [number, number][] = [0, 1, 2, 3, 4, 5].map((i) => [118 + (i % 3) * 54 + 23, 60 + Math.floor(i / 3) * 52 + 21])

const pick = (n: number, v: number) => Math.max(0, Math.min(n - 1, Math.floor(v * n)))

const near = (pts: [number, number][], hx: number, hy: number) => {
  let best = 0
  let d = Infinity
  pts.forEach(([px, py], i) => {
    const e = (px / 320 - hx) ** 2 + (py / 200 - hy) ** 2
    if (e < d) {
      d = e
      best = i
    }
  })
  return best
}

const rect = (attrs: LineArtShape["attrs"], cls?: string): LineArtShape => ({ tag: "rect", attrs, class: cls })
const seg = (attrs: LineArtShape["attrs"], cls?: string): LineArtShape => ({ tag: "line", attrs, class: cls })
const dot = (attrs: LineArtShape["attrs"], cls?: string): LineArtShape => ({ tag: "circle", attrs, class: cls })
const path = (attrs: LineArtShape["attrs"], cls?: string): LineArtShape => ({ tag: "path", attrs, class: cls })

const chrome = (x: number, y: number, w: number, h: number, bar: number, dots: number[]): LineArtShape[] => [
  rect({ x, y, width: w, height: h, rx: 8 }, line),
  seg({ x1: x, x2: x + w, y1: bar, y2: bar }, faint),
  ...dots.map((cx) => dot({ cx, cy: (y + bar) / 2, r: 2.5, stroke: "none" }, "fill-foreground/45")),
]

/** The drawing of `kind` for the cursor state `s`, element by element in paint order. */
export function lineArt(kind: LineArtKind, s: LineArtState): LineArtShape[] {
  const hx = s.still || !s.on ? 0.62 : s.x
  const hy = s.still || !s.on ? 0.4 : s.y
  const tilt = s.on && !s.still ? s.x - 0.5 : 0
  const out: LineArtShape[] = []

  if (kind === "rings") {
    for (let i = 0; i < 6; i++) {
      const cx = 70 + i * 36
      const lit = Math.abs(hx * 6 - i - 0.5) < 0.8
      out.push({ tag: "ellipse", attrs: { cx, cy: 100, rx: 22, ry: 62 }, class: eased(lit ? "stroke-primary" : "stroke-foreground/50"), style: `transform: rotate(${tilt * 40}deg); transform-origin: ${cx}px 100px;` })
    }
    out.push(seg({ x1: 20, x2: 300, y1: 100, y2: 100 }, "stroke-foreground/30"))
  } else if (kind === "bars") {
    for (let i = 0; i < 48; i++) {
      const d = Math.abs(i / 47 - hx)
      const k = (i * 29) % 7
      out.push(rect({ x: 16 + i * 6, y: 40 + k * 3, width: 1.2, height: 120 - k * 6, stroke: "none", opacity: s.on ? Math.max(0.25, 1 - d * 3) : 0.3 + ((i * 37) % 10) / 14 }, d < 0.06 ? "fill-primary" : "fill-foreground/45"))
    }
  } else if (kind === "fan") {
    for (let i = 0; i < 12; i++) {
      const y2 = Math.max(30, Math.min(170, 30 + i * 12 + (s.on && !s.still ? (s.y - 0.5) * 40 : 0)))
      out.push(seg({ x1: 30, y1: 170, x2: 290, y2 }, eased(i === Math.round(hx * 11) ? "stroke-primary" : line)))
    }
    out.push(rect({ x: 30, y: 30, width: 260, height: 140 }, faint))
    out.push(dot({ cx: 30, cy: 170, r: 3.5, stroke: "none" }, "fill-primary"))
  } else if (kind === "window" || kind === "native") {
    out.push(...chrome(40, 26, 240, 148, 44, [52, 62, 72]))
    out.push(seg({ x1: 104, x2: 104, y1: 44, y2: 174 }, faint))
    const row = pick(5, hy)
    for (let i = 0; i < 5; i++) {
      out.push(rect({ x: 52, y: 58 + i * 22, width: i === 0 ? 40 : 32, height: 7, rx: 2, stroke: "none" }, kind === "window" && i === row ? "fill-primary" : "fill-foreground/30"))
    }
    if (kind === "window") {
      modules.forEach((w, i) => {
        const lit = i === row
        out.push(rect({ x: 118, y: 55 + i * 22, width: w, height: 13, rx: 3 }, eased(lit ? "fill-primary stroke-primary" : "fill-transparent stroke-foreground/45")))
        out.push(seg({ x1: 118 + w + 10, x2: 118 + w + 16, y1: 58 + i * 22, y2: 65 + i * 22 }, eased(lit ? "stroke-primary" : "stroke-transparent")))
        out.push(seg({ x1: 118 + w + 16, x2: 118 + w + 10, y1: 58 + i * 22, y2: 65 + i * 22 }, eased(lit ? "stroke-primary" : "stroke-transparent")))
      })
    } else {
      const lit = near(tiles, hx, hy)
      tiles.forEach(([cx, cy], i) => out.push(rect({ x: cx - 23, y: cy - 21, width: 46, height: 42, rx: 4 }, eased(i === lit ? "fill-primary stroke-primary" : "stroke-foreground/45"))))
    }
  } else if (kind === "surfaces") {
    const lit = pick(4, hx)
    out.push(seg({ x1: 16, x2: 304, y1: 150, y2: 150 }, faint))
    slots.forEach((sx, i) => {
      const c = eased(i === lit ? "stroke-primary" : line)
      if (i === 0) {
        out.push(rect({ x: sx + 14, y: 52, width: 32, height: 70, rx: 6 }, c))
        out.push(seg({ x1: sx + 24, x2: sx + 36, y1: 116, y2: 116 }, c))
      } else if (i === 1) {
        out.push(rect({ x: sx, y: 58, width: 60, height: 42, rx: 3 }, c))
        out.push(seg({ x1: sx + 30, x2: sx + 30, y1: 100, y2: 112 }, c))
        out.push(seg({ x1: sx + 18, x2: sx + 42, y1: 112, y2: 112 }, c))
      } else if (i === 2) {
        out.push(rect({ x: sx, y: 56, width: 60, height: 58, rx: 4 }, c))
        out.push(seg({ x1: sx, x2: sx + 60, y1: 68, y2: 68 }, c))
        out.push(rect({ x: sx + 16, y: 60, width: 28, height: 4, rx: 2 }, c))
      } else {
        out.push(rect({ x: sx, y: 56, width: 60, height: 58, rx: 4 }, c))
        out.push(path({ d: `M${sx + 10} 76 l8 6 l-8 6` }, c))
        out.push(seg({ x1: sx + 22, x2: sx + 34, y1: 90, y2: 90 }, c))
      }
      out.push(rect({ x: sx + 26, y: 146, width: 8, height: 8, rx: 1, stroke: "none" }, eased(i === lit ? "fill-primary" : "fill-foreground/30")))
    })
  } else if (kind === "phone") {
    const lit = pick(5, hy)
    out.push(rect({ x: 122, y: 18, width: 76, height: 164, rx: 14 }, line))
    out.push(seg({ x1: 148, x2: 172, y1: 28, y2: 28 }, line))
    for (let i = 0; i < 4; i++) out.push(rect({ x: 134 + i * 5, y: 46 - i * 2, width: 3, height: 4 + i * 2, rx: 0.5, stroke: "none" }, "fill-foreground/25"))
    out.push(seg({ x1: 132, x2: 156, y1: 50, y2: 38 }, "stroke-primary"))
    for (let i = 0; i < 5; i++) {
      out.push(rect({ x: 134, y: 60 + i * 22, width: 52, height: 14, rx: 3 }, eased(i === lit ? "fill-primary stroke-primary" : "stroke-foreground/45")))
      out.push(dot({ cx: 178, cy: 67 + i * 22, r: 2, stroke: "none" }, i === lit ? "fill-primary-foreground" : "fill-foreground/35"))
    }
    out.push(path({ d: "M216 72 h40 M216 72 l6 -5 M216 72 l6 5", "stroke-dasharray": "3 4" }, faint))
    out.push(rect({ x: 262, y: 60, width: 34, height: 24, rx: 5, "stroke-dasharray": "3 4" }, faint))
  } else if (kind === "webview") {
    const lit = pick(3, hx)
    out.push(...chrome(34, 22, 252, 156, 40, [46, 56, 66]))
    out.push(rect({ x: 50, y: 52, width: 220, height: 112, rx: 4, "stroke-dasharray": "4 4" }, line))
    out.push(seg({ x1: 62, x2: 258, y1: 68, y2: 68 }, faint))
    for (let i = 0; i < 3; i++) out.push(rect({ x: 62 + i * 68, y: 80, width: 60, height: 70, rx: 4 }, eased(i === lit ? "fill-primary stroke-primary" : "stroke-foreground/45")))
  } else if (kind === "edge") {
    const lit = near(nodes, hx, hy)
    out.push(rect({ x: 20, y: 62, width: 128, height: 86, rx: 6 }, line))
    out.push(seg({ x1: 20, x2: 148, y1: 76, y2: 76 }, faint))
    out.push(rect({ x: 58, y: 66, width: 52, height: 5, rx: 2.5 }, faint))
    out.push(rect({ x: 34, y: 88, width: 62, height: 8, rx: 2, stroke: "none" }, "fill-foreground/35"))
    out.push(rect({ x: 34, y: 104, width: 100, height: 5, rx: 2, stroke: "none" }, "fill-foreground/25"))
    out.push(rect({ x: 34, y: 116, width: 84, height: 5, rx: 2, stroke: "none" }, "fill-foreground/25"))
    nodes.forEach(([cx, cy], i) => {
      out.push(seg({ x1: 148, y1: 105, x2: cx, y2: cy, "stroke-dasharray": i === lit ? undefined : "3 4" }, eased(i === lit ? "stroke-primary" : faint)))
      out.push(dot({ cx, cy, r: i === lit ? 6 : 4 }, eased(i === lit ? "fill-primary stroke-primary" : "fill-background stroke-foreground/45")))
    })
  } else if (kind === "database") {
    const lit = pick(5, hy)
    routes.forEach((w, i) => {
      const ry = 44 + i * 28
      out.push(rect({ x: 24, y: ry - 7, width: 30, height: 14, rx: 3 }, eased(i === lit ? "fill-primary stroke-primary" : "stroke-foreground/45")))
      out.push(seg({ x1: 62, x2: 62 + w, y1: ry, y2: ry }, eased(i === lit ? "stroke-foreground" : line)))
      out.push(path({ d: `M${62 + w + 8} ${ry} C 190 ${ry} 180 100 206 100` }, eased(i === lit ? "stroke-primary" : faint)))
    })
    out.push({ tag: "ellipse", attrs: { cx: 248, cy: 52, rx: 42, ry: 12 }, class: line })
    out.push(path({ d: "M206 52 V148 A42 12 0 0 0 290 148 V52" }, line))
    out.push(path({ d: "M206 84 A42 12 0 0 0 290 84 M206 116 A42 12 0 0 0 290 116" }, faint))
  } else if (kind === "terminal") {
    const lit = pick(4, hy)
    out.push(...chrome(40, 26, 240, 148, 44, [52, 62, 72]))
    ;[118, 84, 140, 66].forEach((w, i) => {
      const ly = 62 + i * 24
      out.push(path({ d: `M56 ${ly - 5} l6 5 l-6 5` }, eased(i === lit ? "stroke-primary" : line)))
      out.push(rect({ x: 70, y: ly - 3, width: w, height: 6, rx: 2, stroke: "none" }, eased(i === lit ? "fill-foreground" : "fill-foreground/35")))
    })
    out.push(rect({ x: 70, y: 150, width: 8, height: 12, stroke: "none" }, "fill-primary motion-safe:animate-pulse"))
  } else {
    lanes.forEach((l, li) => {
      out.push(seg({ x1: 20, x2: 300, y1: l.y, y2: l.y }, "stroke-foreground/25"))
      for (const mx of l.marks) {
        const hot = Math.abs(mx / 320 - hx) < 0.08
        out.push(rect({ x: mx, y: l.y - 5, width: hot ? 26 : 9, height: 10, rx: 2, stroke: "none" }, eased(hot ? "fill-primary" : li === 1 ? "fill-foreground/35" : "fill-foreground/60")))
      }
    })
    out.push(seg({ x1: 20 + hx * 280, x2: 20 + hx * 280, y1: 34, y2: 166 }, "stroke-foreground/50"))
  }
  return out
}

/** The element a drawing follows: the nearest [data-line-art-host], else the drawing's parent. */
export const lineArtHost = (el: Element) => (el.closest("[data-line-art-host]") as HTMLElement | null) ?? el.parentElement!

/** Reports the cursor over `el`'s host as 0–1 across and down, and when it leaves. Returns the cleanup. */
export function followLineArt(el: Element, onChange: (x: number, y: number, on: boolean) => void) {
  const host = lineArtHost(el)
  let x = 0.5
  let y = 0.5
  const move = (e: PointerEvent) => {
    const r = host.getBoundingClientRect()
    x = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width))
    y = Math.max(0, Math.min(1, (e.clientY - r.top) / r.height))
    onChange(x, y, true)
  }
  const leave = () => onChange(x, y, false)
  host.addEventListener("pointermove", move)
  host.addEventListener("pointerleave", leave)
  return () => {
    host.removeEventListener("pointermove", move)
    host.removeEventListener("pointerleave", leave)
  }
}
