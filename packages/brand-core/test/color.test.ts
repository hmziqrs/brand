import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { describe, expect, it } from "vitest"
import { color, contrast, hues, hueUses, inBand, measure, over, parseColor, readTheme, resolve, svgPaint, toHex } from "../src/color"

const themeCss = readFileSync(fileURLToPath(new URL("../theme.css", import.meta.url)), "utf8")

describe("parseColor", () => {
  it("parses oklch into gamma-encoded rgb", () => {
    const c = parseColor("oklch(0.5 0.1 20)")
    expect(c).not.toBeNull()
    expect(c!.alpha).toBe(1)
    for (const channel of c!.rgb) {
      expect(channel).toBeGreaterThanOrEqual(0)
      expect(channel).toBeLessThanOrEqual(1)
    }
  })

  it("takes the lightness and the alpha as percentages", () => {
    expect(parseColor("oklch(50% 0.1 20)")!.rgb).toEqual(parseColor("oklch(0.5 0.1 20)")!.rgb)
    expect(parseColor("oklch(0.5 0.1 20 / 40%)")!.alpha).toBeCloseTo(0.4, 5)
    expect(parseColor("oklch(0.5 0.1 20 / 0.25)")!.alpha).toBe(0.25)
  })

  it("parses #rrggbb, and refuses anything else", () => {
    expect(parseColor("#FAFAFA")!.rgb).toEqual([250 / 255, 250 / 255, 250 / 255])
    expect(parseColor("red")).toBeNull()
    expect(parseColor("oklch(1 0)")).toBeNull()
  })
})

describe("color math", () => {
  it("contrast: white against black is 21, a color against itself is 1", () => {
    expect(contrast([1, 1, 1], [0, 0, 0])).toBeCloseTo(21, 5)
    expect(contrast([0.3, 0.5, 0.7], [0.3, 0.5, 0.7])).toBe(1)
  })

  it("over: paints the top color over the bottom, the way browsers blend", () => {
    expect(over({ rgb: [1, 0, 0], alpha: 0.5 }, [0, 0, 1])).toEqual([0.5, 0, 0.5])
    expect(over({ rgb: [1, 0, 0], alpha: 0 }, [0, 0, 1])).toEqual([0, 0, 1])
  })

  it("toHex: round trips a hex color", () => {
    expect(toHex(parseColor("#010203")!.rgb)).toBe("#010203")
  })
})

describe("readTheme", () => {
  const css = `
    /* a comment with :root { --ignored: 1 } */
    :root { --a: one; --b: var(--a); --gone: yes }
    .band { --skipped: 1 }
    .dark { --a: two }
    :root, .dark { --shared: three }
  `

  it("light gets :root, dark gets :root and .dark in cascade order", () => {
    const tokens = readTheme(css)
    expect(tokens.light["--a"]).toBe("one")
    expect(tokens.dark["--a"]).toBe("two")
    expect(tokens.light["--shared"]).toBe("three")
    expect(tokens.dark["--shared"]).toBe("three")
    expect(tokens.light["--skipped"]).toBeUndefined()
  })

  it("resolve follows var() references, and refuses missing and circular ones", () => {
    const tokens = readTheme(css)
    expect(resolve(tokens.light, "--b")).toBe("one")
    expect(resolve(tokens.dark, "--b")).toBe("two")
    expect(() => resolve(tokens.light, "--nope")).toThrow(/no --nope/)
    const loop = readTheme(":root { --self: var(--self) }")
    expect(() => resolve(loop.light, "--self")).toThrow(/itself/)
  })

  it("color: reads color-mix against another token, and against transparent", () => {
    const tokens = readTheme(`
      :root {
        --ink: oklch(0.5 0.1 20);
        --paper: oklch(0.9 0.02 100);
        --half: color-mix(in oklab, var(--ink) 50%, var(--paper));
        --veil: color-mix(in oklab, var(--ink) 50%, transparent);
      }
    `).light
    const ink = color(tokens, "ink")
    const paper = color(tokens, "paper")
    const half = color(tokens, "half")
    expect(half.alpha).toBe(1)
    half.rgb.forEach((channel, i) => expect(channel).toBeGreaterThan(Math.min(ink.rgb[i], paper.rgb[i])))
    const veil = color(tokens, "veil")
    expect(veil.rgb).toEqual(ink.rgb)
    expect(veil.alpha).toBeCloseTo(0.5, 5)
    expect(() => color(tokens, "gone")).toThrow()
  })
})

describe("alpha, kept out of the hex", () => {
  it("the dark line token carries its 0.22 alpha, and svgPaint emits it as an opacity attribute", () => {
    const dark = readTheme(themeCss).dark
    const line = color(dark, "line")
    // The case assets.md warns about: toHex alone would render it as a solid
    // #FAFAFA and turn faint rings solid.
    expect(line.alpha).toBeCloseTo(0.22, 5)
    expect(toHex(line.rgb)).toBe(toHex(color(dark, "foreground").rgb))
    expect(toHex(line.rgb)).toBe("#FAFAFA")
    expect(svgPaint(line)).toBe('fill="#FAFAFA" fill-opacity="0.22"')
    expect(svgPaint(line, "stroke")).toBe('stroke="#FAFAFA" stroke-opacity="0.22"')
  })

  it("opaque colors paint as plain hex, with no opacity attribute", () => {
    const light = readTheme(themeCss).light
    expect(svgPaint(color(light, "background"))).toBe('fill="#FFFFFF"')
  })
})

describe("bands", () => {
  it("readTheme collects band rules apart, without leaking them into a mode", () => {
    const css = `
      :root { --a: root }
      .band-orange { --a: band; --b: only-in-band }
    `
    const theme = readTheme(css)
    expect(theme.bands["band-orange"]["--a"]).toBe("band")
    expect(theme.bands["band-orange"]["--b"]).toBe("only-in-band")
    expect(theme.light["--a"]).toBe("root")
    expect(theme.dark["--a"]).toBe("root")
    expect(theme.light["--b"]).toBeUndefined()
    expect(readTheme(":root { --a: 1 }").bands).toEqual({})
  })

  it("inside .band-orange the tokens flip, and var() resolves in the mode below it", () => {
    const theme = readTheme(themeCss)
    for (const mode of ["dark", "light"] as const) {
      const band = inBand(theme, mode, "band-orange")
      expect(color(band, "background").rgb).toEqual(color(theme[mode], "orange").rgb)
      expect(color(band, "foreground").rgb).toEqual(color(theme[mode], "on-orange").rgb)
      // --primary follows the context; --mark-square is fixed.
      expect(color(band, "primary").rgb).toEqual(color(theme[mode], "on-orange").rgb)
      expect(color(band, "mark-square")).toEqual(color(theme[mode], "mark-square"))
      // A band's border mixes the band's own text color, at partial alpha.
      expect(color(band, "border").alpha).toBeCloseTo(0.22, 5)
      expect(color(band, "border").rgb).toEqual(color(theme[mode], "on-orange").rgb)
      // The mode's tokens are still there, under the overrides.
      expect(color(band, "blue")).toEqual(color(theme[mode], "blue"))
    }
    // The band's orange is the mode's orange: dark and light bands differ.
    expect(color(inBand(theme, "dark", "band-orange"), "background").rgb).not.toEqual(
      color(inBand(theme, "light", "band-orange"), "background").rgb,
    )
  })

  it("inBand refuses a band theme.css doesn't define", () => {
    expect(() => inBand(readTheme(themeCss), "dark", "band-none")).toThrow(/no \.band-none rule/)
  })
})

describe("the pairs people actually read", () => {
  it("lists every hue in theme.css order, each with its uses", () => {
    expect(hues[0]).toBe("red")
    expect(hues[hues.length - 1]).toBe("pink")
    expect(Object.keys(hueUses)).toEqual([...hues])
  })

  it("measures the real theme.css, and every pair passes AA in both modes", () => {
    const results = measure(themeCss)
    expect(results.length).toBeGreaterThan(0)
    for (const r of results) {
      expect(r.ratio.dark).toBeGreaterThanOrEqual(r.min)
      expect(r.ratio.light).toBeGreaterThanOrEqual(r.min)
      expect(r.pass).toBe(true)
    }
  })
})
