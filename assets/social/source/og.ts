// The site cards (assets.md phase 4): a 1200×630 og:image and a 1200×675 X
// card for every site in the roster, plus the 1280×640 GitHub previews for
// the confirmed repositories. One layout, three canvases: the
// mark top left, the site's approved headline as the big words, the wordmark
// and the host along the bottom. Dark is the brand's default, and no rings —
// social banners stay ring-free until the plan says otherwise.
//
// Pure template code, like the test card: everything comes from brand-core
// and the settings, through the engine's render call.
import { family } from "../../../packages/brand-core/src/family.ts"
import { type Ctx, mark, measure, png, text, wrap, wordmark } from "./parts.ts"
import { settings, sizes } from "./settings.ts"

type RenderCtx = Ctx & { theme: { dark: Record<string, string> } }

/** Everything one card needs, drawn from the roster and the headline list. */
function cardContent(id: string) {
  const site = family.find((s) => s.id === id)!
  return { symbol: site.symbol, name: site.name, host: new URL(site.href).host, headline: settings.headlines[id] }
}

type CardScale = { width: number; height: number; pad: number; markSize: number; headlineSize: number; nameSize: number; urlSize: number }

/** The shared card layout: mark top left, headline centered with the same
 *  air above and below it, wordmark and host on the bottom line. Long
 *  headlines shrink a step at a time until they fit the band, so no card
 *  ever crowds its bottom row. */
function siteCard(ctx: RenderCtx, scale: CardScale, id: string): Buffer {
  const page = ctx.theme.dark
  const { width: W, height: H, pad, markSize, headlineSize, nameSize, urlSize } = scale
  const { symbol, name, host, headline } = cardContent(id)

  // The band the headline lives in: below the mark, above the bottom row,
  // with the same gap on both sides.
  const gap = Math.round(pad * 0.5)
  const bandTop = pad + markSize + gap
  const bandBottom = H - pad - Math.round(nameSize * 0.75) - gap
  const opts = (size: number) => ({ size, weight: 500, tracking: -0.03 }) as const

  let size = headlineSize
  let lines = wrap(ctx, headline, opts(size), W - 2 * pad)
  const inkHeight = (ls: string[], s: number) => {
    const inks = ls.map((line) => measure(ctx, line, opts(s)))
    return (ls.length - 1) * s * 1.12 + inks[0].top * -1 + inks[ls.length - 1].bottom
  }
  while (inkHeight(lines, size) > bandBottom - bandTop && size > headlineSize * 0.6) {
    size *= 0.94
    lines = wrap(ctx, headline, opts(size), W - 2 * pad)
  }
  const lineHeight = size * 1.12
  const inks = lines.map((line) => measure(ctx, line, opts(size)))

  // Center the headline's ink in the band.
  const inkTop = inks[0].top
  const inkBottom = (lines.length - 1) * lineHeight + inks[lines.length - 1].bottom
  const firstBaseline = (bandTop + bandBottom) / 2 - (inkTop + inkBottom) / 2

  const site2 = wordmark(ctx, page, name, { size: nameSize })
  const body = [
    `<g transform="translate(${pad} ${pad})">${mark(ctx, page, symbol, markSize)}</g>`,
    ...lines.map((line, i) => text(ctx, line, pad, firstBaseline + i * lineHeight, opts(size), ctx.svgPaint(ctx.color(page, "foreground")))),
    site2.svg(pad, H - pad - site2.bottom),
    `<text x="${W - pad}" y="${H - pad}" text-anchor="end" font-family="Onest" font-size="${urlSize}" ${ctx.svgPaint(ctx.color(page, "muted-foreground"))}>${host}</text>`,
  ]
  return png(ctx, W, H, body.join("\n"))
}

export function render(ctx: RenderCtx): Record<string, Buffer> {
  const ogScale: CardScale = { ...sizes.og, pad: 88, markSize: 112, headlineSize: 78, nameSize: 46, urlSize: 26 }
  const xScale: CardScale = { ...sizes.xCard, pad: 88, markSize: 112, headlineSize: 78, nameSize: 46, urlSize: 26 }
  const githubScale: CardScale = { ...sizes.githubPreview, pad: 80, markSize: 96, headlineSize: 62, nameSize: 40, urlSize: 24 }

  const files: Record<string, Buffer> = {}
  for (const site of family) {
    files[`sites/${site.id}/og-${sizes.og.width}x${sizes.og.height}.png`] = siteCard(ctx, ogScale, site.id)
    files[`sites/${site.id}/x-${sizes.xCard.width}x${sizes.xCard.height}.png`] = siteCard(ctx, xScale, site.id)
  }
  // Only confirmed repositories get a preview (phase 6's scope, and the
  // plan's decision table): while `repo` is null, nothing renders.
  for (const repo of settings.github.filter((r) => r.repo)) {
    files[`github/${repo.id}-${sizes.githubPreview.width}x${sizes.githubPreview.height}.png`] = siteCard(ctx, githubScale, repo.id)
  }
  return files
}
