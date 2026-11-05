import { reducedMotion } from "./canvas"

/** How far the pointer turns the book across and down its cover, in degrees. */
export const bookSpan = { y: 70, x: 36 } as const

/** How the book sits when the pointer is away: turned a little toward the reader. */
export const bookRest: readonly [x: number, y: number] = [5, 28]

/** The book's turn for a pointer at `nx`, `ny` (0 to 1 across and down the cover): the cover follows the pointer. */
export const bookTilt = (nx: number, ny: number) => ({ rx: -(ny - 0.5) * bookSpan.x, ry: (nx - 0.5) * bookSpan.y })

/** The book's angles and its shadow's slide and squeeze: resting or following the pointer, plus half a turn when flipped over. */
export const bookPose = (live: { rx: number; ry: number } | null, turned: boolean, rest: readonly [number, number] = bookRest) => {
  const tilt = live ? live.ry : rest[1]
  return {
    x: live ? live.rx : rest[0],
    y: tilt + (turned ? 180 : 0),
    shadowX: tilt * 0.4,
    shadowScale: 1 - Math.abs(tilt) / 180,
  }
}

/** Wires every `[data-book]` under `root`: a mouse over the cover tilts it, a click or tap flips it, and `aria-pressed` follows. Reads `data-rest="x,y"`. Returns the cleanup. */
export function mountBooks(root: ParentNode = document) {
  const stops: (() => void)[] = []
  for (const host of root.querySelectorAll<HTMLElement>("[data-book]")) {
    const cube = host.querySelector<HTMLElement>("[data-book-cube]")
    const shadow = host.querySelector<HTMLElement>("[data-book-shadow]")
    if (!cube) continue
    const rest = (host.dataset.rest ?? "").split(",").map(Number)
    const resting: [number, number] = rest.length === 2 && rest.every(Number.isFinite) ? [rest[0], rest[1]] : [bookRest[0], bookRest[1]]
    let live: { rx: number; ry: number } | null = null
    const apply = () => {
      const pose = bookPose(live, host.getAttribute("aria-pressed") === "true", resting)
      cube.style.transform = `rotateX(${pose.x}deg) rotateY(${pose.y}deg)`
      if (shadow) shadow.style.transform = `translateX(${pose.shadowX}%) scaleX(${pose.shadowScale})`
    }
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || reducedMotion()) return
      const r = host.getBoundingClientRect()
      live = bookTilt((e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height)
      apply()
    }
    const leave = () => {
      live = null
      apply()
    }
    const flip = () => {
      host.setAttribute("aria-pressed", String(host.getAttribute("aria-pressed") !== "true"))
      apply()
    }
    host.addEventListener("pointermove", move)
    host.addEventListener("pointerleave", leave)
    host.addEventListener("click", flip)
    new MutationObserver(apply).observe(host, { attributes: true, attributeFilter: ["aria-pressed"] })
    apply()
    stops.push(() => {
      host.removeEventListener("pointermove", move)
      host.removeEventListener("pointerleave", leave)
      host.removeEventListener("click", flip)
    })
  }
  return () => stops.forEach((stop) => stop())
}
