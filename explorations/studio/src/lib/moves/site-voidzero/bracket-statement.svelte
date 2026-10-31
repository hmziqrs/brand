<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$brand/utils.js';
	import DotField from './dot-field.svelte';
	import { pointer } from './pointer';

	let {
		heading,
		name,
		role,
		class: className,
		children
	}: {
		heading: string;
		name?: string;
		role?: string;
		class?: string;
		children: Snippet;
	} = $props();
</script>

<div use:pointer class={cn('bracket-statement relative isolate grid gap-12 overflow-hidden px-6 py-20 sm:px-10 md:py-32 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center', className)}>
	<DotField class="-z-10" />
	<h2 class="max-w-[14ch] text-4xl leading-[1.02] font-medium tracking-[-0.04em] text-balance sm:text-6xl">{heading}</h2>
	<div class="relative px-6 sm:px-9">
		<span aria-hidden="true" class="absolute top-0 bottom-0 left-0 w-3 border-y-2 border-l-2 border-primary"></span>
		<span aria-hidden="true" class="absolute top-0 right-0 bottom-0 w-3 border-y-2 border-r-2 border-primary"></span>
		<div class="flex flex-col gap-5 py-2 text-lg leading-relaxed text-foreground sm:text-xl">{@render children()}</div>
		{#if name}
			<div class="mt-8 flex items-end gap-4">
				<svg viewBox="0 0 160 56" class="h-12 w-auto text-foreground" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M6 40c6-14 12-30 16-30s-4 34 0 34 10-22 14-22-2 18 2 18 8-12 12-12 0 10 4 10 10-16 16-16-4 18 2 18c8 0 12-14 18-14s0 12 6 12 14-10 22-12 18-2 30-6" />
					<path d="M40 50c30-4 70-6 104-8" stroke-width="1.4" />
				</svg>
				<div>
					<p class="font-medium">{name}</p>
					{#if role}<p class="font-mono text-xs text-muted-foreground uppercase">{role}</p>{/if}
				</div>
			</div>
		{/if}
	</div>
</div>
