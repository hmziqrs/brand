<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import MaterialTag from './material-tag.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Material tag',
		component: MaterialTag,
		parameters: { layout: 'centered' },
	})
</script>

<Story name="Default" asChild>
	<div class="flex flex-col gap-4">
		<p class="flex items-center gap-2 font-medium">Team <MaterialTag>Most teams pick this</MaterialTag></p>
		<p class="flex items-center gap-2 font-medium">tunnel <MaterialTag preset="liquid-chrome">New</MaterialTag></p>
		<p class="flex items-center gap-2 font-medium">Shader studio <MaterialTag preset="hammered-copper">Pro</MaterialTag></p>
	</div>
</Story>
