<!--
  The workspace settings page (app-blocks.md, phase 2): the name and the
  address in one form, then the destructive section below it. The address is
  "taken" as a scripted save failure; deleting asks the phase 8 way — the
  word Paperplane typed out, and a first try that fails with a reason. Since
  phase 3 the page runs the demo's fake load around both sections.
-->
<script lang="ts">
	import { enhance } from '$app/forms';
	import { beforeNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import ConfirmAction from '$brand/blocks/app/actions/confirm-action.svelte';
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
	import { Input } from '$brand/ui/input/index.js';
	import * as InputGroup from '$brand/ui/input-group/index.js';
	import { settingsTabs } from '$lib/settings-tabs.js';
	import { settingsForm, type FormResult } from '$lib/settings-form.svelte.js';
	import { workspaceSchema, type WorkspaceValues } from '$lib/settings-schemas.js';
	import { DemoLoad } from '$lib/demo-load.svelte.js';
	import {
		currentWorkspaceId,
		fakeRequest,
		workspaces,
	} from '@hmziq/brand-core/app/demo-data';
	import type { PageProps } from './$types';

	let { form: action }: PageProps = $props();
	const load = new DemoLoad(page.url.searchParams.get('state'));

	const workspace = workspaces.find(({ id }) => id === currentWorkspaceId)!;

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

	const form = settingsForm(workspaceSchema, {
		name: workspace.name,
		slug: workspace.address,
		...seed.values,
	}, { result: seed.result, saved: seed.saved });

	unsavedChanges(() => form.dirty);
	beforeNavigate((nav) => {
		if (form.dirty && !nav.willUnload && !confirm('Leave with unsaved changes?')) nav.cancel();
	});

	// The scripted delete (app-blocks.md, phase 8): the first try fails with a
	// reason; every later one works. Nothing is really deleted — the demo's
	// workspace is example data — so success is the toast and the page stays.
	let deleteTries = 0;
	async function deleteWorkspace(): Promise<FormResult> {
		deleteTries += 1;
		if (deleteTries === 1) {
			return { message: "We couldn't delete the workspace. Try again." };
		}
		return fakeRequest(undefined, { ms: 600 });
	}
</script>

{#snippet deleteTrigger(props: Record<string, unknown>)}
	<Button {...props} type="button" variant="destructive" class="shrink-0">
		Delete this workspace
	</Button>
{/snippet}

<AppPage width="narrow">
	<AppPageHeader
		title="Settings"
		description="The workspace's name and address."
		tabs={settingsTabs}
		currentPath={page.url.pathname}
		tabsLabel="Settings sections"
	/>

	<DataState status={load.status} loadingLabel="Loading settings" class="mt-8 flex flex-col gap-8">
		{#snippet loading()}
			<SkeletonSettings rows={2} />
			<SkeletonSettings rows={1} />
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
			title="Workspace"
			description="The name members see, and the address the workspace lives at."
		>
			<SettingRow
				label="Name"
				description="Shown in the sidebar and in emails."
				for="name"
				error={form.fieldError('name')}
			>
				<Input
					id="name"
					name="name"
					bind:value={form.values.name}
					aria-invalid={form.fieldError('name') ? true : undefined}
					aria-describedby="name-description name-error"
					onblur={() => form.blur('name')}
				/>
			</SettingRow>
			<SettingRow
				label="Address"
				description="Lowercase letters, numbers and dashes only."
				for="slug"
				error={form.fieldError('slug')}
			>
				<InputGroup.Root>
					<InputGroup.Addon>
						<InputGroup.Text>sightline.io/</InputGroup.Text>
					</InputGroup.Addon>
					<InputGroup.Input
						id="slug"
						name="slug"
						bind:value={form.values.slug}
						autocomplete="off"
						spellcheck={false}
						aria-invalid={form.fieldError('slug') ? true : undefined}
						aria-describedby="slug-description slug-error"
						onblur={() => form.blur('slug')}
					/>
				</InputGroup.Root>
			</SettingRow>
			{#snippet footer()}
				<FormActions
					dirty={form.dirty}
					pending={form.pending}
					saved={form.savedFlash}
					error={form.formError}
					submitLabel="Save changes"
				>
					{#snippet cancel()}
						<Button type="reset" variant="outline" onclick={() => form.restore()}>Cancel</Button>
					{/snippet}
				</FormActions>
				{/snippet}
		</SettingsSection>
		</form>

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
				<ConfirmAction
					trigger={deleteTrigger}
					title="Delete this workspace?"
					description="Events, dashboards and members go with it. This can't be undone."
					confirmLabel="Delete workspace"
					confirmText={workspace.name}
					onConfirm={deleteWorkspace}
					successMessage="Workspace deleted."
				/>
			</SettingRow>
		</SettingsSection>
	</DataState>
</AppPage>
