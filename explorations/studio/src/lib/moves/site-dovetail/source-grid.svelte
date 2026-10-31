<script lang="ts">
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import { cn } from '$brand/utils.js';
	import { tools, sinks, type Tool } from './site';

	let {
		focus = [],
		caption,
		class: className
	}: {
		focus?: string[];
		caption?: string;
		class?: string;
	} = $props();

	const cols = 6;
	const rows = 4;
	const pool: Tool[] = [...tools, ...sinks];
	const center = [8, 9, 14, 15];
	const cells = Array.from({ length: cols * rows }, (_, i) => i);
	const toolAt = (i: number) => {
		const k = center.includes(i) ? -1 : i - center.filter((c) => c < i).length;
		return k < 0 ? null : pool[k % pool.length];
	};

	let host: HTMLDivElement | undefined = $state();
	let mx = $state(-999);
	let my = $state(-999);

	const move = (e: PointerEvent) => {
		if (!host) return;
		const r = host.getBoundingClientRect();
		mx = e.clientX - r.left;
		my = e.clientY - r.top;
	};
	const lift = (i: number) => {
		if (!host || mx < -900) return 0;
		const w = host.clientWidth / cols;
		const h = host.clientHeight / rows;
		const cx = (i % cols) * w + w / 2;
		const cy = Math.floor(i / cols) * h + h / 2;
		return Math.max(0, 1 - Math.hypot(cx - mx, cy - my) / (w * 1.8));
	};
</script>

<div
	bind:this={host}
	onpointermove={move}
	onpointerleave={() => ((mx = -999), (my = -999))}
	class={cn('relative grid h-full min-h-[inherit] grid-cols-6 grid-rows-4 gap-2 p-4 sm:gap-3 sm:p-6', className)}
	style:background="radial-gradient(circle 220px at {mx}px {my}px, color-mix(in oklab, var(--orange) 16%, transparent), transparent)"
>
	{#each cells as i (i)}
		{@const t = toolAt(i)}
		{#if i === center[0]}
			<div class="col-span-2 row-span-2 grid place-items-center rounded-2xl bg-orange text-[var(--on-orange)]">
				<span class="flex flex-col items-center gap-2">
					<span class="size-9 bg-[var(--on-orange)] sm:size-12"></span>
					<span class="font-mono text-[0.6rem] tracking-[0.14em] uppercase sm:text-[0.65rem]">context layer</span>
				</span>
			</div>
		{:else if t}
			{@const on = focus.includes(t.name)}
			{@const l = lift(i)}
			<div
				class={cn(
					'grid place-items-center rounded-xl border transition-[background-color,border-color,opacity] duration-300 motion-reduce:transition-none',
					on ? 'border-primary bg-[color-mix(in_oklab,var(--primary)_14%,var(--card))] text-foreground' : 'border-[color-mix(in_oklab,var(--foreground)_10%,transparent)] bg-background text-foreground/70',
					focus.length && !on && 'opacity-45'
				)}
				style:transform="translateY({-l * 6}px) scale({1 + l * 0.08})"
				title={t.name}
			>
				<BrandIcon icon={t.icon} label={t.name} class="size-5 sm:size-6" />
			</div>
		{/if}
	{/each}
	{#if caption}
		<p class="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-background px-3 py-1 font-mono text-[0.625rem] tracking-[0.12em] whitespace-nowrap text-foreground uppercase">{caption}</p>
	{/if}
</div>
