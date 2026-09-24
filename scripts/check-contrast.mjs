// Measures every text/background pair in theme.css, in dark and light mode.
// Fails if any pair drops below WCAG AA, so a color change can't make the
// sites hard to read. The pairs are defined in src/lib/color.ts.
import { readFileSync } from "node:fs"
import { measure } from "../src/lib/color.ts"

const results = measure(readFileSync("theme.css", "utf8"))
const failed = results.filter((r) => !r.pass)

for (const r of results) {
  const mark = r.pass ? "ok  " : "FAIL"
  console.log(`${mark} ${r.label.padEnd(38)} dark ${r.ratio.dark.toFixed(1).padStart(4)}  light ${r.ratio.light.toFixed(1).padStart(4)}  (min ${r.min})`)
}

if (failed.length) {
  console.error(`\n${failed.length} pair(s) below AA. Adjust the colors in theme.css.`)
  process.exit(1)
}
console.log(`\nAll ${results.length} pairs pass AA in dark and light.`)
