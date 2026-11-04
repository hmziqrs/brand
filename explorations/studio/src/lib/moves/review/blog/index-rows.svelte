<script lang="ts">
	import Container from '$brand/blocks/site/container.svelte';
	import SearchBox from '$brand/blocks/site/search-box.svelte';
	import TopicChips from '$brand/blocks/site/topic-chips.svelte';
	import EmptyNote from '$brand/blocks/site/empty-note.svelte';
	import { cn } from '$brand/utils.js';
	import PostCard from './post-card.svelte';
	import { about, categories, posts, topicTone } from './posts';
	import { display, kicker } from './ui';

	let { here = '#', class: className }: { here?: string; class?: string } = $props();

	let topic = $state('All');
	let query = $state('');

	const q = $derived(query.trim().toLowerCase());
	const list = $derived(posts.filter((p) => (topic === 'All' || p.category === topic) && (!q || `${p.title} ${p.summary} ${p.tags.join(' ')}`.toLowerCase().includes(q))));
	const lead = $derived(list[0]);
	const groups = $derived(
		list.slice(1).reduce<{ month: string; posts: typeof posts }[]>((acc, p) => {
			const last = acc[acc.length - 1];
			if (last?.month === p.month) last.posts.push(p);
			else acc.push({ month: p.month, posts: [p] });
			return acc;
		}, [])
	);
</script>

<div data-slot="blog-index-rows" class={cn('pb-28 md:pb-36', className)}>
	<Container size="wide" class="pt-14 md:pt-20">
		<div class="grid gap-8 border-b border-border pb-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
			<div>
				<p class={kicker}>blog.hmziq.rs · {posts.length} posts since May 2026</p>
				<h1 class={cn(display, 'mt-5 text-[clamp(2.75rem,6.2vw,5.5rem)] leading-[0.98]')}>Everything I’ve written, newest first.</h1>
			</div>
			<div class="flex min-w-0 flex-col gap-6">
				<p class="text-lg leading-snug text-foreground md:text-xl">{about.why}</p>
				<div class="flex flex-col gap-4">
					<TopicChips items={['All', ...categories]} value={topic} onChange={(t) => (topic = t)} tone={(t) => topicTone(t)} />
					<SearchBox label="Search titles and summaries" value={query} onChange={(v) => (query = v)} />
				</div>
			</div>
		</div>
	</Container>

	<Container size="wide">
		{#if lead}
			<div class="border-b border-border py-10 md:py-14">
				<PostCard post={lead} href={here} layout="row" size="xl" kicker="Newest" heading="h2" />
			</div>
		{:else}
			<EmptyNote>Nothing matches “{query.trim() || topic}”. Try another word or category.</EmptyNote>
		{/if}
		{#each groups as g (g.month)}
			<section aria-label={g.month} class="grid border-b border-border lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-x-10">
				<h2 class="pt-8 font-mono text-[11px] tracking-[0.14em] text-foreground/75 uppercase lg:sticky lg:top-24 lg:self-start lg:pt-11 lg:pb-10">{g.month}</h2>
				<ul>
					{#each g.posts as p (p.slug)}
						<li class="border-t border-border py-8 first:border-t-0 lg:py-10"><PostCard post={p} href={here} layout="row" /></li>
					{/each}
				</ul>
			</section>
		{/each}
	</Container>
</div>
