<script lang="ts">
	// A blog post: the header and contents from its frontmatter, the body from
	// Markdown rendered through core's plugins, the share bar and the
	// newsletter band (the lab's blog post page). The example post uses every
	// row of the Markdown table.
	import SiteHead from '$brand/blocks/site/site-head.svelte';
	import Container from '$brand/blocks/site/container.svelte';
	import Prose from '$brand/blocks/site/prose.svelte';
	import OutlineCard from '$brand/blocks/site/outline-card.svelte';
	import Mark from '$brand/components/mark.svelte';
	import PostHeader from '$brand/blocks/content/post-header.svelte';
	import PostContents from '$brand/blocks/content/post-contents.svelte';
	import PullQuote from '$brand/blocks/content/pull-quote.svelte';
	import ShareBar from '$brand/blocks/content/share-bar.svelte';
	import NewsletterBand from '$brand/blocks/content/newsletter-band.svelte';
	import BlogLayout from '$brand/blocks/content/blog-layout.svelte';
	import ThemeToggle from '$lib/theme-toggle.svelte';
	import { headingsOf } from '$lib/content';
	import { topicTone } from '$lib/example';

	let { data } = $props();

	const { entry } = $derived(data);
	const toc = $derived(headingsOf(entry.body));
	const url = $derived(`https://example.com/blog/${entry.slug}`);

	// Example side projects, for the end notes. Example copy.
	const sideProjects = [
		{ name: 'example-one', symbol: 'Eo', note: 'Example copy: one line on the project.' },
		{ name: 'example-two', symbol: 'Et', note: 'Example copy: one line on the project.' }
	];
</script>

<BlogLayout>
	{#snippet extra()}<ThemeToggle />{/snippet}
	{#snippet children()}
		<SiteHead site="blog" title={`${entry.metadata.title} — svelte-app`} description={entry.metadata.summary ?? 'An example post.'} {url} />

		<PostHeader
			title={entry.metadata.title}
			summary={entry.metadata.summary}
			date={entry.metadata.date}
			readingTime={entry.metadata.readingTime}
			updated={entry.metadata.updated}
			topic={entry.metadata.topic}
			tone={topicTone}
			author={{ name: entry.metadata.author ?? 'hmziq', symbol: 'Hq' }}
			cover={entry.metadata.cover ? { src: entry.metadata.cover, alt: entry.metadata.coverAlt ?? '', lineArt: entry.metadata.lineArt } : undefined}
		/>

		<Container size="narrow" class="pb-16">
			<article>
				<Prose class="text-[1.0625rem] [&_h2]:mt-8 [&_h2]:text-2xl [&_p]:leading-[1.8]">
					{#snippet children()}
						{#if toc.length > 0}
							<PostContents items={toc} />
						{/if}
						<entry.Content />

						<!-- The margin note: a line pulled out of the text, repeating itself
						    on the page, so screen readers skip it. -->
						<p class="relative">
							<PullQuote repeated>Example pull quote: the line the paragraph below repeats, out in the margin.</PullQuote>
							Example copy for the paragraph the margin note sits beside. Replace it with the post's own words.
						</p>
					{/snippet}
				</Prose>

				<div class="grid gap-3">
					{#each sideProjects as p (p.name)}
						<OutlineCard href="#" class="flex-row items-center gap-4 px-4.5 py-4 text-foreground! no-underline!">
							{#snippet children()}
								<Mark symbol={p.symbol} size={40} />
								<span>
									<b class="block font-medium">{p.name}</b>
									<span class="text-sm leading-normal text-muted-foreground">{p.note}</span>
								</span>
							{/snippet}
						</OutlineCard>
					{/each}
				</div>

				<div class="mt-10">
					<ShareBar {url} title={entry.metadata.title} />
				</div>
			</article>
		</Container>

		<NewsletterBand />
	{/snippet}
</BlogLayout>
