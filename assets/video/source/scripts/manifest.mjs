// The manifest half of the video and motion exports (assets.md): the same
// shape the static assets' manifests have — every file with its hash and size,
// and a digest of everything the render read — plus what only video records:
// duration, fps and codec.
import { createHash } from "node:crypto"
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs"
import { createRequire } from "node:module"
import { join, relative } from "node:path"
import { fileURLToPath } from "node:url"

/** The repo root (assets/video/source/scripts → up four). */
export const root = fileURLToPath(new URL("../../../../", import.meta.url))
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex")

// A video render reads what a static one does — the theme, the roster, the
// logo recipe, the ring code, the fonts, its own templates and scripts, the
// lockfile — plus the motion code and the variable WOFF2, which only a browser
// render uses. Outputs never count as inputs.
const inputFiles = [
  "packages/brand-core/theme.css",
  "packages/brand-core/rings.css",
  "packages/brand-core/src/color.ts",
  "packages/brand-core/src/family.ts",
  "packages/brand-core/src/logo.ts",
  // The project's own settings: the version pins and the studio's webpack
  // override sit here, next to the lockfile that resolves them.
  "assets/video/source/package.json",
  "assets/video/source/remotion.config.ts",
  "pnpm-lock.yaml",
]
const inputDirs = ["packages/brand-core/src/motion", "assets/fonts", "assets/video/source/src", "assets/video/source/scripts"]

function* walk(dir) {
  for (const name of readdirSync(dir).sort()) {
    if (name === "node_modules" || name.startsWith(".")) continue
    const path = join(dir, name)
    if (statSync(path).isDirectory()) yield* walk(path)
    else yield path
  }
}

/** Everything a render depends on, as repo-relative paths with hashes, sorted. */
export function inputs() {
  const files = new Map()
  const add = (abs) => files.set(relative(root, abs).split("\\").join("/"), sha256(readFileSync(abs)))
  for (const path of inputFiles) add(join(root, path))
  for (const dir of inputDirs) for (const abs of walk(join(root, dir))) add(abs)
  return [...files].map(([path, hash]) => ({ path, sha256: hash })).sort((a, b) => (a.path < b.path ? -1 : 1))
}

/** The Remotion versions a render ran on, read without loading the renderer. */
export const rendererVersions = (() => {
  const require = createRequire(join(root, "assets/video/source/package.json"))
  const at = (name) => JSON.parse(readFileSync(require.resolve(`${name}/package.json`), "utf8")).version
  return { remotion: at("remotion"), "@remotion/renderer": at("@remotion/renderer") }
})()

/** The digest of the inputs, the renderer versions and the render settings. */
export function digest(inputList, settings) {
  return sha256(Buffer.from(JSON.stringify({ inputs: inputList, renderers: rendererVersions, settings })))
}

/** One exported file: what an image's entry has, plus duration, fps and codec. */
export function fileEntry(name, bytes, { width, height, duration, fps, codec }) {
  return { path: name, sha256: sha256(bytes), bytes: bytes.length, width, height, duration, fps, codec }
}

/**
 * YouTube asks for faststart MP4s: the moov index must come before the picture
 * data, or playback waits for the whole file to download. True when it does.
 */
export function faststarted(bytes) {
  let at = 0
  const head = bytes.subarray(0, 1 << 20)
  while (at + 8 <= head.length) {
    const type = head.toString("latin1", at + 4, at + 8)
    if (type === "moov") return true
    if (type === "mdat") return false
    const size = head.readUInt32BE(at)
    if (size <= 0 || at + size > head.length) return false
    at += size
  }
  return false
}

/** Writes one exports folder's manifest. */
export function writeManifest(dir, manifest) {
  writeFileSync(join(dir, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`)
}

/** Reads a `--flag value` (or `--flag` alone, as true) from the command line. */
export function flag(name) {
  const at = process.argv.indexOf(`--${name}`)
  if (at === -1) return undefined
  const next = process.argv[at + 1]
  return next && !next.startsWith("--") ? next : true
}
