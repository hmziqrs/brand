<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ShaderStudio from './shader-studio.svelte'

	const { Story } = defineMeta({
		title: 'Tweakers/Shader studio',
		component: ShaderStudio,
		parameters: { layout: 'fullscreen' },
	})
</script>

<Story name="Page" />
