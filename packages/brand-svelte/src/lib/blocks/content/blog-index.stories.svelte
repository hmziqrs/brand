<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import BlogIndex from './blog-index.svelte'

	const { Story } = defineMeta({ title: 'Content/Blog/Blog index', component: BlogIndex, parameters: { layout: 'fullscreen' } })
</script>

<script lang="ts">
	import { blogTone, productPosts, productTopics } from './stories-data-blog.js'
</script>

<Story name="claude-multi" asChild>
	<BlogIndex posts={productPosts} topics={productTopics} tone={blogTone}>
		{#snippet title()}The <span class="whitespace-nowrap">claude-multi</span> blog{/snippet}
		{#snippet lede()}Provider notes, model mappings and setup guides for running Claude Code on any provider.{/snippet}
	</BlogIndex>
</Story>
