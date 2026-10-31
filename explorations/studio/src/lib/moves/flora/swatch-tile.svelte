<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import type { Snippet } from 'svelte';

	let {
		preset,
		title,
		kind,
		body,
		index,
		href = '#',
		aspect = 'aspect-[4/3]',
		frame = 'card',
		art,
		class: className
	}: {
		preset: string;
		title: string;
		kind: string;
		body?: string;
		index?: string;
		href?: string;
		aspect?: string;
		frame?: 'card' | 'bare' | 'mat';
		art?: Snippet;
		class?: string;
	} = $props();

	const frames = {
		card: 'rounded-2xl border border-border bg-card p-2',
		bare: 'rounded-2xl',
		mat: 'rounded-[1.25rem] border border-border bg-background p-3 sm:p-4'
	};
</script>

<a
	{href}
	class={cn(
		'group/swatch relative flex flex-col outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
		frames[frame],
		className
	)}
>
	<div class={cn('relative overflow-hidden rounded-xl', aspect)}>
		<div
			class="absolute -inset-[6%] transition-transform duration-[1200ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover/swatch:translate-x-[-3%] group-hover/swatch:scale-[1.08] group-hover/swatch:rotate-[-1.5deg] motion-reduce:transition-none motion-reduce:group-hover/swatch:transform-none"
		>
			<ShaderMaterial {preset} rendering="image" loading="eager" controls={false} sizes="(min-width: 1024px) 40vw, 100vw" class="absolute inset-0" />
		</div>
		<div class="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_120%,color-mix(in_oklab,black_55%,transparent),transparent_60%)]"></div>
		{#if art}
			<div class="absolute inset-0 grid place-items-center p-[8%] transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover/swatch:-translate-y-2 motion-reduce:transition-none motion-reduce:group-hover/swatch:transform-none">
				{@render art()}
			</div>
		{/if}
		{#if index}
			<span class="absolute top-3 left-3 rounded-md bg-background px-2 py-1 font-mono text-[11px] text-foreground">{index}</span>
		{/if}
		<span
			class="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-background text-foreground transition-transform duration-500 group-hover/swatch:rotate-45 group-hover/swatch:bg-primary group-hover/swatch:text-primary-foreground motion-reduce:transition-none motion-reduce:group-hover/swatch:rotate-0"
		>
			<ArrowUpRight class="lucide size-4" />
		</span>
	</div>
	<div class="flex items-start justify-between gap-4 px-2 pt-4 pb-2">
		<div class="min-w-0">
			<p class="text-lg font-medium tracking-tight text-foreground">{title}</p>
			{#if body}<p class="mt-1 text-[15px] leading-snug text-foreground/80">{body}</p>{/if}
		</div>
		<span class="shrink-0 rounded-full border border-border px-2.5 py-1 font-mono text-[11px] tracking-wide text-foreground uppercase">{kind}</span>
	</div>
</a>
