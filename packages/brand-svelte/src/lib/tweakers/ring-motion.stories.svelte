<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Pause from '@lucide/svelte/icons/pause'
	import Play from '@lucide/svelte/icons/play'
	import Rings from '$brand/components/rings.svelte'
	import Segmented from '$brand/components/segmented.svelte'
	import { Button } from '$brand/ui/button/index.js'
	import type { RingPreset } from '@hmziq/brand-core/motion/rings'
	import RingTweaker from './ring-tweaker.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Ring motion',
		parameters: { layout: 'padded' },
	})
</script>

<script lang="ts">
	const presets: { preset: RingPreset; name: string; note: string }[] = [
		{ preset: 'still', name: 'Still', note: 'The rings as they are today, to compare against.' },
		{ preset: 'ripple-turn', name: 'Ripple + orange turn', note: 'The gray rings light up one after another while the orange ring turns.' },
		{ preset: 'turn', name: 'Orange turns', note: 'Only the orange ring turns, once every two minutes. Its dot goes with it.' },
		{ preset: 'breathe', name: 'Orange breathes', note: 'The orange arc grows a little longer and back, every eight seconds.' },
		{ preset: 'orbit', name: 'Dot goes round', note: 'The orange arc stays put. Its dot travels round the ring every 40 seconds.' },
		{ preset: 'pair', name: 'Two turn', note: 'The orange ring and one gray ring turn slowly, opposite ways.' },
		{ preset: 'dial', name: 'One at a time', note: 'Four gray rings take turns: one turns a short step, rests, and later turns back.' },
		{ preset: 'ripple', name: 'Ripple', note: 'Nothing moves. Every ten seconds the gray rings light up one after another, inside to out.' },
	]

	const sites = ['freeoxide', 'hmziq', 'gpui-query', 'claude-multi'] as const

	let seed = $state<string>('freeoxide')
	let galleryPaused = $state<Partial<Record<RingPreset, boolean>>>({})
	const allPaused = $derived(presets.every((p) => p.preset === 'still' || galleryPaused[p.preset]))

	function toggleAll() {
		galleryPaused = Object.fromEntries(presets.map((p) => [p.preset, !allPaused])) as Partial<Record<RingPreset, boolean>>
	}
</script>

{#snippet PlayButton({ paused, onClick, label }: { paused: boolean; onClick: () => void; label?: string })}
	<Button variant="outline" size="sm" onclick={onClick}>
		{#if paused}<Play class="lucide" data-icon="inline-start" />{:else}<Pause class="lucide" data-icon="inline-start" />{/if}
		{label ?? (paused ? 'Play' : 'Pause')}
	</Button>
{/snippet}

<!--
  Tune how the hero rings move: the orange ring and the gray rings each have
  their own movement and settings, and they combine. Your settings are at the
  bottom, ready to copy.
-->
<Story name="Tweaker" parameters={{ layout: 'fullscreen' }} asChild>
	<RingTweaker />
</Story>

<!-- The ready-made mixes side by side, each with its own play and pause. -->
<Story name="Side by side" asChild>
	<div class="flex max-w-5xl flex-col gap-8">
		<div class="flex flex-wrap items-center gap-3">
			<Segmented label="Site" options={sites.map((s) => ({ value: s, label: s }))} value={seed} onValueChange={(v) => (seed = v)} />
			{@render PlayButton({ paused: allPaused, onClick: toggleAll, label: allPaused ? 'Play all' : 'Pause all' })}
		</div>
		<div class="grid gap-x-10 gap-y-12 sm:grid-cols-2">
			{#each presets as p (p.preset)}
				<figure class="flex flex-col gap-4">
					<Rings {seed} motion={p.preset} paused={galleryPaused[p.preset]} label={`Rings drawn from “${seed}”: ${p.name}`} />
					<figcaption class="flex items-start justify-between gap-4">
						<span class="text-sm leading-relaxed">
							<span class="font-medium">{p.name}</span> <span class="text-muted-foreground">{p.note}</span>
						</span>
						{#if p.preset !== 'still'}
							{@render PlayButton({ paused: !!galleryPaused[p.preset], onClick: () => (galleryPaused = { ...galleryPaused, [p.preset]: !galleryPaused[p.preset] }) })}
						{/if}
					</figcaption>
				</figure>
			{/each}
		</div>
	</div>
</Story>
