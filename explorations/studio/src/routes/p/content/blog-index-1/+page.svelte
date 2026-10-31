<script lang="ts">
	import Marker from '$brand/components/marker.svelte';
	import TopicChips from '$brand/blocks/site/topic-chips.svelte';
	import NewsletterBand from '$brand/blocks/content/newsletter-band.svelte';
	import { Button } from '$brand/ui/button/index.js';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import ReadingHeader from '$moves/content/reading-header.svelte';
	import SerifMixHeadline from '$moves/content/serif-mix-headline.svelte';
	import OxideClipWord from '$moves/content/oxide-clip-word.svelte';
	import MaterialCover from '$moves/content/material-cover.svelte';
	import MaterialSignoff from '$moves/content/material-signoff.svelte';
	import { posts, topics, topicColor, type Topic } from '$moves/content/copy';
	import type { Tone } from '@hmziq/brand-core/tones';

	let topic = $state('All');
	const toneOf: Record<Topic, Tone> = { Process: 'orange', Rust: 'blue', Tools: 'teal', Design: 'purple', Web: 'green' };
	const numbered = posts.map((p, i) => ({ ...p, n: String(posts.length - i).padStart(2, '0') }));
	const featured = numbered[0];
	const rest = $derived(numbered.slice(1).filter((p) => topic === 'All' || p.topic === topic));
	const big = $derived(rest.slice(0, 2));
	const mid = $derived(rest.slice(2, 5));
	const tail = $derived(rest.slice(5));
</script>

<svelte:head><title>blog · hmziq</title></svelte:head>

<div class="min-h-screen bg-background text-foreground">
	<ReadingHeader
		site="blog"
		maker="by hmziq"
		links={[
			{ label: 'Posts', href: '#/p/content/blog-index-1', current: true },
			{ label: 'Changelog', href: '#/p/content/changelog-1' },
			{ label: 'Docs', href: '#/p/content/docs-1' }
		]}
	/>

	<section class="mx-auto max-w-[82rem] px-4 pt-14 sm:px-6 md:pt-20">
		<div class="flex flex-wrap items-baseline justify-between gap-4 border-b pb-4 text-sm">
			<span class="font-medium">The blog</span>
			<span class="text-muted-foreground">{posts.length} posts · written by hmziq</span>
		</div>
		<SerifMixHeadline text="Notes from building [*]" size="xxl" class="mt-10 md:mt-14">
			{#snippet object()}<OxideClipWord text="software." class="font-serif text-[1.12em] leading-[0.8] font-normal tracking-[-0.01em] italic" />{/snippet}
		</SerifMixHeadline>
		<div class="mt-10 grid gap-8 md:mt-14 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
			<p class="max-w-[36ch] text-[1.375rem] leading-[1.45] md:text-[1.625rem]">How the hmziq tools get made: the process, the Rust, the design, and the mistakes worth writing down.</p>
			<TopicChips items={['All', ...topics]} bind:value={topic} onChange={(t) => (topic = t)} tone={(t) => (t === 'All' ? undefined : toneOf[t as Topic])} />
		</div>
	</section>

	<section class="mx-auto mt-14 max-w-[82rem] px-4 sm:px-6 md:mt-20">
		<a href="#/p/content/post-1" class="group grid overflow-hidden rounded-[1.75rem] border bg-card no-underline lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
			<MaterialCover seed={featured.slug} preset="copper-sweep" number={featured.n} sizes="(min-width: 1024px) 60vw, 100vw" class="aspect-[4/3] w-full lg:aspect-auto lg:min-h-[34rem]" />
			<div class="flex flex-col p-6 sm:p-10">
				<p class="flex items-center gap-3 text-sm">
					<span class="inline-flex items-center gap-2 font-medium" style:color={topicColor[featured.topic]}><Marker class="size-2.25" />{featured.topic}</span>
					<span class="text-muted-foreground">Latest · {featured.date}</span>
				</p>
				<h2 class="mt-6 text-[clamp(2.2rem,4vw,3.6rem)] leading-[1] font-medium tracking-[-0.04em] text-balance text-foreground group-hover:text-primary">{featured.title}</h2>
				<p class="mt-6 text-[1.1875rem] leading-[1.55] text-foreground">{featured.summary}</p>
				<div class="mt-auto flex items-center justify-between gap-4 pt-10">
					<span class="text-sm text-muted-foreground">{featured.readingTime}</span>
					<Button size="lg" class="pointer-events-none">Read the post <ArrowRight class="lucide" /></Button>
				</div>
			</div>
		</a>
	</section>

	<section class="mx-auto mt-16 max-w-[82rem] px-4 sm:px-6 md:mt-24">
		{#if rest.length === 0}
			<p class="border-y py-16 text-center text-lg">No other posts in {topic} yet.</p>
		{/if}
		<div class="grid gap-x-8 gap-y-14 md:grid-cols-2">
			{#each big as p (p.slug)}
				<a href="#/p/content/post-1" class="group block no-underline">
					<MaterialCover seed={p.slug} number={p.n} sizes="(min-width: 768px) 50vw, 100vw" class="aspect-[16/10] rounded-2xl" />
					<p class="mt-5 flex items-center gap-3 text-sm">
						<span class="inline-flex items-center gap-2 font-medium" style:color={topicColor[p.topic]}><Marker class="size-2.25" />{p.topic}</span>
						<span class="text-muted-foreground">{p.date} · {p.readingTime}</span>
					</p>
					<h3 class="mt-3 text-[clamp(1.75rem,2.6vw,2.4rem)] leading-[1.05] font-medium tracking-[-0.035em] text-balance text-foreground group-hover:text-primary">{p.title}</h3>
					<p class="mt-3 max-w-[52ch] text-[1.0625rem] leading-[1.55] text-foreground">{p.summary}</p>
				</a>
			{/each}
		</div>
		{#if mid.length}
			<div class="mt-16 grid gap-x-6 gap-y-12 border-t pt-12 sm:grid-cols-2 lg:grid-cols-3">
				{#each mid as p (p.slug)}
					<a href="#/p/content/post-1" class="group block no-underline">
						<MaterialCover seed={p.slug} number={p.n} sizes="(min-width: 1024px) 33vw, 50vw" class="aspect-[4/3] rounded-2xl" />
						<p class="mt-4 flex items-center gap-3 text-sm">
							<span class="inline-flex items-center gap-2 font-medium" style:color={topicColor[p.topic]}><Marker class="size-2" />{p.topic}</span>
							<span class="text-muted-foreground">{p.date}</span>
						</p>
						<h3 class="mt-2.5 text-[1.5rem] leading-[1.12] font-medium tracking-[-0.025em] text-balance text-foreground group-hover:text-primary">{p.title}</h3>
					</a>
				{/each}
			</div>
		{/if}
		{#if tail.length}
			<div class="mt-16">
				<h2 class="mb-4 text-[clamp(1.8rem,3vw,2.6rem)] font-medium tracking-[-0.03em]">Further <span class="font-serif font-normal italic">back</span></h2>
				<ul class="border-t">
					{#each tail as p (p.slug)}
						<li>
							<a href="#/p/content/post-1" class="group grid grid-cols-[3rem_minmax(0,1fr)] items-baseline gap-4 border-b py-5 no-underline sm:grid-cols-[4rem_minmax(0,1fr)_9rem]">
								<span class="font-serif text-[1.75rem] leading-none text-primary italic">{p.n}</span>
								<span class="text-[1.25rem] leading-snug font-medium tracking-[-0.02em] text-foreground group-hover:text-primary sm:text-[1.5rem]">{p.title}</span>
								<span class="col-start-2 text-sm text-muted-foreground sm:col-start-3 sm:text-right">{p.date}</span>
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	</section>

	<div class="mt-28">
		<NewsletterBand title="Get the next post by email" body="One email when something new is published. Nothing else, and you can leave any time." />
	</div>
	<MaterialSignoff site="blog" class="mt-0 border-t-0" />
</div>
