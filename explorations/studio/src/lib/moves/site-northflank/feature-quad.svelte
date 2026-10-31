<script lang="ts" module>
	import type { Component } from 'svelte';
	export type QuadItem = { icon: Component<{ class?: string }>; title: string; line: string };
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$brand/utils.js';
	import MonoLabel from '$moves/northflank/mono-label.svelte';

	let {
		label,
		title,
		line,
		items,
		layout = 'side',
		children,
		class: className
	}: { label: string; title: string; line?: string; items: QuadItem[]; layout?: 'side' | 'stack'; children?: Snippet; class?: string } = $props();
</script>

<div data-slot="feature-quad" class={cn('grid gap-10', layout === 'side' && 'lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]', className)}>
	<div class={cn(layout === 'side' && 'lg:sticky lg:top-24 lg:self-start')}>
		<MonoLabel text={label} />
		<h2 class="mt-5 max-w-[18ch] text-[clamp(32px,3.8vw,52px)] leading-[1.03] font-medium tracking-[-0.03em] text-foreground">{title}</h2>
		{#if line}<p class="mt-5 max-w-[30rem] text-[18px] leading-[1.5] text-foreground/85">{line}</p>{/if}
	</div>
	<div class="min-w-0">
		{#if children}<div class="mb-4">{@render children()}</div>{/if}
		<ul class={cn('grid gap-3 sm:grid-cols-2', layout === 'stack' && items.length === 3 && 'lg:grid-cols-3', layout === 'stack' && items.length === 4 && 'lg:grid-cols-4')}>
			{#each items as it (it.title)}
				<li class="group/q rounded-xl border bg-card p-5 transition-colors hover:border-orange/50 motion-reduce:transition-none sm:p-6">
					<span class="grid size-9 place-items-center rounded-lg border bg-background text-orange transition-colors group-hover/q:bg-orange group-hover/q:text-(--on-orange) motion-reduce:transition-none"><it.icon class="lucide size-4" /></span>
					<p class="mt-4 text-[17px] font-medium text-foreground">{it.title}</p>
					<p class="mt-1.5 text-[14.5px] leading-[1.55] text-foreground/75">{it.line}</p>
				</li>
			{/each}
		</ul>
	</div>
</div>
