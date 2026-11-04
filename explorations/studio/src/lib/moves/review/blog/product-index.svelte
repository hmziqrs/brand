<script lang="ts">
	import Container from '$brand/blocks/site/container.svelte';
	import PageIntro from '$brand/blocks/site/page-intro.svelte';
	import SearchBox from '$brand/blocks/site/search-box.svelte';
	import TopicChips from '$brand/blocks/site/topic-chips.svelte';
	import PostList from '$brand/blocks/content/post-list.svelte';
	import type { PostItem } from '$brand/blocks/content/types.js';
	import { cn } from '$brand/utils.js';
	import { productCategories, productPosts } from './product-posts';
	import { topicTone } from './posts';

	let { here = '#', class: className }: { here?: string; class?: string } = $props();

	let topic = $state('All');
	let query = $state('');

	const items: (PostItem & { tags: string[] })[] = productPosts.map((p) => ({ title: p.title, summary: p.summary, date: p.date, topic: p.category, href: here, tags: p.tags }));
	const list = $derived(
		items.filter((p) => (topic === 'All' || p.topic === topic) && (!query.trim() || `${p.title} ${p.summary} ${p.tags.join(' ')}`.toLowerCase().includes(query.trim().toLowerCase())))
	);
</script>

<section data-slot="blog-product-index" class={cn('pt-14 pb-28 md:pt-20 md:pb-36', className)}>
	<Container size="wide">
		<PageIntro class="max-w-2xl">
			{#snippet title()}The <span class="whitespace-nowrap">claude-multi</span> blog{/snippet}
			{#snippet lede()}Provider notes, model mappings and setup guides for running Claude Code on any provider.{/snippet}
		</PageIntro>
	</Container>
	<Container size="wide" class="mt-12">
		<div class="mb-7 flex flex-wrap items-center gap-3">
			<SearchBox label="Search posts" value={query} onChange={(v) => (query = v)} class="w-auto min-w-64" />
			<TopicChips items={['All', ...productCategories]} value={topic} onChange={(v) => (topic = v)} tone={(t) => (t === 'All' ? undefined : topicTone(t))} />
		</div>
		<PostList posts={list} tone={topicTone} />
	</Container>
</section>
