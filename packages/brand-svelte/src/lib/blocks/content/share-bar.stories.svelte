<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ShareBar from './share-bar.svelte'

	const { Story } = defineMeta({ title: 'Content/Blog/Share bar', component: ShareBar })
</script>

<script lang="ts">
	import { post } from './stories-data.js'
</script>

<!-- The link bar (the default): the lab's Share section, with the networks as round buttons in the text color. -->
<Story name="Bar" asChild>
	<div class="max-w-[46rem] px-6">
		<ShareBar url={post.url} title={post.title} />
	</div>
</Story>

<!-- Logo tiles with names. -->
<Story name="Tiles" asChild>
	<div class="px-6">
		<ShareBar url={post.url} title={post.title} variant="tiles" />
	</div>
</Story>

<!-- Ring buttons, in the networks' own colors on hover. -->
<Story name="Rings" asChild>
	<div class="px-6">
		<ShareBar url={post.url} title={post.title} variant="rings" hover="brand" />
	</div>
</Story>

<!-- A sentence. -->
<Story name="Sentence" asChild>
	<div class="px-6">
		<ShareBar url={post.url} title={post.title} variant="sentence" />
	</div>
</Story>
