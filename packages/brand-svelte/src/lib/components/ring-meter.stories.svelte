<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import RingMeter from './ring-meter.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Ring meter',
		component: RingMeter,
		args: { label: 'Usage this month', items: [{ label: 'Storage', value: 0.72 }] },
	})
</script>

<!-- A few shares at once: the first in orange, the rest in the text color, each named beside it. -->
<Story name="Usage" asChild>
	<RingMeter
		label="Usage this month"
		items={[
			{ label: 'Storage', value: 0.72, detail: '7.2 of 10 GB' },
			{ label: 'Build minutes', value: 0.4, detail: '1,200 of 3,000' },
			{ label: 'Bandwidth', value: 0.18, detail: '18 of 100 GB' },
		]}
	/>
</Story>

<!-- Two rings, small, in a card. -->
<Story name="In a card" asChild>
	<div class="max-w-sm rounded-xl p-6 ring-1 ring-foreground/10">
		<RingMeter size={112} label="This release" items={[{ label: 'Tests passing', value: 0.97 }, { label: 'Code covered', value: 0.91 }]} />
	</div>
</Story>
