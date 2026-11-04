<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import LegalPage from './legal-page.svelte'

	const { Story } = defineMeta({ title: 'Content/Legal/Page', component: LegalPage, parameters: { layout: 'fullscreen' } })
</script>

<script lang="ts">
	import { legalDocs } from './stories-data-pages.js'
</script>

<Story name="claude-multi" asChild>
	<LegalPage docs={legalDocs} />
</Story>
