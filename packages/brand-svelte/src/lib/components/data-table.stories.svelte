<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import DataTable from './data-table.svelte'

	const providers = [
		['Anthropic', 'Claude Sonnet 4.5', 'Yes'],
		['OpenAI', 'GPT-5.2', 'Yes'],
		['Oxalabs', 'Local models', 'No'],
	]

	const { Story } = defineMeta({ title: 'Custom/Data table', component: DataTable })
</script>

<!-- accent: boxed, with one column in a soft orange wash, for landing pages. -->
<Story name="Accent" asChild>
	<div class="max-w-2xl">
		<DataTable columns={['Provider', 'Model', 'Streaming']} rows={providers} />
	</div>
</Story>

<!-- lines: a strong line under the headings, thin lines between rows, for docs. -->
<Story name="Lines" asChild>
	<div class="max-w-2xl">
		<DataTable columns={['Provider', 'Model', 'Streaming']} rows={providers} variant="lines" />
	</div>
</Story>
