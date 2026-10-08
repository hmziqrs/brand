<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import PostContents from './post-contents.svelte'

	const { Story } = defineMeta({ title: 'Content/Blog/Post contents', component: PostContents })
</script>

<script lang="ts">
	import { slug } from '@hmziq/brand-core/scroll-spy'
	import { headings } from './stories-data.js'

	// The post's own headings, slugged the way its h2s are.
	const items = headings.map((h) => ({ id: slug(h), label: h }))
</script>

<!-- Inline after the cover (the default), with the headings of the lab's post under it. -->
<Story name="Inline" asChild>
	<div class="max-w-[46rem] px-6 py-8">
		<PostContents items={items} />
	</div>
</Story>

<!-- A floating pill with scroll spy, on this page now. -->
<Story name="Float" asChild>
	<div class="max-w-[46rem] px-6 py-8">
		{#each items as item (item.id)}
			<h2 id={item.id} class="mt-8 text-2xl font-medium">{item.label}</h2>
			<p class="mt-2 leading-relaxed text-muted-foreground">The section the contents list links to.</p>
		{/each}
		<PostContents items={items} variant="float" />
	</div>
</Story>

<!-- A left column, for pages that give the contents a margin of its own. -->
<Story name="Left" asChild>
	<div class="px-6 py-8">
		<p class="text-muted-foreground mb-4 text-sm xl:hidden">
			The contents column shows from xl (1280 px) — widen the canvas to see this variant.
		</p>
		<div class="flex gap-12">
		<div class="min-w-0 flex-1">
			{#each items as item (item.id)}
				<h2 id={item.id} class="mt-8 text-2xl font-medium">{item.label}</h2>
				<p class="mt-2 leading-relaxed text-muted-foreground">The section the contents list links to.</p>
			{/each}
		</div>
		<PostContents items={items} variant="left" class="w-50" />
	</div>
</Story>

<!-- A right column. -->
<Story name="Right" asChild>
	<div class="px-6 py-8">
		<p class="text-muted-foreground mb-4 text-sm xl:hidden">
			The contents column shows from xl (1280 px) — widen the canvas to see this variant.
		</p>
		<div class="flex gap-12">
		<PostContents items={items} variant="right" class="w-50" />
		<div class="min-w-0 flex-1">
			{#each items as item (item.id)}
				<h2 id={item.id} class="mt-8 text-2xl font-medium">{item.label}</h2>
				<p class="mt-2 leading-relaxed text-muted-foreground">The section the contents list links to.</p>
			{/each}
		</div>
	</div>
</Story>
