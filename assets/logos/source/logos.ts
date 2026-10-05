// The logos target (assets.md phases 2–3), one exports folder per site in
// the roster: the tile, wordmark and lockup SVGs, the PNG sizes the plan
// lists, and the site's full icon pack. Dark is the brand's default — the
// same page context the social cards render on — and every mark, wordmark
// and color comes from `logo.ts`'s defaults and theme.css through the
// engine, never copied in.
import { family } from "../../../packages/brand-core/src/family.ts"

import { packFiles, type FullCtx } from "./pack.ts"
import { png, svgDocument, tile, wordmark } from "./parts.ts"
import { settings } from "./settings.ts"

export { settings }

/** The tile SVG: the mark at the master viewBox. */
function tileSvg(ctx: FullCtx, page: Record<string, string>, symbol: string): string {
  return svgDocument(settings.tileViewBox, settings.tileViewBox, tile(ctx, page, symbol, settings.tileViewBox))
}

/** The wordmark SVG: the name on a tight box around its ink. */
function wordmarkSvg(ctx: FullCtx, page: Record<string, string>, name: string): string {
  const run = wordmark(ctx, page, name, settings.wordmarkViewBox)
  // run.svg(x, y) places the ink's left edge at x and the baseline at y, so
  // the tight box starts the ink at 0 and drops the baseline by the ascent.
  return svgDocument(run.ink.width, run.ink.bottom - run.ink.top, run.svg(0, -run.ink.top))
}

/** The lockup SVG: the mark beside the wordmark, centers aligned. */
function lockupSvg(ctx: FullCtx, page: Record<string, string>, name: string, symbol: string): string {
  const { tileSize, wordmarkSize, gap } = settings.lockup
  const run = wordmark(ctx, page, name, wordmarkSize)
  const width = tileSize + gap + run.ink.width
  const height = Math.max(tileSize, run.ink.bottom - run.ink.top)
  const wordmarkY = height / 2 - (run.ink.top + run.ink.bottom) / 2
  const body = [
    `<g transform="translate(0 ${((height - tileSize) / 2).toFixed(2)})">${tile(ctx, page, symbol, tileSize)}</g>`,
    run.svg(tileSize + gap, wordmarkY),
  ].join("\n")
  return svgDocument(width, height, body)
}

export async function render(ctx: FullCtx): Promise<Record<string, Buffer | string>> {
  const page = ctx.theme.dark
  const files: Record<string, Buffer | string> = {}

  for (const site of family) {
    const folder = `${site.id}/`
    // Phase 2: the three SVGs, the mark PNGs, the wordmark and lockup PNGs.
    files[`${folder}tile.svg`] = tileSvg(ctx, page, site.symbol)
    files[`${folder}wordmark.svg`] = wordmarkSvg(ctx, page, site.name)
    files[`${folder}lockup.svg`] = lockupSvg(ctx, page, site.name, site.symbol)
    for (const size of settings.markSizes) {
      files[`${folder}mark-${size}.png`] = png(ctx, svgDocument(size, size, tile(ctx, page, site.symbol, size)), size)
    }
    for (const wide of settings.wideSizes) {
      files[`${folder}wordmark-${wide}.png`] = png(ctx, wordmarkSvg(ctx, page, site.name), wide)
      files[`${folder}lockup-${wide}.png`] = png(ctx, lockupSvg(ctx, page, site.name, site.symbol), wide)
    }
    // Phase 3: the site's icon pack, in the same folder.
    for (const [name, content] of Object.entries(await packFiles(ctx, site))) {
      files[folder + name] = content
    }
  }
  return files
}
