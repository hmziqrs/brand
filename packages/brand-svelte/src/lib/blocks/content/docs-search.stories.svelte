<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import DocsSearch from './docs-search.svelte'

	const { Story } = defineMeta({ title: 'Content/Docs search', component: DocsSearch })
</script>

<!-- The docs search, in the header where the lab puts it. On its own here; DocsLayout owns the menu it filters. -->
<Story name="Default" asChild>
	<div class="flex items-center gap-4 px-6 py-4">
		<DocsSearch />
		<span class="text-[0.8125rem] text-muted-foreground">Filters the docs menu's pages as you type; ⌘K focuses it.</span>
	</div>
</Story>
