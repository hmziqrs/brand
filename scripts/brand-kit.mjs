// Keeps the copy of theme.css inside BRAND.md identical to the real file.
//   node scripts/brand-kit.mjs          rewrite the block in BRAND.md
//   node scripts/brand-kit.mjs --check  fail if the block is out of date
import { readFileSync, writeFileSync } from "node:fs"

const start = "<!-- theme.css:start -->"
const end = "<!-- theme.css:end -->"
const doc = readFileSync("BRAND.md", "utf8")
const theme = readFileSync("theme.css", "utf8").trimEnd()

const from = doc.indexOf(start)
const to = doc.indexOf(end)
if (from === -1 || to === -1) {
  console.error(`BRAND.md is missing the ${start} / ${end} markers.`)
  process.exit(1)
}

const updated = `${doc.slice(0, from + start.length)}\n\`\`\`css\n${theme}\n\`\`\`\n${doc.slice(to)}`

if (process.argv.includes("--check")) {
  if (updated !== doc) {
    console.error("BRAND.md has an outdated copy of theme.css. Run: pnpm brand-kit:sync")
    process.exit(1)
  }
  console.log("BRAND.md matches theme.css.")
} else {
  writeFileSync("BRAND.md", updated)
  console.log("BRAND.md updated from theme.css.")
}
