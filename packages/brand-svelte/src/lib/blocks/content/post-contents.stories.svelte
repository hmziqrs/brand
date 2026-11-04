<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import PostContents from './post-contents.svelte'

	const { Story } = defineMeta({ title: 'Content/Blog/Post contents', component: PostContents })
</script>

<script lang="ts">
	import { slug } from '@hmziq/brand-core/scroll-spy'
	import { headings } from './stories-data.js'

	const items = headings.map((h) => ({ id: slug(h), label: h }))
</script>

<Story name="Inline" asChild>
	<div class="max-w-[46rem] px-6 py-8">
		<PostContents items={items} />
	</div>
</Story>

<Story name="Float" asChild>
	<div class="max-w-[46rem] px-6 py-8">
		{#each items as item (item.id)}
			<h2 id={item.id} class="mt-8 text-2xl font-medium">{item.label}</h2>
			<p class="mt-2 leading-relaxed text-muted-foreground">The section the contents list links to.</p>
		{/each}
		<PostContents items={items} variant="float" />
	</div>
</Story>

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

<Story name="Rail" asChild>
	<div class="grid grid-cols-[12rem_minmax(0,1fr)] gap-x-16 px-6 py-8">
		<aside><PostContents items={items} variant="rail" class="sticky top-24" /></aside>
		<div class="min-w-0">
			{#each items as item (item.id)}
				<h2 id={item.id} class="mt-14 scroll-mt-28 text-[1.75rem] leading-tight font-medium tracking-[-0.025em]">{item.label}</h2>
				<p class="mt-5 max-w-[40rem] text-[1.125rem] leading-[1.75]">The section the contents list links to. Scroll, and the line beside the one you're reading turns oxide.</p>
			{/each}
		</div>
	</div>
</Story>
