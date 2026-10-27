<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Cloud from '@lucide/svelte/icons/cloud'
	import Feather from '@lucide/svelte/icons/feather'
	import Hexagon from '@lucide/svelte/icons/hexagon'
	import Landmark from '@lucide/svelte/icons/landmark'
	import Leaf from '@lucide/svelte/icons/leaf'
	import Waves from '@lucide/svelte/icons/waves'
	import BandSection from './band-section.svelte'
	import ButtonLink from '../site/button-link.svelte'
	import AppWindow from '../saas/app-window.svelte'
	import TrendChart from '../showcase/trend-chart.svelte'
	import KpiStat from '../showcase/kpi-stat.svelte'
	import { visitors } from '../showcase/demo.js'

	const { Story } = defineMeta({
		title: 'Sections/Band',
		component: BandSection,
		parameters: { layout: 'fullscreen' },
	})

	const logos = [
		{ name: 'Paperplane', icon: Feather },
		{ name: 'Northwind', icon: Waves },
		{ name: 'Tidewater', icon: Leaf },
		{ name: 'Lumabank', icon: Landmark },
		{ name: 'Hexwork', icon: Hexagon },
		{ name: 'Cumulus', icon: Cloud },
	]
</script>

{#snippet go()}<ButtonLink href="#" size="lg" class="px-5">Start free</ButtonLink><ButtonLink href="#" size="lg" variant="outline" class="px-5">Book a demo</ButtonLink>{/snippet}
{#snippet product()}
	<AppWindow url="app.sightline.io/paperplane/overview">
		<div class="flex flex-col gap-4 p-4">
			<div class="grid grid-cols-3 gap-4"><KpiStat label="Visitors" value="58,074" delta={16} /><KpiStat label="Signed up" value="2,381" delta={19} /><KpiStat label="Came back" value="41%" delta={-2} /></div>
			<TrendChart label="Visitors a day" points={visitors} height={150} />
		</div>
	</AppWindow>
{/snippet}

<Story name="Call to action" asChild>
	<BandSection title="Know what your users do by Friday." body="Add the script today. By the end of the week you'll have a funnel, a retention chart and a clear next step." actions={go} />
</Story>

<Story name="Call to action, inverse" asChild>
	<BandSection tone="inverse" title="Know what your users do by Friday." body="Add the script today. By the end of the week you'll have a funnel, a retention chart and a clear next step." actions={go} />
</Story>

<Story name="Numbers" asChild>
	<BandSection variant="stats" title="Finished means finished." stats={[{ value: '100%', label: 'free and open source' }, { value: '90%+', label: 'of the code covered by tests' }, { value: '5', label: 'review rounds before release' }]} />
</Story>

<Story name="Numbers, grey" asChild>
	<BandSection tone="gray" variant="stats" title="Finished means finished." stats={[{ value: '100%', label: 'free and open source' }, { value: '90%+', label: 'of the code covered by tests' }, { value: '5', label: 'review rounds before release' }]} />
</Story>

<Story name="Quote" asChild>
	<BandSection variant="quote" quote={{ text: 'We ran twelve schools out of email threads and a spreadsheet nobody trusted. Now every school has a board, and the Friday check-in replaced a two-hour meeting.', name: 'Priya Nair', role: 'Operations lead, Fernhill Schools' }} />
</Story>

<Story name="Product" asChild>
	<BandSection variant="split" title="Plain answers, not another dashboard." body="Sightline turns clicks into sentences you can act on, and the chart is there when you want it." actions={go} aside={product} />
</Story>

<Story name="Customers" asChild>
	<BandSection variant="logos" title="Product teams that open Sightline every morning" {logos} />
</Story>
