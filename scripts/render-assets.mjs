// Renders the generated assets (assets.md): each target's files into its
// exports/ folder, plus the manifest that check:assets verifies. Everything
// generated comes from @hmziq/brand-core and the fonts in assets/fonts — the
// renderer is passed in, so templates stay plain code.
//
//   pnpm render-assets                  every target
//   pnpm render-assets --only test-card one target
//
// Video and motion targets come later (render:video, render:motion); the
// --name --symbol --out icon-pack command arrives with the packs (phase 3).
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"

import { color, inBand, readTheme, svgPaint, toHex } from "../packages/brand-core/src/color.ts"
import { exportFiles, exportsDir, fileEntry, manifestPath, rendererVersions, root, targetDigest, targets } from "./assets-lib.mjs"

const only = process.argv.indexOf("--only")
const selected = only === -1 ? targets : targets.filter((t) => t.id === process.argv[only + 1])
if (!selected.length) {
  console.error(`No target named ${process.argv[only + 1]}. Known targets: ${targets.map((t) => t.id).join(", ")}`)
  process.exit(1)
}

/** Removes a folder's empty subfolders, deepest first. Never the folder itself. */
function pruneEmptyFolders(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    const path = join(dir, entry.name)
    pruneEmptyFolders(path)
    if (readdirSync(path).length === 0) rmSync(path)
  }
}

const theme = readTheme(readFileSync(join(root, "packages/brand-core/theme.css"), "utf8"))
const fontsDir = join(root, "assets/fonts")

for (const target of selected) {
  const files = target.render({
    theme,
    color,
    inBand,
    svgPaint,
    toHex,
    Resvg: (await import("@resvg/resvg-js")).Resvg,
    fontFiles: target.settings.fonts.map((name) => join(fontsDir, name)),
  })

  const dir = exportsDir(target)
  mkdirSync(dir, { recursive: true })
  // Files can sit in subfolders (social spreads its exports over sites/,
  // blog/, …), so stale files are removed wherever they are and folders the
  // render no longer fills are pruned.
  for (const rel of exportFiles(dir)) {
    if (rel !== "manifest.json" && !(rel in files)) rmSync(join(dir, rel))
  }
  pruneEmptyFolders(dir)

  const entries = []
  for (const [name, content] of Object.entries(files)) {
    const bytes = Buffer.isBuffer(content) ? content : Buffer.from(content, "utf8")
    mkdirSync(dirname(join(dir, name)), { recursive: true })
    writeFileSync(join(dir, name), bytes)
    entries.push(fileEntry(dir, name, bytes))
  }

  const { inputs, sha256 } = targetDigest(target)
  writeFileSync(
    manifestPath(target),
    `${JSON.stringify(
      {
        target: target.id,
        command: `pnpm render-assets --only ${target.id}`,
        digest: sha256,
        renderers: rendererVersions,
        settings: target.settings,
        inputs,
        files: entries,
      },
      null,
      2,
    )}\n`,
  )
  console.log(`rendered ${target.id}: ${entries.map((e) => `${e.path} (${e.bytes} bytes)`).join(", ")}`)
}
