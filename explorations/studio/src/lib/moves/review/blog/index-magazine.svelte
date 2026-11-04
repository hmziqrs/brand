<script lang="ts">
	import Container from '$brand/blocks/site/container.svelte';
	import TopicChips from '$brand/blocks/site/topic-chips.svelte';
	import EmptyNote from '$brand/blocks/site/empty-note.svelte';
	import Tag from '$brand/components/tag.svelte';
	import { cn } from '$brand/utils.js';
	import PostCard from './post-card.svelte';
	import HoverList from './hover-list.svelte';
	import { about, categories, newer, posts, real, scrollToId, shelf, topicTone, updatedOn } from './posts';
	import { display, kicker, sectionTitle } from './ui';

	let { here = '#', class: className }: { here?: string; class?: string } = $props();

	const uid = $props.id();
	let topic = $state('All');

	const list = $derived(topic === 'All' ? newer : posts.filter((p) => p.category === topic));
	const big = $derived(list.slice(0, 2));
	const mid = $derived(list.slice(2, 5));
	const tail = $derived(list.slice(5));

	function shelfPick(t: string) {
		topic = topic === t ? 'All' : t;
		scrollToId(`${uid}-latest`);
	}
</script>

<div data-slot="blog-index-magazine" class={cn('pb-28 md:pb-36', className)}>
	<Container size="wide" class="pt-12 md:pt-16">
		<div class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-border pb-4 text-sm">
			<span class="font-medium text-foreground">The blog</span>
			<span class="text-foreground/75">{posts.length} posts · {categories.length} categories · updated {updatedOn}</span>
		</div>
		<h1 class={cn(display, 'mt-10 text-[clamp(3.25rem,8.6vw,8rem)] leading-[0.94] md:mt-14')}>Notes from building <span class="text-primary">software.</span></h1>
		<p class="mt-8 max-w-[40ch] text-[1.3125rem] leading-[1.45] text-foreground md:mt-12 md:text-[1.625rem]">{about.why}</p>
	</Container>

	<Container size="wide" class="mt-16 md:mt-24">
		<PostCard post={real} href={here} size="xl" layout="split" kicker="Start here" heading="h2" />
	</Container>

	<Container size="wide" class="mt-24 md:mt-32">
		<div id={`${uid}-latest`} class="flex scroll-mt-24 flex-wrap items-end justify-between gap-6 border-b border-border pb-6">
			<h2 class={sectionTitle}>Latest</h2>
			<TopicChips items={['All', ...categories]} value={topic} onChange={(t) => (topic = t)} tone={(t) => topicTone(t)} />
		</div>
		{#if list.length === 0}
			<EmptyNote>No posts in {topic} yet.</EmptyNote>
		{/if}
		{#if big.length}
			<div class="mt-10 grid gap-x-8 gap-y-14 md:mt-12 md:grid-cols-2">
				{#each big as p (p.slug)}<PostCard post={p} href={here} size="lg" />{/each}
			</div>
		{/if}
		{#if mid.length}
			<div class="mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
				{#each mid as p (p.slug)}<PostCard post={p} href={here} />{/each}
			</div>
		{/if}
		{#if tail.length}
			<div class="mt-20 md:mt-24">
				<div class="mb-6 flex items-baseline justify-between gap-4">
					<h2 class="text-[clamp(1.6rem,2.6vw,2.25rem)] font-medium tracking-[-0.03em] text-foreground">Further back</h2>
					<span class="hidden text-sm text-foreground/75 md:inline">Point at a title to see its drawing</span>
				</div>
				<HoverList items={tail} {here} />
			</div>
		{/if}
	</Container>

	<Container size="wide" class="mt-24 md:mt-32">
		<div class="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
			<h2 class={sectionTitle}>Read by category.</h2>
			<p class="max-w-[36ch] text-lg leading-snug text-foreground">Pick one to filter the latest posts. Pick it again to see everything.</p>
		</div>
		<div class="mt-10 grid gap-4 md:grid-cols-3">
			{#each shelf as s (s.category)}
				<button
					type="button"
					aria-pressed={topic === s.category}
					onclick={() => shelfPick(s.category)}
					class="group flex min-h-52 flex-col gap-5 rounded-2xl p-6 text-left ring-1 ring-foreground/10 transition-shadow outline-none hover:ring-primary/50 focus-visible:ring-3 focus-visible:ring-ring/50 aria-pressed:ring-primary/70 motion-reduce:transition-none"
				>
					<span class="flex items-center justify-between gap-3">
						<Tag tone={topicTone(s.category)}>{s.category}</Tag>
						{#if topic === s.category}<span class={kicker}>Showing</span>{/if}
					</span>
					<span class="mt-auto flex items-baseline gap-2.5">
						<span class="text-6xl leading-none font-medium tracking-[-0.05em] text-foreground tabular-nums">{s.count}</span>
						<span class="text-sm text-foreground/75">{s.count === 1 ? 'post' : 'posts'} · {s.minutes} min of reading</span>
					</span>
					<span class="line-clamp-2 min-h-[2.6em] text-[0.9375rem] leading-[1.3] text-foreground/85">Latest: {s.latest?.title}</span>
				</button>
			{/each}
		</div>
	</Container>
</div>
