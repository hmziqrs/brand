<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Combobox from './combobox.svelte'

	const { Story } = defineMeta({ title: 'App/Combobox', component: Combobox })
</script>

<script lang="ts">
	// A slice of the time zones the settings page picks from, so the story
	// stands for the real use: many options, a searchable list.
	const timeZones = [
		{ value: 'utc', label: 'UTC — Coordinated Universal Time' },
		{ value: 'europe/belgrade', label: 'Belgrade' },
		{ value: 'europe/berlin', label: 'Berlin' },
		{ value: 'europe/london', label: 'London' },
		{ value: 'europe/paris', label: 'Paris' },
		{ value: 'america/new_york', label: 'New York' },
		{ value: 'america/los_angeles', label: 'Los Angeles' },
		{ value: 'asia/tokyo', label: 'Tokyo' },
	]

	let zone = $state('europe/belgrade')
</script>

<!-- A searchable picker for one value out of many. -->
<Story name="Default" asChild>
	<div class="w-72">
		<Combobox
			label="Time zone"
			options={timeZones}
			value={zone}
			onValueChange={(v) => (zone = v)}
		/>
		<p class="text-sm text-muted-foreground mt-3">Picked: {zone}</p>
	</div>
</Story>

<!-- Nothing picked yet, so the placeholder shows. -->
<Story name="Empty" asChild>
	<div class="w-72">
		<Combobox label="Time zone" options={timeZones} placeholder="Pick a time zone" />
	</div>
</Story>

<!-- A field the server refused: the invalid ring, no movement. -->
<Story name="Invalid" asChild>
	<div class="w-72">
		<Combobox label="Time zone" options={timeZones} invalid placeholder="Pick a time zone" />
	</div>
</Story>
