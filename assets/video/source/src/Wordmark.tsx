import { logoDefaults } from "@hmziq/brand-core/logo"

import { fonts } from "./fonts"
import { paint } from "./theme"

/*
 * The signature, drawn from the logo recipe the way <Wordmark> draws it in the
 * lab: Onest 600, tracking -0.02em, the orange square 0.36em after 0.07em of
 * room. Colors resolved from the tokens, so the exports can't drift from the
 * on-page logo (assets.md).
 */

type Props = {
  name: string
  /** The letters' size in pixels. */
  size: number
  color?: string
  /** The square's color. */
  square?: string
}

/** The name ending in the square. */
export function Wordmark({ name, size, color = paint.foreground, square = paint.primary }: Props) {
  const look = logoDefaults
  return (
    <span style={{ display: "inline-flex", alignItems: "baseline", fontFamily: fonts.sans, fontWeight: look.weight, letterSpacing: `${look.tracking}em`, fontSize: size, lineHeight: 1, whiteSpace: "nowrap", color }}>
      {name}
      <i aria-hidden="true" style={{ display: "inline-block", marginLeft: `${look.gap}em`, width: `${look.size}em`, height: `${look.size}em`, background: square }} />
    </span>
  )
}

/** The site's address in JetBrains Mono, the quiet way the sites show it. */
export function Address({ text, size, color = paint.muted }: { text: string; size: number; color?: string }) {
  return <span style={{ fontFamily: fonts.mono, fontWeight: 400, fontSize: size, lineHeight: 1, color }}>{text}</span>
}
