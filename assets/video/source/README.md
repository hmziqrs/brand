# @hmziq/brand-video

The Remotion project behind the brand's video and motion exports ([docs/assets.md](../../../docs/assets.md), phases 7–8). Everything it draws comes from `@hmziq/brand-core`: the theme tokens through the color resolver, the ring picture through the frame adapter (`motion/frame`), the wordmark from the logo recipe. Nothing here invents a color, a shape or a timing of its own.

The frame adapter is the point of the design: the browser rings animate on the clock, but video asks for frames in any order. `ringFrames(list, motion, seed, palette, t)` is the same movement as a pure function of time — proven by `packages/brand-core/test/frame.test.ts` (rendered directly, in sequence and after seeking backward) before any of this was built, as assets.md requires.

## What renders

| Composition | What it is |
| --- | --- |
| `intro` | 1920×1080, 5 s. The rings come in, the signature settles, the address follows. |
| `outro` | 1920×1080, 10 s. Everything settles in the first 2 s; the last 5 s hold still except for the rings — a clean end screen, words in the left third. The video it's added to needs to be at least 25 s for YouTube to allow one. |
| `thumbnail` | 3840×2160 still, 16:9. Kicker, title, signature; rings right, never behind the words. |
| `<preset>-loop` | 1920×1080 WebM for each moving ring preset (`ringPresets` minus `still`), one exact period long. |
| `ripple-turn-640` | The 640×360, 15 fps GIF twin of the ripple-turn loop. |

Each loop's timers live in [`src/loops.ts`](./src/loops.ts), fitted so every moving part finishes exactly on the period and a ripple's wave is over before the cut (`cross + glow ≤ every`). `scripts/render-motion.mjs` re-proves the seam through the adapter before rendering a single frame.

## Commands

From the repo root:

```sh
pnpm render:video                 # intro.mp4 and outro.mp4 into assets/video/exports/
pnpm render:motion                # one WebM per preset + ripple-turn-640.gif into assets/motion/exports/
pnpm --filter @hmziq/brand-video studio   # Remotion Studio to preview
```

Both render commands write a `manifest.json` next to their files: every file hashed, plus a digest of every input (theme, roster, logo and ring code, fonts, this project's source, the lockfile) and the render settings.

The thumbnail is a template, rendered per video:

```sh
pnpm render:video --still thumbnail --out ~/Desktop/thumb.png --title "One kit, every site"
```

## Setup notes

- Remotion is pinned (`4.0.531`, every `@remotion/*` at the same version). Its [license](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md) is free for individuals and companies up to 3 people — this repo is one person's, so the free tier applies; a company using this repo would need a license from remotion.pro.
- The browser is Remotion's own pinned Headless Shell (`pnpm --filter @hmziq/brand-video exec remotion browser ensure`); the encoder is the ffmpeg Remotion ships. `render-video.mjs` checks the MP4s are faststart (moov before mdat) before accepting them.
- Fonts load in the browser before any frame is let through (`src/fonts.ts`): the Onest variable WOFF2 and JetBrains Mono 400, both from `assets/fonts/`.
- The webpack override in [`scripts/webpack.mjs`](./scripts/webpack.mjs) keeps Remotion's style-loader away from `theme.css` so the resolver can read it as text in the browser.
