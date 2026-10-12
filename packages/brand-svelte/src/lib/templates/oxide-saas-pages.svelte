<script lang="ts">
	import OxideSightline from "$brand/templates/oxide-sightline.svelte";
	import OxideGroundwork from "$brand/templates/oxide-groundwork.svelte";
	import OxideHookline from "$brand/templates/oxide-hookline.svelte";

	let { variant = "analytics", animated = false }: {
		variant?: "analytics" | "team-planning" | "developer-api";
		animated?: boolean;
	} = $props();
</script>

{#if variant === "team-planning"}
	<OxideGroundwork {animated} />
{:else if variant === "developer-api"}
	<OxideHookline {animated} />
{:else}
	<OxideSightline {animated} />
{/if}
