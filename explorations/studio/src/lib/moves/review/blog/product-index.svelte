<script lang="ts">
	import { flip } from 'svelte/animate';
	import Container from '$brand/blocks/site/container.svelte';
	import Segmented from '$brand/components/segmented.svelte';
	import { cn } from '$brand/utils.js';
	import PostCard from './post-card.svelte';
	import { productCategories, productPosts } from './product-posts';
	import { display, kicker } from './ui';

	let { here = '#', class: className }: { here?: string; class?: string } = $props();

	let topic = $state('All');
	let still = $state(false);

	$effect(() => {
		still = matchMedia('(prefers-reduced-motion: reduce)').matches;
	});

	const options = [{ value: 'All', label: `All ${productPosts.length}` }, ...productCategories.map((c) => ({ value: c, label: `${c} ${productPosts.filter((p) => p.category === c).length}` }))];
	const list = $derived(topic === 'All' ? productPosts : productPosts.filter((p) => p.category === topic));
</script>

<section data-slot="blog-product-index" class={cn('pt-14 pb-28 md:pt-20 md:pb-36', className)}>
	<Container size="wide">
		<p class={kicker}>Blog</p>
		<div class="mt-4 grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-end lg:gap-12">
			<h1 class={cn(display, 'text-[clamp(2.4rem,5vw,4rem)] leading-[1]')}>The claude-multi blog</h1>
			<p class="max-w-[46ch] text-lg leading-snug text-foreground lg:justify-self-end">Provider notes, model mappings and setup guides for running Claude Code on any provider.</p>
		</div>
		<div class="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
			<Segmented label="Category" {options} value={topic} onValueChange={(v) => (topic = v)} />
			<span class="font-mono text-xs text-foreground/70">{list.length} {list.length === 1 ? 'post' : 'posts'}</span>
		</div>
		<div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each list as p (p.slug)}
				<div animate:flip={{ duration: still ? 0 : 300 }} class="flex min-w-0">
					<PostCard post={p} href={here} class="w-full" />
				</div>
			{/each}
		</div>
	</Container>
</section>
