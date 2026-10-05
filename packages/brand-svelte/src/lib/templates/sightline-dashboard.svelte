<!-- Sightline's app: four clickable screens at a fixed height, every number drawn from a seed. The area chart replaces the lab's recharts one with hand-rolled SVG that matches it. -->
<script lang="ts">
	import ArrowDownRight from "@lucide/svelte/icons/arrow-down-right";
	import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right";
	import ChevronsUpDown from "@lucide/svelte/icons/chevrons-up-down";
	import Filter from "@lucide/svelte/icons/filter";
	import Grid3x3 from "@lucide/svelte/icons/grid-3x3";
	import LayoutDashboard from "@lucide/svelte/icons/layout-dashboard";
	import Radio from "@lucide/svelte/icons/radio";
	import { hash, rng } from "@hmziq/brand-core/motion/rings";
	import { cn } from "$brand/utils.js";
	import AppWindow from "$brand/blocks/saas/app-window.svelte";
	import Mark from "$brand/components/mark.svelte";
	import Marker from "$brand/components/marker.svelte";
	import Segmented from "$brand/components/segmented.svelte";
	type Screen = "overview" | "funnels" | "retention" | "live";
	type Range = "7" | "30" | "90";
	const screens = [
		{ key: "overview", label: "Overview", icon: LayoutDashboard }, { key: "funnels", label: "Funnels", icon: Filter },
		{ key: "retention", label: "Retention", icon: Grid3x3 }, { key: "live", label: "Live", icon: Radio },
	] as const;
	const titles: Record<Screen, string> = { overview: "Overview", funnels: "Pricing to team", retention: "Coming back", live: "Live" };
	const fmt = (n: number) => n.toLocaleString("en-US");
	function series(days: number) {
		const random = rng(hash(`sightline ${days}`));
		const start = new Date(2026, 8, 27 - days);
		return Array.from({ length: days }, (_, i) => {
			const d = new Date(start);
			d.setDate(start.getDate() + i + 1);
			const weekend = d.getDay() === 0 || d.getDay() === 6;
			const base = (weekend ? 1100 : 1750) * (1 + i / days / 4);
			return {
				day: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
				current: Math.round(base + random() * 420),
				previous: Math.round(base * 0.86 + random() * 380),
			};
		});
	}
	function niceTicks(min: number, max: number, count: number) {
		const stepOf = (rough: number, corr: number) => {
			const dc = rough === 0 ? 1 : Math.floor(Math.log10(Math.abs(rough))) + 1;
			const scale = dc !== 1 ? 0.05 : 0.1;
			return (Math.ceil(rough / 10 ** dc / scale) + corr) * scale * 10 ** dc;
		};
		const calc = (corr: number): { step: number; lo: number; hi: number } => {
			const step = stepOf((max - min) / (count - 1), corr);
			const middle = min <= 0 && max >= 0 ? 0 : (min + max) / 2 - (((min + max) / 2) % step);
			let below = Math.ceil((middle - min) / step), up = Math.ceil((max - middle) / step);
			const total = below + up + 1;
			if (total > count) return calc(corr + 1);
			if (total < count) { if (max > 0) up += count - total; else below += count - total; }
			return { step, lo: middle - below * step, hi: middle + up * step };
		};
		const { step, lo, hi } = calc(0);
		const out: number[] = [];
		for (let v = lo; v <= hi + 0.1 * step + 1e-9; v += step) out.push(v);
		return out;
	}
	function linePath(pts: { x: number; y: number }[]) {
		const n = pts.length;
		if (n === 1) return `M${pts[0].x},${pts[0].y}`;
		const dx = pts[1].x - pts[0].x;
		const m: number[] = [];
		for (let i = 0; i < n - 1; i++) m.push((pts[i + 1].y - pts[i].y) / dx);
		const t = [m[0]];
		for (let i = 1; i < n - 1; i++) t.push(m[i - 1] * m[i] <= 0 ? 0 : (m[i - 1] + m[i]) / 2);
		t.push(m[n - 2]);
		t[0] = (3 * m[0] - t[1]) / 2;
		t[n - 1] = (3 * m[n - 2] - t[n - 2]) / 2;
		let d = `M${pts[0].x},${pts[0].y}`;
		for (let i = 0; i < n - 1; i++) {
			d += `C${pts[i].x + dx / 3},${pts[i].y + (t[i] * dx) / 3} ${pts[i + 1].x - dx / 3},${pts[i + 1].y - (t[i + 1] * dx) / 3} ${pts[i + 1].x},${pts[i + 1].y}`;
		}
		return d;
	}
	let screen = $state<Screen>("overview");
	let range = $state<Range>("30");
	const H = 144, axisW = 34, mTop = 8, mRight = 8, xH = 30;
	let width = $state(600);
	let hover = $state<number | null>(null);
	let mx = $state(0);
	let my = $state(0);
	let canvasCtx: CanvasRenderingContext2D | null = null;
	function textWidth(text: string) {
		if (typeof document === "undefined") return text.length * 6.4;
		canvasCtx ??= document.createElement("canvas").getContext("2d");
		if (!canvasCtx) return text.length * 6.4;
		canvasCtx.font = `12px ${getComputedStyle(document.body).fontFamily}`;
		return canvasCtx.measureText(text).width;
	}
	const data = $derived(series(Number(range)));
	const total = $derived(data.reduce((s, d) => s + d.current, 0));
	const before = $derived(data.reduce((s, d) => s + d.previous, 0));
	const change = $derived(Math.round(((total - before) / before) * 100));
	const stats = $derived([
		{ label: "Visitors", value: fmt(total), delta: change }, { label: "Signed up", value: fmt(Math.round(total * 0.041)), delta: change + 3 }, { label: "Came back", value: "41%", delta: -2 },
	]);
	const plotW = $derived(width - axisW - mRight);
	const plotH = $derived(H - mTop - xH);
	const ticks = $derived(niceTicks(0, Math.max(...data.map((d) => Math.max(d.current, d.previous))), 5));
	const yMax = $derived(ticks[ticks.length - 1] ?? 1);
	const step = $derived(data.length > 1 ? plotW / (data.length - 1) : 0);
	const xAt = (i: number) => axisW + i * step;
	const yAt = (v: number) => mTop + plotH * (1 - v / yMax);
	const pts = $derived(data.map((d, i) => ({ x: xAt(i), y: yAt(d.current) }))), ptsPrev = $derived(data.map((d, i) => ({ x: xAt(i), y: yAt(d.previous) })));
	const line = $derived(linePath(pts)), linePrev = $derived(linePath(ptsPrev));
	const area = $derived(`${line}L${pts[pts.length - 1].x},${yAt(0)}L${pts[0].x},${yAt(0)}Z`);
	const xTicks = $derived.by(() => {
		let end = width;
		const shown: { day: string; x: number }[] = [];
		for (let i = data.length - 1; i >= 0; i--) {
			const size = textWidth(data[i].day);
			let x = xAt(i);
			if (i === data.length - 1 && x + size / 2 > width) x = width - size / 2;
			if (x >= 0 && x <= end && x - size / 2 >= 0 && x + size / 2 <= end) {
				end = x - (size / 2 + 32);
				shown.push({ day: data[i].day, x });
			}
		}
		return shown.reverse();
	});
	function onMove(e: PointerEvent) {
		const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
		mx = e.clientX - rect.left, my = e.clientY - rect.top;
		hover = Math.min(data.length - 1, Math.max(0, Math.round((mx - axisW) / step)));
	}
	function onKey(e: KeyboardEvent) {
		if (e.key === "Escape") return void (hover = null);
		if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
		e.preventDefault();
		const last = data.length - 1;
		hover = hover === null ? (e.key === "ArrowLeft" ? 0 : last) : Math.min(last, Math.max(0, hover + (e.key === "ArrowRight" ? 1 : -1)));
		mx = xAt(hover);
		my = yAt(data[hover].current);
	}
	const funnel = [["Opened the pricing page", 12400], ["Started signing up", 4960], ["Created a project", 2730], ["Invited a teammate", 1090]] as const;
	const cohorts = [
		["Aug 3", [100, 46, 38, 33, 31, 29, 28]], ["Aug 10", [100, 49, 40, 35, 32, 30]], ["Aug 17", [100, 44, 36, 31, 29]],
		["Aug 24", [100, 52, 43, 37]], ["Aug 31", [100, 55, 45]], ["Sep 7", [100, 58]], ["Sep 14", [100]],
	] as const;
	function heat(v: number) {
		if (v >= 60) return "bg-primary text-primary-foreground";
		if (v >= 45) return "bg-primary/60 text-foreground";
		if (v >= 35) return "bg-primary/35 text-foreground";
		if (v >= 30) return "bg-primary/18 text-foreground";
		return "bg-primary/8 text-foreground";
	}
	const pages = [["/pricing", 0.32], ["/", 0.27], ["/docs/getting-started", 0.18], ["/blog/launch-week", 0.11]] as const;
	const events = [
		["now", "Maya from Lisbon", "invited 3 teammates", "success"], ["12s", "Someone in Austin", "opened /pricing", undefined],
		["40s", "Kenji from Osaka", "created a project", "success"], ["1m", "Someone in Berlin", "left at the card step", "warning"],
		["2m", "Priya from Pune", "exported a report", undefined], ["3m", "Someone in Toronto", "read /docs/getting-started", undefined],
		["4m", "Lucas from São Paulo", "upgraded to Growth", "success"],
	] as const;
</script>

<AppWindow url={`app.sightline.io/paperplane/${screen}`}>
	<div class="grid md:h-[33rem] md:grid-cols-[12.5rem_minmax(0,1fr)]">
		<nav aria-label="Sightline app" class="flex min-w-0 flex-col gap-4 border-b p-3 md:border-r md:border-b-0">
			<span class="flex items-center gap-2.5 rounded-md px-1.5 py-1 text-sm font-medium"><Mark symbol="Pp" size={24} />Paperplane<ChevronsUpDown class="lucide ml-auto size-3.5 text-muted-foreground" /></span>
			<ul class="flex gap-1 overflow-x-auto md:flex-col">
				{#each screens as { key, label, icon: Icon } (key)}
					<li>
						<button type="button" aria-pressed={screen === key} onclick={() => (screen = key)} class="flex h-8 w-full items-center gap-2.5 rounded-md px-2.5 text-[0.8125rem] whitespace-nowrap text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 aria-pressed:bg-muted aria-pressed:text-foreground">
							<Icon class="lucide size-4" />
							{label}
						</button>
					</li>
				{/each}
			</ul>
			<p class="mt-auto hidden items-center gap-2 px-2.5 text-xs text-muted-foreground md:flex"><Marker filled class="text-success" />Tracking is on</p>
		</nav>
		<div class="flex min-h-0 min-w-0 flex-col">
			<div class="flex min-h-13 flex-wrap items-center justify-between gap-2 border-b px-4 py-2">
				<p class="text-sm font-medium">{titles[screen]}</p>
				{#if screen === "overview"}
					<Segmented label="Date range" value={range} onValueChange={(v) => (range = v as Range)} options={[{ value: "7", label: "7 days" }, { value: "30", label: "30 days" }, { value: "90", label: "90 days" }]} />
				{/if}
			</div>
			<div class="min-h-0 flex-1 overflow-auto p-4">
				{#if screen === "overview"}
					<div class="flex flex-col gap-4">
						<ul class="grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-3">
							{#each stats as s (s.label)}
								{@const up = s.delta >= 0}
								<li class="flex flex-col gap-1 bg-background px-3.5 py-3">
									<span class="text-xs text-muted-foreground">{s.label}</span>
									<span class="flex flex-wrap items-baseline gap-x-2">
										<span class="text-xl font-medium tracking-[-0.02em]">{s.value}</span>
										<span class={cn("inline-flex items-center gap-0.5 text-xs font-medium", up ? "text-success" : "text-destructive")}>
											{#if up}<ArrowUpRight class="lucide size-3.5" />{:else}<ArrowDownRight class="lucide size-3.5" />{/if}
											{Math.abs(s.delta)}%<span class="sr-only">{up ? " up" : " down"}</span>
										</span>
									</span>
								</li>
							{/each}
						</ul>
						<div class="rounded-lg border px-2 pt-3 pb-1">
							<div class="flex flex-wrap items-center justify-between gap-2 px-2 pb-1">
								<span class="text-xs font-medium">Visitors a day</span>
								<span class="flex gap-3 text-xs text-muted-foreground"><span class="inline-flex items-center gap-1.5"><i class="h-0.5 w-3 rounded-full bg-primary" aria-hidden="true"></i>This period</span><span class="inline-flex items-center gap-1.5"><i class="h-0 w-3 border-t-2 border-dashed border-muted-foreground" aria-hidden="true"></i>Previous</span></span>
							</div>
							<!-- svelte-ignore a11y_no_noninteractive_tabindex, a11y_no_noninteractive_element_interactions -->
							<div class="relative aspect-auto h-36 w-full" bind:clientWidth={width} style="--color-current: var(--chart-1); --color-previous: var(--muted-foreground)" role="application" aria-label="Visitors a day, this period against the previous period" tabindex="0" onkeydown={onKey} onpointermove={onMove} onpointerleave={() => (hover = null)}>
								<svg width={width} height={H} viewBox="0 0 {width} {H}" aria-hidden="true">
									{#each ticks as t (t)}<line x1={axisW} x2={axisW + plotW} y1={yAt(t)} y2={yAt(t)} stroke="var(--border)" stroke-opacity="0.5"></line>{/each}
									{#each ticks as t (t)}<text x={axisW - 8} y={yAt(t)} text-anchor="end" dominant-baseline="central" font-size="12" fill="var(--muted-foreground)">{(t / 1000).toFixed(1)}k</text>{/each}
									{#each xTicks as t (t.day + t.x)}<text x={t.x} y={mTop + plotH + 14} text-anchor="middle" font-size="12" fill="var(--muted-foreground)">{t.day}</text>{/each}
									<path d={linePrev} fill="none" stroke="var(--color-previous)" stroke-width="1.5" stroke-dasharray="4 4"></path>
									<path d={area} fill="var(--color-current)" fill-opacity="0.12" stroke="none"></path>
									<path d={line} fill="none" stroke="var(--color-current)" stroke-width="2"></path>
									{#if hover !== null}<line x1={xAt(hover)} x2={xAt(hover)} y1={mTop} y2={mTop + plotH} stroke="var(--border)"></line>{/if}
								</svg>
								{#if hover !== null}
									{@const point = data[hover]}
									{@const left = Math.min(Math.max(mx + 14, 4), Math.max(4, width - 168))}
									{@const top = Math.min(Math.max(my - 28, 4), 84)}
									<div class="pointer-events-none absolute grid min-w-32 items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl" style="left: {left}px; top: {top}px;">
										<div class="font-medium">{point.day}</div>
										<div class="grid gap-1.5">
											<div class="flex w-full flex-wrap items-stretch gap-2"><div class="w-1 shrink-0 rounded-[2px] bg-(--color-previous)" aria-hidden="true"></div><div class="flex flex-1 items-center justify-between leading-none"><span class="text-muted-foreground">Previous period</span><span class="font-mono font-medium text-foreground tabular-nums">{fmt(point.previous)}</span></div></div>
											<div class="flex w-full flex-wrap items-stretch gap-2"><div class="w-1 shrink-0 rounded-[2px] bg-(--color-current)" aria-hidden="true"></div><div class="flex flex-1 items-center justify-between leading-none"><span class="text-muted-foreground">This period</span><span class="font-mono font-medium text-foreground tabular-nums">{fmt(point.current)}</span></div></div>
										</div>
									</div>
								{/if}
							</div>
						</div>
						<div class="flex flex-col gap-2">
							<span class="text-xs font-medium">Top pages</span>
							<ul class="flex flex-col gap-2">
								{#each pages as [path, share] (path)}
									<li class="grid grid-cols-[minmax(0,1fr)_3rem] items-center gap-3 text-xs">
										<span class="relative flex h-6 items-center overflow-hidden rounded-sm px-2"><i class="absolute inset-y-0 left-0 rounded-sm bg-primary/10 dark:bg-primary/20" style="width: {share * 250}%" aria-hidden="true"></i><span class="relative truncate font-mono">{path}</span></span>
										<span class="text-right text-muted-foreground tabular-nums">{fmt(Math.round(total * share))}</span>
									</li>
								{/each}
							</ul>
						</div>
					</div>
				{:else if screen === "funnels"}
					<div class="flex flex-col gap-4">
						<p class="text-xs text-muted-foreground">From the pricing page to a team, last 30 days</p>
						<ol class="flex flex-col gap-4">
							{#each funnel as [step_, n], i (step_)}
								{@const prev = i ? funnel[i - 1][1] : n}
								{@const kept = Math.round((n / prev) * 100)}
								<li class="flex flex-col gap-1.5">
									<span class="flex items-baseline justify-between gap-3 text-xs">
										<span><span class="mr-2 text-muted-foreground tabular-nums">{i + 1}</span>{step_}</span>
										<span class="text-muted-foreground tabular-nums">{fmt(n)}{#if i > 0}<span class="ml-2">{kept}% kept</span>{/if}</span>
									</span>
									<span class="h-7 overflow-hidden rounded-sm bg-foreground/5" aria-hidden="true"><i class="block h-full rounded-sm bg-primary" style="width: {(n / funnel[0][1]) * 100}%"></i></span>
								</li>
							{/each}
						</ol>
						<p class="flex items-center gap-2 text-xs text-muted-foreground"><Marker class="text-warning" />The biggest drop is between the pricing page and signing up: 60% leave there.</p>
					</div>
				{:else if screen === "retention"}
					<div class="flex flex-col gap-3">
						<p class="text-xs text-muted-foreground">Of the people who signed up each week, how many came back</p>
						<div class="overflow-x-auto">
							<table class="w-full border-separate border-spacing-[3px] text-center text-xs tabular-nums">
								<caption class="sr-only">Share of each week's new people who came back, by week</caption>
								<thead>
									<tr class="text-muted-foreground">
										<th scope="col" class="pb-1 text-left font-normal">Week of</th>
										{#each Array.from({ length: 7 }, (_, i) => i) as i (i)}<th scope="col" class="pb-1 font-normal">{i === 0 ? "Start" : `+${i}`}</th>{/each}
									</tr>
								</thead>
								<tbody>
									{#each cohorts as [week, values] (week)}
										<tr>
											<th scope="row" class="pr-2 text-left font-normal whitespace-nowrap text-muted-foreground">{week}</th>
											{#each Array.from({ length: 7 }, (_, i) => i) as i (i)}
												{@const v = values[i]}
												<td class={cn("h-8 min-w-10 rounded-sm", v === undefined ? "" : heat(v))}>{v === undefined ? "" : `${v}%`}</td>
											{/each}
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
				{:else}
					<div class="flex flex-col gap-3">
						<p class="flex items-center gap-2 text-xs text-muted-foreground"><Marker filled class="text-success" />38 people on your site right now</p>
						<ul class="divide-y rounded-lg border">
							{#each events as [when, who, what, tone] (when)}
								<li class="grid grid-cols-[2.5rem_0.55rem_minmax(0,1fr)] items-baseline gap-2.5 px-3.5 py-2.5 text-xs"><span class="text-muted-foreground tabular-nums">{when}</span><Marker filled={Boolean(tone)} class={tone === "success" ? "text-success" : tone === "warning" ? "text-warning" : "text-muted-foreground"} /><span class="truncate">{who} <span class="text-muted-foreground">{what}</span></span></li>
							{/each}
						</ul>
					</div>
				{/if}
			</div>
		</div>
	</div>
</AppWindow>
