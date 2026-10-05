<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Rings from '$brand/components/rings.svelte'
	import ButtonLink from './button-link.svelte'
	import Hero from './hero.svelte'
	import HeroNote from './hero-note.svelte'

	const { Story } = defineMeta({ title: 'Site/Hero', component: Hero })
</script>

<!-- The words, the buttons and their notes, with the rings beside them. -->
<Story name="With rings" parameters={{ layout: 'fullscreen' }} asChild>
	<div class="py-16">
		<Hero>
			{#snippet title()}Free Rust tools, finished before they ship.{/snippet}
			{#snippet lede()}Open-source software made by one person. I build the tools I wish existed, test them properly, and give them away.{/snippet}
			{#snippet actions()}
				<ButtonLink href="#" size="lg" class="px-5">Browse the projects</ButtonLink>
				<ButtonLink href="#" size="lg" variant="outline" class="px-5">View on GitHub</ButtonLink>
			{/snippet}
			{#snippet note()}<HeroNote>Free and open source. MIT or Apache-2.0.</HeroNote>{/snippet}
			{#snippet aside()}
				<!-- Rings are the words' neighbour, never a stacked block: below md
					there is no room beside the words, so they sit out entirely. -->
				<div class="hidden md:block">
					<Rings seed="freeoxide" />
				</div>
			{/snippet}
		</Hero>
	</div>
</Story>

<!-- "wide" gives a product beside the words more room than the words. -->
<Story name="Wide aside" parameters={{ layout: 'fullscreen' }} asChild>
	<div class="py-16">
		<Hero asideSize="wide">
			{#snippet title()}Claude Code, any provider.{/snippet}
			{#snippet lede()}One settings file, every model you have an API key for.{/snippet}
			{#snippet actions()}<ButtonLink href="#" size="lg">Get started</ButtonLink>{/snippet}
			{#snippet aside()}
				<div class="rounded-xl border p-6 text-sm text-muted-foreground">The terminal window goes here.</div>
			{/snippet}
		</Hero>
	</div>
</Story>

<!-- A small grey word above the title, and something under the hero at full width. -->
<Story name="Kicker and below" parameters={{ layout: 'fullscreen' }} asChild>
	<div class="py-16">
		<Hero>
			{#snippet kicker()}About{/snippet}
			{#snippet title()}One person, all of it.{/snippet}
			{#snippet lede()}Writing, tools and experiments under a handful of names.{/snippet}
			{#snippet below()}
				<div class="rounded-xl border p-6 text-sm text-muted-foreground">A live demo or a table goes under the hero at full width.</div>
			{/snippet}
		</Hero>
	</div>
</Story>
