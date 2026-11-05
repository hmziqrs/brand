<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import MaterialCard from './material-card.svelte'

	const projects = [
		{ name: 'gpui-query', kind: 'Library', note: 'Data loading for GPUI apps: caching, retries and refetching, the way TanStack Query does it.' },
		{ name: 'gpui-starter', kind: 'Template', note: 'A desktop app starter with the menus, settings and theming already wired up.' },
		{ name: 'tunnel', kind: 'Command-line tool', note: 'A public link for anything on your computer, gone when you stop it.' },
	]

	const { Story } = defineMeta({
		title: 'Custom/Material card',
		component: MaterialCard,
		parameters: { layout: 'centered' },
		args: { title: 'Inside claude-multi: a tour of every menu' },
		argTypes: {
			title: { description: 'The card title; with no preset it picks the material.' },
		},
	})
</script>

<Story name="Default" asChild>
	<div class="grid max-w-5xl gap-4 md:grid-cols-3">
		{#each projects as p (p.name)}
			<MaterialCard title={p.name} seed={p.name} eyebrow={p.kind} body={p.note} href="#" />
		{/each}
	</div>
</Story>

<Story name="Brand materials" asChild>
	<div class="grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
		{#each ['copper-sweep', 'hammered-copper', 'etched-silk', 'sediment', 'folded-foil', 'mineral-fault', 'lava-fissures', 'mica-flakes', 'brushed-alloy', 'cast-iron', 'liquid-chrome', 'hammered-silver', 'black-ice', 'carbon-twill', 'scratched-enamel', 'black-sweep'] as preset (preset)}
			<MaterialCard {preset} title={preset} named class="min-h-[16rem]" sizes="(min-width: 1024px) 25vw, 50vw" />
		{/each}
	</div>
</Story>

<Story name="Animated" asChild>
	<div class="max-w-sm">
		<MaterialCard preset="liquid-chrome" animated title="Materials, made from code" eyebrow="Shader studio" body="Start from oxide, metal, paper or glass, then let it move." />
	</div>
</Story>
