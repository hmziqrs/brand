<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Bold from '@lucide/svelte/icons/bold'
	import Italic from '@lucide/svelte/icons/italic'
	import Link from '@lucide/svelte/icons/link'
	import List from '@lucide/svelte/icons/list'
	import LiquidGlass from './liquid-glass.svelte'
	import Glass from './glass.svelte'
	import ShaderMaterial from './shader-material.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Liquid glass',
		component: LiquidGlass,
		parameters: { layout: 'fullscreen' },
	})
</script>

<Story name="Over a material" asChild>
	<div class="relative isolate grid min-h-[34rem] place-items-center gap-10 overflow-hidden p-8">
		<ShaderMaterial rendering="image" preset="etched-silk" controls={false} class="absolute inset-0 -z-10" />
		<LiquidGlass class="grid size-44 place-items-center rounded-full text-sm font-medium" bend={60} edge={26}>A lens</LiquidGlass>
		<LiquidGlass role="toolbar" aria-label="Formatting" class="flex items-center gap-1 rounded-full p-1.5">
			{#each [{ label: 'Bold', icon: Bold }, { label: 'Italic', icon: Italic }, { label: 'Link', icon: Link }, { label: 'List', icon: List }] as b (b.label)}
				<button type="button" aria-label={b.label} class="grid size-9 place-items-center rounded-full transition-colors outline-none hover:bg-foreground/10 focus-visible:ring-3 focus-visible:ring-ring/50"><b.icon class="lucide size-4" /></button>
			{/each}
		</LiquidGlass>
	</div>
</Story>

<Story name="Next to frosted" asChild>
	<div class="relative isolate grid min-h-80 place-items-center overflow-hidden p-8">
		<ShaderMaterial rendering="image" preset="copper-sweep" controls={false} class="absolute inset-0 -z-10" />
		<div class="flex flex-wrap items-center justify-center gap-8">
			<LiquidGlass class="rounded-2xl px-8 py-6 text-sm font-medium">Liquid</LiquidGlass>
			<Glass class="rounded-2xl px-8 py-6 text-sm font-medium">Frosted</Glass>
		</div>
	</div>
</Story>
