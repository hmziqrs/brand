/*
 * Reads theme.css and measures contrast, so the numbers in the docs and the
 * CI check (scripts/check-contrast.mjs) always come from the real tokens.
 * Plain TypeScript with no imports: Node runs it directly, Vite bundles it.
 */

/** Gamma-encoded sRGB, each channel 0–1. */
export type Rgb = [number, number, number]
/** OKLab: lightness 0–1, then the a and b axes. */
type Lab = [number, number, number]
export type Color = { rgb: Rgb; alpha: number }
export type Mode = "dark" | "light"
export type Tokens = Record<string, string>
/** A `.band-*` rule in theme.css, layered over a mode by `inBand`. */
export type Band = string
export type Theme = Record<Mode, Tokens> & { bands: Record<Band, Tokens> }

/** The supporting colors, in the order they appear in theme.css. */
export const hues = ["red", "orange", "yellow", "green", "teal", "blue", "purple", "pink"] as const
export type Hue = (typeof hues)[number]

/** What each color is for. Shown in the docs and in BRAND.md. */
export const hueUses: Record<Hue, { role?: string; use: string }> = {
  red: { role: "destructive", use: "Errors, and buttons that delete things." },
  orange: { role: "primary", use: "The brand: the main button, links, focus rings, code keywords." },
  yellow: { role: "warning", use: "Warnings and work in progress." },
  green: { role: "success", use: "Done, shipped, available, saved." },
  teal: { use: "Categories and charts." },
  blue: { role: "info", use: "Tips and information. Function names in code." },
  purple: { use: "Categories and charts. Numbers in code." },
  pink: { use: "Categories and charts." },
}

/** How strong a soft fill is: `bg-{color}/10`, and `dark:bg-{color}/20` in dark mode. */
export const softAlpha: Record<Mode, number> = { light: 0.1, dark: 0.2 }

// --- color math ---------------------------------------------------------------

const oklch = /^oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+)\s*(?:\/\s*([\d.]+)(%?))?\s*\)$/

function oklchToLab(l: number, c: number, h: number): Lab {
  return [l, c * Math.cos((h * Math.PI) / 180), c * Math.sin((h * Math.PI) / 180)]
}

function labToRgb([l, a, b]: Lab): Rgb {
  const l_ = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m_ = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s_ = (l - 0.0894841775 * a - 1.291485548 * b) ** 3
  const linear = [
    4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
    -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
    -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_,
  ]
  return linear.map((v) => {
    const x = Math.min(1, Math.max(0, v))
    return x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055
  }) as Rgb
}

/** Parses `oklch(L C H)`, `oklch(L C H / A%)` and `#rrggbb`. */
export function parseColor(value: string): Color | null {
  const v = value.trim()
  const ok = v.match(oklch)
  if (ok) {
    const l = Number(ok[1]) / (ok[2] ? 100 : 1)
    const alpha = ok[5] === undefined ? 1 : Number(ok[5]) / (ok[6] ? 100 : 1)
    return { rgb: labToRgb(oklchToLab(l, Number(ok[3]), Number(ok[4]))), alpha }
  }
  const hex = v.match(/^#([0-9a-f]{6})$/i)
  if (hex) {
    const n = parseInt(hex[1], 16)
    return { rgb: [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255], alpha: 1 }
  }
  return null
}

/** Paints `top` over an opaque `bottom`, the way browsers blend. */
export function over(top: Color, bottom: Rgb): Rgb {
  return top.rgb.map((v, i) => v * top.alpha + bottom[i] * (1 - top.alpha)) as Rgb
}

function luminance([r, g, b]: Rgb) {
  const lin = (v: number) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}

/** WCAG 2 contrast ratio, 1–21. */
export function contrast(a: Rgb, b: Rgb) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

export function toHex(rgb: Rgb) {
  return "#" + rgb.map((v) => Math.round(v * 255).toString(16).padStart(2, "0")).join("").toUpperCase()
}

/**
 * A color as an SVG paint attribute, ready to drop into a tag. Alpha becomes
 * its own attribute (`fill-opacity`), never a thicker hex: `toHex` drops the
 * channel, and a faint token like the dark `--line` (alpha 0.22) would come
 * out as a solid near-white, turning faint rings solid.
 */
export function svgPaint(c: Color, as: "fill" | "stroke" = "fill"): string {
  const hex = toHex(c.rgb)
  if (c.alpha >= 1) return `${as}="${hex}"`
  return `${as}="${hex}" ${as}-opacity="${Number(c.alpha.toFixed(3))}"`
}

// --- reading theme.css ----------------------------------------------------------

/**
 * Collects the custom properties that apply to `<html>` in each mode, in
 * cascade order: light gets every `:root` rule, dark gets every `:root` and
 * `.dark` rule (the html element matches both when it has the dark class).
 * Band rules (`.band-orange`, `.band-gray`) override only inside the band, in
 * either mode, so they're collected on their own instead of being copied into
 * either palette; `inBand` layers them over a mode at resolve time.
 */
export function readTheme(css: string): Theme {
  const light: Tokens = {}
  const dark: Tokens = {}
  const bands: Record<Band, Tokens> = {}
  const source = css.replace(/\/\*[\s\S]*?\*\//g, "")
  for (const [, head, body] of source.matchAll(/([^{}]*)\{([^{}]*)\}/g)) {
    const selectors = head.split(";").at(-1)!.split(",").map((s) => s.trim())
    const isRoot = selectors.includes(":root")
    const isDark = selectors.includes(".dark")
    const band = selectors.find((s) => /^\.band-[\w-]+$/.test(s))?.slice(1)
    if (!isRoot && !isDark && !band) continue
    for (const decl of body.split(";")) {
      const m = decl.match(/^\s*(--[\w-]+)\s*:\s*([\s\S]+?)\s*$/)
      if (!m) continue
      if (isRoot) light[m[1]] = m[2]
      if (isRoot || isDark) dark[m[1]] = m[2]
      if (band) (bands[band] ??= {})[m[1]] = m[2]
    }
  }
  return { light, dark, bands }
}

/**
 * The tokens that apply inside a band placed in a page in `mode`: the mode's
 * tokens with the band's overrides on top, the way the cascade layers them.
 * `var()` references still resolve in the result, so a band's
 * `--background: var(--orange)` picks up the mode's orange.
 */
export function inBand(theme: Theme, mode: Mode, band: Band): Tokens {
  const overrides = theme.bands[band]
  if (!overrides) throw new Error(`theme.css has no .${band} rule`)
  return { ...theme[mode], ...overrides }
}

/** Follows `var(--x)` references until it reaches a real value. */
export function resolve(tokens: Tokens, name: string, seen = new Set<string>()): string {
  const key = name.startsWith("--") ? name : `--${name}`
  const value = tokens[key]
  if (value === undefined) throw new Error(`theme.css has no ${key}`)
  if (seen.has(key)) throw new Error(`theme.css: ${key} refers to itself`)
  seen.add(key)
  const ref = value.match(/^var\(\s*(--[\w-]+)\s*(?:,[^)]*)?\)$/)
  return ref ? resolve(tokens, ref[1], seen) : value
}

function lab(tokens: Tokens, name: string): Lab {
  const value = resolve(tokens, name)
  const ok = value.match(oklch)
  if (!ok) throw new Error(`Can't mix --${name}: ${value}`)
  return oklchToLab(Number(ok[1]) / (ok[2] ? 100 : 1), Number(ok[3]), Number(ok[4]))
}

// color-mix(in oklab, var(--a) N%, var(--b)) or color-mix(in oklab, var(--a) N%, transparent)
const mix = /^color-mix\(\s*in oklab\s*,\s*var\((--[\w-]+)\)\s+([\d.]+)%\s*,\s*(?:var\((--[\w-]+)\)|transparent)\s*\)$/

export function color(tokens: Tokens, name: string): Color {
  const value = resolve(tokens, name)
  const m = value.match(mix)
  if (m) {
    const t = Number(m[2]) / 100
    if (!m[3]) {
      const top = color(tokens, m[1])
      return { rgb: top.rgb, alpha: top.alpha * t }
    }
    const [a, b] = [lab(tokens, m[1]), lab(tokens, m[3])]
    return { rgb: labToRgb(a.map((v, i) => v * t + b[i] * (1 - t)) as Lab), alpha: 1 }
  }
  const parsed = parseColor(value)
  if (!parsed) throw new Error(`Can't read --${name}: ${value}`)
  return parsed
}

// --- the pairs people actually read ----------------------------------------------

type Pair = {
  group: "Text" | "Oxide" | "Colors" | "Code" | "Lines"
  label: string
  fg: string
  bg: string
  /** Paint `fg` at this strength over `bg` first (soft fills). */
  soft?: boolean
  /** 4.5 for text, 3 for icons and focus rings. */
  min: number
}

const title = (s: string) => s[0].toUpperCase() + s.slice(1)

export const pairs: Pair[] = [
  { group: "Text", label: "Body text on the page", fg: "foreground", bg: "background", min: 4.5 },
  { group: "Text", label: "Secondary text on the page", fg: "muted-foreground", bg: "background", min: 4.5 },
  { group: "Text", label: "Secondary text on a card", fg: "muted-foreground", bg: "card", min: 4.5 },
  { group: "Text", label: "Secondary text on a muted surface", fg: "muted-foreground", bg: "muted", min: 4.5 },
  { group: "Oxide", label: "Button text on oxide", fg: "primary-foreground", bg: "primary", min: 4.5 },
  { group: "Oxide", label: "Oxide links on the page", fg: "primary", bg: "background", min: 4.5 },
  { group: "Oxide", label: "Oxide text on a card", fg: "primary", bg: "card", min: 4.5 },
  { group: "Oxide", label: "Focus ring on the page", fg: "ring", bg: "background", min: 3 },
  { group: "Oxide", label: "Text on the orange band", fg: "on-orange", bg: "orange", min: 4.5 },
  { group: "Oxide", label: "Code and hover on the orange band", fg: "on-orange", bg: "band-orange-muted", min: 4.5 },
  { group: "Text", label: "Text on a gray band", fg: "foreground", bg: "band", min: 4.5 },
  { group: "Text", label: "Secondary text on a gray band", fg: "muted-foreground", bg: "band", min: 4.5 },
  ...hues.flatMap((hue): Pair[] => [
    { group: "Colors", label: `${title(hue)} text on a card`, fg: hue, bg: "card", min: 4.5 },
    { group: "Colors", label: `${title(hue)} text on its soft fill`, fg: hue, bg: "card", soft: true, min: 4.5 },
  ]),
  { group: "Colors", label: "Error text on its soft fill", fg: "destructive", bg: "card", soft: true, min: 4.5 },
  ...Object.entries({
    keyword: "Code keywords",
    function: "Code function and type names",
    string: "Code strings",
    constant: "Code numbers and constants",
    comment: "Code comments",
    punctuation: "Code punctuation",
  }).map(
    ([token, label]): Pair => ({ group: "Code", label, fg: `code-token-${token}`, bg: "code-background", min: 4.5 }),
  ),
]

export type Result = Pair & { ratio: Record<Mode, number>; pass: boolean }

export function measure(css: string): Result[] {
  const theme = readTheme(css)
  return pairs.map((pair) => {
    const ratio = {} as Record<Mode, number>
    for (const mode of ["dark", "light"] as const) {
      const tokens = theme[mode]
      const page = color(tokens, "background").rgb
      const bg = over(color(tokens, pair.bg), page)
      const fg = color(tokens, pair.fg)
      const surface = pair.soft ? over({ rgb: fg.rgb, alpha: softAlpha[mode] }, bg) : bg
      ratio[mode] = contrast(over(fg, surface), surface)
    }
    return { ...pair, ratio, pass: ratio.dark >= pair.min && ratio.light >= pair.min }
  })
}
