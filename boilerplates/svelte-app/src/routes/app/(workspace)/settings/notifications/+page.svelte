<!--
  The notifications settings page (app-blocks.md, phase 2): switches that save
  as soon as they change, each row showing its own save state. Saving on
  change needs JavaScript in both frameworks, so this page holds no form; the
  third switch fails its first change, as the plan scripts it. Since phase 3
  the page runs the demo's fake load around the section.
-->
<script lang="ts">
	import { page } from '$app/state';
	import SettingsSection from '$brand/blocks/app/settings/settings-section.svelte';
	import SettingRow from '$brand/blocks/app/settings/setting-row.svelte';
	import AppPage from '$brand/blocks/app/shell/app-page.svelte';
	import AppPageHeader from '$brand/blocks/app/shell/app-page-header.svelte';
	import DataState from '$brand/blocks/app/states/data-state.svelte';
	import ErrorState from '$brand/blocks/app/states/error-state.svelte';
	import SkeletonSettings from '$brand/blocks/app/states/skeleton-settings.svelte';
	import { Switch } from '$brand/ui/switch/index.js';
	import { settingsTabs } from '$lib/settings-tabs.js';
	import { DemoLoad } from '$lib/demo-load.svelte.js';
	import { fakeRequest, notificationPrefs } from '@hmziq/brand-core/app/demo-data';

	type RowStatus = 'idle' | 'saving' | 'saved' | 'error';
	type PrefId = keyof typeof notificationPrefs;

	const load = new DemoLoad(page.url.searchParams.get('state'));

	const prefs: { id: PrefId; label: string; description: string }[] = [
		{ id: 'weeklySummary', label: 'Weekly summary email', description: 'Every Monday, with the week’s numbers.' },
		{ id: 'memberJoins', label: 'When someone joins', description: 'One email for each person who accepts an invite.' },
		{ id: 'usageAt80', label: 'When usage passes 80%', description: 'A note before the plan runs out of events.' },
	];

	let values = $state({ ...notificationPrefs });
	let statuses = $state<Record<string, RowStatus>>({});
	// What the person chose, so "Try again" retries that and not the reverted state.
	let intent = $state<Record<string, boolean>>({});
	// The scripted failure fires once, on the first change of the third switch.
	let usageFailedOnce = $state(false);

	async function save(id: PrefId, next: boolean) {
		statuses[id] = 'saving';
		intent[id] = next;
		await fakeRequest(undefined, { ms: 600 });
		if (id === 'usageAt80' && !usageFailedOnce) {
			usageFailedOnce = true;
			// The control switches back, and the row says what to do.
			values[id] = !next;
			statuses[id] = 'error';
			return;
		}
		values[id] = next;
		statuses[id] = 'saved';
	}
</script>

<svelte:head>
	<title>Notifications — svelte-app</title>
</svelte:head>

<AppPage width="narrow">
	<AppPageHeader
		title="Settings"
		description="When Sightline emails you."
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
		<SettingsSection
			title="Notifications"
			description="Email about the workspace, sent to your address."
		>
			{#each prefs as pref (pref.id)}
				<SettingRow
					label={pref.label}
					description={pref.description}
					for={pref.id}
					orientation="horizontal"
					status={statuses[pref.id] ?? 'idle'}
					onRetry={() => save(pref.id, intent[pref.id] ?? values[pref.id])}
				>
					<Switch
						id={pref.id}
						name={pref.id}
						bind:checked={values[pref.id]}
						onCheckedChange={(next) => save(pref.id, next)}
						aria-describedby={`${pref.id}-description`}
					/>
				</SettingRow>
			{/each}
		</SettingsSection>
	</DataState>
</AppPage>
