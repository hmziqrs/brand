<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import MaterialSparkline from './material-sparkline.svelte'

	const visitors = [1840, 1920, 1760, 2050, 2210, 1980, 2400, 2320, 2510, 2190, 2620, 2780, 2560, 2900, 3050, 2870, 3120, 3340, 3010, 3280, 3460, 3390, 3620]

	const { Story } = defineMeta({
		title: 'Custom/Material sparkline',
		component: MaterialSparkline,
		args: { values: visitors, label: 'Visitors a day, rising' },
	})
</script>

<!-- A trend in a stat card: the area is copper, the line the text color, today in orange. Example numbers. -->
<Story name="In a card" asChild>
	<div class="flex max-w-sm flex-col gap-4 rounded-xl p-6 ring-1 ring-foreground/10">
		<div><p class="text-sm text-muted-foreground">Visitors a day</p><p class="text-3xl font-medium tracking-tight tabular-nums">3,620</p></div>
		<MaterialSparkline values={visitors} label="Visitors a day over 23 days, rising from 1,840 to 3,620" preset="copper-sweep" />
	</div>
</Story>

<!-- Wide, in other metals. -->
<Story name="Metals" asChild>
	<div class="grid max-w-5xl gap-8 md:grid-cols-2">
		<MaterialSparkline values={visitors} label="Rising" preset="liquid-chrome" />
		<MaterialSparkline values={[...visitors].reverse()} label="Falling" preset="hammered-copper" />
	</div>
</Story>
