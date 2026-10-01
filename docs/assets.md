# Asset plan

**Part of the [master plan](./README.md). Work item 8.** Runs any time after [structure.md](./structure.md) step 1. Everything it reads comes from `@hmziq/brand-core`.

This plan generates logos, icons, social images, and later video and motion loops, from the brand's own code: theme tokens, the site roster, the logo recipe and the ring geometry. Editable sources and generated files live apart. Static assets come first, with a check that they're up to date. Video comes only after a test proves the motion can render frame by frame.

## Inputs

| Input (in brand-core) | Used for |
| --- | --- |
| `theme.css`, `color.ts` | Every color, in every mode and band |
| `family.ts` | Per-site names, symbols and URLs. Add a stable `id` to each site in phase 1. |
| `logo.ts` | Marks, wordmarks, lockups and icons. Its defaults are the approved logo. |
| `motion/rings.ts`, `rings.css` | Ring art, video and loops |
| `motion/scenes/` | Optional video art |
| `assets/fonts/` | Text in every asset |

Logos are drawn from the default look in `logo.ts`. No logo measurements are copied into templates, so the exported files and the on-page logo can't drift apart. Looks made in the logo tweaker aren't exported. If one becomes the new default in `logo.ts`, the exports regenerate from it.

BRAND.md and the Signature page apply: Onest and JetBrains Mono, token colors, two-letter marks, no rings in logos or blog covers, no rings behind text.

## Folders

```text
assets/
├── logos/
│   ├── source/                  tile, wordmark and lockup templates + variant settings
│   └── exports/
│       ├── <site-id>/           tile.svg, wordmark.svg, lockup.svg, PNGs, favicon pack,
│       │                        site.webmanifest, head.html
│       └── manifest.json
├── social/
│   ├── source/                  og.ts, post-cover.ts, banners.ts, thumbnail.ts + settings
│   └── exports/                 sites/, blog/, avatars/, x/, linkedin/, github/,
│                                youtube/, manifest.json
├── video/
│   ├── source/                  Remotion project (its own workspace package)
│   └── exports/                 intro.mp4, outro.mp4, manifest.json
├── motion/
│   └── exports/                 <preset>.webm, ripple-turn-640.gif, manifest.json
└── fonts/                       static TTFs, variable WOFF2, licenses, where each file came from
```

- Everything generated is under `exports/`. Nothing generated goes in `source/`.
- Templates use token names (`{{foreground}}`), resolved at render time. No hex values in templates.
- Exported SVGs have resolved colors and outlined text, so they look right anywhere.
- SVGs come in variants, not sizes. PNGs come in the sizes listed below.
- Static exports (SVG, PNG, ICO, JSON) are committed. Video and motion files (MP4, WebM, GIF) go in Git LFS via `.gitattributes`, set up before phase 7. Manifests are normal files.

## Getting assets into sites and apps

- A site copies its folder from `assets/logos/exports/<site-id>/` into its `public/`. Sites on a kit get the head tags from `SiteHead` (kits.md), which renders the same tags as `head.html` from the site's id. Other sites paste `head.html` into the page head.
- The lab (`apps/lab/public`) gets the hmziq pack through a sync step in `pnpm render-assets`; `check:assets` confirms the copy matches.
- New apps and boilerplates: `pnpm render-assets --name "Paperplane" --symbol Pp --out <folder>` renders a full icon pack for a name that isn't in the roster.
- `svelte-app` and `astro-app` ship with a pack for a placeholder name, and that command in their README.
- Link previews need each site to serve its own HTML head. The lab is one page with hash routes, so only the hmziq identity is wired there. The other cards stay as files until their sites use them.

## Rendering rules

### Colors

- Resolve every token before rendering. An exported SVG never depends on CSS variables.
- Keep transparency. `toHex` drops alpha: the dark `line` token has alpha 0.22 and would come out as a solid `#FAFAFA`, turning faint rings solid. Emit hex plus `fill-opacity` / `stroke-opacity`. Add a Vitest test for this case in core first.
- Colors depend on context: dark, light, and inside `.band-orange`. `readTheme` reads only root and dark today. Extend it to read the band overrides from `theme.css`; don't copy them into a second palette.
- `--mark-square` is fixed. `--primary` changes with context.

### Fonts

- Node rendering (Satori, resvg) uses static font files: Onest 400, 500, 600 and JetBrains Mono 400. Never a synthesized weight. Variable fonts failed in earlier Satori tests, so static files come first.
- Browser rendering (the Storybook manager, video) uses the variable WOFF2.
- resvg loads only the listed fonts, with system fonts off. Browser renders wait until fonts have loaded.
- Each font file records where it came from and which Fontsource version it matches.
- Logo and favicon text is outlined. Compare with the `Mark` and `Wordmark` components (the lab's, and the Svelte kit's once they exist), including at 16px.

### Shapes and crops

- Maskable icons: everything important sits inside the centered circle whose radius is 40% of the canvas. A square that fits inside it is at most 56.6% of the canvas wide. The background can fill the rest. ([W3C icon masks](https://www.w3.org/TR/appmanifest/#icon-masks))
- Check marks at 16px and under circle and squircle crops. Check social images in each platform's crop.
- No rings on blog covers. Text stays clear of rings everywhere.

## What gets made, in order

| # | Asset | Outputs | Done when |
| --- | --- | --- | --- |
| 1 | Foundations | Fonts with licenses; color resolver with alpha and band contexts; stable site ids; one test render; `check:assets` | Alpha, band colors and fonts render correctly; the check fails on a stale file and passes after a re-render |
| 2 | Logos | Per site: tile, wordmark and lockup SVGs; mark PNGs at 16, 32, 48, 64, 128, 256, 512, 1024; wordmark and lockup PNGs at 512 and 1024 wide | All 8 match the `Mark` and `Wordmark` components side by side, including at 16px |
| 3 | Icon packs | Per site: `favicon.svg`, PNG 16/32/48, ICO, apple-touch 180, Android 192/512, maskable 512, `site.webmanifest`, `head.html`. The `--name --symbol` command. | Crops checked; the lab uses the hmziq pack; a pack renders for a name outside the roster |
| 4 | OG cards | 1200×630 OG and 1200×675 X cards for the 8 sites | Reviewed. Each site's preview goes live when that site serves its own head. |
| 5 | Blog cover template | 1200×675 cover and 1200×630 OG per post: title, date, site mark, no rings | A sample is approved; the existing blog photo stays |
| 6 | Profiles and repo previews | Avatars 400×400; X and LinkedIn banners; GitHub previews 1280×640 for confirmed repos | Sizes checked; an upload list for the real accounts |
| 7 | Video | 1920×1080 intro and outro MP4; a 16:9 thumbnail template | The frame test passes; fonts load; end-screen timing checked |
| 8 | Motion loops | Each moving ring preset as a 1920×1080 WebM; a 640-wide `ripple-turn` GIF; lattice loop optional | Each loop has a set period; the seam is checked |

- Sites come from `family.ts`. The lab's SaaS templates get no assets.
- Moving presets come from `ringPresets` minus `still`.
- APNG and Lottie are out.
- Uploading to platforms and wiring previews on live sites are separate steps, done after the files exist.

## Up-to-date check

Each `exports/` folder has a `manifest.json` recording:

- every file's path, SHA-256, size and dimensions (plus duration, fps and codec for video);
- a digest of the target's inputs, the renderer versions and the render settings.

A target's inputs are: the theme and color code; the roster and content; templates and fonts; ring, scene and video code; the generator scripts and settings; the lockfile. Paths are sorted and bytes hashed. Outputs never count as inputs.

`pnpm check:assets` is read-only and part of `pnpm check` from phase 1. It:

- fails on missing files, changed files, stale inputs, missing manifests and public copies that don't match;
- names the target and the command that fixes it;
- reads the working tree, not git HEAD.

The video and motion exports keep manifests of the same shape, written by `pnpm render:video` and `pnpm render:motion`. `check:assets` doesn't read them yet: it only knows targets that `render-assets` fixes.

Test it with a changed theme, an edited template, a broken export and a stale public copy, and confirm it never writes a file.

macOS and Ubuntu CI can render slightly different bytes. CI checks manifests and inputs. `pnpm check:assets --bytes` re-renders into a temp folder and compares, without touching committed files.

## Video and motion: frame test first

The live rings and scenes run on the browser clock (`requestAnimationFrame`, `performance.now`), and the network scene builds up state frame by frame. Remotion asks for frames in any order, so that code can't be reused as it is.

1. Write a frame adapter: given a seed, settings and a time, it returns the exact state. Stateful parts become time-based.
2. Use colors from the resolver (with alpha) and a fixed canvas size.
3. Drive every animation from the frame number. Ring movement reproduces the actual keyframes in `rings.css`, not just the preset names.
4. The test: frame N rendered directly, in sequence, and after seeking backward looks the same. Start with rings; the lattice comes later and is optional.
5. Give each loop an explicit period and a seamless boundary with no duplicated last frame.
6. Before building, check Remotion's license, the browser and encoder setup, and WOFF2 loading, with pinned versions.

The browser versions of the rings and scenes stay as they are.

## Commands

| Command | Does |
| --- | --- |
| `pnpm render-assets` | Static logos, icons and social images, their manifests, and the lab's public copy |
| `pnpm render-assets --name --symbol --out` | An icon pack for a name outside the roster |
| `pnpm render:video` | Video exports |
| `pnpm render:motion` | Motion loops |
| `pnpm check:assets` | The read-only check |
| `pnpm check:assets --bytes` | Re-render and compare |

Static renderers (Satori, `@resvg/resvg-js`, `png-to-ico`, an outline tool) go in the root tooling, pinned after the phase-1 test render. Remotion lives in `assets/video/source/package.json`; add that folder to the workspace globs when it's created.

## Decisions

| Decision | Default | Needed before |
| --- | --- | --- |
| Production URLs and per-site HTML | Only the hmziq identity is wired, in the lab | Turning on link previews for a site |
| The existing blog photo | Keep it | Replacing it |
| Rings in social banners | Ring-free until decided | Final social layouts |
| Which accounts and repos exist | Only confirmed ones | Phase 6 |
| Remotion | Chosen for phases 7–8, pinned at 4.0.531 in `assets/video/source`. The frame test passed first, and its license is free for this repo (an individual's; a for-profit company with more than 3 people would need one from remotion.pro) | Resolved 2026-10-01, before phase 7 |
| YouTube end screen | Layout and length chosen with the real channel | Final outro |
| Large files | Git LFS for video and motion exports — not yet: git-lfs isn't installed on the machine that rendered them, so the exports sit in git as plain files until it is and `.gitattributes` goes in | Phase 7 (overdue) |

## Appendix: platform sizes to recheck

Platform sizes change. Before exporting a target, check its official page and add the link and date here.

| Surface | Current target | Check against |
| --- | --- | --- |
| Maskable icon | Safe circle radius 40%; 512×512 | [W3C manifest spec](https://www.w3.org/TR/appmanifest/#icon-masks) (checked 2026-09-27) |
| Browser and app icons | SVG + ICO; PNG 16/32/48; apple-touch 180; Android 192/512 | Browser docs |
| OG and LinkedIn shares | 1200×630 (LinkedIn has used 1200×627) | [Meta images in link shares](https://developers.facebook.com/docs/sharing/webmasters/images) — at least 1200×630 for best display (checked 2026-10-01) |
| X large-image card | 1200×675 | [X card docs](https://developer.x.com/en/docs/x-for-websites/cards/overview/summary-card-with-large-image) — 16:9 matches the in-timeline crop (checked 2026-10-01) |
| X profile and header | 400×400, 1500×500 | [X help, customizing your profile](https://help.x.com/en/managing-your-account/how-to-customize-your-profile) (checked 2026-10-01) |
| LinkedIn profile and background | 400×400, 1584×396 | [LinkedIn Help a568217](https://www.linkedin.com/help/linkedin/answer/a568217) (checked 2026-10-01) |
| LinkedIn Page logo and cover | 400×400, 1512×256 | [LinkedIn Help a563309](https://www.linkedin.com/help/linkedin/answer/a563309/image-specifications-for-your-linkedin-pages-and-career-pages) |
| GitHub repo preview | 1280×640 (minimum 640×320, under 1MB) | [GitHub docs](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/customizing-your-repositorys-social-media-preview) (checked 2026-10-01) |
| YouTube thumbnail | 3840×2160 | [YouTube help](https://support.google.com/youtube/answer/72431) — 3840×2160 for videos, 16:9, minimum width 640 (checked 2026-10-01) |
| YouTube upload | 1080p H.264 MP4, SDR BT.709, 4:2:0, faststart | [YouTube encoding docs](https://support.google.com/youtube/answer/1722171) — H.264 High, 4:2:0, BT.709 for SDR, moov atom first (checked 2026-10-01) |
| YouTube end screen | The last 5–20 s of videos at least 25 s long; up to 4 elements | [YouTube help](https://support.google.com/youtube/answer/6388789) (checked 2026-10-01) |
