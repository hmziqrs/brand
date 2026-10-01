// Renders the video exports (assets.md phase 7): the intro and outro as
// 1920×1080 H.264 MP4s, YouTube-shaped (faststart checked below). The
// thumbnail template is a still:
//
//   pnpm render:video                          intro.mp4 and outro.mp4
//   pnpm render:video --only intro             one of them
//   pnpm render:video --still thumbnail --out ~/Desktop/thumb.png --title "One kit"
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"

import { bundle } from "@remotion/bundler"
import { renderMedia, renderStill, selectComposition } from "@remotion/renderer"

import { digest, faststarted, fileEntry, flag, inputs, rendererVersions, root, writeManifest } from "./manifest.mjs"
import { webpackOverride } from "./webpack.mjs"

const entryPoint = join(root, "assets/video/source/src/index.ts")
const exportsDir = join(root, "assets/video/exports")
const fps = 30
const settings = { fps, width: 1920, height: 1080, codec: "h264", crf: 16, x264Preset: "slow", colorSpace: "bt709", compositions: {} }

const serveUrl = await bundle({ entryPoint, webpackOverride, onProgress: () => {} })
const files = []

if (flag("still")) {
  const out = flag("out") ?? join(exportsDir, "thumbnail-3840x2160.png")
  const composition = await selectComposition({ serveUrl, id: "thumbnail", inputProps: {} })
  const inputProps = {
    ...(composition.defaultProps ?? {}),
    ...(flag("title") ? { title: flag("title") } : {}),
    ...(flag("kicker") ? { kicker: flag("kicker") } : {}),
  }
  // renderStill hands back the bytes; the file is written here so the output
  // path is always this repo's, whatever Remotion did internally.
  const { buffer, contentType } = await renderStill({ composition, serveUrl, imageFormat: "png", inputProps })
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, buffer)
  console.log(`rendered ${out} (${buffer.length} bytes, ${contentType})`)
} else {
  const wanted = flag("only") ? [flag("only")] : ["intro", "outro"]
  mkdirSync(exportsDir, { recursive: true })
  for (const id of wanted) {
    const composition = await selectComposition({ serveUrl, id })
    const out = join(exportsDir, `${id}.mp4`)
    // SDR BT.709 is what YouTube asks of uploads (assets.md's appendix).
    await renderMedia({ composition, serveUrl, codec: "h264", crf: 16, x264Preset: "slow", colorSpace: "bt709", outputLocation: out })
    const bytes = readFileSync(out)
    if (!faststarted(bytes)) throw new Error(`${id}.mp4 is not faststart (moov after mdat) — not fit for YouTube upload`)
    settings.compositions[id] = { durationInFrames: composition.durationInFrames, fps: composition.fps, width: composition.width, height: composition.height }
    files.push(fileEntry(`${id}.mp4`, bytes, { width: composition.width, height: composition.height, duration: composition.durationInFrames / composition.fps, fps: composition.fps, codec: "h264 / MP4" }))
    console.log(`rendered ${id}.mp4 (${bytes.length} bytes, ${(composition.durationInFrames / composition.fps).toFixed(2)}s)`)
  }

  const inputList = inputs()
  writeManifest(exportsDir, {
    target: "video",
    command: "pnpm render:video",
    digest: digest(inputList, settings),
    renderers: rendererVersions,
    settings,
    inputs: inputList,
    files,
  })
  console.log(`wrote ${join(exportsDir, "manifest.json")}`)
}
