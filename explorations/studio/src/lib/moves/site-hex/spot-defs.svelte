<svelte:options namespace="svg" />

<script lang="ts">
	let { id }: { id: string } = $props();
</script>

<defs>
	<pattern id="{id}-hatch" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)">
		<rect width="4" height="4" fill="var(--background)" />
		<line x1="0" y1="0" x2="0" y2="4" stroke="currentColor" stroke-width="0.8" opacity="0.45" />
	</pattern>
	<pattern id="{id}-shade" width="3" height="3" patternUnits="userSpaceOnUse">
		<rect width="3" height="3" fill="var(--background)" />
		<circle cx="1.5" cy="1.5" r="0.55" fill="currentColor" opacity="0.5" />
	</pattern>
	<pattern id="{id}-rust" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)">
		<rect width="4" height="4" fill="var(--orange)" />
		<line x1="0" y1="0" x2="0" y2="4" stroke="var(--background)" stroke-width="1.1" opacity="0.55" />
	</pattern>
	<linearGradient id="{id}-fade" x1="0" y1="0" x2="0" y2="1">
		<stop offset="0" stop-color="white" stop-opacity="1" />
		<stop offset="1" stop-color="white" stop-opacity="0" />
	</linearGradient>
	<radialGradient id="{id}-floorfade" cx="0.5" cy="0.5" r="0.5">
		<stop offset="0.35" stop-color="white" stop-opacity="1" />
		<stop offset="1" stop-color="white" stop-opacity="0" />
	</radialGradient>
	<mask id="{id}-floormask" maskContentUnits="objectBoundingBox">
		<rect width="1" height="1" fill="url(#{id}-floorfade)" />
	</mask>
</defs>
