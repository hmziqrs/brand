<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import DocsReference from './docs-reference.svelte'

	const { Story } = defineMeta({ title: 'Content/Docs/Reference', component: DocsReference, parameters: { layout: 'fullscreen' } })
</script>

<script lang="ts">
	import { claudeMultiDocs, gpuiQueryDocs } from './stories-data-docs.js'
</script>

<Story name="gpui-query" asChild>
	<DocsReference site={gpuiQueryDocs} prefix="gpui-query" />
</Story>

<Story name="claude-multi" asChild>
	<DocsReference site={claudeMultiDocs} prefix="claude-multi" />
</Story>
