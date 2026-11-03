/*
 * A soft pool that follows the cursor over a field's pointer host: it eases
 * after the cursor, jumps there when it first arrives or for reduced motion,
 * and goes out when the cursor leaves. Touch never lights it.
 */
import { pointerHost, reducedMotion } from "./canvas"

/** Where the glow sits in `el`'s box and whether it's on; `onFrame` gets each step. Returns the cleanup. */
export function followGlow(el: HTMLElement, onFrame: (x: number, y: number, on: boolean) => void) {
  const area = pointerHost(el)
  const still = reducedMotion()
  let x = 0
  let y = 0
  let on = false
  let tx = 0
  let ty = 0
  let raf = 0
  const step = () => {
    x += (tx - x) * 0.16
    y += (ty - y) * 0.16
    onFrame(x, y, on)
    raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.5 ? requestAnimationFrame(step) : 0
  }
  const move = (e: PointerEvent) => {
    if (e.pointerType === "touch") return
    const r = el.getBoundingClientRect()
    tx = e.clientX - r.left
    ty = e.clientY - r.top
    if (!on || still) {
      x = tx
      y = ty
      on = true
      onFrame(x, y, on)
      return
    }
    if (!raf) raf = requestAnimationFrame(step)
  }
  const leave = () => {
    on = false
    onFrame(x, y, on)
  }
  area.addEventListener("pointermove", move)
  area.addEventListener("pointerleave", leave)
  return () => {
    area.removeEventListener("pointermove", move)
    area.removeEventListener("pointerleave", leave)
    cancelAnimationFrame(raf)
  }
}

/** The glow's mask: a soft circle of `radius` pixels at (x, y). */
export const glowMask = (x: number, y: number, radius: number) => `radial-gradient(circle ${radius}px at ${x}px ${y}px, black 0%, rgb(0 0 0 / 0.5) 45%, transparent 100%)`
