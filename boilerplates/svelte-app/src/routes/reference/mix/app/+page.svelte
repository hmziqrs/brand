<script lang="ts">
	import Container from '$brand/blocks/site/container.svelte';
	import StatCard from '$brand/blocks/app/metrics/stat-card.svelte';
	import StatGrid from '$brand/blocks/app/metrics/stat-grid.svelte';
	import AppPageHeader from '$brand/blocks/app/shell/app-page-header.svelte';
	import AppTableFrame from '$brand/blocks/app/table/app-table-frame.svelte';
	import SettingsSection from '$brand/blocks/app/settings/settings-section.svelte';
	import SettingRow from '$brand/blocks/app/settings/setting-row.svelte';
	import FormActions from '$brand/blocks/app/settings/form-actions.svelte';
	import { Body, Cell, Head, Header, Row, Root } from '$brand/ui/table/index.js';
	import { Input } from '$brand/ui/input/index.js';
	import Tag from '$brand/components/tag.svelte';

	const projects: { name: string; owner: string; status: string; tone?: 'success' | 'warning'; due: string }[] = [
		{ name: 'Launch plan', owner: 'Maya', status: 'Shipped', tone: 'success', due: 'Done' },
		{ name: 'Pricing page', owner: 'Kenji', status: 'In progress', tone: 'warning', due: 'Friday' },
		{ name: 'Onboarding emails', owner: 'Priya', status: 'Planned', due: 'Next week' },
	];
</script>

<svelte:head>
	<title>App screen — Section mix</title>
</svelte:head>

<Container class="flex flex-col gap-4 border-b pt-8 pb-6 sm:flex-row sm:items-center sm:justify-between">
	<p class="flex items-center gap-3 text-sm font-medium">App screen <Tag>Sample copy</Tag></p>
	<a href="/reference/mix" class="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">Back to the mix index</a>
</Container>

<main class="py-16 md:py-24">
	<Container class="flex flex-col gap-8">
		<AppPageHeader title="Overview" description="The numbers for the last 30 days." />
		<StatGrid columns={3}>
			<StatCard label="Visitors" value="58,074" trend={{ change: 0.16, good: 'up', format: 'percent', comparison: 'vs last 30 days' }} />
			<StatCard label="Signed up" value="2,381" trend={{ change: 0.19, good: 'up', format: 'percent', comparison: 'vs last 30 days' }} />
			<StatCard label="Came back" value="41%" trend={{ change: -0.02, good: 'up', format: 'percent', comparison: 'vs last 30 days' }} />
		</StatGrid>
		<AppTableFrame>
			<Root>
				<Header>
					<Row>
						<Head class="px-4">Project</Head>
						<Head class="px-4">Owner</Head>
						<Head class="px-4">Status</Head>
						<Head class="px-4">Due</Head>
					</Row>
				</Header>
				<Body>
					{#each projects as p (p.name)}
						<Row>
							<Cell class="px-4 font-medium">{p.name}</Cell>
							<Cell class="px-4 text-muted-foreground">{p.owner}</Cell>
							<Cell class="px-4"><Tag tone={p.tone} marker={Boolean(p.tone)}>{p.status}</Tag></Cell>
							<Cell class="px-4 text-muted-foreground">{p.due}</Cell>
						</Row>
					{/each}
				</Body>
			</Root>
		</AppTableFrame>
		<SettingsSection title="Workspace" description="The name members see, and the address the workspace lives at.">
			<SettingRow label="Name" description="Shown in the sidebar and in emails." for="mix-name">
				<Input id="mix-name" name="name" value="Sightline" />
			</SettingRow>
			{#snippet footer()}
				<FormActions dirty={false} pending={false} submitLabel="Save changes" />
			{/snippet}
		</SettingsSection>
	</Container>
</main>
