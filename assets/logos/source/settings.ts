// The logos target's settings (assets.md phases 2–3): the sizes each export
// comes in, the font Node outlines with, and the little geometry the icon
// pack needs that the logo recipe doesn't already hold. The engine records
// this object in the manifest, so every number here is part of what
// `pnpm check:assets` proves is current. Sizes follow the plan's own table;
// the platform links live in docs/assets.md's appendix.

export const settings = {
  // The static font Node outlines with (assets/fonts): every letter in the
  // wordmark, the mark and the pack is Onest 600 — the weight the `Wordmark`
  // and `Mark` components use. Outlined, so no export needs the font
  // installed to look right.
  fonts: ["onest-latin-600-normal.ttf"],
  // Mark PNGs, square (phase 2).
  markSizes: [16, 32, 48, 64, 128, 256, 512, 1024],
  // Wordmark and lockup PNGs, by width (phase 2).
  wideSizes: [512, 1024],
  // The SVG masters the PNGs rasterize from, in the same units as the
  // templates: the tile at 512, wordmarks and lockups at this font size.
  tileViewBox: 512,
  wordmarkViewBox: 100,
  // The favicon pack (phase 3). The SVG carries no size; the PNGs are the
  // sizes browsers ask for by name, the ICO holds 16/32/48, apple-touch is
  // 180, and Android gets 192/512 plus a maskable 512.
  faviconViewBox: 32,
  faviconPngSizes: [16, 32, 48],
  appleTouch: { size: 180, content: 0.66 },
  androidSizes: [192, 512],
  // Maskable content: the ink sits inside a centered square this share of
  // the canvas — under the 56.6% a square can be and still fit the safe
  // circle (radius 40%; W3C icon masks, checked 2026-09-27).
  maskable: { size: 512, content: 0.54 },
  // The lockup: the mark and the wordmark drawn as one piece, the wordmark
  // vertically centered beside the tile.
  lockup: { tileSize: 120, wordmarkSize: 100, gap: 44 },
}
