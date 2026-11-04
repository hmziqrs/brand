<script lang="ts">
	import { cn } from '$brand/utils.js';
	import RevealStage from '$moves/review/parts/site-dovetail/reveal-stage.svelte';

	let { preset = 'oxide-bloom', class: className }: { preset?: string; class?: string } = $props();
</script>

<RevealStage {preset} class={cn('absolute inset-0', className)}>
	{#snippet children()}{/snippet}
</RevealStage>
