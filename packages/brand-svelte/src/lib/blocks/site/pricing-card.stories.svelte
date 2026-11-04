<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import PricingCard from './pricing-card.svelte'
	import Segmented from '$brand/components/segmented.svelte'

	const { Story } = defineMeta({ title: 'Site/Pricing/Pricing card', component: PricingCard })
</script>

<script lang="ts">
	import { productPricing } from './stories-data-pricing.js'

	let mode = $state(0)
</script>

<Story name="Default" asChild>
	<div class="flex max-w-[64rem] flex-col gap-6 px-6">
		<Segmented label="Billing" value={String(mode)} onValueChange={(v) => (mode = Number(v))} options={productPricing.billing.options.map((label, i) => ({ value: String(i), label }))} />
		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each productPricing.tiers as tier (tier.name)}<PricingCard {tier} {mode} />{/each}
		</div>
	</div>
</Story>
