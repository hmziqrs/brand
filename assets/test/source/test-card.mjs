// The test render assets.md phase 1 asks for: one card that proves the three
// foundations every later asset stands on — alpha kept out of the hex, band
// colors resolved from theme.css, and the static fonts loading in the Node
// renderer. Every color on the card is resolved from a token at render time;
// no hex value is typed in here, and no measurement is copied from a component.
//
// Pure template code: the engine (scripts/assets-lib.mjs) hands over the
// resolver, the theme and the renderer, and gets the files back.

export const settings = {
  width: 1200,
  height: 760,
  // The static files Node renders with (assets/fonts). Never a synthesized weight.
  fonts: ["onest-latin-400-normal.ttf", "onest-latin-500-normal.ttf", "onest-latin-600-normal.ttf", "jetbrains-mono-latin-400-normal.ttf"],
}

const sans = "Onest"
const mono = "JetBrains Mono"

/** One context panel: a page mode, or `.band-orange` inside one. */
function panel(ctx, { x, y, w, h, label }, { color, svgPaint, toHex }) {
  const paint = (name, as = "fill") => svgPaint(color(ctx, name), as)
  const text = (attrs, content) => `<text ${attrs}>${content}</text>`
  const out = []

  out.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" ${paint("background")} ${paint("border", "stroke")} stroke-width="1"/>`)
  out.push(
    text(`x="${x + 20}" y="${y + 32}" font-family="${sans}" font-weight="500" font-size="16" ${paint("foreground")}`, label),
  )
  // The resolved primary, printed so a band flipping it is visible in the file itself.
  out.push(
    text(
      `x="${x + w - 20}" y="${y + 32}" text-anchor="end" font-family="${mono}" font-size="11" ${paint("muted-foreground")}`,
      `--primary ${toHex(color(ctx, "primary").rgb)}`,
    ),
  )

  // Swatches, each painted straight from its token.
  const swatches = ["primary", "mark-square", "foreground", "muted-foreground", "card", "orange"]
  swatches.forEach((name, i) => {
    const sx = x + 20 + i * 42
    out.push(`<rect x="${sx}" y="${y + 48}" width="30" height="30" rx="6" ${paint(name)} ${paint("border", "stroke")} stroke-width="1"/>`)
  })
  out.push(
    text(`x="${x + 20}" y="${y + 94}" font-family="${mono}" font-size="9" ${paint("muted-foreground")}`, swatches.join(" · ")),
  )

  // The alpha proof: the `line` token keeps its 0.22 as an opacity attribute,
  // next to the same tint painted solid — what `toHex` alone would produce.
  const ringY = y + 132
  for (let i = 0; i < 3; i++) {
    out.push(`<circle cx="${x + 36 + i * 40}" cy="${ringY}" r="16" fill="none" ${paint("line", "stroke")} stroke-width="3.5"/>`)
  }
  out.push(`<circle cx="${x + 192}" cy="${ringY}" r="16" fill="none" ${paint("foreground", "stroke")} stroke-width="3.5"/>`)
  out.push(
    text(`x="${x + 20}" y="${ringY + 34}" font-family="${mono}" font-size="9" ${paint("muted-foreground")}`, "--line, alpha kept"),
    text(
      `x="${x + 176}" y="${ringY + 34}" font-family="${mono}" font-size="9" ${paint("muted-foreground")}`,
      "toHex alone",
    ),
  )

  // The fonts: one line per static file, in its own family and weight.
  out.push(
    text(`x="${x + 20}" y="${y + 200}" font-family="${sans}" font-weight="600" font-size="20" ${paint("foreground")}`, "hmziq Onest 600"),
    text(`x="${x + 20}" y="${y + 224}" font-family="${sans}" font-weight="500" font-size="15" ${paint("foreground")}`, "Onest 500, medium"),
    text(`x="${x + 20}" y="${y + 244}" font-family="${sans}" font-weight="400" font-size="15" ${paint("muted-foreground")}`, "Onest 400, regular"),
    text(`x="${x + 20}" y="${y + 262}" font-family="${mono}" font-size="12" ${paint("foreground")}`, "JetBrains Mono 400 const ok = true"),
  )
  return out.join("\n")
}

export function render({ theme, color, inBand, svgPaint, toHex, Resvg, fontFiles }) {
  const { width: W, height: H } = settings
  const dark = theme.dark
  const light = theme.light
  const panelW = 568
  const panelH = 268

  const body = [
    `<rect x="0" y="0" width="${W}" height="${H}" ${svgPaint(color(dark, "background"), "fill")}/>`,
    `<text x="24" y="52" font-family="${sans}" font-weight="600" font-size="26" ${svgPaint(color(dark, "foreground"))}>hmziq · render test</text>`,
    `<text x="24" y="76" font-family="${mono}" font-size="12" ${svgPaint(color(dark, "muted-foreground"))}>alpha kept out of the hex · bands resolved from theme.css · static fonts in the renderer</text>`,
    panel(dark, { x: 24, y: 104, w: panelW, h: panelH, label: "dark page" }, { color, svgPaint, toHex }),
    panel(light, { x: 608, y: 104, w: panelW, h: panelH, label: "light page" }, { color, svgPaint, toHex }),
    panel(inBand(theme, "dark", "band-orange"), { x: 24, y: 388, w: panelW, h: panelH, label: "band-orange · dark" }, { color, svgPaint, toHex }),
    panel(inBand(theme, "light", "band-orange"), { x: 608, y: 388, w: panelW, h: panelH, label: "band-orange · light" }, { color, svgPaint, toHex }),
    `<line x1="24" y1="680" x2="${W - 24}" y2="680" ${svgPaint(color(dark, "line"), "stroke")} stroke-width="1"/>`,
    `<text x="24" y="706" font-family="${mono}" font-size="11" ${svgPaint(color(dark, "muted-foreground"))}>fonts: onest 400 500 600 · jetbrains mono 400 (assets/fonts)</text>`,
    `<text x="24" y="730" font-family="${mono}" font-size="11" ${svgPaint(color(dark, "muted-foreground"))}>every color resolved from packages/brand-core/theme.css · rendered with @resvg/resvg-js</text>`,
  ].join("\n")

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">\n${body}\n</svg>\n`
  const png = new Resvg(svg, {
    font: { fontFiles, loadSystemFonts: false, defaultFontFamily: sans },
  })
    .render()
    .asPng()

  return { "test-card.svg": svg, "test-card.png": png }
}
