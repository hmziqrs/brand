<script lang="ts">
	import { cn } from '$brand/utils.js';
	import RollingNumber from '$brand/components/rolling-number.svelte';
	import MaterialSparkline from '$brand/components/material-sparkline.svelte';

	let {
		total,
		label,
		series,
		from = 'Jan 2025',
		to = 'Today',
		stats,
		preset = 'copper-sweep',
		layout = 'split',
		note = 'Example numbers, for layout only',
		class: className
	}: {
		total: number;
		label: string;
		series: number[];
		from?: string;
		to?: string;
		stats: { value: number; suffix?: string; label: string }[];
		preset?: string;
		layout?: 'split' | 'stacked';
		note?: string;
		class?: string;
	} = $props();

	let live = $state(0);
	let root: HTMLElement | undefined = $state();

	$effect(() => {
		if (!root || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		let timer: ReturnType<typeof setInterval> | undefined;
		const io = new IntersectionObserver((e) => {
			clearInterval(timer);
			if (e.some((x) => x.isIntersecting)) timer = setInterval(() => (live += 1 + Math.floor(Math.random() * 4)), 1600);
		});
		io.observe(root);
		return () => {
			io.disconnect();
			clearInterval(timer);
		};
	});
</script>

<div bind:this={root} class={cn('giant-counter border-y border-border', className)}>
	<div class={cn('grid', layout === 'split' ? 'lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]' : '')}>
		<div class={cn('flex flex-col justify-end gap-3 p-6 sm:p-10', layout === 'stacked' && 'items-center text-center')}>
			<p class="flex items-center gap-2 font-mono text-xs text-muted-foreground"><span aria-hidden="true" class="size-1.5 bg-mark-square"></span>{note}</p>
			<p class={cn('leading-[0.9] font-medium tracking-[-0.055em]', layout === 'stacked' ? 'text-[clamp(3.25rem,12vw,11rem)]' : 'text-[clamp(3rem,8.4vw,7.5rem)]')}>
				<RollingNumber value={total + live} />
			</p>
			<p class="text-lg text-foreground/85">{label}</p>
		</div>
		<div class={cn('flex flex-col justify-end gap-2 px-6 pt-6 pb-6 sm:px-10', layout === 'split' && 'border-t border-border lg:border-t-0 lg:border-l', layout === 'stacked' && 'pt-0')}>
			<MaterialSparkline values={series} {preset} label={`${label}, ${from} to ${to}, rising`} class={layout === 'stacked' ? 'max-h-[16rem]' : ''} />
			<div class="flex justify-between font-mono text-xs text-muted-foreground"><span>{from}</span><span>{to}</span></div>
		</div>
	</div>
	<div class="grid border-t border-border sm:grid-cols-3">
		{#each stats as s, i (s.label)}
			<div class={cn('flex flex-col gap-2 p-6 sm:p-10', i > 0 && 'border-t border-border sm:border-t-0 sm:border-l')}>
				<p class="text-5xl font-medium tracking-[-0.045em] sm:text-6xl"><RollingNumber value={s.value} format={s.value >= 10000 ? { notation: 'compact', maximumFractionDigits: 1 } : {}} />{s.suffix ?? ''}</p>
				<p class="text-[0.95rem] text-muted-foreground">{s.label}</p>
			</div>
		{/each}
	</div>
</div>
