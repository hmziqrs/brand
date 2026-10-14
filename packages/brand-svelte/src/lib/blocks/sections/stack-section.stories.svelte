<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ButtonLink from '../site/button-link.svelte'
	import StackSection from './stack-section.svelte'

	const { Story } = defineMeta({
		title: 'Sections/Stack',
		component: StackSection,
		parameters: { layout: 'fullscreen' },
	})

	const layers = [
		{ label: 'Interface', detail: 'Pages, forms and the things people click', share: 1 },
		{ label: 'Your service', detail: 'The rules that decide what happens', share: 0.8 },
		{ label: 'Data', detail: 'Stored records, kept for the length you choose', share: 0.6 },
		{ label: 'Infrastructure', detail: 'Hosting, backups and the network under it', share: 0.4 },
	]
</script>

{#snippet docs()}<ButtonLink href="#" variant="outline" size="lg">Read how the layers connect</ButtonLink>{/snippet}

<!-- A stack of layers, narrowing from the surface down. The orange one is the layer you own. -->
<Story name="Layers" asChild>
	<StackSection
		caption="The layers"
		title="Where your part sits in the stack."
		lede="Each band is one layer. The narrower it is, the further it sits from what people see. Highlight the layer you own so the reader knows where to look."
		{layers}
		yours={1}
		actions={docs}
	/>
</Story>
