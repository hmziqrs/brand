// Brand rule: nothing moves when you hover, press or focus it. Only colors change.
// Fails if a component uses a translate, scale or rotate utility under a
// hover / active / focus / pressed variant (e.g. `active:translate-y-px`).
// Reads .tsx, .css, .astro and .svelte files (markup, <style> and <script>
// alike), stock Starwind and stock shadcn-svelte included: whoever wrote it,
// it must not move.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

const root = fileURLToPath(new URL("..", import.meta.url))
const roots = [
  "apps/lab/src/components",
  "apps/lab/src/brand",
  "apps/lab/src/sites",
  "apps/lab/src/templates",
  // Core's src and the CSS next to its theme.css (rings.css, logo.css).
  "packages/brand-core",
  // The whole Astro kit, stock Starwind included: whatever moves on hover,
  // press or focus goes, whoever wrote it.
  "packages/brand-astro/src",
  "boilerplates/astro-app/src",
  // The whole Svelte kit and its boilerplate, stock shadcn-svelte included.
  "packages/brand-svelte/src/lib",
  "boilerplates/svelte-app/src",
].map((path) => join(root, path))
const interaction = /(^|-)(hover|active|focus|focus-visible|focus-within|pressed)$/
const movement = /^-?(translate|scale|rotate)-/

function* files(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) yield* files(path)
    else if (/\.(tsx?|css|astro|svelte)$/.test(name)) yield path
  }
}

// Folders that don't exist yet (a boilerplate still to be built) are said so
// loudly, not skipped silently — and not fatal either, since their plan step
// hasn't run.
const missing = roots.filter((root) => !existsSync(root))
for (const path of missing) {
  console.warn(`not scanned, folder missing: ${path}`)
}

const problems = []
const tokens = (line) =>
  line
    .split(/[\s"'`{}(),]+/)
    .map((token) => token.split(":"))
    .filter((parts) => parts.length >= 2)
    .map((parts) => ({ utility: parts.at(-1), variants: parts.slice(0, -1) }))

const scan = (file) => {
  const found = []
  readFileSync(file, "utf8").split("\n").forEach((line, i) => {
    for (const { utility, variants } of tokens(line)) {
      if (movement.test(utility) && variants.some((v) => interaction.test(v))) {
        found.push(`  ${file}:${i + 1}  ${utility}`)
      }
    }
  })
  return found
}

for (const root of roots.filter((path) => !missing.includes(path))) {
  for (const file of files(root)) {
    problems.push(...scan(file))
  }
}

// Self-test: the example files prove the rule still bites on .astro and
// .svelte files. The passing ones must stay clean and the failing ones must
// be caught; the scan roots never include scripts/examples.
const passing = ["scripts/examples/motion-passing.astro", "scripts/examples/motion-passing.svelte"].map((file) => scan(join(root, file)))
const failing = ["scripts/examples/motion-failing.astro", "scripts/examples/motion-failing.svelte"].flatMap((file) => scan(join(root, file)))
if (passing.flat().length) problems.push(...passing.flat())
for (const [file, found] of [["scripts/examples/motion-failing.astro", failing.filter((f) => f.includes("motion-failing.astro"))], ["scripts/examples/motion-failing.svelte", failing.filter((f) => f.includes("motion-failing.svelte"))]]) {
  if (!found.length) {
    console.error(`${file} no longer trips the check.`)
    process.exit(1)
  }
}

if (problems.length) {
  console.error("Things move on hover/press/focus. The brand rule is color-only feedback:")
  for (const p of problems) console.error("  " + p)
  process.exit(1)
}
console.log(`No movement on hover, press or focus. (self-test: ${failing.length} example violation${failing.length === 1 ? "" : "s"} caught)`)
