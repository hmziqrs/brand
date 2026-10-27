<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import MaterialTextTweaker from './material-text-tweaker.svelte'

	const { Story } = defineMeta({
		title: 'Tweakers/Material text',
		component: MaterialTextTweaker,
		parameters: { layout: 'fullscreen' },
	})
</script>

<Story name="Page" />
