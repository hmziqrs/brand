<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import LiveDemo from "$brand/blocks/live/live-demo.svelte";
  const { Story } = defineMeta({ title: "Custom/Live Widget", component: LiveDemo, args: { placement: "widget", autoplay: true } });
</script>

<Story name="Downloads" args={{ kind: "downloads" }} />
<Story name="Build" args={{ kind: "build" }} />
<Story name="Active previews" args={{ kind: "links" }} />
<Story name="Sync" args={{ kind: "sync" }} />
<Story name="Presence" args={{ kind: "presence" }} />
<Story name="Still" args={{ kind: "downloads", autoplay: false }} />
