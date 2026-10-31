<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import type { Component } from 'svelte';

	let {
		icon: Icon,
		title,
		body,
		tags = [],
		index,
		href = '#',
		variant = 'fill',
		class: className
	}: {
		icon?: Component<{ class?: string }>;
		title: string;
		body: string;
		tags?: string[];
		index?: string;
		href?: string;
		variant?: 'fill' | 'editorial';
		class?: string;
	} = $props();

	const grain =
		"url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";
</script>

{#if variant === 'fill'}
	<a
		{href}
		class={cn(
			'group/lift relative isolate flex min-h-[250px] flex-col sm:min-h-[320px] overflow-hidden rounded-2xl border border-border bg-card p-6 outline-none transition-[translate,box-shadow] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_color-mix(in_oklab,var(--primary)_60%,transparent)] focus-visible:ring-3 focus-visible:ring-ring/50 motion-reduce:transition-none motion-reduce:hover:translate-y-0',
			className
		)}
	>
		<span
			aria-hidden="true"
			class="absolute inset-x-0 bottom-0 -z-10 h-0 bg-primary transition-[height] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover/lift:h-full group-focus-visible/lift:h-full motion-reduce:transition-none"
		>
			<span class="absolute inset-0 opacity-40 mix-blend-multiply" style:background-image={grain}></span>
		</span>
		<div class="flex items-center justify-between">
			{#if Icon}
				<span class="grid size-11 place-items-center rounded-xl border border-border text-primary transition-[rotate,color,border-color] duration-500 group-hover/lift:rotate-[-8deg] group-hover/lift:border-current group-hover/lift:text-primary-foreground motion-reduce:transition-none motion-reduce:group-hover/lift:rotate-0">
					<Icon class="lucide size-5" />
				</span>
			{/if}
			{#if index}<span class="font-mono text-xs text-foreground transition-colors duration-500 group-hover/lift:text-primary-foreground">{index}</span>{/if}
		</div>
		<div class="mt-auto pt-10">
			<h3 class="text-2xl font-medium tracking-tight text-foreground transition-colors duration-500 group-hover/lift:text-primary-foreground">{title}</h3>
			<p class="mt-2 text-[17px] leading-snug text-foreground/85 transition-colors duration-500 group-hover/lift:text-primary-foreground">{body}</p>
			{#if tags.length}
				<div class="mt-5 flex flex-wrap gap-1.5">
					{#each tags as t (t)}
						<span class="rounded-full border border-border px-2.5 py-0.5 font-mono text-[11px] text-foreground transition-colors duration-500 group-hover/lift:border-current group-hover/lift:text-primary-foreground">{t}</span>
					{/each}
				</div>
			{/if}
		</div>
	</a>
{:else}
	<a
		{href}
		class={cn(
			'group/lift relative grid gap-4 border-t border-foreground/80 py-7 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:grid-cols-[5rem_1fr_auto] sm:items-baseline',
			className
		)}
	>
		<span aria-hidden="true" class="absolute top-[-1px] left-0 h-[3px] w-0 bg-primary transition-[width] duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover/lift:w-full motion-reduce:transition-none"></span>
		<span class="font-mono text-sm text-foreground">{index}</span>
		<div class="transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover/lift:translate-x-3 motion-reduce:transition-none motion-reduce:group-hover/lift:translate-x-0">
			<h3 class="text-[clamp(1.75rem,3.4vw,2.75rem)] leading-none font-medium tracking-[-0.03em] text-foreground">{title}</h3>
			<p class="mt-3 max-w-xl text-lg leading-snug text-foreground/85">{body}</p>
			{#if tags.length}<p class="mt-3 font-mono text-xs tracking-wide text-foreground uppercase">{tags.join(' · ')}</p>{/if}
		</div>
		<span class="hidden size-12 place-items-center rounded-full border border-foreground/30 text-foreground transition-[rotate,background-color,color] duration-500 group-hover/lift:-rotate-45 group-hover/lift:bg-primary group-hover/lift:text-primary-foreground sm:grid motion-reduce:transition-none motion-reduce:group-hover/lift:rotate-0">
			<ArrowRight class="lucide size-5" />
		</span>
	</a>
{/if}
