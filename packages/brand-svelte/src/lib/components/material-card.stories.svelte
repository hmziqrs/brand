<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import MaterialCard from './material-card.svelte'
	import OutlineCard from '$brand/blocks/site/outline-card.svelte'
	import { posts } from '$brand/blocks/content/stories-data.js'

	const projects = [
		{ name: 'gpui-query', kind: 'Library', note: 'Data loading for GPUI apps: caching, retries and refetching, the way TanStack Query does it.' },
		{ name: 'gpui-starter', kind: 'Template', note: 'A desktop app starter with the menus, settings and theming already wired up.' },
		{ name: 'tunnel', kind: 'Command-line tool', note: 'A public link for anything on your computer, gone when you stop it.' },
	]

	const { Story } = defineMeta({
		title: 'Custom/Material card',
		component: MaterialCard,
		parameters: { layout: 'centered' },
		args: { title: 'Inside claude-multi: a tour of every menu', variant: 'cover' },
		argTypes: {
			title: { description: 'The card title; with no preset it picks the material.' },
			variant: { description: 'Where the material sits: cover, panel, side or frame.' },
		},
	})
</script>

<Story name="Cover" asChild>
	<div class="grid max-w-5xl gap-4 md:grid-cols-3">
		{#each posts.slice(4, 7) as p (p.title)}
			<MaterialCard title={p.title} eyebrow={p.topic} body={p.summary} href={p.href}>
				{#snippet footer()}{p.date}{/snippet}
			</MaterialCard>
		{/each}
	</div>
</Story>

<Story name="Panel" asChild>
	<div class="grid max-w-5xl gap-4 md:grid-cols-3">
		{#each projects as p (p.name)}
			<MaterialCard variant="panel" title={p.name} seed={p.name} eyebrow={p.kind} body={p.note} href="#" />
		{/each}
	</div>
</Story>

<Story name="Side" asChild>
	<div class="grid max-w-3xl gap-4">
		{#each posts.slice(0, 2) as p (p.title)}
			<MaterialCard variant="side" title={p.title} eyebrow={p.topic} body={p.summary} href={p.href}>
				{#snippet footer()}{p.date}{/snippet}
			</MaterialCard>
		{/each}
	</div>
</Story>

<Story name="Frame" asChild>
	<div class="grid max-w-5xl gap-4 md:grid-cols-3">
		<OutlineCard><h3 class="text-lg font-medium">gpui-query</h3><p class="text-[0.9rem] leading-relaxed text-muted-foreground">Data loading for GPUI apps.</p></OutlineCard>
		<MaterialCard variant="frame" preset="copper-sweep" title="tunnel" eyebrow="New" body="A public link for anything on your computer, gone when you stop it." href="#" />
		<OutlineCard><h3 class="text-lg font-medium">gpui-starter</h3><p class="text-[0.9rem] leading-relaxed text-muted-foreground">A desktop app starter.</p></OutlineCard>
	</div>
</Story>

<Story name="Brand materials" asChild>
	<div class="grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
		{#each ['copper-sweep', 'hammered-copper', 'etched-silk', 'sediment', 'folded-foil', 'mineral-fault', 'lava-fissures', 'mica-flakes', 'brushed-alloy', 'cast-iron', 'liquid-chrome', 'hammered-silver', 'black-ice', 'carbon-twill', 'scratched-enamel', 'black-sweep'] as preset (preset)}
			<MaterialCard {preset} title={preset} named sizes="(min-width: 1024px) 25vw, 50vw" />
		{/each}
	</div>
</Story>

<Story name="Animated" asChild>
	<div class="max-w-sm">
		<MaterialCard variant="panel" preset="liquid-chrome" animated title="Materials, made from code" eyebrow="Shader studio" body="Start from oxide, metal, paper or glass, then let it move." />
	</div>
</Story>
