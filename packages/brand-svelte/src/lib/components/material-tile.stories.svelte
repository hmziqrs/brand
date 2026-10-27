<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Database from '@lucide/svelte/icons/database'
	import RefreshCw from '@lucide/svelte/icons/refresh-cw'
	import ShieldCheck from '@lucide/svelte/icons/shield-check'
	import MaterialTile from './material-tile.svelte'
	import { brandMaterials } from '@hmziq/brand-core/shaders/materials'

	const { Story } = defineMeta({
		title: 'Custom/Material tile',
		component: MaterialTile,
		parameters: { layout: 'centered' },
		args: { preset: 'copper-sweep' },
		argTypes: {
			preset: { description: 'Metal in the frame.' },
		},
	})
</script>

<Story name="With icons" asChild>
	<ul class="flex max-w-md flex-col gap-5">
		{#each [
			{ preset: 'hammered-copper', title: 'Cached by key', body: 'Ask for the same key twice and the second answer is already there.', icon: Database },
			{ preset: 'brushed-alloy', title: 'Refetch on demand', body: 'Invalidate a key and everything reading it asks again.', icon: RefreshCw },
			{ preset: 'etched-silk', title: 'Retries built in', body: 'A dropped connection tries again before anyone sees an error.', icon: ShieldCheck },
		] as f (f.title)}
			<li class="flex gap-4">
				<MaterialTile preset={f.preset}><f.icon class="lucide" /></MaterialTile>
				<div class="flex flex-col gap-1"><span class="font-medium">{f.title}</span><span class="text-sm text-muted-foreground">{f.body}</span></div>
			</li>
		{/each}
	</ul>
</Story>

<Story name="Letters" asChild>
	<div class="flex flex-wrap items-center gap-4">
		<MaterialTile preset="copper-sweep" size={56}>Ft</MaterialTile>
		<MaterialTile preset="liquid-chrome" size={56}>Ow</MaterialTile>
		<MaterialTile preset="mineral-fault" size={56} shape="circle">Gq</MaterialTile>
		<MaterialTile preset="black-ice" size={56} shape="circle">Gs</MaterialTile>
	</div>
</Story>

<Story name="Swatches" asChild>
	<ul class="grid max-w-3xl grid-cols-4 gap-x-4 gap-y-5 sm:grid-cols-8">
		{#each brandMaterials as preset (preset)}
			<li class="flex flex-col items-center gap-2 text-center text-[0.6875rem] text-muted-foreground"><MaterialTile {preset} size={48} shape="circle" />{preset}</li>
		{/each}
	</ul>
</Story>
