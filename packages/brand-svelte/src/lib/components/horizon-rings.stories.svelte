<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import HorizonRings from './horizon-rings.svelte'
	import { Switch } from '$brand/ui/switch/index.js'

	const { Story } = defineMeta({
		title: 'Custom/Horizon rings',
		component: HorizonRings,
		parameters: { layout: 'centered' },
	})
</script>

<script lang="ts">
	let awake = $state(true)
</script>

<Story name="Awake" asChild>
	<div class="max-w-xl"><HorizonRings seed="oxiwake" /></div>
</Story>

<Story name="Asleep" asChild>
	<div class="max-w-xl"><HorizonRings seed="oxiwake" awake={false} /></div>
</Story>

<Story name="Ripple" asChild>
	<div class="max-w-xl"><HorizonRings seed="oxiwake" ripple /></div>
</Story>

<Story name="Switch" asChild>
	<div class="flex max-w-xl flex-col gap-4 rounded-xl border p-6">
		<HorizonRings seed="oxiwake" {awake} ripple />
		<label class="flex items-center gap-3 text-sm"><Switch bind:checked={awake} />{awake ? 'Staying awake' : 'Free to sleep'}</label>
	</div>
</Story>
