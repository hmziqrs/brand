<script lang="ts">
  import LiveWidget from "$brand/components/live-widget.svelte";
  import type { LiveTileSnapshot, LiveTileKind } from "@hmziq/brand-core/live";
  import type { Snippet } from "svelte";
  let { snapshot, kind = "sync", autoplay = true, controls, group, class: className }: { snapshot?: LiveTileSnapshot; kind?: LiveTileKind; autoplay?: boolean; controls?: Snippet; group?: string; class?: string } = $props();
</script>

<LiveWidget {snapshot} {kind} {autoplay} {controls} {group} class={className} presentation="notification" />
