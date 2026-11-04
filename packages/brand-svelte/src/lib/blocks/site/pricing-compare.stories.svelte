<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import PricingCompare from './pricing-compare.svelte'
	import Container from './container.svelte'

	const { Story } = defineMeta({ title: 'Site/Pricing/Pricing compare', component: PricingCompare, parameters: { layout: 'fullscreen' } })
</script>

<script lang="ts">
	import { productPricing, studioPricing } from './stories-data-pricing.js'
</script>

<Story name="torii.tools" asChild>
	<Container size="wide" class="py-12"><PricingCompare tiers={productPricing.tiers} compare={productPricing.compare} /></Container>
</Story>

<Story name="Lifetime prices" asChild>
	<Container size="wide" class="py-12"><PricingCompare tiers={productPricing.tiers} compare={productPricing.compare} mode={2} /></Container>
</Story>

<Story name="oxlabs.dev" asChild>
	<Container size="wide" class="py-12"><PricingCompare tiers={studioPricing.tiers} compare={studioPricing.compare} /></Container>
</Story>
