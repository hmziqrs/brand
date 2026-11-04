import { reducedMotion } from "./canvas"

export type DotFieldOptions = {
  /** Distance between dots in pixels. */
  gap?: number
  /** The cursor's reach in pixels. */
  reach?: number
}

/** A dot's place and look at distance `d` from the cursor: pushed away, larger and brighter the nearer it is, and hot inside the inner quarter of the reach. */
export const dotAt = (x: number, y: number, mx: number, my: number, reach: number) => {
  const d = Math.hypot(x - mx, y - my)
  const k = Math.max(0, 1 - d / reach)
  const push = k * 8
  return {
    x: k ? x + ((x - mx) / (d || 1)) * push : x,
    y: k ? y + ((y - my) / (d || 1)) * push : y,
    radius: 1 + k * 1.6,
    alpha: 0.2 + k * 0.6,
    hot: k > 0.75,
    k,
  }
}

/** Runs a field of dots on `canvas`, filling `host`; the cursor anywhere on the page near it swells, pushes and heats the dots around it. The dots take `host`'s text color and its --orange when hot. Returns the cleanup. */
export function mountDotField(host: HTMLElement, canvas: HTMLCanvasElement, { gap = 22, reach = 140 }: DotFieldOptions = {}) {
  const ctx = canvas.getContext("2d")
  if (!ctx) return () => {}
  const reduced = reducedMotion()
  let w = 0
  let h = 0
  let mx = -9999
  let my = -9999
  let raf = 0
  let fg = ""
  let hot = ""

  const read = () => {
    const cs = getComputedStyle(host)
    fg = cs.color
    hot = cs.getPropertyValue("--orange").trim() || fg
  }

  const draw = () => {
    raf = 0
    ctx.clearRect(0, 0, w, h)
    for (let y = gap / 2; y < h; y += gap)
      for (let x = gap / 2; x < w; x += gap) {
        const dot = dotAt(x, y, reduced ? -9999 : mx, reduced ? -9999 : my, reach)
        ctx.globalAlpha = dot.alpha
        ctx.fillStyle = dot.hot ? hot : fg
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2)
        ctx.fill()
      }
    ctx.globalAlpha = 1
  }

  const kick = () => {
    if (!raf) raf = requestAnimationFrame(draw)
  }

  const size = () => {
    const r = host.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    w = r.width
    h = r.height
    canvas.width = Math.round(w * dpr)
    canvas.height = Math.round(h * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    read()
  }

  const move = (e: PointerEvent) => {
    const r = host.getBoundingClientRect()
    mx = e.clientX - r.left
    my = e.clientY - r.top
    if (my < -reach || my > h + reach) return
    kick()
  }

  const ro = new ResizeObserver(() => (size(), kick()))
  ro.observe(host)
  const mo = new MutationObserver(() => (read(), kick()))
  mo.observe(document.documentElement, { attributes: true })
  window.addEventListener("pointermove", move, { passive: true })
  size()
  kick()
  return () => {
    cancelAnimationFrame(raf)
    ro.disconnect()
    mo.disconnect()
    window.removeEventListener("pointermove", move)
  }
}
