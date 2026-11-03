/*
 * A word set in a 5×7 dot font (lowercase, digits and a few marks), drawn on
 * a canvas. When it scrolls into view the dots fly in from a seeded scatter,
 * left to right; afterwards the dots near the cursor push away and light up
 * in the accent color. Still for reduced motion.
 */
import { onThemeChange, reducedMotion } from "./canvas"

const G: Record<string, string[]> = {
  a: ["", "", ".###.", "....#", ".####", "#...#", ".####"],
  b: ["#....", "#....", "####.", "#...#", "#...#", "#...#", "####."],
  c: ["", "", ".####", "#....", "#....", "#....", ".####"],
  d: ["....#", "....#", ".####", "#...#", "#...#", "#...#", ".####"],
  e: ["", "", ".###.", "#...#", "#####", "#....", ".###."],
  f: ["..##", ".#..", "####", ".#..", ".#..", ".#..", ".#.."],
  g: ["", "", ".####", "#...#", "#...#", "#...#", ".####", "....#", ".###."],
  h: ["#....", "#....", "####.", "#...#", "#...#", "#...#", "#...#"],
  i: [".#.", "...", "##.", ".#.", ".#.", ".#.", "###"],
  j: ["..#", "...", ".##", "..#", "..#", "..#", "..#", "..#", "##."],
  k: ["#...", "#...", "#..#", "#.#.", "##..", "#.#.", "#..#"],
  l: ["##.", ".#.", ".#.", ".#.", ".#.", ".#.", "###"],
  m: ["", "", "##.#.", "#.#.#", "#.#.#", "#.#.#", "#.#.#"],
  n: ["", "", "####.", "#...#", "#...#", "#...#", "#...#"],
  o: ["", "", ".###.", "#...#", "#...#", "#...#", ".###."],
  p: ["", "", "####.", "#...#", "#...#", "#...#", "####.", "#....", "#...."],
  q: ["", "", ".####", "#...#", "#...#", "#...#", ".####", "....#", "....#"],
  r: ["", "", "#.##", "##..", "#...", "#...", "#..."],
  s: ["", "", ".####", "#....", ".###.", "....#", "####."],
  t: [".#..", ".#..", "####", ".#..", ".#..", ".#..", "..##"],
  u: ["", "", "#...#", "#...#", "#...#", "#...#", ".####"],
  v: ["", "", "#...#", "#...#", "#...#", ".#.#.", "..#.."],
  w: ["", "", "#...#", "#.#.#", "#.#.#", "#.#.#", ".#.#."],
  x: ["", "", "#...#", ".#.#.", "..#..", ".#.#.", "#...#"],
  y: ["", "", "#...#", "#...#", "#...#", "#...#", ".####", "....#", ".###."],
  z: ["", "", "#####", "...#.", "..#..", ".#...", "#####"],
  "0": [".###.", "#...#", "#..##", "#.#.#", "##..#", "#...#", ".###."],
  "1": [".#.", "##.", ".#.", ".#.", ".#.", ".#.", "###"],
  "2": [".###.", "#...#", "....#", "...#.", "..#..", ".#...", "#####"],
  "3": ["####.", "....#", "....#", ".###.", "....#", "....#", "####."],
  "4": ["...#.", "..##.", ".#.#.", "#..#.", "#####", "...#.", "...#."],
  "5": ["#####", "#....", "####.", "....#", "....#", "#...#", ".###."],
  "6": [".###.", "#....", "####.", "#...#", "#...#", "#...#", ".###."],
  "7": ["#####", "....#", "...#.", "..#..", ".#...", ".#...", ".#..."],
  "8": [".###.", "#...#", "#...#", ".###.", "#...#", "#...#", ".###."],
  "9": [".###.", "#...#", "#...#", ".####", "....#", "....#", ".###."],
  "-": ["", "", "", "", "###", "", ""],
  ".": ["", "", "", "", "", "", "#"],
  ">": ["", "#..", ".#.", "..#", ".#.", "#..", ""],
  _: ["", "", "", "", "", "", "", "", "####"],
  " ": ["..", "", "", "", "", "", ""],
  "■": ["", "", "", "####", "####", "####", "####"],
}

export type DotCell = { x: number; y: number; mark: boolean }
export type DotLayout = { cols: number; rows: number; cells: DotCell[] }

const GLYPH_ROWS = 9
const PAD = 1

/** The word's dots in grid cells, one column of space between letters. */
export function layoutWord(word: string, gap = 1): DotLayout {
  const chars = [...word.toLowerCase()]
  const cells: DotCell[] = []
  let x = 0
  chars.forEach((ch, n) => {
    const glyph = G[ch] ?? G[" "]
    const width = Math.max(...glyph.map((r) => r.length))
    glyph.forEach((row, y) => {
      ;[...row].forEach((c, dx) => {
        if (c === "#") cells.push({ x: x + dx, y, mark: ch === "■" })
      })
    })
    x += width + (n < chars.length - 1 ? gap : 0)
  })
  return { cols: x, rows: GLYPH_ROWS, cells }
}

/** The canvas grid for a word, with a cell of padding around it: its aspect ratio is cols / rows. */
export function dotNameGrid(word: string) {
  const layout = layoutWord(word)
  return { cols: layout.cols + PAD * 2, rows: layout.rows + PAD * 2 }
}

function rng(seed: number) {
  let s = seed >>> 0 || 1
  return () => {
    s ^= s << 13
    s ^= s >>> 17
    s ^= s << 5
    return ((s >>> 0) % 100000) / 100000
  }
}

function hash(text: string) {
  let h = 2166136261
  for (const c of text) h = Math.imul(h ^ c.charCodeAt(0), 16777619)
  return h >>> 0
}

export type DotNameOptions = {
  word: string
  /** Elements whose text color paints the dots and the cursor glow (hidden spans with text-foreground and text-primary). */
  ink: Element
  accent: Element
}

/** Draws `word` on `canvas` and animates it. The cursor is read over the nearest [data-pointer-host] or section. Returns the cleanup. */
export function mountDotName(canvas: HTMLCanvasElement, { word, ink: inkEl, accent: accentEl }: DotNameOptions) {
  const ctx = canvas.getContext("2d")
  if (!ctx) return () => {}
  const layout = layoutWord(word)
  const C = layout.cols + PAD * 2
  const R = layout.rows + PAD * 2
  const random = rng(hash(word))
  const FLY = 900
  const dots = layout.cells.map((cell) => {
    const hx = cell.x + PAD
    const hy = cell.y + PAD
    return {
      hx,
      hy,
      sx: hx + (random() - 0.5) * C * 0.9,
      sy: hy + (random() - 0.5) * R * 2.4,
      t0: (cell.x / Math.max(1, layout.cols)) * 700 + random() * 500,
      ox: 0,
      oy: 0,
      glow: 0,
    }
  })
  const end = Math.max(...dots.map((d) => d.t0)) + FLY + 100

  let ink = ""
  let accent = ""
  const readColors = () => {
    ink = getComputedStyle(inkEl).color
    accent = getComputedStyle(accentEl).color
  }
  readColors()

  const reduced = reducedMotion()
  let start = -1
  let raf = 0
  let cell = 1
  let px = -1e5
  let py = -1e5

  const size = () => {
    const w = canvas.clientWidth
    if (!w) return
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    canvas.width = Math.round(w * dpr)
    canvas.height = Math.round(((w * R) / C) * dpr)
    cell = canvas.width / C
  }

  const ease = (k: number) => 1 - Math.pow(1 - k, 3)

  const draw = (now: number) => {
    const t = start < 0 ? (reduced ? end : 0) : now - start
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    let busy = t < end
    const RAD = 4.5
    for (const d of dots) {
      let tx = 0
      let ty = 0
      let tg = 0
      if (!reduced) {
        const dx = d.hx + 0.5 - px
        const dy = d.hy + 0.5 - py
        const dist = Math.hypot(dx, dy)
        if (dist < RAD) {
          const f = (1 - dist / RAD) ** 2
          tx = (dx / (dist || 1)) * f * 0.7
          ty = (dy / (dist || 1)) * f * 0.7
          tg = f
        }
      }
      d.ox += (tx - d.ox) * 0.18
      d.oy += (ty - d.oy) * 0.18
      d.glow += (tg - d.glow) * 0.18
      if (Math.abs(tx - d.ox) + Math.abs(ty - d.oy) + Math.abs(tg - d.glow) > 0.004) busy = true

      let x = d.hx
      let y = d.hy
      let a = 1
      const lt = t - d.t0
      if (lt < FLY) {
        const k = ease(Math.max(0, lt) / FLY)
        x = d.sx + (d.hx - d.sx) * k
        y = d.sy + (d.hy - d.sy) * k
        a = lt < 0 ? 0 : k < 0.85 ? (Math.random() < 0.25 ? 0.25 : 0.55 + k * 0.4) : 1
      }
      x += d.ox
      y += d.oy
      if (a <= 0) continue
      const r = cell * 0.36 * (1 + d.glow * 0.25)
      ctx.globalAlpha = a
      ctx.fillStyle = ink
      ctx.beginPath()
      ctx.arc((x + 0.5) * cell, (y + 0.5) * cell, r, 0, Math.PI * 2)
      ctx.fill()
      if (d.glow > 0.02) {
        ctx.globalAlpha = a * Math.min(1, d.glow * 1.4)
        ctx.fillStyle = accent
        ctx.fill()
      }
    }
    ctx.globalAlpha = 1
    return busy
  }

  const loop = (now: number) => {
    raf = draw(now) ? requestAnimationFrame(loop) : 0
  }
  const kick = () => {
    if (!raf) raf = requestAnimationFrame(loop)
  }

  size()
  draw(performance.now())

  const ro = new ResizeObserver(() => {
    size()
    draw(performance.now())
  })
  ro.observe(canvas)
  const io = new IntersectionObserver((entries) => {
    if (start < 0 && !reduced && entries.some((e) => e.isIntersecting)) {
      start = performance.now()
      kick()
    }
  })
  io.observe(canvas)

  const zone = canvas.closest("[data-pointer-host]") ?? canvas.closest("section") ?? canvas
  const move = (e: Event) => {
    const r = canvas.getBoundingClientRect()
    px = (((e as PointerEvent).clientX - r.left) / r.width) * C
    py = (((e as PointerEvent).clientY - r.top) / r.height) * R
    kick()
  }
  const leave = () => {
    px = py = -1e5
    kick()
  }
  if (!reduced) {
    zone.addEventListener("pointermove", move)
    zone.addEventListener("pointerleave", leave)
  }
  const off = onThemeChange(() => {
    readColors()
    draw(performance.now())
  })
  return () => {
    cancelAnimationFrame(raf)
    ro.disconnect()
    io.disconnect()
    off()
    zone.removeEventListener("pointermove", move)
    zone.removeEventListener("pointerleave", leave)
  }
}
