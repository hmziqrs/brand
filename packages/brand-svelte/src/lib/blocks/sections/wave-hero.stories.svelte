<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import WaveHero from './wave-hero.svelte'
	import ButtonLink from '../site/button-link.svelte'
	import HeroNote from '../site/hero-note.svelte'
	import Rings from '$brand/components/rings.svelte'

	const { Story } = defineMeta({
		title: 'Sections/Wave hero',
		component: WaveHero,
		parameters: { layout: 'fullscreen' },
	})
</script>

{#snippet centered()}
	<WaveHero>
		{#snippet badge()}
			<span class="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-medium text-primary">
				<span class="size-1.5 rounded-full bg-primary"></span>
				New · rings for every site
			</span>
		{/snippet}
		{#snippet title()}Your words, your machine.{/snippet}
		{#snippet lede()}Every hmziq tool runs and builds locally. Nothing to sign up for, nothing phoning home.{/snippet}
		{#snippet actions()}
			<ButtonLink href="#" size="lg" class="px-5">Browse the projects</ButtonLink>
			<ButtonLink href="#" size="lg" variant="outline" class="px-5">View on GitHub</ButtonLink>
		{/snippet}
		{#snippet note()}<HeroNote>Free and open source. MIT or Apache-2.0.</HeroNote>{/snippet}
	</WaveHero>
{/snippet}

<Story name="Centered" asChild>{@render centered()}</Story>

<Story name="Split" asChild>
	<WaveHero variant="split">
		{#snippet title()}Tools finished before they ship.{/snippet}
		{#snippet lede()}Built by one person, tested properly, given away. The rings on the right are drawn from the site's own name.{/snippet}
		{#snippet actions()}<ButtonLink href="#" size="lg">Browse the projects</ButtonLink>{/snippet}
		{#snippet aside()}
			<div class="rounded-xl border bg-background/60 p-6 backdrop-blur-sm">
				<Rings seed="wave-hero" />
			</div>
		{/snippet}
	</WaveHero>
</Story>

<Story name="Grid texture" asChild>
	<WaveHero texture="grid">
		{#snippet title()}Your words, your machine.{/snippet}
		{#snippet lede()}Every hmziq tool runs and builds locally. Nothing to sign up for, nothing phoning home.{/snippet}
		{#snippet actions()}<ButtonLink href="#" size="lg">Browse the projects</ButtonLink>{/snippet}
	</WaveHero>
</Story>

<Story name="Grain texture" asChild>
	<WaveHero texture="grain">
		{#snippet title()}Your words, your machine.{/snippet}
		{#snippet lede()}Every hmziq tool runs and builds locally. Nothing to sign up for, nothing phoning home.{/snippet}
		{#snippet actions()}<ButtonLink href="#" size="lg">Browse the projects</ButtonLink>{/snippet}
	</WaveHero>
</Story>

<Story name="Quiet" asChild>
	<WaveHero texture="off" controls={false}>
		{#snippet title()}Your words, your machine.{/snippet}
		{#snippet lede()}Every hmziq tool runs and builds locally. Nothing to sign up for, nothing phoning home.{/snippet}
		{#snippet actions()}<ButtonLink href="#" size="lg" class="px-5">Browse the projects</ButtonLink>{/snippet}
	</WaveHero>
</Story>
