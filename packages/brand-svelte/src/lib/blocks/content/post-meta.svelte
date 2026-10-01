<!-- A post's topic tag and its date, on a card or under the post's own title. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import Tag from "$brand/components/tag.svelte";
	import type { TopicTone, PostItem } from "./types.js";

	let { post, tone, class: className }: { post: PostItem; tone?: TopicTone; class?: string } = $props();

	const facts = $derived([post.date, post.readingTime, post.updated && `Updated ${post.updated}`].filter(Boolean).join(" · "));
</script>

<p class={cn("relative flex flex-wrap items-center gap-3 text-[0.8125rem] text-muted-foreground", className)}>
	{#if post.topic}<Tag tone={tone?.(post.topic)}>{post.topic}</Tag>{/if}
	<span>{facts}</span>
</p>
