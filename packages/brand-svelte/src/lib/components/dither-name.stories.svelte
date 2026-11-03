<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import DitherName from './dither-name.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Dither name',
		component: DitherName,
		parameters: { layout: 'fullscreen' },
	})
</script>

<Story name="Drifting" asChild>
	<div class="mx-auto max-w-[82rem] px-6 py-16"><DitherName name="example" animate /></div>
</Story>

<Story name="Still" asChild>
	<div class="mx-auto max-w-[82rem] px-6 py-16"><DitherName name="example" /></div>
</Story>
