<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ShareBar from './share-bar.svelte'

	const { Story } = defineMeta({ title: 'Content/Blog/Share bar', component: ShareBar })
</script>

<script lang="ts">
	import { post } from './stories-data.js'
</script>

<Story name="Bar" asChild>
	<div class="max-w-[46rem] px-6">
		<ShareBar url={post.url} title={post.title} />
	</div>
</Story>

<Story name="Tiles" asChild>
	<div class="px-6">
		<ShareBar url={post.url} title={post.title} variant="tiles" />
	</div>
</Story>

<Story name="Rings" asChild>
	<div class="px-6">
		<ShareBar url={post.url} title={post.title} variant="rings" hover="brand" />
	</div>
</Story>

<Story name="Sentence" asChild>
	<div class="px-6">
		<ShareBar url={post.url} title={post.title} variant="sentence" />
	</div>
</Story>
