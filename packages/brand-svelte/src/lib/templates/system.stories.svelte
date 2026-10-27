<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import SystemOverview from "./system-overview.svelte";

	const { Story } = defineMeta({
		title: "System/Overview",
		parameters: { layout: "fullscreen" },
	});
</script>

<Story name="All components" asChild>
	<SystemOverview />
</Story>
