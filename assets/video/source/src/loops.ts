import { heroPicture, motionPeriod } from "@hmziq/brand-core/motion/frame"
import { motionDefaults, ringPresets, type RingMotion, type RingPreset } from "@hmziq/brand-core/motion/rings"

/*
 * The motion loops (assets.md phase 8): every moving preset, with its timers
 * fitted to a loop. The preset's character is unchanged — which rings move and
 * how — only the clocks are shorter, and they divide the period exactly, so
 * the loop lands back on its first frame instead of cutting mid-move. The
 * movement also runs right up to the period: a loop that finished early would
 * rest on its first frame until the cut (assets.md: "a seamless boundary with
 * no duplicated last frame").
 */

/** The loops draw the brand's own rings: the same picture the home hero shows. */
export const loopSeed = "hmziq"

/** A ripple's wave must end exactly on the cut (cross + glow = every): still
 *  lit and the seam breaks; over earlier and the tail rests on the loop's
 *  first frame. `ripple-turn` keeps the site's 10-second rhythm — its orange
 *  turn carries the motion while the gray rings wait for the next wave. */
const fitted: Record<Exclude<RingPreset, "still">, RingMotion> = {
  "ripple-turn": { orange: { kind: "turn", seconds: 10 }, gray: { kind: "ripple", every: 10 } },
  turn: { orange: { kind: "turn", seconds: 8 } },
  breathe: { orange: { kind: "breathe", seconds: 3 } },
  orbit: { orange: { kind: "orbit", seconds: 5 } },
  pair: { orange: { kind: "turn", seconds: 5 }, gray: { kind: "turn", seconds: 10 } },
  dial: { gray: { kind: "dial", rings: 4, seconds: 1.25 } },
  ripple: { gray: { kind: "ripple", every: motionDefaults.gray.ripple.cross + motionDefaults.gray.ripple.glow } },
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
