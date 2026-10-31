<script lang="ts">
	import Mark from '$brand/components/mark.svelte';
	import Marker from '$brand/components/marker.svelte';
	import Notice from '$brand/components/notice.svelte';
	import CodeBlock from '$brand/components/code-block.svelte';
	import PullQuote from '$brand/blocks/content/pull-quote.svelte';
	import ReadingHeader from '$moves/content/reading-header.svelte';
	import ReadingProgress from '$moves/content/reading-progress.svelte';
	import MaterialCover from '$moves/content/material-cover.svelte';
	import SerifMixHeadline from '$moves/content/serif-mix-headline.svelte';
	import OxideClipWord from '$moves/content/oxide-clip-word.svelte';
	import HangQuote from '$moves/content/hang-quote.svelte';
	import MaterialSignoff from '$moves/content/material-signoff.svelte';
	import { body, post, posts } from '$moves/content/copy';

	let article: HTMLElement | undefined = $state();
	const tones = { tip: 'info', note: 'info', warn: 'warning' } as const;
	const more = posts.slice(1, 4);
</script>

<svelte:head><title>{post.title} · blog</title></svelte:head>

<ReadingProgress target={article} variant="ring" minutes={post.minutes} />

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

	<header class="relative mx-auto max-w-[90rem] px-2 pt-2 sm:px-4 sm:pt-4">
		<div class="relative overflow-hidden rounded-[1.75rem]">
			<MaterialCover seed={post.slug} preset="hammered-copper" rendering="live" loading="eager" sizes="100vw" notch={false} class="h-[56vh] min-h-[22rem] w-full md:h-[78vh] md:min-h-[38rem]" />
			<div class="absolute right-4 bottom-4 hidden items-center gap-2 rounded-full bg-background/90 px-3.5 py-1.5 text-xs text-foreground backdrop-blur md:flex">
				<i aria-hidden="true" class="inline-block size-2 bg-primary"></i>Cover drawn from the post’s name
			</div>
		</div>
		<div class="relative z-10 mx-2 -mt-24 rounded-[1.5rem] bg-background px-4 pt-7 pb-2 sm:mx-6 sm:px-8 md:-mt-64 md:mr-auto md:max-w-[62rem] md:rounded-tr-[2.5rem] md:pt-10 md:pr-12 lg:ml-10">
			<div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
				<span class="inline-flex items-center gap-2 font-medium text-primary"><Marker class="size-2.25" />{post.topic}</span>
				<span class="text-muted-foreground">{post.date} · {post.readingTime}</span>
			</div>
			<SerifMixHeadline text="Five review rounds before anything _ships._" size="lg" face="newsreader" accent class="mt-5 font-newsreader font-[420] tracking-[-0.04em]" />
		</div>
	</header>

	<div class="mx-auto mt-12 grid max-w-[90rem] gap-10 px-4 sm:px-6 md:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,40rem)_minmax(0,1fr)] lg:gap-14">
		<aside class="flex items-center gap-3 lg:col-start-1 lg:flex-col lg:items-end lg:pt-2 lg:text-right">
			<Mark symbol="Hq" size={44} />
			<div class="leading-tight">
				<p class="font-medium">Written by hmziq</p>
				<p class="mt-1 text-sm text-muted-foreground">Read twice before publishing</p>
			</div>
		</aside>

		<article bind:this={article} class="min-w-0 font-newsreader text-[1.3125rem] leading-[1.68] font-[380] text-foreground lg:col-start-2">
			<p class="mb-10 font-sans text-[1.5rem] leading-[1.45] font-normal tracking-[-0.01em] md:text-[1.75rem]">{post.summary}</p>
			<PullQuote variant="tldr" sign="the short version" class="mb-12 font-sans">
				Five reads, five kinds of mistakes. The structure is mine, the second read is cold, the third is a stranger’s, the fourth is split between narrow reviewers, and the fifth is a checklist.
			</PullQuote>

			{#each body as b, i (i)}
				{#if b.kind === 'p'}
					<p class="mb-7">{b.text}</p>
				{:else if b.kind === 'h2'}
					<h2 id={b.id} class="relative mt-20 mb-7 scroll-mt-24 font-sans">
						{#if b.round}
							<span aria-hidden="true" class="mb-3 block text-[5.5rem] leading-[0.8] font-semibold tracking-[-0.06em] lg:absolute lg:top-0 lg:right-[calc(100%+2.5rem)] lg:mb-0 lg:text-[8rem]">
								<OxideClipWord text={b.round} preset="hammered-copper" drift={false} />
							</span>
						{/if}
						<span class="block text-[clamp(1.85rem,3.4vw,2.6rem)] leading-[1.06] font-medium tracking-[-0.03em] text-balance">{b.text}</span>
					</h2>
				{:else if b.kind === 'quote'}
					<HangQuote>{b.text}</HangQuote>
				{:else if b.kind === 'callout'}
					<Notice tone={tones[b.tone]} title={b.label} class="my-9 font-sans text-[1rem] [&_[data-slot=alert-description]]:text-[1.0625rem] [&_[data-slot=alert-description]]:text-foreground">{b.text}</Notice>
				{:else if b.kind === 'code'}
					<div class="my-9 font-sans">
						<CodeBlock code={b.code} lang={b.lang} label={b.label} />
						{#if b.caption}<p class="mt-3 text-[0.875rem] text-muted-foreground">{b.caption}</p>{/if}
					</div>
				{:else if b.kind === 'list'}
					<ul class="mb-8 flex flex-col gap-3">
						{#each b.items as it (it)}
							<li class="flex items-baseline gap-3.5"><Marker class="size-2.5 shrink-0 translate-y-[-0.1em] text-primary" />{it}</li>
						{/each}
					</ul>
				{/if}
			{/each}
			<p class="mt-12 font-serif text-[1.75rem] text-primary italic">— hmziq</p>
		</article>
	</div>

	<section class="mx-auto mt-28 max-w-[90rem] px-4 sm:px-6">
		<div class="flex items-end justify-between gap-6 border-b pb-6">
			<h2 class="text-[clamp(2rem,4vw,3.5rem)] leading-none font-medium tracking-[-0.035em]">Keep <span class="font-newsreader font-[380] italic">reading</span></h2>
			<a href="#/p/content/blog-index-1" class="text-sm text-muted-foreground no-underline hover:text-foreground">All posts</a>
		</div>
		<ul class="mt-8 grid gap-6 md:grid-cols-3">
			{#each more as p, i (p.slug)}
				<li>
					<a href="#/p/content/post-1" class="group block no-underline">
						<MaterialCover seed={p.slug} number={String(i + 2).padStart(2, '0')} sizes="(min-width: 768px) 30vw, 100vw" class="aspect-[4/3] rounded-2xl" />
						<p class="mt-4 text-sm text-muted-foreground">{p.date} · {p.readingTime}</p>
						<p class="mt-1.5 text-[1.375rem] leading-snug font-medium tracking-[-0.02em] text-foreground group-hover:text-primary">{p.title}</p>
					</a>
				</li>
			{/each}
		</ul>
	</section>

	<MaterialSignoff site="blog" preset="hammered-copper" />
</div>
