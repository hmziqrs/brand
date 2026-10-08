// The .ts extension keeps this runnable by Node directly (type stripping
// resolves no extensionless specifiers), which the asset renderer needs; the
// bundler accepts it just the same.
import { hash } from "./motion/rings.ts"

/*
 * The logo's look: everything about the wordmark (the name ending in the
 * square) and the mark (the symbol and square on a tile) that can be tuned,
 * and how each part moves. Custom → Logo → Tweaker tunes it and exports it
 * as JSON; pass that to <Wordmark look> and <Mark look>. Without a look they
 * are the brand's own logo, drawn exactly as before.
 *
 * Movement is plain CSS: logo.css, next to this package's theme.css, plus
 * keyframes made here from the timing settings. It stops for visitors who
 * ask for reduced motion and pauses with `paused`.
 */

/**
 * A theme color by name (one of logoColors: "foreground", "primary",
 * "mark-square", "green"…), "current" for the text color around the logo,
 * "none" for nothing, or any CSS color typed out in full (hex, oklch(…)).
 */
export type LogoColor = string

export type SquareShape = "square" | "rounded" | "dot" | "diamond" | "bar" | "none"
export type SquareMove = "still" | "pulse" | "fade" | "ripple" | "blink" | "spin" | "bounce"
export type TextMove = "still" | "shimmer" | "wave" | "type"
export type SurfaceMove = "still" | "shimmer" | "breathe"

export type LogoLook = {
  /** The letters: Onest or JetBrains Mono. */
  font: "sans" | "mono"
  /** 300 to 600. The brand's wordmark is 600. */
  weight: number
  /** Letter spacing in em. The brand's is -0.02. */
  tracking: number
  lowercase: boolean
  /** The letters' color. */
  color: LogoColor

  /** The mark at the end of the name. */
  shape: SquareShape
  /** Its size, in em of the letters. */
  size: number
  /** Room before it, in em. */
  gap: number
  /** How far above the baseline it sits, in em. */
  lift: number
  square: LogoColor

  /** The mark: the tile's color ("none" for no tile). */
  tile: LogoColor
  /** The symbol's letters on the tile. */
  symbol: LogoColor
  /** The square on the tile. */
  markSquare: LogoColor
  /** The tile's square, in em of the symbol. */
  markSize: number
  /** How round the tile's corners are, 0 (square) to 50 (a circle), in %. */
  corner: number
  /** The symbol's size on the tile, in em of the tile. */
  symbolSize: number

  /** A plate behind the wordmark ("none" for no plate). */
  plate: LogoColor
  /** Room inside the plate, in em. */
  platePad: number
  /** The plate's corners, in em. */
  plateCorner: number

  /** How the square moves. */
  squareMove: SquareMove
  /** Seconds one move takes. */
  squareSeconds: number
  /** Seconds it rests before the next. */
  squareRest: number
  /** How big the move is, 0 to 1. */
  squareAmount: number

  /** How the letters move. */
  textMove: TextMove
  textSeconds: number
  textRest: number
  textAmount: number
  /** The shimmer's color as it crosses the letters. */
  shine: LogoColor
  /** How wide the shimmer is, as a share of the name. */
  shineWidth: number

  /** How the tile and the plate move. */
  surfaceMove: SurfaceMove
  surfaceSeconds: number
  surfaceRest: number
  surfaceAmount: number
  /** The sheen's color as it crosses the tile. */
  sheen: LogoColor

  /** Play every move once instead of over and over. */
  once: boolean
  /** Seconds before anything starts. */
  delay: number
}

/** The brand's own logo: the wordmark and mark as drawn everywhere today, standing still. */
export const logoDefaults: LogoLook = {
  font: "sans",
  weight: 600,
  tracking: -0.02,
  lowercase: false,
  color: "current",
  shape: "square",
  size: 0.36,
  gap: 0.07,
  lift: 0,
  square: "primary",
  tile: "foreground",
  symbol: "background",
  markSquare: "mark-square",
  markSize: 0.3,
  corner: 22,
  symbolSize: 0.42,
  plate: "none",
  platePad: 0.35,
  plateCorner: 0.25,
  squareMove: "still",
  squareSeconds: 1.6,
  squareRest: 2.4,
  squareAmount: 0.5,
  textMove: "still",
  textSeconds: 1.6,
  textRest: 3,
  textAmount: 0.5,
  shine: "mark-square",
  shineWidth: 0.25,
  surfaceMove: "still",
  surfaceSeconds: 1.4,
  surfaceRest: 3.6,
  surfaceAmount: 0.5,
  sheen: "mark-square",
  once: false,
  delay: 0,
}

/** The theme colors a look can name. */
export const logoColors = ["current", "foreground", "background", "muted-foreground", "primary", "mark-square", "orange", "on-orange", "band", "line", "red", "yellow", "green", "teal", "blue", "purple", "pink"] as const

/** A look's color as CSS. */
export function paint(color: LogoColor) {
  if (color === "current") return "currentColor"
  if (color === "none") return "transparent"
  return (logoColors as readonly string[]).includes(color) ? `var(--${color})` : color
}

const f = (x: number) => Number(x.toFixed(3))
const pct = (x: number) => `${f(Math.min(1, Math.max(0, x)) * 100)}%`
const sec = (x: number) => `${f(x)}s`

/**
 * The movement for a look: CSS variables for the logo's root, the keyframes
 * they name, and for "type", one keyframes name per letter (`letters` is how
 * many letters there are). Each move runs for its seconds, then rests.
 */
export function logoMotion(look: LogoLook, letters: number) {
  const vars: Record<string, string> = {
    "--logo-delay": sec(look.delay),
    "--logo-count": look.once ? "1" : "infinite",
  }
  const css: string[] = []
  const keyframes = (kind: string, body: string) => {
    const name = `logo-${kind}-${hash(body).toString(36)}`
    css.push(`@keyframes ${name}{${body}}`)
    return name
  }
  const cycle = (seconds: number, rest: number) => ({ time: sec(seconds + rest), a: seconds / (seconds + rest) })

  if (look.squareMove !== "still" && look.shape !== "none") {
    const { time, a } = cycle(look.squareSeconds, look.squareRest)
    const x = look.squareAmount
    const body = {
      pulse: `0%,${pct(a)},100%{scale:1}${pct(a / 2)}{scale:${f(1 + 0.6 * x)}}`,
      fade: `0%,${pct(a)},100%{opacity:1}${pct(a / 2)}{opacity:${f(1 - 0.85 * x)}}`,
      // On two outlines of the square that spread out and fade, one a little after the other.
      // They grow by moving their edges, not by scaling, so the line stays thin.
      ripple: `0%{inset:0;opacity:0.9}${pct(a)},100%{inset:calc(var(--logo-square-size) * ${f(-2 * x)});opacity:0}`,
      // Held steps, like a cursor: on, off, on.
      blink: `0%{opacity:1}${pct(a / 2)}{opacity:0}${pct(a)},100%{opacity:1}`,
      spin: `0%{rotate:var(--logo-turn,0deg)}${pct(a)},100%{rotate:calc(var(--logo-turn,0deg) + var(--logo-spin,90deg))}`,
      bounce: `0%,${pct(a * 0.7)},${pct(a)},100%{translate:0 0}${pct(a * 0.35)}{translate:0 ${f(-0.55 * x)}em}${pct(a * 0.85)}{translate:0 ${f(-0.12 * x)}em}`,
    }[look.squareMove]
    vars["--logo-square-move"] = keyframes("square", body)
    vars["--logo-square-time"] = time
  }

  let perLetter: string[] | undefined
  if (look.textMove !== "still") {
    const { time, a } = cycle(look.textSeconds, look.textRest)
    vars["--logo-text-time"] = time
    if (look.textMove === "shimmer") {
      vars["--logo-text-move"] = keyframes("shimmer", `0%{background-position:100% 0}${pct(a)},100%{background-position:0% 0}`)
      vars["--logo-shine"] = paint(look.shine)
      // The gradient is three names wide, so half the band is a sixth of the width asked for.
      vars["--logo-shine-half"] = `${f((look.shineWidth * 100) / 6)}%`
    } else if (look.textMove === "wave") {
      vars["--logo-text-move"] = keyframes("wave", `0%,${pct(a * 0.4)},100%{translate:0 0}${pct(a * 0.2)}{translate:0 ${f(-0.22 * look.textAmount)}em}`)
      vars["--logo-stagger"] = sec((look.textSeconds * 0.6) / Math.max(1, letters - 1))
    } else {
      // Letters appear one by one; over and over, they all go at the end of the rest and start again.
      // A letter not written yet takes no room (font-size 0), so the square follows the typing like a cursor.
      perLetter = Array.from({ length: letters }, (_, i) => {
        const at = pct((a * (i + 1)) / (letters + 1))
        return keyframes("type", look.once ? `0%{font-size:0}${at},100%{font-size:1em}` : `0%{font-size:0}${at},99.5%{font-size:1em}100%{font-size:0}`)
      })
    }
  }

  if (look.surfaceMove !== "still") {
    const { time, a } = cycle(look.surfaceSeconds, look.surfaceRest)
    vars["--logo-surface-time"] = time
    if (look.surfaceMove === "shimmer") {
      vars["--logo-surface-move"] = keyframes("sheen", `0%{background-position:100% 0}${pct(a)},100%{background-position:0% 0}`)
      vars["--logo-sheen"] = paint(look.sheen)
      vars["--logo-sheen-half"] = `${f(1 + 4 * look.surfaceAmount)}%`
    } else {
      vars["--logo-surface-move"] = keyframes("breathe", `0%,${pct(a)},100%{scale:1}${pct(a / 2)}{scale:${f(1 + 0.08 * look.surfaceAmount)}}`)
    }
  }

  return { vars, css: css.join(""), perLetter }
}
