// The .ts extension keeps this runnable by Node directly (type stripping
// resolves no extensionless specifiers), which the asset renderer needs; the
// bundler accepts it just the same.
import { arcs, hash, ringMoves, rng, type Arc, type RingMotion } from "./rings.ts"
import type { Color, Rgb } from "../color.ts"

/*
 * The frame adapter (assets.md, "Video and motion: frame test first"). The
 * browser rings animate on the clock, so they can't be asked for frame 400
 * before frame 399; video renders ask for frames in any order. This module is
 * the same movement as a function of time: give it the arcs, the motion
 * settings and a moment, and it returns exactly what rings.css would have
 * painted then. Pure — no state, no clock, no randomness at call time.
 *
 * rings.css and the keyframes ringMoves() returns are the spec, so this file
 * reads the moves ringMoves() made (their CSS variables) and evaluates the
 * same keyframes with the same timing functions. It never invents its own
 * timing, and it throws on a keyframes shape it doesn't know, so the two
 * can't drift apart quietly.
 */

/** The paints a ring picture needs, resolved from the theme with their alpha. */
export type RingPalette = { primary: Color; line: Color; foreground: Color }

/** One ring at one moment. Rotations are degrees around (cx, cy). */
export type RingFrame = {
  /** The whole ring group, on top of the arc's own rotate. */
  ringRotate: number
  /** The accent dot's own group, on top of the ring's rotation. */
  dotRotate: number
  /** The circle's stroke-dasharray: the arc's own, unless it breathes. */
  dash: string
  /** The circle's stroke, resolved (a ripple moves its alpha). */
  stroke: Color
}

// --- timing ---------------------------------------------------------------------

/** CSS `linear`. */
const linear = (x: number) => x

/** CSS `ease-in-out`, as cubic-bezier(0.42, 0, 0.58, 1). */
const easeInOut = (() => {
  // Newton-Raphson on the x polynomial, bisection as a fallback: the same
  // curve every call, to well under a frame's worth of difference. The y
  // control points are 0 and 1, so the y polynomial stays simple.
  const cx = 3 * 0.42
  const bx = 3 * (0.58 - 0.42) - cx
  const ax = 1 - cx - bx
  const cy = 0
  const by = 3
  const ay = 1 - cy - by
  const at = (t: number) => ((ax * t + bx) * t + cx) * t
  const yAt = (t: number) => ((ay * t + by) * t + cy) * t
  const slope = (t: number) => 3 * ax * t * t + 2 * bx * t + cx
  return (x: number) => {
    let t = x
    for (let i = 0; i < 12 && Math.abs(at(t) - x) > 1e-9; i++) {
      const d = slope(t)
      if (Math.abs(d) < 1e-6) break
      t -= (at(t) - x) / d
    }
    if (t < 0 || t > 1) {
      let [lo, hi] = [0, 1]
      t = x
      for (let i = 0; i < 32 && Math.abs(at(t) - x) > 1e-9; i++) {
        if (at(t) < x) lo = t
        else hi = t
        t = (lo + hi) / 2
      }
    }
    return yAt(Math.min(1, Math.max(0, t)))
  }
})()

const lerp = (from: number, to: number, k: number) => from + (to - from) * k

const mixColor = (from: Color, to: Color, k: number): Color => ({
  // Both stops of a ripple are the foreground's own color at two alphas (a
  // color-mix with transparent keeps the hue), so a plain mix is exact.
  rgb: from.rgb.map((v, i) => lerp(v, to.rgb[i], k)) as Rgb,
  alpha: lerp(from.alpha, to.alpha, k),
})

/**
 * Where an animation is at wall time `t`, the way rings.css runs it: duration
 * and delay both scaled by --ring-speed, `fill-mode: both` (so a ring waiting
 * for its delay sits at its first keyframe), infinite iterations, and the
 * iteration count that `direction: alternate` needs.
 */
function clock(t: number, duration: number, delay: number, speed: number) {
  const elapsed = t - delay * speed
  if (elapsed <= 0) return { p: 0, iteration: 0 }
  const total = elapsed / (duration * speed)
  return { p: total % 1, iteration: Math.floor(total) }
}

// --- keyframes ------------------------------------------------------------------

/** What one keyframes rule can move. Absent props aren't animated. */
type Props = { rotate?: number; dash?: [drawn: number, gap: number]; stroke?: Color }
type Stop = { at: number } & Props

/** Reads a CSS seconds value ("1.50s") or degrees ("24.0deg"). */
const read = (value: string | undefined, unit: string) => (value === undefined ? 0 : Number(value.replace(unit, "")))

const pair = (value: string | undefined): [number, number] => {
  const [drawn, gap] = (value ?? "0 0").split(" ").map(Number)
  return [drawn, gap]
}

/**
 * The stops of a keyframes rule ringMoves() returned, looked up by the name it
 * put in --keyframes. Selectors are percentages and declarations are the three
 * properties the ring rules use; anything else is a shape this file must learn
 * before it can render video of it.
 */
function generatedStops(css: string, name: string, vars: Record<string, string>, palette: RingPalette): Stop[] {
  const body = css.match(new RegExp(`@keyframes ${name}\\{((?:[^{}]|{[^{}]*})*)}`))?.[1]
  if (body === undefined) throw new Error(`No @keyframes ${name} in the movement CSS`)
  const stops: Stop[] = []
  for (const [, selectors, declarations] of body.matchAll(/([\d.,%]+)\{([^{}]*)\}/g)) {
    const props: Props = {}
    for (const decl of declarations.split(";")) {
      const [property, value] = decl.split(":")
      if (property === "rotate") props.rotate = value === "var(--step)" ? read(vars["--step"], "deg") : read(value, "deg")
      else if (property === "stroke") {
        const mix = value.match(/^color-mix\(in oklab,var\(--foreground\) ([\d.]+)%,transparent\)$/)
        if (value === "var(--line)") props.stroke = palette.line
        else if (mix) props.stroke = { rgb: palette.foreground.rgb, alpha: Number(mix[1]) / 100 }
        else throw new Error(`Can't render the ripple stroke ${value}`)
      } else if (property !== undefined && value !== undefined) throw new Error(`Can't render the keyframes property ${property}`)
    }
    for (const at of selectors.split(",")) stops.push({ at: Number(at.replace("%", "")) / 100, ...props })
  }
  // Sorted, one stop per offset — where two land together, the later wins.
  const one = stops.filter((_, i) => stops.findLastIndex((s) => s.at === stops[i].at) === i)
  return one.sort((a, b) => a.at - b.at)
}

/**
 * A stop list at keyframe position `q`. The timing function eases each span
 * between two stops, the way `animation-timing-function` works inside
 * @keyframes; `direction: alternate` has already turned `q` around.
 */
function atProgress(stops: Stop[], ease: (x: number) => number, q: number): Props {
  const last = stops.findLast((s) => s.at <= q) ?? stops[0]
  const next = stops.find((s) => s.at > q)
  if (!next) return last
  const k = ease((q - last.at) / (next.at - last.at))
  const mix = <T>(from: T | undefined, to: T | undefined, both: (f: T, t: T) => T) => (from === undefined || to === undefined ? undefined : both(from, to))
  return {
    rotate: mix(last.rotate, next.rotate, (f, n) => lerp(f, n, k)),
    dash: mix(last.dash, next.dash, (f, n) => [lerp(f[0], n[0], k), lerp(f[1], n[1], k)]),
    stroke: mix(last.stroke, next.stroke, (f, n) => mixColor(f, n, k)),
  }
}

/** One animated part at time `t`: its stops, pace and direction. */
function animated(t: number, { stops, seconds, delay, ease, alternate, speed }: { stops: Stop[]; seconds: number; delay: number; ease: (x: number) => number; alternate: boolean; speed: number }): Props {
  const { p, iteration } = clock(t, seconds, delay, speed)
  // `direction: alternate` plays every second iteration from the end back.
  return atProgress(stops, ease, alternate && iteration % 2 === 1 ? 1 - p : p)
}

// --- the picture ----------------------------------------------------------------

/** The hero ring picture: the arcs, and everything a renderer needs to paint them. */
export type RingPicture = { list: Arc[]; viewBox: string; cx: number; cy: number; width: [faint: number, accent: number]; dot: number }

/**
 * The hero picture every site's hero draws (the lab's `Rings`, the Svelte
 * kit's `Rings`): eleven rings around a center near the right edge, one of
 * them the accent. Same seed, same rings, in a browser or in a video.
 */
export function heroPicture(seed: string): RingPicture {
  const random = rng(hash(seed) + 7)
  const accent = 3 + Math.floor(random() * 3)
  return {
    list: arcs(random, { cx: 440, cy: 225, radii: Array.from({ length: 11 }, (_, i) => 34 + i * 34), accent, accentGap: 0.52, gap: [0.06, 0.3] }),
    viewBox: "0 0 520 440",
    cx: 440,
    cy: 225,
    width: [1.25, 3],
    dot: 7,
  }
}

/**
 * Every ring's state at `t` seconds. The same arcs, settings, seed and moment
 * always give the same picture, whatever order the moments arrive in.
 */
export function ringFrames(list: Arc[], motion: RingMotion, seed: string, palette: RingPalette, t: number, speed = 1): RingFrame[] {
  const { moves, css } = ringMoves(motion, list, seed)
  // What each move's vars say, in numbers.
  const seconds = (vars: Record<string, string>) => read(vars["--duration"], "s")
  const delayed = (vars: Record<string, string>) => (vars["--delay"] ? read(vars["--delay"], "s") : 0)
  const generated = (vars: Record<string, string>) => {
    const name = vars["--keyframes"]
    if (!name) throw new Error(`The movement names no keyframes to render`)
    return generatedStops(css, name, vars, palette)
  }

  return list.map((arc, i) => {
    const frame: RingFrame = { ringRotate: 0, dotRotate: 0, dash: arc.dash, stroke: arc.accent ? palette.primary : palette.line }

    // rings.css, in order: the group (turn, dial), the circle (breathe moves
    // its dash, ripple its stroke), then the dot.
    const ring = moves[i]?.ring
    if (ring?.kind === "turn") {
      // @keyframes rings-turn: to rotate --turn, from the 0 it already is.
      const stops: Stop[] = [{ at: 0, rotate: 0 }, { at: 1, rotate: read(ring.vars["--turn"], "deg") }]
      frame.ringRotate = animated(t, { stops, seconds: seconds(ring.vars), delay: 0, ease: linear, alternate: false, speed }).rotate ?? 0
    } else if (ring?.kind === "dial") {
      frame.ringRotate = animated(t, { stops: generated(ring.vars), seconds: seconds(ring.vars), delay: delayed(ring.vars), ease: easeInOut, alternate: false, speed }).rotate ?? 0
    }

    const circle = moves[i]?.circle
    if (circle?.kind === "breathe") {
      const vars = circle.vars
      // @keyframes rings-breathe: --dash-from to --dash-to, alternate.
      const dash = animated(t, { stops: [{ at: 0, dash: pair(vars["--dash-from"]) }, { at: 1, dash: pair(vars["--dash-to"]) }], seconds: seconds(vars), delay: 0, ease: easeInOut, alternate: true, speed }).dash
      if (dash) frame.dash = `${dash[0].toFixed(2)} ${dash[1].toFixed(2)}`
    } else if (circle?.kind === "ripple") {
      const stroke = animated(t, { stops: generated(circle.vars), seconds: seconds(circle.vars), delay: delayed(circle.vars), ease: easeInOut, alternate: false, speed }).stroke
      if (stroke) frame.stroke = stroke
    }

    const dot = moves[i]?.dot
    if (dot?.kind === "turn") {
      const stops: Stop[] = [{ at: 0, rotate: 0 }, { at: 1, rotate: read(dot.vars["--turn"], "deg") }]
      frame.dotRotate = animated(t, { stops, seconds: seconds(dot.vars), delay: 0, ease: linear, alternate: false, speed }).rotate ?? 0
    } else if (dot?.kind === "breathe-dot") {
      frame.dotRotate = animated(t, { stops: [{ at: 0 }, { at: 1, rotate: read(dot.vars["--shift"], "deg") }], seconds: seconds(dot.vars), delay: 0, ease: easeInOut, alternate: true, speed }).rotate ?? 0
    }

    return frame
  })
}

/** Greatest common divisor and least common multiple, on integers. */
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a)
const lcm = (a: number, b: number) => (a && b ? (a / gcd(a, b)) * b : 0)

/**
 * The seconds one run of a movement takes: every moving part's own cycle
 * (twice the duration where the direction alternates) folded into one common
 * multiple, so a loop this long ends exactly where it starts. `null` when
 * nothing moves.
 */
export function motionPeriod(list: Arc[], motion: RingMotion, seed: string, speed = 1): number | null {
  const { moves } = ringMoves(motion, list, seed)
  const ms = new Set<number>()
  const cycle = (move: { vars: Record<string, string> } | undefined, alternate: boolean) => {
    const seconds = move && read(move.vars["--duration"], "s")
    if (seconds) ms.add(Math.round(seconds * (alternate ? 2 : 1) * 1000))
  }
  for (const move of moves) {
    cycle(move?.ring?.kind === "dial" || move?.ring?.kind === "turn" ? move.ring : undefined, false)
    cycle(move?.circle, move?.circle?.kind === "breathe")
    cycle(move?.dot, move?.dot?.kind === "breathe-dot")
  }
  if (!ms.size) return null
  return ([...ms].reduce(lcm) * speed) / 1000
}
