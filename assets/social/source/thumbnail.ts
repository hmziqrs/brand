// The YouTube thumbnail template (assets.md phase 7's template output; its
// source lives here with the other social templates, as the plan's folder
// tree has it): one 16:9 canvas at 3840×2160, the size the platform's own
// page asks for. Thumbnails are read tiny, next to a video's title, so the
// video's own words are the biggest thing on the card. The bottom-right
// corner stays empty — that's where the duration badge sits — and the layout
// keeps clear of the edges, where the player's progress bar runs. Ring-free,
// like every social image until the plan decides otherwise. The sample video
// in settings proves the template; real thumbnails render per video.
import { family } from "../../../packages/brand-core/src/family.ts"
import { type Ctx, mark, measure, png, text, wrap, wordmark } from "./parts.ts"
import { settings, sizes } from "./settings.ts"

type RenderCtx = Ctx & { theme: { dark: Record<string, string> } }

const hmziq = family.find((s) => s.id === "hmziq")!

/** One thumbnail: the mark top left, the video's title as the big words
 *  centered below it, the wordmark bottom left. A long title shrinks a step
 *  at a time until it fits the band, like the site cards do. */
function thumbnail(ctx: RenderCtx, title: string): Buffer {
  const page = ctx.theme.dark
  const { width: W, height: H } = sizes.thumbnail
  // The same relative layout the 1200-wide cards use, scaled to 3840.
  const pad = 282
  const markSize = 360
  const nameSize = 148

  // The band the title lives in: below the mark, above the bottom row,
  // with the same gap on both sides.
  const gap = Math.round(pad * 0.5)
  const bandTop = pad + markSize + gap
  const bandBottom = H - pad - Math.round(nameSize * 0.75) - gap
  const opts = (size: number) => ({ size, weight: 500, tracking: -0.03 }) as const

  let size = 250
  let lines = wrap(ctx, title, opts(size), W - 2 * pad)
  const inkHeight = (ls: string[], s: number) => {
    const inks = ls.map((line) => measure(ctx, line, opts(s)))
    return (ls.length - 1) * s * 1.12 + inks[0].top * -1 + inks[ls.length - 1].bottom
  }
  while (inkHeight(lines, size) > bandBottom - bandTop && size > 250 * 0.6) {
    size *= 0.94
    lines = wrap(ctx, title, opts(size), W - 2 * pad)
  }
  const lineHeight = size * 1.12
  const inks = lines.map((line) => measure(ctx, line, opts(size)))

  // Center the title's ink in the band.
  const inkTop = inks[0].top
  const inkBottom = (lines.length - 1) * lineHeight + inks[lines.length - 1].bottom
  const firstBaseline = (bandTop + bandBottom) / 2 - (inkTop + inkBottom) / 2

  const name = wordmark(ctx, page, hmziq.name, { size: nameSize })
  const body = [
    `<g transform="translate(${pad} ${pad})">${mark(ctx, page, hmziq.symbol, markSize)}</g>`,
    ...lines.map((line, i) => text(ctx, line, pad, firstBaseline + i * lineHeight, opts(size), ctx.svgPaint(ctx.color(page, "foreground")))),
    name.svg(pad, H - pad - name.bottom),
  ]
  return png(ctx, W, H, body.join("\n"))
}

export function render(ctx: RenderCtx): Record<string, Buffer> {
  return {
    [`youtube/thumbnail-sample-${sizes.thumbnail.width}x${sizes.thumbnail.height}.png`]: thumbnail(ctx, settings.sampleVideo.title),
  }
}
