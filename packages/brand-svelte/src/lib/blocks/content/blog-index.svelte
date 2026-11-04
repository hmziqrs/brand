<!-- A blog's index inside a product site, on the wide Container: the page intro, a search box and the
     topic chips in their colors, then the PostList with the newest post featured in its rings. The
     search (titles, summaries and tags) and the topic narrow the posts as you type and pick. -->
<script lang="ts">
	import type { Snippet } from "svelte";
	import { cn } from "$brand/utils.js";
	import Container from "$brand/blocks/site/container.svelte";
	import PageIntro from "$brand/blocks/site/page-intro.svelte";
	import SearchBox from "$brand/blocks/site/search-box.svelte";
	import TopicChips from "$brand/blocks/site/topic-chips.svelte";
	import PostList from "./post-list.svelte";
	import type { PostItem, TopicTone } from "./types.js";

	let {
		/** Every post, newest first. */
		posts,
		/** The blog's topics, in the order the chips show them. */
		topics,
		/** The topic's color, for the chips, the tags and the featured card's rings. */
		tone,
		title,
		lede,
		/** The search box's label and placeholder. */
		search = "Search posts",
		class: className,
	}: { posts: PostItem[]; topics: string[]; tone?: TopicTone; title: Snippet; lede?: Snippet; search?: string; class?: string } = $props();

	let topic = $state("All");
	let query = $state("");

	const list = $derived(
		posts.filter(
			(p) => (topic === "All" || p.topic === topic) && (!query.trim() || `${p.title} ${p.summary ?? ""} ${(p.tags ?? []).join(" ")}`.toLowerCase().includes(query.trim().toLowerCase())),
		),
	);
</script>

<section data-slot="blog-index" class={cn("pt-14 pb-28 md:pt-20 md:pb-36", className)}>
	<Container size="wide">
		<PageIntro class="max-w-2xl" {title} {lede} />
	</Container>
	<Container size="wide" class="mt-12">
		<div class="mb-7 flex flex-wrap items-center gap-3">
			<SearchBox label={search} value={query} onChange={(v) => (query = v)} class="w-auto min-w-64" />
			<TopicChips items={["All", ...topics]} value={topic} onChange={(v) => (topic = v)} tone={(t) => (t === "All" ? undefined : tone?.(t))} />
		</div>
		<PostList posts={list} {tone} />
	</Container>
</section>
