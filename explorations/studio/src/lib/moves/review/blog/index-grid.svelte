<script lang="ts">
	import Rss from '@lucide/svelte/icons/rss';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import Container from '$brand/blocks/site/container.svelte';
	import SearchBox from '$brand/blocks/site/search-box.svelte';
	import EmptyNote from '$brand/blocks/site/empty-note.svelte';
	import Segmented from '$brand/components/segmented.svelte';
	import Tag from '$brand/components/tag.svelte';
	import { cn } from '$brand/utils.js';
	import PostCard from './post-card.svelte';
	import { about, categories, posts, releases } from './posts';
	import { display, kicker, sectionTitle } from './ui';

	let { here = '#', class: className }: { here?: string; class?: string } = $props();

	let topic = $state('All');
	let query = $state('');

	const q = $derived(query.trim().toLowerCase());
	const list = $derived(posts.filter((p) => (topic === 'All' || p.category === topic) && (!q || `${p.title} ${p.summary} ${p.tags.join(' ')}`.toLowerCase().includes(q))));
	const filtering = $derived(topic !== 'All' || !!q);
	const options = [{ value: 'All', label: `All ${posts.length}` }, ...categories.map((c) => ({ value: c, label: `${c} ${posts.filter((p) => p.category === c).length}` }))];
</script>

<div data-slot="blog-index-grid" class={cn('pb-28 md:pb-36', className)}>
	<Container size="wide" class="pt-14 md:pt-24">
		<div class="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
			<h1 class={cn(display, 'text-[clamp(4.5rem,13vw,11rem)] leading-[0.82] tracking-[-0.065em]')}>Posts<span class="text-primary">.</span></h1>
			<p class="max-w-[34ch] text-lg leading-snug text-foreground md:pb-3 md:text-xl">{about.years}</p>
		</div>
		<div class="mt-10 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5 md:mt-14">
			<Segmented label="Category" {options} value={topic} onValueChange={(v) => (topic = v)} />
			<div class="flex w-full items-center gap-2 sm:w-auto">
				<SearchBox label="Search posts" value={query} onChange={(v) => (query = v)} class="sm:w-72" />
				<a href={here} aria-label="RSS feed" title="RSS feed" class="grid size-10 shrink-0 place-items-center rounded-md border border-border text-foreground/80 transition-colors hover:text-foreground motion-reduce:transition-none"><Rss class="lucide size-4" /></a>
			</div>
		</div>
	</Container>

	<Container size="wide" class="pt-12">
		{#if list.length}
			<div class="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
				{#each filtering ? list : list.slice(0, 6) as p (p.slug)}<PostCard post={p} href={here} />{/each}
			</div>
		{:else}
			<EmptyNote>Nothing matches “{query.trim() || topic}”. Try another word or category.</EmptyNote>
		{/if}
	</Container>

	{#if !filtering}
		<Container size="wide" class="pt-28 md:pt-36">
			<div class="flex flex-wrap items-end justify-between gap-6">
				<h2 class={sectionTitle}>Changelog</h2>
				<a href={here} class="inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-primary hover:underline">Every release <ArrowRight class="lucide size-4" /></a>
			</div>
			<ol class="mt-10 grid gap-x-6 gap-y-12 md:grid-cols-2">
				{#each releases as r, i (r.v)}
					<li class="flex flex-col gap-3">
						<span class="relative block h-px bg-border" aria-hidden="true">
							{#if i === 0}<span class="absolute inset-y-0 left-0 w-2/5 bg-primary"></span>{/if}
							<i class={cn('absolute -top-[3px] left-0 size-[7px]', i === 0 ? 'bg-primary' : 'bg-foreground/45')}></i>
						</span>
						<p class={cn(kicker, 'mt-3', i > 0 && 'text-foreground/70')}>{r.v} · {r.date}</p>
						<h3 class="text-xl leading-snug font-medium tracking-[-0.015em] text-foreground">{r.title}</h3>
						<ul class="flex flex-col gap-1.5 text-[0.9375rem] leading-snug text-foreground/85">
							{#each r.added.slice(0, 3) as a (a)}<li class="flex gap-3"><i class="mt-[0.5em] size-1.5 shrink-0 bg-foreground/45"></i>{a}</li>{/each}
						</ul>
						<p class="mt-1 flex flex-wrap items-center gap-2">
							<Tag tone="green">{r.added.length} added</Tag>
							{#if r.fixed.length}<Tag tone="yellow">{r.fixed.length} fixed</Tag>{/if}
						</p>
					</li>
				{/each}
			</ol>
		</Container>

		<Container size="wide" class="pt-28 md:pt-36">
			<h2 class={sectionTitle}>Earlier</h2>
			<div class="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
				{#each list.slice(6) as p (p.slug)}<PostCard post={p} href={here} />{/each}
			</div>
		</Container>
	{/if}
</div>
