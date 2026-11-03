/*
 * An ordered-dither field of small squares rising from the bottom of its box
 * in slow waves. The cursor, anywhere on the page within reach of the box,
 * heats the cells around it: they lift, grow and turn the hot color. Pauses
 * offscreen; for reduced motion it holds still and only answers the cursor.
 */
import { bayer8, onThemeChange, reducedMotion } from "./canvas"

export type HeatFieldOptions = {
  /** Elements whose text color paints the field and its hot cells (hidden spans). */
  base: Element
  hot: Element
  /** Cell size in pixels. */
  cell?: number
  /** The cursor's reach in pixels. */
  lens?: number
  /** How much the cursor lifts the field, 0–1. */
  lift?: number
}

/** The field's height at a cell, before the dither: rising toward the bottom (fy 0–1 down the box) in waves at time `t` seconds. */
export const heatLevel = (fx: number, fy: number, t: number) => {
  const wave = 0.16 * Math.sin(fx * 9 + t * 0.35) + 0.12 * Math.sin(fx * 23 - fy * 7 + t * 0.6) + 0.08 * Math.sin((fx + fy) * 31 - t * 0.9)
  return Math.pow(fy, 1.6) * 1.05 + wave * fy
}

/** Runs the field on `canvas`, filling its box. Returns the cleanup. */
export function mountHeatField(canvas: HTMLCanvasElement, { base: baseEl, hot: hotEl, cell = 8, lens = 170, lift = 0.9 }: HeatFieldOptions) {
  const ctx = canvas.getContext("2d")
  if (!ctx) return () => {}
  const reduced = reducedMotion()
  let base = ""
  let hot = ""
  const read = () => {
    base = getComputedStyle(baseEl).color
    hot = getComputedStyle(hotEl).color
  }
  read()
  let raf = 0
  let visible = true
  let last = 0
  const p = { x: -9999, y: -9999, tx: -9999, ty: -9999, e: 0, te: 0 }

  const draw = (time: number) => {
    const W = canvas.width
    const H = canvas.height
    const dpr = W / Math.max(1, canvas.clientWidth)
    const step = cell * dpr
    const cols = Math.ceil(W / step)
    const rows = Math.ceil(H / step)
    const r2 = (lens * dpr) ** 2
    const px = p.x * dpr
    const py = p.y * dpr
    const t = time / 1000
    ctx.clearRect(0, 0, W, H)
    for (let y = 0; y < rows; y++) {
      const fy = y / Math.max(1, rows - 1)
      for (let x = 0; x < cols; x++) {
        const cx = x * step + step / 2
        const cy = y * step + step / 2
        const near = p.e * Math.exp(-((cx - px) ** 2 + (cy - py) ** 2) / r2)
        const v = heatLevel(x / cols, fy, t) + near * lift
        if (v > bayer8(x, y)) {
          ctx.globalAlpha = Math.min(1, 0.3 + v * 0.6)
          ctx.fillStyle = near > 0.35 ? hot : base
          const s = step * (0.5 + Math.min(0.25, near * 0.3))
          ctx.fillRect(cx - s / 2, cy - s / 2, s, s)
        }
      }
    }
    ctx.globalAlpha = 1
  }

  const size = () => {
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    canvas.width = Math.max(1, Math.round(canvas.clientWidth * dpr))
    canvas.height = Math.max(1, Math.round(canvas.clientHeight * dpr))
    draw(performance.now())
  }

  const loop = (now: number) => {
    raf = 0
    if (!visible) return
    p.x += (p.tx - p.x) * 0.18
    p.y += (p.ty - p.y) * 0.18
    p.e += (p.te - p.e) * 0.08
    if (now - last > 40) {
      last = now
      draw(now)
    }
    raf = requestAnimationFrame(loop)
  }

  const move = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect()
    p.tx = e.clientX - r.left
    p.ty = e.clientY - r.top
    if (p.x < -9000) {
      p.x = p.tx
      p.y = p.ty
    }
    p.te = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top - lens && e.clientY <= r.bottom + lens ? 1 : 0
    if (reduced) {
      p.x = p.tx
      p.y = p.ty
      p.e = p.te
      draw(0)
    }
  }

  size()
  if (!reduced) raf = requestAnimationFrame(loop)
  window.addEventListener("pointermove", move, { passive: true })
  const ro = new ResizeObserver(size)
  ro.observe(canvas)
  const io = new IntersectionObserver((entries) => {
    visible = entries.some((x) => x.isIntersecting)
    if (visible && !reduced && !raf) raf = requestAnimationFrame(loop)
  })
  io.observe(canvas)
  const off = onThemeChange(() => {
    read()
    draw(performance.now())
  })
  return () => {
    cancelAnimationFrame(raf)
    window.removeEventListener("pointermove", move)
    ro.disconnect()
    io.disconnect()
    off()
  }
}
