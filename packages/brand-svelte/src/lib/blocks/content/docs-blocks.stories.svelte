<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import DocsBlocks from './docs-blocks.svelte'

	const { Story } = defineMeta({ title: 'Content/Docs/Blocks', component: DocsBlocks })
</script>

<script lang="ts">
	import Prose from '$brand/blocks/site/prose.svelte'
	import { claudeMultiDocs, gpuiQueryDocs } from './stories-data-docs.js'
</script>

<Story name="Default" asChild>
	<Prose class="max-w-[46rem] px-6 py-8 text-[0.9375rem]">
		<DocsBlocks blocks={gpuiQueryDocs.pages['getting-started/installation'].blocks} prefix="blocks" html={(s) => s} />
		<DocsBlocks blocks={claudeMultiDocs.pages['getting-started'].blocks} prefix="blocks-install" html={(s) => s} />
	</Prose>
</Story>
