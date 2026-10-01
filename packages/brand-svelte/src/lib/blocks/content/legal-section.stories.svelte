<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import LegalSection from './legal-section.svelte'

	const { Story } = defineMeta({ title: 'Content/Legal section', component: LegalSection })
</script>

<script lang="ts">
	import Prose from '$brand/blocks/site/prose.svelte'
	import LegalBlock from './legal-block.svelte'
	import { privacy } from './stories-data.js'

	const [, ...blocks] = privacy.sections[1]
</script>

<!-- Numbered 01, 02… in orange, with a thin line above it (the lab's legal pages). -->
<Story name="Default" asChild>
	<Prose class="max-w-[46rem] gap-3.5 px-6">
		<LegalSection n={1} title="Data we collect">
			{#snippet children()}
				{#each blocks as block, j (j)}
					<LegalBlock {block} />
				{/each}
			{/snippet}
		</LegalSection>
	</Prose>
</Story>
