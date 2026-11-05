<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import LegalSection from './legal-section.svelte'

	const { Story } = defineMeta({ title: 'Content/Legal/Section', component: LegalSection })
</script>

<script lang="ts">
	import Prose from '$brand/blocks/site/prose.svelte'
</script>

<Story name="Default" asChild>
	<Prose class="max-w-[46rem] gap-3.5 px-6">
		<LegalSection n={1} title="Data we collect">
			{#snippet children()}
				<p>We collect the email you sign up with and the pages you open on this site. Nothing else is stored, and nothing is sold.</p>
			{/snippet}
		</LegalSection>
	</Prose>
</Story>
