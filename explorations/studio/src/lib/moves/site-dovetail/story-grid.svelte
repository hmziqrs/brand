<script lang="ts">
	import ArrowDownRight from '@lucide/svelte/icons/arrow-down-right';
	import StoryCard from './story-card.svelte';
	import { cn } from '$brand/utils.js';
	import { to } from './site';
	import type { Story } from './stories';

	type Segment = { name: string; industry: string; title: string };

	let {
		stories,
		segments = [],
		industries,
		class: className
	}: {
		stories: Story[];
		segments?: Segment[];
		industries: string[];
		class?: string;
	} = $props();

	let pick = $state('All');
	const s1 = $derived(stories.filter((s) => pick === 'All' || s.industry === pick));
	const s2 = $derived(segments.filter((s) => pick === 'All' || s.industry === pick));
</script>

<div class={cn('mx-auto w-full max-w-[82rem] px-4 sm:px-6', className)}>
	<div class="flex flex-wrap gap-1.5" role="group" aria-label="Filter by industry">
		{#each industries as ind (ind)}
			<button
				type="button"
				aria-pressed={pick === ind}
				onclick={() => (pick = ind)}
				class={cn('rounded-md px-3 py-1.5 text-[0.85rem] transition-colors', pick === ind ? 'bg-foreground text-background' : 'bg-[color-mix(in_oklab,var(--foreground)_8%,transparent)] text-foreground hover:bg-[color-mix(in_oklab,var(--foreground)_14%,transparent)]')}
			>{ind}</button>
		{/each}
	</div>
	<div class="mt-10 grid gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
		{#each s1 as s (s.title)}<StoryCard story={s} />{/each}
		{#each s2 as g (g.title)}
			<a href={to('customers')} class="group block">
				<div class="relative grid aspect-[10/11] place-items-center overflow-hidden rounded-2xl border border-[color-mix(in_oklab,var(--foreground)_12%,transparent)] bg-card p-8 transition-colors group-hover:border-primary">
					<span aria-hidden="true" class="absolute inset-0 opacity-60 [background-image:radial-gradient(color-mix(in_oklab,var(--foreground)_22%,transparent)_1px,transparent_1.5px)] [background-size:14px_14px] [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black_85%)]"></span>
					<span class="absolute top-3 left-3 rounded-md bg-background px-2 py-1 font-mono text-[0.625rem] tracking-[0.12em] text-foreground uppercase">{g.industry}</span>
					<span class="relative text-center text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.02] font-medium tracking-[-0.04em] text-balance text-foreground">{g.name}</span>
					<span class="absolute right-3 bottom-3 size-3 bg-primary transition-transform group-hover:scale-150 motion-reduce:transition-none"></span>
				</div>
				<p class="mt-4 text-[1.05rem] leading-snug text-foreground">{g.title}<ArrowDownRight class="lucide ml-1 inline size-4 align-[-0.15em]" /></p>
			</a>
		{/each}
	</div>
	{#if !s1.length && !s2.length}<p class="py-16 text-[1.1rem] text-foreground">No stories in that industry yet.</p>{/if}
</div>
