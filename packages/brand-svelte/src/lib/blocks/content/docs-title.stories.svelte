<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import DocsTitle from './docs-title.svelte'

	const { Story } = defineMeta({ title: 'Content/Docs title', component: DocsTitle })
</script>

<!-- A docs page's own title, with gpui-query's own rings faintly beside it. -->
<Story name="Default" asChild>
	<div class="max-w-[46rem] px-6 py-8">
		<DocsTitle title="Installation" lede="Install gpui-query in a Rust GPUI app: add the crate, register the global QueryClient, and verify your setup with a first query." trail={["Docs", "Getting Started"]} seed="gpui-query" />
	</div>
</Story>
