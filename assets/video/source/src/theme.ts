/*
 * Everything the video paints, resolved from the real tokens by the brand's
 * own resolver (assets.md: "Use colors from the resolver (with alpha)"). Video
 * is a browser render, so it uses the variable WOFF2 and the dark mode tokens
 * — the same colors the site shows, with alpha kept: faint rings stay faint.
 */
import { color, readTheme, toHex } from "@hmziq/brand-core/color"
import type { RingPalette } from "@hmziq/brand-core/motion/frame"
import themeCss from "@hmziq/brand-core/theme.css"

const theme = readTheme(themeCss)
const tokens = theme.dark

/** The ring paints the frame adapter interpolates. */
export const palette: RingPalette = {
  primary: color(tokens, "primary"),
  line: color(tokens, "line"),
  foreground: color(tokens, "foreground"),
}

/** The page paints, as hex. */
export const paint = {
  background: toHex(color(tokens, "background").rgb),
  foreground: toHex(color(tokens, "foreground").rgb),
  muted: toHex(color(tokens, "muted-foreground").rgb),
  primary: toHex(color(tokens, "primary").rgb),
} as const
