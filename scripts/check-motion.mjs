// Brand rule: nothing moves when you hover, press or focus it. Only colors change.
// Fails if a component uses a translate, scale or rotate utility under a
// hover / active / focus / pressed variant (e.g. `active:translate-y-px`), or
// a CSS `transform` with those functions in a rule whose selector sits under
// a hover / active / focus pseudo-class (e.g. `.card:hover`).
// Reads .tsx, .css, .astro and .svelte files (markup, <style> and <script>
// alike), stock Starwind and stock shadcn-svelte included: whoever wrote it,
// it must not move.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

const root = fileURLToPath(new URL("..", import.meta.url))
const roots = [
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
// The same rule as CSS: a transform declaration that moves things, inside a
// rule whose selector is scoped to an interaction pseudo-class. Matching the
// innermost `selector { body }` pairs keeps @media nesting working (its own
// braces never form a pair with the rule's).
const interactionPseudo = /:(hover|active|focus|focus-visible|focus-within)\b/i
const cssMovement = /transform\s*:\s*[^;}]*\b(?:translate|scale|rotate)/i

function* files(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) yield* files(path)
    else if (/\.(tsx?|css|astro|svelte)$/.test(name)) yield path
  }
}

// A missing scan folder is an error, not a silent skip (structure.md,
// "Checks"): by now every root exists, so a missing one means the repo
// moved underneath the check.
const missing = roots.filter((root) => !existsSync(root))
if (missing.length) {
  console.error("Scan folder missing — the check no longer covers the repo:")
  for (const path of missing) console.error(`  ${path}`)
  process.exit(1)
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

// CSS in `<style>` blocks (the whole file when it is .css): a rule whose
// selector sits under a hover/active/focus pseudo-class must not move things
// with transform — the stylesheet spelling of the same brand rule.
const scanCss = (file) => {
  const source = readFileSync(file, "utf8")
  if (/\.(tsx?|ts)$/.test(file)) return []
  const regions = file.endsWith(".css")
    ? [[0, source.length]]
    : [...source.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((m) => [
        m.index + m[0].indexOf(m[1]),
        m.index + m[0].length,
      ])
  const found = []
  for (const [start, end] of regions) {
    const css = source.slice(start, end)
    for (const rule of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
      if (!interactionPseudo.test(rule[1])) continue
      const move = rule[2].match(cssMovement)
      if (!move) continue
      const at = start + rule.index + rule[0].indexOf(move[0])
      found.push(`  ${file}:${source.slice(0, at).split("\n").length}  ${move[0]}`)
    }
  }
  return found
}

const check = (file) => [...scan(file), ...scanCss(file)]

for (const root of roots.filter((path) => !missing.includes(path))) {
  for (const file of files(root)) {
    problems.push(...check(file))
  }
}

// Self-test: the example files prove the rule still bites on .astro and
// .svelte files, class tokens and <style> rules both. The passing ones must
// stay clean and the failing ones must be caught; the scan roots never
// include scripts/examples.
const passing = ["scripts/examples/motion-passing.astro", "scripts/examples/motion-passing.svelte"].map((file) => check(join(root, file)))
const failing = ["scripts/examples/motion-failing.astro", "scripts/examples/motion-failing.svelte"].flatMap((file) => check(join(root, file)))
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
