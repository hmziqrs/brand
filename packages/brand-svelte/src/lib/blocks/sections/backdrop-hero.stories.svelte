<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import BackdropHero from './backdrop-hero.svelte'
	import ButtonLink from '../site/button-link.svelte'

	const { Story } = defineMeta({
		title: 'Sections/Backdrop hero',
		component: BackdropHero,
		parameters: { layout: 'fullscreen' },
	})
</script>

<Story name="Aurora" asChild>
	<BackdropHero kind="aurora">
		{#snippet title()}Your words, your machine.{/snippet}
		{#snippet lede()}Every hmziq tool runs and builds locally. Nothing to sign up for, nothing phoning home.{/snippet}
		{#snippet actions()}<ButtonLink href="#" size="lg" class="px-5">Browse the projects</ButtonLink>{/snippet}
	</BackdropHero>
</Story>

<Story name="Liquid metal" asChild>
	<BackdropHero kind="metal">
		{#snippet title()}Your words, your machine.{/snippet}
		{#snippet lede()}Every hmziq tool runs and builds locally. Nothing to sign up for, nothing phoning home.{/snippet}
		{#snippet actions()}<ButtonLink href="#" size="lg" class="px-5">Browse the projects</ButtonLink>{/snippet}
	</BackdropHero>
</Story>

<Story name="Ink in water" asChild>
	<BackdropHero kind="ink">
		{#snippet title()}Your words, your machine.{/snippet}
		{#snippet lede()}Every hmziq tool runs and builds locally. Nothing to sign up for, nothing phoning home.{/snippet}
		{#snippet actions()}<ButtonLink href="#" size="lg" class="px-5">Browse the projects</ButtonLink>{/snippet}
	</BackdropHero>
</Story>

<Story name="Topographic" asChild>
	<BackdropHero kind="topo">
		{#snippet title()}Your words, your machine.{/snippet}
		{#snippet lede()}Every hmziq tool runs and builds locally. Nothing to sign up for, nothing phoning home.{/snippet}
		{#snippet actions()}<ButtonLink href="#" size="lg" class="px-5">Browse the projects</ButtonLink>{/snippet}
	</BackdropHero>
</Story>

<Story name="Voronoi glass" asChild>
	<BackdropHero kind="glass">
		{#snippet title()}Your words, your machine.{/snippet}
		{#snippet lede()}Every hmziq tool runs and builds locally. Nothing to sign up for, nothing phoning home.{/snippet}
		{#snippet actions()}<ButtonLink href="#" size="lg" class="px-5">Browse the projects</ButtonLink>{/snippet}
	</BackdropHero>
</Story>

<Story name="Particle field" asChild>
	<BackdropHero kind="particles">
		{#snippet title()}Your words, your machine.{/snippet}
		{#snippet lede()}Every hmziq tool runs and builds locally. Nothing to sign up for, nothing phoning home.{/snippet}
		{#snippet actions()}<ButtonLink href="#" size="lg" class="px-5">Browse the projects</ButtonLink>{/snippet}
	</BackdropHero>
</Story>

<Story name="Flowing silk" asChild>
	<BackdropHero kind="silk">
		{#snippet title()}Your words, your machine.{/snippet}
		{#snippet lede()}Every hmziq tool runs and builds locally. Nothing to sign up for, nothing phoning home.{/snippet}
		{#snippet actions()}<ButtonLink href="#" size="lg" class="px-5">Browse the projects</ButtonLink>{/snippet}
	</BackdropHero>
</Story>

<Story name="Dot matrix" asChild>
	<BackdropHero kind="halftone">
		{#snippet title()}Your words, your machine.{/snippet}
		{#snippet lede()}Every hmziq tool runs and builds locally. Nothing to sign up for, nothing phoning home.{/snippet}
		{#snippet actions()}<ButtonLink href="#" size="lg" class="px-5">Browse the projects</ButtonLink>{/snippet}
	</BackdropHero>
</Story>

<Story name="Gradient mesh" asChild>
	<BackdropHero kind="mesh">
		{#snippet title()}Your words, your machine.{/snippet}
		{#snippet lede()}Every hmziq tool runs and builds locally. Nothing to sign up for, nothing phoning home.{/snippet}
		{#snippet actions()}<ButtonLink href="#" size="lg" class="px-5">Browse the projects</ButtonLink>{/snippet}
	</BackdropHero>
</Story>

<Story name="Rings" asChild>
	<BackdropHero kind="rings">
		{#snippet title()}Your words, your machine.{/snippet}
		{#snippet lede()}Every hmziq tool runs and builds locally. Nothing to sign up for, nothing phoning home.{/snippet}
		{#snippet actions()}<ButtonLink href="#" size="lg" class="px-5">Browse the projects</ButtonLink>{/snippet}
	</BackdropHero>
</Story>

<Story name="Voice orb" asChild>
	<BackdropHero kind="orb">
		{#snippet title()}Your words, your machine.{/snippet}
		{#snippet lede()}Every hmziq tool runs and builds locally. Nothing to sign up for, nothing phoning home.{/snippet}
		{#snippet actions()}<ButtonLink href="#" size="lg" class="px-5">Browse the projects</ButtonLink>{/snippet}
	</BackdropHero>
</Story>

<Story name="Refraction band" asChild>
	<BackdropHero kind="refract">
		{#snippet title()}Your words, your machine.{/snippet}
		{#snippet lede()}Every hmziq tool runs and builds locally. Nothing to sign up for, nothing phoning home.{/snippet}
		{#snippet actions()}<ButtonLink href="#" size="lg" class="px-5">Browse the projects</ButtonLink>{/snippet}
	</BackdropHero>
</Story>

<Story name="Swirl" asChild>
	<BackdropHero kind="swirl">
		{#snippet title()}Your words, your machine.{/snippet}
		{#snippet lede()}Every hmziq tool runs and builds locally. Nothing to sign up for, nothing phoning home.{/snippet}
		{#snippet actions()}<ButtonLink href="#" size="lg" class="px-5">Browse the projects</ButtonLink>{/snippet}
	</BackdropHero>
</Story>
