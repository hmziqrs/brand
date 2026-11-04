<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import { lineArtKinds } from '@hmziq/brand-core/motion/line-art'
	import LineArt from './line-art.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Line art',
		component: LineArt,
		parameters: { layout: 'fullscreen' },
	})
</script>

<Story name="Kinds" asChild>
	<div class="mx-auto grid max-w-[82rem] gap-6 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
		{#each lineArtKinds as kind (kind)}
			<figure class="flex flex-col gap-2">
				<div data-line-art-host class="relative isolate aspect-[16/10] overflow-hidden rounded-xl ring-1 ring-foreground/10"><LineArt {kind} /></div>
				<figcaption class="font-mono text-xs text-muted-foreground">{kind}</figcaption>
			</figure>
		{/each}
	</div>
</Story>

<Story name="Cover" asChild>
	<div class="mx-auto max-w-[82rem] px-6 py-12">
		<div class="relative aspect-[16/10] overflow-hidden rounded-2xl ring-1 ring-foreground/10 sm:aspect-[2/1] lg:aspect-[5/2]"><LineArt kind="laptop" fit /></div>
	</div>
</Story>
