// The engine behind the generated assets (assets.md). render-assets.ts uses
// it to render targets and write their manifests; check-assets.ts uses the
// same code read-only to prove the committed files are up to date. A target is
// one exports/ folder: everything it generates comes from `render`, and its
// manifest records the files plus a digest of everything they were made from.
// Outputs never count as inputs, so re-rendering can't snowball.
import { createHash } from "node:crypto"
import { readFileSync, readdirSync, statSync } from "node:fs"
import { createRequire } from "node:module"
import { join, relative, sep } from "node:path"
import { fileURLToPath } from "node:url"

import * as testCard from "../assets/test/source/test-card.ts"
import * as socialBanners from "../assets/social/source/banners.ts"
import * as socialOg from "../assets/social/source/og.ts"
import * as socialPostCover from "../assets/social/source/post-cover.ts"
import * as socialThumbnail from "../assets/social/source/thumbnail.ts"
import { settings as socialSettings } from "../assets/social/source/settings.ts"
import { render as logosRender } from "../assets/logos/source/logos.ts"
import { settings as logosSettings } from "../assets/logos/source/settings.ts"

export const root = fileURLToPath(new URL("..", import.meta.url))

type Color = { rgb: [number, number, number]; alpha: number }
type OutlinePath = { toPathData(decimalPlaces: number): string; getBoundingBox(): { x1: number; y1: number; x2: number; y2: number } }
type OutlineFont = { getPath(text: string, x: number, y: number, size: number, options: { kerning: boolean; letterSpacing: number }): OutlinePath }
type Theme = { dark: Record<string, string>; light: Record<string, string>; bands: Record<string, Record<string, string>> }
type RenderResult = Record<string, Buffer | string>
type Settings = { fonts: string[] }
type TargetSettings = Settings & Record<string, unknown>
type ResvgLike = {
  getBBox(): { x: number; y: number; width: number; height: number } | undefined
  render(): { asPng(): Buffer }
}
type RenderCtx = {
  theme: Theme
  color: (tokens: Record<string, string>, name: string) => Color
  inBand: (theme: Theme, mode: "dark" | "light", band: string) => Record<string, string>
  svgPaint: (c: Color, as?: "fill" | "stroke") => string
  toHex: (rgb: [number, number, number]) => string
  Resvg: new (svg: string, options: unknown) => ResvgLike
  outlineFont: OutlineFont
  outlineFonts: Record<string, OutlineFont>
  pngToIco: (pngs: Buffer[]) => Promise<Buffer>
  fontFiles: string[]
}
export type Target = {
  id: string
  dir: string
  source: string
  settings: TargetSettings
  render: (ctx: RenderCtx) => RenderResult | Promise<RenderResult>
}
type FileEntry = { path: string; sha256: string; bytes: number; width?: number; height?: number }
type Input = { path: string; sha256: string }
type PublicCopy = { id: string; from: string; to: string; files: string[] }

const sha256 = (bytes: Buffer): string => createHash("sha256").update(bytes).digest("hex")

// Every target renders from the same brand inputs: the theme and color code,
// the roster, the logo recipe, the ring and scene code, the fonts, the
// generator scripts and the lockfile. A target adds its own templates.
const baseInputs: string[] = [
  "packages/brand-core/theme.css",
  "packages/brand-core/rings.css",
  "packages/brand-core/src/color.ts",
  "packages/brand-core/src/family.ts",
  "packages/brand-core/src/logo.ts",
  "scripts/assets-lib.ts",
  "scripts/render-assets.ts",
  "bun.lock",
]
const baseInputDirs: string[] = [
  "packages/brand-core/src/motion", // ring, scene and video code
  "assets/fonts", // static TTFs. The variable WOFF2 is a browser input, not a render input.
]
// Static font files only: a browser-only WOFF2 bump changes nothing a static
// render reads, so it must not mark test-card, social or logos stale.
const staticFontExts: RegExp = /\.(ttf|otf)$/

/** The targets, in render order. The command that fixes a target is
 *  `bun run render-assets --only <id>`. */
export const targets: Target[] = [
  {
    id: "test-card",
    dir: "assets/test",
    source: "assets/test/source",
    settings: testCard.settings,
    render: testCard.render,
  },
  {
    // The social images (assets.md phases 4–6): site OG and X cards, the blog
    // cover template, avatars, banners and GitHub repo previews. One target,
    // one manifest, files in folders per surface.
    id: "social",
    dir: "assets/social",
    source: "assets/social/source",
    settings: socialSettings,
    render: (ctx) => ({ ...socialOg.render(ctx), ...socialPostCover.render(ctx), ...socialBanners.render(ctx), ...socialThumbnail.render(ctx) }),
  },
  {
    // The logos (assets.md phases 2–3): per site, the tile, wordmark and
    // lockup SVGs with the mark, wordmark and lockup PNGs, and the site's
    // full icon pack — favicon, ICO, apple-touch, Android and maskable
    // icons, site.webmanifest and head.html. One target, one manifest, one
    // folder per site.
    id: "logos",
    dir: "assets/logos",
    source: "assets/logos/source",
    settings: logosSettings,
    render: logosRender,
  },
]

/** The public copies render-assets keeps in step and check:assets proves
 *  match (assets.md, "Getting assets into sites and apps"). The lab carried
 *  the hmziq pack and its social cards; with the lab gone, none are left. */
export const publicCopies: PublicCopy[] = []

export const exportsDir = (target: Target): string => join(root, target.dir, "exports")
export const manifestPath = (target: Target): string => join(exportsDir(target), "manifest.json")

/** The renderer versions an export was made with, read without loading the
 *  modules, so the read-only check never has to import them. */
export const rendererVersions: Record<string, string> = (() => {
  const require = createRequire(join(root, "package.json"))
  const at = (name: string): string => JSON.parse(readFileSync(require.resolve(`${name}/package.json`), "utf8")).version
  return { "@resvg/resvg-js": at("@resvg/resvg-js"), "opentype.js": at("opentype.js"), "png-to-ico": at("png-to-ico") }
})()

function* walk(dir: string): Generator<string> {
  for (const name of readdirSync(dir).sort()) {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) yield* walk(path)
    else yield path
  }
}

/** Every file under an exports folder, as slash-separated paths relative to
 *  it, sorted — the same shape as manifest `files[].path`, so targets can
 *  spread their files over subfolders (social renders sites/, blog/, …). */
export function* exportFiles(dir: string): Generator<string> {
  for (const abs of walk(dir)) yield relative(dir, abs).split(sep).join("/")
}

/** A target's input files as [{ path, sha256 }], repo-relative and sorted. */
export function targetInputs(target: Target): Input[] {
  const files = new Map<string, string>()
  const add = (abs: string): void => {
    const path = relative(root, abs)
    files.set(path, sha256(readFileSync(abs)))
  }
  for (const path of baseInputs) add(join(root, path))
  for (const dir of baseInputDirs) {
    for (const path of walk(join(root, dir))) {
      if (dir === "assets/fonts" && !staticFontExts.test(path)) continue
      add(path)
    }
  }
  for (const path of walk(join(root, target.source))) add(path)
  return [...files].map(([path, hash]) => ({ path, sha256: hash })).sort((a, b) => (a.path < b.path ? -1 : 1))
}

/** The digest of everything a render depends on: the inputs, the renderer
 *  versions and the target's settings. */
export function targetDigest(target: Target): { inputs: Input[]; sha256: string } {
  const inputs = targetInputs(target)
  const matter = JSON.stringify({ inputs, renderers: rendererVersions, settings: target.settings })
  return { inputs, sha256: sha256(Buffer.from(matter)) }
}

/** An image's pixel dimensions, read from the file itself. */
export function dimensions(name: string, bytes: Buffer): { width?: number; height?: number } {
  if (name.endsWith(".png")) return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) }
  if (name.endsWith(".svg")) {
    const m = bytes.toString("utf8").match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/)
    return m ? { width: Math.round(Number(m[1])), height: Math.round(Number(m[2])) } : {}
  }
  return {}
}

/** Builds the manifest entry for one rendered file. */
export function fileEntry(_dir: string, name: string, bytes: Buffer): FileEntry {
  return { path: name, sha256: sha256(bytes), bytes: bytes.length, ...dimensions(name, bytes) }
}
