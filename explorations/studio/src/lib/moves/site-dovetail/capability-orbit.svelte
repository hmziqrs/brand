<script lang="ts">
	import Plus from '@lucide/svelte/icons/plus';
	import Minus from '@lucide/svelte/icons/minus';
	import InlineGlyph from '$moves/dovetail/inline-glyph.svelte';
	import { cn } from '$brand/utils.js';

	type Cap = { name: string; body: string };

	let {
		caps,
		label = 'Multimodal processing',
		preset = 'hammered-copper',
		class: className
	}: {
		caps: Cap[];
		label?: string;
		preset?: string;
		class?: string;
	} = $props();

	const W = 1000;
	const H = 560;
	const rings = [
		{ rx: 470, ry: 210, rot: -6 },
		{ rx: 360, ry: 160, rot: 8 },
		{ rx: 250, ry: 112, rot: -3 }
	];
	const slots = [
		[0, 200], [1, 230], [2, 200], [0, 160], [1, 140],
		[0, 330], [1, 310], [0, 20], [1, 40], [2, 20]
	] as const;
	const at = (k: number, deg: number) => {
		const { rx, ry, rot } = rings[k];
		const t = (deg * Math.PI) / 180;
		const r = (rot * Math.PI) / 180;
		const x = W / 2 + rx * Math.cos(t) * Math.cos(r) - ry * Math.sin(t) * Math.sin(r);
		const y = H / 2 + rx * Math.cos(t) * Math.sin(r) + ry * Math.sin(t) * Math.cos(r);
		return { left: (x / W) * 100, top: (y / H) * 100 };
	};
	const d = (rx: number, ry: number) => `M ${W / 2 - rx} ${H / 2} a ${rx} ${ry} 0 1 0 ${rx * 2} 0 a ${rx} ${ry} 0 1 0 ${-rx * 2} 0`;
	const placed = $derived(caps.slice(0, slots.length).map((c, i) => ({ c, i, ...at(slots[i][0], slots[i][1]) })));

	let open = $state(-1);
	let moving = $state(false);
	$effect(() => {
		moving = !matchMedia('(prefers-reduced-motion: reduce)').matches;
	});
	let host: HTMLDivElement | undefined = $state();
	let tx = $state(0);
	let ty = $state(0);
	const move = (e: PointerEvent) => {
		if (!host || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const r = host.getBoundingClientRect();
		tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
		ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
	};
</script>

<div class={cn('mx-auto w-full max-w-[82rem] px-4 sm:px-6', className)}>
	<div
		bind:this={host}
		onpointermove={move}
		onpointerleave={() => ((tx = 0), (ty = 0))}
		class="relative hidden aspect-[1000/560] [perspective:1400px] md:block"
	>
		<div class="absolute inset-0 transition-transform duration-500 ease-out motion-reduce:transition-none" style:transform="rotateX({-ty * 7}deg) rotateY({tx * 9}deg)">
			<svg viewBox="0 0 {W} {H}" class="absolute inset-0 size-full" aria-hidden="true">
				{#each rings as r, k (k)}
					<g transform="rotate({r.rot} {W / 2} {H / 2})">
						<ellipse cx={W / 2} cy={H / 2} rx={r.rx} ry={r.ry} fill="none" stroke="color-mix(in oklab, var(--foreground) 22%, transparent)" stroke-width="1.25" stroke-dasharray="3 7" />
						{#each moving ? [0, 1, 2] : [] as j (j)}
							<rect width="8" height="8" x="-4" y="-4" fill="var(--primary)" opacity={0.5 + j * 0.25}>
								<animateMotion dur="{24 + k * 9}s" begin="-{j * (8 + k * 3)}s" repeatCount="indefinite" path={d(r.rx, r.ry)} />
							</rect>
						{/each}
					</g>
				{/each}
			</svg>
			<div class="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-[8.5rem] text-foreground">
				<InlineGlyph kind="stack" {preset} />
				<span class="mt-3 font-mono text-[0.65rem] leading-none tracking-[0.16em] text-foreground uppercase">{label}</span>
			</div>
			{#each placed as p (p.c.name)}
				<button
					type="button"
					onclick={() => (open = open === p.i ? -1 : p.i)}
					onpointerenter={() => (open = p.i)}
					aria-expanded={open === p.i}
					class={cn(
						'absolute z-10 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-md border px-2.5 py-1.5 font-mono text-[0.68rem] tracking-[0.12em] whitespace-nowrap uppercase transition-colors',
						open === p.i ? 'border-transparent bg-orange text-[var(--on-orange)]' : 'border-[color-mix(in_oklab,var(--foreground)_18%,transparent)] bg-background text-foreground hover:border-foreground'
					)}
					style:left="{p.left}%"
					style:top="{p.top}%"
				>
					{p.c.name}{#if open === p.i}<Minus class="lucide size-3" />{:else}<Plus class="lucide size-3" />{/if}
				</button>
			{/each}
		</div>
		{#if open >= 0}
			<div class="absolute bottom-0 left-1/2 z-20 w-[min(30rem,90%)] -translate-x-1/2 rounded-2xl border border-[color-mix(in_oklab,var(--foreground)_14%,transparent)] bg-background p-5 shadow-[0_24px_60px_-24px_color-mix(in_oklab,var(--foreground)_45%,transparent)]">
				<p class="text-[1.15rem] font-medium text-foreground">{caps[open].name}</p>
				<p class="mt-1.5 text-[1rem] leading-relaxed text-foreground">{caps[open].body}</p>
			</div>
		{/if}
	</div>
	<ul class="grid gap-2 md:hidden">
		{#each caps as c, i (c.name)}
			<li class="rounded-xl border border-[color-mix(in_oklab,var(--foreground)_12%,transparent)]">
				<button type="button" class="flex w-full items-center justify-between px-4 py-3 text-left font-mono text-[0.75rem] tracking-[0.12em] text-foreground uppercase" onclick={() => (open = open === i ? -1 : i)} aria-expanded={open === i}>
					{c.name}{#if open === i}<Minus class="lucide size-3.5" />{:else}<Plus class="lucide size-3.5" />{/if}
				</button>
				{#if open === i}<p class="px-4 pb-4 text-[0.95rem] leading-relaxed text-foreground">{c.body}</p>{/if}
			</li>
		{/each}
	</ul>
</div>
