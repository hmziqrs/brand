<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import MaterialWash from './material-wash.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Material wash',
		component: MaterialWash,
		parameters: { layout: 'fullscreen' },
	})
</script>

{#snippet words()}
	<div class="relative mx-auto max-w-[82rem] px-6 py-24">
		<h2 class="max-w-[14ch] text-5xl leading-[0.98] font-semibold tracking-[-0.04em]">Words read over the <span class="text-primary">material.</span></h2>
		<p class="mt-6 max-w-[34rem] text-lg text-foreground/90">A still poster under a veil of the page color. No canvas, no animation.</p>
	</div>
{/snippet}

<Story name="Copper" asChild>
	<section class="relative isolate overflow-hidden"><MaterialWash preset="copper-sweep" class="-z-10" />{@render words()}</section>
</Story>

<Story name="Chalk" asChild>
	<section class="relative isolate overflow-hidden"><MaterialWash preset="chalk-dunes" class="-z-10" />{@render words()}</section>
</Story>

<Story name="Silver" asChild>
	<section class="relative isolate overflow-hidden"><MaterialWash preset="white-sweep" class="-z-10" />{@render words()}</section>
</Story>
