<!--
  The billing settings page (app-blocks.md, phases 6 and 7): the plan and its
  card as detail rows, the same usage meters the overview shows in a "Usage"
  section, then the invoices as a small table in their own section. This is
  the one settings page that can be denied, so state=denied shows the way
  out alongside the retry. "Change plan" is a plain button: the demo has no
  plan to change to.
-->
<script lang="ts">
	import { page } from '$app/state';
	import DetailList from '$brand/blocks/app/details/detail-list.svelte';
	import DetailSection from '$brand/blocks/app/details/detail-section.svelte';
	import AppPage from '$brand/blocks/app/shell/app-page.svelte';
	import AppPageHeader from '$brand/blocks/app/shell/app-page-header.svelte';
	import DataState from '$brand/blocks/app/states/data-state.svelte';
	import ErrorState from '$brand/blocks/app/states/error-state.svelte';
	import SkeletonDetails from '$brand/blocks/app/states/skeleton-details.svelte';
	import UsageMeter from '$brand/blocks/app/metrics/usage-meter.svelte';
	import Tag from '$brand/components/tag.svelte';
	import { Button } from '$brand/ui/button/index.js';
	import * as Table from '$brand/ui/table/index.js';
	import { billing, usage } from '@hmziq/brand-core/app/demo-data';
	import { settingsTabs } from '$lib/settings-tabs.js';
	import { DemoLoad } from '$lib/demo-load.svelte.js';

	const load = new DemoLoad(page.url.searchParams.get('state'), { denied: true });

	const longDate = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
	const shortDate = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
	const price = `$${billing.price.amount} per ${billing.price.per}`;
</script>

<svelte:head>
	<title>Billing — svelte-app</title>
</svelte:head>

{#snippet priceValue()}
	{price}
	<Tag>Example price</Tag>
{/snippet}

{#snippet statusOf(status: string)}
	{#if status === 'Paid'}<Tag tone="success" marker>Paid</Tag>{:else}<Tag tone="warning">Due</Tag>{/if}
{/snippet}

{#snippet planSkeleton()}
	<DetailSection title="Plan">
		<SkeletonDetails rows={4} />
	</DetailSection>
	<DetailSection title="Usage">
		<SkeletonDetails rows={3} />
	</DetailSection>
	<DetailSection title="Invoices">
		<SkeletonDetails rows={6} />
	</DetailSection>
{/snippet}

{#snippet errorBlock()}
	<ErrorState kind={load.kind} onRetry={load.load}>
		{#snippet actions()}
			{#if load.kind === 'denied'}
				<Button variant="outline" href="/app/settings/profile">Back to settings</Button>
			{/if}
		{/snippet}
	</ErrorState>
{/snippet}

<AppPage width="narrow">
	<AppPageHeader
		title="Settings"
		description="The plan this workspace is on, and its invoices."
		tabs={settingsTabs}
		currentPath={page.url.pathname}
		tabsLabel="Settings sections"
	/>

	<DataState status={load.status} loadingLabel="Loading billing" class="mt-8 flex flex-col gap-8">
		{#snippet loading()}
			{@render planSkeleton()}
		{/snippet}
		{#snippet error()}
			{@render errorBlock()}
		{/snippet}
		<DetailSection title="Plan" description="What the workspace pays, and when it renews.">
			{#snippet actions()}
				<Button type="button" variant="outline" size="sm">Change plan</Button>
			{/snippet}
			<DetailList
				items={[
					{ label: 'Plan', value: billing.plan },
					{ label: 'Price', value: priceValue },
					{ label: 'Renewal date', value: longDate.format(new Date(billing.renewsOn)) },
					{ label: 'Card', value: `${billing.card.brand} ending ${billing.card.last4}` },
				]}
			/>
		</DetailSection>
		<DetailSection title="Usage" description="What the workspace has used of what the plan allows.">
			<!-- The same meters the overview shows, stacked inside the panel:
			     one column of numbers here, no room to spare in a narrow page. -->
			<div class="flex flex-col divide-y">
				<div class="py-4">
					<UsageMeter
						label="Events this month"
						used={usage.events.used}
						limit={usage.events.limit}
						unit={usage.events.unit}
						resetsOn={`Resets on ${usage.events.resetsOn}`}
					/>
				</div>
				<div class="py-4">
					<UsageMeter variant="ring" label="Seats" used={usage.seats.used} limit={usage.seats.limit} unit={usage.seats.unit} />
				</div>
				<div class="py-4">
					<UsageMeter label="Data kept" used={usage.retention.used} limit={usage.retention.limit} unit={usage.retention.unit} />
				</div>
			</div>
		</DetailSection>
		<DetailSection title="Invoices" description="Everything billed to the card, newest first.">
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head>Date</Table.Head>
						<Table.Head>Amount</Table.Head>
						<Table.Head>Status</Table.Head>
						<Table.Head class="w-24"><span class="sr-only">Actions</span></Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each billing.invoices as invoice (invoice.id)}
						<Table.Row>
							<Table.Cell class="px-2 py-3.5">{shortDate.format(new Date(invoice.date))}</Table.Cell>
							<Table.Cell class="px-2 py-3.5">{invoice.amount}</Table.Cell>
							<Table.Cell class="px-2 py-3.5">{@render statusOf(invoice.status)}</Table.Cell>
							<Table.Cell class="px-2 py-3.5">
								<Button
									variant="link"
									size="sm"
									class="h-auto p-0"
									href={`/app/settings/billing/invoices/${invoice.id}`}
								>
									Download
								</Button>
							</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</DetailSection>
	</DataState>
</AppPage>
