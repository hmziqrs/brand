<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import RingStats from './ring-stats.svelte'

	const { Story } = defineMeta({ title: 'Site/Sections/Ring stats', component: RingStats })
</script>

<!-- Key numbers, each beside a ring gauge that draws it. -->
<Story name="Default" parameters={{ layout: 'fullscreen' }} asChild>
	<div class="py-16">
		<RingStats
			items={[
				{ value: '100%', label: 'Open source', ring: 1 },
				{ value: '90%+', label: 'Tests that pass before shipping', ring: 0.9 },
				{ value: '5', label: 'Rounds of review', ring: 5 },
			]}
		/>
	</div>
</Story>
