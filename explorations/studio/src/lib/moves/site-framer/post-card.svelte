<script lang="ts" module>
	export type Art = 'material' | 'rings' | 'lattice' | 'stack' | 'bars';
</script>

<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import type { Post } from './posts';

	let { post, art = 'material', href = '#/p/site-framer/blog', class: className }: { post: Post; art?: Art; href?: string; class?: string } = $props();

	let px = $state(0.5);
	let py = $state(0.5);
	let on = $state(false);
	const lattice = Array.from({ length: 12 * 7 }, (_, i) => ({ x: i % 12, y: Math.floor(i / 12) }));
	const bars = Array.from({ length: 36 }, (_, i) => 0.25 + (((i * 37) % 17) / 17) * 0.6);

	function move(e: PointerEvent) {
		const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
		px = (e.clientX - r.left) / r.width;
		py = (e.clientY - r.top) / r.height;
		on = true;
	}
</script>

<a {href} onpointermove={move} onpointerleave={() => ((on = false), (px = 0.5), (py = 0.5))} class={cn('group flex min-w-0 flex-col overflow-hidden rounded-[22px] border border-border bg-card transition-colors hover:border-primary/60', className)}>
	<span class="relative isolate block aspect-[16/10] overflow-hidden border-b border-border bg-background">
		{#if art === 'material'}
			<span class="absolute inset-0 transition-transform duration-500 ease-out motion-reduce:transition-none" style:transform="scale({on ? 1.1 : 1}) translate({((0.5 - px) * 16).toFixed(1)}px, {((0.5 - py) * 12).toFixed(1)}px)">
				<ShaderMaterial preset={post.preset} rendering="image" controls={false} sizes="(min-width: 1024px) 420px, 100vw" class="absolute inset-0 h-full w-full" />
			</span>
		{:else}
			<svg viewBox="0 0 320 200" class="absolute inset-0 h-full w-full" aria-hidden="true">
				{#if art === 'rings'}
					{#each [18, 34, 50, 66, 82, 98, 114] as r, i (r)}
						<circle cx={160 + (px - 0.5) * (i + 1) * 14} cy={100 + (py - 0.5) * (i + 1) * 9} {r} fill="none" stroke-width="1" vector-effect="non-scaling-stroke" class={cn('transition-[cx,cy] duration-300 motion-reduce:transition-none', i === 3 ? 'stroke-primary' : 'stroke-foreground/40')} />
					{/each}
				{:else if art === 'lattice'}
					{#each lattice as d (d.x * 100 + d.y)}
						{@const dist = Math.hypot(d.x / 11 - px, (d.y / 6 - py) * 0.6)}
						<rect x={28 + d.x * 24 - (dist < 0.18 ? 4 : 1.5)} y={28 + d.y * 24 - (dist < 0.18 ? 4 : 1.5)} width={dist < 0.18 ? 8 : 3} height={dist < 0.18 ? 8 : 3} class={dist < 0.18 ? 'fill-primary' : 'fill-foreground/45'} />
					{/each}
				{:else if art === 'stack'}
					{#each [0, 1, 2, 3, 4] as i (i)}
						<rect x={70 + i * (12 + px * 22)} y={40 + i * 10 - (i === Math.round(px * 4) ? 12 : 0)} width="120" height="90" rx="6" class={cn('stroke-foreground/50 transition-all duration-300 motion-reduce:transition-none', i === Math.round(px * 4) ? 'fill-primary stroke-primary' : 'fill-card')} stroke-width="1" />
					{/each}
				{:else}
					{#each bars as b, i (i)}
						{@const hit = Math.abs(i / 35 - px) < 0.05}
						<rect x={22 + i * 7.9} y={170 - b * 130 * (hit ? 1.15 : 1)} width="3" height={b * 130 * (hit ? 1.15 : 1)} class={hit ? 'fill-primary' : 'fill-foreground/40'} />
					{/each}
					<line x1="16" x2="304" y1="170.5" y2="170.5" stroke-width="1" class="stroke-foreground/30" />
				{/if}
			</svg>
		{/if}
		<span class="absolute top-3 left-3 rounded-full bg-background px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.12em] text-foreground uppercase ring-1 ring-border">{post.cat}</span>
		<span class="absolute top-3 right-3 grid size-8 place-items-center rounded-full bg-primary text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100 motion-reduce:transition-none"><ArrowUpRight class="lucide size-4" /></span>
	</span>
	<span class="flex flex-1 flex-col p-5">
		<span class="text-xl leading-snug font-medium tracking-[-0.02em] text-balance text-foreground">{post.title}</span>
		{#if post.dek}<span class="mt-2 line-clamp-2 text-base leading-snug text-foreground/85">{post.dek}</span>{/if}
		<span class="mt-auto flex items-center gap-2 pt-5 text-sm text-foreground/80">
			<span class="grid size-6 place-items-center rounded-full bg-primary text-[0.625rem] font-semibold text-primary-foreground">{post.who.slice(0, 1).toUpperCase()}</span>{post.who} · {post.date} · {post.min} min
		</span>
	</span>
</a>
