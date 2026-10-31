<script lang="ts" module>
	export type Post = { title: string; excerpt: string; author: string; date: string; tag?: string; seed: string; cover?: 'material' | 'release'; coverTitle?: string };
</script>

<script lang="ts">
	import MaterialCover from '$moves/content/material-cover.svelte';
	import { cn } from '$brand/utils.js';
	import ReleaseCover from './release-cover.svelte';

	let { post, href, featured = false, class: className }: { post: Post; href: string; featured?: boolean; class?: string } = $props();
	const initials = $derived(post.author.split(' ').map((p) => p[0]).join(''));
</script>

<article data-slot="post-card" class={cn('group/p relative', featured && 'grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-center', className)}>
	<a {href} class="block overflow-hidden rounded-2xl border transition-colors group-hover/p:border-orange/60 motion-reduce:transition-none" aria-label={post.title}>
		{#if post.cover === 'release'}
			<ReleaseCover seed={post.seed} title={post.coverTitle ?? post.title} class="aspect-[16/9] w-full" />
		{:else}
			<div class="relative aspect-[16/9]">
				<MaterialCover seed={post.seed} tilt notch={false} class="absolute inset-0" />
				<div class="absolute bottom-4 left-4 max-w-[70%] rounded-lg bg-background/90 px-3.5 py-2.5 backdrop-blur-sm">
					<p class="text-[clamp(15px,1.6vw,22px)] leading-tight font-medium tracking-[-0.02em] text-foreground">{post.coverTitle ?? post.title}</p>
				</div>
			</div>
		{/if}
	</a>
	<div class={cn(!featured && 'mt-5')}>
		<p class="flex items-center gap-2.5 text-[13px] text-muted-foreground">
			<span class="grid size-7 place-items-center rounded-full bg-foreground font-mono text-[10px] text-background">{initials}</span>
			<span class="text-foreground/85">{post.author}</span>·<span>{post.date}</span>
		</p>
		<h3 class={cn('mt-3 font-medium tracking-[-0.015em] text-foreground', featured ? 'text-[clamp(26px,2.6vw,36px)] leading-[1.1]' : 'text-[19px] leading-snug')}>
			<a {href} class="hover:text-orange">{post.title}</a>
		</h3>
		<p class={cn('mt-2 leading-[1.55] text-foreground/80', featured ? 'text-[17px]' : 'text-[15px]')}>{post.excerpt}</p>
		{#if post.tag}<span class="mt-4 inline-flex rounded-md border px-2 py-0.5 font-mono text-[11px] text-foreground/80">{post.tag}</span>{/if}
	</div>
</article>
