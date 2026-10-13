<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import Tunnel from "./tunnel.svelte";
	import Oxiwake from "./oxiwake.svelte";

	const { Story } = defineMeta({
		title: "Sites/freeoxide tools",
		parameters: { layout: "fullscreen" },
	});
</script>

<!-- freeoxide's tunnel (ft): its own rings beside the words, and a glass picker for what to share. -->
<Story name="tunnel" asChild>
	<Tunnel />
</Story>

<!-- freeoxide's Oxiwake (ow): a switch that turns its card from night to day. -->
<Story name="oxiwake" asChild>
	<Oxiwake />
</Story>
