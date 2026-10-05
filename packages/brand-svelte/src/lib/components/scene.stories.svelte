<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import { siGithub } from 'simple-icons'
	import Scene from './scene.svelte'
	import Rings from './rings.svelte'
	import BrandIcon from './brand-icon.svelte'
	import ButtonLink from '$brand/blocks/site/button-link.svelte'
	import Hero from '$brand/blocks/site/hero.svelte'
	import HeroNote from '$brand/blocks/site/hero-note.svelte'
	import type { SceneKind } from '@hmziq/brand-core/motion/scenes'

	const hero: readonly { kind: SceneKind; note: string }[] = [
		{ kind: 'lattice', note: "Iron oxide's crystal, from freeoxide. Iron in orange." },
		{ kind: 'network', note: 'Points joined up, with pulses running along. From oxlabs.' },
		{ kind: 'layers', note: 'A stack of outline cards, one in orange.' },
	]

	const bands: readonly { kind: SceneKind; note: string }[] = [
		{ kind: 'helix', note: 'A twisting ribbon, from the oxlabs home page.' },
		{ kind: 'tiles', note: "Squares on a slow wave. One is the wordmark's orange square." },
		{ kind: 'thread', note: 'Threads drifting, with an orange piece travelling along one.' },
	]

	const { Story } = defineMeta({
		title: 'Custom/Scenes (3D)',
		component: Scene,
		args: { kind: 'lattice', seed: 'freeoxide' },
	})
</script>

<!--
	Optional 3D pictures, for the odd page that wants something moving. Thin
	lines in the text color with one thing in orange, like the rings. For the
	rings themselves, use the flat rings with a little motion (Custom/Rings).
	Drawn from a name, so every site gets its own. They only run on screen,
	stop for reduced motion, and have a pause button.
-->
<Story name="Default" asChild>
	<Scene kind="lattice" seed="freeoxide" class="aspect-[520/440] w-full max-w-lg" />
</Story>

<!-- For the space beside the words in a hero. Roughly square. -->
<Story name="Beside the words" asChild>
	<div class="grid max-w-4xl gap-x-8 gap-y-10 sm:grid-cols-2">
		{#each hero as s (s.kind)}
			<figure class="flex flex-col gap-3">
				<Scene kind={s.kind} seed="freeoxide" class="aspect-[520/440] w-full" />
				<figcaption class="text-sm">
					<span class="font-medium">{s.kind}</span> <span class="text-muted-foreground">{s.note}</span>
				</figcaption>
			</figure>
		{/each}
	</div>
</Story>

<!-- For a thin band between two sections, edge to edge, with a line above and below. -->
<Story name="In a band" parameters={{ layout: 'fullscreen' }} asChild>
	<div class="flex flex-col gap-10 py-10">
		{#each bands as s (s.kind)}
			<figure class="flex flex-col gap-3">
				<Scene kind={s.kind} seed="oxlabs" class="h-44 w-full border-y" />
				<figcaption class="px-6 text-sm">
					<span class="font-medium">{s.kind}</span> <span class="text-muted-foreground">{s.note}</span>
				</figcaption>
			</figure>
		{/each}
	</div>
</Story>

<!-- In place of the hero rings. Where 3D can't run, the flat rings show instead. -->
<Story name="In a hero" parameters={{ layout: 'fullscreen' }} asChild>
	<div class="py-16">
		<Hero>
			{#snippet title()}Free Rust tools, finished before they ship.{/snippet}
			{#snippet lede()}Open-source software made by one person. I build the tools I wish existed, test them properly, and give them away.{/snippet}
			{#snippet actions()}
				<ButtonLink href="#" size="lg" class="px-5">Browse the projects</ButtonLink>
				<ButtonLink href="#" size="lg" variant="outline" class="px-5">
					<BrandIcon icon={siGithub} data-icon="inline-start" />
					View on GitHub
				</ButtonLink>
			{/snippet}
			{#snippet note()}<HeroNote>Free and open source. MIT or Apache-2.0.</HeroNote>{/snippet}
			{#snippet aside()}
				<Scene kind="lattice" seed="freeoxide" class="aspect-[520/440] w-full">
					{#snippet fallback()}<Rings seed="freeoxide" />{/snippet}
				</Scene>
			{/snippet}
		</Hero>
	</div>
</Story>

<!-- Each name draws its own. -->
<Story name="Seeds" asChild>
	<div class="grid max-w-4xl grid-cols-2 gap-8 sm:grid-cols-3">
		{#each ['hmziq', 'gpui-query', 'claude-multi'] as seed (seed)}
			<figure class="flex flex-col gap-2">
				<Scene kind="network" {seed} class="aspect-square w-full" />
				<figcaption class="text-xs text-muted-foreground">{seed}</figcaption>
			</figure>
		{/each}
	</div>
</Story>

<!-- On a grey band the scene reads the band's colors, and fills that hide what's behind them use the band's grey. -->
<Story name="On a grey band" parameters={{ layout: 'fullscreen' }} asChild>
	<section class="band-gray grid items-center gap-8 px-6 py-14 md:grid-cols-2 md:px-16">
		<div class="flex max-w-md flex-col gap-3">
			<h2 class="text-3xl font-medium tracking-[-0.03em]">How it works</h2>
			<p class="leading-relaxed text-muted-foreground">Every project goes through the same steps. I plan the structure, write the code, then run five rounds of review and five rounds of tests.</p>
		</div>
		<Scene kind="layers" seed="freeoxide" class="aspect-[520/440] w-full max-w-md" />
	</section>
</Story>

<!-- What visitors who ask for reduced motion see: one still picture, and no pause button. -->
<Story name="Still" asChild>
	<Scene kind="lattice" seed="freeoxide" still class="aspect-[520/440] w-full max-w-lg" />
</Story>
