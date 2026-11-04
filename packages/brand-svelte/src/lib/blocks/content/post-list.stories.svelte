<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import PostList from './post-list.svelte'

	const { Story } = defineMeta({ title: 'Content/Blog/Post list', component: PostList })
</script>

<script lang="ts">
	import { posts, topicTone } from './stories-data.js'
	import { blogPosts, blogTone } from './stories-data-blog.js'

	const rows = blogPosts.map((p, i) => ({ ...p, number: blogPosts.length - i, updated: undefined }))
</script>

<Story name="Cards" asChild>
	<div class="px-6">
		<PostList posts={posts} tone={topicTone} />
	</div>
</Story>

<Story name="List" asChild>
	<div class="px-6">
		<PostList posts={posts} tone={topicTone} variant="list" />
	</div>
</Story>

<Story name="Archive" asChild>
	<div class="px-6">
		<PostList posts={posts} tone={topicTone} variant="archive" />
	</div>
</Story>

<Story name="Empty" asChild>
	<div class="px-6">
		<PostList posts={[]} tone={topicTone} />
	</div>
</Story>

<Story name="Rows" asChild>
	<div class="mx-auto max-w-[82rem] px-6 py-12">
		<PostList posts={rows} tone={blogTone} variant="rows" />
	</div>
</Story>
