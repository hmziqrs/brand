import { AbsoluteFill } from "remotion"

import { RingsFrame } from "./RingsFrame"
import { Wordmark } from "./Wordmark"
import { fonts, useFonts } from "./fonts"
import { paint } from "./theme"

/** A 16:9 YouTube thumbnail (3840×2160): a kicker, the title, the signature —
 * rings on the right, never behind the words. Fill the title per video and
 * render it with `pnpm render:video --still thumbnail --out <file>`. */
export function Thumbnail({ kicker, title, name }: { kicker: string; title: string; name: string }) {
  useFonts()
  return (
    <AbsoluteFill style={{ background: paint.background, fontFamily: fonts.sans }}>
      <RingsFrame
        seed="hmziq"
        motion="still"
        style={{ position: "absolute", top: "50%", right: "-14%", width: "70%", transform: "translateY(-50%)" }}
      />
      <div style={{ position: "absolute", left: "7%", top: "24%", maxWidth: "42%" }}>
        <div style={{ fontFamily: fonts.mono, fontSize: 64, letterSpacing: "0.18em", color: paint.primary }}>{kicker.toUpperCase()}</div>
        <div style={{ marginTop: 56, fontWeight: 600, letterSpacing: "-0.02em", fontSize: 260, lineHeight: 1.08, color: paint.foreground }}>{title}</div>
        <div style={{ marginTop: 96 }}>
          <Wordmark name={name} size={110} color={paint.muted} />
        </div>
      </div>
    </AbsoluteFill>
  )
}
