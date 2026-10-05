<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import * as Card from '$brand/ui/card/index.js'
	import BandArcs from './band-arcs.svelte'
	import CornerRings from './corner-rings.svelte'
	import Marker from './marker.svelte'
	import RingGauge from './ring-gauge.svelte'
	import Rings from './rings.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Rings',
		component: Rings,
		args: { seed: 'freeoxide' },
	})
</script>

<!-- The hero picture. Drawn from the site's name: change the seed and the rings change, the same name always gives the same picture. -->
<Story name="Hero" asChild>
	<div class="max-w-lg">
		<Rings seed="freeoxide" />
	</div>
</Story>

<!-- Every site gets its own. -->
<Story name="Seeds" asChild>
	<div class="grid max-w-3xl grid-cols-2 gap-8 sm:grid-cols-4">
		{#each ['hmziq', 'freeoxide', 'gpui-query', 'claude-multi'] as seed (seed)}
			<figure class="flex flex-col gap-2">
				<Rings {seed} label={`Rings drawn from “${seed}”`} />
				<figcaption class="text-xs text-muted-foreground">{seed}</figcaption>
			</figure>
		{/each}
	</div>
</Story>

<!-- A card's fingerprint: its own rings in the corner, one of them in the card's color. -->
<Story name="Fingerprint" asChild>
	<div class="grid max-w-3xl gap-4 sm:grid-cols-3">
		{#each [
			{ name: 'gpui-query', color: 'var(--blue)', kind: 'Library' },
			{ name: 'tunnel', color: 'var(--teal)', kind: 'Command-line tool' },
			{ name: 'gpui-starter', color: 'var(--purple)', kind: 'Desktop app' },
		] as p (p.name)}
			<Card.Root class="relative h-44 justify-end gap-2 bg-transparent px-6 shadow-none">
				<CornerRings seed={p.name} color={p.color} />
				<h3 class="relative text-lg font-medium">{p.name}</h3>
				<p class="relative flex items-center gap-2 text-[0.8125rem] text-muted-foreground">
					<Marker style={{ color: p.color }} />
					{p.kind}
				</p>
			</Card.Root>
		{/each}
	</div>
</Story>

<!-- Numbers as rings: a share fills the ring, a count splits it into segments. -->
<Story name="Gauges" asChild>
	<div class="flex flex-wrap gap-10">
		{#each [
			{ value: '100%', ring: 1 },
			{ value: '90%+', ring: 0.9 },
			{ value: '5', ring: 5 },
		] as s (s.value)}
			<div class="flex items-center gap-4">
				<RingGauge value={s.ring} />
				<span class="text-[1.75rem] font-medium tracking-[-0.03em]">{s.value}</span>
			</div>
		{/each}
	</div>
</Story>

<!-- The arcs on the right of the orange closing band. The accent ring turns dark there. -->
<Story name="On the band" asChild>
	<section class="band-orange relative overflow-hidden rounded-xl">
		<BandArcs />
		<div class="relative p-12">
			<h2 class="text-4xl font-medium tracking-[-0.04em]">One person. All of it.</h2>
		</div>
	</section>
</Story>
