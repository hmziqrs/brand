import type { RingMotion } from "@hmziq/brand-core/motion/rings"
import { AbsoluteFill } from "remotion"

import { RingsFrame } from "./RingsFrame"
import { useFonts } from "./fonts"
import { ringsStyle } from "./layout"
import { paint } from "./theme"

/** One motion loop: the ring picture alone, moving, on the page color. */
export function RingLoop({ motion, seed }: { motion: RingMotion; seed: string }) {
  useFonts()
  return (
    <AbsoluteFill style={{ background: paint.background }}>
      <RingsFrame seed={seed} motion={motion} style={ringsStyle} />
    </AbsoluteFill>
  )
}
