<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Search from '@lucide/svelte/icons/search';
	import X from '@lucide/svelte/icons/x';
	import SiteCard from './site-card.svelte';
	import { sites } from './site';

	let { class: className }: { class?: string } = $props();

	const cats: [string, string[]][] = [
		['Portfolio', ['Artists', 'Designers', 'Photography', 'Resume']],
		['Software', ['AI', 'Apps', 'Fintech', 'SaaS']],
		['Agency', ['Architecture', 'Design', 'Marketing', 'Web']],
		['Ecommerce', ['Beauty', 'Digital', 'Fashion', 'Furniture']],
		['Services', ['Consulting', 'Education', 'Home', 'Legal']],
		['Health', ['Fitness', 'Medical', 'Therapy', 'Wellness']],
		['Publishing', ['Blogs', 'Magazines', 'News', 'Podcasts']],
		['Real estate', ['Agents', 'Building', 'Listings', 'Rentals']],
		['Hospitality', ['Food', 'Hotels', 'Restaurants', 'Travel']],
		['Events', ['Conferences', 'Music', 'Sports', 'Weddings']]
	];
	const extra = ['Quarry', 'Sable', 'Ledger', 'Wick', 'Arbor', 'Kettle', 'Mosaic', 'Tern', 'Basalt', 'Clove', 'Drift', 'Ember'];
	const all = [...sites, ...sites.map((s, i) => ({ ...s, name: extra[i], by: `${s.by} · alt`, price: i % 3 === 0 ? 'Free' : `$${29 + i * 10}`, preset: ['mineral-fault', 'sediment', 'scratched-enamel', 'mica-flakes', 'pebbled-leather', 'oxide-chalk', 'terrazzo', 'condensation', 'carbon-twill', 'embossed-labyrinth', 'wind-sand', 'oxide-ink'][i] }))];

	let cat = $state<string | null>(null);
	let sort = $state('Trending');
	let price = $state<'All' | 'Free' | 'Paid'>('All');
	let q = $state('');

	const shown = $derived.by(() => {
		let list = all.filter((s) => (!cat || s.tags?.includes(cat)) && (price === 'All' || (price === 'Free') === (s.price === 'Free')) && (!q || `${s.name} ${s.by}`.toLowerCase().includes(q.toLowerCase())));
		if (sort === 'Recent') list = [...list].reverse();
		if (sort === 'Best') list = [...list].sort((a, b) => a.name.localeCompare(b.name));
		return list;
	});
</script>

<div class={cn('min-w-0', className)}>
	<div class="grid grid-cols-2 gap-x-6 gap-y-8 border-y border-border py-10 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-10">
		{#each cats as [c, subs] (c)}
			<div>
				<button type="button" onclick={() => (cat = cat === c ? null : c)} class={cn('text-[0.9375rem] font-medium transition-colors', cat === c ? 'text-primary' : 'hover:text-primary')}>
					{#if cat === c}<span class="mr-1.5 inline-block size-2 bg-primary"></span>{/if}{c}
				</button>
				<ul class="mt-2 space-y-1.5 text-sm text-foreground/60">
					{#each subs as s (s)}<li>{s}</li>{/each}
				</ul>
			</div>
		{/each}
	</div>

	<div class="mt-8 flex flex-wrap items-center gap-3">
		<div class="flex rounded-full border border-border p-1">
			{#each ['Trending', 'Best', 'Recent'] as s (s)}
				<button type="button" onclick={() => (sort = s)} class="rounded-full px-3.5 py-1.5 text-sm transition-colors" class:bg-foreground={sort === s} class:text-background={sort === s}>{s}</button>
			{/each}
		</div>
		{#if cat}<button type="button" onclick={() => (cat = null)} class="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-sm text-primary-foreground">{cat}<X class="lucide size-3.5" /></button>{/if}
		<label class="ml-auto flex min-w-0 flex-1 items-center gap-2 rounded-full border border-border px-4 py-2 sm:max-w-[260px]">
			<Search class="lucide size-4 shrink-0 text-foreground/50" /><span class="sr-only">Search templates</span>
			<input bind:value={q} placeholder="Search templates…" class="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-foreground/45" />
		</label>
		<div class="flex rounded-full border border-border p-1">
			{#each ['All', 'Free', 'Paid'] as const as p (p)}
				<button type="button" onclick={() => (price = p)} class="rounded-full px-3 py-1.5 text-sm transition-colors" class:bg-primary={price === p} class:text-primary-foreground={price === p}>{p}</button>
			{/each}
		</div>
	</div>

	<p class="mt-6 text-sm text-foreground/60">{shown.length} templates{cat ? ` in ${cat}` : ''}</p>
	{#if shown.length}
		<div class="mt-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{#each shown as s (s.name)}<SiteCard site={s} />{/each}
		</div>
	{:else}
		<p class="mt-10 rounded-2xl border border-dashed border-border p-10 text-center text-lg">Nothing matches yet. Try another category, or ask the agent to make one.</p>
	{/if}
</div>
