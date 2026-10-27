<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import CommentThread, { type ThreadComment } from './comment-thread.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Comment thread',
		component: CommentThread,
		parameters: { layout: 'padded' },
	})

	const comments: ThreadComment[] = [
		{
			id: '1',
			name: 'Ana Duarte',
			at: '2 days ago',
			body: 'The part about deploying on Cloudflare saved me an afternoon. Did you keep the image pipeline in the build, or move it to a worker?',
			replies: [{ id: '1a', name: 'hmziq', author: true, at: '2 days ago', body: 'In the build. A worker would add a moving part for something that only changes when I write a post.' }],
		},
		{ id: '2', name: 'Kenji Mori', at: 'Yesterday', body: 'Would love the CI section as its own post.' },
	]
</script>

<Story name="Default" asChild>
	<CommentThread {comments} class="max-w-2xl" />
</Story>
