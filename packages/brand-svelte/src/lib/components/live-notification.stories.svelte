<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import LiveDemo from "$brand/blocks/live/live-demo.svelte";
  const { Story } = defineMeta({ title: "Custom/Live Notification", component: LiveDemo, parameters: { layout: "centered" }, args: { placement: "notification", autoplay: true }, argTypes: { placement: { description: "Which live surface renders: activity, notification or widget." }, autoplay: { description: "Starts the live demo as soon as it mounts." } } });
</script>

<Story name="Downloads" args={{ kind: "downloads" }} />
<Story name="Build" args={{ kind: "build" }} />
<Story name="Active previews" args={{ kind: "links" }} />
<Story name="Sync" args={{ kind: "sync" }} />
<Story name="Presence" args={{ kind: "presence" }} />
<Story name="Still" args={{ kind: "downloads", autoplay: false }} />
