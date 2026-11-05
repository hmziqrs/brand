<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import PixelName from './pixel-name.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Pixel name',
		component: PixelName,
		parameters: { layout: 'fullscreen' },
	})
</script>

<Story name="Dots" asChild>
	<div data-pointer-host class="mx-auto max-w-[82rem] px-6 py-16">
		<PixelName text="example" look="dots" pitch={9} min={5} cols={140} reach={130} class="aspect-[5.4/1]" />
	</div>
</Story>

<Story name="Glyphs" asChild>
	<div data-pointer-host class="mx-auto max-w-[82rem] px-6 py-16">
		<PixelName text="example" look="glyphs" pitch={14} min={6} cols={90} reach={120} class="aspect-[2.4/1] sm:aspect-[3.6/1]" />
	</div>
</Story>
