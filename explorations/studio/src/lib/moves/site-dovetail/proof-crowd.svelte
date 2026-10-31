<script lang="ts">
	import type { Snippet } from 'svelte';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import { shaderPosters } from '@hmziq/brand-core/shaders/posters';
	import RustGridField from '$moves/flora/rust-grid-field.svelte';
	import { cn } from '$brand/utils.js';
	import { tools, sinks, type Tool } from './site';

	let {
		lines = ['Bring', 'proof,', 'not', 'hunches'],
		accent = 3,
		preset = 'hammered-copper',
		field = true,
		after,
		class: className
	}: {
		lines?: string[];
		accent?: number;
		preset?: string;
		field?: boolean;
		after?: Snippet;
		class?: string;
	} = $props();

	const spots = [
		[13, 14, 5.4],
		[80, 9, 6.2],
		[92, 36, 4.6],
		[7, 44, 4.4],
		[86, 64, 5.6],
		[15, 74, 6],
		[28, 3, 3.8],
		[74, 92, 4.2],
		[27, 95, 3.4],
		[96, 90, 3.6]
	] as const;
	const tones = ['oxide', 'card', 'material', 'ink', 'card', 'oxide', 'material', 'card', 'ink', 'material'] as const;
	const pool: Tool[] = [...tools.slice(0, 5), ...sinks.slice(0, 5)];
	const poster = $derived((shaderPosters[preset] ?? shaderPosters['hammered-copper']).src);

	let host: HTMLElement | undefined = $state();
	let px = $state(0.5);
	let py = $state(0.5);
	let inside = $state(false);

	const move = (e: PointerEvent) => {
		if (!host) return;
		const r = host.getBoundingClientRect();
		px = (e.clientX - r.left) / r.width;
		py = (e.clientY - r.top) / r.height;
		inside = true;
	};

	const shift = (l: number, t: number, s: number) => {
		if (!inside) return 'translate3d(0,0,0)';
		const dx = l / 100 - px;
		const dy = t / 100 - py;
		const d = Math.hypot(dx, dy) + 0.0001;
		const push = Math.max(0, 0.28 - d) * 260;
		const depth = s / 6;
		return `translate3d(${(dx / d) * push + (px - 0.5) * -40 * depth}px, ${(dy / d) * push + (py - 0.5) * -30 * depth}px, 0) rotate(${(dx / d) * push * 0.08}deg)`;
	};
</script>

<section
	bind:this={host}
	onpointermove={move}
	onpointerleave={() => (inside = false)}
	class={cn('relative isolate overflow-hidden py-24 sm:py-32', className)}
>
	{#if field}<RustGridField cell={22} radius={2.2} gap={1} fade="radial" stain="--foreground" ambient={true} lines={false} class="-z-10 opacity-80" />{/if}
	<div class="relative mx-auto flex min-h-[34rem] w-full max-w-[82rem] items-center justify-center px-4 sm:min-h-[48rem] sm:px-6">
		{#each spots as [l, t, s], i (i)}
			{@const tool = pool[i % pool.length]}
			{@const tone = tones[i % tones.length]}
			<span
				class="absolute z-10 hidden -translate-x-1/2 -translate-y-1/2 sm:block"
				style:left="{l}%"
				style:top="{t}%"
			>
				<span
					class={cn(
						'grid place-items-center overflow-hidden rounded-full shadow-[0_18px_50px_-18px_color-mix(in_oklab,var(--foreground)_45%,transparent)] transition-transform duration-500 ease-out motion-reduce:transition-none',
						tone === 'oxide' && 'bg-orange text-[var(--on-orange)]',
						tone === 'card' && 'border border-[color-mix(in_oklab,var(--foreground)_14%,transparent)] bg-card text-foreground',
						tone === 'ink' && 'bg-foreground text-background',
						tone === 'material' && 'relative text-foreground'
					)}
					style:width="{s}rem"
					style:height="{s}rem"
					style:transform={shift(l, t, s)}
				>
					{#if tone === 'material'}
						<img src={poster} alt="" class="absolute inset-0 size-full object-cover" />
						<span class="relative grid size-[62%] place-items-center rounded-full bg-background"><BrandIcon icon={tool.icon} class="size-[48%]" /></span>
					{:else}
						<BrandIcon icon={tool.icon} label={tool.name} class="size-[38%]" />
					{/if}
				</span>
			</span>
		{/each}
		<div class="relative z-20 flex flex-col items-center text-center">
			<p class="flex flex-col items-center font-sans text-[clamp(4rem,13vw,11.5rem)] leading-[0.86] font-semibold tracking-[-0.06em] text-foreground">
				{#each lines as w, i (i)}
					<span class={cn(i === accent && 'font-extrabold tracking-[-0.04em] text-primary')} style:font-family={i === accent ? 'var(--studio-accent, "Doto"), monospace' : undefined}>{w}</span>
				{/each}
			</p>
			{#if after}<div class="mt-12">{@render after()}</div>{/if}
		</div>
	</div>
</section>
