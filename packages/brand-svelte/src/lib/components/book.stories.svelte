<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Book from './book.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Book',
		component: Book,
		parameters: { layout: 'fullscreen' },
	})
</script>

<script lang="ts">
	import LineArt from './line-art.svelte'
</script>

<Story name="Default" asChild>
	<div class="grid grid-cols-1 gap-16 px-6 py-16 sm:grid-cols-3" data-line-art-host>
		<Book title="The discovery doc" eyebrow="oxlabs.dev" note="~1 week · written plan" tone="oxide">
			{#snippet art()}<span class="relative block aspect-[16/10]"><LineArt kind="plan" /></span>{/snippet}
			{#snippet back()}
				<span class="block font-mono text-[max(0.5rem,3.4cqw)] leading-none tracking-[0.14em] uppercase">oxlabs.dev</span>
				<span class="mt-[14%] block text-[max(0.95rem,8cqw)] leading-[1.05] font-medium tracking-[-0.03em] text-balance">We write things down.</span>
			{/snippet}
		</Book>
		<Book title="The architecture spec" eyebrow="oxlabs.dev" note="RFC-style · in-repo" tone="ink">
			{#snippet art()}<span class="relative block aspect-[16/10]"><LineArt kind="modules" /></span>{/snippet}
		</Book>
		<Book title="The runbook" eyebrow="oxlabs.dev" note="weekly · handoff" tone="paper">
			{#snippet art()}<span class="relative block aspect-[16/10]"><LineArt kind="pipeline" /></span>{/snippet}
		</Book>
	</div>
</Story>
