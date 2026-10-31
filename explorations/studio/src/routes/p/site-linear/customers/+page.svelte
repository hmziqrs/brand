<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import SiteHeader from '$moves/site-linear/site-header.svelte';
	import SiteFooter from '$moves/site-linear/site-footer.svelte';
	import StoryCard from '$moves/site-linear/story-card.svelte';
	import StatBand from '$moves/site-linear/stat-band.svelte';
	import OxideMarkHeadline from '$moves/bento/oxide-mark-headline.svelte';
	import { stories, moreCustomers, to } from '$moves/site-linear/content';

	const filters = ['Featured', 'SaaS', 'AI', 'Fintech', 'Consumer', 'Hardware', 'Health', 'Enterprise'];
	let filter = $state('Featured');
	const shown = $derived(filter === 'Featured' ? stories : stories.filter((s) => s.sector.includes(filter)));
	const first = $derived(shown.slice(0, 6));
	const rest = $derived(shown.slice(6));
</script>

<svelte:head><title>Plumb · Customers</title></svelte:head>

<div class="min-h-screen overflow-x-clip bg-background text-foreground">
	<SiteHeader current="customers" />

	<section class="mx-auto max-w-[1320px] px-4 pt-20 sm:px-6 md:pt-28">
		<h1 class="text-[clamp(3.5rem,9vw,8.5rem)] leading-[0.9] font-medium tracking-[-0.05em] text-foreground">Customers<span class="text-primary">.</span></h1>
		<p class="mt-6 max-w-[42ch] text-xl leading-snug text-foreground md:text-2xl">How teams plan and ship with Plumb. Every company on this page is an invented example for this study.</p>
		<div class="mt-10 flex flex-wrap gap-2" role="radiogroup" aria-label="Filter by sector">
			{#each filters as f (f)}
				<button type="button" role="radio" aria-checked={filter === f} onclick={() => (filter = f)} class={cn('rounded-full px-4 py-1.5 text-[15px] ring-1 transition-colors motion-reduce:transition-none', filter === f ? 'bg-primary text-primary-foreground ring-primary' : 'text-foreground ring-border hover:ring-foreground/40')}>{f}</button>
			{/each}
		</div>
	</section>

	<section class="mx-auto max-w-[1320px] px-4 pt-12 sm:px-6">
		<div class="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
			{#each first as s (s.company)}<StoryCard story={s} href={to('blog')} />{/each}
		</div>
		{#if filter === 'Featured'}
			<StatBand class="my-20" title="Why teams switch to Plumb" href={to('contact')} stats={[{ value: '2.0', unit: 'x', label: 'More issues filed' }, { value: '3.3', unit: 'x', label: 'Faster issue resolution' }, { value: '50', unit: '%', label: 'Issues written by agents' }]} />
		{/if}
		{#if rest.length}
			<div class={cn('grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3', filter !== 'Featured' && 'mt-14')}>
				{#each rest as s (s.company)}<StoryCard story={s} href={to('blog')} />{/each}
			</div>
		{/if}
		{#if !shown.length}<p class="py-16 text-lg text-foreground">No stories in this sector yet.</p>{/if}
	</section>

	<section class="mx-auto max-w-[1320px] px-4 pt-28 pb-24 sm:px-6 md:pt-40">
		<OxideMarkHeadline as="h2" mark="Running product work for 40,000 organizations." after=" From two-person startups to the largest companies on earth." class="max-w-[28ch] text-[clamp(2rem,4.4vw,3.75rem)] leading-[1.08] font-medium tracking-[-0.035em]" />
		<p class="mt-4 font-mono text-[11px] tracking-wide text-muted-foreground uppercase">Example figure</p>
		<ul class="mt-12 border-t border-border">
			{#each moreCustomers as c (c.company)}
				<li>
					<a href={to('blog')} class="group grid items-center gap-2 border-b border-border py-5 transition-colors hover:bg-primary/[0.06] sm:grid-cols-[200px_minmax(0,1fr)_160px_120px] sm:gap-6 motion-reduce:transition-none">
						<span class="flex items-center gap-2.5 text-lg font-medium text-foreground"><span class="size-2.5 bg-primary"></span>{c.company}</span>
						<span class="text-base text-foreground">{c.line}</span>
						<span class="text-sm text-foreground/80">{c.sector}</span>
						<span class="inline-flex items-center gap-1 text-[15px] font-medium text-primary sm:justify-end">Read story<ArrowUpRight class="lucide size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" /></span>
					</a>
				</li>
			{/each}
		</ul>
		<a href={to('contact')} class="mt-8 inline-flex items-center gap-1.5 font-medium text-primary hover:underline">Switch your team to Plumb <ArrowRight class="lucide size-4" /></a>
	</section>

	<SiteFooter />
</div>
