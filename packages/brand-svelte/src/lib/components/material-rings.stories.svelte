<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import MaterialRings from './material-rings.svelte'
	import Rings from './rings.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Material rings',
		component: MaterialRings,
		parameters: { layout: 'centered' },
		args: { seed: 'freeoxide', preset: 'liquid-chrome' },
		argTypes: {
			seed: { description: 'Name the rings are drawn from.' },
			preset: { description: 'Metal the rings are cut from.' },
		},
	})
</script>

<Story name="Chrome" asChild>
	<div class="max-w-lg"><MaterialRings seed="freeoxide" preset="liquid-chrome" /></div>
</Story>

<Story name="Copper" asChild>
	<div class="max-w-lg"><MaterialRings seed="freeoxide" preset="copper-sweep" /></div>
</Story>

<Story name="Next to the line rings" asChild>
	<div class="grid max-w-4xl items-center gap-8 sm:grid-cols-2">
		<Rings seed="freeoxide" />
		<MaterialRings seed="freeoxide" preset="hammered-silver" />
	</div>
</Story>

<Story name="Materials" asChild>
	<div class="grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
		{#each ['liquid-chrome', 'brushed-alloy', 'hammered-silver', 'black-sweep', 'cast-iron', 'scratched-enamel', 'folded-foil', 'mica-flakes', 'etched-silk', 'sediment', 'lava-fissures', 'copper-sweep'] as preset (preset)}
			<figure class="flex flex-col gap-2"><MaterialRings seed="gpui-query" {preset} /><figcaption class="text-xs text-muted-foreground">{preset}</figcaption></figure>
		{/each}
	</div>
</Story>
