# Fonts

The fonts every brand asset is drawn with: Onest for text, JetBrains Mono for
code (BRAND.md §5). Node rendering (resvg, later Satori) loads the static TTFs
with system fonts off; browser rendering (the Storybook manager, later video)
loads the variable WOFF2. Never a synthesized weight: each weight is its own
file.

| File | Used for | Source |
| --- | --- | --- |
| `onest-latin-400-normal.ttf` | Node: body text | Fontsource CDN, `onest@5.3.1` |
| `onest-latin-500-normal.ttf` | Node: medium text | Fontsource CDN, `onest@5.3.1` |
| `onest-latin-600-normal.ttf` | Node: wordmarks and headings | Fontsource CDN, `onest@5.3.1` |
| `jetbrains-mono-latin-400-normal.ttf` | Node: code | Fontsource CDN, `jetbrains-mono@5.3.0` |
| `onest-latin-wght-normal.woff2` | Browser: the Storybook manager | `@fontsource-variable/onest` (matches `^5.3.1`, the lab's version) |

Both families are SIL OFL 1.1: `LICENSE-Onest.txt` (copyright 2021 The Onest
Project Authors) and `LICENSE-JetBrains-Mono.txt` (copyright 2020 The JetBrains
Mono Project Authors), copied from the same Fontsource packages as the TTFs.

Static TTFs were fetched from `https://cdn.jsdelivr.net/fontsource/fonts/<id>@<version>/latin-<weight>-normal.ttf`
(checked 2026-10-01). The TTFs are the `latin` subset, the only subset the
brand's Latin-alphabet assets need. When a package version is bumped, re-fetch
every weight of that family in one go so the files stay a matched set.

The lab and both kits load the variable fonts from npm (`@fontsource-variable/onest`,
`@fontsource-variable/jetbrains-mono`); this folder is for generated assets.
