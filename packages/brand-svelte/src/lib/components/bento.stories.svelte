<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Bento from './bento.svelte'
	import BentoTile from './bento-tile.svelte'
	import Rings from './rings.svelte'
	import RingMeter from './ring-meter.svelte'
	import CommandBar from './command-bar.svelte'
	import CodeBlock from './code-block.svelte'
	import StatusRing from './status-ring.svelte'
	import MaterialSparkline from './material-sparkline.svelte'
	import MaterialTile from './material-tile.svelte'
	import HorizonRings from './horizon-rings.svelte'
	import CommandPalette, { type PaletteGroup } from './command-palette.svelte'
	import { Kbd } from '$brand/ui/kbd/index.js'
	import { brandMaterials } from '@hmziq/brand-core/shaders/materials'
	import { querySamples } from '$brand/blocks/content/stories-data.js'

	const { Story } = defineMeta({
		title: 'Custom/Bento',
		component: Bento,
		parameters: { layout: 'padded' },
	})

	const downloads = [320, 340, 310, 390, 420, 410, 470, 520, 500, 560, 610, 640]
	const groups: PaletteGroup[] = [
		{ heading: 'Projects', items: [{ id: 'tunnel', title: 'tunnel', kind: 'Project' }, { id: 'oxiwake', title: 'oxiwake', kind: 'Project' }, { id: 'gpui-query', title: 'gpui-query', kind: 'Project' }] },
		{ heading: 'Pages', items: [{ id: 'docs', title: 'Docs', kind: 'Page' }, { id: 'blog', title: 'Blog', kind: 'Page' }] },
	]
</script>

<script lang="ts">
	let awake = $state(true)
	let open = $state(false)
</script>

<!-- A page's highlights as a bento: each tile a different kind of thing, live where it can be. Downloads are example numbers. -->
<Story name="freeoxide" asChild>
	<Bento class="mx-auto max-w-6xl">
		<BentoTile cols={4} rows={2} layout="side" eyebrow="freeoxide" title="Free Rust tools, finished before they ship." body="Open-source software made by one person. I build the tools I wish existed, test them properly, and give them away." href="#">
			{#snippet media()}<div class="absolute inset-0 overflow-hidden"><Rings seed="freeoxide" class="absolute top-1/2 -right-10 w-[30rem] max-w-none -translate-y-1/2" /></div>{/snippet}
		</BentoTile>

		<BentoTile cols={2} title="Checked every release">
			<RingMeter size={96} label="This release" items={[{ label: 'Tests passing', value: 0.97 }, { label: 'Code covered', value: 0.91 }]} class="mt-2 gap-5" />
		</BentoTile>

		<BentoTile cols={2} title="Add it to your app" body="One command in your crate.">
			<CommandBar command="cargo add gpui-query" class="mt-3 max-w-full" />
		</BentoTile>

		<BentoTile cols={2} rows={2} title="Three functions" body="Loading, saving and paging all work the same way.">
			{#snippet media()}<div class="p-3 pb-0"><CodeBlock lang="rust" label="Load data" code={querySamples[0].code} copy={false} class="text-[0.75rem]" /></div>{/snippet}
		</BentoTile>

		<BentoTile cols={2} title="Downloads a week" eyebrow="Example numbers">
			<MaterialSparkline values={downloads} label="Downloads a week, rising from 320 to 640" preset="copper-sweep" class="mt-3" />
		</BentoTile>

		<BentoTile cols={2} title="Live links">
			<ul class="mt-2 flex flex-col gap-2 text-sm">
				<li class="flex items-center gap-2"><StatusRing />docs-site <span class="ml-auto text-muted-foreground">Folder</span></li>
				<li class="flex items-center gap-2"><StatusRing />proxy-3000 <span class="ml-auto text-muted-foreground">App</span></li>
				<li class="flex items-center gap-2"><StatusRing state="stale" />run-5173 <span class="ml-auto text-muted-foreground">Stopped</span></li>
			</ul>
		</BentoTile>

		<BentoTile cols={4} layout="side" title="oxiwake" body="Turn it on before the long job, off when it's done.">
			{#snippet media()}
				<div class="flex h-full flex-col justify-end gap-3 p-5">
					<HorizonRings seed="oxiwake" {awake} />
					<button type="button" aria-pressed={awake} onclick={() => (awake = !awake)} class="self-start rounded-md border px-3 py-1.5 font-mono text-xs transition-colors outline-none hover:bg-foreground/8 focus-visible:ring-3 focus-visible:ring-ring/50">{awake ? 'ow off' : 'ow on'}</button>
				</div>
			{/snippet}
		</BentoTile>

		<BentoTile cols={3} title="Materials" body="Sixteen shader looks in oxide, copper and quiet greys.">
			<div class="mt-3 flex flex-wrap gap-2">{#each brandMaterials as preset (preset)}<MaterialTile {preset} size={28} shape="circle" />{/each}</div>
		</BentoTile>

		<BentoTile cols={3} title="Find anything" body="Projects, pages and commands from the keyboard.">
			<button type="button" onclick={() => (open = true)} class="mt-3 flex items-center gap-2 self-start rounded-lg border px-3 py-2 text-sm text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50">Search<span class="flex gap-1"><Kbd>⌘</Kbd><Kbd>K</Kbd></span></button>
		</BentoTile>
	</Bento>
	<CommandPalette {groups} bind:open />
</Story>
