<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';

	let {
		title,
		body,
		href,
		tone = 'plain',
		preset = 'cast-iron',
		art,
		artClass,
		class: className
	}: {
		title: string;
		body?: string;
		href?: string;
		tone?: 'plain' | 'oxide' | 'material';
		preset?: string;
		art?: Snippet;
		artClass?: string;
		class?: string;
	} = $props();

	let mx = $state(-999);
	let my = $state(-999);
</script>

<div
	role="presentation"
	onpointermove={(e) => {
		const r = e.currentTarget.getBoundingClientRect();
		mx = e.clientX - r.left;
		my = e.clientY - r.top;
	}}
	onpointerleave={() => ((mx = -999), (my = -999))}
	class={cn(
		'group relative isolate flex min-w-0 flex-col overflow-hidden',
		tone === 'oxide' ? 'band-orange' : tone === 'material' ? 'dark bg-background text-foreground' : 'bg-background',
		className
	)}
>
	{#if tone === 'material'}
		<ShaderMaterial {preset} rendering="image" controls={false} sizes="640px" class="absolute inset-0 -z-20 h-full w-full" />
		<div class="absolute inset-0 -z-10 bg-[linear-gradient(to_top,var(--background)_8%,transparent_70%)]"></div>
	{/if}
	<div
		aria-hidden="true"
		class="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none"
		style:background={`radial-gradient(360px circle at ${mx}px ${my}px, color-mix(in oklab, ${tone === 'oxide' ? 'var(--on-orange)' : 'var(--orange)'} 16%, transparent), transparent 70%)`}
	></div>
	{#if art}
		<div class={cn('relative flex min-h-56 flex-1 items-center justify-center px-6 pt-8', artClass)}>{@render art()}</div>
	{/if}
	<div class={cn('relative mt-auto px-6 pt-4 pb-6', !art && 'pt-10')}>
		{#if href}
			<a {href} class="inline-flex items-center gap-1.5 text-xl font-medium tracking-[-0.02em] after:absolute after:inset-0">
				{title}<ArrowRight class="lucide size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
			</a>
		{:else}
			<h3 class="text-xl font-medium tracking-[-0.02em]">{title}</h3>
		{/if}
		{#if body}<p class={cn('mt-1.5 max-w-[46ch] text-[1.0625rem] leading-snug', tone === 'plain' ? 'text-foreground/75' : '')}>{body}</p>{/if}
	</div>
</div>
