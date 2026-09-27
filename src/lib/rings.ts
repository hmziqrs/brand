/*
 * The rings are drawn from a name, so the same name always gets the same
 * rings and every site, project or post gets its own. Plain functions with
 * no imports, so pages built with anything can copy them as they are.
 */

/** FNV-1a: a stable number from a string. */
export function hash(text: string) {
  let h = 2166136261
  for (const c of text) {
    h ^= c.charCodeAt(0)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/** mulberry32: a small seeded random number generator, 0 to 1. */
export function rng(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export type Arc = {
  r: number
  /** stroke-dasharray: the drawn part, then the gap. */
  dash: string
  /** Degrees to turn the circle, so the gaps don't line up. */
  rotate: number
  accent: boolean
  /** Where the accent ring's arc ends: its dot goes here. */
  end?: [number, number]
}

const f2 = (n: number) => n.toFixed(2)

/**
 * Circles around (cx, cy), each with one gap. The ring at `accent` gets a
 * longer gap and a dot where it ends. Draws from `random` in a fixed order,
 * so the same seed always gives the same picture.
 */
export function arcs(
  random: () => number,
  { cx, cy, radii, accent, accentGap, gap: [min, range] }: {
    cx: number
    cy: number
    radii: number[]
    accent: number
    accentGap: number
    gap: [min: number, range: number]
  },
): Arc[] {
  return radii.map((r, i) => {
    const c = 2 * Math.PI * r
    const isAccent = i === accent
    const gap = c * (isAccent ? accentGap : min + random() * range)
    const rotate = random() * 360
    const arc: Arc = { r, dash: `${f2(c - gap)} ${f2(gap)}`, rotate: Number(f2(rotate)), accent: isAccent }
    if (isAccent) {
      const a = (rotate * Math.PI) / 180 + (c - gap) / r
      arc.end = [Number(f2(cx + r * Math.cos(a))), Number(f2(cy + r * Math.sin(a)))]
    }
    return arc
  })
}

/*
 * How the hero rings can move: two layers that combine. The orange ring can
 * turn, breathe or send its dot round; the gray rings can ripple (light up
 * one after another), take turns stepping like a dial, or one of them can
 * turn. Only these move; the rest of the picture stays exactly as drawn.
 * The movement is plain CSS (components/brand/rings.css plus the keyframes
 * returned here); this only decides which part of which ring moves, and when.
 */

export type OrangeMotion = {
  kind: "still" | "turn" | "breathe" | "orbit"
  /** turn: one full turn. orbit: one lap of the dot. breathe: one grow, or one shrink. */
  seconds?: number
  /** Anticlockwise instead of clockwise (turn, orbit). */
  reverse?: boolean
  /** breathe: how much longer the arc gets, as a share of the whole ring (0.08 = 8%). */
  grow?: number
}

export type GrayMotion = {
  kind: "still" | "ripple" | "dial" | "turn"
  /** ripple: seconds from one wave to the next. */
  every?: number
  /** ripple: seconds for the wave to cross from the first ring to the last. */
  cross?: number
  /** ripple: seconds each ring stays lit, up and down. */
  glow?: number
  /** ripple: how bright a lit ring gets, as a share of the text color (the rest of the time 0.22, like --line). */
  strength?: number
  /** ripple: from the outside in. */
  inward?: boolean
  /** dial: how many rings take turns. */
  rings?: number
  /** dial: how far each one turns, in degrees (each ring a little more or less). */
  step?: number
  /** dial: seconds between one ring's step and the next. turn: one full turn. */
  seconds?: number
  /** turn: anticlockwise instead of clockwise. */
  reverse?: boolean
}

export type RingMotion = { orange?: OrangeMotion; gray?: GrayMotion }

/** The settings each kind starts from. */
export const motionDefaults = {
  orange: {
    turn: { seconds: 120, reverse: false },
    breathe: { seconds: 8, grow: 0.08 },
    orbit: { seconds: 40, reverse: false },
  },
  gray: {
    ripple: { every: 10, cross: 1.5, glow: 1.6, strength: 0.5, inward: false },
    dial: { rings: 4, step: 24, seconds: 5 },
    turn: { seconds: 170, reverse: true },
  },
} as const

/** Named mixes. "ripple-turn" is the gray rings rippling while the orange ring turns. */
export const ringPresets = {
  still: {},
  "ripple-turn": { orange: { kind: "turn" }, gray: { kind: "ripple" } },
  turn: { orange: { kind: "turn" } },
  breathe: { orange: { kind: "breathe" } },
  orbit: { orange: { kind: "orbit" } },
  pair: { orange: { kind: "turn" }, gray: { kind: "turn" } },
  dial: { gray: { kind: "dial" } },
  ripple: { gray: { kind: "ripple" } },
} satisfies Record<string, RingMotion>
export type RingPreset = keyof typeof ringPresets

/** One moving part: its data-move kind and the CSS variables rings.css reads. */
export type Move = { kind: string; vars: Record<string, string> }
/** Per ring: the whole ring, its circle only, or its dot only. */
export type RingMove = { ring?: Move; circle?: Move; dot?: Move }

const pct = (n: number) => `${(Math.min(1, Math.max(0, n)) * 100).toFixed(2)}%`
const sec = (n: number) => `${n.toFixed(2)}s`

/**
 * Which rings move, and how, plus any keyframes the timing needs (ripple and
 * dial have their own, named after their settings, so two pictures with the
 * same settings share them). Put `css` in a <style> next to the rings. Uses
 * its own random numbers, so the picture itself stays the same.
 */
export function ringMoves(motion: RingMotion, list: Arc[], seed: string): { moves: RingMove[]; css: string } {
  const moves: RingMove[] = list.map(() => ({}))
  const accent = list.findIndex((a) => a.accent)
  const random = rng(hash(seed) + 41)
  const faint = list.map((_, i) => i).filter((i) => i !== accent)
  const css: string[] = []
  const orange = motion.orange
  const gray = motion.gray

  if (orange?.kind === "turn" || orange?.kind === "orbit") {
    const o = { ...motionDefaults.orange[orange.kind], ...orange }
    const part = { kind: "turn", vars: { "--duration": sec(o.seconds), "--turn": o.reverse ? "-360deg" : "360deg" } }
    if (orange.kind === "turn") moves[accent].ring = part
    else moves[accent].dot = part
  } else if (orange?.kind === "breathe") {
    // The arc grows by `grow` of the circle and back; its dot turns by the same share.
    const o = { ...motionDefaults.orange.breathe, ...orange }
    const a = list[accent]
    const c = 2 * Math.PI * a.r
    const drawn = Number(a.dash.split(" ")[0])
    const longer = Math.min(c * 0.98, drawn + c * o.grow)
    const turn = ((longer - drawn) / c) * 360
    moves[accent].circle = { kind: "breathe", vars: { "--duration": sec(o.seconds), "--dash-from": `${f2(drawn)} ${f2(c - drawn)}`, "--dash-to": `${f2(longer)} ${f2(c - longer)}` } }
    moves[accent].dot = { kind: "breathe-dot", vars: { "--duration": sec(o.seconds), "--shift": `${turn.toFixed(2)}deg` } }
  }

  if (gray?.kind === "ripple") {
    // Every ring runs the same keyframes, each a little later than the one inside it.
    const g = { ...motionDefaults.gray.ripple, ...gray }
    const every = Math.max(g.every, 0.5)
    const glow = Math.min(g.glow, every * 0.9)
    const name = `rings-ripple-${hash(`${every}|${glow}|${g.strength}`).toString(36)}`
    css.push(`@keyframes ${name}{0%,${pct(glow / every)},100%{stroke:var(--line)}${pct(glow / 2 / every)}{stroke:color-mix(in oklab,var(--foreground) ${pct(g.strength)},transparent)}}`)
    const order = g.inward ? [...faint].reverse() : faint
    const gap = order.length > 1 ? g.cross / (order.length - 1) : 0
    order.forEach((i, n) => (moves[i].circle = { kind: "ripple", vars: { "--keyframes": name, "--duration": sec(every), "--delay": sec(n * gap) } }))
  } else if (gray?.kind === "dial") {
    // A few rings, inside to out. Each turns a step in its own slot, rests, and turns back half a cycle later.
    const g = { ...motionDefaults.gray.dial, ...gray }
    const count = Math.max(1, Math.min(faint.length, Math.round(g.rings)))
    const cycle = count * g.seconds * 2
    const moving = Math.min(2, g.seconds * 0.6) / cycle
    const name = `rings-dial-${hash(`${count}|${g.seconds}`).toString(36)}`
    css.push(`@keyframes ${name}{0%{rotate:0deg}${pct(moving)},50%{rotate:var(--step)}${pct(0.5 + moving)},100%{rotate:0deg}}`)
    const picked = faint
      .map((i) => ({ i, k: random() }))
      .sort((x, y) => x.k - y.k)
      .slice(0, count)
      .map((p) => p.i)
      .sort((x, y) => x - y)
    picked.forEach((i, n) => {
      const step = g.step * (0.75 + random() * 0.5) * (random() < 0.5 ? -1 : 1)
      moves[i].ring = { kind: "dial", vars: { "--keyframes": name, "--duration": sec(cycle), "--delay": sec(n * g.seconds), "--step": `${step.toFixed(1)}deg` } }
    })
  } else if (gray?.kind === "turn") {
    // One bigger gray ring, a couple outside the orange one.
    const g = { ...motionDefaults.gray.turn, ...gray }
    const other = Math.min(list.length - 2, accent + 2 + Math.floor(random() * 3))
    moves[other].ring = { kind: "turn", vars: { "--duration": sec(g.seconds), "--turn": g.reverse ? "-360deg" : "360deg" } }
  }

  return { moves, css: css.join("") }
}
