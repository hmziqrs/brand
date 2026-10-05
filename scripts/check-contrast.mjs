// Measures every text/background pair in theme.css, in dark and light mode.
// Fails if any pair drops below WCAG AA, so a color change can't make the
// sites hard to read. The pairs are defined in @hmziq/brand-core's color.ts;
// the theme is the package's theme.css.
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { fileURLToPath } from "node:url"
import { measure } from "../packages/brand-core/src/color.ts"

const root = fileURLToPath(new URL("..", import.meta.url))
const results = measure(readFileSync(join(root, "packages/brand-core/theme.css"), "utf8"))
const failed = results.filter((r) => !r.pass)

for (const r of results) {
  const mark = r.pass ? "ok  " : "FAIL"
  console.log(`${mark} ${r.label.padEnd(38)} dark ${r.ratio.dark.toFixed(1).padStart(4)}  light ${r.ratio.light.toFixed(1).padStart(4)}  (min ${r.min})`)
}

if (failed.length) {
  console.error(`\n${failed.length} pair(s) below AA. Adjust the colors in packages/brand-core/theme.css.`)
  process.exit(1)
}
console.log(`\nAll ${results.length} pairs pass AA in dark and light.`)
