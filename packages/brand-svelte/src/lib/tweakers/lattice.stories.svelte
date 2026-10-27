<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import LatticeTweaker from './lattice-tweaker.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Lattice',
		component: LatticeTweaker,
		parameters: { layout: 'padded' },
	})
</script>

<Story name="Tweaker" parameters={{ layout: 'fullscreen' }} asChild>
	<LatticeTweaker />
</Story>
