<script lang="ts">
	// The blog index inside a product site: the page intro, search and topic
	// chips, then the posts with the newest featured. The posts are example
	// copy, written in Markdown under src/content/posts.
	import SiteHead from '$brand/blocks/site/site-head.svelte';
	import BlogIndex from '$brand/blocks/content/blog-index.svelte';
	import { topicTone, topics } from '#lib/example.js';

	let { data } = $props();

	const items = $derived(data.posts.map((p) => ({ ...p.metadata, href: p.href })));
</script>

<SiteHead
	site="blog"
	title="Blog — svelte-app"
	description="Example posts, written in Markdown through the kit's blocks."
	url="https://example.com/blog"
/>

<BlogIndex posts={items} {topics} tone={topicTone}>
	{#snippet title()}The <span class="whitespace-nowrap">example</span> blog{/snippet}
	{#snippet lede()}Build notes, deep dives and the occasional rant. New posts whenever there's something worth saying. Example copy.{/snippet}
</BlogIndex>
