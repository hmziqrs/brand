<script lang="ts">
  import LiveWidget from "$brand/components/live-widget.svelte";
  import type { LiveTileSnapshot, LiveTileKind } from "@hmziq/brand-core/live";
  import type { Snippet } from "svelte";
  let { snapshot, kind = "build", autoplay = true, controls, onupdate, group, class: className }: { snapshot?: LiveTileSnapshot; kind?: LiveTileKind; autoplay?: boolean; controls?: Snippet; onupdate?: (snapshot: LiveTileSnapshot) => void; group?: string; class?: string } = $props();
</script>

<LiveWidget {snapshot} {kind} {autoplay} {controls} {onupdate} {group} class={className} presentation="activity" />
