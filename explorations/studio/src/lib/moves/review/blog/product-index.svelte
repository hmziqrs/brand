<script lang="ts">
	import BlogIndex from '$brand/blocks/content/blog-index.svelte';
	import { item, topicTone } from './posts';
	import { productCategories, productPosts } from './product-posts';

	let { here = '#', class: className }: { here?: string; class?: string } = $props();
</script>

<BlogIndex posts={productPosts.map((p) => item(p, here))} topics={productCategories} tone={topicTone} class={className}>
	{#snippet title()}The <span class="whitespace-nowrap">claude-multi</span> blog{/snippet}
	{#snippet lede()}Provider notes, model mappings and setup guides for running Claude Code on any provider.{/snippet}
</BlogIndex>
