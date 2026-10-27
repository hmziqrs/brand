<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ButtonLink from '../site/button-link.svelte'
	import OrbitSection from './orbit-section.svelte'

	const { Story } = defineMeta({
		title: 'Sections/Orbit',
		component: OrbitSection,
		parameters: { layout: 'fullscreen' },
	})

	const nodes = [
		{ label: 'Sign-in', detail: 'Passkeys and email', angle: -45, ring: 1 as const },
		{ label: 'Storage', detail: 'Versioned', angle: 15, ring: 2 as const },
		{ label: 'Billing', detail: 'Plans and invoices', angle: 150, ring: 1 as const },
		{ label: 'Team', detail: 'Roles and seats', angle: 80, ring: 2 as const },
		{ label: 'Alerts', detail: 'Email and chat', angle: -120, ring: 3 as const },
	]
</script>

{#snippet architecture()}<ButtonLink href="#" variant="outline" size="lg">Read the architecture</ButtonLink>{/snippet}

<Story name="How it fits together" asChild>
	<OrbitSection
		caption="How it fits together"
		hub="Your app"
		title="Show how the parts reach the centre."
		lede="A diagram drawn on the brand's rings. The nearest ring holds the things every visitor touches; the outer rings hold what runs behind them."
		{nodes}
		actions={architecture}
	/>
</Story>

<Story name="Two rings only" asChild>
	<OrbitSection
		caption="Small system"
		hub="Shop"
		title="Three parts is enough to show."
		lede="Fewer nodes leave the diagram calm. Keep every label to one short line."
		nodes={[
			{ label: 'Catalogue', detail: 'Products and prices', angle: -60, ring: 1 },
			{ label: 'Checkout', detail: 'Cards and wallets', angle: 60, ring: 1 },
			{ label: 'Shipping', detail: 'Carriers and tracking', angle: 180, ring: 1 },
		]}
	/>
</Story>
