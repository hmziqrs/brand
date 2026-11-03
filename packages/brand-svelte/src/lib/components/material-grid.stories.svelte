<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import MaterialGrid from './material-grid.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Material grid',
		component: MaterialGrid,
		parameters: { layout: 'fullscreen' },
	})
</script>

{#snippet words()}
	<div class="pointer-events-none relative mx-auto max-w-[82rem] px-6 py-28">
		<h2 class="max-w-[14ch] text-5xl leading-[0.95] font-semibold tracking-[-0.045em] [text-shadow:0_2px_40px_var(--background),0_0_12px_var(--background)]">Move the cursor over the <span class="text-primary">grid.</span></h2>
	</div>
{/snippet}

<Story name="Live" asChild>
	<section data-pointer-host class="relative isolate min-h-[30rem] overflow-hidden"><MaterialGrid class="-z-10" />{@render words()}</section>
</Story>

<Story name="Still" asChild>
	<section data-pointer-host class="relative isolate min-h-[30rem] overflow-hidden"><MaterialGrid live={false} class="-z-10" />{@render words()}</section>
</Story>
