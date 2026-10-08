// Renders the generated assets (assets.md): each target's files into its
// exports/ folder, plus the manifest that check:assets verifies. Everything
// generated comes from @hmziq/brand-core and the fonts in assets/fonts — the
// renderers are passed in, so templates stay plain code.
//
//   pnpm render-assets                  every target
//   pnpm render-assets --only test-card one target
//   pnpm render-assets --name "Paperplane" --symbol Pp --out <folder>
//                                       an icon pack for a name outside the roster
//
// Video and motion targets come later (render:video, render:motion).
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"

import { color, inBand, readTheme, svgPaint, toHex } from "../packages/brand-core/src/color.ts"
import { family } from "../packages/brand-core/src/family.ts"
import { publicCopies, exportFiles, exportsDir, fileEntry, manifestPath, rendererVersions, root, targetDigest, targets } from "./assets-lib.mjs"
import { packFiles } from "../assets/logos/source/pack.ts"
import { settings as logosSettings } from "../assets/logos/source/settings.ts"

const arg = (name) => {
  const i = process.argv.indexOf(`--${name}`)
  return i === -1 ? undefined : process.argv[i + 1]
}

// The outline tool and the ICO writer are renderers like resvg: loaded here,
// recorded in the manifest's renderers section, handed to the templates.
const opentype = (await import("opentype.js")).default
const pngToIco = (await import("png-to-ico")).default
const outlineFont = (file) => {
  const bytes = readFileSync(file)
  return opentype.parse(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength))
}
const outlineFonts = (names) => Object.fromEntries(names.map((name) => [name, outlineFont(join(fontsDir, name))]))

const theme = readTheme(readFileSync(join(root, "packages/brand-core/theme.css"), "utf8"))
const fontsDir = join(root, "assets/fonts")
const logosFontFiles = logosSettings.fonts.map((name) => join(fontsDir, name))

// The --name --symbol --out command (assets.md phase 3): a full icon pack for
// a name outside the roster, written wherever the caller points. Targets
// aren't re-rendered — the committed exports stay as they are.
const packName = arg("name")
const packSymbol = arg("symbol")
const packOut = arg("out")
if (packName !== undefined || packSymbol !== undefined || packOut !== undefined) {
  if (!packName || !packSymbol || !packOut) {
    console.error('render-assets: --name, --symbol and --out go together — pnpm render-assets --name "Paperplane" --symbol Pp --out <folder>')
    process.exit(1)
  }
  const inRoster = family.find((f) => f.name.toLowerCase() === packName.toLowerCase() || f.id === packName.toLowerCase())
  if (inRoster) {
    console.error(`${packName} is in the roster; its pack is already rendered at assets/logos/exports/${inRoster.id}/`)
    process.exit(1)
  }
  const files = await packFiles(
    { theme, color, svgPaint, toHex, Resvg: (await import("@resvg/resvg-js")).Resvg, outlineFont: outlineFont(logosFontFiles[0]), pngToIco, fontFiles: logosFontFiles },
    { name: packName, symbol: packSymbol },
  )
  mkdirSync(packOut, { recursive: true })
  for (const [name, content] of Object.entries(files)) {
    writeFileSync(join(packOut, name), Buffer.isBuffer(content) ? content : Buffer.from(content, "utf8"))
  }
  console.log(`rendered the ${packName} pack into ${packOut}: ${Object.keys(files).length} files`)
  process.exit(0)
}

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

// --emit <folder> (used by `pnpm check:assets --bytes`, assets.md): render
// the selected targets into a folder of the caller's choosing instead of the
// repo's exports/ folders. Nothing under assets/ or apps/ is read for
// writing, no manifest is written and no public copy is synced — the caller
// compares the bytes and throws the folder away.
const emitDir = arg("emit")

for (const target of selected) {
  const files = await target.render({
    theme,
    color,
    inBand,
    svgPaint,
    toHex,
    Resvg: (await import("@resvg/resvg-js")).Resvg,
    outlineFont: outlineFont(join(fontsDir, target.settings.fonts[0])),
    outlineFonts: outlineFonts(target.settings.fonts),
    pngToIco,
    fontFiles: target.settings.fonts.map((name) => join(fontsDir, name)),
  })

  if (emitDir) {
    for (const [name, content] of Object.entries(files)) {
      const bytes = Buffer.isBuffer(content) ? content : Buffer.from(content, "utf8")
      mkdirSync(dirname(join(emitDir, name)), { recursive: true })
      writeFileSync(join(emitDir, name), bytes)
    }
    console.log(`emitted ${target.id} into ${emitDir} (${Object.keys(files).length} files)`)
    continue
  }

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

// The public copies (assets-lib): the committed exports, so a fresh render
// and a fresh copy always agree. An --emit run never touches them.
if (!emitDir) for (const copy of publicCopies) {
  for (const file of copy.files) {
    const from = join(root, copy.from, file)
    if (!existsSync(from)) {
      console.error(`${copy.from} is missing ${file}; render it first — pnpm render-assets --only logos`)
      process.exit(1)
    }
    mkdirSync(dirname(join(root, copy.to, file)), { recursive: true })
    writeFileSync(join(root, copy.to, file), readFileSync(from))
  }
  console.log(`synced ${copy.id}: ${copy.files.length} files from ${copy.from} into ${copy.to}`)
}
