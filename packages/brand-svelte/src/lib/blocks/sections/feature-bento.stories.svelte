<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import FeatureBento from './feature-bento.svelte'
	import BarList from '../showcase/bar-list.svelte'
	import TrendChart from '../showcase/trend-chart.svelte'
	import ActivityHeatmap from '../showcase/activity-heatmap.svelte'
	import GoalMeter from '../showcase/goal-meter.svelte'
	import KpiStat from '../showcase/kpi-stat.svelte'
	import { visitors, pages, activity } from '../showcase/demo.js'
	import Zap from '@lucide/svelte/icons/zap'
	import Timer from '@lucide/svelte/icons/timer'
	import WifiOff from '@lucide/svelte/icons/wifi-off'
	import Lock from '@lucide/svelte/icons/lock'
	import Flame from '@lucide/svelte/icons/flame'
	import Link2 from '@lucide/svelte/icons/link-2'
	import FileDown from '@lucide/svelte/icons/file-down'

	const { Story } = defineMeta({
		title: 'Sections/Feature bento',
		component: FeatureBento,
		parameters: { layout: 'fullscreen' },
	})

	const searches = [
		{ label: 'deploy checklist', value: 8412 },
		{ label: '1:1 notes, Ada', value: 6230 },
		{ label: 'postgresql tuning', value: 4109 },
		{ label: 'postcard copy v3', value: 2984 },
		{ label: 'font pairing tests', value: 2411 },
		{ label: 'offsite agenda', value: 1876 },
	]
</script>

{#snippet searchesBar()}<BarList rows={searches} mono />{/snippet}
{#snippet trend()}<TrendChart label="Words written a day" points={visitors} height={150} />{/snippet}
{#snippet heat()}<ActivityHeatmap label="Notes touched" unit="notes" days={activity} start="2025-10-13" />{/snippet}
{#snippet streak()}<GoalMeter label="days in a row" current={46} target={60} elapsed={0.77} />{/snippet}
{#snippet exportsBar()}<BarList rows={pages} mono />{/snippet}
{#snippet backup()}
	<div class="grid grid-cols-2 gap-4"><KpiStat label="Backups this month" value="31" delta={0} /><KpiStat label="Restores needed" value="0" delta={0} /></div>
{/snippet}

<Story name="A Speed" asChild>
	<FeatureBento
		title="Everything a keystroke away"
		intro="Marginal keeps your notes in plain files and answers before you lift your fingers off the keys."
		tiles={[
			{ title: 'Instant recall', body: 'Search runs on your machine and reads the whole folder, every time.', cols: 4, icon: Zap, visual: searchesBar },
			{ title: 'How fast', cols: 2, icon: Timer, stat: { value: '38 ms', label: 'median search, 40k notes' } },
			{ title: 'Works offline', body: 'The plane, the cabin, the tunnel. Writing never waits for a network.', cols: 2, icon: WifiOff, stat: { value: '0', label: 'network calls while you write' } },
			{ title: 'Plain files you own', body: 'Markdown in a folder you can read in any editor, synced with anything.', cols: 2, tone: 'orange', icon: Lock },
			{ title: 'Made from your notes', body: 'The dashboard builds itself from what you wrote this year.', cols: 2, tone: 'material', preset: 'etched-silk' },
			{ title: 'A year of writing', cols: 6, visual: heat },
		]}
	/>
</Story>

<Story name="B Streaks" asChild>
	<FeatureBento
		align="start"
		title="A writing habit, kept honestly"
		intro="Marginal counts the days quietly and never makes a fuss about a missed one."
		tiles={[
			{ title: 'This stretch', cols: 2, rows: 2, icon: Flame, visual: streak },
			{ title: 'Words a day', cols: 4, visual: trend },
			{ title: 'Links between notes', body: 'Type two brackets, get a link. The map draws itself.', cols: 3, icon: Link2 },
			{ title: 'Exports that behave', body: 'One folder, clean files, nothing locked in.', cols: 3, icon: FileDown, visual: exportsBar },
		]}
	/>
</Story>

<Story name="C Backups" asChild>
	<FeatureBento
		title="Your words, kept"
		intro="Every save lands on disk first, then wherever you point it."
		tiles={[
			{ title: 'Backups', cols: 3, visual: backup },
			{ title: 'Version history', body: 'Every save keeps its own copy, for as long as you want.', cols: 3, icon: Timer },
			{ title: 'Plain files you own', body: 'Markdown in a folder you can read in any editor.', cols: 2, tone: 'orange', icon: Lock },
			{ title: 'Works offline', cols: 2, icon: WifiOff, stat: { value: '0', label: 'network calls while you write' } },
			{ title: 'This stretch', cols: 2, icon: Flame, stat: { value: '46', label: 'days in a row' } },
		]}
	/>
</Story>
