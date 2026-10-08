<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Section from './section.svelte'

	const { Story } = defineMeta({ title: 'Site/Sections/Section', component: Section })
</script>

<!-- A section heading: a small orange label, the title and one paragraph. -->
<Story name="Default" parameters={{ layout: 'fullscreen' }} asChild>
	<div class="py-16">
		<Section>
			{#snippet caption()}Install steps · claude-multi{/snippet}
			{#snippet title()}Three steps and you're in{/snippet}
			{#snippet intro()}No accounts, no keys to paste into five files.{/snippet}
			<p class="text-sm text-muted-foreground">The section's body follows at full width.</p>
		</Section>
	</div>
</Story>

<!-- "center" puts the caption, title and intro in the middle. -->
<Story name="Centered" parameters={{ layout: 'fullscreen' }} asChild>
	<div class="py-16">
		<Section align="center">
			{#snippet title()}Everything in one kit{/snippet}
			{#snippet intro()}Colors, type, rings and words, ready to install.{/snippet}
			<p class="text-sm text-muted-foreground">The body follows.</p>
		</Section>
	</div>
</Story>
