<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import AspectRatio from './aspect-ratio.svelte'

	const { Story } = defineMeta({
		title: 'ui/base/AspectRatio',
		component: AspectRatio,
	})
</script>

{#snippet photo()}
	<img
		src="https://images.unsplash.com/photo-1576075796033-848c2a5f3696?w=800&dpr=2&q=80"
		alt="Photo by Alvaro Pinot"
		class="absolute inset-0 size-full rounded-md object-cover"
	/>
{/snippet}

<Story name="Default" asChild>
	<div class="w-1/2">
		<AspectRatio ratio={16 / 9} class="bg-slate-50 dark:bg-slate-800">
			{@render photo()}
		</AspectRatio>
	</div>
</Story>

<Story name="Square" asChild>
	<div class="w-1/2">
		<AspectRatio ratio={1} class="bg-slate-50 dark:bg-slate-800">
			{@render photo()}
		</AspectRatio>
	</div>
</Story>

<Story name="Landscape" asChild>
	<div class="w-1/2">
		<AspectRatio ratio={4 / 3} class="bg-slate-50 dark:bg-slate-800">
			{@render photo()}
		</AspectRatio>
	</div>
</Story>

<Story name="Cinemascope" asChild>
	<div class="w-1/2">
		<AspectRatio ratio={2.35 / 1} class="bg-slate-50 dark:bg-slate-800">
			{@render photo()}
		</AspectRatio>
	</div>
</Story>
