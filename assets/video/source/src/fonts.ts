/*
 * The fonts, the way assets.md wants them in a browser render: the variable
 * WOFF2 for Onest (never a synthesized weight) and JetBrains Mono's own 400.
 * Each render waits for them (delayRender), so no frame is set in a fallback.
 */
import { useEffect } from "react"
import { continueRender, delayRender } from "remotion"
import onest from "../../../fonts/onest-latin-wght-normal.woff2"
import jetbrains from "../../../fonts/jetbrains-mono-latin-400-normal.ttf"

/** The families a composition can name. */
export const fonts = { sans: "Onest, sans-serif", mono: "'JetBrains Mono', monospace" } as const

const faces = [
  { family: "Onest", url: onest, format: "woff2", weight: "100 900" },
  { family: "JetBrains Mono", url: jetbrains, format: "truetype", weight: "400" },
]

/** Loads both fonts before the frame is let through. Put it in a composition once. */
export function useFonts() {
  useEffect(() => {
    const loaded = faces.map(({ family, url, format, weight }) => {
      const face = new FontFace(family, `url(${url}) format("${format}")`, { weight, style: "normal" })
      const handle = delayRender(`loading ${family}`)
      face.load().then(
        () => {
          document.fonts.add(face)
          continueRender(handle)
        },
        (error) => {
          // A render must fail loudly on a missing font, not fall back quietly.
          throw new Error(`Could not load ${family}: ${error}`)
        },
      )
      return face
    })
    return () => loaded.forEach((face) => document.fonts.delete(face))
  }, [])
}
