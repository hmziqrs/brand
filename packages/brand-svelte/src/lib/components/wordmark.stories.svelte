<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import { family } from '@hmziq/brand-core/family'
	import Mark from './mark.svelte'
	import Wordmark from './wordmark.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Logo',
		component: Wordmark,
		args: { name: 'freeoxide' },
	})
</script>

<!-- The wordmark: the name in Onest 600, ending in the orange square. Size it with a text size. -->
<Story name="Default" asChild>
	<Wordmark name="freeoxide" class="text-5xl" />
</Story>

<!-- In a header, the maker follows in small grey text. -->
<Story name="With maker" asChild>
	<a href="#" class="flex items-baseline gap-[0.35em] text-lg">
		<Wordmark name="freeoxide" />
		<span class="text-[0.78em] text-muted-foreground">by hmziq</span>
	</a>
</Story>

<!--
	The mark, for favicons, app icons and the family row in the footer: two
	letters and the square on a tile in the opposite of the page color. The
	square stays bright orange in both modes. No rings in logos.
-->
<Story name="Marks" asChild>
	<div class="flex flex-col gap-8">
		<div class="flex items-end gap-4">
			{#each [16, 20, 32, 48, 96] as size (size)}
				<Mark symbol="Fx" {size} />
			{/each}
		</div>
		<ul class="flex flex-wrap gap-x-6 gap-y-3 text-sm">
			{#each family as f (f.name)}
				<li class="inline-flex items-center gap-2 text-muted-foreground">
					<Mark symbol={f.symbol} />
					{f.name}
				</li>
			{/each}
		</ul>
	</div>
</Story>

<!-- Every site signs off with the same giant wordmark at the bottom of the footer. It fills the width it's given. -->
<Story name="Signature" asChild>
	<div class="@container max-w-3xl overflow-hidden border-t pt-10">
		<Wordmark name="hmziq" class="block pb-[0.2em] text-[33cqw] leading-[0.74] tracking-[-0.05em]" />
	</div>
</Story>
