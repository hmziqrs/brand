// The asset up-to-date check (assets.md). Read-only towards the repo: it
// opens files and hashes them, and never writes, moves or deletes anything
// the repo owns. Part of `pnpm check`.
//
// It fails on a missing manifest, on inputs that changed since the last render
// (a theme edit, a new template, a renderer or lockfile bump), on exports that
// were edited, went missing, or appeared without the renderer knowing, and on
// public copies that don't match the export they came from — and names the
// target and the command that fixes it. It reads the working tree, not git
// HEAD.
//
//   pnpm check:assets           the read-only check
//   pnpm check:assets --bytes   also re-render into a temp folder and compare
//
// --bytes (assets.md): macOS and Ubuntu renderers can produce slightly
// different bytes, so CI only checks manifests and inputs. This mode
// re-renders every target into a throwaway temp folder — the committed
// exports are never touched — and fails when a fresh render on this machine
// differs from what's committed.
import { spawnSync } from "node:child_process"
import { createHash } from "node:crypto"
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"

import { dimensions, exportFiles, exportsDir, manifestPath, publicCopies, rendererVersions, root, targetDigest, targets } from "./assets-lib.mjs"

const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex")
const problems = []
const bytesMode = process.argv.includes("--bytes")

/** The --bytes pass: render the target into a temp folder and compare the
 *  fresh bytes with the committed exports. Never writes in the repo. */
function bytesProblems(target, dir, fix) {
  const found = []
  const tmp = mkdtempSync(join(tmpdir(), "check-assets-"))
  try {
    const run = spawnSync(process.execPath, [join(root, "scripts/render-assets.mjs"), "--only", target.id, "--emit", tmp], { encoding: "utf8" })
    if (run.status !== 0) {
      found.push(`${target.id}: the byte-compare re-render failed — ${run.stderr.trim() || run.stdout.trim() || "no output"}`)
      return found
    }
    const fresh = [...exportFiles(tmp)]
    for (const rel of fresh) {
      const committed = join(dir, rel)
      if (!existsSync(committed)) {
        found.push(`${target.id}: ${rel} renders here but isn't committed — ${fix}`)
        continue
      }
      if (sha256(readFileSync(committed)) !== sha256(readFileSync(join(tmp, rel)))) {
        found.push(`${target.id}: ${rel} renders differently on this machine than the committed export — ${fix}`)
      }
    }
    return found
  } finally {
    rmSync(tmp, { recursive: true, force: true })
  }
}

for (const target of targets) {
  const fix = `run pnpm render-assets --only ${target.id}`
  const dir = exportsDir(target)

  if (!existsSync(manifestPath(target))) {
    problems.push(`${target.id}: no manifest.json in ${join(root, target.dir, "exports")} — ${fix}`)
    continue
  }
  const manifest = JSON.parse(readFileSync(manifestPath(target), "utf8"))

  let digest = null
  try {
    digest = targetDigest(target)
  } catch (error) {
    problems.push(`${target.id}: an input file is missing (${error.message}) — ${fix}`)
    continue
  }
  const matter = JSON.stringify({ renderers: rendererVersions, settings: target.settings })
  const changed = digest.inputs
    .filter((input) => !manifest.inputs.some((m) => m.path === input.path && m.sha256 === input.sha256))
    .map((input) => input.path)
  const gone = manifest.inputs.filter((m) => !digest.inputs.some((input) => input.path === m.path)).map((m) => m.path)
  const stale =
    manifest.digest !== digest.sha256 ||
    JSON.stringify(manifest.renderers) !== JSON.stringify(rendererVersions) ||
    changed.length > 0 ||
    gone.length > 0
  if (stale) {
    const why = [
      changed.length && `changed: ${changed.join(", ")}`,
      gone.length && `no longer an input: ${gone.join(", ")}`,
      manifest.digest !== digest.sha256 && !changed.length && !gone.length && `renderers or settings changed (${matter})`,
    ]
      .filter(Boolean)
      .join("; ")
    problems.push(`${target.id}: inputs changed since the last render — ${why} — ${fix}`)
  }

  for (const file of manifest.files) {
    const path = join(dir, file.path)
    if (!existsSync(path)) {
      problems.push(`${target.id}: ${file.path} is missing — ${fix}`)
      continue
    }
    const bytes = readFileSync(path)
    const dims = dimensions(file.path, bytes)
    if (bytes.length !== file.bytes || sha256(bytes) !== file.sha256 || dims.width !== file.width || dims.height !== file.height) {
      problems.push(`${target.id}: ${file.path} changed (size ${bytes.length}, manifest says ${file.bytes}) — ${fix}`)
    }
  }

  // Exports can sit in subfolders (social: sites/, blog/, avatars/, …), so
  // the check walks the whole folder, not just its top level.
  for (const rel of existsSync(dir) ? [...exportFiles(dir)] : []) {
    if (rel !== "manifest.json" && !manifest.files.some((file) => file.path === rel)) {
      problems.push(`${target.id}: ${rel} is in exports/ but not in the manifest — ${fix}`)
    }
  }

  // The --bytes pass, after the cheap ones: a fresh render compared byte for
  // byte with what's committed, in a temp folder the check cleans up itself.
  if (bytesMode) problems.push(...bytesProblems(target, dir, fix))
}

// The public copies (assets.md, "Getting assets into sites and apps"): each
// copied file must exist and match, byte for byte, the export it came from.
for (const copy of publicCopies) {
  const fix = `run pnpm render-assets`
  for (const file of copy.files) {
    const from = join(root, copy.from, file)
    const to = join(root, copy.to, file)
    if (!existsSync(from)) {
      problems.push(`${copy.id}: ${join(copy.from, file)} doesn't exist — run pnpm render-assets --only logos`)
      continue
    }
    if (!existsSync(to)) {
      problems.push(`${copy.id}: ${join(copy.to, file)} is missing — ${fix}`)
      continue
    }
    if (sha256(readFileSync(from)) !== sha256(readFileSync(to))) {
      problems.push(`${copy.id}: ${join(copy.to, file)} doesn't match ${join(copy.from, file)} — ${fix}`)
    }
  }
}

if (problems.length) {
  console.error("Generated assets are out of date:")
  for (const problem of problems) console.error(`  ${problem}`)
  process.exit(1)
}
console.log(
  `All ${targets.length} asset target(s) match their manifests and inputs, and every public copy matches${bytesMode ? ", and a fresh render matches every committed export byte for byte" : ""}.`,
)
