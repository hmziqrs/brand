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

	let name = $state('Maya Fernandes')
	let savedName = $state('Maya Fernandes')
	let weekly = $state(true)
	const dirty = $derived(name !== savedName)

	function restore() {
		name = savedName
	}
</script>

{#snippet nameField(id: string)}
	<Input {id} name="name" bind:value={name} aria-describedby={`${id}-description`} />
{/snippet}

{#snippet weeklySwitch(id: string)}
	<Switch {id} name="weekly" bind:checked={weekly} aria-describedby={`${id}-description`} />
{/snippet}

{#snippet cancelButton(disabled: boolean)}
	<Button type="reset" variant="outline" {disabled} onclick={restore}>Cancel</Button>
{/snippet}

<Story name="Section" asChild>
	<div class="bg-background">
		<SettingsSection
			title="Profile"
			description="How you appear in the workspace, and when Sightline counts your day from."
		>
			<SettingRow label="Name" description="Shown next to anything you change." for="section-name">
				{@render nameField('section-name')}
			</SettingRow>
			<SettingRow
				label="Weekly summary email"
				description="Every Monday, with the week’s numbers."
				for="section-weekly"
				orientation="horizontal"
			>
				{@render weeklySwitch('section-weekly')}
			</SettingRow>
		</SettingsSection>
	</div>
</Story>

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

<Story name="Form, clean" asChild>
	<div class="bg-background">
		<form onsubmit={(event) => event.preventDefault()} class="flex flex-col gap-8">
			<SettingsSection title="Profile" description="How you appear in the workspace.">
				<SettingRow label="Name" description="Shown next to anything you change." for="form-clean-name">
					{@render nameField('form-clean-name')}
				</SettingRow>
			</SettingsSection>
			<FormActions {dirty} pending={false} cancel={cancelButton} />
		</form>
	</div>
</Story>

<Story name="Form, dirty" asChild>
	<div class="bg-background">
		<form onsubmit={(event) => event.preventDefault()} class="flex flex-col gap-8">
			<SettingsSection title="Profile" description="How you appear in the workspace.">
				<SettingRow label="Name" description="Shown next to anything you change." for="form-dirty-name">
					<Input id="form-dirty-name" name="name" value="Maya F." aria-describedby="form-dirty-name-description" />
				</SettingRow>
			</SettingsSection>
			<FormActions {dirty} pending={false} cancel={cancelButton} submitLabel="Save changes" />
		</form>
	</div>
</Story>

<Story name="Form, saving" asChild>
	<div class="bg-background">
		<form onsubmit={(event) => event.preventDefault()} class="flex flex-col gap-8">
			<SettingsSection title="Profile" description="How you appear in the workspace.">
				<SettingRow label="Name" description="Shown next to anything you change." for="form-saving-name">
					<Input id="form-saving-name" name="name" value="Maya F." aria-describedby="form-saving-name-description" />
				</SettingRow>
			</SettingsSection>
			<FormActions dirty={true} pending={true} cancel={cancelButton} />
		</form>
	</div>
</Story>

<Story name="Form, saved" asChild>
	<div class="bg-background">
		<form onsubmit={(event) => event.preventDefault()} class="flex flex-col gap-8">
			<SettingsSection title="Profile" description="How you appear in the workspace.">
				<SettingRow label="Name" description="Shown next to anything you change." for="form-saved-name">
					<Input id="form-saved-name" name="name" value="Maya F." aria-describedby="form-saved-name-description" />
				</SettingRow>
			</SettingsSection>
			<FormActions dirty={false} pending={false} saved={true} />
		</form>
	</div>
</Story>

<Story name="Form, error" asChild>
	<div class="bg-background">
		<form onsubmit={(event) => event.preventDefault()} class="flex flex-col gap-8">
			<SettingsSection title="Profile" description="How you appear in the workspace.">
				<SettingRow label="Name" description="Shown next to anything you change." for="form-error-name">
					<Input id="form-error-name" name="name" value="Maya F." aria-describedby="form-error-name-description" />
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

<Story name="Section, mobile" parameters={{ viewport: { defaultViewport: 'phone360' } }} asChild>
	<div class="bg-background">
		<SettingsSection
			title="Profile"
			description="How you appear in the workspace, and when Sightline counts your day from."
		>
			<SettingRow label="Name" description="Shown next to anything you change." for="section-mobile-name">
				{@render nameField('section-mobile-name')}
			</SettingRow>
			<SettingRow
				label="Weekly summary email"
				description="Every Monday, with the week’s numbers."
				for="section-mobile-weekly"
				orientation="horizontal"
			>
				{@render weeklySwitch('section-mobile-weekly')}
			</SettingRow>
		</SettingsSection>
	</div>
</Story>
