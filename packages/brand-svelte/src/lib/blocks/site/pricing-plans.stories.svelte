<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import PricingPlans from './pricing-plans.svelte'

	const plans = [
		{ name: 'Hobby', price: 0, blurb: 'For one project and one person.', features: ['One project', 'Community support'], cta: 'Start free' },
		{ name: 'Pro', price: 12, per: 'per person', yearly: 120, blurb: 'For teams that ship every week.', features: ['Unlimited projects', 'Priority support', 'Audit log'], cta: 'Choose Pro', pick: true },
		{ name: 'Studio', price: 'Talk to us', blurb: 'For shared workspaces and SSO.', features: ['Everything in Pro', 'SSO', 'A named contact'], cta: 'Contact us' },
	]

	const { Story } = defineMeta({ title: 'Site/Pricing plans', component: PricingPlans })
</script>

<!-- Plans in outline cards, with a monthly / yearly switch. -->
<Story name="Default" asChild>
	<PricingPlans {plans} />
</Story>

<!-- Without the switch, for a page that only has one price. -->
<Story name="Without billing" asChild>
	<PricingPlans {plans} billing={false} />
</Story>
