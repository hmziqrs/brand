<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import PostCard from './post-card.svelte'

	const { Story } = defineMeta({ title: 'Content/Blog/Post card', component: PostCard })
</script>

<script lang="ts">
	import { posts, topicTone } from './stories-data.js'
</script>

<!-- One post in a list. -->
<Story name="Default" asChild>
	<div class="grid gap-4 px-6 sm:grid-cols-2 lg:grid-cols-3">
		<PostCard post={posts[1]} tone={topicTone} />
	</div>
</Story>

<!-- The newest post: rings in the corner and the larger title. -->
<Story name="Featured" asChild>
	<div class="px-6">
		<PostCard post={posts[0]} featured tone={topicTone} />
	</div>
</Story>
