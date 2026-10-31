<script lang="ts">
	import { cn } from '$brand/utils.js';
	import type { Snippet } from 'svelte';
	import DitherField from './dither-field.svelte';

	let {
		texture = true,
		from = 'bottom',
		class: className,
		children
	}: { texture?: boolean; from?: 'bottom' | 'top' | 'center'; class?: string; children: Snippet } = $props();
</script>

<div data-slot="oxide-slab" class={cn('dark band-orange relative isolate overflow-hidden', className)}>
	{#if texture}
		<DitherField tone="on-accent" {from} strength={0.55} cell={6} class="-z-10 opacity-25" />
	{/if}
	{@render children()}
</div>
