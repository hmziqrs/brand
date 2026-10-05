import { Composition, Still } from "remotion"

import { Intro } from "./Intro"
import { Outro } from "./Outro"
import { RingLoop } from "./RingLoop"
import { Thumbnail } from "./Thumbnail"
import { loops, loopSeed } from "./loops"

/** Everything this project renders. Durations come from the loops' own periods,
 *  so a loop is exactly one run of its movement — no hold, no cut. */
const fps = 30
const wide = { width: 1920, height: 1080, fps } as const
const rippleTurn = loops.find((loop) => loop.preset === "ripple-turn")!

export const RemotionRoot = () => (
  <>
    <Composition id="intro" component={Intro} durationInFrames={5 * fps} {...wide} />
    <Composition id="outro" component={Outro} durationInFrames={10 * fps} {...wide} />
    <Still id="thumbnail" component={Thumbnail} width={3840} height={2160} defaultProps={{ kicker: "the hmziq brand", title: "One kit, every site", name: "hmziq" }} />
    {loops.map((loop) => (
      <Composition
        key={loop.preset}
        id={`${loop.preset}-loop`}
        component={RingLoop}
        durationInFrames={Math.round(loop.period * fps)}
        defaultProps={{ motion: loop.motion, seed: loopSeed }}
        {...wide}
      />
    ))}
    {/* The small GIF twin of the ripple-turn loop: half the frames a second, a third of the width. */}
    <Composition id="ripple-turn-640" component={RingLoop} durationInFrames={Math.round(rippleTurn.period * 15)} width={640} height={360} fps={15} defaultProps={{ motion: rippleTurn.motion, seed: loopSeed }} />
  </>
)
