<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import PostMeta from './post-meta.svelte'

	const { Story } = defineMeta({ title: 'Content/Blog/Post meta', component: PostMeta })
</script>

<script lang="ts">
	import { posts, topicTone, post } from './stories-data.js'
</script>

<!-- A post's topic tag and its date, on a card. -->
<Story name="On a card" asChild>
	<div class="px-6">
		<PostMeta post={posts[0]} tone={topicTone} />
	</div>
</Story>

<!-- Under the post's own title: date, reading time and the update. -->
<Story name="Under a title" asChild>
	<div class="px-6">
		<PostMeta post={{ title: post.title, date: post.date, readingTime: post.readingTime, updated: post.updated, topic: post.topic }} tone={topicTone} />
	</div>
</Story>
