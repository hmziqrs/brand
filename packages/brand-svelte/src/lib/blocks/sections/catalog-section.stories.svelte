<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import type { Tone } from '@hmziq/brand-core/tones'
	import CatalogSection from './catalog-section.svelte'
	import { providers } from './stories-data-features.js'

	const { Story } = defineMeta({
		title: 'Sections/Catalog section',
		component: CatalogSection,
		parameters: { layout: 'fullscreen' },
	})

	const tags: { label: string; tone?: Tone }[] = [{ label: 'claude-multi', tone: 'orange' }, { label: '8 templates' }, { label: 'One instance per key' }]
</script>

<Story name="Providers" asChild>
	<CatalogSection
		title="Pick your provider"
		accent="provider"
		{tags}
		lede="Every template maps a provider's models into Claude Code's Opus and fast slots. Bring a key, get an instance. Click a provider, then find it in the switcher below."
		items={providers}
		picked="ds"
	/>
</Story>
