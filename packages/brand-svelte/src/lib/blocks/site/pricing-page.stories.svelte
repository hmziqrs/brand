<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import PricingPage from './pricing-page.svelte'

	const { Story } = defineMeta({ title: 'Site/Pricing/Pricing page', component: PricingPage, parameters: { layout: 'fullscreen' } })
</script>

<script lang="ts">
	import { productPricing, studioPricing } from './stories-data-pricing.js'
</script>

<Story name="torii.tools" asChild>
	<PricingPage {...productPricing} class="[--pricing-top:0px]" />
</Story>

<Story name="oxlabs.dev" asChild>
	<PricingPage {...studioPricing} class="[--pricing-top:0px]" />
</Story>
