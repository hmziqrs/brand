<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import PostList from './post-list.svelte'

	const { Story } = defineMeta({ title: 'Content/Post list', component: PostList })
</script>

<script lang="ts">
	import { posts, topicTone } from './stories-data.js'
</script>

<!-- A featured card plus cards (the default), with claude-multi's own posts. -->
<Story name="Cards" asChild>
	<div class="px-6">
		<PostList posts={posts} tone={topicTone} />
	</div>
</Story>

<!-- A row per post. -->
<Story name="List" asChild>
	<div class="px-6">
		<PostList posts={posts} tone={topicTone} variant="list" />
	</div>
</Story>

<!-- A compact line per post, for pages with many. -->
<Story name="Archive" asChild>
	<div class="px-6">
		<PostList posts={posts} tone={topicTone} variant="archive" />
	</div>
</Story>

<!-- An empty list draws the empty note. -->
<Story name="Empty" asChild>
	<div class="px-6">
		<PostList posts={[]} tone={topicTone} />
	</div>
</Story>
