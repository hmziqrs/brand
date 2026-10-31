<script lang="ts">
	import { cn } from '$brand/utils.js';
	import MaterialCover from '$moves/content/material-cover.svelte';
	import { cover, posts, postHref, to, type Post } from './site';

	let {
		items = posts.slice(0, 4),
		title = 'Read more',
		class: className
	}: {
		items?: Post[];
		title?: string;
		class?: string;
	} = $props();
</script>

<section class={cn('mx-auto max-w-[1320px] px-4 sm:px-8', className)}>
	<div class="mb-6 flex items-baseline justify-between gap-4 border-t border-border pt-8">
		<h2 class="text-2xl font-medium tracking-[-0.02em] text-foreground">{title}</h2>
		<a href={to('blog')} class="text-[15px] text-foreground hover:text-primary">See all</a>
	</div>
	<div class="grid gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
		{#each items as p (p.title)}
			<a href={postHref(p)} class="group">
				<div class="relative aspect-[16/10] overflow-hidden rounded-xl border border-border">
					<MaterialCover seed={p.title} preset={cover(p)} tilt notch={false} sizes="(min-width: 1024px) 25vw, 50vw" class="!absolute inset-0" />
				</div>
				<p class="mt-3 text-[16px] leading-snug font-medium text-foreground group-hover:text-primary">{p.title}</p>
				<p class="mt-1 text-[13px] text-muted-foreground">{p.date} · {p.cat}</p>
			</a>
		{/each}
	</div>
</section>
