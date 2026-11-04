<script lang="ts">
	// A blog post, in PostArticle's layout: the wide PostHeader with the
	// post's drawing, the contents rail beside the reading column, the share
	// bar, the byline and the related posts as picture cards. PostArticle
	// takes structured sections, so the body here is the Markdown mdsvex
	// compiled, rendered through Prose in the same column.
	import SiteHead from '$brand/blocks/site/site-head.svelte';
	import Container from '$brand/blocks/site/container.svelte';
	import Prose from '$brand/blocks/site/prose.svelte';
	import PictureCard from '$brand/components/picture-card.svelte';
	import Byline from '$brand/blocks/content/byline.svelte';
	import PostContents from '$brand/blocks/content/post-contents.svelte';
	import PostHeader from '$brand/blocks/content/post-header.svelte';
	import PostMeta from '$brand/blocks/content/post-meta.svelte';
	import ShareBar from '$brand/blocks/content/share-bar.svelte';
	import { headingsOf } from '#lib/content.js';
	import { author, site, topicTone } from '#lib/example.js';

	let { data } = $props();

	const { entry } = $derived(data);
	const toc = $derived(headingsOf(entry.body));
	const url = $derived(`${site.url}/blog/${entry.slug}`);
</script>

<SiteHead site="blog" title={`${entry.metadata.title} — svelte-app`} description={entry.metadata.summary ?? 'An example post.'} {url} />

<article class="pb-28 md:pb-36">
	<PostHeader
		layout="wide"
		title={entry.metadata.title}
		summary={entry.metadata.summary}
		date={entry.metadata.date}
		readingTime={entry.metadata.readingTime}
		updated={entry.metadata.updated}
		topic={entry.metadata.topic}
		tone={topicTone}
		author={{ name: entry.metadata.author ?? author.name, symbol: author.symbol }}
		back={{ label: 'All posts', href: '/blog' }}
		art={entry.metadata.art}
		class="pt-10 md:pt-16"
	/>

	<Container size="wide">
		<div class="mt-12 lg:mt-16 lg:grid lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-x-16">
			<aside class="hidden lg:block">
				{#if toc.length > 0}<PostContents items={toc} variant="rail" class="sticky top-24" />{/if}
			</aside>
			<div class="max-w-[40rem] min-w-0">
				<Prose class="text-[1.125rem] [&_h2]:mt-14 [&_h2]:text-[1.75rem] [&_p]:leading-[1.75]">
					{#snippet children()}<entry.Content />{/snippet}
				</Prose>
				<ShareBar {url} title={entry.metadata.title} class="mt-16" />
				<div class="mt-10 border-t border-border pt-8"><Byline name={entry.metadata.author ?? author.name} symbol={author.symbol} links={author.links} /></div>
			</div>
		</div>
	</Container>

	{#if data.related.length}
		<Container size="wide" class="mt-24 md:mt-32">
			<h2 class="text-[clamp(2rem,4vw,3.25rem)] leading-[1] font-medium tracking-[-0.04em] text-foreground">More from the blog</h2>
			<div class="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
				{#each data.related as p (p.slug)}
					<PictureCard title={p.metadata.title} dek={p.metadata.summary} art={p.metadata.art} href={p.href} as="h3">
						{#snippet head()}<PostMeta post={{ ...p.metadata, updated: undefined }} tone={topicTone} />{/snippet}
					</PictureCard>
				{/each}
			</div>
		</Container>
	{/if}
</article>
