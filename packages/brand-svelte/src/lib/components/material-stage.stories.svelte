<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import MaterialStage from './material-stage.svelte'
	import CodeBlock from './code-block.svelte'
	import StatusRing from './status-ring.svelte'
	import { querySamples } from '$brand/blocks/content/stories-data.js'

	const services = [
		{ name: 'docs-site', what: 'Folder', state: 'on' },
		{ name: 'proxy-3000', what: 'Running app', state: 'on' },
		{ name: 'run-5173', what: 'Dev server', state: 'stale' },
	] as const

	const { Story } = defineMeta({
		title: 'Custom/Material stage',
		component: MaterialStage,
		parameters: { layout: 'padded' },
	})
</script>

<!-- Code on a material, the code block itself as the window: give it the page color, since it has no fill of its own. -->
<Story name="Code" asChild>
	<MaterialStage preset="brushed-alloy" window="none" class="max-w-3xl">
		<CodeBlock lang="rust" label="src/users.rs" code={querySamples[0].code} class="bg-background shadow-xl" />
	</MaterialStage>
</Story>

<!-- A product screen in a solid window with a title bar, on copper. -->
<Story name="Product screen" asChild>
	<MaterialStage preset="copper-sweep" title="tunnel · services" class="max-w-3xl" padding="lg">
		<ul class="divide-y text-sm">
			{#each services as s (s.name)}
				<li class="flex items-center gap-4 px-4 py-3">
					<span class="font-mono text-[0.8125rem]">{s.name}</span>
					<span class="text-muted-foreground">{s.what}</span>
					<span class="ml-auto flex items-center gap-2"><StatusRing state={s.state} />{s.state === 'on' ? 'Live' : 'Stopped answering'}</span>
				</li>
			{/each}
		</ul>
	</MaterialStage>
</Story>

