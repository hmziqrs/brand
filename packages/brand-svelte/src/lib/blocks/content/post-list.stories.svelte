<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import PostList from './post-list.svelte'

	const { Story } = defineMeta({ title: 'Content/Blog/Post list', component: PostList })
</script>

<script lang="ts">
	import { posts, topicTone } from './stories-data.js'
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
