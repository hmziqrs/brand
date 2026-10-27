<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import LineTabs from './line-tabs.svelte'
	import ReleaseCard from './release-card.svelte'
	import { releases } from '$brand/blocks/content/stories-data.js'

	const { Story } = defineMeta({
		title: 'Custom/Line tabs',
		component: LineTabs,
		parameters: { layout: 'padded' },
	})
</script>

{#snippet overview()}<p class="max-w-prose leading-relaxed text-muted-foreground">claude-multi gives each provider its own claude-&lt;name&gt; command and its own config directory. All of them run the normal, unmodified claude binary.</p>{/snippet}
{#snippet notes()}<div class="grid gap-4 md:grid-cols-2">{#each releases.slice(0, 2) as r (r.v)}<ReleaseCard product="claude-multi" symbol="Cm" release={r} />{/each}</div>{/snippet}
{#snippet docs()}<p class="text-muted-foreground">Installation, providers and the menu, step by step.</p>{/snippet}

<Story name="Default" asChild>
	<LineTabs
		class="max-w-4xl"
		label="claude-multi"
		tabs={[
			{ value: 'overview', label: 'Overview', content: overview },
			{ value: 'releases', label: 'Releases', count: releases.length, content: notes },
			{ value: 'docs', label: 'Docs', content: docs },
		]}
	/>
</Story>
