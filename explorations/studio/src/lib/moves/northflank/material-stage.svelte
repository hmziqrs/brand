<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import type { Snippet } from 'svelte';

	let {
		preset = 'hammered-copper',
		live = false,
		caption,
		class: className,
		children
	}: { preset?: string; live?: boolean; caption?: string; class?: string; children: Snippet } = $props();
</script>

<div data-slot="material-stage" class={cn('relative isolate overflow-hidden rounded-[28px] border', className)}>
	<ShaderMaterial {preset} rendering={live ? 'live' : 'image'} animated={live} controls={live} class="absolute inset-0 -z-10 h-full w-full" />
	<span class="absolute inset-0 -z-10 bg-[radial-gradient(90%_80%_at_50%_100%,color-mix(in_oklab,var(--background)_55%,transparent),transparent_70%)]" aria-hidden="true"></span>
	{@render children()}
	{#if caption}
		<span class="absolute top-4 left-4 rounded-md bg-background/85 px-2.5 py-1 font-mono text-[10.5px] tracking-[0.12em] text-foreground uppercase backdrop-blur">{caption}</span>
	{/if}
</div>
