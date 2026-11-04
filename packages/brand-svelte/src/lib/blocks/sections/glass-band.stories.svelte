<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ArrowRight from '@lucide/svelte/icons/arrow-right'
	import GlassBand from './glass-band.svelte'
	import { Button } from '$brand/ui/button/index.js'
	import { glassPoints } from './stories-data-features.js'

	const { Story } = defineMeta({
		title: 'Sections/Glass band',
		component: GlassBand,
		parameters: { layout: 'fullscreen' },
	})
</script>

<Story name="Etched silk" asChild>
	<GlassBand
		preset="etched-silk"
		kicker="Working from day one"
		title="Small team, no hand-offs."
		lede="The people on the first call write the code, and you can reach them the whole way through."
		points={glassPoints}
	>
		{#snippet actions()}<Button href="#" size="lg">Book a call<ArrowRight class="lucide" data-icon="inline-end" /></Button>{/snippet}
	</GlassBand>
</Story>
