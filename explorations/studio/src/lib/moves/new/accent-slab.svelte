<script lang="ts">
	import type { Snippet } from 'svelte';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import { cn } from '$brand/utils.js';
	import InlineRing from './inline-ring.svelte';

	let {
		preset = 'oxide-chalk',
		seed = 'slab',
		kicker,
		size = 'lg',
		grain = 0.28,
		ring = true,
		class: className,
		children,
		footer
	}: {
		preset?: string;
		seed?: string;
		kicker?: string;
		size?: 'sm' | 'lg';
		grain?: number;
		ring?: boolean;
		class?: string;
		children: Snippet;
		footer?: Snippet;
	} = $props();
</script>

<div class={cn('accent-slab relative isolate overflow-hidden rounded-2xl', size === 'lg' ? 'p-7 sm:p-12' : 'p-5 sm:p-6', className)}>
	<ShaderMaterial {preset} rendering="image" controls={false} transparent blend="multiply" opacity={grain} class="absolute inset-0 -z-10" sizes="60vw" />
	{#if ring}<InlineRing {seed} rings={10} solid={false} class={cn('ring-art pointer-events-none absolute -z-10', size === 'lg' ? '-top-24 -right-24 size-64 sm:-top-28 sm:-right-28 sm:size-[26rem]' : '-top-20 -right-16 size-56')} />{/if}
	{#if kicker}<p class="mb-6 flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.22em] opacity-80"><span class="inline-block size-2 bg-current"></span>{kicker}</p>{/if}
	<div class="relative">{@render children()}</div>
	{#if footer}<div class="relative mt-8 border-t border-current/20 pt-5">{@render footer()}</div>{/if}
</div>

<style>
	.accent-slab {
		background: var(--pa-fill, var(--primary));
		color: var(--on-pa, var(--primary-foreground));
	}
	.accent-slab :global(.ring-art) {
		--pa: var(--on-pa, var(--primary-foreground));
		--foreground: var(--on-pa, var(--primary-foreground));
		opacity: 0.55;
	}
</style>
