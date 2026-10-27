<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Combobox from './combobox.svelte'

	const { Story } = defineMeta({
		title: 'App/Combobox',
		component: Combobox,
		parameters: { layout: 'centered' },
	})
</script>

<script lang="ts">
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

<Story
	name="Default"
	asChild
	parameters={{
		docs: {
			description: {
				story: 'A searchable picker for one value out of many: a slice of the time zones the settings page picks from.',
			},
		},
	}}
>
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

<Story
	name="Empty"
	asChild
	parameters={{
		docs: {
			description: { story: 'Nothing picked yet, so the placeholder shows.' },
		},
	}}
>
	<div class="w-72">
		<Combobox label="Time zone" options={timeZones} placeholder="Pick a time zone" />
	</div>
</Story>

<Story
	name="Invalid"
	asChild
	parameters={{
		docs: {
			description: { story: 'A field the server refused: the invalid ring, no movement.' },
		},
	}}
>
	<div class="w-72">
		<Combobox label="Time zone" options={timeZones} invalid placeholder="Pick a time zone" />
	</div>
</Story>
