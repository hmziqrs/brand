<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import LegalLayout from './legal-layout.svelte'

	const { Story } = defineMeta({
		title: 'Content/Legal layout',
		component: LegalLayout,
		parameters: { layout: 'fullscreen' },
	})
</script>

<script lang="ts">
	import LegalSection from './legal-section.svelte'
	import LegalBlock from './legal-block.svelte'
	import { privacy } from './stories-data.js'
</script>

<!-- A side TOC that follows you down (the default), with claude-multi's own privacy policy. -->
<Story name="Side" asChild>
	<LegalLayout doc={privacy}>
		{#snippet children()}
			{#each privacy.sections as [title, ...blocks], i (title)}
				<LegalSection n={i + 1} {title}>
					{#snippet children()}
						{#each blocks as block, j (j)}
							<LegalBlock {block} />
						{/each}
					{/snippet}
				</LegalSection>
			{/each}
		{/snippet}
	</LegalLayout>
</Story>

<!-- A wrapped row on top. -->
<Story name="Top" asChild>
	<LegalLayout doc={privacy} toc="top">
		{#snippet children()}
			{#each privacy.sections.slice(0, 3) as [title, ...blocks], i (title)}
				<LegalSection n={i + 1} {title}>
					{#snippet children()}
						{#each blocks as block, j (j)}
							<LegalBlock {block} />
						{/each}
					{/snippet}
				</LegalSection>
			{/each}
		{/snippet}
	</LegalLayout>
</Story>
