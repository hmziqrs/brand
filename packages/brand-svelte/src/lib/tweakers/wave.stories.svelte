<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import WaveTweaker from "./wave-tweaker.svelte";
  const { Story } = defineMeta({ title: "Tweakers/Wave", component: WaveTweaker, parameters: { layout: "fullscreen" } });
</script>

<Story name="Page" />
