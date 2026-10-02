// Profiles and banners (assets.md phase 6): an avatar per site (the mark,
// full bleed, safe inside the platforms' circle crop), the X header and the
// LinkedIn background for the personal accounts the lab records, and the
// upload list that says where every file goes. Ring-free, like every social
// image until the plan decides otherwise.
import { family } from "../../../packages/brand-core/src/family.ts"
import { logoDefaults } from "../../../packages/brand-core/src/logo.ts"
import { background, type Ctx, mark, measure, png, symbolAndSquare, text, wrap, wordmark } from "./parts.ts"
import { settings, sizes } from "./settings.ts"

type RenderCtx = Ctx & { theme: { dark: Record<string, string> } }

const hmziq = family.find((s) => s.id === "hmziq")!

/** The avatar: the mark full bleed, so a circle crop still shows the whole
 *  tile. The content keeps inside the centered circle whose radius is 40% of
 *  the canvas (the icon-mask rule the plan cites), shrinking a step if a
 *  wide symbol needs it. */
function avatar(ctx: RenderCtx, symbol: string): Buffer {
  const page = ctx.theme.dark
  const S = sizes.avatar
  let fontSize = logoDefaults.symbolSize * S
  let content = symbolAndSquare(ctx, page, symbol, fontSize)
  const reach = () => Math.hypot(content.ink.width / 2, Math.max(-content.ink.top, content.ink.bottom))
  while (reach() > S * 0.4) {
    fontSize *= 0.95
    content = symbolAndSquare(ctx, page, symbol, fontSize)
  }
  const x = (S - content.ink.width) / 2
  const y = S / 2 - (content.ink.top + content.ink.bottom) / 2
  const body = [`<rect x="0" y="0" width="${S}" height="${S}" ${ctx.svgPaint(ctx.color(page, logoDefaults.tile))}/>`, content.svg(x, y)]
  return png(ctx, S, S, body.join("\n"))
}

/** A header banner. X's header crops on narrow screens, so its content keeps
 *  clear of the side edges; LinkedIn's profile photo covers the left of the
 *  background on desktop, so that one stacks everything on the right. */
function banner(ctx: RenderCtx, width: number, height: number, kind: "x" | "linkedin"): Buffer {
  const page = ctx.theme.dark
  const tagline = settings.headlines.hmziq
  const isX = kind === "x"
  const pad = isX ? 150 : 96
  const markSize = isX ? 128 : 104
  const nameSize = isX ? 76 : 60
  const tagSize = isX ? 28 : 25
  const tagLineHeight = tagSize * 1.35

  const name = wordmark(ctx, page, hmziq.name, { size: nameSize })
  const nameInk = measure(ctx, hmziq.name, { size: nameSize, weight: 600, tracking: -0.02 })
  const lines = wrap(ctx, tagline, { size: tagSize }, width - 2 * Math.max(pad, 150) - (isX ? markSize + 72 : 0))
  const tagInks = lines.map((line) => measure(ctx, line, { size: tagSize }))

  // The whole block — wordmark over tagline, with the mark set into it —
  // centered in the banner's height, by its ink.
  const markGap = 36
  const blockTop = isX ? nameInk.top : -markSize
  const blockBottom = name.bottom + 36 + (lines.length - 1) * tagLineHeight + tagInks[lines.length - 1].bottom
  const nameBaseline = height / 2 - (blockTop + blockBottom) / 2
  const tagBaseline = (i: number) => nameBaseline + name.bottom + 36 + i * tagLineHeight

  const out: string[] = [background(ctx, page, width, height)]
  if (isX) {
    // The wordmark and its line on the left, the mark on the right, both
    // inside the area X keeps visible.
    out.push(name.svg(pad, nameBaseline))
    lines.forEach((line, i) => out.push(text(ctx, line, pad, tagBaseline(i), { size: tagSize }, ctx.svgPaint(ctx.color(page, "muted-foreground")))))
    out.push(`<g transform="translate(${width - pad - markSize} ${Math.round((height - markSize) / 2)})">${mark(ctx, page, hmziq.symbol, markSize)}</g>`)
  } else {
    // LinkedIn: a stacked lockup on the right — mark, wordmark, line — with
    // the left empty for the profile photo.
    const right = width - pad
    out.push(`<g transform="translate(${right - markSize} ${nameBaseline + nameInk.top - markSize - markGap})">${mark(ctx, page, hmziq.symbol, markSize)}</g>`)
    out.push(name.svg(right - name.width, nameBaseline))
    lines.forEach((line, i) => out.push(text(ctx, line, right - tagInks[i].width, tagBaseline(i), { size: tagSize }, ctx.svgPaint(ctx.color(page, "muted-foreground")))))
  }
  return png(ctx, width, height, out.join("\n"))
}

/** The upload list: which file goes to which account, and what waits on a
 *  confirmation. Generated, so it can't fall behind the files. */
function uploadList(): string {
  const sites = family
    .map(
      (s) =>
        `| ${s.name} | \`sites/${s.id}/og-${sizes.og.width}x${sizes.og.height}.png\` | \`sites/${s.id}/x-${sizes.xCard.width}x${sizes.xCard.height}.png\` |`,
    )
    .join("\n")
  const confirmed = settings.github
    .filter((r) => r.repo)
    .map((r) => `| \`${r.repo}\` | \`github/${r.id}-${sizes.githubPreview.width}x${sizes.githubPreview.height}.png\` |`)
    .join("\n")
  const waiting = settings.github
    .filter((r) => !r.repo)
    .map((r) => family.find((s) => s.id === r.id)!.name)
    .join(", ")
  return `# Social images: the upload list

Every file here is generated (\`pnpm render-assets --only social\`). Uploads are done by hand, from this list.

## The accounts

The lab's oxlabs contact page records the personal accounts: GitHub \`${settings.accounts.github}\`, X \`@${settings.accounts.x}\`, LinkedIn \`${settings.accounts.linkedin}\`.

| Account | Photo | Cover |
| --- | --- | --- |
| X \`@${settings.accounts.x}\` | \`avatars/hmziq-400x400.png\` | \`x/header-${sizes.xHeader.width}x${sizes.xHeader.height}.png\` |
| LinkedIn \`${settings.accounts.linkedin}\` | \`avatars/hmziq-400x400.png\` | \`linkedin/background-${sizes.linkedinBackground.width}x${sizes.linkedinBackground.height}.png\` |
| GitHub \`${settings.accounts.github}\` | \`avatars/hmziq-400x400.png\` | — |

## GitHub repo previews

| Repo | File |
| --- | --- |
${confirmed}

No preview exists for ${waiting} yet; each renders and uploads the day its repository name is confirmed. Files are PNG under 1 MB, as GitHub asks.

## Site cards

Each site's cards go live when that site serves its own head (the plan's rule); until then they stay files here.

| Site | og:image | X card |
| --- | --- | --- |
${sites}

## Blog covers

\`blog/cover-sample-${sizes.cover.width}x${sizes.cover.height}.png\` and \`blog/og-sample-${sizes.blogOg.width}x${sizes.blogOg.height}.png\` prove the cover template (\`assets/social/source/post-cover.ts\`); real covers render per post from its title and date. The existing blog photo stays, as the plan decided.

## YouTube

\`youtube/thumbnail-sample-${sizes.thumbnail.width}x${sizes.thumbnail.height}.png\` proves the 16:9 thumbnail template (\`assets/social/source/thumbnail.ts\`); real thumbnails render per video from its title. Nothing uploads until the channel is confirmed (the plan's decision table).

## Avatars

One per site (\`avatars/<site>-${sizes.avatar}x${sizes.avatar}.png\`), for any account a site opens later. Each keeps the mark's content inside the centered 40% circle, so platform circle crops are safe.
`
}

export function render(ctx: RenderCtx): Record<string, Buffer | string> {
  const files: Record<string, Buffer | string> = {}
  for (const site of family) {
    files[`avatars/${site.id}-${sizes.avatar}x${sizes.avatar}.png`] = avatar(ctx, site.symbol)
  }
  files[`x/header-${sizes.xHeader.width}x${sizes.xHeader.height}.png`] = banner(ctx, sizes.xHeader.width, sizes.xHeader.height, "x")
  files[`linkedin/background-${sizes.linkedinBackground.width}x${sizes.linkedinBackground.height}.png`] = banner(
    ctx,
    sizes.linkedinBackground.width,
    sizes.linkedinBackground.height,
    "linkedin",
  )
  files["upload-list.md"] = uploadList()
  return files
}
