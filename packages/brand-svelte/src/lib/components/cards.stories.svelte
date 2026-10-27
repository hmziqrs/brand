<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ReleaseCard from './release-card.svelte'
	import ProjectCard from './project-card.svelte'
	import EndpointCard from './endpoint-card.svelte'
	import PlanCard from './plan-card.svelte'
	import { releases, installs } from '$brand/blocks/content/stories-data.js'

	const days = Array.from({ length: 30 }, (_, i) => {
		const d = new Date(Date.UTC(2026, 8, 14 + i))
		const delivered = [6, 7, 19].includes(i) ? (i === 19 ? 0.91 : 0.97) : 0.996 + ((i * 37) % 4) / 1000
		return { date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' }), delivered }
	})

	const { Story } = defineMeta({
		title: 'Custom/Cards',
		parameters: { layout: 'padded' },
	})
</script>

<Story name="Release" asChild>
	<div class="grid max-w-5xl items-start gap-4 md:grid-cols-2">
		<ReleaseCard product="claude-multi" symbol="Cm" release={releases[0]} latest {installs} href="#" />
		<ReleaseCard product="claude-multi" symbol="Cm" release={releases[1]} href="#" />
	</div>
</Story>

<Story name="Project" asChild>
	<ProjectCard
		class="max-w-md"
		name="gpui-query"
		symbol="Gq"
		kind="Library"
		description="Fetches, caches and refreshes data for you, tries again when the connection drops, and stops work when a view closes."
		install="cargo add gpui-query --features hook"
		stats={[['License', 'MIT'], ['Language', 'Rust'], ['API', '3 functions']]}
		trend={[120, 140, 135, 180, 210, 205, 260, 300, 290, 340, 380, 420]}
		status={{ label: 'Builds passing', state: 'on' }}
		preset="brushed-alloy"
		docs="#"
		repo="#"
	/>
</Story>

<Story name="Endpoint" asChild>
	<EndpointCard
		class="max-w-md"
		url="https://api.paperplane.app/hooks/hookline"
		{days}
		metrics={[['First try', '99.4%'], ['Median time', '182 ms'], ['Retried', '41']]}
		deliveries={[
			{ event: 'invoice.paid', status: 200, at: '12:04:31' },
			{ event: 'customer.updated', status: 200, at: '12:03:58' },
			{ event: 'order.created', status: 503, at: '12:01:12' },
		]}
	/>
</Story>

<Story name="Plan" asChild>
	<PlanCard
		class="max-w-md"
		plan="Team"
		price="$96 a month"
		renews="Renews November 13"
		seats={{ used: 12, total: 15 }}
		people={['Priya Nair', 'Lucas Moreira', 'Kenji Mori', 'Ana Duarte']}
		usage={[
			{ label: 'Storage', value: 0.72, detail: '7.2 of 10 GB', preset: 'copper-sweep' },
			{ label: 'Automation runs', value: 0.4, detail: '1,200 of 3,000', preset: 'brushed-alloy' },
			{ label: 'Guests', value: 0.18, detail: '9 of 50', preset: 'hammered-silver' },
		]}
	/>
</Story>

<Story name="Together" asChild>
	<div class="grid max-w-6xl items-start gap-4 md:grid-cols-2 xl:grid-cols-3">
		<ReleaseCard product="claude-multi" symbol="Cm" release={releases[0]} latest {installs} href="#" />
		<EndpointCard url="https://api.paperplane.app/hooks/hookline" {days} metrics={[['First try', '99.4%'], ['Median', '182 ms'], ['Retried', '41']]} deliveries={[{ event: 'invoice.paid', status: 200, at: '12:04:31' }, { event: 'order.created', status: 503, at: '12:01:12' }]} />
		<PlanCard plan="Team" price="$96 a month" renews="Renews November 13" seats={{ used: 12, total: 15 }} people={['Priya Nair', 'Lucas Moreira', 'Kenji Mori', 'Ana Duarte']} usage={[{ label: 'Storage', value: 0.72, detail: '7.2 of 10 GB', preset: 'copper-sweep' }, { label: 'Automation runs', value: 0.4, detail: '1,200 of 3,000', preset: 'brushed-alloy' }]} />
	</div>
</Story>
