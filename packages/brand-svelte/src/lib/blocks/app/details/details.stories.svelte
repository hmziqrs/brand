<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import DetailList from './detail-list.svelte'

	const { Story } = defineMeta({
		title: 'App/Details',
		component: DetailList,
		parameters: { layout: 'padded' },
	})
</script>

<script lang="ts">
	import DetailSection from './detail-section.svelte'
	import DataState from '../states/data-state.svelte'
	import ErrorState from '../states/error-state.svelte'
	import SkeletonDetails from '../states/skeleton-details.svelte'
	import Tag from '$brand/components/tag.svelte'
	import { Button } from '$brand/ui/button/index.js'
	import { memberById, members } from '@hmziq/brand-core/app/demo-data'

	// The demo's members, so the stories and the svelte-app demo tell the
	// same story. Dates are written out the way the demo pages format them.
	const ada = memberById('usr_06') ?? members[0]
	const maya = memberById('usr_01') ?? members[0]

	const profile = [
		{ label: 'Name', value: ada.name },
		{ label: 'Email', value: ada.email },
		{ label: 'Role', value: ada.role },
		{ label: 'Joined', value: '8 April 2025' },
	]
</script>

{#snippet mayaTwoStep()}
	{#if maya.twoStep}<Tag tone="success" marker>On</Tag>{:else}<Tag>Off</Tag>{/if}
{/snippet}

{#snippet adaTwoStep()}
	{#if ada.twoStep}<Tag tone="success" marker>On</Tag>{:else}<Tag>Off</Tag>{/if}
{/snippet}

{#snippet editAction()}
	<Button type="button" variant="outline" size="sm">Edit</Button>
{/snippet}

{#snippet errorBlock()}
	<ErrorState size="section" onRetry={() => {}} />
{/snippet}

{#snippet loadingSections()}
	<DetailSection title="Profile">
		<SkeletonDetails rows={4} />
	</DetailSection>
{/snippet}

<!-- Rows: the label left of the value, stacked below sm. -->
<Story name="List, rows" asChild>
	<div class="max-w-2xl bg-background">
		<DetailList items={profile} />
	</div>
</Story>

<!-- Grid: the label over the value, two columns from sm. -->
<Story name="List, grid" asChild>
	<div class="max-w-2xl bg-background">
		<DetailList
			layout="grid"
			items={[
				{ label: 'Last active', value: 'Yesterday' },
				{ label: 'Two-step sign-in', value: adaTwoStep },
				{ label: 'Sign-in method', value: ada.signInMethod },
				{ label: 'Member ID', value: ada.id, mono: true, copy: ada.id },
			]}
		/>
	</div>
</Story>

<!-- The grid with three columns, for short facts. -->
<Story name="List, grid, three columns" asChild>
	<div class="max-w-3xl bg-background">
		<DetailList
			layout="grid"
			columns={3}
			items={[
				{ label: 'Events', value: '7,420 of 10,000' },
				{ label: 'Seats', value: '8 of 10' },
				{ label: 'Data kept', value: '12 of 13 months' },
				{ label: 'Plan', value: 'Team' },
				{ label: 'Renews', value: '1 November 2026' },
				{ label: 'Card', value: 'Visa ending 4242' },
			]}
		/>
	</div>
</Story>

<!-- A record with holes: what isn't set says so, in muted words. -->
<Story name="Missing values" asChild>
	<div class="max-w-2xl bg-background">
		<DetailList
			items={[
				{ label: 'Name', value: maya.name },
				{ label: 'Phone', value: undefined },
				{ label: 'Title', value: undefined },
				{ label: 'Email', value: maya.email },
			]}
		/>
	</div>
</Story>

<!-- Machine values: mono, with the copy button beside them. -->
<Story name="Copy and mono" asChild>
	<div class="max-w-2xl bg-background">
		<DetailList
			items={[
				{ label: 'Member ID', value: maya.id, mono: true, copy: maya.id },
				{ label: 'API key', value: 'sk_demo_4f8a02b1c', mono: true, copy: 'sk_demo_4f8a02b1c' },
				{ label: 'Workspace', value: 'Paperplane' },
			]}
		/>
	</div>
</Story>

<!-- A section: the title and its actions in one row, the list in a panel. -->
<Story name="Section" asChild>
	<div class="max-w-2xl bg-background">
		<DetailSection title="Profile" description="Who they are in the workspace.">
			{#snippet actions()}
				{@render editAction()}
			{/snippet}
			<DetailList items={profile} />
		</DetailSection>
	</div>
</Story>

<!-- The destructive outline, for the section that removes things. -->
<Story name="Section, destructive" asChild>
	<div class="max-w-2xl bg-background">
		<DetailSection tone="destructive" title="Remove from workspace">
			<div class="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
				<p class="text-sm text-muted-foreground">
					They lose access to everything in Paperplane. You can invite them again later.
				</p>
				<Button type="button" variant="destructive" class="shrink-0">Remove from workspace</Button>
			</div>
		</DetailSection>
	</div>
</Story>

<!-- Loading: the sections stay, the skeleton stands where the rows land. -->
<Story name="Section, loading" asChild>
	<div class="flex max-w-2xl flex-col gap-8 bg-background">
		<DataState status="pending" delay={0} loadingLabel="Loading member" loading={loadingSections} error={errorBlock}>
			<DetailSection title="Profile">
				<DetailList items={profile} />
			</DetailSection>
		</DataState>
	</div>
</Story>

<!-- At 360px the rows stack and the grid falls to one column. -->
<Story name="Mobile" parameters={{ viewport: { defaultViewport: 'phone360' } }} asChild>
	<div class="flex flex-col gap-8 bg-background">
		<DetailSection title="Access">
			<DetailList
				items={[
					{ label: 'Last active', value: 'Yesterday' },
					{ label: 'Two-step sign-in', value: mayaTwoStep },
					{ label: 'Sign-in method', value: maya.signInMethod },
					{ label: 'Member ID', value: maya.id, mono: true, copy: maya.id },
				]}
			/>
		</DetailSection>
		<DetailSection title="Usage">
			<DetailList
				layout="grid"
				items={[
					{ label: 'Events', value: '7,420 of 10,000' },
					{ label: 'Seats', value: '8 of 10' },
					{ label: 'Data kept', value: '12 of 13 months' },
				]}
			/>
		</DetailSection>
	</div>
</Story>
