import type { CSSProperties } from "react"
import { paint, type LogoColor, type LogoLook } from "@hmziq/brand-core/logo"

/*
 * The React style helpers for the logo recipe in @hmziq/brand-core: a look
 * turned into CSS for the letters and the square. Everything else about a
 * look (the recipe, its defaults, the movement) is framework-free and lives
 * in the core package.
 */

/** The letters' font, weight, spacing, case and color. */
export function letterStyle(look: LogoLook): CSSProperties {
  return {
    fontFamily: look.font === "mono" ? "var(--font-mono)" : "var(--font-sans)",
    fontWeight: look.weight,
    letterSpacing: `${look.tracking}em`,
    textTransform: look.lowercase ? "lowercase" : "none",
    color: paint(look.color),
  }
}

/** The square at the end of the name: its size and shape, `size` em across. Undefined for no square. */
export function squareStyle(look: LogoLook, size: number, color: LogoColor): CSSProperties | undefined {
  const { shape, gap, lift } = look
  if (shape === "none") return undefined
  const box = (width: number, height: number, radius: string, extra: CSSProperties = {}): CSSProperties => ({
    width: `${width}em`,
    height: `${height}em`,
    marginLeft: `${gap}em`,
    verticalAlign: `${lift}em`,
    borderRadius: radius,
    background: paint(color),
    ["--logo-square-color" as string]: paint(color),
    ["--logo-square-size" as string]: `${Math.max(width, height)}em`,
    ...extra,
  })
  if (shape === "bar") return box(size * 0.34, size * 2.1, "0", { ["--logo-spin" as string]: "180deg" })
  if (shape === "diamond") {
    // Turned a quarter, a square reaches further; a smaller one, with room either side, keeps the same footprint.
    const side = size * 0.78
    return box(side, side, "0", { rotate: "45deg", marginLeft: `${gap + side * 0.2}em`, marginRight: `${side * 0.2}em`, verticalAlign: `${lift + side * 0.2}em`, ["--logo-turn" as string]: "45deg" })
  }
  return box(size, size, shape === "dot" ? "50%" : shape === "rounded" ? "24%" : "0")
}
