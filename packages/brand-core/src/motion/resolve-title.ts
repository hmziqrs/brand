/*
 * A title whose letters resolve in from a blur, from the middle out, when it
 * scrolls into view, then shimmer in the accent one after another; letters
 * near the cursor glow. The look is resolve-title.css; markup puts each
 * letter in a [data-ch] span with --i (its index), --o (its offset from the
 * middle) and --d (that offset's size) on it.
 */

export type TitleLetter = { c: string; i: number; off: number }

/** The title's words, each a list of letters with their index and their offset from the middle letter. */
export function titleWords(text: string): TitleLetter[][] {
  const count = text.replace(/ /g, "").length
  const mid = (count - 1) / 2
  let n = 0
  return text.split(" ").map((w) => [...w].map((c) => ({ c, i: n, off: n++ - mid })))
}

/** Calls `onVisible` once the title first scrolls into view. Returns the cleanup. */
export function revealTitle(host: Element, onVisible: () => void) {
  const io = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) {
      onVisible()
      io.disconnect()
    }
  })
  io.observe(host)
  return () => io.disconnect()
}

/** Lights the letters near the cursor (their --g, 0–1) while it moves over the nearest [data-pointer-host] or section. Nothing for reduced motion. Returns the cleanup. */
export function glowTitle(host: HTMLElement) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {}
  const zone = host.closest("[data-pointer-host]") ?? host.closest("section") ?? host
  const letters = [...host.querySelectorAll<HTMLElement>("[data-ch]")]
  let raf = 0
  let x = -1e5
  let y = -1e5
  const paint = () => {
    raf = 0
    for (const l of letters) {
      const r = l.getBoundingClientRect()
      const d = Math.hypot(r.left + r.width / 2 - x, r.top + r.height / 2 - y)
      const g = Math.max(0, 1 - d / Math.max(160, r.height * 2.2))
      l.style.setProperty("--g", (g * g).toFixed(3))
    }
  }
  const move = (e: Event) => {
    x = (e as PointerEvent).clientX
    y = (e as PointerEvent).clientY
    if (!raf) raf = requestAnimationFrame(paint)
  }
  const leave = () => {
    x = y = -1e5
    if (!raf) raf = requestAnimationFrame(paint)
  }
  zone.addEventListener("pointermove", move)
  zone.addEventListener("pointerleave", leave)
  return () => {
    cancelAnimationFrame(raf)
    zone.removeEventListener("pointermove", move)
    zone.removeEventListener("pointerleave", leave)
  }
}
