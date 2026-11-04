<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Mic from '@lucide/svelte/icons/mic';
	import DeskWindow from './desk-window.svelte';

	let { class: className }: { class?: string } = $props();

	type Spot = { id: string; ask: string; say: string; box: [number, number, number, number] };
	const spots: Spot[] = [
		{ id: 'sum', ask: 'how do i add up the costs?', say: 'tap this Σ while column C is selected. it writes =SUM(C3:C8) for you.', box: [57, 1, 8, 8] },
		{ id: 'col', ask: 'which column is the money?', say: 'this one. column C holds every cost, the rest are labels and dates.', box: [70, 27, 20, 73] },
		{ id: 'chart', ask: 'can i make this a chart?', say: 'select the table, then this little bar icon. pick "column" and you are done.', box: [67, 1, 8, 8] },
		{ id: 'cell', ask: 'why is this one red?', say: 'that hotel is over budget. the rule in Format → Conditional turns anything above 400 red.', box: [70, 64, 20, 12] }
	];
	let cur = $state(0);
	let n = $state(0);
	const s = $derived(spots[cur]);
	const cx = $derived(s.box[0] + s.box[2] * 0.82);
	const cy = $derived(s.box[1] + s.box[3] * 0.85);

	const rows = [
		['flights', 'mar 3', '612'],
		['train pass', 'mar 4', '180'],
		['hotel lisbon', 'mar 4', '388'],
		['hotel porto', 'mar 7', '455'],
		['food', '—', '240'],
		['museum', 'mar 6', '36']
	];

	function go(i: number) {
		cur = i;
		n++;
	}
	const ellipse = (b: [number, number, number, number]) => {
		const [x, y, w, h] = b;
		const rx = w / 2 + 2;
		const ry = h / 2 + 2;
		const ox = x + w / 2;
		const oy = y + h / 2;
		return `M${ox - rx + 1} ${oy - 1}C${ox - rx} ${oy - ry - 1} ${ox + rx + 1} ${oy - ry} ${ox + rx} ${oy}S${ox - rx - 1} ${oy + ry + 2} ${ox - rx} ${oy - 2}S${ox - 2} ${oy - ry - 3} ${ox + 3} ${oy - ry + 1}`;
	};
</script>

<div class={cn('grid gap-5', className)}>
	<DeskWindow title="trip-budget.sheet" body="relative aspect-[16/10] sm:aspect-[16/9]">
		<div class="absolute inset-0 grid grid-rows-[auto_auto_1fr] bg-card text-[11px] text-foreground sm:text-[13px]">
			<div class="flex items-center gap-1 border-b border-border px-3 py-1.5 sm:gap-2">
				{#each ['B', 'I', 'U'] as t (t)}<span class="grid size-6 place-items-center rounded font-semibold opacity-70 sm:size-7">{t}</span>{/each}
				<span class="mx-1 h-4 w-px bg-border"></span>
				<span class="opacity-60">Arial · 11</span>
				<button type="button" onclick={() => go(0)} class="absolute top-[1%] left-[57%] grid h-[8%] w-[8%] place-items-center rounded font-semibold hover:bg-muted" aria-label="Sum">Σ</button>
				<button type="button" onclick={() => go(2)} class="absolute top-[1%] left-[67%] grid h-[8%] w-[8%] place-items-center rounded hover:bg-muted" aria-label="Chart">
					<svg viewBox="0 0 16 16" class="size-4" fill="currentColor"><rect x="2" y="8" width="3" height="6" /><rect x="7" y="4" width="3" height="10" /><rect x="12" y="6" width="3" height="8" /></svg>
				</button>
			</div>
			<div class="flex items-center gap-2 border-b border-border px-3 py-1 font-mono opacity-80"><span class="opacity-60">fx</span>=C5</div>
			<div class="relative grid grid-cols-[6%_44%_20%_20%_10%] grid-rows-7 font-mono">
				{#each ['', 'A', 'B', 'C', 'D'] as h (h)}<span class="flex items-center justify-center border-r border-b border-border bg-muted/50 px-1 opacity-70">{h}</span>{/each}
				{#each rows as r, i (r[0])}
					<span class="flex items-center justify-center border-r border-b border-border px-1 opacity-60">{i + 3}</span>
					<span class="flex items-center truncate border-r border-b border-border px-2">{r[0]}</span>
					<span class="flex items-center border-r border-b border-border px-2 opacity-70">{r[1]}</span>
					<button type="button" onclick={() => go(r[2] === '455' ? 3 : 1)} class={cn('flex items-center justify-end border-r border-b border-border px-2 hover:bg-muted', r[2] === '455' && 'font-semibold text-red')}>{r[2]}</button>
					<span class="border-b border-border"></span>
				{/each}
			</div>
		</div>

		<svg viewBox="0 0 100 100" preserveAspectRatio="none" class="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
			{#key n}
				<path d={ellipse(s.box)} fill="none" stroke="var(--orange)" stroke-width="2.4" vector-effect="non-scaling-stroke" stroke-linecap="round" class="draw" pathLength="100" />
			{/key}
		</svg>

		<div class="pointer-events-none absolute z-10 transition-[left,top] duration-700 ease-[cubic-bezier(.3,.8,.3,1)] motion-reduce:transition-none" style:left="{cx}%" style:top="{cy}%">
			<svg viewBox="0 0 24 24" class="size-6 drop-shadow-md sm:size-7" aria-hidden="true"><path d="M3 2l7 19 2.6-7.4L20 11z" fill="var(--orange)" stroke="var(--background)" stroke-width="1.5" stroke-linejoin="round" /></svg>
			{#key n}
				<p class="bubble absolute top-7 left-4 w-[min(260px,58vw)] rounded-xl rounded-tl-sm bg-foreground px-3 py-2 text-[12px] leading-snug text-background shadow-lg sm:text-sm" class:right-4={cx > 60} class:left-auto={cx > 60}>{s.say}</p>
			{/key}
		</div>
	</DeskWindow>

	<div class="flex flex-wrap items-center justify-center gap-2">
		<span class="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1.5 font-mono text-xs text-background"><Mic class="lucide size-3.5" />hold ⌥ space and ask</span>
		{#each spots as sp, i (sp.id)}
			<button type="button" onclick={() => go(i)} aria-pressed={cur === i} class="rounded-full border border-border bg-card px-3 py-1.5 text-sm text-foreground transition-colors hover:border-foreground aria-pressed:border-[var(--orange)] aria-pressed:bg-[var(--orange)] aria-pressed:text-[var(--on-orange)]">“{sp.ask}”</button>
		{/each}
	</div>
</div>

<style>
	.draw {
		stroke-dasharray: 100;
		stroke-dashoffset: 100;
		animation: draw 900ms 450ms cubic-bezier(0.5, 0, 0.3, 1) forwards;
	}
	.bubble {
		animation: pop 300ms 650ms both;
	}
	@keyframes draw {
		to {
			stroke-dashoffset: 0;
		}
	}
	@keyframes pop {
		from {
			opacity: 0;
			transform: translateY(4px) scale(0.96);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.draw {
			animation: none;
			stroke-dashoffset: 0;
		}
		.bubble {
			animation: none;
		}
	}
</style>
