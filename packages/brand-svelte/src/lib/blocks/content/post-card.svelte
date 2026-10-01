<!--
  One post in a list: its topic and date, its title, one line of summary and
  a Read link (the lab's blog index cards). The newest post is `featured`:
  its own rings in its topic's color, and the larger type the lab's blog
  index gives it.
-->
<script lang="ts">
	import ArrowRight from "@lucide/svelte/icons/arrow-right";
	import { cn } from "$brand/utils.js";
	import OutlineCard from "$brand/blocks/site/outline-card.svelte";
	import CornerRings from "$brand/components/corner-rings.svelte";
	import PostMeta from "./post-meta.svelte";
	import type { TopicTone, PostItem } from "./types.js";

	let {
		post,
		/** The newest post: rings in the corner and the larger title. */
		featured = false,
		/** The topic's color, for the tag and the featured card's rings. */
		tone,
		class: className,
	}: { post: PostItem; featured?: boolean; tone?: TopicTone; class?: string } = $props();

	const topicTone = $derived(post.topic !== undefined ? tone?.(post.topic) : undefined);
</script>

<article data-post data-topic={post.topic} class={cn(featured && "mb-6", className)}>
	<OutlineCard href={post.href} class={cn(featured && "p-6 sm:p-10")}>
		{#if featured}<CornerRings seed={post.title} color={topicTone ? `var(--${topicTone})` : undefined} quiet class="w-[38%]" />{/if}
		<PostMeta post={post} {tone} />
		<h2 class={cn("relative", featured ? "max-w-xl text-2xl leading-[1.15] font-medium tracking-[-0.03em] sm:text-[2.1rem]" : "text-lg leading-[1.35] font-medium")}>{post.title}</h2>
		{#if post.summary}
			<p class={cn("relative", featured ? "max-w-[34rem] text-base leading-relaxed text-muted-foreground" : "text-[0.9rem] leading-relaxed text-muted-foreground")}>{post.summary}</p>
		{/if}
		<span class="relative mt-auto inline-flex items-center gap-1.5 pt-2 text-[0.8125rem] font-medium text-primary">
			Read the post
			<ArrowRight class="lucide size-3.75" />
		</span>
	</OutlineCard>
</article>
