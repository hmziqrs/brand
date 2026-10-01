// Shared drawing for the social templates. Text is measured with the real
// static fonts through resvg's bounding box, and the mark and wordmark are
// drawn from the logo recipe in brand-core (`logo.ts` defaults), so an
// export can never drift from the on-page logo: no logo measurement and no
// hex value is typed here. Colors arrive resolved from theme.css as SVG
// paint attributes (alpha kept out of the hex), the same way the test card
// does it.
import { logoDefaults } from "../../../packages/brand-core/src/logo.ts"

/** What the engine hands every render: the resolver, the paints, the
 *  renderer and the static font files. */
export type Ctx = {
  Resvg: new (svg: string, options: unknown) => ResvgLike
  fontFiles: string[]
  color: (tokens: Record<string, string>, name: string) => Color
  svgPaint: (c: Color, as?: "fill" | "stroke") => string
}
type Color = { rgb: [number, number, number]; alpha: number }
type ResvgLike = {
  getBBox(): { x: number; y: number; width: number; height: number } | undefined
  render(): { asPng(): Buffer }
}

/** A text run's ink, measured with the real font. `left`, `top` and `bottom`
 *  are relative to a baseline at y = 0 and a left edge at x = 0, so callers
 *  can place runs by their ink, not their em box. */
export type Measured = { left: number; width: number; top: number; bottom: number }

const sans = "Onest"
const round = (x: number) => Number(x.toFixed(2))
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")

export type TextOptions = { size: number; weight?: number; tracking?: number }

const fontAttrs = (o: TextOptions) =>
  `font-family="${sans}" font-weight="${o.weight ?? 400}" font-size="${round(o.size)}" letter-spacing="${round((o.tracking ?? 0) * o.size)}"`

const measurements = new Map<string, Measured>()

/** Measures a text run with the real font files, once per distinct run. */
export function measure(ctx: Ctx, text: string, o: TextOptions): Measured {
  const key = `${text}|${fontAttrs(o)}`
  const hit = measurements.get(key)
  if (hit) return hit
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><text x="0" y="0" ${fontAttrs(o)}>${esc(text)}</text></svg>`
  const bbox = new ctx.Resvg(svg, { font: { fontFiles: ctx.fontFiles, loadSystemFonts: false, defaultFontFamily: sans } }).getBBox()
  if (!bbox) throw new Error(`Could not measure ${JSON.stringify(text)}`)
  const m = { left: bbox.x, width: bbox.width, top: bbox.y, bottom: bbox.y + bbox.height }
  measurements.set(key, m)
  return m
}

/** A text run as an SVG element, baseline at `y`, ink starting at `x`. */
export function text(ctx: Ctx, str: string, x: number, y: number, o: TextOptions, paint: string): string {
  void ctx
  return `<text x="${round(x - measure(ctx, str, o).left)}" y="${round(y)}" ${fontAttrs(o)} ${paint}>${esc(str)}</text>`
}

/** Greedy word wrap against measured widths. */
export function wrap(ctx: Ctx, str: string, o: TextOptions, maxWidth: number): string[] {
  const words = str.split(" ")
  const lines: string[] = []
  let line = ""
  for (const word of words) {
    const next = line ? `${line} ${word}` : word
    if (line && measure(ctx, next, o).width > maxWidth) {
      lines.push(line)
      line = word
    } else {
      line = next
    }
  }
  if (line) lines.push(line)
  return lines
}

// --- the logo pieces, drawn from logo.ts ----------------------------------

/** Resolves a look color ("current" is the page's text color) to a paint. */
function lookPaint(ctx: Ctx, page: Record<string, string>, name: string): string {
  const token = name === "current" ? "foreground" : name
  return ctx.svgPaint(ctx.color(page, token))
}

/**
 * The symbol and the orange square — the mark's content, without the tile —
 * sized to a `fontSize` for the symbol letters. The square sits on the
 * baseline after the last letter, as the inline `<i>` does on the page.
 * Returns the SVG plus the ink box, so callers center it by its ink.
 */
export function symbolAndSquare(ctx: Ctx, page: Record<string, string>, symbol: string, fontSize: number): { svg: (x: number, y: number) => string; ink: { width: number; top: number; bottom: number } } {
  const look = logoDefaults
  const square = look.markSize * fontSize
  const gap = look.gap * fontSize
  const letters = measure(ctx, symbol, { size: fontSize, weight: look.weight, tracking: look.tracking })
  const ink = {
    width: letters.width + gap + square,
    top: Math.min(letters.top, -square),
    bottom: Math.max(letters.bottom, 0),
  }
  const svg = (x: number, y: number) =>
    [
      text(ctx, symbol, x, y, { size: fontSize, weight: look.weight, tracking: look.tracking }, lookPaint(ctx, page, look.symbol)),
      `<rect x="${round(x + letters.width + gap)}" y="${round(y - square)}" width="${round(square)}" height="${round(square)}" ${lookPaint(ctx, page, look.markSquare)}/>`,
    ].join("\n")
  return { svg, ink }
}

/**
 * The mark: the symbol and square on a rounded tile in the page's text
 * color, everything from the logo recipe. The content is centered by its
 * ink, at the size asked for.
 */
export function mark(ctx: Ctx, page: Record<string, string>, symbol: string, size: number): string {
  const look = logoDefaults
  const fontSize = look.symbolSize * size
  const { svg, ink } = symbolAndSquare(ctx, page, symbol, fontSize)
  const x = (size - ink.width) / 2
  const y = size / 2 - (ink.top + ink.bottom) / 2
  return [
    `<rect x="0" y="0" width="${round(size)}" height="${round(size)}" rx="${round((look.corner / 100) * size)}" ${lookPaint(ctx, page, look.tile)}/>`,
    svg(x, y),
  ].join("\n")
}

/**
 * The wordmark: the name in Onest 600 ending in the orange square, from the
 * logo recipe. Drawn into a group the caller places; returns its ink width
 * so callers can right-align or follow it.
 */
export function wordmark(ctx: Ctx, page: Record<string, string>, name: string, o: TextOptions): { svg: (x: number, y: number) => string; width: number; bottom: number } {
  const look = logoDefaults
  const square = look.shape === "none" ? 0 : look.size * o.size
  const gap = look.gap * o.size
  const letters = measure(ctx, name, { size: o.size, weight: look.weight, tracking: look.tracking })
  const svg = (x: number, y: number) => {
    const out = [text(ctx, name, x, y, { size: o.size, weight: look.weight, tracking: look.tracking }, lookPaint(ctx, page, look.color))]
    if (square > 0) {
      out.push(
        `<rect x="${round(x + letters.width + gap)}" y="${round(y - square)}" width="${round(square)}" height="${round(square)}" ${lookPaint(ctx, page, look.square)}/>`,
      )
    }
    return out.join("\n")
  }
  return { svg, width: letters.width + gap + square, bottom: Math.max(letters.bottom, 0) }
}

/** Renders a card to PNG with the static fonts, system fonts off. */
export function png(ctx: Ctx, width: number, height: number, body: string): Buffer {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">\n${body}\n</svg>\n`
  return new ctx.Resvg(svg, { font: { fontFiles: ctx.fontFiles, loadSystemFonts: false, defaultFontFamily: sans } })
    .render()
    .asPng()
}
