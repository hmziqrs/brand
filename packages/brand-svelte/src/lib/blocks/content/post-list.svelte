<!--
  A blog's posts (the lab's PostList). `cards` (the default) is the lab's
  blog index: the newest post large with its own rings, the rest as cards
  in a grid. `list` is a row per post, `archive` a compact line per post,
  for pages with many.

  The list holds no state of its own: the page keeps the topic and the
  search and passes the posts that survive them, the way the lab's blog
  index filters in React — an empty list draws the empty note.
-->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import EmptyNote from "$brand/blocks/site/empty-note.svelte";
	import PostCard from "./post-card.svelte";
	import PostMeta from "./post-meta.svelte";
	import type { TopicTone, PostItem } from "./types.js";

	let {
		posts,
		/** `cards` (default), `list` or `archive`. */
		variant = "cards",
		/** The topic's color, for the tags and the featured card's rings. */
		tone,
		/** The empty note's words, when a search or a topic finds nothing. */
		empty = "No posts match that. Try another word or topic.",
		class: className,
	}: { posts: PostItem[]; variant?: "cards" | "list" | "archive"; tone?: TopicTone; empty?: string; class?: string } = $props();

	const searchable = (post: PostItem) => `${post.title} ${post.summary ?? ""}`.toLowerCase();
</script>

{#if posts.length === 0}
	<EmptyNote>{empty}</EmptyNote>
{:else if variant === "cards"}
	<div data-slot="post-list" data-variant={variant} class={cn("flex flex-col", className)}>
		<PostCard post={posts[0]} featured {tone} />
		{#if posts.length > 1}
			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each posts.slice(1) as post (post.title)}
					<PostCard {post} {tone} />
				{/each}
			</div>
		{/if}
	</div>
{:else}
	<div data-slot="post-list" data-variant={variant} class={cn("flex flex-col", className)}>
		<ul class={cn("flex flex-col border-t", variant === "archive" && "text-[0.9375rem]")}>
			{#each posts as post (post.title)}
				{#if variant === "list"}
					<li data-post data-topic={post.topic} data-search={searchable(post)} class="border-b">
						<a href={post.href} class="grid gap-1.5 py-5 no-underline outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-x-6">
							<PostMeta post={post} {tone} />
							<span class="flex min-w-0 flex-col gap-1.5">
								<span class="text-[1.0625rem] leading-snug font-medium">{post.title}</span>
								{#if post.summary}<span class="text-[0.9rem] leading-relaxed text-muted-foreground">{post.summary}</span>{/if}
							</span>
						</a>
					</li>
				{:else}
					<li data-post data-topic={post.topic} data-search={searchable(post)}>
						<a href={post.href} class="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b py-3 no-underline outline-none transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50">
							<span class="min-w-24 text-[0.8125rem] tabular-nums text-muted-foreground">{post.date}</span>
							<span class="font-medium">{post.title}</span>
							{#if post.topic}<span class="ml-auto text-[0.8125rem] text-muted-foreground">{post.topic}</span>{/if}
						</a>
					</li>
				{/if}
			{/each}
		</ul>
	</div>
{/if}
