<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import type { Post } from './content';

	let { post, href, class: className }: { post: Post; href: string; class?: string } = $props();

	let px = $state(0.5);
	let on = $state(false);

	const hx = $derived(on ? px : 0.62);
	const preset = $derived(post.art.startsWith('material:') ? post.art.slice(9) : '');

	function move(e: PointerEvent) {
		const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
		px = (e.clientX - r.left) / r.width;
		on = true;
	}
</script>

<a {href} data-slot="post-card" class={cn('group flex flex-col gap-4', className)} onpointermove={move} onpointerleave={() => (on = false)}>
	<span class="relative isolate block aspect-[16/10] overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10">
		{#if preset}
			<span class="absolute inset-0 transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none">
				<ShaderMaterial {preset} rendering="image" controls={false} sizes="(min-width: 1024px) 33vw, 100vw" class="absolute inset-0 h-full w-full" />
			</span>
			<span class="absolute bottom-3 left-3 rounded-full bg-background px-2.5 py-1 font-mono text-[10.5px] tracking-wide text-foreground uppercase">{post.kind}</span>
		{:else}
			<svg viewBox="0 0 320 200" class="absolute inset-0 h-full w-full" aria-hidden="true">
				{#if post.art === 'rings'}
					{#each Array.from({ length: 6 }, (_, i) => i) as i (i)}
						<ellipse cx={70 + i * 36} cy="100" rx="22" ry="62" fill="none" stroke-width="1" class={cn('transition-all duration-300 motion-reduce:transition-none', Math.abs(hx * 6 - i - 0.5) < 0.8 ? 'stroke-primary' : 'stroke-foreground/50')} style:transform="rotate({on ? (px - 0.5) * 40 : 0}deg)" style:transform-origin="{70 + i * 36}px 100px" />
					{/each}
					<line x1="20" x2="300" y1="100" y2="100" stroke-width="1" class="stroke-foreground/30" />
				{:else if post.art === 'bars'}
					{#each Array.from({ length: 48 }, (_, i) => i) as i (i)}
						{@const d = Math.abs(i / 47 - hx)}
						<rect x={16 + i * 6} y="40" width="1" height="120" class={d < 0.08 ? 'fill-primary' : 'fill-foreground/45'} opacity={on ? Math.max(0.25, 1 - d * 3) : 0.3 + ((i * 37) % 10) / 14} />
					{/each}
				{:else if post.art === 'grid'}
					{#each Array.from({ length: 40 }, (_, i) => i) as i (i)}
						{@const cx = i % 10}
						{@const cy = Math.floor(i / 10)}
						{@const fill = ((cx * 7 + cy * 3) % 5) / 5}
						<rect x={40 + cx * 25} y={40 + cy * 32} width="18" height="18" rx="1" class={Math.abs(cx / 9 - hx) < 0.12 ? 'fill-primary' : 'fill-foreground'} opacity={0.15 + fill * 0.75} />
					{/each}
				{:else if post.art === 'fan'}
					{#each Array.from({ length: 12 }, (_, i) => i) as i (i)}
						<line x1="30" y1="170" x2={290} y2={30 + i * 12 + (on ? (px - 0.5) * 40 : 0)} stroke-width="1" class={i === Math.round(hx * 11) ? 'stroke-primary' : 'stroke-foreground/45'} />
					{/each}
					<rect x="30" y="30" width="260" height="140" fill="none" stroke-width="1" class="stroke-foreground/30" />
				{:else}
					{#each [60, 100, 140] as y, li (y)}
						<line x1="20" x2="300" y1={y} y2={y} stroke-width="1" class="stroke-foreground/25" />
						{#each Array.from({ length: 9 }, (_, i) => i) as i (i)}
							{@const x = 30 + ((i * 53 + li * 29) % 260)}
							<rect x={x} y={y - 4} width={Math.abs(x / 320 - hx) < 0.1 ? 22 : 8} height="8" class={Math.abs(x / 320 - hx) < 0.1 ? 'fill-primary' : 'fill-foreground/60'} />
						{/each}
					{/each}
				{/if}
			</svg>
			<span class="absolute bottom-3 left-3 rounded-full bg-background px-2.5 py-1 font-mono text-[10.5px] tracking-wide text-foreground uppercase ring-1 ring-border">{post.kind}</span>
		{/if}
	</span>
	<span class="text-xl leading-snug font-medium tracking-[-0.015em] text-balance text-foreground group-hover:underline group-hover:decoration-primary group-hover:underline-offset-4">{post.title}</span>
	<span class="line-clamp-2 text-base leading-snug text-foreground/85">{post.dek}</span>
	<span class="mt-auto text-sm text-foreground/80">{post.by} · {post.date}</span>
</a>
