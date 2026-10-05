<!--
  The top of a post: its topic, date and reading time, the title, the
  summary and who wrote it — then, when the post has one, its cover image
  across the page's own wide column. Line art drawn for dark pages is
  `lineArt`, so it inverts on light ones. Without a cover the title takes
  the page-intro size, the bigger one a post without art can carry.
-->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import Container from "$brand/blocks/site/container.svelte";
	import Mark from "$brand/components/mark.svelte";
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
		class?: string;
	} = $props();

	const meta: PostItem = $derived({ title, date, readingTime, updated, topic });
</script>

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
