<script lang="ts" module>
	export type BoardNode = {
		id: string;
		kind: 'image' | 'prompt' | 'grid' | 'palette' | 'video';
		x: number;
		y: number;
		w: number;
		title: string;
		model?: string;
		preset?: string;
		presets?: string[];
		text?: string;
		aspect?: string;
	};
	export type BoardCursor = { name: string; tone: 'orange' | 'teal' | 'pink' | 'yellow' | 'blue' | 'green' | 'purple'; x: number; y: number };
</script>

<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import Play from '@lucide/svelte/icons/play';
	import Sparkles from '@lucide/svelte/icons/sparkles';
	import CursorTag from './cursor-tag.svelte';

	let {
		nodes,
		edges = [],
		cursors = [],
		width = 960,
		height = 560,
		draggable = true,
		frame = true,
		hint = true,
		class: className
	}: {
		nodes: BoardNode[];
		edges?: [string, string][];
		cursors?: BoardCursor[];
		width?: number;
		height?: number;
		draggable?: boolean;
		frame?: boolean;
		hint?: boolean;
		class?: string;
	} = $props();

	const start = () => Object.fromEntries(nodes.map((n) => [n.id, { x: n.x, y: n.y }]));
	let pos = $state<Record<string, { x: number; y: number }>>(start());
	let sizes = $state<Record<string, { w: number; h: number }>>({});
	let outer = $state(0);
	let drag = $state<{ id: string; px: number; py: number; ox: number; oy: number } | null>(null);
	let focus = $state('');
	let t = $state(0);
	let moving = $state(false);

	const scale = $derived(outer ? Math.min(1, outer / width) : 1);

	$effect(() => {
		moving = !matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (!moving || !cursors.length) return;
		let raf = 0;
		const t0 = performance.now();
		const loop = (now: number) => {
			t = (now - t0) / 1000;
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	});

	const wire = (a: string, b: string) => {
		const pa = pos[a];
		const pb = pos[b];
		const na = nodes.find((n) => n.id === a);
		const sa = sizes[a];
		const sb = sizes[b];
		if (!pa || !pb || !na || !sa || !sb) return '';
		const x1 = pa.x + na.w;
		const y1 = pa.y + sa.h / 2;
		const x2 = pb.x;
		const y2 = pb.y + sb.h / 2;
		const dx = Math.max(60, Math.abs(x2 - x1) * 0.5);
		return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
	};

	const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

	function down(e: PointerEvent, id: string) {
		if (!draggable || e.button !== 0) return;
		const p = pos[id];
		drag = { id, px: e.clientX, py: e.clientY, ox: p.x, oy: p.y };
		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
	}
	function move(e: PointerEvent) {
		if (!drag) return;
		const n = nodes.find((v) => v.id === drag!.id)!;
		const h = sizes[n.id]?.h ?? 100;
		pos[drag.id] = {
			x: clamp(drag.ox + (e.clientX - drag.px) / scale, 0, width - n.w),
			y: clamp(drag.oy + (e.clientY - drag.py) / scale, 0, height - h)
		};
	}
	function key(e: KeyboardEvent, id: string) {
		if (!draggable) return;
		const step = e.shiftKey ? 40 : 12;
		const n = nodes.find((v) => v.id === id)!;
		const h = sizes[id]?.h ?? 100;
		const p = pos[id];
		const map: Record<string, [number, number]> = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
		if (e.key === 'Home') {
			pos[id] = { x: n.x, y: n.y };
			e.preventDefault();
		} else if (map[e.key]) {
			pos[id] = { x: clamp(p.x + map[e.key][0], 0, width - n.w), y: clamp(p.y + map[e.key][1], 0, height - h) };
			e.preventDefault();
		}
	}

	const cursorAt = (c: BoardCursor, i: number) => {
		if (!moving) return { x: c.x, y: c.y };
		const s = 0.35 + i * 0.07;
		return { x: c.x + Math.sin(t * s + i * 2.1) * 46 + Math.sin(t * s * 2.3 + i) * 14, y: c.y + Math.cos(t * s * 0.8 + i * 1.3) * 30 };
	};

	const tones = ['bg-orange', 'bg-yellow', 'bg-green', 'bg-teal', 'bg-blue', 'bg-purple', 'bg-pink', 'bg-red'];
</script>

<div
	bind:clientWidth={outer}
	class={cn(
		'relative w-full overflow-hidden select-none',
		frame && 'rounded-3xl border border-border bg-card',
		className
	)}
	style:height="{height * scale}px"
>
	<div
		class="absolute top-0 left-0 origin-top-left bg-[radial-gradient(color-mix(in_oklab,var(--foreground)_14%,transparent)_1px,transparent_1.3px)] [background-size:20px_20px]"
		style:width="{width}px"
		style:height="{height}px"
		style:transform="scale({scale})"
		role="presentation"
		onpointermove={move}
		onpointerup={() => (drag = null)}
		onpointercancel={() => (drag = null)}
	>
		<svg aria-hidden="true" class="pointer-events-none absolute inset-0 overflow-visible" width={width} height={height}>
			{#each edges as [a, b], i (a + b)}
				{@const d = wire(a, b)}
				{#if d}
					<path {d} fill="none" stroke="var(--border)" stroke-width="5" stroke-linecap="round" />
					<path {d} fill="none" stroke="var(--primary)" stroke-width="1.5" stroke-dasharray="4 6" class={cn(moving && 'board-dash')} opacity={drag && (drag.id === a || drag.id === b) ? 1 : 0.75} />
					{#if moving}
						<circle r="3" fill="var(--primary)"><animateMotion dur="2.6s" begin="{i * 0.6}s" repeatCount="indefinite" path={d} /></circle>
					{/if}
				{/if}
			{/each}
		</svg>

		{#each nodes as n (n.id)}
			{@const p = pos[n.id]}
			<article
				bind:clientHeight={() => sizes[n.id]?.h ?? 0, (h) => (sizes[n.id] = { w: n.w, h })}
				tabindex={draggable ? 0 : -1}
				aria-label="{n.title} node{draggable ? ', drag or use arrow keys to move, Home to reset' : ''}"
				onpointerdown={(e) => down(e, n.id)}
				onkeydown={(e) => key(e, n.id)}
				onfocus={() => (focus = n.id)}
				onblur={() => (focus = '')}
				class={cn(
					'absolute rounded-xl border bg-background p-1.5 shadow-[0_24px_40px_-24px_color-mix(in_oklab,black_70%,transparent)] outline-none',
					draggable && 'cursor-grab touch-none',
					drag?.id === n.id ? 'z-20 cursor-grabbing border-primary' : focus === n.id ? 'z-10 border-primary' : 'border-border hover:border-foreground/40'
				)}
				style:left="{p.x}px"
				style:top="{p.y}px"
				style:width="{n.w}px"
			>
				<header class="flex items-center justify-between gap-2 px-1.5 pt-0.5 pb-1.5 font-mono text-[10px] text-foreground">
					<span class="flex min-w-0 items-center gap-1.5"><span class="size-1.5 shrink-0 bg-primary"></span><span class="truncate">{n.title}</span></span>
					{#if n.model}<span class="shrink-0 text-muted-foreground">{n.model}</span>{/if}
				</header>
				{#if n.kind === 'image' || n.kind === 'video'}
					<div class={cn('relative overflow-hidden rounded-lg', n.aspect ?? 'aspect-[4/3]')}>
						<ShaderMaterial preset={n.preset ?? 'oxide-bloom'} rendering="image" loading="eager" controls={false} sizes="{n.w}px" class="pointer-events-none absolute inset-0 h-full w-full" />
						{#if n.kind === 'video'}
							<span class="absolute inset-0 grid place-items-center"><span class="grid size-9 place-items-center rounded-full bg-background/85 text-foreground"><Play class="lucide size-4" /></span></span>
							<span class="absolute inset-x-2 bottom-2 h-1 overflow-hidden rounded-full bg-background/60"><span class="block h-full w-2/5 bg-primary"></span></span>
						{/if}
					</div>
				{:else if n.kind === 'grid'}
					<div class="grid grid-cols-2 gap-1">
						{#each n.presets ?? [] as pr, i (pr + i)}
							<div class="relative aspect-square overflow-hidden rounded-md">
								<ShaderMaterial preset={pr} rendering="image" loading="eager" controls={false} sizes="{Math.round(n.w / 2)}px" class="pointer-events-none absolute inset-0 h-full w-full" />
							</div>
						{/each}
					</div>
				{:else if n.kind === 'palette'}
					<div class="flex h-24 overflow-hidden rounded-lg">
						{#each tones.slice(0, 6) as tn (tn)}<span class={cn('flex-1', tn)}></span>{/each}
					</div>
				{:else}
					<div class="rounded-lg bg-muted p-2.5">
						<p class="text-[12px] leading-snug text-foreground">{n.text}</p>
						<p class="mt-2 inline-flex items-center gap-1 rounded-md bg-primary px-1.5 py-0.5 font-mono text-[9px] text-primary-foreground"><Sparkles class="lucide size-2.5" />Run</p>
					</div>
				{/if}
				<span class="absolute top-1/2 -left-[5px] size-2.5 -translate-y-1/2 rounded-full border border-primary bg-background"></span>
				<span class="absolute top-1/2 -right-[5px] size-2.5 -translate-y-1/2 rounded-full bg-primary"></span>
			</article>
		{/each}

		{#each cursors as c, i (c.name)}
			{@const at = cursorAt(c, i)}
			<CursorTag name={c.name} tone={c.tone} class="pointer-events-none absolute z-30" style="left:{at.x}px;top:{at.y}px" />
		{/each}
	</div>
	{#if hint && draggable}
		<p class="pointer-events-none absolute bottom-3 left-4 hidden font-mono sm:block text-[10px] tracking-wide text-muted-foreground uppercase">Drag a node · arrows to nudge · Home resets</p>
	{/if}
</div>

<style>
	.board-dash {
		animation: board-dash 1.2s linear infinite;
	}
	@keyframes board-dash {
		to {
			stroke-dashoffset: -20;
		}
	}
</style>
