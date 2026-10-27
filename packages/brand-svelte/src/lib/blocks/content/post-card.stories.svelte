<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import PostCard from './post-card.svelte'

	const { Story } = defineMeta({ title: 'Content/Blog/Post card', component: PostCard })
</script>

<script lang="ts">
	import { posts, topicTone } from './stories-data.js'
</script>

<Story name="Default" asChild>
	<div class="grid gap-4 px-6 sm:grid-cols-2 lg:grid-cols-3">
		<PostCard post={posts[1]} tone={topicTone} />
	</div>
</Story>

<Story name="Featured" asChild>
	<div class="px-6">
		<PostCard post={posts[0]} featured tone={topicTone} />
	</div>
</Story>
