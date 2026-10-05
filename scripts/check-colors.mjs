// Brand rule: custom components and pages only use theme colors
// (bg-card, text-muted-foreground, text-green, bg-primary/10 …).
// Fails on Tailwind's numbered palette (bg-green-500), arbitrary colors
// (text-[#f80], bg-[oklch(…)]), black/white utilities and hex literals.
// Reads .tsx, .css, .astro and .svelte files (markup, <style> and <script>
// alike). Stock files are left as their library ships them — shadcn-svelte's
// ui/ in the Svelte kit (minus the kit's own Combobox), Starwind's starwind/
// in the Astro kit — and theme.css itself is core's, not a component's.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

const root = fileURLToPath(new URL("..", import.meta.url))
const roots = [
  // Core's src holds the tone class lists and color math; its theme.css and
  // the CSS next to it define the colors themselves, so they stay exempt.
  "packages/brand-core/src",
  // The Astro kit's own files (components, blocks, kit.css). Stock Starwind
  // is exempt, like stock shadcn ui/: it ships as Starwind wrote it.
  "packages/brand-astro/src",
  "boilerplates/astro-app/src",
  // The Svelte kit's own files (components, blocks, kit.css) and its
  // boilerplate's pages. Stock shadcn-svelte is exempt, like Starwind.
  "packages/brand-svelte/src/lib",
  "boilerplates/svelte-app/src",
].map((path) => join(root, path))
// Stock libraries keep their own colors (they map them to tokens, but write
// them their own way). The brand files around them do not. The one exception
// is the Svelte kit's Combobox: shadcn-svelte ships none, so ui/combobox is
// this repo's own code and is scanned like any other brand file.
const exempt = (file) =>
  file.startsWith(join(root, "packages/brand-astro/src/starwind")) ||
  (file.startsWith(join(root, "packages/brand-svelte/src/lib/ui")) &&
    !file.startsWith(join(root, "packages/brand-svelte/src/lib/ui/combobox")))
const property = "(?:bg|text|border(?:-[xytrbls])?|ring|ring-offset|outline|fill|stroke|from|via|to|decoration|divide|shadow|accent|caret|placeholder)"
const tailwindHues = "slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose"
const rules = [
  [new RegExp(`\\b${property}-(?:${tailwindHues})-\\d{2,3}\\b`), "Tailwind's numbered palette; use a theme color (text-green, bg-muted …)"],
  [new RegExp(`\\b${property}-\\[(?:#|rgb|hsl|oklch|oklab|lab|lch|color-mix)`), "a color typed in by hand; use a theme color"],
  [new RegExp(`\\b${property}-(?:black|white)\\b`), "black or white; use foreground / background"],
  [/(?<!href=)["'`\s(:]#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b(?![\w-])/, "a hex color; use a theme color"],
]

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
for (const root of roots.filter((path) => !missing.includes(path))) {
  for (const file of files(root)) {
    if (exempt(file)) continue
    readFileSync(file, "utf8").split("\n").forEach((line, i) => {
      for (const [pattern, why] of rules) {
        const m = line.match(pattern)
        if (m) problems.push(`${file}:${i + 1}  ${m[0].trim()}  (${why})`)
      }
    })
  }
}

// Self-test: the example files prove the rules still bite on .astro and
// .svelte files. The passing ones must stay clean and the failing ones must
// be caught; the scan roots never include scripts/examples.
const scan = (file) => {
  const found = []
  readFileSync(file, "utf8").split("\n").forEach((line, i) => {
    for (const [pattern, why] of rules) {
      const m = line.match(pattern)
      if (m) found.push(`  ${file}:${i + 1}  ${m[0].trim()}  (${why})`)
    }
  })
  return found
}
const passing = ["scripts/examples/colors-passing.astro", "scripts/examples/colors-passing.svelte"].map((file) => scan(join(root, file)))
const failing = ["scripts/examples/colors-failing.astro", "scripts/examples/colors-failing.svelte"].flatMap((file) => scan(join(root, file)))
if (passing.flat().length) problems.push(...passing.flat())
for (const [file, found] of [["scripts/examples/colors-failing.astro", failing.filter((f) => f.includes("colors-failing.astro"))], ["scripts/examples/colors-failing.svelte", failing.filter((f) => f.includes("colors-failing.svelte"))]]) {
  if (!found.length) {
    console.error(`${file} no longer trips the check.`)
    process.exit(1)
  }
}

if (problems.length) {
  console.error("Colors that don't come from the theme:")
  for (const p of problems) console.error("  " + p)
  process.exit(1)
}
console.log(`Every color comes from the theme. (self-test: ${failing.length} example violation${failing.length === 1 ? "" : "s"} caught)`)
