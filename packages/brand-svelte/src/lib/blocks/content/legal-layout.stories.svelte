<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import LegalLayout from './legal-layout.svelte'

	const { Story } = defineMeta({
		title: 'Content/Legal/Layout',
		component: LegalLayout,
		parameters: { layout: 'fullscreen' },
	})
</script>

<script lang="ts">
	import LegalSection from './legal-section.svelte'
	import LegalBlock from './legal-block.svelte'
	import { privacy } from './stories-data.js'
</script>

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
