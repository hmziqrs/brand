<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import type { Snippet } from 'svelte';

	let {
		preset = 'lava-fissures',
		live = true,
		scrim = 'bottom',
		quality = 0.6,
		class: className,
		children
	}: {
		preset?: string;
		live?: boolean;
		scrim?: 'bottom' | 'left' | 'full' | 'none';
		quality?: number;
		class?: string;
		children: Snippet;
	} = $props();

	const scrims = {
		bottom: 'bg-[linear-gradient(to_bottom,color-mix(in_oklab,var(--background)_55%,transparent)_0%,transparent_30%,transparent_45%,var(--background)_100%)]',
		left: 'bg-[linear-gradient(to_right,var(--background)_0%,color-mix(in_oklab,var(--background)_70%,transparent)_45%,transparent_80%)]',
		full: 'bg-[color-mix(in_oklab,var(--background)_55%,transparent)]',
		none: ''
	} as const;
</script>

<section data-slot="live-oxide-stage" class={cn('relative isolate overflow-hidden', className)}>
	<ShaderMaterial
		{preset}
		rendering={live ? 'live' : 'image'}
		animated={live}
		{quality}
		loading="eager"
		fetchpriority="high"
		class="absolute inset-0 -z-20"
	/>
	{#if scrim !== 'none'}<div aria-hidden="true" class={cn('pointer-events-none absolute inset-0 -z-10', scrims[scrim])}></div>{/if}
	{@render children()}
</section>
