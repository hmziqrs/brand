<script lang="ts">
  import LiveWidget from "$brand/components/live-widget.svelte";
  import LiveActivity from "$brand/components/live-activity.svelte";
  import LiveNotification from "$brand/components/live-notification.svelte";
  import type { LiveTileKind } from "@hmziq/brand-core/live";
  let { kind = "downloads", placement = "widget", autoplay = true }: { kind?: LiveTileKind; placement?: "all" | "activity" | "notification" | "widget"; autoplay?: boolean } = $props();
</script>

<div data-slot="live-demo" class="min-w-0">
  {#if placement === "activity"}<LiveActivity {kind} {autoplay} />{:else if placement === "notification"}<LiveNotification {kind} {autoplay} />{:else}<LiveWidget {kind} {autoplay} />{/if}
</div>
