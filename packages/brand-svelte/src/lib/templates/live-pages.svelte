<script lang="ts">
  import LivePages from "$brand/blocks/live/live-pages.svelte";
  import type { LivePageVariant, LivePageLink } from "@hmziq/brand-core/live-pages";
  let { variant = "overview", autoplay = true, links }: { variant?: LivePageVariant; autoplay?: boolean; links?: readonly LivePageLink[] } = $props();
</script>

<LivePages {variant} {autoplay} {links} />
