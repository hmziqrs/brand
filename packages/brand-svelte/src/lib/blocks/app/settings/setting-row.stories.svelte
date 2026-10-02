<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import SettingRow from './setting-row.svelte'

	const { Story } = defineMeta({ title: 'App/Settings', component: SettingRow })
</script>

<script lang="ts">
	import { Input } from '$brand/ui/input/index.js'
	import { Switch } from '$brand/ui/switch/index.js'

	let weekly = $state(true)
	let retried = $state(false)
</script>

{#snippet nameInput()}
	<Input id="story-name" name="name" value="Maya Fernandes" aria-describedby="story-name-description" />
{/snippet}

{#snippet weeklySwitch()}
	<Switch id="story-weekly" name="weekly" bind:checked={weekly} aria-describedby="story-weekly-description" />
{/snippet}

<!-- A text field: the label above, the description under the control. -->
<Story name="Row" asChild>
	<div class="max-w-md bg-background">
		<SettingRow label="Name" description="Shown next to anything you change." for="story-name">
			{@render nameInput()}
		</SettingRow>
	</div>
</Story>

<!-- A switch: the label and description on the left, the control on the right. -->
<Story name="Row, horizontal" asChild>
	<div class="max-w-2xl bg-background">
		<SettingRow
			label="Weekly summary email"
			description="Every Monday, with the week’s numbers."
			for="story-weekly"
			orientation="horizontal"
		>
			{@render weeklySwitch()}
		</SettingRow>
	</div>
</Story>

<!-- A field the server refused, with its error under the control. -->
<Story name="Row, with error" asChild>
	<div class="max-w-md bg-background">
		<SettingRow
			label="Name"
			description="Shown next to anything you change."
			for="story-name-error"
			error="Enter a name."
		>
			<Input
				id="story-name-error"
				name="name"
				value=""
				aria-invalid={true}
				aria-describedby="story-name-error-description story-name-error-error"
			/>
		</SettingRow>
	</div>
</Story>

<!-- A control saving as soon as it changed: the spinner beside it. -->
<Story name="Row, saving" asChild>
	<div class="max-w-2xl bg-background">
		<SettingRow
			label="Weekly summary email"
			description="Every Monday, with the week’s numbers."
			for="story-saving"
			orientation="horizontal"
			status="saving"
		>
			<Switch id="story-saving" name="weekly" checked={true} aria-describedby="story-saving-description" />
		</SettingRow>
	</div>
</Story>

<!-- The save landed: "Saved" for two seconds. -->
<Story name="Row, saved" asChild>
	<div class="max-w-2xl bg-background">
		<SettingRow
			label="Weekly summary email"
			description="Every Monday, with the week’s numbers."
			for="story-saved"
			orientation="horizontal"
			status="saved"
		>
			<Switch id="story-saved" name="weekly" checked={true} aria-describedby="story-saved-description" />
		</SettingRow>
	</div>
</Story>

<!-- The save failed: the control back where it was, and a way to try again. -->
<Story name="Row, save error" asChild>
	<div class="max-w-2xl bg-background">
		<SettingRow
			label="Weekly summary email"
			description="Every Monday, with the week’s numbers."
			for="story-save-error"
			orientation="horizontal"
			status="error"
			onRetry={() => (retried = true)}
		>
			<Switch id="story-save-error" name="weekly" checked={false} aria-describedby="story-save-error-description" />
		</SettingRow>
	</div>
</Story>
