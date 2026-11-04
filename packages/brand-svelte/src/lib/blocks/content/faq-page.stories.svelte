<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import FaqPage from './faq-page.svelte'

	const { Story } = defineMeta({ title: 'Content/FAQ/Page', component: FaqPage, parameters: { layout: 'fullscreen' } })
</script>

<script lang="ts">
	import { faqData } from './stories-data-pages.js'
</script>

<Story name="claude-multi" asChild>
	<FaqPage data={faqData} />
</Story>
