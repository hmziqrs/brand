<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'

	const { Story } = defineMeta({
		title: 'ui/base/Chart',
		parameters: { layout: 'centered' },
	})
</script>

<script lang="ts">
	import type { Snippet } from 'svelte'

	const months = [
		{ month: 'January', desktop: 186, mobile: 80 },
		{ month: 'February', desktop: 305, mobile: 200 },
		{ month: 'March', desktop: 237, mobile: 120 },
		{ month: 'April', desktop: 73, mobile: 190 },
		{ month: 'May', desktop: 209, mobile: 130 },
		{ month: 'June', desktop: 214, mobile: 140 },
	]

	const browsers = [
		{ browser: 'Chrome', key: 'chrome', visitors: 275 },
		{ browser: 'Safari', key: 'safari', visitors: 200 },
		{ browser: 'Other', key: 'other', visitors: 190 },
	]
	const totalVisitors = browsers.reduce((acc, curr) => acc + curr.visitors, 0)

	function niceTicks(min: number, max: number, count: number) {
		const stepOf = (rough: number, corr: number) => {
			const dc = rough === 0 ? 1 : Math.floor(Math.log10(Math.abs(rough))) + 1
			const scale = dc !== 1 ? 0.05 : 0.1
			return (Math.ceil(rough / 10 ** dc / scale) + corr) * scale * 10 ** dc
		}
		const calc = (corr: number): { step: number; lo: number; hi: number } => {
			const step = stepOf((max - min) / (count - 1), corr)
			const middle = min <= 0 && max >= 0 ? 0 : (min + max) / 2 - (((min + max) / 2) % step)
			let below = Math.ceil((middle - min) / step), up = Math.ceil((max - middle) / step)
			const total = below + up + 1
			if (total > count) return calc(corr + 1)
			if (total < count) { if (max > 0) up += count - total; else below += count - total }
			return { step, lo: middle - below * step, hi: middle + up * step }
		}
		const { step, lo, hi } = calc(0)
		const out: number[] = []
		for (let v = lo; v <= hi + 0.1 * step + 1e-9; v += step) out.push(v)
		return out
	}

	function linePath(pts: { x: number; y: number }[]) {
		const n = pts.length
		if (n === 1) return `M${pts[0].x},${pts[0].y}`
		const dx = pts[1].x - pts[0].x
		const m: number[] = []
		for (let i = 0; i < n - 1; i++) m.push((pts[i + 1].y - pts[i].y) / dx)
		const t = [m[0]]
		for (let i = 1; i < n - 1; i++) t.push(m[i - 1] * m[i] <= 0 ? 0 : (m[i - 1] + m[i]) / 2)
		t.push(m[n - 2])
		t[0] = (3 * m[0] - t[1]) / 2
		t[n - 1] = (3 * m[n - 2] - t[n - 2]) / 2
		let d = `M${pts[0].x},${pts[0].y}`
		for (let i = 0; i < n - 1; i++) {
			d += `C${pts[i].x + dx / 3},${pts[i].y + (t[i] * dx) / 3} ${pts[i + 1].x - dx / 3},${pts[i + 1].y - (t[i + 1] * dx) / 3} ${pts[i + 1].x},${pts[i + 1].y}`
		}
		return d
	}

	function barPath(x: number, y: number, w: number, h: number, r: number) {
		const rr = Math.min(r, w / 2, h)
		return `M${x},${y + h}V${y + rr}Q${x},${y} ${x + rr},${y}H${x + w - rr}Q${x + w},${y} ${x + w},${y + rr}V${y + h}Z`
	}

	const W = 640
	const H = 360
	const mX = 12
	const mTop = 12
	const plotW = W - mX * 2
	const plotH = H - mTop - 30
	const step = plotW / (months.length - 1)
	const xAt = (i: number) => mX + i * step
	const band = W / months.length
	const barGap = 4
	const barW = (band * 0.8 - barGap) / 2
	const baseY = mTop + plotH

	const stackTicks = niceTicks(0, 505, 5)
	const valueTicks = niceTicks(0, 305, 5)
	const yStack = (v: number) => mTop + plotH * (1 - v / stackTicks[stackTicks.length - 1])
	const yValue = (v: number) => mTop + plotH * (1 - v / valueTicks[valueTicks.length - 1])

	const toPts = (vals: number[], yAt: (v: number) => number) => vals.map((v, i) => ({ x: xAt(i), y: yAt(v) }))
	const areaOf = (pts: { x: number; y: number }[]) => `${linePath(pts)}L${pts[pts.length - 1].x},${baseY}L${pts[0].x},${baseY}Z`

	const mobileStack = toPts(months.map((m) => m.mobile), yStack)
	const desktopStack = toPts(months.map((m) => m.desktop + m.mobile), yStack)
	const desktopLinePts = toPts(months.map((m) => m.desktop), yValue)
	const mobileLinePts = toPts(months.map((m) => m.mobile), yValue)

	const cx = W / 2
	const cy = H / 2
	const innerR = 48
	const outerR = (Math.min(W, H) / 2) * 0.8
	const polar = (r: number, a: number) => [cx + r * Math.cos((a * Math.PI) / 180), cy + r * Math.sin((a * Math.PI) / 180)]
	function sector(a0: number, a1: number) {
		const large = a1 - a0 > 180 ? 1 : 0
		const [x0, y0] = polar(outerR, a0)
		const [x1, y1] = polar(outerR, a1)
		const [x2, y2] = polar(innerR, a1)
		const [x3, y3] = polar(innerR, a0)
		return `M${x0},${y0}A${outerR},${outerR} 0 ${large} 1 ${x1},${y1}L${x2},${y2}A${innerR},${innerR} 0 ${large} 0 ${x3},${y3}Z`
	}
	let angle = -90
	const slices = browsers.map((b) => {
		const span = (b.visitors / totalVisitors) * 360
		const d = sector(angle, angle + span)
		angle += span
		return { ...b, d }
	})

	type Pt = { i: number; x: number; y: number; w: number }

	function nearest(e: PointerEvent, banded: boolean): Pt {
		const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
		const x = e.clientX - rect.left
		const y = e.clientY - rect.top
		const vx = (x * W) / rect.width
		const i = banded
			? Math.min(months.length - 1, Math.max(0, Math.floor((vx / W) * months.length)))
			: Math.min(months.length - 1, Math.max(0, Math.round(((vx - mX) / plotW) * (months.length - 1))))
		return { i, x, y, w: rect.width }
	}

	let hoverArea = $state<number | null>(null)
	let ptArea = $state<Pt>({ i: 0, x: 0, y: 0, w: 0 })
	function areaMove(e: PointerEvent) {
		ptArea = nearest(e, false)
		hoverArea = ptArea.i
	}
	let hoverBar = $state<number | null>(null)
	let ptBar = $state<Pt>({ i: 0, x: 0, y: 0, w: 0 })
	function barMove(e: PointerEvent) {
		ptBar = nearest(e, true)
		hoverBar = ptBar.i
	}
	let hoverLine = $state<number | null>(null)
	let ptLine = $state<Pt>({ i: 0, x: 0, y: 0, w: 0 })
	function lineMove(e: PointerEvent) {
		ptLine = nearest(e, false)
		hoverLine = ptLine.i
	}
	let hoverSlice = $state<number | null>(null)
	let ptSlice = $state<Pt>({ i: 0, x: 0, y: 0, w: 0 })
	function sliceMove(e: PointerEvent) {
		const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
		const x = e.clientX - rect.left
		const y = e.clientY - rect.top
		const vx = (x * W) / rect.width - cx
		const vy = (y * H) / rect.height - cy
		const r = Math.hypot(vx, vy)
		if (r < innerR || r > outerR) {
			hoverSlice = null
			return
		}
		const a = ((Math.atan2(vy, vx) * 180) / Math.PI + 450) % 360
		let acc = 0
		for (const [idx, b] of browsers.entries()) {
			acc += (b.visitors / totalVisitors) * 360
			if (a < acc) {
				ptSlice = { i: idx, x, y, w: rect.width }
				hoverSlice = idx
				return
			}
		}
	}
</script>

{#snippet row(color: string, label: string, value: number, dashed = false)}
	<div class="flex w-full flex-wrap gap-2 {dashed ? 'items-stretch' : 'items-center'}">
		{#if dashed}
			<div class="my-0.5 w-0 shrink-0 border-[1.5px] border-dashed bg-transparent" style="border-color: {color}"></div>
		{:else}
			<div class="h-2.5 w-2.5 shrink-0 rounded-[2px]" style="background: {color}"></div>
		{/if}
		<div class="flex flex-1 items-center justify-between leading-none">
			<span class="text-muted-foreground">{label}</span>
			<span class="font-mono font-medium text-foreground tabular-nums">{value.toLocaleString()}</span>
		</div>
	</div>
{/snippet}

{#snippet tooltip(pt: { i: number; x: number; y: number; w: number }, label: string | null, rows: Snippet)}
	<div
		class="pointer-events-none absolute grid min-w-32 items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl"
		style="left: {Math.min(Math.max(pt.x + 14, 4), Math.max(4, pt.w - 168))}px; top: {Math.min(Math.max(pt.y - 28, 4), 120)}px;"
	>
		{#if label}<div class="font-medium">{label}</div>{/if}
		<div class="grid gap-1.5">{@render rows()}</div>
	</div>
{/snippet}

<Story
	name="Stacked Area Chart"
	asChild
	parameters={{
		docs: {
			description: {
				story:
					'Combine multiple areas into a stacked area chart. The lab draws it with recharts; the kit hand-rolls the SVG on the sightline-dashboard precedent, same data, palette, smooth curves and hover tooltip, no chart dependency.',
			},
		},
	}}
>
	<div
		class="relative flex aspect-video w-full justify-center text-xs"
		style="--color-desktop: var(--chart-1); --color-mobile: var(--chart-2)"
		role="img"
		aria-label="Desktop and mobile visitors, January through June, stacked"
		onpointermove={areaMove}
		onpointerleave={() => (hoverArea = null)}
	>
		<svg viewBox="0 0 {W} {H}" class="h-full w-full" aria-hidden="true">
			{#each stackTicks as t (t)}<line x1={mX} x2={W - mX} y1={yStack(t)} y2={yStack(t)} stroke="var(--border)" stroke-opacity="0.5"></line>{/each}
			{#each months as m, i (m.month)}<text x={xAt(i)} y={baseY + 22} text-anchor="middle" font-size="12" fill="var(--muted-foreground)">{m.month.slice(0, 3)}</text>{/each}
			<path d={areaOf(mobileStack)} fill="var(--color-mobile)" fill-opacity="0.4"></path>
			<path d={areaOf(desktopStack)} fill="var(--color-desktop)" fill-opacity="0.4"></path>
			<path d={linePath(mobileStack)} fill="none" stroke="var(--color-mobile)"></path>
			<path d={linePath(desktopStack)} fill="none" stroke="var(--color-desktop)"></path>
		</svg>
		{#if hoverArea !== null}
			{@const point = months[hoverArea]}
			{#snippet rows()}
				{@render row('var(--color-mobile)', 'Mobile', point.mobile)}
				{@render row('var(--color-desktop)', 'Desktop', point.desktop)}
			{/snippet}
			{@render tooltip(ptArea, point.month, rows)}
		{/if}
	</div>
</Story>

<Story
	name="Stacked Bar Chart"
	asChild
	parameters={{
		docs: {
			description: {
				story:
					'Combine multiple bars into one chart. Bars without a stackId render side by side, drawn with hand-rolled SVG and a dashed-indicator tooltip.',
			},
		},
	}}
>
	<div
		class="relative flex aspect-video w-full justify-center text-xs"
		style="--color-desktop: var(--chart-1); --color-mobile: var(--chart-2)"
		role="img"
		aria-label="Desktop and mobile visitors, January through June"
		onpointermove={barMove}
		onpointerleave={() => (hoverBar = null)}
	>
		<svg viewBox="0 0 {W} {H}" class="h-full w-full" aria-hidden="true">
			{#each valueTicks as t (t)}<line x1={0} x2={W} y1={yValue(t)} y2={yValue(t)} stroke="var(--border)" stroke-opacity="0.5"></line>{/each}
			{#each months as m, i (m.month)}<text x={(i + 0.5) * band} y={baseY + 24} text-anchor="middle" font-size="12" fill="var(--muted-foreground)">{m.month.slice(0, 3)}</text>{/each}
			{#each months as m, i (m.month)}
				<path d={barPath(i * band + band * 0.1, yValue(m.desktop), barW, baseY - yValue(m.desktop), 4)} fill="var(--color-desktop)"></path>
				<path d={barPath(i * band + band * 0.9 - barW, yValue(m.mobile), barW, baseY - yValue(m.mobile), 4)} fill="var(--color-mobile)"></path>
			{/each}
		</svg>
		{#if hoverBar !== null}
			{@const point = months[hoverBar]}
			{#snippet rows()}
				{@render row('var(--color-desktop)', 'Desktop', point.desktop, true)}
				{@render row('var(--color-mobile)', 'Mobile', point.mobile, true)}
			{/snippet}
			{@render tooltip(ptBar, point.month, rows)}
		{/if}
	</div>
</Story>

<Story
	name="Multi Line Chart"
	asChild
	parameters={{
		docs: {
			description: {
				story:
					'Combine multiple lines into one chart, dotless like the lab, whose tooltip hides the month label. Hand-rolled SVG on the sightline-dashboard precedent.',
			},
		},
	}}
>
	<div
		class="relative flex aspect-video w-full justify-center text-xs"
		style="--color-desktop: var(--chart-1); --color-mobile: var(--chart-2)"
		role="img"
		aria-label="Desktop and mobile visitors, January through June"
		onpointermove={lineMove}
		onpointerleave={() => (hoverLine = null)}
	>
		<svg viewBox="0 0 {W} {H}" class="h-full w-full" aria-hidden="true">
			{#each valueTicks as t (t)}<line x1={mX} x2={W - mX} y1={yValue(t)} y2={yValue(t)} stroke="var(--border)" stroke-opacity="0.5"></line>{/each}
			{#each months as m, i (m.month)}<text x={xAt(i)} y={baseY + 22} text-anchor="middle" font-size="12" fill="var(--muted-foreground)">{m.month.slice(0, 3)}</text>{/each}
			<path d={linePath(desktopLinePts)} fill="none" stroke="var(--color-desktop)" stroke-width="2"></path>
			<path d={linePath(mobileLinePts)} fill="none" stroke="var(--color-mobile)" stroke-width="2"></path>
		</svg>
		{#if hoverLine !== null}
			{@const point = months[hoverLine]}
			{#snippet rows()}
				{@render row('var(--color-desktop)', 'Desktop', point.desktop)}
				{@render row('var(--color-mobile)', 'Mobile', point.mobile)}
			{/snippet}
			{@render tooltip(ptLine, null, rows)}
		{/if}
	</div>
</Story>

<Story
	name="Doughnut Chart"
	asChild
	parameters={{
		docs: {
			description: {
				story:
					'Combine a ring of slices with a label in the hole: the visitor total sits where the lab puts it, and hovering a slice shows its count. Hand-rolled SVG, no chart dependency.',
			},
		},
	}}
>
	<div
		class="relative flex aspect-video w-full justify-center text-xs"
		style="--color-chrome: var(--chart-1); --color-safari: var(--chart-2); --color-other: var(--chart-5)"
		role="img"
		aria-label="Visitors by browser: Chrome, Safari, other"
		onpointermove={sliceMove}
		onpointerleave={() => (hoverSlice = null)}
	>
		<svg viewBox="0 0 {W} {H}" class="h-full w-full" aria-hidden="true">
			{#each slices as s (s.key)}
				<path d={s.d} fill="var(--color-{s.key})"></path>
			{/each}
			<text x={cx} y={cy} text-anchor="middle" dominant-baseline="middle" font-size="30" font-weight="700" fill="var(--foreground)">{totalVisitors.toLocaleString()}</text>
			<text x={cx} y={cy + 24} text-anchor="middle" dominant-baseline="middle" font-size="12" fill="var(--muted-foreground)">Visitors</text>
		</svg>
		{#if hoverSlice !== null}
			{@const slice = browsers[hoverSlice]}
			{#snippet rows()}
				{@render row(`var(--color-${slice.key})`, slice.browser, slice.visitors)}
			{/snippet}
			{@render tooltip(ptSlice, null, rows)}
		{/if}
	</div>
</Story>
