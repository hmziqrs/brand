<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import CatalogCard from './catalog-card.svelte'
	import { providers } from '$brand/blocks/sections/stories-data-features.js'

	const { Story } = defineMeta({
		title: 'Custom/Catalog card',
		component: CatalogCard,
		parameters: { layout: 'fullscreen' },
	})
</script>

<script>
	let picked = $state('ds')
</script>

<Story name="Default and picked" asChild>
	<div class="mx-auto grid max-w-[82rem] gap-3 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
		{#each providers.slice(0, 4) as item (item.id)}
			<CatalogCard {item} picked={picked === item.id} onpick={(id) => (picked = id)} />
		{/each}
	</div>
</Story>
