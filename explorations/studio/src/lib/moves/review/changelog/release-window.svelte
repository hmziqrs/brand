<script lang="ts">
	import type { Snippet } from 'svelte';
	import Move from '@lucide/svelte/icons/move';
	import Glass from '$brand/components/glass.svelte';
	import { cn } from '$brand/utils.js';

	let {
		title,
		drag = false,
		bounds = '[data-window-bounds]',
		class: className,
		children
	}: { title: string; drag?: boolean; bounds?: string; class?: string; children: Snippet } = $props();

	let box: HTMLElement | undefined = $state();
	let x = $state(0);
	let y = $state(0);
	let held = $state(false);
	let start = { px: 0, py: 0, x: 0, y: 0 };
	let room = { left: 0, right: 0, top: 0, bottom: 0 };

	const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

	function down(e: PointerEvent) {
		if (!drag || !box || e.button !== 0) return;
		const host = (box.closest(bounds) as HTMLElement | null) ?? box.parentElement;
		if (!host) return;
		const h = host.getBoundingClientRect();
		const r = box.getBoundingClientRect();
		const pad = 12;
		room = { left: h.left - (r.left - x) + pad, right: h.right - (r.right - x) - pad, top: h.top - (r.top - y) + pad, bottom: h.bottom - (r.bottom - y) - pad };
		start = { px: e.clientX, py: e.clientY, x, y };
		held = true;
		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
	}

	function move(e: PointerEvent) {
		if (!held) return;
		x = clamp(start.x + e.clientX - start.px, Math.min(room.left, 0), Math.max(room.right, 0));
		y = clamp(start.y + e.clientY - start.py, Math.min(room.top, 0), Math.max(room.bottom, 0));
	}
</script>

<figure bind:this={box} data-slot="release-window" class={cn('relative m-0', held && 'z-30', className)} style:translate={x || y ? `${x}px ${y}px` : undefined}>
	<Glass
		variant="frost"
		class={cn(
			'overflow-hidden rounded-xl border border-background/25 shadow-[0_1px_0_0_color-mix(in_oklab,white_30%,transparent)_inset,0_30px_70px_-28px_color-mix(in_oklab,black_55%,transparent)] transition-shadow duration-200 motion-reduce:transition-none dark:border-foreground/25',
			held && 'shadow-[0_1px_0_0_color-mix(in_oklab,white_30%,transparent)_inset,0_44px_90px_-30px_color-mix(in_oklab,black_70%,transparent)]'
		)}
	>
		<div
			role="presentation"
			onpointerdown={down}
			onpointermove={move}
			onpointerup={() => (held = false)}
			onpointercancel={() => (held = false)}
			ondblclick={() => ((x = 0), (y = 0))}
			class={cn('relative flex h-11 items-center border-b border-foreground/10 px-4 select-none', drag && 'cursor-grab touch-none active:cursor-grabbing')}
		>
			<span aria-hidden="true" class="flex gap-2"><i class="size-3 rounded-full bg-red"></i><i class="size-3 rounded-full bg-yellow"></i><i class="size-3 rounded-full bg-green"></i></span>
			<span class="absolute inset-x-20 truncate text-center font-mono text-[13px] text-foreground/75 sm:inset-x-24">{title}</span>
			{#if drag}<span class="ml-auto inline-flex items-center gap-1.5 font-mono text-[11px] text-foreground/70"><Move class="lucide size-3.5" /><span class="hidden sm:inline">drag</span></span>{/if}
		</div>
		{@render children()}
	</Glass>
</figure>
