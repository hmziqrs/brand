<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import VoxelField from './voxel-field.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Voxel field',
		component: VoxelField,
		parameters: { layout: 'fullscreen' },
	})
</script>

<Story name="Quiet" asChild>
	<section data-pointer-host class="relative isolate min-h-[26rem] overflow-hidden">
		<VoxelField size={22} reach={150} lift={72} quiet class="-z-10" />
	</section>
</Story>

<Story name="Edged" asChild>
	<section data-pointer-host class="relative isolate min-h-[26rem] overflow-hidden">
		<VoxelField class="-z-10" />
	</section>
</Story>
