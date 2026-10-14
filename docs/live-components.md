# Live Bento components

`LiveBentoCard` cycles through image, text, and material scenes inside a Bento tile. Images crossfade, copy follows after 180 ms, and material texture motion starts after 850 ms. The examples use the kit’s own overview and members screens. Frosted captions sit over images and material edges; `glass={false}` keeps captions on the plain surface.

```svelte
<BentoTile cols={4} rows={2}>
  {#snippet media()}
    <LiveBentoCard preset="showcase" label="Product preview" class="h-full" />
  {/snippet}
</BentoTile>
```

Cards size type and materials from their own width. Scenes share a grid track sized by the tallest scene, so changing slides does not change the card’s height. On narrow cards, screenshots fit within the image frame, labels stack above the 44-pixel scene controls, and the pause control is 44 pixels. Reduced transparency uses the kit’s solid-surface fallback.

Presets: `showcase`, `words`, `materials`, and `gallery`. Pass `items` with the `LiveBentoScene` shape from `@hmziq/brand-core/live-carousel` for your own scenes. Each item has a unique `id`, a `type` (`image`, `text`, or `material`), a `title`, and a `body`. Text accepts `material` to fill the letters with a shader poster; the `words` preset shows copper and folded foil with a slow light crossfade. The title stays selectable text. Images accept `src` and `alt`; materials accept a shader poster name in `material` and a `shape` (`ring`, `disc`, or `tile`).

`interval` controls each scene’s hold in milliseconds, with a 4-second minimum. The default is 6500 ms. `initial` selects the opening scene. `autoplay={false}` starts paused. Corner controls pause or resume; selecting a scene pauses playback. Keyboard selection changes scenes without transitions. Hidden tabs and offscreen cards suspend their clocks and texture motion. Reduced motion starts paused and removes transitions and texture motion, including after explicit play. Unmount releases frames, observers, and listeners.

Open `/live` for the four carousel treatments, or `Custom/Live Bento Card` in Storybook. The Astro adapter uses native markup and the same clock and CSS as Svelte. Material motion moves the cached texture inside its shape; these cards create no WebGPU devices.

`LiveWidget` renders downloads, build progress, active preview links, workspace presence, or file sync. It fills a Bento tile's media slot and starts its demo automatically. `LiveActivity` is a wider task surface; `LiveNotification` is a compact update.

```svelte
<BentoTile cols={2} rows={2}>
  {#snippet media()}
    <LiveWidget kind="sync" class="h-full" />
  {/snippet}
</BentoTile>
```

The kinds are `downloads`, `build`, `links`, `sync`, and `presence`. Pass `snapshot={data}` with the `LiveTileSnapshot` shape from `@hmziq/brand-core/live` to render your own data. The page owns fetching and connection state. Supplying a snapshot disables the built-in demo and its pause control.

Material appears in the build ring and beneath the frosted sync surface. Charts, links, and presence use the kit's normal surfaces, type, and colors.

The other live widgets remain available in both starters. `/live/product`, `/live/workspace`, and `/live/studio` show different compositions. Storybook has `Custom/Live Widget`, `Custom/Live Activity`, `Custom/Live Notification`, and `Templates/Live pages`. The Astro gallery is `/kit/live`.

Demo values are simulated. Stream previews keep updating until paused. The build finishes after 32 seconds and offers replay. Hidden tabs and offscreen tiles suspend their timers. Reduced motion starts playback paused; the play control permits data updates with visual motion disabled.

The clock releases timers, observers, and listeners on unmount. Numbers remain outside live announcement regions. Task status changes are announced politely. Astro uses native scripts and the same framework-free clock and snapshots as Svelte.
