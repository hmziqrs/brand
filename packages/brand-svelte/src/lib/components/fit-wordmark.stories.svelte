<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import FitWordmark from './fit-wordmark.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Fit wordmark',
		component: FitWordmark,
		parameters: { layout: 'fullscreen' },
	})
</script>

<Story name="Default" asChild>
	<div class="mx-auto max-w-[82rem] px-6 py-16"><FitWordmark name="example" max={250} /></div>
</Story>
