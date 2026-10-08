<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import FeatureCards from './feature-cards.svelte'

	const { Story } = defineMeta({ title: 'Site/Cards/Feature cards', component: FeatureCards })
</script>

<script lang="ts">
	import Database from '@lucide/svelte/icons/database'
	import Gauge from '@lucide/svelte/icons/gauge'
	import RefreshCw from '@lucide/svelte/icons/refresh-cw'
</script>

{#snippet databaseIcon()}<Database class="lucide" />{/snippet}
{#snippet gaugeIcon()}<Gauge class="lucide" />{/snippet}
{#snippet refreshIcon()}<RefreshCw class="lucide" />{/snippet}

<!-- Features in outline cards: a thin line, no fill, an icon tile on top. -->
<Story name="Default" asChild>
	<FeatureCards
		items={[
			{ title: 'Cached by key', body: 'Ask for the same key twice and the second answer is already there.', icon: databaseIcon },
			{ title: 'Fast where it counts', body: 'Nothing waits on the network twice in one view.', icon: gaugeIcon },
			{ title: 'Refetch on demand', body: 'Invalidate a key and everything reading it asks again.', icon: refreshIcon },
		]}
	/>
</Story>
