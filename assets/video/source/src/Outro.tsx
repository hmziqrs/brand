import { family } from "@hmziq/brand-core/family"
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion"

import { RingsFrame } from "./RingsFrame"
import { Address, Wordmark } from "./Wordmark"
import { useFonts } from "./fonts"
import { ringsStyle } from "./layout"
import { paint } from "./theme"

const out = Easing.bezier(0.16, 1, 0.3, 1)
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const

/**
 * The outro and its end screen. Everything settles in the first two seconds;
 * from half way to the end the frame is still except for the rings, so the
 * last five seconds are a clean YouTube end screen. The words stay in the
 * left third and the right side holds nothing but the faint rings, where the
 * channel's end-screen elements go. (The outro is a tail: the video it is
 * added to has to be at least 25 s for YouTube to allow an end screen.)
 */
export function Outro() {
  useFonts()
  const frame = useCurrentFrame()
  const { fps, durationInFrames } = useVideoConfig()
  const site = family.find((s) => s.id === "hmziq")
  const name = interpolate(frame, [6, 36], [0, 1], { ...clamp, easing: out })
  const rise = interpolate(frame, [6, 36], [24, 0], { ...clamp, easing: out })
  const address = interpolate(frame, [30, 54], [0, 1], { ...clamp, easing: out })
  const endScreen = frame >= durationInFrames - 5 * fps

  return (
    <AbsoluteFill style={{ background: paint.background }}>
      <RingsFrame seed={site?.id ?? "hmziq"} motion="ripple-turn" style={ringsStyle} />
      <div style={{ position: "absolute", left: "8%", top: "50%", transform: `translateY(-50%) translateY(${rise}px)`, opacity: name }}>
        <Wordmark name={site?.name ?? "hmziq"} size={120} />
        <div style={{ marginTop: 36, opacity: address }}>
          <Address text={site?.href?.replace("https://", "") ?? "hmziq.rs"} size={40} />
        </div>
      </div>
      {/* A mark for the render log: this frame on is the held end screen. */}
      <div data-end-screen={endScreen ? "" : undefined} style={{ display: "none" }} />
    </AbsoluteFill>
  )
}
