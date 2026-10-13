<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ShowcaseSection from './showcase-section.svelte'
	import ButtonLink from '../site/button-link.svelte'
	import AppWindow from '../saas/app-window.svelte'
	import TrendChart from '../showcase/trend-chart.svelte'
	import KpiStat from '../showcase/kpi-stat.svelte'
	import BarList from '../showcase/bar-list.svelte'
	import RetentionGrid from '../showcase/retention-grid.svelte'
	import { visitors, pages, cohorts } from '../showcase/demo.js'

	const { Story } = defineMeta({
		title: 'Sections/Showcase',
		component: ShowcaseSection,
		parameters: { layout: 'fullscreen' },
	})
</script>

{#snippet go()}<ButtonLink href="#" size="lg" class="px-5">Start free</ButtonLink><ButtonLink href="#" size="lg" variant="outline" class="px-5">Book a demo</ButtonLink>{/snippet}
{#snippet app()}
	<AppWindow url="app.sightline.io/paperplane/overview" class="shadow-2xl">
		<div class="grid gap-4 p-4 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
			<div class="flex flex-col gap-4">
				<div class="grid grid-cols-3 gap-4 rounded-lg border p-3.5"><KpiStat label="Visitors" value="58,074" delta={16} /><KpiStat label="Signed up" value="2,381" delta={19} /><KpiStat label="Came back" value="41%" delta={-2} /></div>
				<div class="rounded-lg border p-3"><TrendChart label="Visitors a day" points={visitors} height={170} /></div>
			</div>
			<div class="flex flex-col gap-4">
				<div class="rounded-lg border p-3"><BarList label="Top pages" rows={pages} mono /></div>
				<div class="rounded-lg border p-3"><RetentionGrid {cohorts} numbers={false} legend={false} periods={6} /></div>
			</div>
		</div>
	</AppWindow>
{/snippet}

<!-- A: The product on copper, words above. Example data. -->
<Story name="A Over a material" asChild>
	<ShowcaseSection title="See which features people use, and where they give up." lede="Add one line to your site and the charts fill in by themselves." actions={go} preset="copper-sweep">{@render app()}</ShowcaseSection>
</Story>

<!-- B: Glass notes pointing at what matters. -->
<Story name="B With notes" asChild>
	<ShowcaseSection title="Every number explained where it sits." preset="liquid-chrome" notes={[{ text: 'Up 16% on last month', x: 22, y: 20 }, { text: 'Weekends dip; that’s normal', x: 44, y: 62 }, { text: 'Pricing leads, again', x: 78, y: 26 }]}>{@render app()}</ShowcaseSection>
</Story>

<!-- C: On the orange band. -->
<Story name="C On the band" asChild>
	<ShowcaseSection title="Plain answers, not another dashboard." lede="Funnels, retention and paths build themselves from the moments you name." ground="band">{@render app()}</ShowcaseSection>
</Story>

<!-- D: Over the hero rings. -->
<Story name="D Over the rings" asChild>
	<ShowcaseSection title="Built in public, tested in private." ground="rings" seed="sightline">{@render app()}</ShowcaseSection>
</Story>

<!-- E: Words beside the product, the material only behind the window. -->
<Story name="E Split" asChild>
	<ShowcaseSection layout="split" title="Your whole product on one screen." lede="What brings people in, where they get stuck and what makes them come back." actions={go} preset="hammered-copper">{@render app()}</ShowcaseSection>
</Story>
