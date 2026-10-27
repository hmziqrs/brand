<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import MaterialGauge from './material-gauge.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Material gauge',
		component: MaterialGauge,
		parameters: { layout: 'centered' },
		args: { value: 0.9, preset: 'copper-sweep' },
		argTypes: {
			value: { description: 'Fill of the ring, from 0 to 1.' },
			preset: { description: 'Metal the gauge is cut from.' },
		},
	})
</script>

<Story name="Numbers" asChild>
	<div class="flex flex-wrap gap-10">
		{#each [{ value: 1, n: '100%', label: 'free and open source', preset: 'copper-sweep' }, { value: 0.9, n: '90%+', label: 'of the code covered by tests', preset: 'liquid-chrome' }, { value: 5, n: '5', label: 'review rounds before release', preset: 'hammered-copper' }] as s (s.n)}
			<div class="flex items-center gap-4">
				<MaterialGauge value={s.value} preset={s.preset} />
				<div><p class="text-[1.75rem] font-medium tracking-[-0.03em]">{s.n}</p><p class="text-sm text-muted-foreground">{s.label}</p></div>
			</div>
		{/each}
	</div>
</Story>

<Story name="Large" asChild>
	<MaterialGauge value={0.72} preset="brushed-alloy" class="size-48" />
</Story>
