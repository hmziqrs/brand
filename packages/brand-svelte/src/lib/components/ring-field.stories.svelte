<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import RingField from './ring-field.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Ring field',
		component: RingField,
		parameters: { layout: 'fullscreen' },
	})
</script>

<Story name="Default" asChild>
	<section class="relative isolate flex min-h-[30rem] items-center justify-center overflow-hidden px-6 text-center">
		<RingField class="-z-10" />
		<h2 class="max-w-[16ch] text-5xl leading-[0.95] font-semibold tracking-[-0.045em]">Rings drift against the pointer.</h2>
	</section>
</Story>
