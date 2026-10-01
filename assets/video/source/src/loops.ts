import { heroPicture, motionPeriod } from "@hmziq/brand-core/motion/frame"
import { ringPresets, type RingMotion, type RingPreset } from "@hmziq/brand-core/motion/rings"

/*
 * The motion loops (assets.md phase 8): every moving preset, with its timers
 * fitted to a loop. The preset's character is unchanged — which rings move and
 * how — only the clocks are shorter, and they divide the period exactly, so
 * the loop lands back on its first frame instead of cutting mid-move.
 */

/** The loops draw the brand's own rings: the same picture the home hero shows. */
export const loopSeed = "hmziq"

/** A ripple's wave must also be over before the period ends (cross + glow ≤
 *  every), or the last ring would still be lit at the cut. */
const fitted: Record<Exclude<RingPreset, "still">, RingMotion> = {
  "ripple-turn": { orange: { kind: "turn", seconds: 10 }, gray: { kind: "ripple", every: 10 } },
  turn: { orange: { kind: "turn", seconds: 8 } },
  breathe: { orange: { kind: "breathe", seconds: 3 } },
  orbit: { orange: { kind: "orbit", seconds: 5 } },
  pair: { orange: { kind: "turn", seconds: 5 }, gray: { kind: "turn", seconds: 10 } },
  dial: { gray: { kind: "dial", rings: 4, seconds: 1.25 } },
  ripple: { gray: { kind: "ripple", every: 10 } },
}

export type Loop = { preset: Exclude<RingPreset, "still">; motion: RingMotion; /** Seconds; a whole number of frames at 30 fps. */ period: number }

/** Every moving preset, in ringPresets' order. */
export const loops: Loop[] = (Object.keys(ringPresets) as RingPreset[])
  .filter((preset): preset is Exclude<RingPreset, "still"> => preset !== "still")
  .map((preset) => {
    const motion = fitted[preset]
    const period = motionPeriod(heroPicture(loopSeed).list, motion, loopSeed)
    if (period === null) throw new Error(`The ${preset} loop doesn't move`)
    return { preset, motion, period }
  })
