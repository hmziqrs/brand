<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import RustGridField from '$moves/flora/rust-grid-field.svelte';

	let {
		preset = 'oxide-bloom',
		live = true,
		veil = 0.78,
		cell = 48,
		corner,
		bleed = false,
		children,
		class: className
	}: { preset?: string; live?: boolean; veil?: number; cell?: number; corner?: string; bleed?: boolean; children?: Snippet; class?: string } = $props();
</script>

<div class={cn('dark relative isolate grid min-h-[520px] place-items-center overflow-hidden bg-background px-4 py-16 text-foreground md:min-h-[640px]', bleed ? 'w-full border-y border-border' : 'rounded-[28px] border border-border', className)}>
	<ShaderMaterial {preset} rendering={live ? 'live' : 'image'} animated={live} controls={false} loading="eager" fetchpriority="high" sizes={bleed ? "100vw" : "1280px"} class="absolute inset-0 -z-20 h-full w-full" />
	<RustGridField mode="reveal" {cell} {veil} fade="none" gap={1} class="-z-10" />
	{@render children?.()}
	{#if corner}<span class="absolute right-5 bottom-4 rounded-full bg-background/80 px-2.5 py-1 font-mono text-[0.6875rem] tracking-wide uppercase backdrop-blur">{corner}</span>{/if}
</div>
