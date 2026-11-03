<script lang="ts" module>
	export type WorkArt = 'lanes' | 'rings' | 'fan' | 'bars' | `material:${string}`;
	export type Work = { name: string; kind: string; dek: string; meta: string; art: WorkArt };
</script>

<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';

	let { work, href, class: className }: { work: Work; href: string; class?: string } = $props();

	let px = $state(0.5);
	let py = $state(0.5);
	let on = $state(false);
	let still = $state(false);

	$effect(() => {
		still = matchMedia('(prefers-reduced-motion: reduce)').matches;
	});

	const hx = $derived(on ? px : 0.62);
	const preset = $derived(work.art.startsWith('material:') ? work.art.slice(9) : '');

	function move(e: PointerEvent) {
		const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
		px = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
		py = Math.max(0, Math.min(1, (e.clientY - r.top) / r.height));
		on = true;
	}

	const lanes = [
		{ y: 56, marks: [30, 64, 118, 150, 206, 252] },
		{ y: 100, marks: [44, 96, 170, 228, 272] },
		{ y: 144, marks: [24, 82, 132, 190, 240, 286] }
	];
	const eased = (v: number) => (still ? 0.62 : v);
</script>

<a {href} data-slot="work-card" class={cn('group flex min-w-0 flex-col gap-4 outline-none', className)} onpointermove={move} onpointerleave={() => (on = false)}>
	<span class="relative isolate block aspect-[16/10] overflow-hidden rounded-xl ring-1 ring-foreground/10 transition-shadow duration-300 group-hover:ring-foreground/25 group-focus-visible:ring-3 group-focus-visible:ring-ring/60">
		{#if preset}
			<span class="absolute -inset-[6%] transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] motion-reduce:transition-none" style:transform={on && !still ? `translate3d(${((0.5 - px) * 5).toFixed(2)}%, ${((0.5 - py) * 5).toFixed(2)}%, 0) scale(1.05)` : 'none'}>
				<ShaderMaterial {preset} rendering="image" controls={false} sizes="(min-width: 1024px) 33vw, 100vw" class="absolute inset-0 h-full w-full" />
			</span>
		{:else}
			<svg viewBox="0 0 320 200" class="absolute inset-0 h-full w-full" aria-hidden="true">
				{#if work.art === 'rings'}
					{#each Array.from({ length: 6 }, (_, i) => i) as i (i)}
						{@const near = Math.abs(eased(hx) * 6 - i - 0.5) < 0.8}
						<ellipse cx={70 + i * 36} cy="100" rx="22" ry="62" fill="none" stroke-width="1" class={cn('transition-[stroke,transform] duration-300 motion-reduce:transition-none', near ? 'stroke-primary' : 'stroke-foreground/50')} style:transform={`rotate(${on && !still ? (px - 0.5) * 40 : 0}deg)`} style:transform-origin={`${70 + i * 36}px 100px`} />
					{/each}
					<line x1="20" x2="300" y1="100" y2="100" stroke-width="1" class="stroke-foreground/30" />
				{:else if work.art === 'bars'}
					{#each Array.from({ length: 48 }, (_, i) => i) as i (i)}
						{@const d = Math.abs(i / 47 - eased(hx))}
						<rect x={16 + i * 6} y={40 + ((i * 29) % 7) * 3} width="1.2" height={120 - ((i * 29) % 7) * 6} class={d < 0.06 ? 'fill-primary' : 'fill-foreground/45'} opacity={on ? Math.max(0.25, 1 - d * 3) : 0.3 + ((i * 37) % 10) / 14} />
					{/each}
				{:else if work.art === 'fan'}
					{#each Array.from({ length: 12 }, (_, i) => i) as i (i)}
						<line x1="30" y1="170" x2="290" y2={Math.max(30, Math.min(170, 30 + i * 12 + (on && !still ? (py - 0.5) * 40 : 0)))} stroke-width="1" class={cn('transition-[stroke] duration-200', i === Math.round(eased(hx) * 11) ? 'stroke-primary' : 'stroke-foreground/45')} />
					{/each}
					<rect x="30" y="30" width="260" height="140" fill="none" stroke-width="1" class="stroke-foreground/30" />
					<circle cx="30" cy="170" r="3.5" class="fill-primary" />
				{:else}
					{#each lanes as l, li (l.y)}
						<line x1="20" x2="300" y1={l.y} y2={l.y} stroke-width="1" class="stroke-foreground/25" />
						{#each l.marks as x (x)}
							{@const hot = Math.abs(x / 320 - eased(hx)) < 0.08}
							<rect x={x} y={l.y - 5} width={hot ? 26 : 9} height="10" rx="2" class={cn('transition-[width] duration-200 motion-reduce:transition-none', hot ? 'fill-primary' : li === 1 ? 'fill-foreground/35' : 'fill-foreground/60')} />
						{/each}
					{/each}
					<line x1={20 + eased(hx) * 280} x2={20 + eased(hx) * 280} y1="34" y2="166" stroke-width="1" class="stroke-foreground/50" />
				{/if}
			</svg>
		{/if}
		<span class="absolute bottom-3 left-3 rounded-full bg-background px-2.5 py-1 font-mono text-[10.5px] tracking-wide text-foreground uppercase ring-1 ring-foreground/10">{work.kind}</span>
	</span>
	<span class="text-xl leading-snug font-medium tracking-[-0.015em] text-balance text-foreground group-hover:underline group-hover:decoration-primary group-hover:underline-offset-4">{work.name}</span>
	<span class="line-clamp-3 text-base leading-snug text-foreground/85">{work.dek}</span>
	<span class="mt-auto text-sm text-foreground/75">{work.meta}</span>
</a>
