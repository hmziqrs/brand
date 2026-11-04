<script lang="ts">
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import Container from '$brand/blocks/site/container.svelte';
	import SummaryBox from '$brand/blocks/site/summary-box.svelte';
	import PostMeta from '$brand/blocks/content/post-meta.svelte';
	import ShareBar from '$brand/blocks/content/share-bar.svelte';
	import Tag from '$brand/components/tag.svelte';
	import { cn } from '$brand/utils.js';
	import BlogArt from './blog-art.svelte';
	import Byline from './byline.svelte';
	import EndLinks from './end-links.svelte';
	import OxideQuote from './oxide-quote.svelte';
	import PostCard from './post-card.svelte';
	import PostToc from './post-toc.svelte';
	import CodeBlock from '$brand/components/code-block.svelte';
	import { item, mainContent, topicTone, type PostContent } from './posts';
	import { display, heading, para, sectionTitle } from './ui';

	let { content = mainContent, here = '#', class: className }: { content?: PostContent; here?: string; class?: string } = $props();

	const uid = $props.id();
	const post = $derived(content.post);
	const items = $derived(content.sections.map((s) => ({ id: `${uid}-${s.id}`, label: s.title })));

	let px = $state(0.5);
	let py = $state(0.5);
	let on = $state(false);
	let still = $state(false);

	$effect(() => {
		still = matchMedia('(prefers-reduced-motion: reduce)').matches;
	});

	function move(e: PointerEvent) {
		const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
		const side = (r.width - r.height * 1.6) / 2;
		px = Math.max(0, Math.min(1, (e.clientX - r.left - side) / (r.width - side * 2)));
		py = Math.max(0, Math.min(1, (e.clientY - r.top) / r.height));
		on = true;
	}
</script>

<article data-slot="blog-post-clean" class={cn('pb-28 md:pb-36', className)}>
	<Container size="wide" class="pt-10 md:pt-16">
		<div class="lg:grid lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-x-16">
			<div class="lg:col-start-2">
				<a href={here} class="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"><ArrowLeft class="lucide size-4" />{content.back}</a>
				<PostMeta post={item(post, true)} tone={topicTone} class="mt-8" />
				<h1 class={cn(display, 'mt-5 max-w-[17ch] text-[clamp(2.6rem,5.8vw,5rem)] leading-[1]')}>{post.title}</h1>
				<p class="mt-6 max-w-[40ch] text-xl leading-snug text-foreground md:text-2xl">{post.summary}</p>
				<div class="mt-9 flex flex-wrap items-center justify-between gap-x-8 gap-y-5">
					<Byline />
					<p class="flex flex-wrap gap-1.5">
						{#each post.tags as t (t)}<Tag href={here}>#{t}</Tag>{/each}
					</p>
				</div>
			</div>
		</div>

		{#if post.art}
		<div role="presentation" class="relative mt-12 aspect-[16/10] overflow-hidden rounded-2xl ring-1 ring-foreground/10 sm:aspect-[2/1] md:mt-16 lg:aspect-[5/2]" onpointermove={move} onpointerleave={() => (on = false)}>
			<BlogArt kind={post.art} x={px} y={py} {on} {still} />
		</div>
		{/if}

		<div class={cn('lg:grid lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-x-16', post.art ? 'mt-12 lg:mt-16' : 'mt-14 border-t border-border pt-12 lg:mt-16 lg:pt-14')}>
			<aside class="hidden lg:block">
				<PostToc {items} {here} class="sticky top-24" />
			</aside>
			<div class="max-w-[40rem] min-w-0">
				<p class={para}>{content.intro}</p>
				{#if content.tldr}<SummaryBox label="TL;DR" class="mt-8 text-[1.0625rem] text-foreground">{content.tldr}</SummaryBox>{/if}
				{#each content.sections as s (s.id)}
					<h2 id={`${uid}-${s.id}`} class={cn(heading, 'mt-14')}>{s.title}</h2>
					{#each s.blocks as b, i (i)}
						{#if b.kind === 'p'}
							<p class={cn(para, 'mt-5')}>{b.text}</p>
						{:else if b.kind === 'list'}
							<ul class={cn(para, 'mt-5 flex flex-col gap-2')}>
								{#each b.items as li (li)}<li class="flex gap-3"><span aria-hidden="true" class="mt-[0.7em] size-1.5 shrink-0 bg-primary"></span>{li}</li>{/each}
							</ul>
						{:else if b.kind === 'code'}
							<CodeBlock code={b.text} lang="bash" class="mt-6" />
						{:else}
							<EndLinks items={b.items} class="mt-6" />
						{/if}
						{#if content.quote && s.id === content.quote.section && i === content.quote.after}<OxideQuote text={content.quote.text} class="my-10 lg:-mx-10" />{/if}
					{/each}
				{/each}
				<ShareBar url={content.url} title={post.title} class="mt-16" />
				<div class="mt-10 border-t border-border pt-8"><Byline links /></div>
			</div>
		</div>
	</Container>

	<Container size="wide" class="mt-24 md:mt-32">
		<h2 class={sectionTitle}>{content.relatedTitle}</h2>
		<div class={cn('mt-10 grid gap-x-6 sm:grid-cols-2 lg:grid-cols-3', content.related.some((p) => p.art) ? 'gap-y-14' : 'gap-y-6')}>
			{#each content.related as p (p.slug)}<PostCard post={p} href={here} />{/each}
		</div>
	</Container>
</article>
