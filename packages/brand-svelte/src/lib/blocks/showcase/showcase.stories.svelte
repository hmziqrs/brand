<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import TrendChart from './trend-chart.svelte'
	import { hash, rng } from '@hmziq/brand-core/motion/rings'

	const { Story } = defineMeta({
		title: 'Showcase/Product visuals',
		parameters: { layout: 'padded' },
	})

	const visitors = (() => {
		const random = rng(hash('sightline visitors'))
		const start = Date.UTC(2026, 7, 29)
		return Array.from({ length: 30 }, (_, i) => {
			const d = new Date(start + i * 86400000)
			const weekend = d.getUTCDay() === 0 || d.getUTCDay() === 6
			const base = (weekend ? 1100 : 1750) * (1 + i / 120)
			return { label: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' }), value: Math.round(base + random() * 420), previous: Math.round(base * 0.86 + random() * 380) }
		})
	})()
</script>

<Story name="Trend chart" asChild>
	<div class="max-w-3xl"><TrendChart label="Visitors a day" points={visitors} /></div>
</Story>
