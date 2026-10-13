<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import StackCards from './stack-cards.svelte'
	import MaterialStage from './material-stage.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Stack cards',
		component: StackCards,
		parameters: { layout: 'fullscreen' },
	})

	const steps = [
		{ title: 'You run one command', body: 'Point tunnel at a folder, a port or a dev server.', code: 'ft ./dist', preset: 'brushed-alloy' },
		{ title: 'Tunnel serves it', body: 'It serves the folder itself. Add --spa for a single-page app.', code: 'ft ./dist --spa', preset: 'copper-sweep' },
		{ title: 'You get a public link', body: "Cloudflare's free quick tunnels give it an address anyone can open.", code: 'https://steady-harbor-figures-plan.trycloudflare.com', preset: 'liquid-chrome' },
		{ title: 'You stop it, the link is gone', body: 'One kill and nothing is left running.', code: 'ft kill docs-site', preset: 'hammered-copper' },
	]
</script>

<!-- Scroll: each step sticks and the next one slides over it, a sliver of the last still showing. The link is an example. -->
<Story name="Steps" asChild>
	<div class="mx-auto flex max-w-3xl flex-col gap-10 px-6 py-16">
		<h2 class="text-3xl font-medium tracking-tight">How a link happens</h2>
		<StackCards items={steps} top="2rem">
			{#snippet card(step, i)}
				<div class="grid gap-6 p-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] sm:items-center">
					<div class="flex flex-col gap-2"><span class="text-sm text-muted-foreground tabular-nums">0{i + 1}</span><h3 class="text-xl font-medium tracking-tight">{step.title}</h3><p class="leading-relaxed text-muted-foreground">{step.body}</p></div>
					<MaterialStage preset={step.preset} padding="sm"><code class="block truncate px-4 py-3 font-mono text-[0.8125rem]">{step.code}</code></MaterialStage>
				</div>
			{/snippet}
		</StackCards>
		<div class="h-[70vh]"></div>
	</div>
</Story>
