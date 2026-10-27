<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import DataTable from './data-table.svelte'

	const providers = [
		['Anthropic', 'Claude Sonnet 4.5', 'Yes'],
		['OpenAI', 'GPT-5.2', 'Yes'],
		['Oxalabs', 'Local models', 'No'],
	]

	const { Story } = defineMeta({
		title: 'Custom/Data table',
		component: DataTable,
		parameters: { layout: 'centered' },
	})
</script>

<Story name="Accent" asChild>
	<div class="max-w-2xl">
		<DataTable columns={['Provider', 'Model', 'Streaming']} rows={providers} />
	</div>
</Story>

<Story name="Lines" asChild>
	<div class="max-w-2xl">
		<DataTable columns={['Provider', 'Model', 'Streaming']} rows={providers} variant="lines" />
	</div>
</Story>
