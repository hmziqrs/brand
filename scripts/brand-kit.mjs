// Keeps the generated parts of BRAND.md identical to theme.css:
//   theme.css  an exact copy of the file
//   palette    the colors table (hex values in both modes)
//   contrast   the measured contrast table
//   node scripts/brand-kit.mjs          rewrite those blocks in BRAND.md
//   node scripts/brand-kit.mjs --check  fail if any block is out of date
import { readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { fileURLToPath } from "node:url"
import { color, hues, hueUses, measure, readTheme, toHex } from "../packages/brand-core/src/color.ts"

const root = fileURLToPath(new URL("..", import.meta.url))
const css = readFileSync(join(root, "packages/brand-core/theme.css"), "utf8")
const theme = readTheme(css)
const hex = (mode, name) => toHex(color(theme[mode], name).rgb)

const blocks = {
  "theme.css": "```css\n" + css.trimEnd() + "\n```",
  palette: [
    "| Color | Dark mode | Light mode | Role | For |",
    "| --- | --- | --- | --- | --- |",
    ...hues.map((h) => {
      const { role, use } = hueUses[h]
      return `| \`${h}\` | \`${theme.dark[`--${h}`]}\` · \`${hex("dark", h)}\` | \`${theme.light[`--${h}`]}\` · \`${hex("light", h)}\` | ${role ? `\`${role}\`` : ""} | ${use} |`
    }),
  ].join("\n"),
  contrast: [
    "| Pair | Dark | Light | Needs |",
    "| --- | --- | --- | --- |",
    ...measure(css).map((r) => `| ${r.label} | ${r.ratio.dark.toFixed(1)}:1 | ${r.ratio.light.toFixed(1)}:1 | ${r.min}:1 |`),
  ].join("\n"),
}

const doc = readFileSync(join(root, "BRAND.md"), "utf8")
let updated = doc
for (const [name, body] of Object.entries(blocks)) {
  const start = `<!-- ${name}:start -->`
  const end = `<!-- ${name}:end -->`
  const from = updated.indexOf(start)
  const to = updated.indexOf(end)
  if (from === -1 || to === -1) {
    console.error(`BRAND.md is missing the ${start} / ${end} markers.`)
    process.exit(1)
  }
  updated = `${updated.slice(0, from + start.length)}\n${body}\n${updated.slice(to)}`
}

if (process.argv.includes("--check")) {
  if (updated !== doc) {
    console.error("BRAND.md is out of date with theme.css. Run: pnpm brand-kit:sync")
    process.exit(1)
  }
  console.log("BRAND.md matches theme.css.")
} else {
  writeFileSync(join(root, "BRAND.md"), updated)
  console.log("BRAND.md updated from theme.css.")
}
