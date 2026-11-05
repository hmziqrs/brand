<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import FaqSection from './faq-section.svelte'
	import Container from './container.svelte'

	const { Story } = defineMeta({ title: 'Site/Pricing/FAQ section', component: FaqSection, parameters: { layout: 'fullscreen' } })
</script>

<script lang="ts">
	import { productPricing } from './stories-data-pricing.js'
</script>

<Story name="Default" asChild>
	<Container size="wide" class="py-12"><FaqSection faq={productPricing.faq} /></Container>
</Story>
