<script lang="ts">
	import SearchBox from '$brand/blocks/site/search-box.svelte';
	import TopicChips from '$brand/blocks/site/topic-chips.svelte';
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import ReadingHeader from '$moves/content/reading-header.svelte';
	import SerifMixHeadline from '$moves/content/serif-mix-headline.svelte';
	import RingFingerprint from '$moves/content/ring-fingerprint.svelte';
	import MaterialSignoff from '$moves/content/material-signoff.svelte';
	import { posts, topics, topicColor, scrollToId, type Topic } from '$moves/content/copy';
	import type { Tone } from '@hmziq/brand-core/tones';

	let topic = $state('All');
	let query = $state('');
	const toneOf: Record<Topic, Tone> = { Process: 'orange', Rust: 'blue', Tools: 'teal', Design: 'purple', Web: 'green' };
	const q = $derived(query.trim().toLowerCase());
	const list = $derived(posts.filter((p) => (topic === 'All' || p.topic === topic) && (!q || `${p.title} ${p.summary}`.toLowerCase().includes(q))));
	const minutes = posts.reduce((n, p) => n + p.minutes, 0);
	const counts = topics.map((t) => [t, posts.filter((p) => p.topic === t).length] as const);
</script>

<svelte:head><title>Index · blog</title></svelte:head>

<div class="min-h-screen bg-background text-foreground">
	<ReadingHeader
		site="blog"
		maker="by hmziq"
		links={[
			{ label: 'Posts', href: '#/p/content/blog-index-1' },
			{ label: 'Index', href: '#/p/content/blog-index-2', current: true },
			{ label: 'About', href: '#/p/content/about-1' }
		]}
	/>

	<section class="mx-auto grid max-w-[82rem] gap-12 px-4 pt-14 pb-14 sm:px-6 md:pt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:items-end lg:gap-16">
		<div>
			<SerifMixHeadline text="Every post, _at a glance._" size="xl" face="fraunces" class="max-w-[11ch]" />
			<p class="mt-8 max-w-[34ch] text-[1.375rem] leading-[1.45]">Each post has a picture drawn from its title. Same title, same rings, every time you visit.</p>
		</div>
		<div>
			<ul aria-label="Posts by fingerprint" class="grid grid-cols-5 gap-2 sm:gap-3">
				{#each posts as p, i (p.slug)}
					<li>
						<button
							type="button"
							onclick={() => scrollToId(`row-${p.slug}`)}
							title={p.title}
							aria-label={`Jump to ${p.title}`}
							class="group relative grid aspect-square w-full place-items-center rounded-xl border bg-card p-2 transition-colors hover:border-foreground/40 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none {i === 0 ? 'border-primary' : ''}"
						>
							<RingFingerprint seed={p.title} color={topicColor[p.topic]} weight={1.5} spin class="size-full" />
							<span class="absolute top-1.5 left-2 font-mono text-[0.625rem] text-muted-foreground">{String(posts.length - i).padStart(2, '0')}</span>
						</button>
					</li>
				{/each}
			</ul>
			<dl class="mt-6 grid grid-cols-3 gap-4 border-t pt-5">
				<div><dt class="text-xs text-muted-foreground">Posts</dt><dd class="mt-1 text-[2rem] leading-none font-medium tracking-[-0.03em]">{posts.length}</dd></div>
				<div><dt class="text-xs text-muted-foreground">Minutes to read all</dt><dd class="mt-1 text-[2rem] leading-none font-medium tracking-[-0.03em]">{minutes}</dd></div>
				<div><dt class="text-xs text-muted-foreground">Topics</dt><dd class="mt-1 text-[2rem] leading-none font-medium tracking-[-0.03em]">{topics.length}</dd></div>
			</dl>
		</div>
	</section>

	<div class="sticky top-14 z-30 border-y bg-background/90 backdrop-blur-md">
		<div class="mx-auto flex max-w-[82rem] flex-col gap-3 px-4 py-3 sm:px-6 md:flex-row md:items-center md:justify-between">
			<SearchBox label="Search posts" bind:value={query} onChange={(v) => (query = v)} class="md:max-w-xs" />
			<TopicChips items={['All', ...topics]} bind:value={topic} onChange={(t) => (topic = t)} tone={(t) => (t === 'All' ? undefined : toneOf[t as Topic])} />
		</div>
	</div>

	<section class="mx-auto max-w-[82rem] px-4 pt-10 sm:px-6">
		<div class="grid gap-8 lg:grid-cols-[12.5rem_minmax(0,1fr)]">
			<div class="lg:sticky lg:top-40 lg:self-start">
				<p class="text-[4.5rem] leading-[0.85] font-medium tracking-[-0.05em] lg:text-[4.75rem]">2026</p>
				<ul class="mt-6 hidden flex-col gap-2 text-sm lg:flex">
					{#each counts as [t, n] (t)}
						<li class="flex items-center justify-between gap-3"><span class="inline-flex items-center gap-2"><i aria-hidden="true" class="inline-block size-2 rounded-full border-[1.75px]" style:border-color={topicColor[t]}></i>{t}</span><span class="tabular-nums text-muted-foreground">{n}</span></li>
					{/each}
				</ul>
			</div>
			<ol class="border-t">
				{#each list as p (p.slug)}
					<li id={`row-${p.slug}`} class="scroll-mt-40">
						<a href="#/p/content/post-1" class="row group relative grid grid-cols-[3.25rem_minmax(0,1fr)] items-center gap-x-4 gap-y-1 border-b py-5 no-underline sm:grid-cols-[4rem_5.5rem_minmax(0,1fr)_7rem_1.5rem] sm:gap-x-6 sm:py-6">
							<span class="row-start-1 row-end-3 sm:row-end-2"><RingFingerprint seed={p.title} color={topicColor[p.topic]} weight={1.3} spin class="size-12 sm:size-14" /></span>
							<span class="order-first col-start-2 text-sm text-muted-foreground tabular-nums sm:order-none sm:col-start-auto">{p.month}</span>
							<span class="col-start-2 min-w-0 sm:col-start-auto">
								<span class="block text-[1.25rem] leading-snug font-medium tracking-[-0.02em] text-foreground sm:text-[1.5rem]">{p.title}</span>
								<span class="mt-1.5 hidden max-w-[60ch] text-[1rem] leading-[1.5] text-foreground/85 md:block">{p.summary}</span>
							</span>
							<span class="col-start-2 flex items-center gap-3 text-sm sm:col-start-auto sm:flex-col sm:items-end sm:gap-1">
								<span class="inline-flex items-center gap-1.5 font-medium" style:color={topicColor[p.topic]}><i aria-hidden="true" class="inline-block size-2 rounded-full border-[1.75px] border-current"></i>{p.topic}</span>
								<span class="text-muted-foreground">{p.readingTime.replace(' read', '')}</span>
							</span>
							<ArrowUpRight class="lucide hidden size-5 text-muted-foreground transition-colors group-hover:text-primary sm:block" />
						</a>
					</li>
				{:else}
					<li class="border-b py-16 text-center text-lg">Nothing matches “{query}”. Try a shorter word, or pick All.</li>
				{/each}
			</ol>
		</div>
	</section>

	<MaterialSignoff site="blog" material={false} />
</div>

<style>
	.row::before {
		content: '';
		position: absolute;
		inset: 0 -1rem;
		z-index: -1;
		border-radius: 0.75rem;
		background: color-mix(in oklab, var(--orange) 14%, transparent);
		clip-path: inset(0 100% 0 0 round 0.75rem);
		transition: clip-path 420ms cubic-bezier(0.2, 0.7, 0.1, 1);
	}
	.row:hover::before,
	.row:focus-visible::before {
		clip-path: inset(0 0 0 0 round 0.75rem);
	}
	.row {
		isolation: isolate;
	}
	@media (prefers-reduced-motion: reduce) {
		.row::before {
			transition: none;
		}
	}
</style>
