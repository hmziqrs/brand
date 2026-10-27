<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import RollingNumber from './rolling-number.svelte'
	import MaterialSlider from './material-slider.svelte'
	import { Button } from '$brand/ui/button/index.js'

	const { Story } = defineMeta({
		title: 'Custom/Rolling number',
		component: RollingNumber,
		parameters: { layout: 'centered' },
		args: { value: 1240 },
		argTypes: {
			value: { description: 'Number to show; it rolls when the value changes.' },
		},
	})
</script>

<script lang="ts">
	let seats = $state(12)
	let count = $state(1240)
</script>

<Story name="Price" asChild>
	<div class="flex max-w-md flex-col gap-4 rounded-xl p-6 ring-1 ring-foreground/10">
		<div class="flex items-baseline justify-between text-sm"><span class="text-muted-foreground">People on your team</span><RollingNumber value={seats} class="font-medium" /></div>
		<MaterialSlider label="People on your team" bind:value={seats} min={1} max={50} preset="copper-sweep" />
		<p class="flex items-baseline gap-2"><RollingNumber value={seats * 8} format={{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 }} class="text-5xl font-medium tracking-tight" /><span class="text-sm text-muted-foreground">a month</span></p>
	</div>
</Story>

<Story name="Counter" asChild>
	<div class="flex items-center gap-6">
		<RollingNumber value={count} class="text-6xl font-medium tracking-[-0.04em]" />
		<div class="flex gap-2">
			<Button variant="outline" onclick={() => (count -= 37)}>−37</Button>
			<Button variant="outline" onclick={() => (count += 128)}>+128</Button>
		</div>
	</div>
</Story>
