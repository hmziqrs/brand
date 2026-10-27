<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import BackdropTweaker from './backdrop-tweaker.svelte'

	const { Story } = defineMeta({
		title: 'Tweakers/Backdrops',
		component: BackdropTweaker,
		parameters: { layout: 'fullscreen' },
	})
</script>

<Story name="Page" />
