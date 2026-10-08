<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ButtonLink from './button-link.svelte'
	import CtaBand from './cta-band.svelte'

	const { Story } = defineMeta({ title: 'Site/Sections/CTA band', component: CtaBand, parameters: { layout: 'fullscreen' } })
</script>

<!-- The closing band: full width, in orange, with the band arcs on the right. -->
<Story name="Default" asChild>
	<CtaBand title="One person. All of it.">
		{#snippet body()}The kit, the plans and the sites, free to read and free to use.{/snippet}
		{#snippet actions()}
			<ButtonLink href="#" size="lg" variant="outline">Read BRAND.md</ButtonLink>
		{/snippet}
	</CtaBand>
</Story>

<!-- A smaller title, for a band that isn't the page's last word. -->
<Story name="Compact" asChild>
	<CtaBand title="Get the newsletter" compact>
		{#snippet body()}One email when something ships. No schedule, no filler.{/snippet}
		{#snippet actions()}<ButtonLink href="#" size="lg" variant="outline">Subscribe</ButtonLink>{/snippet}
	</CtaBand>
</Story>
