<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import SystemOverview from "./system-overview.svelte";

	const { Story } = defineMeta({
		title: "System/Overview",
		parameters: { layout: "fullscreen" },
	});
</script>

<!-- Every piece of the kit by what it's for, with the rules they share and a link to each one's stories. -->
<Story name="All components" asChild>
	<SystemOverview />
</Story>
