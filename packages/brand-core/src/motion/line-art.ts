/*
 * Line drawings for picture cards: twenty kinds of thin-line pictures in a
 * 320×200 box, eight of them the post drawings a blog puts on its cards and
 * covers. The part nearest the cursor lights in oxide; at rest, and for
 * reduced motion, each kind shows its resting picture.
 */

/** The post drawings: a laptop, a request client, modules, a plan beside its code, a queue, tools, a media pipeline and endpoints. */
export type PostArtKind = "laptop" | "request" | "modules" | "plan" | "queue" | "tools" | "pipeline" | "endpoints"

export type LineArtKind = "lanes" | "rings" | "fan" | "bars" | "window" | "surfaces" | "phone" | "webview" | "native" | "edge" | "database" | "terminal" | PostArtKind

export const postArtKinds: PostArtKind[] = ["laptop", "request", "modules", "plan", "queue", "tools", "pipeline", "endpoints"]

export const lineArtKinds: LineArtKind[] = ["lanes", "rings", "fan", "bars", "window", "surfaces", "phone", "webview", "native", "edge", "database", "terminal", ...postArtKinds]

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

const fade = "transition-[fill,stroke,opacity] duration-200 motion-reduce:transition-none"
const faded = (cls: string) => `${fade} ${cls}`
const hot = (lit: boolean) => faded(lit ? "stroke-primary" : line)
const shown = (on: boolean) => (on ? undefined : "none")

const editor = [64, 112, 96, 128, 80, 118, 56]
const sidebar = [26, 20, 28, 16, 24]
const json = [
  { x: 0, w: 6 },
  { x: 10, w: 58 },
  { x: 10, w: 84 },
  { x: 20, w: 46 },
  { x: 20, w: 70 },
  { x: 10, w: 40 },
  { x: 0, w: 6 },
]
const moduleTiles: [number, number][] = [0, 1, 2, 3, 4, 5].map((i) => [88 + (i % 3) * 72, 87 + Math.floor(i / 3) * 62])
const plan = [62, 48, 70, 54]
const planCode = [60, 44, 52]
const batches = [86, 134, 182, 230]
const toolTiles: [number, number][] = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => [61 + (i % 4) * 66, 65 + Math.floor(i / 4) * 68])
const endpoints = [36, 52, 44, 60]
const docLines = [62, 54, 66, 40, 58, 50, 30]

function postArt(kind: PostArtKind, hx: number, hy: number, s: LineArtState): LineArtShape[] {
  const out: LineArtShape[] = []
  if (kind === "laptop") {
    const lit = pick(editor.length, (hy - 0.18) / 0.5)
    const ship = hx > 0.8
    out.push(seg({ x1: 18, x2: 302, y1: 174, y2: 174 }, faint))
    out.push(rect({ x: 70, y: 24, width: 180, height: 120, rx: 7 }, line))
    out.push(seg({ x1: 70, x2: 250, y1: 40, y2: 40 }, faint))
    for (const cx of [82, 91, 100]) out.push(dot({ cx, cy: 32, r: 2.2, stroke: "none" }, "fill-foreground/45"))
    editor.forEach((w, i) => {
      const ry = 52 + i * 12.5
      out.push(rect({ x: 82, y: ry, width: 6, height: 4, rx: 1, stroke: "none" }, "fill-foreground/25"))
      out.push(rect({ x: 96, y: i === 0 ? ry - 1 : ry, width: w, height: i === 0 ? 6 : 4, rx: 2, stroke: "none" }, faded(i === lit ? "fill-primary" : i === 0 ? "fill-foreground/60" : "fill-foreground/35")))
      out.push(rect({ x: 96 + w + 4, y: ry - 3, width: 2, height: 10, stroke: "none", display: shown(i === lit) }, "fill-primary motion-safe:animate-pulse"))
    })
    out.push(path({ d: "M56 146 H264 L280 162 H40 Z" }, line))
    out.push(seg({ x1: 146, x2: 174, y1: 154, y2: 154 }, faint))
    out.push(path({ d: "M250 78 C 270 78 284 72 286 60", "stroke-dasharray": "3 4" }, faded(ship ? "stroke-primary" : faint)))
    out.push(path({ d: "M274 58 H300 A8 8 0 0 0 299 42 A11 11 0 0 0 278 39 A9 9 0 0 0 274 58 Z" }, hot(ship)))
  } else if (kind === "request") {
    const lit = pick(5, (hy - 0.2) / 0.62)
    out.push(rect({ x: 30, y: 22, width: 260, height: 156, rx: 8 }, line))
    out.push(seg({ x1: 30, x2: 290, y1: 40, y2: 40 }, faint))
    for (const cx of [42, 51, 60]) out.push(dot({ cx, cy: 31, r: 2.2, stroke: "none" }, "fill-foreground/45"))
    out.push(seg({ x1: 104, x2: 104, y1: 40, y2: 178 }, faint))
    sidebar.forEach((w, i) => {
      const iy = 54 + i * 24
      out.push(rect({ x: 40, y: iy, width: 22, height: 10, rx: 3 }, faded(i === lit ? "fill-primary stroke-primary" : line)))
      out.push(rect({ x: 68, y: iy + 3, width: w, height: 4, rx: 2, stroke: "none" }, faded(i === lit ? "fill-foreground" : "fill-foreground/35")))
    })
    out.push(rect({ x: 116, y: 52, width: 162, height: 18, rx: 4 }, line))
    out.push(rect({ x: 121, y: 56, width: 22, height: 10, rx: 2.5, stroke: "none" }, "fill-primary"))
    out.push(rect({ x: 149, y: 59, width: 64 + lit * 14, height: 4, rx: 2, stroke: "none" }, faded("fill-foreground/45")))
    json.forEach((j, i) => {
      const edge = i === 0 || i === json.length - 1
      const w = edge ? j.w : Math.round(j.w * (0.6 + ((lit * 7 + i * 3) % 5) / 9))
      out.push(rect({ x: 122 + j.x, y: 84 + i * 13, width: w, height: 4, rx: 2, stroke: "none" }, faded(edge ? "fill-primary" : i % 2 ? "fill-foreground/50" : "fill-foreground/30")))
    })
  } else if (kind === "modules") {
    const lit = near(moduleTiles, hx, hy)
    out.push(rect({ x: 40, y: 24, width: 240, height: 152, rx: 8 }, line))
    out.push(seg({ x1: 40, x2: 280, y1: 44, y2: 44 }, faint))
    out.push(rect({ x: 52, y: 31, width: 40, height: 6, rx: 3, stroke: "none" }, "fill-foreground/45"))
    out.push(rect({ x: 234, y: 29, width: 34, height: 10, rx: 5 }, faint))
    moduleTiles.forEach(([cx, cy], i) => {
      const c = hot(i === lit)
      out.push(rect({ x: cx - 32, y: cy - 26, width: 64, height: 52, rx: 6 }, c))
      if (i === 0) {
        out.push(rect({ x: cx - 8, y: cy - 2, width: 16, height: 12, rx: 2 }, c))
        out.push(path({ d: `M${cx - 5} ${cy - 2} v-4 a5 5 0 0 1 10 0 v4` }, c))
      } else if (i === 1) {
        out.push(rect({ x: cx - 12, y: cy - 8, width: 24, height: 16, rx: 3 }, c))
        out.push(seg({ x1: cx - 12, x2: cx + 12, y1: cy - 3, y2: cy - 3 }, c))
      } else if (i === 2) {
        out.push(rect({ x: cx - 12, y: cy - 8, width: 24, height: 16, rx: 2 }, c))
        out.push(path({ d: `M${cx - 12} ${cy - 8} l12 9 l12 -9` }, c))
      } else if (i === 3) {
        for (const dy of [-9, -2, 5]) out.push(rect({ x: cx - 12, y: cy + dy, width: 24, height: 5, rx: 2 }, c))
      } else if (i === 4) {
        out.push(path({ d: `M${cx - 12} ${cy + 9} V${cy + 3} M${cx - 4} ${cy + 9} V${cy - 3} M${cx + 4} ${cy + 9} V${cy - 7} M${cx + 12} ${cy + 9} V${cy - 1}` }, c))
      } else {
        out.push(seg({ x1: cx - 12, x2: cx + 12, y1: cy - 4, y2: cy - 4 }, c))
        out.push(seg({ x1: cx - 12, x2: cx + 12, y1: cy + 5, y2: cy + 5 }, c))
        out.push(rect({ x: cx - 6, y: cy - 8, width: 4, height: 8, rx: 1 }, `${c} fill-background`))
        out.push(rect({ x: cx + 4, y: cy + 1, width: 4, height: 8, rx: 1 }, `${c} fill-background`))
      }
    })
  } else if (kind === "plan") {
    const lit = pick(4, (hy - 0.22) / 0.56)
    out.push(rect({ x: 24, y: 28, width: 116, height: 144, rx: 6 }, line))
    out.push(seg({ x1: 24, x2: 140, y1: 46, y2: 46 }, faint))
    out.push(rect({ x: 36, y: 34, width: 40, height: 5, rx: 2.5, stroke: "none" }, "fill-foreground/45"))
    out.push(rect({ x: 180, y: 28, width: 116, height: 144, rx: 6 }, line))
    out.push(seg({ x1: 180, x2: 296, y1: 46, y2: 46 }, faint))
    for (const cx of [192, 201, 210]) out.push(dot({ cx, cy: 37, r: 2.2, stroke: "none" }, "fill-foreground/45"))
    plan.forEach((w, i) => {
      const ry = 66 + i * 26
      const gy = 60 + i * 28
      out.push(rect({ x: 36, y: ry - 5, width: 10, height: 10, rx: 2 }, faded(i === lit ? "fill-primary stroke-primary" : line)))
      out.push(path({ d: `M38.5 ${ry} l2.5 2.5 l4.5 -5`, display: shown(i < lit) }, "stroke-foreground/70"))
      out.push(rect({ x: 54, y: ry - 2, width: w, height: 4, rx: 2, stroke: "none" }, faded(i === lit ? "fill-foreground" : "fill-foreground/35")))
      out.push(path({ d: `M140 ${ry} C 160 ${ry} 160 ${gy + 7} 180 ${gy + 7}`, "stroke-dasharray": i === lit ? undefined : "3 4" }, faded(i === lit ? "stroke-primary" : faint)))
      planCode.forEach((cw, k) => out.push(rect({ x: k ? 200 : 192, y: gy + k * 7, width: cw - i * 4, height: 3, rx: 1.5, stroke: "none" }, faded(i === lit ? "fill-primary" : "fill-foreground/35"))))
    })
  } else if (kind === "queue") {
    const lit = pick(batches.length, (hx - 0.2) / 0.62)
    const dead = s.on && !s.still && hy > 0.72
    out.push(seg({ x1: 66, x2: 276, y1: 91, y2: 91 }, faint))
    out.push(rect({ x: 18, y: 66, width: 48, height: 50, rx: 6 }, line))
    for (const ly of [80, 91, 102]) out.push(seg({ x1: 28, x2: ly === 91 ? 50 : 56, y1: ly, y2: ly }, faint))
    batches.forEach((bx, i) => {
      for (const k of [0, 1, 2]) {
        const ey = 66 + k * 18
        out.push(rect({ x: bx, y: ey, width: 24, height: 14, rx: 2 }, faded(i === lit ? "fill-background stroke-primary" : "fill-background stroke-foreground/45")))
        out.push(path({ d: `M${bx} ${ey} l12 8 l12 -8` }, hot(i === lit)))
      }
    })
    out.push(rect({ x: 276, y: 70, width: 28, height: 42, rx: 5 }, line))
    out.push(path({ d: "M280 94 h6 l3 5 h6 l3 -5 h2" }, line))
    out.push(path({ d: "M194 120 C 194 146 214 158 238 158", "stroke-dasharray": "3 4" }, faded(dead ? "stroke-primary" : faint)))
    out.push(rect({ x: 238, y: 146, width: 40, height: 24, rx: 4 }, hot(dead)))
    out.push(path({ d: "M252 152 l12 12 M264 152 l-12 12" }, hot(dead)))
  } else if (kind === "tools") {
    const lit = near(toolTiles, hx, hy)
    toolTiles.forEach(([cx, cy], i) => {
      const c = hot(i === lit)
      out.push(rect({ x: cx - 27, y: cy - 27, width: 54, height: 54, rx: 10 }, c))
      if (i === 0) {
        out.push(rect({ x: cx - 13, y: cy - 10, width: 26, height: 20, rx: 3 }, c))
        out.push(path({ d: `M${cx - 13} ${cy + 7} l8 -8 l6 5 l5 -4 l7 7` }, c))
        out.push(dot({ cx: cx + 6, cy: cy - 4, r: 2, stroke: "none" }, i === lit ? "fill-primary" : "fill-foreground/45"))
      } else if (i === 1) {
        out.push(rect({ x: cx - 13, y: cy - 10, width: 26, height: 20, rx: 3 }, c))
        out.push(path({ d: `M${cx - 3} ${cy - 5} v10 l8 -5 z` }, c))
      } else if (i === 2) {
        ;[4, 10, 16, 8, 14, 6, 10].forEach((h, k) => out.push(seg({ x1: cx - 12 + k * 4, x2: cx - 12 + k * 4, y1: cy - h / 2, y2: cy + h / 2 }, c)))
      } else if (i === 3) {
        out.push(path({ d: `M${cx - 5} ${cy - 11} c-4 0 -5 2 -5 5 v2 c0 3 -1 4 -4 4 c3 0 4 1 4 4 v2 c0 3 1 5 5 5` }, c))
        out.push(path({ d: `M${cx + 5} ${cy - 11} c4 0 5 2 5 5 v2 c0 3 1 4 4 4 c-3 0 -4 1 -4 4 v2 c0 3 -1 5 -5 5` }, c))
      } else if (i === 4) {
        out.push(path({ d: `M${cx - 10} ${cy - 13} h14 l6 6 v20 h-20 z` }, c))
        out.push(path({ d: `M${cx + 4} ${cy - 13} v6 h6 M${cx - 6} ${cy + 1} h12 M${cx - 6} ${cy + 6} h8` }, c))
      } else if (i === 5) {
        out.push(rect({ x: cx - 12, y: cy - 6, width: 24, height: 16, rx: 2 }, c))
        out.push(path({ d: `M${cx - 14} ${cy - 11} h28 v5 h-28 z` }, c))
        out.push(path({ d: `M${cx} ${cy - 6} v16`, "stroke-dasharray": "2 2" }, c))
      } else if (i === 6) {
        out.push(path({ d: `M${cx - 10} ${cy + 10} l20 -20 M${cx + 2} ${cy - 10} h8 v8 M${cx - 10} ${cy + 2} v8 h8` }, c))
      } else {
        out.push(path({ d: `M${cx - 11} ${cy - 4} h20 l-4 -4 M${cx + 11} ${cy + 4} h-20 l4 4` }, c))
      }
    })
  } else if (kind === "pipeline") {
    const lit = pick(4, hx)
    out.push(rect({ x: 32, y: 56, width: 52, height: 40, rx: 4 }, faint))
    out.push(rect({ x: 24, y: 64, width: 52, height: 40, rx: 4 }, faint))
    out.push(rect({ x: 16, y: 72, width: 52, height: 40, rx: 4 }, `${hot(lit === 0)} fill-background`))
    out.push(path({ d: "M20 106 l12 -12 l9 7 l7 -5 l16 12" }, hot(lit === 0)))
    out.push(dot({ cx: 54, cy: 84, r: 2.2, stroke: "none" }, lit === 0 ? "fill-primary" : "fill-foreground/45"))
    out.push(path({ d: "M90 92 H112 M106 87 l6 5 l-6 5" }, faint))
    out.push(rect({ x: 118, y: 68, width: 48, height: 48, rx: 6 }, hot(lit === 1)))
    out.push(path({ d: "M136 80 l-4 24 M150 80 l-4 24 M128 89 h28 M126 99 h28" }, hot(lit === 1)))
    out.push(path({ d: "M172 92 H192 M186 87 l6 5 l-6 5" }, faint))
    out.push({ tag: "ellipse", attrs: { cx: 220, cy: 70, rx: 22, ry: 7 }, class: hot(lit === 2) })
    out.push(path({ d: "M198 70 V114 A22 7 0 0 0 242 114 V70" }, hot(lit === 2)))
    out.push(path({ d: "M198 92 A22 7 0 0 0 242 92" }, faint))
    out.push(path({ d: "M248 92 C 260 92 258 66 270 66 M248 92 H270 M248 92 C 260 92 258 118 270 118" }, faded(lit === 3 ? "stroke-primary" : faint)))
    for (const ly of [66, 92, 118]) out.push(rect({ x: 272, y: ly - 5, width: 32, height: 10, rx: 5 }, hot(lit === 3)))
  } else {
    const lit = pick(endpoints.length, (hy - 0.15) / 0.7)
    out.push(path({ d: "M28 32 h70 l18 18 v118 h-88 z" }, line))
    out.push(path({ d: "M98 32 v18 h18" }, line))
    out.push(rect({ x: 40, y: 62, width: 44, height: 6, rx: 3, stroke: "none" }, "fill-foreground/60"))
    docLines.forEach((w, i) => out.push(rect({ x: 40, y: 78 + i * 12, width: w, height: 4, rx: 2, stroke: "none" }, "fill-foreground/30")))
    endpoints.forEach((w, i) => {
      const ry = 52 + i * 32
      out.push(path({ d: `M116 100 C 144 100 148 ${ry} 176 ${ry}`, "stroke-dasharray": i === lit ? undefined : "3 4" }, faded(i === lit ? "stroke-primary" : faint)))
      out.push(rect({ x: 176, y: ry - 7, width: 30, height: 14, rx: 3 }, faded(i === lit ? "fill-primary stroke-primary" : line)))
      out.push(rect({ x: 214, y: ry - 2, width: w + 20, height: 4, rx: 2, stroke: "none" }, faded(i === lit ? "fill-foreground" : "fill-foreground/35")))
    })
  }
  return out.map((shape) => ({ ...shape, attrs: { ...shape.attrs, "vector-effect": "non-scaling-stroke" } }))
}

const postKinds = new Set<LineArtKind>(postArtKinds)

/** The drawing's own line, for its svg: a post drawing keeps a 1.25px round line at any size, so it stays thin as a cover; the others scale a 1-unit line with their box. */
export const lineArtStroke = (kind: LineArtKind): Record<string, string | number> =>
  postKinds.has(kind) ? { "stroke-width": 1.25, "stroke-linecap": "round", "stroke-linejoin": "round" } : { "stroke-width": 1 }

/** The drawing of `kind` for the cursor state `s`, element by element in paint order. */
export function lineArt(kind: LineArtKind, s: LineArtState): LineArtShape[] {
  const hx = s.still || !s.on ? 0.62 : s.x
  const hy = s.still || !s.on ? 0.4 : s.y
  const tilt = s.on && !s.still ? s.x - 0.5 : 0
  const out: LineArtShape[] = []

  if (postKinds.has(kind)) return postArt(kind as PostArtKind, hx, hy, s)
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

/** Reports the cursor over `el`'s host as 0–1 across and down, and when it leaves. With `fit`, the 0–1 runs across the drawing itself as it sits letterboxed in `el`, for a drawing in a wider frame. Returns the cleanup. */
export function followLineArt(el: Element, onChange: (x: number, y: number, on: boolean) => void, { fit = false }: { fit?: boolean } = {}) {
  const host = lineArtHost(el)
  let x = 0.5
  let y = 0.5
  const move = (e: PointerEvent) => {
    let { left, top, width, height } = (fit ? el : host).getBoundingClientRect()
    if (fit) {
      const scale = Math.min(width / 320, height / 200)
      left += (width - 320 * scale) / 2
      top += (height - 200 * scale) / 2
      width = 320 * scale
      height = 200 * scale
    }
    x = Math.max(0, Math.min(1, (e.clientX - left) / width))
    y = Math.max(0, Math.min(1, (e.clientY - top) / height))
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
