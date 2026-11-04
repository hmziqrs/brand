<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ReleaseFilters from './release-filters.svelte'

	const { Story } = defineMeta({ title: 'Content/Changelog/Release filters', component: ReleaseFilters })
</script>

<script lang="ts">
	import { multiReleases } from './stories-data-changelog.js'

	let kind = $state('All')
	let query = $state('')
	let open = $state(false)
</script>

<Story name="Default" asChild>
	<div class="flex max-w-[64rem] flex-col gap-4 px-6">
		<ReleaseFilters releases={multiReleases} bind:kind bind:query folds={26} {open} onOpen={(v) => (open = v)} />
		<p class="font-mono text-[0.8125rem] text-muted-foreground">kind: {kind} · search: “{query}” · older releases {open ? 'open' : 'folded'}</p>
	</div>
</Story>
