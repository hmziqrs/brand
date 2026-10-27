<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import RingLoader from './ring-loader.svelte'
	import { Button } from '$brand/ui/button/index.js'

	const { Story } = defineMeta({
		title: 'Custom/Ring loader',
		component: RingLoader,
		parameters: { layout: 'centered' },
	})
</script>

<Story name="Default" asChild>
	<RingLoader />
</Story>

<Story name="With label" asChild>
	<RingLoader visible label="Loading your projects" />
</Story>

<Story name="In a button" asChild>
	<div class="flex flex-wrap gap-3">
		<Button aria-busy="true"><RingLoader size={18} tone="current" />Saving</Button>
		<Button variant="outline" aria-busy="true"><RingLoader size={18} tone="current" />Checking</Button>
	</div>
</Story>

<Story name="Sizes" asChild>
	<div class="flex items-center gap-6">
		{#each [16, 24, 40, 64] as size (size)}<RingLoader {size} />{/each}
	</div>
</Story>
