<script lang="ts">
	import { cn } from '$brand/utils.js';
		import X from '@lucide/svelte/icons/x';
	import SiteCard from './site-card.svelte';
	import { sites } from './site';

	let { q = $bindable(''), class: className }: { q?: string; class?: string } = $props();

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
	let sub = $state<string | null>(null);
	const subOf = (i: number) => i % 4;

	const shown = $derived.by(() => {
		const subs = cats.find(([c]) => c === cat)?.[1] ?? [];
		let list = all.filter((s, i) => (!cat || s.tags?.includes(cat)) && (!sub || subs[subOf(i)] === sub) && (price === 'All' || (price === 'Free') === (s.price === 'Free')) && (!q || `${s.name} ${s.by}`.toLowerCase().includes(q.toLowerCase())));
		if (sort === 'Recent') list = [...list].reverse();
		if (sort === 'Best') list = [...list].sort((a, b) => a.name.localeCompare(b.name));
		return list;
	});
</script>

<div class={cn('min-w-0', className)}>
	<div class="flex flex-wrap gap-2" role="group" aria-label="Category">
		{#each [null, ...cats.map(([c]) => c)] as c (c ?? 'all')}
			<button
				type="button"
				onclick={() => ((cat = c), (sub = null))}
				aria-pressed={cat === c}
				class={cn('inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[0.9375rem] font-medium transition-colors', cat === c ? 'border-transparent bg-primary text-primary-foreground' : 'border-border bg-card text-foreground hover:border-primary')}
			>
				{c ?? 'All'}<span class={cn('font-mono text-[0.6875rem] font-normal', cat === c ? '' : 'text-foreground/60')}>{c ? all.filter((s) => s.tags?.includes(c)).length : all.length}</span>
			</button>
		{/each}
	</div>
	{#if cat}
		<div class="mt-3 flex flex-wrap items-center gap-2 rounded-2xl bg-card p-2" role="group" aria-label="{cat} type">
			<span class="px-2 font-mono text-[0.6875rem] tracking-[0.12em] text-foreground/70 uppercase">{cat}</span>
			{#each cats.find(([c]) => c === cat)?.[1] ?? [] as s (s)}
				<button type="button" onclick={() => (sub = sub === s ? null : s)} aria-pressed={sub === s} class={cn('rounded-full px-3 py-1.5 text-sm transition-colors', sub === s ? 'bg-foreground text-background' : 'bg-background text-foreground hover:bg-muted')}>{s}</button>
			{/each}
			<button type="button" onclick={() => ((cat = null), (sub = null))} class="ml-auto inline-flex items-center gap-1 px-2 text-sm text-foreground/80 hover:text-foreground">Clear<X class="lucide size-3.5" /></button>
		</div>
	{/if}

	<div class="mt-8 flex flex-wrap items-center gap-3 border-t border-border pt-6">
		<p class="mr-auto text-lg"><span class="font-semibold tabular-nums">{shown.length}</span> templates{cat ? ` in ${cat}` : ''}{sub ? ` · ${sub}` : ''}{q ? ` matching “${q}”` : ''}</p>
		<div class="flex rounded-full border border-border bg-card p-1" role="group" aria-label="Sort">
			{#each ['Trending', 'Best', 'Recent'] as s (s)}
				<button type="button" onclick={() => (sort = s)} aria-pressed={sort === s} class="rounded-full px-3.5 py-1.5 text-sm transition-colors" class:bg-foreground={sort === s} class:text-background={sort === s}>{s}</button>
			{/each}
		</div>
		<div class="flex rounded-full border border-border bg-card p-1" role="group" aria-label="Price">
			{#each ['All', 'Free', 'Paid'] as const as p (p)}
				<button type="button" onclick={() => (price = p)} aria-pressed={price === p} class="rounded-full px-3.5 py-1.5 text-sm transition-colors" class:bg-primary={price === p} class:text-primary-foreground={price === p}>{p}</button>
			{/each}
		</div>
	</div>

	{#if shown.length}
		<div class="mt-6 grid gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{#each shown as s (s.name)}<SiteCard site={s} />{/each}
		</div>
	{:else}
		<p class="mt-10 rounded-2xl border border-dashed border-border p-10 text-center text-lg">Nothing matches yet. Try another category, or ask the agent to make one.</p>
	{/if}
</div>
