<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import HorizonRings from './horizon-rings.svelte'
	import { Switch } from '$brand/ui/switch/index.js'

	const { Story } = defineMeta({
		title: 'Custom/Horizon rings',
		component: HorizonRings,
	})
</script>

<script lang="ts">
	let awake = $state(true)
</script>

<!-- Half rings rising from a horizon around a sun in the accent color. -->
<Story name="Awake" asChild>
	<div class="max-w-xl"><HorizonRings seed="oxiwake" /></div>
</Story>

<!-- Asleep: the sun goes out and a few stars come up. Only colors change. -->
<Story name="Asleep" asChild>
	<div class="max-w-xl"><HorizonRings seed="oxiwake" awake={false} /></div>
</Story>

<!-- Light runs out through the rings every few seconds while awake. -->
<Story name="Ripple" asChild>
	<div class="max-w-xl"><HorizonRings seed="oxiwake" ripple /></div>
</Story>

<!-- Switch it: the picture follows the state. -->
<Story name="Switch" asChild>
	<div class="flex max-w-xl flex-col gap-4 rounded-xl border p-6">
		<HorizonRings seed="oxiwake" {awake} ripple />
		<label class="flex items-center gap-3 text-sm"><Switch bind:checked={awake} />{awake ? 'Staying awake' : 'Free to sleep'}</label>
	</div>
</Story>
