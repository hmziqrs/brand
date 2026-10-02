// Renders the motion loop exports (assets.md phase 8): every moving ring
// preset as a 1920×1080 WebM, plus the 640-wide ripple-turn GIF. Before any
// frame is rendered, each loop is checked through the frame adapter for a
// seamless cut — the period ends exactly where it began, and the frame before
// it is not a copy of the first.
//
//   pnpm render:motion                       every loop and the GIF
//   pnpm render:motion --only ripple-turn    one loop
import { mkdirSync, readFileSync } from "node:fs"
import { join } from "node:path"

import { color, readTheme } from "@hmziq/brand-core/color"
import { heroPicture, ringFrames } from "@hmziq/brand-core/motion/frame"
import { bundle } from "@remotion/bundler"
import { renderMedia, selectComposition } from "@remotion/renderer"

import { loopSeed, loops } from "../src/loops.ts"
import { digest, fileEntry, flag, inputs, rendererVersions, root, writeManifest } from "./manifest.mjs"
import { webpackOverride } from "./webpack.mjs"

const entryPoint = join(root, "assets/video/source/src/index.ts")
const exportsDir = join(root, "assets/motion/exports")
const fps = 30

/** The seam check (assets.md): the state at the period's end is the state at
 *  its start, so the cut back to frame 0 is invisible — a ripple whose wave
 *  bled past the cut, or a dial mid-step, fails here. And the last frame of
 *  the render (one frame before the wrap) must not be a copy of the first: a
 *  loop whose movement finished early rests on its opening frame until the
 *  cut, which shows as a freeze. A fixed frame count alone doesn't prove
 *  that, so it is checked here, before any frame is rendered. */
function seam(loop) {
  const picture = heroPicture(loopSeed)
  const tokens = readTheme(readFileSync(join(root, "packages/brand-core/theme.css"), "utf8")).dark
  const palette = { primary: color(tokens, "primary"), line: color(tokens, "line"), foreground: color(tokens, "foreground") }
  const at = (t) => JSON.stringify(ringFrames(picture.list, loop.motion, loopSeed, palette, t))
  const frames = Math.round(loop.period * fps)
  return { wraps: at(0) === at(loop.period), live: at(0) !== at((frames - 1) / fps) }
}

const settings = { fps, width: 1920, height: 1080, codec: "vp9", gif: { id: "ripple-turn-640", width: 640, height: 360, fps: 15 }, loops: {} }
for (const loop of loops) {
  const { wraps, live } = seam(loop)
  if (!wraps) throw new Error(`The ${loop.preset} loop does not land on its first frame at ${loop.period}s — fix its timers in src/loops.ts`)
  if (!live) throw new Error(`The ${loop.preset} loop rests on its first frame before the cut — its movement must run right up to the period (fit its timers in src/loops.ts)`)
  settings.loops[loop.preset] = { period: loop.period, frames: Math.round(loop.period * fps) }
}

const serveUrl = await bundle({ entryPoint, webpackOverride, onProgress: () => {} })
const files = []
mkdirSync(exportsDir, { recursive: true })

const wanted = flag("only") ? [flag("only")] : loops.map((loop) => loop.preset)
for (const preset of wanted) {
  const loop = loops.find((l) => l.preset === preset)
  if (!loop) throw new Error(`No loop ${preset}. Known: ${loops.map((l) => l.preset).join(", ")}`)
  const composition = await selectComposition({ serveUrl, id: `${preset}-loop` })
  // One period, whole frames: the last frame is a frame before the wrap.
  if (composition.durationInFrames !== Math.round(loop.period * fps)) {
    throw new Error(`${preset}-loop is ${composition.durationInFrames} frames, not the ${Math.round(loop.period * fps)} of one period`)
  }
  const out = join(exportsDir, `${preset}.webm`)
  await renderMedia({ composition, serveUrl, codec: "vp9", outputLocation: out })
  const bytes = readFileSync(out)
  files.push(fileEntry(`${preset}.webm`, bytes, { width: composition.width, height: composition.height, duration: composition.durationInFrames / composition.fps, fps: composition.fps, codec: "vp9 / WebM" }))
  console.log(`rendered ${preset}.webm (${bytes.length} bytes, ${(composition.durationInFrames / composition.fps).toFixed(2)}s)`)
}

if (!flag("only")) {
  const gif = await selectComposition({ serveUrl, id: "ripple-turn-640" })
  const out = join(exportsDir, "ripple-turn-640.gif")
  await renderMedia({ composition: gif, serveUrl, codec: "gif", outputLocation: out })
  const bytes = readFileSync(out)
  files.push(fileEntry("ripple-turn-640.gif", bytes, { width: gif.width, height: gif.height, duration: gif.durationInFrames / gif.fps, fps: gif.fps, codec: "gif" }))
  console.log(`rendered ripple-turn-640.gif (${bytes.length} bytes)`)

  const inputList = inputs()
  writeManifest(exportsDir, {
    target: "motion",
    command: "pnpm render:motion",
    digest: digest(inputList, settings),
    renderers: rendererVersions,
    settings,
    inputs: inputList,
    files,
  })
  console.log(`wrote ${join(exportsDir, "manifest.json")}`)
}
