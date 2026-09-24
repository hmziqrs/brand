// Brand rule: custom components and pages only use theme colors
// (bg-card, text-muted-foreground, text-green, bg-primary/10 …).
// Fails on Tailwind's numbered palette (bg-green-500), arbitrary colors
// (text-[#f80], bg-[oklch(…)]), black/white utilities and hex literals.
// shadcn's own files in src/components/ui are left as shadcn ships them.
import { readdirSync, readFileSync, statSync } from "node:fs"
import { join } from "node:path"

const roots = ["src/components/brand", "src/sites", "src/brand"]
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
    else if (/\.(tsx?|css)$/.test(name)) yield path
  }
}

const problems = []
for (const root of roots) {
  for (const file of files(root)) {
    readFileSync(file, "utf8").split("\n").forEach((line, i) => {
      for (const [pattern, why] of rules) {
        const m = line.match(pattern)
        if (m) problems.push(`${file}:${i + 1}  ${m[0].trim()}  (${why})`)
      }
    })
  }
}

if (problems.length) {
  console.error("Colors that don't come from the theme:")
  for (const p of problems) console.error("  " + p)
  process.exit(1)
}
console.log("Every color comes from the theme.")
