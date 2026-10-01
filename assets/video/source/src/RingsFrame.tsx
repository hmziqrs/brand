import type { CSSProperties } from "react"
import { toHex } from "@hmziq/brand-core/color"
import { heroPicture, ringFrames, type RingPalette } from "@hmziq/brand-core/motion/frame"
import { ringPresets, type Arc, type RingMotion, type RingPreset } from "@hmziq/brand-core/motion/rings"
import { useCurrentFrame, useVideoConfig } from "remotion"

import { palette } from "./theme"

/*
 * The hero rings at an exact moment: the frame adapter decides where every
 * ring is, and this paints it. The same SVG the sites show (arcs, widths, the
 * accent dot), with the colors resolved instead of tokens and every rotation
 * already folded in — so what renders is what rings.css animates.
 */

/** Turns a point around a center, the way a rotation transform does. */
const around = ([x, y]: [number, number], cx: number, cy: number, degrees: number): [number, number] => {
  const a = (degrees * Math.PI) / 180
  return [cx + (x - cx) * Math.cos(a) - (y - cy) * Math.sin(a), cy + (x - cx) * Math.sin(a) + (y - cy) * Math.cos(a)]
}

type Props = {
  /** The site's name. The same name always draws the same rings. */
  seed: string
  /** A preset ("ripple-turn", …) or your own mix. */
  motion: RingPreset | RingMotion
  /** The paints; the dark theme tokens by default. */
  paints?: RingPalette
  className?: string
  style?: CSSProperties
}

/** The whole ring picture at the current frame. */
export function RingsFrame({ seed, motion, paints = palette, className, style }: Props) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const picture = heroPicture(seed)
  // The one line that makes this a video: the moment comes from the frame.
  const frames = ringFrames(picture.list, typeof motion === "string" ? ringPresets[motion] : motion, seed, paints, frame / fps)

  return (
    <svg viewBox={picture.viewBox} className={className} style={style} role="img" aria-label="Rings like layers of oxide, one of them orange">
      {frames.map((state, i) => {
        const arc: Arc = picture.list[i]
        const dot =
          arc.end &&
          around(arc.end, picture.cx, picture.cy, state.ringRotate + state.dotRotate) // the dot rides its ring's rotation too
        return (
          <g key={arc.r}>
            <circle
              cx={picture.cx}
              cy={picture.cy}
              r={arc.r}
              fill="none"
              stroke={toHex(state.stroke.rgb)}
              strokeOpacity={state.stroke.alpha}
              strokeWidth={arc.accent ? picture.width[1] : picture.width[0]}
              strokeLinecap="round"
              strokeDasharray={state.dash}
              transform={`rotate(${arc.rotate + state.ringRotate} ${picture.cx} ${picture.cy})`}
            />
            {dot && <circle cx={dot[0]} cy={dot[1]} r={picture.dot} fill={toHex(paints.primary.rgb)} />}
          </g>
        )
      })}
    </svg>
  )
}
