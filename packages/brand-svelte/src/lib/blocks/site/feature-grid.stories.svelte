<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import FeatureGrid from './feature-grid.svelte'

	const { Story } = defineMeta({ title: 'Site/Feature grid', component: FeatureGrid })
</script>

<script lang="ts">
	import Database from '@lucide/svelte/icons/database'
	import Gauge from '@lucide/svelte/icons/gauge'
	import RefreshCw from '@lucide/svelte/icons/refresh-cw'
</script>

{#snippet databaseIcon()}<Database class="lucide" />{/snippet}
{#snippet gaugeIcon()}<Gauge class="lucide" />{/snippet}
{#snippet refreshIcon()}<RefreshCw class="lucide" />{/snippet}

<!-- The quieter layout: no cards, just the grid, for the middle of a page. -->
<Story name="Default" asChild>
	<FeatureGrid
		items={[
			{ title: 'Cached by key', body: 'Ask for the same key twice and the second answer is already there.', icon: databaseIcon },
			{ title: 'Fast where it counts', body: 'Nothing waits on the network twice in one view.', icon: gaugeIcon },
			{ title: 'Refetch on demand', body: 'Invalidate a key and everything reading it asks again.', icon: refreshIcon },
		]}
	/>
</Story>

<!-- Two columns instead of three. -->
<Story name="Two columns" asChild>
	<FeatureGrid columns={2} items={[{ title: 'Cached by key', body: 'Ask for the same key twice and the second answer is already there.', icon: databaseIcon }]} />
</Story>
