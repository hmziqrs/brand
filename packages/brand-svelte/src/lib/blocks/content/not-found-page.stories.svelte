<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import NotFoundPage from './not-found-page.svelte'

	const { Story } = defineMeta({ title: 'Content/Not found page', component: NotFoundPage, parameters: { layout: 'fullscreen' } })
</script>

<script lang="ts">
	import { notFoundData } from './stories-data-pages.js'
</script>

<Story name="claude-multi" asChild>
	<NotFoundPage data={notFoundData} />
</Story>
