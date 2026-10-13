<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Glass from './glass.svelte'
	import Rings from './rings.svelte'
	import ShaderMaterial from './shader-material.svelte'

	const variants = [
		{ variant: 'frost', name: 'Frost', body: 'The default. Enough page color for body text over a shader or the rings.' },
		{ variant: 'smoke', name: 'Smoke', body: 'Heavier and blurrier, for longer text or a busy picture behind.' },
		{ variant: 'tint', name: 'Tint', body: 'Frost washed with orange, for the one panel that leads.' },
		{ variant: 'clear', name: 'Clear', body: 'For labels and controls.' },
	] as const

	const { Story } = defineMeta({
		title: 'Custom/Glass',
		component: Glass,
		parameters: { layout: 'fullscreen' },
	})
</script>

<!-- Glass over a shader material: the material blurs into the panel instead of fighting the text. -->
<Story name="Over a shader" asChild>
	<div class="relative isolate grid min-h-[34rem] place-items-center overflow-hidden p-6">
		<ShaderMaterial rendering="image" preset="copper-sweep" controls={false} class="absolute inset-0 -z-10" />
		<Glass grain variant="smoke" class="flex w-full max-w-lg flex-col gap-4 p-8 sm:p-10">
			<h2 class="text-3xl font-medium tracking-[-0.03em] text-balance">Copper, through frosted glass.</h2>
			<p class="leading-relaxed text-muted-foreground">The material stays the picture. The panel only borrows its color, so the reading surface never has an edge in it.</p>
		</Glass>
	</div>
</Story>

<!-- Four strengths over the same material: frost for text, smoke for long text, tint in orange, clear for labels. -->
<Story name="Strengths" asChild>
	<div class="relative isolate overflow-hidden p-6 md:p-12">
		<ShaderMaterial rendering="image" preset="etched-silk" controls={false} class="absolute inset-0 -z-10" />
		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each variants as v (v.variant)}
				<Glass variant={v.variant} class="flex min-h-56 flex-col justify-end gap-2 p-6">
					<h3 class="text-lg font-medium">{v.name}</h3>
					<p class="text-sm leading-relaxed text-muted-foreground">{v.body}</p>
				</Glass>
			{/each}
		</div>
	</div>
</Story>

<!-- Glass over the hero rings: the orange ring blurs into the panel where they cross. -->
<Story name="Over rings" asChild>
	<div class="relative isolate grid min-h-[30rem] items-center overflow-hidden p-6 md:p-12">
		<Rings seed="glass" class="absolute top-1/2 right-0 -z-10 w-[46rem] max-w-none -translate-y-1/2" />
		<Glass class="flex max-w-md flex-col gap-3 p-8">
			<h2 class="text-2xl font-medium tracking-[-0.03em]">Rings behind glass.</h2>
			<p class="leading-relaxed text-muted-foreground">Where the panel crosses the rings they soften into it, like looking through a window.</p>
		</Glass>
	</div>
</Story>
