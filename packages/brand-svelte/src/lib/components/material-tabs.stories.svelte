<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import MaterialTabs from './material-tabs.svelte'
	import CodeBlock from './code-block.svelte'
	import { querySamples } from '$brand/blocks/content/stories-data.js'

	const { Story } = defineMeta({
		title: 'Custom/Material tabs',
		component: MaterialTabs,
		parameters: { layout: 'padded' },
	})
</script>

{#snippet query()}<CodeBlock lang="rust" label="Load data" class="bg-background shadow-xl" code={querySamples[0].code} />{/snippet}
{#snippet mutation()}<CodeBlock lang="rust" label="Save changes" class="bg-background shadow-xl" code={querySamples[1].code} />{/snippet}
{#snippet pages()}<CodeBlock lang="rust" label="Load pages" class="bg-background shadow-xl" code={querySamples[2].code} />{/snippet}

<Story name="Default" asChild>
	<MaterialTabs
		class="max-w-5xl"
		label="What gpui-query does"
		items={[
			{ title: 'Load data', body: 'Fetched once, cached by key, refreshed when it goes stale.', preset: 'brushed-alloy', window: 'none', content: query },
			{ title: 'Save changes', body: 'Send an update and refresh whatever depends on it.', preset: 'copper-sweep', window: 'none', content: mutation },
			{ title: 'Load pages', body: 'Feeds and long lists, one page at a time.', preset: 'liquid-chrome', window: 'none', content: pages },
		]}
	/>
</Story>
