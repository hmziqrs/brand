<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import DiagonalHatch from './diagonal-hatch.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Diagonal hatch',
		component: DiagonalHatch,
		parameters: { layout: 'fullscreen' },
	})
</script>

<Story name="Corner" asChild>
	<section data-pointer-host class="relative isolate min-h-[30rem] overflow-hidden">
		<DiagonalHatch class="-z-10" />
		<div class="mx-auto max-w-[82rem] px-6 py-28">
			<h2 class="max-w-[14ch] text-5xl leading-[0.95] font-semibold tracking-[-0.045em]">Lines grow from the <span class="text-primary">corner.</span></h2>
		</div>
	</section>
</Story>

<Story name="Frame" asChild>
	<section data-pointer-host class="relative isolate flex min-h-[30rem] items-center justify-center overflow-hidden px-6 text-center">
		<DiagonalHatch variant="frame" class="-z-10" />
		<h2 class="max-w-[16ch] text-5xl leading-[0.95] font-semibold tracking-[-0.045em]">Two corners, a clear <span class="text-primary">middle.</span></h2>
	</section>
</Story>
