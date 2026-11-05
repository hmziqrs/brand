<script lang="ts">
	import { cn } from '$brand/utils.js';
	import type { Snippet } from 'svelte';
	import type { Tint } from './site';

	let {
		title = '',
		tint = 'none',
		drag = false,
		caption,
		class: className,
		body: bodyClass,
		children
	}: { title?: string; tint?: Tint; drag?: boolean; caption?: string; class?: string; body?: string; children?: Snippet } = $props();

	let x = $state(0);
	let y = $state(0);
	let held = $state(false);
	let start = { px: 0, py: 0, x: 0, y: 0 };

	function down(e: PointerEvent) {
		if (!drag) return;
		held = true;
		start = { px: e.clientX, py: e.clientY, x, y };
		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
	}
	function move(e: PointerEvent) {
		if (!held) return;
		x = start.x + e.clientX - start.px;
		y = start.y + e.clientY - start.py;
	}
	const bar = $derived(tint === 'none' ? 'var(--card)' : `color-mix(in oklab, var(--${tint}) 26%, var(--card))`);
</script>

<figure class={cn('m-0', held ? 'z-30' : '', className)} style:translate="{x}px {y}px">
	<div class={cn('overflow-hidden rounded-[10px] border border-[color-mix(in_oklab,var(--foreground)_18%,transparent)] bg-card shadow-[0_18px_50px_-20px_color-mix(in_oklab,black_55%,transparent),0_2px_6px_color-mix(in_oklab,black_15%,transparent)]', held && 'shadow-[0_30px_70px_-20px_color-mix(in_oklab,black_70%,transparent)]')}>
		<div
			role="presentation"
			onpointerdown={down}
			onpointermove={move}
			onpointerup={() => (held = false)}
			onpointercancel={() => (held = false)}
			class={cn('relative flex h-8 items-center gap-1.5 border-b border-[color-mix(in_oklab,var(--foreground)_12%,transparent)] px-3 select-none', drag && 'cursor-grab touch-none active:cursor-grabbing')}
			style:background={bar}
		>
			<span class="size-2.5 rounded-full bg-red"></span>
			<span class="size-2.5 rounded-full bg-yellow"></span>
			<span class="size-2.5 rounded-full bg-green"></span>
			{#if title}<span class="absolute inset-x-16 truncate text-center font-mono text-[11px] text-foreground">{title}</span>{/if}
		</div>
		<div class={cn('relative', bodyClass)}>
			{#if children}{@render children()}{/if}
		</div>
	</div>
	{#if caption}<figcaption class="mt-2 text-center font-mono text-[11px] text-muted-foreground">{caption}</figcaption>{/if}
</figure>
