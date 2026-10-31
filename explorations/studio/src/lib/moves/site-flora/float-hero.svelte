<script lang="ts" module>
	export type Float = { preset: string; x: number; y: number; w: number; depth: number; label?: string; aspect?: string; hide?: boolean };
</script>

<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import RustGridField from '$moves/flora/rust-grid-field.svelte';
	import type { Snippet } from 'svelte';

	let {
		floats,
		grid = true,
		children,
		class: className
	}: {
		floats: Float[];
		grid?: boolean;
		children: Snippet;
		class?: string;
	} = $props();

	let host: HTMLElement | undefined = $state();
	let mx = $state(0);
	let my = $state(0);
	let still = $state(true);

	$effect(() => {
		still = matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (still || !host) return;
		const el = host;
		let raf = 0;
		let tx = 0;
		let ty = 0;
		const on = (e: PointerEvent) => {
			const r = el.getBoundingClientRect();
			tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
			ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
		};
		const loop = () => {
			mx += (tx - mx) * 0.06;
			my += (ty - my) * 0.06;
			raf = requestAnimationFrame(loop);
		};
		addEventListener('pointermove', on, { passive: true });
		raf = requestAnimationFrame(loop);
		return () => {
			removeEventListener('pointermove', on);
			cancelAnimationFrame(raf);
		};
	});
</script>

<section bind:this={host} class={cn('relative isolate overflow-hidden', className)}>
	{#if grid}
		<RustGridField mode="paint" cell={40} radius={1.4} gap={2} fade="radial" class="-z-10" />
	{/if}
	<div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10">
		{#each floats as f, i (i)}
			<figure
				class={cn('absolute', f.hide && 'hidden md:block')}
				style:left="{f.x}%"
				style:top="{f.y}%"
				style:width="clamp({Math.round(f.w * 0.55)}px, {(f.w / 14.4).toFixed(2)}vw, {f.w}px)"
				style:transform="translate3d({(-mx * f.depth * 28).toFixed(1)}px, {(-my * f.depth * 22).toFixed(1)}px, 0)"
			>
				<div class={cn('relative overflow-hidden rounded-xl border border-border bg-card shadow-[0_40px_60px_-30px_color-mix(in_oklab,black_75%,transparent)]', f.aspect ?? 'aspect-[4/5]')}>
					<ShaderMaterial preset={f.preset} rendering="image" loading="eager" controls={false} sizes="{f.w}px" class="absolute inset-0 h-full w-full" />
				</div>
				{#if f.label}
					<figcaption class="mt-1.5 flex justify-between font-mono text-[10px] text-muted-foreground">
						<span>{f.label}</span><span class="text-primary">■</span>
					</figcaption>
				{/if}
			</figure>
		{/each}
	</div>
	{@render children()}
</section>
