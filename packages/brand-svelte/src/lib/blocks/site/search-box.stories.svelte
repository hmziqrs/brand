<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import SearchBox from './search-box.svelte'

	const { Story } = defineMeta({ title: 'Content/Search box', component: SearchBox })
</script>

<script lang="ts">
	let value = $state('')
</script>

<!-- A search box that filters as you type. A line, no fill. -->
<Story name="Default" asChild>
	<SearchBox label="Search the docs" bind:value onChange={(v) => (value = v)} />
</Story>
