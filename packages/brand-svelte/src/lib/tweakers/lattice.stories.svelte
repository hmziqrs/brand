<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import LatticeTweaker from './lattice-tweaker.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Lattice',
		component: LatticeTweaker,
		parameters: { layout: 'padded' },
	})
</script>

<!--
	Tune the lattice: how many atoms, the room between them, the size of the
	iron and oxygen atoms, the bonds, the fade and the turn. It starts from the
	previous lattice. Your settings are at the bottom, ready to send. The
	tweaker fills the window and scrolls its settings on their own.
-->
<Story name="Tweaker" parameters={{ layout: 'fullscreen' }} asChild>
	<LatticeTweaker />
</Story>
