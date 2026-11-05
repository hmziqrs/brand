<!--
  The top of a post: its topic, date and reading time, the title, the
  summary and who wrote it — then, when the post has one, its cover image
  across the page's own wide column. Line art drawn for dark pages is
  `lineArt`, so it inverts on light ones. Without a cover the title takes
  the page-intro size, the bigger one a post without art can carry.

  `wide` is the post page's own header on the wide Container, beside the
  column its contents take: a link back, the meta, a display title, the
  summary in the text color, the byline with the post's tags, then the
  post's drawing as the cover, following the cursor across it.
-->
<script lang="ts">
	import ArrowLeft from "@lucide/svelte/icons/arrow-left";
	import type { LineArtKind } from "@hmziq/brand-core/motion/line-art";
	import { cn } from "$brand/utils.js";
	import Container from "$brand/blocks/site/container.svelte";
	import Mark from "$brand/components/mark.svelte";
	import Tag from "$brand/components/tag.svelte";
	import LineArt from "$brand/components/line-art.svelte";
	import Byline from "./byline.svelte";
	import PostMeta from "./post-meta.svelte";
	import type { TopicTone, PostItem } from "./types.js";

	let {
		title,
		summary,
		date,
		readingTime,
		updated,
		topic,
		/** The topic's color, looked up from the topic's name. */
		tone,
		/** Who wrote it: their name and their two-letter mark. */
		author,
		cover,
		/** `narrow` (default) or `wide`, the post page's own header. */
		layout = "narrow",
		/** For `wide`: the link back to the posts. */
		back,
		/** For `wide`: the post's tags, beside the byline. */
		tags,
		/** For `wide`: the post's drawing, as the cover. */
		art,
		class: className,
	}: {
		title: string;
		summary?: string;
		date: string;
		readingTime?: string;
		updated?: string;
		topic?: string;
		tone?: TopicTone;
		author?: { name: string; symbol: string };
		cover?: { src: string; alt: string; /** Line art drawn for dark pages, inverted on light ones. */ lineArt?: boolean };
		layout?: "narrow" | "wide";
		back?: { label: string; href: string };
		tags?: { label: string; href?: string }[];
		art?: LineArtKind;
		class?: string;
	} = $props();

	const meta: PostItem = $derived({ title, date, readingTime, updated, topic });
</script>

{#if layout === "wide"}
	<Container size="wide" class={className}>
		<div class="lg:grid lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-x-16">
			<div class="lg:col-start-2">
				{#if back}<a href={back.href} class="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"><ArrowLeft class="lucide size-4" />{back.label}</a>{/if}
				<PostMeta post={meta} {tone} class="mt-8" />
				<h1 class="mt-5 max-w-[17ch] text-[clamp(2.6rem,5.8vw,5rem)] leading-[1] font-medium tracking-[-0.045em] text-balance text-foreground">{title}</h1>
				{#if summary}<p class="mt-6 max-w-[40ch] text-xl leading-snug text-foreground md:text-2xl">{summary}</p>{/if}
				{#if author || tags?.length}
					<div class="mt-9 flex flex-wrap items-center justify-between gap-x-8 gap-y-5">
						{#if author}<Byline name={author.name} symbol={author.symbol} />{/if}
						{#if tags?.length}
							<p class="flex flex-wrap gap-1.5">
								{#each tags as t (t.label)}<Tag href={t.href}>#{t.label}</Tag>{/each}
							</p>
						{/if}
					</div>
				{/if}
			</div>
		</div>
		{#if art}
			<div class="relative mt-12 aspect-[16/10] overflow-hidden rounded-2xl ring-1 ring-foreground/10 sm:aspect-[2/1] md:mt-16 lg:aspect-[5/2]">
				<LineArt kind={art} fit />
			</div>
		{/if}
	</Container>
{:else}
	<Container size="narrow" class={className}>
		<div class="flex flex-col gap-4">
			<PostMeta post={meta} {tone} />
			<h1 class={cn("text-balance font-medium tracking-[-0.035em]", cover ? "text-[2.2rem] leading-[1.05] sm:text-5xl lg:text-[3.4rem]" : "text-[2.4rem] leading-[1.02] sm:text-5xl lg:text-[3.6rem]")}>{title}</h1>
			{#if summary}<p class="max-w-[34rem] text-lg leading-relaxed text-muted-foreground">{summary}</p>{/if}
			{#if author}
				<p class="mt-1 flex items-center gap-2.5 text-sm text-muted-foreground">
					<Mark symbol={author.symbol} size={28} />
					<span>
						Written by <b class="font-medium text-foreground">{author.name}</b>
					</span>
				</p>
			{/if}
		</div>
	</Container>

	{#if cover}
		<Container>
			<figure class="overflow-hidden rounded-xl border">
				<img src={cover.src} alt={cover.alt} width={1200} height={675} class={cn("block aspect-video h-auto w-full object-cover", cover.lineArt && "invert dark:invert-0")} />
			</figure>
		</Container>
	{/if}
{/if}
