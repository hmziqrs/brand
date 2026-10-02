// The test render assets.md phase 1 asks for: one card that proves the three
// foundations every later asset stands on — alpha kept out of the hex, band
// colors resolved from theme.css, and the static fonts loading in the Node
// renderer. Every color on the card is resolved from a token at render time;
// no hex value is typed in here, and no measurement is copied from a component.
//
// Every text run is drawn as outlined paths from the static font files, never
// a `<text>` element, so the exported SVG carries its letters with it and
// looks right anywhere the font isn't installed (assets.md: exported SVGs
// have resolved colors and outlined text). The PNG is rasterized from that
// same drawing, so the two files can't disagree.
//
// Pure template code: the engine (scripts/assets-lib.mjs) hands over the
// resolver, the theme, the renderer and the outlined fonts, and gets the
// files back.

export const settings = {
  width: 1200,
  height: 760,
  // The static files Node renders with (assets/fonts). Never a synthesized weight.
  fonts: ["onest-latin-400-normal.ttf", "onest-latin-500-normal.ttf", "onest-latin-600-normal.ttf", "jetbrains-mono-latin-400-normal.ttf"],
}

// Which static file each family and weight on the card outlines with.
const file = {
  sans400: "onest-latin-400-normal.ttf",
  sans500: "onest-latin-500-normal.ttf",
  sans600: "onest-latin-600-normal.ttf",
  mono400: "jetbrains-mono-latin-400-normal.ttf",
}

/** One context panel: a page mode, or `.band-orange` inside one. */
function panel(ctx, { x, y, w, h, label }, { color, svgPaint, toHex, outlineFonts }) {
  const paint = (name, as = "fill") => svgPaint(color(ctx, name), as)
  const text = (font, str, size, tx, y2, anchor = "start") => {
    const path = outlineFonts[file[font]].getPath(str, 0, 0, size, { kerning: true })
    const bb = path.getBoundingBox()
    // The ink's edge lands on the anchor: flush left for "start", flush
    // right for "end" — the same place the old text-anchor put it.
    const left = tx - (anchor === "end" ? bb.x2 : bb.x1)
    return `<path transform="translate(${left.toFixed(2)} ${y2.toFixed(2)})" d="${path.toPathData(2)}"`
  }
  const out = []

  out.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" ${paint("background")} ${paint("border", "stroke")} stroke-width="1"/>`)
  out.push(text("sans500", label, 16, x + 20, y + 32) + ` ${paint("foreground")}/>`)
  // The resolved primary, printed so a band flipping it is visible in the file itself.
  out.push(text("mono400", `--primary ${toHex(color(ctx, "primary").rgb)}`, 11, x + w - 20, y + 32, "end") + ` ${paint("muted-foreground")}/>`)

  // Swatches, each painted straight from its token.
  const swatches = ["primary", "mark-square", "foreground", "muted-foreground", "card", "orange"]
  swatches.forEach((name, i) => {
    const sx = x + 20 + i * 42
    out.push(`<rect x="${sx}" y="${y + 48}" width="30" height="30" rx="6" ${paint(name)} ${paint("border", "stroke")} stroke-width="1"/>`)
  })
  out.push(text("mono400", swatches.join(" · "), 9, x + 20, y + 94) + ` ${paint("muted-foreground")}/>`)

  // The alpha proof: the `line` token keeps its 0.22 as an opacity attribute,
  // next to the same tint painted solid — what `toHex` alone would produce.
  const ringY = y + 132
  for (let i = 0; i < 3; i++) {
    out.push(`<circle cx="${x + 36 + i * 40}" cy="${ringY}" r="16" fill="none" ${paint("line", "stroke")} stroke-width="3.5"/>`)
  }
  out.push(`<circle cx="${x + 192}" cy="${ringY}" r="16" fill="none" ${paint("foreground", "stroke")} stroke-width="3.5"/>`)
  out.push(text("mono400", "--line, alpha kept", 9, x + 20, ringY + 34) + ` ${paint("muted-foreground")}/>`)
  out.push(text("mono400", "toHex alone", 9, x + 176, ringY + 34) + ` ${paint("muted-foreground")}/>`)

  // The fonts: one line per static file, in its own family and weight.
  out.push(text("sans600", "hmziq Onest 600", 20, x + 20, y + 200) + ` ${paint("foreground")}/>`)
  out.push(text("sans500", "Onest 500, medium", 15, x + 20, y + 224) + ` ${paint("foreground")}/>`)
  out.push(text("sans400", "Onest 400, regular", 15, x + 20, y + 244) + ` ${paint("muted-foreground")}/>`)
  out.push(text("mono400", "JetBrains Mono 400 const ok = true", 12, x + 20, y + 262) + ` ${paint("foreground")}/>`)
  return out.join("\n")
}

export function render({ theme, color, inBand, svgPaint, toHex, Resvg, fontFiles, outlineFonts }) {
  const { width: W, height: H } = settings
  const dark = theme.dark
  const light = theme.light
  const panelW = 568
  const panelH = 268
  const deps = { color, svgPaint, toHex, outlineFonts }
  const head = (font, str, size, x, y) => {
    const path = outlineFonts[file[font]].getPath(str, 0, 0, size, { kerning: true })
    return `<path transform="translate(${(x - path.getBoundingBox().x1).toFixed(2)} ${y.toFixed(2)})" d="${path.toPathData(2)}"`
  }

  const body = [
    `<rect x="0" y="0" width="${W}" height="${H}" ${svgPaint(color(dark, "background"), "fill")}/>`,
    head("sans600", "hmziq · render test", 26, 24, 52) + ` ${svgPaint(color(dark, "foreground"))}/>`,
    head("mono400", "alpha kept out of the hex · bands resolved from theme.css · static fonts in the renderer", 12, 24, 76) + ` ${svgPaint(color(dark, "muted-foreground"))}/>`,
    panel(dark, { x: 24, y: 104, w: panelW, h: panelH, label: "dark page" }, deps),
    panel(light, { x: 608, y: 104, w: panelW, h: panelH, label: "light page" }, deps),
    panel(inBand(theme, "dark", "band-orange"), { x: 24, y: 388, w: panelW, h: panelH, label: "band-orange · dark" }, deps),
    panel(inBand(theme, "light", "band-orange"), { x: 608, y: 388, w: panelW, h: panelH, label: "band-orange · light" }, deps),
    `<line x1="24" y1="680" x2="${W - 24}" y2="680" ${svgPaint(color(dark, "line"), "stroke")} stroke-width="1"/>`,
    head("mono400", "fonts: onest 400 500 600 · jetbrains mono 400 (assets/fonts)", 11, 24, 706) + ` ${svgPaint(color(dark, "muted-foreground"))}/>`,
    head("mono400", "every color resolved from packages/brand-core/theme.css · rendered with @resvg/resvg-js", 11, 24, 730) + ` ${svgPaint(color(dark, "muted-foreground"))}/>`,
  ].join("\n")

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">\n${body}\n</svg>\n`
  const png = new Resvg(svg, {
    font: { fontFiles, loadSystemFonts: false, defaultFontFamily: "Onest" },
  })
    .render()
    .asPng()

  return { "test-card.svg": svg, "test-card.png": png }
}
