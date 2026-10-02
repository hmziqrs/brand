<!--
  The profile settings page (app-blocks.md, phase 2): one form around one
  SettingsSection, posted to the page's action with use:enhance. The page owns
  the form element and the submit; the section and its rows only lay out and
  link things. Validation runs on blur from the same zod schema the action
  runs, and the name "fail" is the scripted save failure. Since phase 3 the
  page runs the demo's fake load around the form, so state=pending shows the
  settings skeleton and state=error the ErrorState.
-->
<script lang="ts">
	import { enhance } from '$app/forms';
	import { beforeNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import Notice from '$brand/components/notice.svelte';
	import FormActions from '$brand/blocks/app/settings/form-actions.svelte';
	import SettingsSection from '$brand/blocks/app/settings/settings-section.svelte';
	import SettingRow from '$brand/blocks/app/settings/setting-row.svelte';
	import AppPage from '$brand/blocks/app/shell/app-page.svelte';
	import AppPageHeader from '$brand/blocks/app/shell/app-page-header.svelte';
	import DataState from '$brand/blocks/app/states/data-state.svelte';
	import ErrorState from '$brand/blocks/app/states/error-state.svelte';
	import SkeletonSettings from '$brand/blocks/app/states/skeleton-settings.svelte';
	import { unsavedChanges } from '$brand/blocks/app/state.svelte.js';
	import { Button } from '$brand/ui/button/index.js';
	import Combobox from '$brand/ui/combobox/combobox.svelte';
	import { Input } from '$brand/ui/input/index.js';
	import { settingsTabs } from '$lib/settings-tabs.js';
	import { settingsForm, type FormResult } from '$lib/settings-form.svelte.js';
	import { profileSchema, type ProfileValues } from '$lib/settings-schemas.js';
	import { DemoLoad } from '$lib/demo-load.svelte.js';
	import { currentUser, timeZones } from '@hmziq/brand-core/app/demo-data';
	import type { PageProps } from './$types';

	let { form: action }: PageProps = $props();
	const load = new DemoLoad(page.url.searchParams.get('state'));

	// What a post with no JavaScript sent back, read once while the page sets
	// up: the fields keep what was typed, and the result shows as it would
	// after a JavaScript save. With JavaScript the enhance callback owns this.
	function seeded(): { values: Record<string, string>; result: FormResult; saved: boolean } {
		if (!action) return { values: {}, result: undefined, saved: false };
		const result: FormResult =
			'message' in action.form
				? {
						message: action.form.message,
						field: 'field' in action.form ? (action.form.field as string | undefined) : undefined,
					}
				: undefined;
		return { values: action.values, result, saved: 'ok' in action.form };
	}
	const seed = seeded();

	const form = settingsForm(profileSchema, {
		name: currentUser.name,
		email: currentUser.email,
		timeZone: currentUser.timeZone,
		...seed.values,
	}, { result: seed.result, saved: seed.saved });

	// Changing the email is a two-step thing, so the page says what happens next.
	const emailChanging = $derived(form.values.email !== form.saved.email);

	// The unsaved-changes warning: the browser asks on reload, SvelteKit asks
	// before an in-app link takes the changes away.
	unsavedChanges(() => form.dirty);
	beforeNavigate((nav) => {
		if (form.dirty && !nav.willUnload && !confirm('Leave with unsaved changes?')) nav.cancel();
	});
</script>

<svelte:head>
	<title>Profile — svelte-app</title>
</svelte:head>

<AppPage width="narrow">
	<AppPageHeader
		title="Settings"
		description="Your name, email and time zone."
		tabs={settingsTabs}
		currentPath={page.url.pathname}
		tabsLabel="Settings sections"
	/>

	<DataState status={load.status} loadingLabel="Loading settings" class="mt-8">
		{#snippet loading()}
			<SkeletonSettings rows={3} />
		{/snippet}
		{#snippet error()}
			<ErrorState kind={load.kind} onRetry={load.load} />
		{/snippet}
		<form
			method="POST"
			action="?/save"
			aria-busy={form.pending || undefined}
			use:enhance={() => {
			form.markSubmitted();
			if (!form.valid()) {
				form.focusFirstInvalid();
				return async () => {};
			}
			form.pending = true;
			return async ({ result }) => {
				if (result.type === 'failure' || result.type === 'success') {
					const body = result.data as { form?: { message?: string; field?: string; ok?: boolean } };
					if (body?.form?.ok) form.applyResult(undefined, form.values);
					else if (body?.form) {
						form.applyResult(
							{ message: body.form.message ?? "We couldn't save your changes. Try again.", field: body.form.field },
							form.values,
						);
						form.focusFirstInvalid();
					}
				}
			};
		}}
	>
		<SettingsSection
			title="Profile"
			description="How you appear in the workspace, and when Sightline counts your day from."
		>
			<SettingRow
				label="Name"
				description="Shown next to anything you change."
				for="name"
				error={form.fieldError('name')}
			>
				<Input
					id="name"
					name="name"
					bind:value={form.values.name}
					autocomplete="name"
					aria-invalid={form.fieldError('name') ? true : undefined}
					aria-describedby="name-description name-error"
					onblur={() => form.blur('name')}
				/>
			</SettingRow>
			<SettingRow
				label="Email"
				description="Where sign-ins and notices go."
				for="email"
				error={form.fieldError('email')}
			>
				<Input
					id="email"
					name="email"
					type="email"
					bind:value={form.values.email}
					autocomplete="email"
					aria-invalid={form.fieldError('email') ? true : undefined}
					aria-describedby="email-description email-error"
					onblur={() => form.blur('email')}
				/>
			</SettingRow>
			{#if emailChanging}
				<div class="px-4 py-4 sm:px-6">
					<Notice tone="info" title="We'll send a link to the new address. The change happens when you open it." />
				</div>
			{/if}
			<SettingRow
				label="Time zone"
				description="Dates and times show in your zone."
				for="timeZone"
				error={form.fieldError('timeZone')}
			>
				<input type="hidden" name="timeZone" value={form.values.timeZone} />
				<Combobox
					id="timeZone"
					label="Time zone"
					options={timeZones}
					value={form.values.timeZone}
					onValueChange={(next) => (form.values.timeZone = next)}
					placeholder="Pick a time zone"
					invalid={form.fieldError('timeZone') ? true : false}
					describedBy="timeZone-description timeZone-error"
				/>
			</SettingRow>
			{#snippet footer()}
				<FormActions
					dirty={form.dirty}
					pending={form.pending}
					saved={form.savedFlash}
					error={form.formError}
					submitLabel="Save changes"
				>
					{#snippet cancel(disabled: boolean)}
						<Button type="reset" variant="outline" {disabled} onclick={() => form.restore()}>Cancel</Button>
					{/snippet}
				</FormActions>
			{/snippet}
				</SettingsSection>
		</form>
	</DataState>
</AppPage>
