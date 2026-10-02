// Renders the video exports (assets.md phase 7): the intro and outro as
// 1920×1080 H.264 MP4s, YouTube-shaped (faststart checked below). The
// thumbnail template is a still:
//
//   pnpm render:video                          intro.mp4 and outro.mp4
//   pnpm render:video --only intro             one of them; the manifest still
//                                              records both
//   pnpm render:video --still thumbnail --out ~/Desktop/thumb.png --title "One kit"
//
// A thumbnail is filled in per video, so --still always takes an --out of its
// own: a per-video PNG never lands in exports/, which the manifest records.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"

import { bundle } from "@remotion/bundler"
import { renderMedia, renderStill, selectComposition } from "@remotion/renderer"

import { digest, faststarted, fileEntry, flag, inputs, rendererVersions, root, sha256, writeManifest } from "./manifest.mjs"
import { webpackOverride } from "./webpack.mjs"

const entryPoint = join(root, "assets/video/source/src/index.ts")
const exportsDir = join(root, "assets/video/exports")
const fps = 30
const settings = { fps, width: 1920, height: 1080, codec: "h264", crf: 16, x264Preset: "slow", colorSpace: "bt709", compositions: {} }

const serveUrl = await bundle({ entryPoint, webpackOverride, onProgress: () => {} })
const files = []

if (flag("still")) {
  const out = flag("out")
  if (typeof out !== "string" || !out.trim()) {
    throw new Error("--still needs --out <file>: a thumbnail is filled in per video and goes where you send it — exports/ holds only what the manifest records")
  }
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
  const compositions = ["intro", "outro"]
  const wanted = flag("only") ? [flag("only")] : compositions
  for (const id of wanted) {
    if (!compositions.includes(id)) throw new Error(`No composition ${id}. Known: ${compositions.join(", ")}`)
  }
  mkdirSync(exportsDir, { recursive: true })
  // `--only` re-renders one file, but the manifest still records every export
  // (assets.md: "a manifest.json recording every file's path"): the rest are
  // carried over from the last manifest, and only while the file on disk still
  // hashes to what it recorded.
  let last
  try {
    last = JSON.parse(readFileSync(join(exportsDir, "manifest.json"), "utf8"))
  } catch {
    last = undefined
  }
  for (const id of compositions) {
    const out = join(exportsDir, `${id}.mp4`)
    if (!wanted.includes(id)) {
      const entry = last?.files?.find((file) => file.path === `${id}.mp4`)
      const recorded = last?.settings?.compositions?.[id]
      if (!entry || !recorded || !existsSync(out) || sha256(readFileSync(out)) !== entry.sha256) {
        throw new Error(`${id}.mp4 was neither rendered this run nor unchanged since the last manifest — run a full pnpm render:video`)
      }
      settings.compositions[id] = recorded
      files.push(entry)
      console.log(`kept ${id}.mp4 from the last manifest (${entry.bytes} bytes)`)
      continue
    }
    const composition = await selectComposition({ serveUrl, id })
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
