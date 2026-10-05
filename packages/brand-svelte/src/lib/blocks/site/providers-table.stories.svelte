<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ProvidersTable from './providers-table.svelte'

	const { Story } = defineMeta({ title: 'Site/Providers table', component: ProvidersTable })
</script>

<script lang="ts">
	import { providers } from '../content/stories-data.js'
</script>

<!-- Every provider claude-multi supports, from the /providers page. -->
<Story name="Default" asChild>
	<div class="max-w-5xl px-6">
		<ProvidersTable {providers} />
	</div>
</Story>
