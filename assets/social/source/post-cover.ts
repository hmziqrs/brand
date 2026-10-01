// The blog cover template (assets.md phase 5): a 1200×675 cover and a
// 1200×630 og:image per post — title, date, site mark, no rings (the rule,
// and the plan's). The sample post in settings proves the template; real
// covers render from each post's own title and date.
import { family } from "../../../packages/brand-core/src/family.ts"
import { type Ctx, mark, measure, png, text, wrap, wordmark } from "./parts.ts"
import { settings, sizes } from "./settings.ts"

type RenderCtx = Ctx & { theme: { dark: Record<string, string> } }

const blog = family.find((s) => s.id === "blog")!

/** One cover: the mark and the site's name top left, the post's title with
 *  its date under it as the big words, the host bottom right. */
function cover(ctx: RenderCtx, width: number, height: number, title: string, date: string): Buffer {
  const page = ctx.theme.dark
  const pad = 88
  const markSize = 96
  const dateSize = 28

  // The title block, with the date under it, lives in the band between the
  // mark row and the bottom line, with the same gap on both sides; a long
  // title shrinks a step at a time until the whole block fits.
  const gap = 44
  const dateGap = 56
  const dateLine = dateSize * 1.2
  const bandTop = pad + markSize + gap
  const bandBottom = height - pad - 34 - gap
  const opts = (size: number) => ({ size, weight: 500, tracking: -0.03 }) as const

  let size = 74
  let lines = wrap(ctx, title, opts(size), width - 2 * pad)
  const blockHeight = (ls: string[], s: number) => {
    const inks = ls.map((line) => measure(ctx, line, opts(s)))
    return (ls.length - 1) * s * 1.1 + inks[0].top * -1 + inks[ls.length - 1].bottom + dateGap + dateLine * 0.75
  }
  while (blockHeight(lines, size) > bandBottom - bandTop && size > 40) {
    size *= 0.94
    lines = wrap(ctx, title, opts(size), width - 2 * pad)
  }
  const lineHeight = size * 1.1
  const inks = lines.map((line) => measure(ctx, line, opts(size)))
  const dateInk = measure(ctx, date, { size: dateSize })

  const inkTop = inks[0].top
  const inkBottom = (lines.length - 1) * lineHeight + inks[lines.length - 1].bottom + dateGap + dateInk.bottom
  const firstBaseline = (bandTop + bandBottom) / 2 - (inkTop + inkBottom) / 2
  const dateBaseline = firstBaseline + (lines.length - 1) * lineHeight + dateGap

  const name = wordmark(ctx, page, blog.name, { size: 36 })
  const nameInk = measure(ctx, blog.name, { size: 36, weight: 600, tracking: -0.02 })
  const markRowCenter = pad + markSize / 2

  const body = [
    `<g transform="translate(${pad} ${pad})">${mark(ctx, page, blog.symbol, markSize)}</g>`,
    name.svg(pad + markSize + 36, markRowCenter - (nameInk.top + name.bottom) / 2),
    ...lines.map((line, i) =>
      text(ctx, line, pad, firstBaseline + i * lineHeight, { size, weight: 500, tracking: -0.03 }, ctx.svgPaint(ctx.color(page, "foreground"))),
    ),
    text(ctx, date, pad, dateBaseline, { size: dateSize }, ctx.svgPaint(ctx.color(page, "muted-foreground"))),
    `<text x="${width - pad}" y="${height - pad}" text-anchor="end" font-family="Onest" font-size="26" ${ctx.svgPaint(ctx.color(page, "muted-foreground"))}>${new URL(blog.href).host}</text>`,
  ]
  return png(ctx, width, height, body.join("\n"))
}

export function render(ctx: RenderCtx): Record<string, Buffer> {
  const { title, date } = settings.samplePost
  return {
    [`blog/cover-sample-${sizes.cover.width}x${sizes.cover.height}.png`]: cover(ctx, sizes.cover.width, sizes.cover.height, title, date),
    [`blog/og-sample-${sizes.blogOg.width}x${sizes.blogOg.height}.png`]: cover(ctx, sizes.blogOg.width, sizes.blogOg.height, title, date),
  }
}
