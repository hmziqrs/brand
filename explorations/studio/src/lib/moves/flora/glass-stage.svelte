<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import Glass from '$brand/components/glass.svelte';
	import LiquidGlass from '$brand/components/liquid-glass.svelte';
	import type { Snippet } from 'svelte';

	let {
		preset = 'hammered-copper',
		rendering = 'image',
		animated = false,
		glass = 'frost',
		align = 'left',
		drift = true,
		id,
		aside,
		children,
		class: className
	}: {
		preset?: string;
		rendering?: 'image' | 'live';
		animated?: boolean;
		glass?: 'frost' | 'smoke' | 'liquid';
		align?: 'left' | 'center' | 'right';
		drift?: boolean;
		id?: string;
		aside?: Snippet;
		children: Snippet;
		class?: string;
	} = $props();

	const places = {
		left: 'justify-start',
		center: 'justify-center text-center',
		right: 'justify-end'
	};
	const panel = 'w-full max-w-[560px] rounded-3xl p-7 sm:p-10';
</script>

<section {id} class={cn('relative isolate flex min-h-[100svh] items-center overflow-hidden', className)}>
	<div class={cn('absolute -inset-[4%] -z-10', drift && 'stage-drift')}>
		<ShaderMaterial {preset} {rendering} {animated} loading="eager" controls={rendering === 'live'} sizes="100vw" class="absolute inset-0 h-full w-full" />
	</div>
	<div class="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,color-mix(in_oklab,var(--background)_55%,transparent),transparent_22%,transparent_78%,color-mix(in_oklab,var(--background)_70%,transparent))]"></div>
	<div class={cn('mx-auto flex w-full max-w-[1320px] flex-wrap items-end gap-8 px-4 py-24 sm:px-8', places[align])}>
		{#if glass === 'liquid'}
			<LiquidGlass bend={36} edge={20} blur={14} class={cn(panel, 'bg-[color-mix(in_oklab,var(--background)_62%,transparent)]')}>
				{@render children()}
			</LiquidGlass>
		{:else}
			<Glass variant={glass} grain class={panel}>
				{@render children()}
			</Glass>
		{/if}
		{#if aside}{@render aside()}{/if}
	</div>
</section>

<style>
	:global(.stage-drift) {
		animation: stage-drift 38s ease-in-out infinite alternate;
	}
	@keyframes stage-drift {
		from {
			transform: scale(1.02) translate3d(0, 0, 0);
		}
		to {
			transform: scale(1.1) translate3d(-2%, 1.5%, 0);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		:global(.stage-drift) {
			animation: none;
		}
	}
</style>
