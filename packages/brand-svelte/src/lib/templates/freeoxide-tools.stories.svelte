<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import Tunnel from "./tunnel.svelte";
	import Oxiwake from "./oxiwake.svelte";

	const { Story } = defineMeta({
		title: "Sites/freeoxide tools",
		parameters: { layout: "fullscreen" },
	});
</script>

<Story name="tunnel" asChild>
	<Tunnel />
</Story>

<Story name="oxiwake" asChild>
	<Oxiwake />
</Story>
