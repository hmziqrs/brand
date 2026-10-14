# Material text

Open **Tweakers / Material text / Page** in Storybook. The tweaker uses the same split preview and controls as the logo and shader tools. It keeps the Bento examples unchanged.

Choose a material from the library or the Material selector. Edit text, font, alignment, size, weight, tracking, and line height. Texture zoom and position change the shader framing. Material amount blends toward solid text; tint and outline change the finish. Tint starts at 0%.

Animation uses the same shader recipes and renderer as Shader Studio. Speed controls playback, Time selects a frame and pauses, and Seed changes the material variation. The material is rendered once across the lettering and clipped with a text mask. There are no repeating poster tiles or CSS shimmer overlays.

Settings persist under `hmziq-material-text-tweaks`. Reset restores defaults. Download exports JSON; Load settings accepts either that document or a partial settings object. Partial loads preserve other values, clamp finite numbers, and ignore unsupported materials, fonts, alignments, and colors. Invalid documents show an error without changing the preview.

```svelte
<script lang="ts">
  import MaterialText from "$brand/components/material-text.svelte";
  import settings from "./material-text.json";
</script>

<MaterialText look={settings.materialText} />
```

Astro uses `$brand/components/material-text.astro` with the same `look` and `paused` props. Both adapters share the settings model, text mask, and shader renderer. The text stays selectable and available to screen readers; the shader surface and tint layer are decorative.

Size scales down to fit narrow containers. Motion stops offscreen, in hidden tabs, when paused, and for reduced motion. Forced colors renders solid text. Without WebGPU, the component displays one continuous poster and reports a static fallback in the tweaker.
