/*
 * A name as a full grid of cells, the size of its box: the cells inside the
 * letters are lit, the logo square in oxide, the rest a faint field. dots
 * draws a dot per cell that swells and heats to oxide around the cursor;
 * glyphs draws ■ □ ○ ◎ glyphs the cursor pushes apart and heats into oxide
 * squares. The cursor is read over the nearest [data-pointer-host]. One still
 * frame for reduced motion, redrawn as the cursor moves.
 */
import { bayer8, mountCanvas, onThemeChange, readColor, rgba, sansFamily, trackPointer, type RGB } from "./canvas"

export type PixelNameOptions = {
  text: string
  look?: "dots" | "glyphs"
  /** The largest cell, in pixels. */
  pitch?: number
  /** The smallest cell, in pixels. */
  min?: number
  /** How many cells across the box at most, before the cells shrink toward `min`. */
  cols?: number
  /** How far the cursor reaches, in pixels. */
  reach?: number
}

const glyphs = ["■", "□", "▪", "○", "◎", "●"]

/** The cell size for a box `w` pixels wide: `w / cols`, held between `min` and `pitch`. */
export const pixelPitch = (w: number, pitch: number, min: number, cols: number) => Math.max(min, Math.min(pitch, Math.round(w / cols)))

/** Draws `text` on `canvas`, filling its box, once its faces are loaded. Returns the cleanup. */
export function mountPixelName(canvas: HTMLCanvasElement, { text, look = "dots", pitch = 9, min = 5, cols = 140, reach = 120 }: PixelNameOptions) {
  const host = canvas.parentElement!
  const R2 = reach * reach
  const push = reach * 0.55
  let m: ReturnType<typeof mountCanvas> | undefined
  let ptr: ReturnType<typeof trackPointer> | undefined
  let off = () => {}
  let dead = false
  const faces = [document.fonts.load(`600 16px ${sansFamily(host)}`, text)]
  if (look === "glyphs") faces.push(document.fonts.load('16px "JetBrains Mono Variable"', [...glyphs, "·"].join("")))

  const start = () => {
    if (dead) return
    let fg: RGB = [0, 0, 0]
    let ox: RGB = [0, 0, 0]
    let ink = ""
    let hot = ""
    const read = () => {
      fg = readColor(host, "var(--foreground)")
      ox = readColor(host, "var(--mark-square)")
      ink = rgba(fg, 1)
      hot = rgba(ox, 1)
    }
    read()
    let mask = new Uint8Array(0)
    let mark = new Uint8Array(0)
    let nx = 0
    let ny = 0
    let p = pitch
    ptr = trackPointer(canvas, () => m?.still && (ptr!.snap(), m.redraw()))
    m = mountCanvas(canvas, {
      animate: true,
      setup: ({ w, h }) => {
        p = pixelPitch(w, pitch, min, cols)
        nx = Math.ceil(w / p)
        ny = Math.ceil(h / p)
        const c = document.createElement("canvas")
        c.width = w
        c.height = h
        const x = c.getContext("2d", { willReadFrequently: true })!
        const face = sansFamily(host)
        let size = h * 1.25
        x.font = `600 ${size}px ${face}`
        size = Math.min(size, (size * w * 0.97) / (x.measureText(text).width + size * 0.43))
        x.font = `600 ${size}px ${face}`
        const mt = x.measureText(text)
        const sq = size * 0.36
        const left = (w - (mt.width + size * 0.07 + sq)) / 2
        const base = h * 0.5 + mt.actualBoundingBoxAscent * 0.5 - mt.actualBoundingBoxDescent * 0.2
        x.fillStyle = "red"
        x.fillText(text, left, base)
        x.fillStyle = "blue"
        x.fillRect(left + mt.width + size * 0.07, base - sq, sq, sq)
        const d = x.getImageData(0, 0, w, h).data
        mask = new Uint8Array(nx * ny)
        mark = new Uint8Array(nx * ny)
        for (let j = 0; j < ny; j++)
          for (let i = 0; i < nx; i++) {
            const o = (Math.min(h - 1, Math.round(j * p + p / 2)) * w + Math.min(w - 1, Math.round(i * p + p / 2))) * 4
            const k = i + j * nx
            mask[k] = Math.max(d[o], d[o + 2]) > 127 ? 1 : 0
            mark[k] = d[o + 2] > d[o] ? 1 : 0
          }
      },
      draw: ({ ctx, w, h, t, dt }) => {
        ptr?.step(dt, w, h, t, false, 9)
        const q = ptr?.p
        const live = !!q && (q.inside || !dt)
        const px = q?.x ?? -1e4
        const py = q?.y ?? -1e4
        ctx.clearRect(0, 0, w, h)
        if (look === "glyphs") {
          ctx.font = `${Math.round(p * 0.95)}px "JetBrains Mono Variable", ui-monospace, monospace`
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
        }
        for (let j = 0; j < ny; j++)
          for (let i = 0; i < nx; i++) {
            const k = i + j * nx
            let cx = i * p + p / 2
            let cy = j * p + p / 2
            const on = mask[k] === 1
            let f = 0
            if (live) {
              const vx = cx - px
              const vy = cy - py
              const d2 = vx * vx + vy * vy
              f = Math.exp(-d2 / R2)
              if (look === "glyphs" && on && f > 0.01) {
                const d = Math.sqrt(d2) || 1
                cx += (vx / d) * f * push
                cy += (vy / d) * f * push
              }
            }
            const heat = mark[k] === 1 || f * 1.6 > bayer8(i, j)
            if (look === "dots") {
              ctx.beginPath()
              if (on) {
                ctx.fillStyle = heat ? hot : ink
                ctx.arc(cx, cy, p * 0.36 * (1 + f * 0.45), 0, Math.PI * 2)
              } else {
                ctx.fillStyle = rgba(heat ? ox : fg, 0.1 + f * 0.45)
                ctx.arc(cx, cy, p * 0.13 * (1 + f * 0.8), 0, Math.PI * 2)
              }
              ctx.fill()
            } else if (on) {
              ctx.fillStyle = heat ? hot : ink
              ctx.fillText(mark[k] === 1 || f > 0.35 ? "■" : glyphs[(i * 7 + j * 13) % glyphs.length], cx, cy)
            } else if ((i + j) % 4 === 0) {
              ctx.fillStyle = rgba(heat ? ox : fg, 0.08 + f * 0.3)
              ctx.fillText("·", cx, cy)
            }
          }
      },
    })
    off = onThemeChange(() => {
      read()
      if (m?.still) m.redraw()
    })
  }

  Promise.all(faces)
    .catch(() => [])
    .then(() => document.fonts.ready)
    .then(start)

  return () => {
    dead = true
    off()
    m?.destroy()
    ptr?.destroy()
  }
}
