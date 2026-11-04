<!-- A blog's front page, magazine style, on the wide Container: a line of facts, a display title and
     why the blog exists, the post to start with beside its drawing, then the latest posts as picture
     cards at two sizes with topic chips that filter them, the ones further back as numbered rows that
     float their drawings, and the topics as cards that filter too. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import { reducedMotion } from "@hmziq/brand-core/motion/canvas";
	import Container from "$brand/blocks/site/container.svelte";
	import EmptyNote from "$brand/blocks/site/empty-note.svelte";
	import TopicChips from "$brand/blocks/site/topic-chips.svelte";
	import PictureCard from "$brand/components/picture-card.svelte";
	import PostList from "./post-list.svelte";
	import PostMeta from "./post-meta.svelte";
	import TopicCards from "./topic-cards.svelte";
	import type { PostItem, TopicShelf, TopicTone } from "./types.js";

	let {
		/** Every post, newest first. */
		posts,
		/** The title of the post to start with: it leads the page and leaves the latest. */
		lead,
		/** The blog's topics, in the order the chips and cards show them. */
		topics,
		/** The topic's color, for the tags, chips and cards. */
		tone,
		title,
		/** The part of the title in oxide; it must appear in the title. */
		accent,
		/** Why the blog exists, under the title. */
		lede,
		class: className,
	}: { posts: PostItem[]; lead?: string; topics: string[]; tone?: TopicTone; title: string; accent?: string; lede?: string; class?: string } = $props();

	const uid = $props.id();
	let topic = $state("All");

	const start = $derived(posts.find((p) => p.title === lead));
	const list = $derived(topic === "All" ? posts.filter((p) => p !== start) : posts.filter((p) => p.topic === topic));
	const big = $derived(list.slice(0, 2));
	const mid = $derived(list.slice(2, 5));
	const tail = $derived(list.slice(5).map((p) => ({ ...p, updated: undefined, number: p.number ?? posts.length - posts.indexOf(p) })));
	const shelf: TopicShelf[] = $derived(
		topics.map((t) => {
			const mine = posts.filter((p) => p.topic === t);
			return { topic: t, count: mine.length, minutes: mine.reduce((sum, p) => sum + (p.minutes ?? 0), 0), latest: mine[0]?.title };
		}),
	);
	const parts = $derived.by(() => {
		const at = accent ? title.indexOf(accent) : -1;
		if (!accent || at < 0) return { lead: title, hit: "", tail: "" };
		return { lead: title.slice(0, at), hit: accent, tail: title.slice(at + accent.length) };
	});

	const sectionTitle = "text-[clamp(2rem,4vw,3.25rem)] leading-[1] font-medium tracking-[-0.04em] text-foreground";

	function pick(t: string) {
		topic = topic === t ? "All" : t;
		document.getElementById(`${uid}-latest`)?.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });
	}
</script>

{#snippet card(p: PostItem, size: "md" | "lg")}
	<PictureCard title={p.title} dek={p.summary} art={p.art} href={p.href} as="h3" {size}>
		{#snippet head()}<PostMeta post={{ ...p, updated: undefined }} {tone} />{/snippet}
	</PictureCard>
{/snippet}

<div data-slot="magazine-index" class={cn("pb-28 md:pb-36", className)}>
	<Container size="wide" class="pt-12 md:pt-16">
		<div class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-border pb-4 text-sm">
			<span class="font-medium text-foreground">The blog</span>
			<span class="text-foreground/75">{posts.length} posts · {topics.length} categories · updated {posts[0]?.date}</span>
		</div>
		<h1 class="mt-10 text-[clamp(3.25rem,8.6vw,8rem)] leading-[0.94] font-medium tracking-[-0.045em] text-balance text-foreground md:mt-14">{parts.lead}{#if parts.hit}<span class="text-primary">{parts.hit}</span>{/if}{parts.tail}</h1>
		{#if lede}<p class="mt-8 max-w-[40ch] text-[1.3125rem] leading-[1.45] text-foreground md:mt-12 md:text-[1.625rem]">{lede}</p>{/if}
	</Container>

	{#if start}
		<Container size="wide" class="mt-16 md:mt-24">
			<PictureCard title={start.title} dek={start.summary} art={start.art} href={start.href} as="h2" size="xl" layout="split" more="Read the post">
				{#snippet head()}<span class="font-mono text-[11px] tracking-[0.14em] text-primary uppercase">Start here</span><PostMeta post={start} {tone} />{/snippet}
			</PictureCard>
		</Container>
	{/if}

	<Container size="wide" class="mt-24 md:mt-32">
		<div id={`${uid}-latest`} class="flex scroll-mt-24 flex-wrap items-end justify-between gap-6 border-b border-border pb-6">
			<h2 class={sectionTitle}>Latest</h2>
			<TopicChips items={["All", ...topics]} value={topic} onChange={(t) => (topic = t)} tone={(t) => tone?.(t)} />
		</div>
		{#if list.length === 0}
			<EmptyNote>No posts in {topic} yet.</EmptyNote>
		{/if}
		{#if big.length}
			<div class="mt-10 grid gap-x-8 gap-y-14 md:mt-12 md:grid-cols-2">
				{#each big as p (p.title)}{@render card(p, "lg")}{/each}
			</div>
		{/if}
		{#if mid.length}
			<div class="mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
				{#each mid as p (p.title)}{@render card(p, "md")}{/each}
			</div>
		{/if}
		{#if tail.length}
			<div class="mt-20 md:mt-24">
				<div class="mb-6 flex items-baseline justify-between gap-4">
					<h2 class="text-[clamp(1.6rem,2.6vw,2.25rem)] font-medium tracking-[-0.03em] text-foreground">Further back</h2>
					<span class="hidden text-sm text-foreground/75 md:inline">Point at a title to see its drawing</span>
				</div>
				<PostList posts={tail} variant="rows" {tone} />
			</div>
		{/if}
	</Container>

	<Container size="wide" class="mt-24 md:mt-32">
		<div class="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
			<h2 class={sectionTitle}>Read by category.</h2>
			<p class="max-w-[36ch] text-lg leading-snug text-foreground">Pick one to filter the latest posts. Pick it again to see everything.</p>
		</div>
		<TopicCards items={shelf} value={topic} onChange={pick} {tone} class="mt-10" />
	</Container>
</div>
