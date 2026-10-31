<script lang="ts">
	import Mark from '$brand/components/mark.svelte';
	import Marker from '$brand/components/marker.svelte';
	import ShareBar from '$brand/blocks/content/share-bar.svelte';
	import NewsletterBand from '$brand/blocks/content/newsletter-band.svelte';
	import ReadingHeader from '$moves/content/reading-header.svelte';
	import ReadingProgress from '$moves/content/reading-progress.svelte';
	import SerifMixHeadline from '$moves/content/serif-mix-headline.svelte';
	import OxidePullQuote from '$moves/content/oxide-pull-quote.svelte';
	import CalloutPlate from '$moves/content/callout-plate.svelte';
	import CodeSlab from '$moves/content/code-slab.svelte';
	import MaterialSignoff from '$moves/content/material-signoff.svelte';
	import { body, post, posts, toc, scrollToId } from '$moves/content/copy';

	let article: HTMLElement | undefined = $state();
	let current = $state(toc[0].id);

	$effect(() => {
		const els = toc.map((t) => document.getElementById(t.id)).filter((e): e is HTMLElement => !!e);
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) if (e.isIntersecting) current = e.target.id;
			},
			{ rootMargin: '0px 0px -70% 0px' }
		);
		els.forEach((e) => io.observe(e));
		return () => io.disconnect();
	});
</script>

<svelte:head><title>{post.title} · blog</title></svelte:head>

<ReadingProgress target={article} variant="rail" />

<div class="min-h-screen bg-background text-foreground">
	<ReadingHeader
		site="blog"
		maker="by hmziq"
		links={[
			{ label: 'Posts', href: '#/p/content/blog-index-1', current: true },
			{ label: 'Index', href: '#/p/content/blog-index-2' },
			{ label: 'About', href: '#/p/content/about-1' }
		]}
	/>

	<header class="mx-auto max-w-[82rem] px-4 pt-14 sm:px-6 md:pt-24">
		<div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
			<span class="inline-flex items-center gap-2 font-medium text-primary"><Marker class="size-2.25" />{post.topic}</span>
			<span class="text-muted-foreground">{post.date}</span>
			<span class="text-muted-foreground">{post.readingTime}</span>
		</div>
		<SerifMixHeadline text="Five review rounds _before_ anything ships." size="xl" class="mt-6 max-w-[14ch] md:mt-8" />
		<div class="mt-10 grid gap-8 border-t pt-8 md:mt-14 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
			<p class="max-w-[40ch] text-[1.375rem] leading-[1.45] text-foreground md:text-[1.625rem]">{post.summary}</p>
			<div class="flex items-center gap-3">
				<Mark symbol="Hq" size={40} />
				<div class="leading-tight">
					<p class="font-medium">hmziq</p>
					<p class="text-sm text-muted-foreground">Builds and reviews everything here</p>
				</div>
			</div>
		</div>
	</header>

	<div class="mx-auto mt-16 grid max-w-[82rem] gap-12 px-4 sm:px-6 md:mt-24 lg:grid-cols-[13rem_minmax(0,42rem)] lg:gap-16 xl:grid-cols-[14rem_minmax(0,42rem)_14rem] xl:justify-between">
		<nav aria-label="On this page" class="hidden lg:block">
			<div class="sticky top-24">
				<p class="mb-4 text-xs text-muted-foreground">On this page</p>
				<ol class="flex flex-col border-l">
					{#each toc as t (t.id)}
						<li>
							<button
								type="button"
								onclick={() => scrollToId(t.id)}
								aria-current={current === t.id ? 'true' : undefined}
								class="-ml-px flex w-full items-baseline gap-3 border-l-2 border-transparent py-2 pl-4 text-left text-[0.875rem] text-muted-foreground transition-colors hover:text-foreground aria-[current=true]:border-primary aria-[current=true]:text-foreground"
							>
								<span class="font-serif text-base italic">{t.round ?? '··'}</span>
								<span>{t.label}</span>
							</button>
						</li>
					{/each}
				</ol>
			</div>
		</nav>

		<article bind:this={article} class="min-w-0 text-[1.1875rem] leading-[1.75] text-foreground">
			{#each body as b, i (i)}
				{#if b.kind === 'p'}
					<p class={i === 0 ? 'mb-6 text-[1.3125rem] leading-[1.65] first-letter:float-left first-letter:mt-1.5 first-letter:mr-3 first-letter:font-serif first-letter:text-[5.2rem] first-letter:leading-[0.8] first-letter:text-primary first-letter:italic' : 'mb-6'}>{b.text}</p>
				{:else if b.kind === 'h2'}
					<h2 id={b.id} class="mt-16 mb-6 scroll-mt-24">
						{#if b.round}<span class="mb-2 block font-serif text-[1.375rem] text-primary italic">Round {b.round}</span>{/if}
						<span class="block text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.08] font-medium tracking-[-0.03em] text-balance">{b.text}</span>
					</h2>
				{:else if b.kind === 'quote'}
					<OxidePullQuote seed={b.text} sign="From this post">{b.text}</OxidePullQuote>
				{:else if b.kind === 'callout'}
					<CalloutPlate tone={b.tone} label={b.label}>{b.text}</CalloutPlate>
				{:else if b.kind === 'code'}
					<CodeSlab code={b.code} lang={b.lang} label={b.label} caption={b.caption} breakout />
				{:else if b.kind === 'list'}
					<ul class="mb-8 flex flex-col border-t">
						{#each b.items as it, j (it)}
							<li class="flex items-baseline gap-4 border-b py-3.5">
								<span class="w-6 shrink-0 font-serif text-lg text-primary italic">{j + 1}</span>
								<span>{it}</span>
							</li>
						{/each}
					</ul>
				{/if}
			{/each}

			<div class="mt-14 border-t pt-8">
				<ShareBar url="https://blog.hmziq.rs/five-review-rounds" title={post.title} />
			</div>
		</article>

		<aside aria-label="Next" class="hidden xl:block">
			<div class="sticky top-24 flex flex-col gap-6">
				<a href="#/p/content/post-2" class="group block rounded-2xl border p-5 no-underline">
					<p class="text-xs text-muted-foreground">Next post</p>
					<p class="mt-2 text-[1.125rem] leading-snug font-medium text-foreground group-hover:text-primary">{posts[1].title}</p>
					<p class="mt-3 text-sm text-muted-foreground">{posts[1].readingTime}</p>
				</a>
				<a href="#/p/content/blog-index-1" class="text-sm text-muted-foreground no-underline hover:text-foreground">All posts</a>
			</div>
		</aside>
	</div>

	<div class="mt-24">
		<NewsletterBand title="Get the next post by email" body="One email when something new is published. Nothing else, and you can leave any time." />
	</div>

	<MaterialSignoff site="blog" class="mt-0 border-t-0" />
</div>
