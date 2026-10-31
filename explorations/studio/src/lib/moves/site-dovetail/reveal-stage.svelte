<script lang="ts">
	import type { Snippet } from 'svelte';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import RustGridField from '$moves/flora/rust-grid-field.svelte';
	import { cn } from '$brand/utils.js';

	let {
		preset = 'oxide-bloom',
		live = true,
		veil = 0.86,
		cell = 48,
		fade = true,
		children,
		class: className
	}: {
		preset?: string;
		live?: boolean;
		veil?: number;
		cell?: number;
		fade?: boolean;
		children: Snippet;
		class?: string;
	} = $props();
</script>

<section class={cn('relative isolate overflow-hidden', className)}>
	<ShaderMaterial
		{preset}
		rendering={live ? 'live' : 'image'}
		animated={live}
		controls={false}
		loading="eager"
		fetchpriority="high"
		class="absolute inset-0 -z-30 h-full w-full"
	/>
	<RustGridField mode="reveal" {cell} {veil} fade="none" gap={0} lines={true} class="-z-20" />
	{#if fade}
		<div aria-hidden="true" class="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[38%] bg-gradient-to-b from-transparent to-background"></div>
	{/if}
	{@render children()}
</section>
