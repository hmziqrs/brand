// Shared drawing for the logos target (assets.md phase 2): the tile, the
// wordmark and the lockup, drawn from the logo recipe in brand-core
// (`logo.ts` defaults) and resolved theme colors, exactly like the social
// templates draw their copies — no logo measurement and no hex value is
// typed here. The letters are outlined through the static font instead of
// written as `<text>`, so every export looks right anywhere, without the
// font installed (assets.md, "Exported SVGs have resolved colors and
// outlined text"), and the SVG and the PNG of the same logo come out of one
// code path.
import { logoDefaults } from "../../../packages/brand-core/src/logo.ts"

type Color = { rgb: [number, number, number]; alpha: number }

/** A text run's outlines: its path data and its exact ink box. */
type OutlinePath = { toPathData(decimalPlaces: number): string; getBoundingBox(): { x1: number; y1: number; x2: number; y2: number } }
type OutlineFont = {
  getPath(text: string, x: number, y: number, size: number, opts: { kerning: boolean; letterSpacing: number }): OutlinePath
}

/** What the engine hands the render: the resolver, the paints, the renderer
 *  and the outlined font. Same shape as the social target's Ctx, minus the
 *  pieces logos never use. */
export type Ctx = {
  Resvg: new (svg: string, options: unknown) => ResvgLike
  outlineFont: OutlineFont
  color: (tokens: Record<string, string>, name: string) => Color
  svgPaint: (c: Color, as?: "fill" | "stroke") => string
}
type ResvgLike = { render(): { asPng(): Buffer } }

/** A text run's ink, measured from the outlines themselves: `left`, `top`
 *  and `bottom` are relative to a baseline at y = 0 and a left edge at x = 0
 *  (top above the baseline is negative), like the social `Measured`. */
export type Measured = { left: number; width: number; top: number; bottom: number }

const round = (x: number) => Number(x.toFixed(2))

/** A text run as an outlined `<path>`, and its ink box. */
export function outlinedRun(ctx: Ctx, text: string, size: number): { d: string; ink: Measured } {
  const look = logoDefaults
  const path = ctx.outlineFont.getPath(text, 0, 0, size, { kerning: true, letterSpacing: look.tracking })
  const bb = path.getBoundingBox()
  return { d: path.toPathData(2), ink: { left: bb.x1, width: bb.x2 - bb.x1, top: bb.y1, bottom: bb.y2 } }
}

/** Resolves a look color ("current" is the page's text color) to a paint. */
export function lookPaint(ctx: Ctx, page: Record<string, string>, name: string): string {
  const token = name === "current" ? "foreground" : name
  return ctx.svgPaint(ctx.color(page, token))
}

/**
 * The symbol and the orange square — the mark's content, without the tile —
 * sized to a `fontSize` for the symbol letters, exactly as the social
 * templates and the `Mark` component draw it. The square sits on the
 * baseline after the last letter. Returns the SVG plus the ink box, so
 * callers center it by its ink.
 */
export function symbolAndSquare(ctx: Ctx, page: Record<string, string>, symbol: string, fontSize: number): { svg: (x: number, y: number) => string; ink: { width: number; top: number; bottom: number } } {
  const look = logoDefaults
  const square = look.markSize * fontSize
  const gap = look.gap * fontSize
  const run = outlinedRun(ctx, symbol, fontSize)
  const ink = {
    width: run.ink.width + gap + square,
    top: Math.min(run.ink.top, -square),
    bottom: Math.max(run.ink.bottom, 0),
  }
  const svg = (x: number, y: number) =>
    [
      `<path transform="translate(${round(x - run.ink.left)} ${round(y)})" d="${run.d}" ${lookPaint(ctx, page, look.symbol)}/>`,
      `<rect x="${round(x + run.ink.width + gap)}" y="${round(y - square)}" width="${round(square)}" height="${round(square)}" ${lookPaint(ctx, page, look.markSquare)}/>`,
    ].join("\n")
  return { svg, ink }
}

/** The tile: the mark on its rounded square in the page's text color, from
 *  the logo recipe, centered by its ink. Returns the drawing for a canvas of
 *  `size` × `size`, origin top left. */
export function tile(ctx: Ctx, page: Record<string, string>, symbol: string, size: number): string {
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
 * logo recipe, drawn on a baseline. Returns the drawing and its ink box, so
 * callers place it and wrap a tight viewBox around it.
 */
export function wordmark(ctx: Ctx, page: Record<string, string>, name: string, size: number): { svg: (x: number, y: number) => string; ink: { left: number; width: number; top: number; bottom: number } } {
  const look = logoDefaults
  const square = look.shape === "none" ? 0 : look.size * size
  const gap = look.gap * size
  const run = outlinedRun(ctx, name, size)
  const ink = {
    left: run.ink.left,
    width: run.ink.width + gap + square,
    top: Math.min(run.ink.top, -square),
    bottom: Math.max(run.ink.bottom, 0),
  }
  const svg = (x: number, y: number) => {
    const out = [`<path transform="translate(${round(x - run.ink.left)} ${round(y)})" d="${run.d}" ${lookPaint(ctx, page, look.color)}/>`]
    if (square > 0) {
      out.push(
        `<rect x="${round(x + run.ink.width + gap)}" y="${round(y - square)}" width="${round(square)}" height="${round(square)}" ${lookPaint(ctx, page, look.square)}/>`,
      )
    }
    return out.join("\n")
  }
  return { svg, ink }
}

/** Wraps a drawing in an SVG document with a tight viewBox. */
export function svgDocument(width: number, height: number, body: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${round(width)} ${round(height)}">\n${body}\n</svg>\n`
}

/** Rasterizes an SVG to a PNG the given number of pixels wide (the height
 *  follows the viewBox, so square art stays square). */
export function png(ctx: Ctx, svg: string, width: number): Buffer {
  return new ctx.Resvg(svg, { fitTo: { mode: "width", value: width } }).render().asPng()
}
