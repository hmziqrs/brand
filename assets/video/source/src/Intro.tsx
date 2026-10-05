import { family } from "@hmziq/brand-core/family"
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion"

import { RingsFrame } from "./RingsFrame"
import { Address, Wordmark } from "./Wordmark"
import { useFonts } from "./fonts"
import { ringsStyle } from "./layout"
import { paint } from "./theme"

/** The settle everything shares: quick in, long rest. */
const out = Easing.bezier(0.16, 1, 0.3, 1)
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const

/** The intro: the rings come in, the signature settles under them, and the address follows. */
export function Intro() {
  useFonts()
  const frame = useCurrentFrame()
  const site = family.find((s) => s.id === "hmziq")
  const rings = interpolate(frame, [0, 24], [0, 1], { ...clamp, easing: out })
  const name = interpolate(frame, [18, 48], [0, 1], { ...clamp, easing: out })
  const rise = interpolate(frame, [18, 48], [28, 0], { ...clamp, easing: out })
  const address = interpolate(frame, [56, 76], [0, 1], { ...clamp, easing: out })

  return (
    <AbsoluteFill style={{ background: paint.background }}>
      <RingsFrame seed={site?.id ?? "hmziq"} motion="ripple-turn" style={{ ...ringsStyle, opacity: rings }} />
      <div style={{ position: "absolute", left: "8%", top: "50%", transform: `translateY(-50%) translateY(${rise}px)`, opacity: name }}>
        <Wordmark name={site?.name ?? "hmziq"} size={160} />
        <div style={{ marginTop: 44, opacity: address }}>
          <Address text={site?.href?.replace("https://", "") ?? "hmziq.rs"} size={44} />
        </div>
      </div>
    </AbsoluteFill>
  )
}
