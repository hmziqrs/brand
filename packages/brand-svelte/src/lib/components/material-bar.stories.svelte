<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import MaterialBar from './material-bar.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Material bar',
		component: MaterialBar,
		parameters: { layout: 'centered' },
		args: { label: 'Storage', value: 0.72, preset: 'copper-sweep' },
		argTypes: {
			label: { description: 'Name shown above the bar.' },
			value: { description: 'Fill of the bar, from 0 to 1.' },
			preset: { description: 'Metal the bar is cut from.' },
		},
	})
</script>

<Story name="Usage" asChild>
	<div class="flex max-w-md flex-col gap-5">
		<MaterialBar label="Storage" detail="7.2 of 10 GB" value={0.72} preset="copper-sweep" />
		<MaterialBar label="Build minutes" detail="1,200 of 3,000" value={0.4} preset="brushed-alloy" />
		<MaterialBar label="Bandwidth" detail="18 of 100 GB" value={0.18} preset="hammered-silver" />
	</div>
</Story>
