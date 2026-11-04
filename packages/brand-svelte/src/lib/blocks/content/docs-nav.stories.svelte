<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import DocsNav from './docs-nav.svelte'

	const { Story } = defineMeta({ title: 'Content/Docs/Nav', component: DocsNav })
</script>

<script lang="ts">
	import { gpuiQueryDocs } from './stories-data-docs.js'
</script>

<Story name="Default" asChild>
	<div class="w-56 px-6 py-8">
		<DocsNav menu={gpuiQueryDocs.menu} current="getting-started/installation" go={(key) => `#${key}`} />
	</div>
</Story>
