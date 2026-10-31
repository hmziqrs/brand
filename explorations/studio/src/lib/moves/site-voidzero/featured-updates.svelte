<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { cn } from '$brand/utils.js';
	import { Button } from '$brand/ui/button/index.js';
	import CardCarousel from '$brand/components/card-carousel.svelte';
	import CodeBlock from '$brand/components/code-block.svelte';
	import PostCard from './post-card.svelte';
	import { to, type Post } from './site';

	let {
		posts,
		title = 'Featured posts and updates',
		class: className
	}: {
		posts: Post[];
		title?: string;
		class?: string;
	} = $props();

	const query = `posts
  .filter((p) => p.featured)
  .filter((p) => p.by === 'bloomery')
  .slice(0, ${posts.length})`;
</script>

<div class={cn('featured-updates grid border-y border-border lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]', className)}>
	<div class="flex flex-col">
		<div class="flex flex-col gap-5 p-6 sm:p-10">
			<h2 class="max-w-[14ch] text-4xl leading-[1.04] font-medium tracking-[-0.035em] sm:text-5xl">{title}</h2>
			<div><Button href={to('blog')} variant="outline">Every post<ArrowRight class="lucide" data-icon="inline-end" /></Button></div>
		</div>
		<div class="mt-auto hidden border-t border-border p-4 lg:block">
			<CodeBlock code={query} lang="typescript" copy={false} langChip class="border-0 bg-transparent [&_pre]:bg-transparent" />
		</div>
	</div>
	<div class="min-w-0 overflow-hidden border-t border-border p-6 sm:p-10 lg:border-t-0 lg:border-l">
		<CardCarousel items={posts} label={title} per={{ sm: 1.08, md: 2.1, lg: 2.3 }}>
			{#snippet heading()}<span class="font-mono text-xs text-muted-foreground uppercase">{posts.length} posts · example content</span>{/snippet}
			{#snippet card(p)}<PostCard post={p} />{/snippet}
		</CardCarousel>
	</div>
</div>
