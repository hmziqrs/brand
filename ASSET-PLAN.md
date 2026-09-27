# hmziq brand — asset creation plan

**One paragraph summary.** Every committed brand asset — logos and logo variants, Open Graph images, social media images, video intros and outros, favicons and app icons, and motion exports — descends from a small set of **authored masters** (SVG mark / wordmark / tile-template, satori OG/social templates as plain-object element trees, committed static-instance TTFs for Onest 400/600 plus the variable woff2, and a Remotion project reusing `src/lib/rings.ts` and the 3D scenes) feeding **one generator**, `scripts/render-assets.mjs`, built on satori + `@resvg/resvg-js` + `png-to-ico`, with colors read from `theme.css` via `readTheme`/`toHex` (`src/lib/color.ts:101,90` — the import `scripts/brand-kit.mjs:8` already proves works from Node `.mjs`) and the site roster from `family.ts`. The generator produces every committed export under the `assets/{logos,social,video,motion,fonts}/exports` split STRUCTURE-PROPOSAL.md:53-60 proposes, and a committed SHA-256 manifest plus input digest wired into `pnpm check` guards the whole surface from day one — the same generate-then-verify loop `scripts/brand-kit.mjs` already proves on BRAND.md, sized for one maintainer who never hand-tweaks a generated file.

---

## The source-of-truth rule

Four rules. If you can recite them, you know where to edit and where not to.

**1. AUTHORED — the only files a human edits.**

- **SVG masters in `assets/logos/source/`** — `mark.svg` (the hmziq `Hq` tile per BRAND.md §7:668-679), `tile.template.svg` (one parameterized tile with `{symbol}` and color slots), `wordmark.svg` (name + square: Onest 600, tracking −0.02em, square 0.36em at ml 0.07em — BRAND.md §7:658-666), `lockup.svg` (mark + wordmark).
- **Layout templates in `assets/social/source/`** — satori element trees as plain objects, no React/JSX (satori is flexbox-only: px numbers, no cascade, no grid, no z-index).
- **The Remotion compositions in `assets/video/source/`** — intro, outro, motion loops.
- **Fonts in `assets/fonts/`** — static-instance TTFs for every Node-side renderer (Onest Regular 400, Onest SemiBold 600, JetBrains Mono 400) plus the two variable woff2 for Chrome-based consumers only (Storybook manager chrome, Remotion `loadFont`), where variation axes work natively. **Variable TTFs are banned from the pipeline**: the round-2 review measured all three Node consumers failing on `Onest[wght].ttf` — satori 0.33.5 crashes (TypeError in `@shuding/opentype.js` `parseFvarAxis` before rendering anything); `@resvg/resvg-js` 2.6.2 silently rasterizes `font-weight:600` text at the default 400 instance (byte-differs from the static-600 render: 3670 vs 3630 bytes); opentype.js 2.0.0 yields default-instance outlines (advanceWidth 133.1 vs 135.5 for real SemiBold). That review ran the full satori→resvg chain green with the static 600 TTF on Node v24.19.0/darwin-arm64 — not re-run in this planning session.
- **The repo's existing single sources, consumed verbatim** — `theme.css` (every color, read at render time via `readTheme`/`toHex`), `family.ts` (the 8-site roster, `src/sites/shared/family.ts:3-12`; `packages/brand-core/src/family.ts` after the proposal's step 1), and `src/lib/rings.ts` + `src/lib/scenes/` (all motion).

**2. ONE EMISSION RULE — hexes, never `var()`.** The generator resolves every token to a literal hex via `readTheme`/`toHex` **before** emitting any SVG markup. Authored masters and satori inline-SVG subtrees carry hexes, never `var()` — the repo's own ring strokes are `var(--line)`/`var(--primary)` (`src/components/brand/rings.tsx:20,57`), and CSS custom properties neither cross the isolated data-URI `<image>` boundary satori creates nor resolve in usvg/resvg. A faithful `var()` port renders invisible strokes.

**3. GENERATED — committed, never hand-edited.** Everything under `assets/*/exports/`: the per-site tile SVGs (including the stamped copies in `assets/logos/source/sites/`, verified = template × `family.ts`), the PNG ladder (16/32/48/64/128/256/512/1024), the outline-baked `favicon.svg`, favicon PNGs + `.ico`, apple-touch-icon, android-chrome + maskable PNGs, `site.webmanifest`, the `head.html` fragment, og/twitter PNGs, post covers, avatars, banners, GitHub previews, thumbnails, intro/outro MP4s, motion WebM/GIF, and the per-directory `manifest.json` — plus the synced copies in `public/` (today) / `apps/web/public/` (post-migration), including the hmziq favicon set replacing the spec-contradicting orange-circle `public/favicon.svg:1`. Hand edits to any of these are wasted work: `--check` fails on them or the next render overwrites them.

**4. ENFORCED — manifest-first, because the render platform is not the CI platform.** The owner renders on macOS while CI runs ubuntu; cross-platform byte divergence is the **expected** case, not a contingency. Every render writes a `manifest.json` beside the exports holding each file's sha256/bytes plus an input digest (theme.css, family.ts, the templates, the masters, the fonts, and the pinned generator dependency versions). `scripts/render-assets.mjs --check` is the CI guard: it recomputes the committed files' hashes against the manifest (proves committed == what generation wrote) and recomputes the input digest from HEAD (proves no source changed without a re-render) — on mismatch: "assets are stale, run: `pnpm render-assets`", exit 1, the `brand-kit.mjs:45-50` pattern joined to the composite check at `package.json:19`. Re-render + byte-compare (`--check --bytes`) remains the **local** fast-path on the generating machine for pinning down exactly which file drifted. Video and motion ride the same manifest with `{file, bytes, sha256, duration, dimensions}` entries — deliberately weaker than byte-equality: they prove the committed file is the one rendered from this source version, not that a re-render today would be identical.

---

## Every asset to create

Grouped by class, in the plan's order. Priorities: 1 = build first, 8 = last.

### Fonts

| Name | Class | Exact specs | Generated from | Home | Priority |
| --- | --- | --- | --- | --- | --- |
| Font masters: static-instance TTFs + variable woff2 | font | **(a)** Static-instance TTFs for every Node-side renderer: Onest-Regular 400, Onest-SemiBold 600, JetBrains Mono 400 (add a 500 only if a render actually uses it; the brand's weight rule is 400 text / 500 headings / 600 wordmark, nothing heavier — BRAND.md §5: "Nothing above weight 600. Headings are 500."), served per weight by the Google Fonts CSS API. **(b)** The two variable woff2 STRUCTURE-PROPOSAL.md:165 names — the existing `onest-latin-wght-normal.woff2` moved from `public/fonts/` (its only consumer is `.storybook/manager-head.html:8`) and a JetBrains Mono woff2 joining it — for Chrome-based consumers ONLY (Storybook manager chrome via staticDirs, Remotion `loadFont`). **No variable TTF anywhere in the pipeline** — the round-2 review measured satori 0.33.5 crashing (`parseFvarAxis`), resvg 2.6.2 rasterizing weight-600 at the default 400 instance (3670 vs 3630 bytes), opentype.js 2.0.0 yielding default-instance outlines (advanceWidth 133.1 vs 135.5); the static-600 chain (1200×630 satori→resvg with wordmark + orange square + seeded rings) ran green on Node v24.19.0/darwin-arm64 in that review — not re-run in this planning session. | One-time Google Fonts downloads (per-weight CSS API URLs for the static TTFs; Onest is SIL OFL per fonts.google.com/specimen/Onest — JetBrains Mono's license to confirm at download), committed as authored source: the only non-generated asset class. Every export's text is set from these files — the mark/wordmark from Onest SemiBold 600 with tracking −0.02em (BRAND.md §7:658-679) — so weight 600 is a real font instance, not a renderer's default-axis fallback. | `assets/fonts/` (STRUCTURE-PROPOSAL.md:59-60) | 1 |

### Logos

| Name | Class | Exact specs | Generated from | Home | Priority |
| --- | --- | --- | --- | --- | --- |
| Logo masters: mark, wordmark, lockup (+ tile template) | logo | Three authored SVGs + one template: **(a)** `mark.svg` — the hmziq `Hq` tile, `rounded-[22%]`, icon-file palette fixed by BRAND.md:679: tile `#FAFAFA`, letters `#0A0A0A` in Onest 600 at 0.42em, orange square `#F38230` (`--mark-square`, `oklch(0.72 0.165 52)` — theme.css:189) at 0.3em; no rings, outlines or textures. **(b)** `wordmark.svg` — name + square, Onest 600, tracking −0.02em, square 0.36em at ml 0.07em, never above weight 600. **(c)** `lockup.svg` — mark + wordmark. **(d)** `tile.template.svg` — the tile with `{symbol}` and color slots. Generated exports: PNG at fitTo widths 16/32/48/64/128/256/512/1024 (mark/tiles) and 512/1024 (wide wordmark/lockup), dark-mode-default palette (icons default dark per BRAND.md:679). Formats: SVG (the committed masters ARE the SVG deliverables — no per-size SVG is generated) + PNG (exports). | Hand-authored SVG masters following the BRAND.md §7:658-679 recipes, every color already resolved to literal hexes via `readTheme`/`toHex`; rasterized by `scripts/render-assets.mjs` via `@resvg/resvg-js` (fitTo mode `width`, exact-pinned; 2.6.2 declares `engines.node >= 10` per the npm registry and was installed and run green on Node v24.19.0 by the round-2 review) with `fontFiles` = the committed static Onest SemiBold 600 TTF and `loadSystemFonts: false`, so weight-600 text rasterizes from the real 600 instance. | `assets/logos/source/` (masters) → `assets/logos/exports/hmziq/` (PNGs) — per STRUCTURE-PROPOSAL.md:54-55 | 2 |
| Per-site mark tiles ×8 (family roster) | logo | One tile per site stamped from `tile.template.svg` × `family.ts` symbols — hmziq=`Hq`, Blog=`Bl`, Labs=`Lb`, freeoxide=`Fx`, gpui-starter=`Gs`, gpui-query=`Gq`, claude-multi=`Cm`, oxlabs=`Ox` (`src/sites/shared/family.ts:3-12`; BRAND.md §12:972-982) — identical geometry and palette rules to the master (BRAND.md §7:668-679), colors resolved to hex at stamp time. Each site gets a tile SVG (committed at `assets/logos/source/sites/<site>.svg` as the rasterization master — the proposal's "per-site two-letter tiles" — verified = template × roster by `--check`) plus PNG exports at 256/512/1024. | `scripts/render-assets.mjs` stamps `tile.template.svg` with each `family.ts` symbol and theme.css-resolved hexes (`readTheme`/`color`/`toHex` from `src/lib/color.ts`) — tiles are generated, never drawn by hand. | `assets/logos/source/sites/<site>.svg` → `assets/logos/exports/<site>/` | 2 |

### Favicons / app icons

| Name | Class | Exact specs | Generated from | Home | Priority |
| --- | --- | --- | --- | --- | --- |
| Favicon + app-icon packs ×8 (+ webmanifest + head fragment) | favicon | Per site, generated: **`favicon.svg`** — the tile with the two letters baked to outlines at real SemiBold widths (browsers render SVG favicons without access to Onest, so `<text>` would fall back to system fonts; outlines come from opentype.js reading the static 600 TTF, so glyph shapes match the spec, not the variable default instance), optionally embedding a `prefers-color-scheme` dark variant. **`favicon-16x16.png` · `favicon-32x32.png` · `favicon-48x48.png`**; **`favicon.ico`** containing the 32×32 image (optionally + a 16×16 layer if the 32→16 downscale blurs) packed from those PNGs; **`apple-touch-icon.png`** 180×180 (solid background, no transparency — iOS ignores it and rounds corners; ~20px padding since ~140×140 of art renders on the 180 canvas; 180 is the MDN/Evil Martians convention, not an Apple-published number); **`android-chrome-192x192.png` + `android-chrome-512x512.png`** (PNG required for Chrome installability — SVG alone does not satisfy it) + **`maskable-512x512.png`** purpose `maskable` (all content inside the conservative ~80% square safe zone — safe under both the W3C 40%-radius-circle guarantee, ~410px diameter on a 512 canvas, and maskable.app guidance; solid fill, no transparency); **`site.webmanifest`** naming 192/512/maskable. One generated **`head.html`** fragment: `<link rel=icon>` ICO (`sizes=32x32 type=image/x-icon` — stops Chrome double-fetching) + SVG (`type=image/svg+xml`), apple-touch-icon, manifest, `theme-color #0A0A0A` (dark default background token), description, og:title/og:description/og:image + og:image:width/og:image:height (Meta best practice), `twitter:card summary_large_image` + twitter:image. SVG-favicon browser support (Safari 26+ per the platform research's caniuse read, Sep 2026) is treated as UNVERIFIED — not re-checkable this round — which is exactly why the ICO+SVG pair ships belt-and-braces and nothing depends on SVG-only rendering. The hmziq set syncs to `public/` (today) / `apps/web/public/` (post-migration), replacing the spec-contradicting orange-circle `public/favicon.svg:1` that `index.html:5` and `.storybook/manager-head.html:1` consume — STRUCTURE-PROPOSAL.md:164 expects exactly this re-point. | Per-site tile masters → `scripts/render-assets.mjs`: `@resvg/resvg-js` rasterizes each size (static 600 TTF via `fontFiles`); opentype.js converts the two letters to SVG outlines from the same static TTF; png-to-ico packs the ICO; the webmanifest and head fragment are emitted from `family.ts` data. | `assets/logos/exports/<site>/` (pack) + `assets/logos/exports/head.html` (fragment) + synced hmziq copies in `public/` (`apps/web/public/` post-migration) | 3 |

### OG images

| Name | Class | Exact specs | Generated from | Home | Priority |
| --- | --- | --- | --- | --- | --- |
| OG image set — 8 sites + 5 SaaS templates | og-image | Two PNGs per subject from one template: **`og-1200x630.png`** (Meta's recommended og:image: 1200×630, 1.91:1, min 200×200, max 8MB, PNG/JPEG; og:image:width/height tags in the head fragment; below 600×315 renders as a small thumbnail) and **`twitter-1200x675.png`** (X summary_large_image community best practice 1200×675 16:9; X official limits from the archived Cards docs: 2:1 supported, 300×157 min, 4096×4096 max, <5MB, JPG/PNG/WEBP/GIF, SVG not supported, animated GIF uses first frame; X falls back to og:* tags). The 1200×630 file also serves LinkedIn URL shares (official: 1.91:1, 1200×627 recommended, >200px wide or left-thumbnail, PNG/JPEG, ≤3MB; mobile shows no cropping, other ratios get subtle white padding). **13 subjects**: the 8 family sites + the 5 SaaS templates (groundwork, hookline, openslot, parley, sightline). Composition: site/product name in Onest 600 tracking −0.02em + orange square (wordmark rules), the two-letter tile where a symbol exists, and the seeded hero Rings (viewBox `0 0 520 440`, 11 rings at (440,225), radius `34+34·i`, accent ring width 3 with 52% gap and r=7 dot, rest width 1.25 with 6–36% gaps — `src/lib/rings.ts:46-69`) seeded from the name, so every card is deterministic; colors from theme.css (dark default). **Token rule**: the generator resolves every token to a literal hex via `readTheme`/`toHex` (`src/lib/color.ts:101,90`) before emitting any SVG — the repo's rings markup strokes are `var(--line)`/`var(--primary)` (`src/components/brand/rings.tsx:20,57`), and custom properties neither cross satori's isolated data-URI `<image>` boundary nor resolve in usvg/resvg; a faithful `var()` port renders invisible strokes. | `assets/social/source/og.ts` — a satori element-tree template (plain objects) taking `{name, symbol, seed}`, fonts handed in as the static Onest 400/600 TTFs (weight selection is real per file); the rings layer imports `src/lib/rings.ts` hash/rng/arcs directly (framework-free) and emits hex-stroked SVG; `scripts/render-assets.mjs` runs `satori(element, {width, height, fonts})` → SVG → `@resvg/resvg-js` → PNG. | `assets/social/source/og.ts` → `assets/social/exports/<site>/og-1200x630.png` + `twitter-1200x675.png` (STRUCTURE-PROPOSAL.md:56) | 4 |
| Blog per-post cover + OG template | og-image | One template, two PNGs per post: **`<slug>-1200x675.png`** (16:9 — matches the existing in-page cover usage; today's hand-made file is a 1200×675 JPEG at `src/sites/blog/vibe-coding-cover.jpg`, rendered at `width={1200} height={675}` in post.tsx:97) and **`<slug>-og-1200x630.png`** (Meta canonical). Title in Onest 600 tracking −0.02em, date, site tile — and **NO rings**: Signature.mdx:65 ("Rings are never used in a logo, on a cover image, or behind text") forbids them, so the cover uses the band-orange echo or Marker bullets (`src/components/brand/marker.tsx`) instead. Same hex-not-var token rule as the OG set for any SVG subtree. First render: vibe-coding-cover, regenerating the hand-made file from the template and retiring the repo's only hand-placed raster. | `assets/social/source/post-cover.ts` (satori template taking `{title, date, slug}`, static Onest TTFs); render-assets.mjs → satori + resvg → PNG; the blog imports the export exactly as post.tsx:8 imports the jpg today. | `assets/social/source/post-cover.ts` → `assets/social/exports/blog/<slug>-1200x675.png` + `<slug>-og-1200x630.png` | 5 |
| GitHub repository social previews | og-image | **1280×640 PNG** (GitHub's best-display 2:1; requirements: ≥640×320, <1MB, PNG/JPG/GIF, transparent PNG supported) for hmziq/brand and each SaaS template repo that gets published. Upload is manual by design — GitHub takes social previews via repo Settings → Social media preview, not a committed file — so render-assets exports the files and prints the upload list; the guard covers the files only. Same hex-not-var token rule for the seeded-rings layer as the OG set. | A 2:1 variant of the same satori OG template (wordmark + seeded rings from `src/lib/rings.ts`, theme.css colors resolved to literal hexes, static Onest TTFs); render-assets.mjs → PNG. | `assets/social/exports/github/<repo>-1280x640.png` | 6 |

### Social banners

| Name | Class | Exact specs | Generated from | Home | Priority |
| --- | --- | --- | --- | --- | --- |
| X + LinkedIn profile and banner set | social-banner | **X**: `profile-400.png` 400×400 ≤2MB (displayed as a circle — mark centered) and `header-1500x500.png` (3:1; critical content centered and clear of edges — mobile/desktop crops differ and the profile picture overlaps the lower-left). CAVEAT: X's own help pages were unreachable in the research (help.x.com 403); 400×400 / 1500×500 are third-party consensus — re-verify before finals. **LinkedIn personal**: `profile-400.png` 400×400 PNG (official range 400×400–7680×4320, ≤8MB, PNG/JPEG, circle) and `background-1584x396.png` (4:1, <8MB, JPG or PNG — official Help a568217). **LinkedIn Page** (only if company pages exist — see open questions): `page-logo-400.png` 400×400 (official: ≥268×268, 400×400 recommended, PNG/JPEG ≤3MB) and `page-cover-1512x256.png` (official a563309). Banner art: wordmark + BandArcs — the deterministic closing band, viewBox 400, 8 rings at (400,200), radius `60+44·i`, rotation `150+23·i°`, ring 3 primary width 3 with 60% gap, rest width 1.25 with 20% gap (`src/components/brand/rings.tsx:89-100`) — on the `.band-orange` surface (theme.css:204), the strongest color statement a static asset can echo; every BandArc stroke emitted as a literal hex per the same token rule. | `assets/social/source/banners.ts` (satori templates, static Onest TTFs) + the logo masters + theme.css tokens resolved to hex; render-assets.mjs → satori/resvg → PNG. | `assets/social/exports/x/` and `assets/social/exports/linkedin/` | 6 |
| YouTube thumbnail template | social-banner | **3840×2160 PNG** (16:9) — YouTube's current official recommendation (min width 640; JPG or PNG; ≤2MB uploaded on mobile / ≤50MB on desktop; avoid the bottom-right corner where duration/progress overlays render). render-assets warns if a render exceeds the 2MB mobile limit. One render per video: wordmark + title in Onest 600 over the brand surface. | `assets/social/source/thumbnail.ts` (satori template, static Onest TTFs) on the same tokens-as-hexes pipeline; rendered per video alongside the intro/outro renders. | `assets/social/exports/youtube/<slug>-3840x2160.png` | 7 |

### Avatars

| Name | Class | Exact specs | Generated from | Home | Priority |
| --- | --- | --- | --- | --- | --- |
| Avatars ×8 (Mark profile pictures) | avatar | **400×400 PNG** per site mark — the researched profile-picture size for X and LinkedIn; every platform crops to a circle, so the tile sits centered at full bleed. Fulfils BRAND.md §7:670's "favicons, app icons, avatars" promise — no avatar file exists anywhere in the repo today. Any future size comes from the same render with a new width, never a hand resize. | Per-site tile masters → render-assets.mjs (resvg fitTo width 400). | `assets/social/exports/avatars/<site>-400.png` | 6 |

### Video

| Name | Class | Exact specs | Generated from | Home | Priority |
| --- | --- | --- | --- | --- | --- |
| Video intro master | video-intro | **1920×1080 (16:9) MP4, H.264 High Profile, 2 consecutive B-frames, closed GOP (half frame rate), CABAC, VBR 4:2:0, SDR BT.709, 8 Mbps at 24/25/30 fps (12 Mbps at 48/50/60), moov atom front (faststart), no edit lists** — YouTube's recommended upload encoding. ~3–5 s (design target from the pipeline brief, not a platform rule). Silent by default; if scored later, AAC-LC 48 kHz (YouTube rec 384 kbps stereo). Framed to the broadcast ~80% title-safe / ~90% action-safe convention (YouTube publishes no frame-level safe area for ordinary video). Content: the wordmark reveal (Onest 600 letters + orange square) over the deterministic Rings motion (ringMoves presets, `src/lib/rings.ts:129-138`), optionally the lattice scene via `@remotion/three`'s ThreeCanvas driven by `useCurrentFrame` — the brand's existing motion identity, not a re-animation. In the composition, motion timings are passed explicitly (export-sane seconds/every, not the 120–170 s page defaults — see the motion-loops asset) and colors are hex literals resolved from theme.css, never `var()`. | Remotion project in `assets/video/source/` importing `src/lib/rings.ts` (framework-free, seeded — BRAND.md §7:691) and `src/lib/scenes/` via `@remotion/three`; text via `@remotion/fonts` loadFont on the `assets/fonts` **variable** woff2 (Chrome-based rendering resolves variable axes natively — the static-TTF restriction applies only to the Node raster pipeline); rendered headless with `npx remotion render intro assets/video/exports/intro.mp4` (h264 default; Remotion license terms to re-verify at build — see open questions). | `assets/video/source/` (composition) → `assets/video/exports/intro.mp4` (+ manifest.json entry) | 7 |
| Video outro master (end-screen safe) | video-outro | Same 1920×1080 MP4 encode as the intro; ~3–6 s (design target). End-screen rules (official YouTube article, surfaced via search after the old IDs 404'd): end screens occupy the last 5–20 s of the uploaded video, the video must be ≥25 s, up to 4 elements, placed inside the Studio editor's safe area — so the outro art keeps clear of the progress bar, subscribe watermark and title regions (bottom strip and lower-right especially). Content: the giant footer signature ("hmziq■" filling the frame — the SiteFooter card, `src/sites/shared/site.tsx:158-161`) resolving into the 8-tile family band. | Second composition in the same Remotion project, reusing the wordmark/tile pieces and rings motion with explicit export timings; same render command → outro.mp4; manifest.json updated by the render script. | `assets/video/source/` → `assets/video/exports/outro.mp4` (+ manifest.json entry) | 7 |

### Motion

| Name | Class | Exact specs | Generated from | Home | Priority |
| --- | --- | --- | --- | --- | --- |
| Motion loop exports (rings presets, optional scene loop) | motion | **Roster**: the FULL `ringPresets` list minus `still` — `src/lib/rings.ts:129-138` (read this session) has exactly 8 entries: still, ripple-turn, turn, breathe, orbit, pair, dial, ripple; `still` is excluded because a zero-motion loop is a static image (and a static rings render is already available from the OG pipeline); `ripple-turn` (BRAND.md's showcase combo) and `pair` are IN. **Durations**: every loop composition overrides seconds/every to export-sane values — the motionDefaults are page-paced (orange turn 120 s, gray turn 170 s, orbit 40 s, dial's full cycle = rings·seconds·2 = 4·5·2 = 40 s at defaults — `src/lib/rings.ts:115-126`, cycle math at :195) and would make 1080p exports minutes long; ringMoves merges explicit values over the defaults (`rings.ts:165-211`), so each composition carries its own single-to-low-double-digit cycle, chosen and recorded there (ripple's every=10 s and breathe's 8 s are already export-sane at defaults). **Formats**: each preset → 1920×1080 WebM (VP9), per Remotion's codec list (h264/h265/vp8/vp9/av1/prores + GIF; container inferred from extension). GIF is scoped, not blanket: 1080p GIFs run many MB for seconds of footage and dithered 1.25px gray ring strokes band badly at GIF's 256-color palette — so ONE showcase GIF (ripple-turn) rendered at reduced 640 width, everything else WebM-only. Optional: one 1920×1080 lattice-scene WebM as the showcase loop (same @remotion/three path as the intro). STRUCTURE-PROPOSAL.md:58 also names apng and lottie — Remotion renders neither (no apng in its codec list; Lottie is a separate authoring format), so those stay explicitly deferred rather than pretended (open questions). | The same Remotion project — one composition per preset over the ringMoves keyframes (`src/lib/rings.ts:80-217`, the generator the site's CSS keyframes already come from) with explicit seconds/every and hex colors; `npx remotion render <preset> assets/motion/exports/<preset>.webm` (+ the 640-wide ripple-turn.gif); manifest.json written per render. | `assets/motion/exports/<preset>.webm` + `ripple-turn-640.gif` + manifest.json — no source/ dir: per STRUCTURE-PROPOSAL.md:58 the source is the motion code (`src/lib/rings.ts` + `src/lib/scenes/` today; `packages/brand-core/src/motion` post-migration) | 8 |

---

## Where the files live

Nests exactly into STRUCTURE-PROPOSAL.md:53-60 ("assets/ — EVERY NON-CODE BRAND FORMAT — source strictly split from exports") and lands as the proposal's additive step 4+ (line 214), so the names hold whether it lands before or after the `packages/` migration:

```
assets/
├── logos/
│   ├── source/          AUTHORED: mark.svg · tile.template.svg · wordmark.svg · lockup.svg
│   │                    GENERATED-AND-CHECKED: sites/<site>.svg — the proposal's "per-site two-letter
│   │                    tiles" as stamped, byte-verified masters (template × family.ts), never hand-drawn
│   └── exports/         per <site>/: favicon.svg (outline-baked) · favicon-16/32/48.png · favicon.ico ·
│                        apple-touch-icon.png · android-chrome-192/512.png · maskable-512.png ·
│                        site.webmanifest · logo PNG ladder 16–1024; plus head.html (one generated
│                        fragment) and manifest.json
├── social/
│   ├── source/          og.ts · post-cover.ts · banners.ts · thumbnail.ts (satori element-tree templates)
│   └── exports/         <site>/og-1200x630.png + twitter-1200x675.png · blog/<slug>-… · x/ · linkedin/ ·
│                        avatars/ · github/ · youtube/ · manifest.json
├── video/
│   ├── source/          the Remotion project (intro + outro + loop compositions)
│   └── exports/         intro.mp4 · outro.mp4 · manifest.json
├── motion/
│   └── exports/         <preset>.webm (7 moving presets) · ripple-turn-640.gif · manifest.json
│                        (no source/ dir — the source is the motion code in brand-core, per the proposal)
└── fonts/               Onest 400 + 600 and JetBrains Mono 400 STATIC TTFs (Node renderers) + the two
                         variable woff2 (Chrome-based consumers only) — the single font home,
                         STRUCTURE-PROPOSAL.md:59-60,165
```

**Alignment notes.**

- The proposal's line 55 ("exports/ … logo PNG/SVG per size") and this plan read as one policy: the committed masters in `assets/logos/source/` ARE the SVG deliverables — SVG is resolution-independent and needs no size ladder — so "PNG per size" is the generated ladder and "SVG" is the master; no per-size SVG is generated.
- **Synced generated copies (not a second home)**: the hmziq favicon set into `public/` today / `apps/web/public/` post-migration (`index.html:5` and `.storybook/manager-head.html:1` consume it; the proposal's staticDirs re-point at :164 follows); fonts served to Storybook via staticDirs.
- Path references in the generators use today's `src/lib/rings.ts` · `src/lib/color.ts` · `src/sites/shared/family.ts` and flip to `packages/brand-core/src/...` with the proposal's step-1 codemod (:148-151) — one import line per generator.
- Everything under `exports/` is committed and guarded; nothing outside `assets/*/exports` plus the synced public copies is generated.

---

## Scripts to add

In the style of the existing `scripts/` checkers (`brand-kit.mjs` generate/`--check`, wired at package.json:15-16,19; the `--check` failure pattern at brand-kit.mjs:45-50):

### 1. `scripts/render-assets.mjs`

The proposal's FUTURE generator (STRUCTURE-PROPOSAL.md:66), styled on `scripts/brand-kit.mjs`.

- **Stamps** per-site tiles from `tile.template.svg` × `family.ts`.
- **Rasterizes** every master via `@resvg/resvg-js` (fitTo widths 16–1024; `fontFiles` = the committed static TTFs, `loadSystemFonts: false` — @resvg/resvg-js 2.6.2 declares `engines.node >= 10` per the npm registry and ran green on Node v24.19.0/darwin-arm64 in the round-2 review, so no Node-24 caveat remains, only the exact version pin).
- **Resolves every theme token** to a literal hex via `readTheme`/`toHex` (`src/lib/color.ts:101,90`) before emitting any SVG — masters and satori inline-SVG subtrees carry hexes, never `var()`.
- **Bakes** favicon.svg letter outlines via opentype.js from the static 600 TTF (browser SVGs cannot load custom fonts, and static instances keep the outlines SemiBold-shaped).
- **Packs** favicon.ico via png-to-ico (16/32/48); emits apple-touch/android-chrome/maskable PNGs, `site.webmanifest` and the `head.html` fragment.
- **Runs every satori template** (OG, post covers, banners, avatars, GitHub previews, YouTube thumbnails; fonts = static Onest 400/600) → resvg → PNG.
- **Syncs** the `public/` (today) / `apps/web/public/` (post-migration) copies.
- **Guard, manifest-first**: every render writes `manifest.json` per exports directory — per-file sha256/bytes plus an input digest (theme.css, family.ts, templates, masters, fonts, pinned dep versions). `--check` (CI, ubuntu) recomputes committed file hashes against the manifest and the input digest from HEAD — any mismatch exits 1 with "assets are stale, run: `pnpm render-assets`". `--check --bytes` (local fast-path on the generating macOS machine) additionally re-renders to a temp dir and byte-compares to name the exact drifted file. Cross-platform byte equality is never assumed — the owner renders on macOS, CI verifies on ubuntu.
- devDeps pinned exact: `satori`, `@resvg/resvg-js`, `png-to-ico`, `opentype.js`.

Commands:

```sh
pnpm render-assets            # node scripts/render-assets.mjs        — regenerate every export + manifest
pnpm check:assets             # node scripts/render-assets.mjs --check — CI guard (manifest + input digest)
pnpm check:assets -- --bytes  # local: also re-render + byte-compare to name the drifted file
```

### 2. `assets/video/source` — Remotion project

Compositions for intro, outro, one per MOVING rings preset (all of `src/lib/rings.ts:129-138` except `still`) and an optional lattice loop, importing `src/lib/rings.ts` and `src/lib/scenes/` (→ `packages/brand-core/src/motion` post-migration) so the video/motion identity IS the repo's motion code. Every composition passes explicit seconds/every (page defaults run 40–170 s — rings.ts:115-126) and hex colors. Text via `@remotion/fonts` loadFont on the variable woff2 (Chrome-based rendering). Each render writes/updates `manifest.json` (`{file, bytes, sha256, duration, dimensions}`) which `render-assets --check` verifies. Renders stay local/manual by design (Remotion downloads headless Chrome at render time; renders take minutes) — CI verifies via the manifest, full re-render happens on version bumps.

Commands (package.json scripts):

```sh
pnpm render:video   # remotion render intro … && remotion render outro …
pnpm render:motion  # the loop set (7 WebM + the 640-wide ripple-turn GIF)
```

### 3. `package.json` check-chain wiring

Add `render-assets` (`node scripts/render-assets.mjs`), `render:video`, `render:motion`, and `check:assets` (`node scripts/render-assets.mjs --check`), then append `&& pnpm check:assets` to the composite check at package.json:19 — so CI fails on asset drift exactly as it does today for `check:brand-kit`, with the same "run: `pnpm …`" remediation message.

---

## Build order

Each step says what it unlocks.

1. **Foundations** — commit `assets/fonts/` (static Onest 400 + 600 TTFs, JetBrains Mono 400 TTF, the two variable woff2) and scaffold `scripts/render-assets.mjs` importing `readTheme`/`toHex` + `family.ts` and writing the SHA-256 manifest on every render. *Unlocks: machine-independent, weight-correct text in every later export and the generate/check loop everything else plugs into.*
2. **Logo masters** — author `mark.svg`, `tile.template.svg`, `wordmark.svg`, `lockup.svg`; stamp the 8 per-site tiles. *Unlocks: every favicon, avatar, app icon, social profile and OG tile layer that renders from a tile or the wordmark.*
3. **Favicon/app-icon matrix + head wiring** — render the ×8 packs, webmanifest and head fragment; sync the hmziq set into `public/`, deleting the spec-contradicting orange-circle favicon.svg. *Unlocks: correct browser icons and PWA installability, plus the SPA's first-ever og:/twitter:/theme-color/description meta (index.html:3-8 has none today).*
4. **OG set** — `assets/social/source/og.ts` → 1200×630 + 1200×675 ×13 (8 sites + 5 SaaS templates), every token resolved to hex before markup is emitted. *Unlocks: real link previews wherever those URLs are shared — today every share renders a bare card, including the blog post's share links (post.tsx:28-35).*
5. **Blog covers** — `post-cover.ts` template + regenerate vibe-coding-cover. *Unlocks: per-post covers and OG images with zero hand-made rasters left in the repo.*
6. **Social/avatars/previews** — X + LinkedIn profiles and banners, 8 avatars, GitHub social previews. *Unlocks: profile refreshes and repository cards on demand, and closes BRAND.md §7:670's avatar promise.*
7. **Remotion** — `assets/video/source` with intro + outro compositions reusing rings/scenes, plus the 3840×2160 thumbnail template. *Unlocks: a complete YouTube upload pack (intro, end-screen-safe outro, thumbnail) rendered from brand code.*
8. **Motion loops + full guard** — render the 7 moving presets as 1080p WebM and the ripple-turn showcase GIF into `assets/motion/exports` with duration overrides and manifests; `check:assets` now covers the manifest/input-digest + media hashes end to end. *Unlocks: non-web motion use and closes the drift guard over every asset class.*

---

## Open questions

1. X's own help pages were unreachable during research (help.x.com 403, no Wayback snapshot): the 400×400 profile / 1500×500 header figures are third-party consensus — confirm on help.x.com before producing finals.
2. LinkedIn rewrites its image tables often (Page cover already moved from 1128×191-era figures to 1512×256) and the 5MB organic-post / 8MB profile-photo limits are third-party: re-check linkedin.com/help/linkedin/answer/a563309 (plus a568217/a549049) at build time.
3. YouTube moved the end-screens article (old IDs 1325608/7079002 404) and recently changed thumbnail guidance to 3840×2160 with 2MB/50MB mobile/desktop limits: re-locate the end-screens article and re-verify support.google.com/youtube/answer/72431 before locking the video pack.
4. SVG-favicon browser support (the "Safari 26+" figure and global percentage from the platform research's caniuse read, Sep 2026) could not be re-verified — the ICO fallback ships regardless, but re-check caniuse before ever dropping the ICO or relying on SVG-only rendering.
5. Two Remotion facts accepted on knowledge and not re-verified (package existence IS verified — @remotion/fonts and @remotion/three at 4.0.529, per the round-2 review): the free-for-individuals license clause (LICENSE.md pointer seen, terms not re-read) and @remotion/fonts loadFont with woff2. Re-verify both at build time.
6. The repo is one SPA with one index.html while family.ts lists 8 separate domains — how do per-site og:image and favicon files actually get served per domain (per-deploy index.html copies, JS link-swapping, or the proposal's future per-site apps)? The plan generates all sets regardless; the serving mechanism decides the wiring.
7. Do the 5 SaaS template products get two-letter Mark symbols + roster entries (family.ts style), or should their OG cards stay wordmark + seeded-rings without a tile?
8. Replace the hand-made `src/sites/blog/vibe-coding-cover.jpg` with a template render (this changes the live post's cover) or keep that one photo as an authored exception?
9. Do LinkedIn company Pages exist (e.g. freeoxide, oxlabs)? If yes the Page logo 400×400 + cover 1512×256 renders ship; if not, skip them.
10. STRUCTURE-PROPOSAL.md:58 names apng and lottie loops; Remotion renders neither — defer them, or commission separate Lottie authoring (which would break the single-source rule)?
11. YouTube channel-art specs were not researched — add a channel banner to scope (needs its own spec research), or leave the channel to the avatar + thumbnails?
12. Remotion downloads its own headless Chrome at render time and its ffmpeg bundling could not be verified — the plan keeps renders local/manual with manifest checks in CI; confirm that split is acceptable.

---

*Advisory only — produced by a read-only planning review; no assets or code have been created.*
