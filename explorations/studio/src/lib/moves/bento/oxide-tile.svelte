<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$brand/utils.js';
	import CornerRings from '$brand/components/corner-rings.svelte';

	let {
		eyebrow,
		big,
		title,
		body,
		art = 'rings',
		seed = 'gpui-query',
		size = 'md',
		children,
		class: className
	}: {
		eyebrow?: string;
		big?: string;
		title?: string;
		body?: string;
		art?: 'rings' | 'square' | 'none';
		seed?: string;
		size?: 'md' | 'lg';
		children?: Snippet;
		class?: string;
	} = $props();
</script>

<div data-slot="oxide-tile" class={cn('band-orange relative isolate flex min-w-0 flex-col gap-4 overflow-hidden rounded-2xl p-6 md:p-7', className)}>
	{#if art === 'rings'}
		<CornerRings {seed} color="var(--on-orange)" class="pointer-events-none absolute -top-2 -right-2 -z-10 w-2/3 max-w-80 opacity-70" />
	{:else if art === 'square'}
		<span aria-hidden="true" class="absolute top-6 right-6 size-10 rounded-[6px] bg-(--on-orange) md:size-12"></span>
	{/if}
	{#if eyebrow}<p class="font-mono text-xs tracking-wide uppercase">{eyebrow}</p>{/if}
	{#if big}
		<p class={cn('font-medium leading-[0.85] tracking-[-0.06em] tabular-nums', size === 'lg' ? 'text-[clamp(5rem,14vw,11rem)]' : 'text-[clamp(4rem,9vw,7rem)]')}>{big}</p>
	{/if}
	<div class="mt-auto flex flex-col gap-2">
		{#if title}<h3 class={cn('font-medium tracking-[-0.02em] text-balance', size === 'lg' ? 'text-3xl md:text-5xl' : 'text-2xl')}>{title}</h3>{/if}
		{#if body}<p class={cn('leading-snug', size === 'lg' ? 'max-w-[44ch] text-lg md:text-xl' : 'text-base')}>{body}</p>{/if}
		{@render children?.()}
	</div>
</div>
