<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import MaterialSlider from './material-slider.svelte'

	const { Story } = defineMeta({
		title: 'Custom/Material slider',
		component: MaterialSlider,
		args: { label: 'Amount', value: 40 },
	})
</script>

<script lang="ts">
	let seats = $state(12)
</script>

<!-- A price that follows an amount: the filled part is copper. Example prices. -->
<Story name="Pricing" asChild>
	<div class="flex max-w-md flex-col gap-4 rounded-xl p-6 ring-1 ring-foreground/10">
		<div class="flex items-baseline justify-between"><span class="text-sm text-muted-foreground">People on your team</span><span class="text-sm font-medium tabular-nums">{seats}</span></div>
		<MaterialSlider label="People on your team" bind:value={seats} min={1} max={50} preset="copper-sweep" />
		<p class="flex items-baseline gap-2"><span class="text-4xl font-medium tracking-tight tabular-nums">${seats * 8}</span><span class="text-sm text-muted-foreground">a month, $8 per person</span></p>
	</div>
</Story>
