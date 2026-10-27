<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import PostHeader from './post-header.svelte'

	const { Story } = defineMeta({ title: 'Content/Blog/Post header', component: PostHeader })
</script>

<script lang="ts">
	import { post, postTone } from './stories-data.js'
</script>

<Story name="With cover" asChild>
	<div class="py-8">
		<PostHeader
			title={post.title}
			summary={post.summary}
			date={post.date}
			readingTime={post.readingTime}
			updated={post.updated}
			topic={post.topic}
			tone={postTone}
			author={{ name: 'hmziq', symbol: 'Hq' }}
			cover={{ src: '/covers/example.svg', alt: 'Monochrome line art of a person working late at a laptop in a dark, minimal room', lineArt: true }}
		/>
	</div>
</Story>

<Story name="Without cover" asChild>
	<div class="py-8">
		<PostHeader title={post.title} summary={post.summary} date={post.date} readingTime={post.readingTime} updated={post.updated} topic={post.topic} tone={postTone} />
	</div>
</Story>
