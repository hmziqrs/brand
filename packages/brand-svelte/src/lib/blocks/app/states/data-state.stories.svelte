<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import DataState from './data-state.svelte'

	const { Story } = defineMeta({
		title: 'App/States',
		component: DataState,
		parameters: { layout: 'padded' },
	})
</script>

<script lang="ts">
	import SkeletonDetails from './skeleton-details.svelte'
	import SkeletonSettings from './skeleton-settings.svelte'
	import SkeletonStats from './skeleton-stats.svelte'
	import SkeletonTable from './skeleton-table.svelte'
	import SkeletonText from './skeleton-text.svelte'
	import EmptyState from './empty-state.svelte'
	import ErrorState from './error-state.svelte'
	import SettingsSection from '../settings/settings-section.svelte'
	import SettingRow from '../settings/setting-row.svelte'
	import * as Table from '$brand/ui/table/index.js'

	// The rows every skeleton story stands against, from the demo's data.
	const tableRows = [
		['Ada Lovelace', 'Admin', 'Active', '2 days ago'],
		['Grace Hopper', 'Member', 'Active', '5 hours ago'],
		['Katherine Johnson', 'Viewer', 'Invited', '—'],
		['Edsger Dijkstra', 'Member', 'Suspended', '3 weeks ago'],
		['Barbara Liskov', 'Owner', 'Active', 'just now'],
	]

	// A story can't flip the OS's reduced-motion setting from inside the
	// browser, so this asserts the mechanism instead: every pulse carries
	// motion-reduce:animate-none. (The real media query is checked outside
	// Storybook, with Playwright's emulation.)
	function checkReducedMotion({ canvasElement }: { canvasElement: HTMLElement }) {
		const pulses = canvasElement.querySelectorAll('[data-slot="skeleton"]')
		for (const el of pulses) {
			if (!el.className.includes('motion-reduce:animate-none')) {
				throw new Error(`a skeleton pulses without motion-reduce:animate-none: ${el.className}`)
			}
		}
	}
</script>

{#snippet loadingSkeleton()}
	<SkeletonText lines={3} />
{/snippet}

{#snippet errorBlock()}
	<ErrorState size="section" onRetry={() => {}} />
{/snippet}

{#snippet emptyBlock()}
	<EmptyState size="section" title="Nothing here yet" description="What arrives fills this space." />
{/snippet}

{#snippet textContent()}
	<p class="text-sm leading-relaxed">
		Members are everyone who can see this workspace. Owners and admins invite people and change
		what they can see; members add their own reports; viewers read them. Invite links expire after
		seven days.
	</p>
{/snippet}

{#snippet stat(label: string, value: string, hint: string)}
	<div class="flex flex-col gap-1 bg-background px-4 py-4">
		<dt class="text-sm text-muted-foreground">{label}</dt>
		<dd class="text-2xl font-medium tracking-[-0.02em]">{value}</dd>
		<dd class="text-sm text-muted-foreground">{hint}</dd>
	</div>
{/snippet}

{#snippet plainRow(label: string)}
	<SettingRow {label} description="A description of the setting.">
		<div class="h-9 w-full max-w-72 rounded-md border border-border"></div>
	</SettingRow>
{/snippet}

<!-- Pending: the skeleton, once the delay has passed (nothing for fast loads). -->
<Story name="Data, pending" asChild>
	<div class="flex min-h-72 flex-col bg-background">
		<DataState status="pending" loadingLabel="Loading members" loading={loadingSkeleton} error={errorBlock}>
			{@render textContent()}
		</DataState>
	</div>
</Story>

<!-- The load failed. -->
<Story name="Data, error" asChild>
	<div class="flex min-h-72 flex-col bg-background">
		<DataState status="error" loadingLabel="Loading members" loading={loadingSkeleton} error={errorBlock}>
			{@render textContent()}
		</DataState>
	</div>
</Story>

<!-- It arrived, and there was nothing in it. -->
<Story name="Data, empty" asChild>
	<div class="flex min-h-72 flex-col bg-background">
		<DataState
			status="success"
			isEmpty
			loadingLabel="Loading members"
			loading={loadingSkeleton}
			error={errorBlock}
			empty={emptyBlock}
		>
			{@render textContent()}
		</DataState>
	</div>
</Story>

<!-- It arrived. -->
<Story name="Data, success" asChild>
	<div class="bg-background">
		<DataState status="success" loadingLabel="Loading members" loading={loadingSkeleton} error={errorBlock}>
			{@render textContent()}
		</DataState>
	</div>
</Story>

<!-- Each skeleton beside the real content it stands for: text. -->
<Story name="Skeleton text" asChild>
	<div class="grid gap-8 bg-background md:grid-cols-2">
		<div class="flex flex-col gap-2.5">
			<p class="text-sm font-medium">Content</p>
			{@render textContent()}
		</div>
		<div class="flex flex-col gap-2.5">
			<p class="text-sm font-medium">Skeleton</p>
			<SkeletonText lines={3} />
		</div>
	</div>
</Story>

<!-- Each skeleton beside the real content it stands for: the table. -->
<Story name="Skeleton table" asChild>
	<div class="grid gap-8 bg-background md:grid-cols-2">
		<div class="flex flex-col gap-2.5">
			<p class="text-sm font-medium">Content</p>
			<Table.Root>
				<Table.Header>
					<Table.Row>
						{#each ['Member', 'Role', 'Status', 'Last active'] as heading (heading)}
							<Table.Head>{heading}</Table.Head>
						{/each}
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each tableRows as row (row[0])}
						<Table.Row>
							{#each row as cell (cell)}
								<Table.Cell>{cell}</Table.Cell>
							{/each}
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</div>
		<div class="flex flex-col gap-2.5">
			<p class="text-sm font-medium">Skeleton</p>
			<SkeletonTable rows={5} columns={['40%', '20%', '20%', '20%']} />
		</div>
	</div>
</Story>

<!-- Each skeleton beside the real content it stands for: stat cards. -->
<Story name="Skeleton stats" asChild>
	<div class="grid gap-8 bg-background md:grid-cols-2">
		<div class="flex flex-col gap-2.5">
			<p class="text-sm font-medium">Content</p>
			<dl class="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
				{@render stat('Visitors', '48,210', '+12%')}
				{@render stat('Sign-ups', '1,024', '+8%')}
				{@render stat('Bounce rate', '23.4%', '−1.2%')}
				{@render stat('Page load', '1.2 s', '−0.1 s')}
			</dl>
		</div>
		<div class="flex flex-col gap-2.5">
			<p class="text-sm font-medium">Skeleton</p>
			<SkeletonStats count={4} />
		</div>
	</div>
</Story>

<!-- Each skeleton beside the real content it stands for: a detail list. -->
<Story name="Skeleton details" asChild>
	<div class="grid gap-8 bg-background md:grid-cols-2">
		<div class="flex flex-col gap-2.5">
			<p class="text-sm font-medium">Content</p>
			<dl class="flex flex-col divide-y divide-border">
				{#each [['Name', 'Ada Lovelace'], ['Email', 'ada@paperplane.app'], ['Role', 'Admin'], ['Joined', '12 March 2024']] as [label, value] (label)}
					<!-- DetailList's own row classes, so the mock beside the
					     skeleton stacks below sm the way both really do. -->
					<div class="flex flex-col gap-1 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
						<dt class="w-40 shrink-0 text-sm text-muted-foreground">{label}</dt>
						<dd class="text-sm">{value}</dd>
					</div>
				{/each}
			</dl>
		</div>
		<div class="flex flex-col gap-2.5">
			<p class="text-sm font-medium">Skeleton</p>
			<SkeletonDetails rows={4} />
		</div>
	</div>
</Story>

<!-- Each skeleton beside the real content it stands for: a settings section. -->
<Story name="Skeleton settings" asChild>
	<div class="grid gap-8 bg-background lg:grid-cols-2">
		<div class="flex flex-col gap-2.5">
			<p class="text-sm font-medium">Content</p>
			<SettingsSection title="Profile" description="How you appear in the workspace.">
				{@render plainRow('Name')}
				{@render plainRow('Email')}
				{@render plainRow('Time zone')}
			</SettingsSection>
		</div>
		<div class="flex flex-col gap-2.5">
			<p class="text-sm font-medium">Skeleton</p>
			<!-- This section's copy fits one line at every width, so its
			     description pair says so. -->
			<SkeletonSettings rows={3} description={[1, 1]} />
		</div>
	</div>
</Story>

<!-- Reduced motion: every pulse carries motion-reduce:animate-none, so
     visitors who ask for still get still. -->
<Story name="Reduced motion" play={checkReducedMotion} asChild>
	<div class="flex flex-col gap-8 bg-background">
		<SkeletonText lines={2} />
		<SkeletonStats count={2} />
		<SkeletonTable rows={2} columns={['50%', '25%', '25%']} />
	</div>
</Story>
