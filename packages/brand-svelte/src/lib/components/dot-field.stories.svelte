<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import DotField from './dot-field.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Dot field',
		component: DotField,
		parameters: { layout: 'fullscreen' },
	})
</script>

<Story name="Default" asChild>
	<div class="relative isolate flex h-[28rem] items-center justify-center overflow-hidden">
		<DotField />
		<p class="text-center text-5xl font-semibold tracking-[-0.04em]">Priced in writing, before any code.</p>
	</div>
</Story>
