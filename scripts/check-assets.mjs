// The asset up-to-date check (assets.md). Read-only: it opens files and hashes
// them, and never writes, moves or deletes anything. Part of `pnpm check`.
//
// It fails on a missing manifest, on inputs that changed since the last render
// (a theme edit, a new template, a renderer or lockfile bump), on exports that
// were edited, went missing, or appeared without the renderer knowing — and
// names the target and the command that fixes it. It reads the working tree,
// not git HEAD; `pnpm check:assets --bytes`, the re-render-and-compare mode,
// arrives with the first cross-platform target.
//
//   pnpm check:assets
import { createHash } from "node:crypto"
import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"

import { dimensions, exportFiles, exportsDir, manifestPath, rendererVersions, root, targetDigest, targets } from "./assets-lib.mjs"

const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex")
const problems = []

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
}

if (problems.length) {
  console.error("Generated assets are out of date:")
  for (const problem of problems) console.error(`  ${problem}`)
  process.exit(1)
}
console.log(`All ${targets.length} asset target(s) match their manifests and inputs.`)
