<script lang="ts">
	import PostCover from './post-cover.svelte';
	import { cn } from '$brand/utils.js';
	import { to } from './site';
	import type { Post } from './posts';

	let { post, seed = 1, class: className }: { post: Post; seed?: number; class?: string } = $props();
</script>

<a href={to('post')} class={cn('group block', className)}>
	<PostCover cover={post.cover} {seed} class="ring-1 ring-[color-mix(in_oklab,var(--foreground)_10%,transparent)] transition-[box-shadow] group-hover:ring-primary" />
	<h3 class="mt-5 text-[1.2rem] leading-snug font-medium tracking-[-0.015em] text-foreground group-hover:underline group-hover:underline-offset-4">{post.title}</h3>
	<p class="mt-2 text-[0.95rem] text-foreground/80">{post.date}</p>
	<p class="mt-3 font-mono text-[0.68rem] tracking-[0.1em] text-muted-foreground uppercase">{post.tags.map((t) => `[${t}]`).join(' ')}</p>
</a>
