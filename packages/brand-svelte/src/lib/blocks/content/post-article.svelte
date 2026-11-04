<!-- A post page's article on the wide Container: the wide PostHeader with the post's drawing as its
     cover, then the contents rail, sticky beside the reading column: the intro, a TL;DR box, the
     sections with their paragraphs, lists, code and links out, one line pulled out on an oxide card,
     the share bar and the byline with its links. Related posts close it as picture cards, or as
     ringed text cards when they have no drawing. -->
<script lang="ts">
	import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right";
	import { cn } from "$brand/utils.js";
	import Container from "$brand/blocks/site/container.svelte";
	import SummaryBox from "$brand/blocks/site/summary-box.svelte";
	import CodeBlock from "$brand/components/code-block.svelte";
	import PictureCard from "$brand/components/picture-card.svelte";
	import Byline from "./byline.svelte";
	import PostContents from "./post-contents.svelte";
	import PostHeader from "./post-header.svelte";
	import PostMeta from "./post-meta.svelte";
	import PullQuote from "./pull-quote.svelte";
	import ShareBar from "./share-bar.svelte";
	import type { PostItem, PostSection, TopicTone } from "./types.js";

	let {
		/** The post: its meta, title and summary, its tags and its drawing. */
		post,
		/** The topic's color, looked up from the topic's name. */
		tone,
		/** Who wrote it, and where to find them (X and GitHub show their logos). */
		author,
		/** The link back to the posts. */
		back,
		/** Where a tag links. */
		tagHref,
		/** The first paragraph, before the TL;DR. */
		intro,
		/** The whole post in a few lines, in a box under the intro. */
		tldr,
		sections,
		/** The one line pulled out on an oxide card, after block `after` of the section `section`. */
		quote,
		/** The post's own address, for the share bar. */
		url,
		related = [],
		/** The heading over the related posts. */
		relatedTitle = "More from the blog",
		class: className,
	}: {
		post: PostItem;
		tone?: TopicTone;
		author?: { name: string; symbol: string; links?: { label: string; href: string }[] };
		back?: { label: string; href: string };
		tagHref?: (tag: string) => string;
		intro?: string;
		tldr?: string;
		sections: PostSection[];
		quote?: { text: string; section: string; after: number };
		url: string;
		related?: PostItem[];
		relatedTitle?: string;
		class?: string;
	} = $props();

	const items = $derived(sections.map((s) => ({ id: s.id, label: s.title })));
	const para = "text-[1.125rem] leading-[1.75] text-foreground";
</script>

<article data-slot="post-article" class={cn("pb-28 md:pb-36", className)}>
	<PostHeader
		layout="wide"
		title={post.title}
		summary={post.summary}
		date={post.date}
		readingTime={post.readingTime}
		updated={post.updated}
		topic={post.topic}
		{tone}
		author={author && { name: author.name, symbol: author.symbol }}
		{back}
		tags={post.tags?.map((t) => ({ label: t, href: tagHref?.(t) }))}
		art={post.art}
		class="pt-10 md:pt-16"
	/>

	<Container size="wide">
		<div class={cn("lg:grid lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-x-16", post.art ? "mt-12 lg:mt-16" : "mt-14 border-t border-border pt-12 lg:mt-16 lg:pt-14")}>
			<aside class="hidden lg:block">
				<PostContents {items} variant="rail" class="sticky top-24" />
			</aside>
			<div class="max-w-[40rem] min-w-0">
				{#if intro}<p class={para}>{intro}</p>{/if}
				{#if tldr}<SummaryBox label="TL;DR" class="mt-8 text-[1.0625rem] text-foreground">{tldr}</SummaryBox>{/if}
				{#each sections as s (s.id)}
					<h2 id={s.id} class="mt-14 scroll-mt-28 text-[1.75rem] leading-tight font-medium tracking-[-0.025em] text-balance text-foreground">{s.title}</h2>
					{#each s.blocks as b, i (i)}
						{#if b.kind === "p"}
							<p class={cn(para, "mt-5")}>{b.text}</p>
						{:else if b.kind === "list"}
							<ul class={cn(para, "mt-5 flex flex-col gap-2")}>
								{#each b.items as li (li)}<li class="flex gap-3"><span aria-hidden="true" class="mt-[0.7em] size-1.5 shrink-0 bg-primary"></span>{li}</li>{/each}
							</ul>
						{:else if b.kind === "code"}
							<CodeBlock code={b.text} lang={b.lang ?? "bash"} class="mt-6" />
						{:else}
							<ul class="mt-6 flex flex-col border-t border-border">
								{#each b.items as l (l.label)}
									<li class="border-b border-border">
										<a href={l.href} target="_blank" rel="noopener" class="group flex items-start gap-4 py-4 outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
											<span class="min-w-0 flex-1 text-[1.0625rem] leading-snug">
												<span class="font-medium text-foreground underline decoration-primary/50 underline-offset-4 group-hover:decoration-primary">{l.label}</span>
												<span class="text-foreground/85"> — {l.text}</span>
											</span>
											<ArrowUpRight class="lucide mt-1 size-4 shrink-0 text-primary" />
										</a>
									</li>
								{/each}
							</ul>
						{/if}
						{#if quote && s.id === quote.section && i === quote.after}<PullQuote variant="oxide" repeated class="my-10 lg:-mx-10">{quote.text}</PullQuote>{/if}
					{/each}
				{/each}
				<ShareBar {url} title={post.title} class="mt-16" />
				{#if author}
					<div class="mt-10 border-t border-border pt-8"><Byline name={author.name} symbol={author.symbol} links={author.links} /></div>
				{/if}
			</div>
		</div>
	</Container>

	{#if related.length}
		<Container size="wide" class="mt-24 md:mt-32">
			<h2 class="text-[clamp(2rem,4vw,3.25rem)] leading-[1] font-medium tracking-[-0.04em] text-foreground">{relatedTitle}</h2>
			<div class={cn("mt-10 grid gap-x-6 sm:grid-cols-2 lg:grid-cols-3", related.some((p) => p.art) ? "gap-y-14" : "gap-y-6")}>
				{#each related as p (p.title)}
					<PictureCard title={p.title} dek={p.summary} art={p.art} href={p.href} as="h3">
						{#snippet head()}<PostMeta post={{ ...p, updated: undefined }} {tone} />{/snippet}
					</PictureCard>
				{/each}
			</div>
		</Container>
	{/if}
</article>
