// The icon pack (assets.md phase 3): the files a site's public/ folder gets.
// The favicon and the Android icons are the mark itself; the apple-touch and
// maskable icons keep the mark's content inside each surface's safe zone on
// a full-bleed tile, the way the W3C icon-mask rule asks. `site.webmanifest`
// and `head.html` carry the same tags the kits' `SiteHead` renders for a
// site (kits.md), with the colors resolved from theme.css — the kit renders
// them from the site's id, other sites paste head.html into the page head.
import { toHex } from "../../../packages/brand-core/src/color.ts"

import { logoDefaults } from "../../../packages/brand-core/src/logo.ts"

import { lookPaint, png, svgDocument, symbolAndSquare, tile, type Ctx } from "./parts.ts"
import { settings } from "./settings.ts"

type Theme = { dark: Record<string, string>; light: Record<string, string> }

/** The engine's full render context for the logos target: the drawing Ctx
 *  plus the theme, the hex writer and the ICO renderer. */
export type FullCtx = Ctx & { theme: Theme; toHex: typeof toHex; pngToIco: (pngs: Buffer[]) => Promise<Buffer> }

/** The pack's file names, in a stable order. The lab's sync step copies
 *  these (minus head.html, which is for pasting, not serving). */
export const packFileNames = [
  "favicon.svg",
  ...settings.faviconPngSizes.map((s) => `favicon-${s}.png`),
  "favicon.ico",
  "apple-touch-icon.png",
  ...settings.androidSizes.map((s) => `icon-${s}.png`),
  "maskable-512.png",
  "site.webmanifest",
  "head.html",
]

/**
 * The symbol and square on a full-bleed tile color, with the whole ink
 * inside a centered square `content` of the canvas — the maskable safe
 * zone. The background fills the rest, as the platform crops it away.
 */
function fullBleed(ctx: FullCtx, page: Record<string, string>, symbol: string, size: number, content: number): Buffer {
  const probe = symbolAndSquare(ctx, page, symbol, 100)
  const scale = (content * size) / Math.max(probe.ink.width, probe.ink.bottom - probe.ink.top)
  const x = size / 2 - (probe.ink.width * scale) / 2
  const y = size / 2 - ((probe.ink.top + probe.ink.bottom) / 2) * scale
  const svg = svgDocument(size, size, [
    `<rect x="0" y="0" width="${size}" height="${size}" ${lookPaint(ctx, page, logoDefaults.tile)}/>`,
    `<g transform="translate(${x.toFixed(2)} ${y.toFixed(2)}) scale(${scale.toFixed(4)})">${probe.svg(0, 0)}</g>`,
  ].join("\n"))
  return png(ctx, svg, size)
}

/** One site's pack. `name` is the site's own name (the webmanifest's), and
 *  `symbol` its two letters. */
export async function packFiles(ctx: FullCtx, site: { name: string; symbol: string }): Promise<Record<string, Buffer | string>> {
  const page = ctx.theme.dark
  const symbol = site.symbol

  const faviconPngs = settings.faviconPngSizes.map((s) => png(ctx, svgDocument(s, s, tile(ctx, page, symbol, s)), s))
  const files: Record<string, Buffer | string> = {
    "favicon.svg": svgDocument(settings.faviconViewBox, settings.faviconViewBox, tile(ctx, page, symbol, settings.faviconViewBox)),
    ...Object.fromEntries(settings.faviconPngSizes.map((s, i) => [`favicon-${s}.png`, faviconPngs[i]])),
    "favicon.ico": await ctx.pngToIco(faviconPngs),
    "apple-touch-icon.png": fullBleed(ctx, page, symbol, settings.appleTouch.size, settings.appleTouch.content),
    ...Object.fromEntries(settings.androidSizes.map((s) => [`icon-${s}.png`, png(ctx, svgDocument(s, s, tile(ctx, page, symbol, s)), s)])),
    "maskable-512.png": fullBleed(ctx, page, symbol, settings.maskable.size, settings.maskable.content),
    "site.webmanifest": `${JSON.stringify(
      {
        name: site.name,
        short_name: site.name,
        icons: [
          ...settings.androidSizes.map((s) => ({ src: `/icon-${s}.png`, sizes: `${s}x${s}`, type: "image/png" })),
          { src: "/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
        display: "standalone",
        background_color: ctx.toHex(ctx.color(page, "background").rgb),
        theme_color: ctx.toHex(ctx.color(page, "background").rgb),
      },
      null,
      2,
    )}\n`,
    "head.html": [
      `<link rel="icon" href="/favicon.svg" type="image/svg+xml" />`,
      `<link rel="icon" href="/favicon.ico" sizes="32x32" />`,
      `<link rel="apple-touch-icon" href="/apple-touch-icon.png" />`,
      `<link rel="manifest" href="/site.webmanifest" />`,
      `<meta name="theme-color" media="(prefers-color-scheme: dark)" content="${ctx.toHex(ctx.color(ctx.theme.dark, "background").rgb)}" />`,
      `<meta name="theme-color" media="(prefers-color-scheme: light)" content="${ctx.toHex(ctx.color(ctx.theme.light, "background").rgb)}" />`,
      ``,
    ].join("\n"),
  }
  return files
}
