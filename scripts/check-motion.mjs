// Brand rule: nothing moves when you hover, press or focus it. Only colors change.
// Fails if a component uses a translate, scale or rotate utility under a
// hover / active / focus / pressed variant (e.g. `active:translate-y-px`).
import { readdirSync, readFileSync, statSync } from "node:fs"
import { join } from "node:path"

const roots = ["src/components", "src/brand"]
const interaction = /(^|-)(hover|active|focus|focus-visible|focus-within|pressed)$/
const movement = /^-?(translate|scale|rotate)-/

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
      for (const token of line.split(/[\s"'`{}(),]+/)) {
        const parts = token.split(":")
        if (parts.length < 2) continue
        const utility = parts.at(-1)
        const variants = parts.slice(0, -1)
        if (movement.test(utility) && variants.some((v) => interaction.test(v))) {
          problems.push(`${file}:${i + 1}  ${token}`)
        }
      }
    })
  }
}

if (problems.length) {
  console.error("Things move on hover/press/focus. The brand rule is color-only feedback:")
  for (const p of problems) console.error("  " + p)
  process.exit(1)
}
console.log("No movement on hover, press or focus.")
