<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import SettingsSection from './settings-section.svelte'

	const { Story } = defineMeta({
		title: 'App/Settings',
		component: SettingsSection,
		parameters: { layout: 'padded' },
	})
</script>

<script lang="ts">
	import SettingRow from './setting-row.svelte'
	import FormActions from './form-actions.svelte'
	import { Input } from '$brand/ui/input/index.js'
	import { Switch } from '$brand/ui/switch/index.js'
	import { Button } from '$brand/ui/button/index.js'

	// The story's own little form state, so the actions can be shown in each
	// of their states without posting anywhere.
	let name = $state('Maya Fernandes')
	let savedName = $state('Maya Fernandes')
	let weekly = $state(true)
	const dirty = $derived(name !== savedName)

	function restore() {
		name = savedName
	}
</script>

{#snippet nameField()}
	<Input id="name" name="name" bind:value={name} aria-describedby="name-description" />
{/snippet}

{#snippet weeklySwitch()}
	<Switch id="weekly" name="weekly" bind:checked={weekly} aria-describedby="weekly-description" />
{/snippet}

{#snippet cancelButton()}
	<Button type="reset" variant="outline" onclick={restore}>Cancel</Button>
{/snippet}

<!-- A settings section: title and description beside the rows, from lg. -->
<Story name="Section" asChild>
	<div class="bg-background">
		<SettingsSection
			title="Profile"
			description="How you appear in the workspace, and when Sightline counts your day from."
		>
			<SettingRow label="Name" description="Shown next to anything you change." for="name">
				{nameField}
			</SettingRow>
			<SettingRow
				label="Weekly summary email"
				description="Every Monday, with the week’s numbers."
				for="weekly"
				orientation="horizontal"
			>
				{weeklySwitch}
			</SettingRow>
		</SettingsSection>
	</div>
</Story>

<!-- The destructive outline, for the section that removes things. -->
<Story name="Destructive section" asChild>
	<div class="bg-background">
		<SettingsSection
			tone="destructive"
			title="Delete this workspace"
			description="Events, dashboards and members go with it. This can't be undone."
		>
			<SettingRow
				label="Deleting can't be undone"
				description="You'd need to create a new workspace to use Sightline again."
				orientation="horizontal"
			>
				<Button type="button" variant="destructive">Delete this workspace</Button>
			</SettingRow>
		</SettingsSection>
	</div>
</Story>

<!-- A whole form with nothing changed: Save waits, Cancel stays out of sight. -->
<Story name="Form, clean" asChild>
	<div class="bg-background">
		<form onsubmit={(event) => event.preventDefault()} class="flex flex-col gap-8">
			<SettingsSection title="Profile" description="How you appear in the workspace.">
				<SettingRow label="Name" description="Shown next to anything you change." for="name">
					{nameField}
				</SettingRow>
			</SettingsSection>
			<FormActions {dirty} pending={false} cancel={cancelButton} />
		</form>
	</div>
</Story>

<!-- The same form after a change: the warning line, and both buttons live. -->
<Story name="Form, dirty" asChild>
	<div class="bg-background">
		<form onsubmit={(event) => event.preventDefault()} class="flex flex-col gap-8">
			<SettingsSection title="Profile" description="How you appear in the workspace.">
				<SettingRow label="Name" description="Shown next to anything you change." for="name">
					<Input id="name" name="name" value="Maya F." aria-describedby="name-description" />
				</SettingRow>
			</SettingsSection>
			<FormActions {dirty} pending={false} cancel={cancelButton} submitLabel="Save changes" />
		</form>
	</div>
</Story>

<!-- While the save runs: a spinner in Save, everything held still. -->
<Story name="Form, saving" asChild>
	<div class="bg-background">
		<form onsubmit={(event) => event.preventDefault()} class="flex flex-col gap-8">
			<SettingsSection title="Profile" description="How you appear in the workspace.">
				<SettingRow label="Name" description="Shown next to anything you change." for="name">
					<Input id="name" name="name" value="Maya F." aria-describedby="name-description" />
				</SettingRow>
			</SettingsSection>
			<FormActions dirty={true} pending={true} cancel={cancelButton} />
		</form>
	</div>
</Story>

<!-- The save landed: "Saved" for four seconds, then the row goes quiet. -->
<Story name="Form, saved" asChild>
	<div class="bg-background">
		<form onsubmit={(event) => event.preventDefault()} class="flex flex-col gap-8">
			<SettingsSection title="Profile" description="How you appear in the workspace.">
				<SettingRow label="Name" description="Shown next to anything you change." for="name">
					<Input id="name" name="name" value="Maya F." aria-describedby="name-description" />
				</SettingRow>
			</SettingsSection>
			<FormActions dirty={false} pending={false} saved={true} />
		</form>
	</div>
</Story>

<!-- The server refused the save: the reason sits above the buttons. -->
<Story name="Form, error" asChild>
	<div class="bg-background">
		<form onsubmit={(event) => event.preventDefault()} class="flex flex-col gap-8">
			<SettingsSection title="Profile" description="How you appear in the workspace.">
				<SettingRow label="Name" description="Shown next to anything you change." for="name">
					<Input id="name" name="name" value="Maya F." aria-describedby="name-description" />
				</SettingRow>
			</SettingsSection>
			<FormActions
				dirty={true}
				pending={false}
				cancel={cancelButton}
				error="We couldn't save your changes. Try again."
			/>
		</form>
	</div>
</Story>

<!-- At 360px the panel takes the whole width under its title. -->
<Story name="Section, mobile" parameters={{ viewport: { defaultViewport: 'phone360' } }} asChild>
	<div class="bg-background">
		<SettingsSection
			title="Profile"
			description="How you appear in the workspace, and when Sightline counts your day from."
		>
			<SettingRow label="Name" description="Shown next to anything you change." for="name">
				{nameField}
			</SettingRow>
			<SettingRow
				label="Weekly summary email"
				description="Every Monday, with the week’s numbers."
				for="weekly"
				orientation="horizontal"
			>
				{weeklySwitch}
			</SettingRow>
		</SettingsSection>
	</div>
</Story>
