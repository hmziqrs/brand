<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Byline from './byline.svelte'

	const { Story } = defineMeta({ title: 'Content/Blog/Byline', component: Byline })
</script>

<script lang="ts">
	import { blogAuthor } from './stories-data-blog.js'
</script>

<Story name="Default" asChild>
	<div class="px-6 py-8">
		<Byline name={blogAuthor.name} symbol={blogAuthor.symbol} />
	</div>
</Story>

<Story name="With links" asChild>
	<div class="px-6 py-8">
		<Byline name={blogAuthor.name} symbol={blogAuthor.symbol} links={blogAuthor.links} />
	</div>
</Story>
