<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';

	let {
		preset = 'chalk-dunes',
		base = 0.1,
		baseDark = 0.14,
		glow = 0.3,
		radius = 320,
		class: className
	}: { preset?: string; base?: number; baseDark?: number; glow?: number; radius?: number; class?: string } = $props();

	let host: HTMLDivElement | undefined = $state();
	let on = $state(false);
	let x = $state(0);
	let y = $state(0);

	$effect(() => {
		if (!host) return;
		const el = host;
		const area = (el.closest('[data-pointer-host]') as HTMLElement | null) ?? el.parentElement!;
		const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
		let tx = 0;
		let ty = 0;
		let raf = 0;
		const step = () => {
			x += (tx - x) * 0.16;
			y += (ty - y) * 0.16;
			raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.5 ? requestAnimationFrame(step) : 0;
		};
		const move = (e: PointerEvent) => {
			if (e.pointerType === 'touch') return;
			const r = el.getBoundingClientRect();
			tx = e.clientX - r.left;
			ty = e.clientY - r.top;
			if (!on || still) {
				x = tx;
				y = ty;
				on = true;
				return;
			}
			if (!raf) raf = requestAnimationFrame(step);
		};
		const leave = () => (on = false);
		area.addEventListener('pointermove', move);
		area.addEventListener('pointerleave', leave);
		return () => {
			area.removeEventListener('pointermove', move);
			area.removeEventListener('pointerleave', leave);
			cancelAnimationFrame(raf);
		};
	});
</script>

{#snippet wash()}
	<div class="drift absolute -inset-[4%]">
		<ShaderMaterial {preset} rendering="image" animated={false} controls={false} loading="lazy" sizes="100vw" class="absolute inset-0 h-full w-full" />
	</div>
{/snippet}

<div bind:this={host} aria-hidden="true" class={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} style:--wash-base={base} style:--wash-base-dark={baseDark}>
	<div class="absolute inset-0 opacity-(--wash-base) dark:opacity-(--wash-base-dark)">{@render wash()}</div>
	<div
		class="absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none"
		style:opacity={on ? glow : 0}
		style:mask-image={`radial-gradient(circle ${radius}px at ${x}px ${y}px, black 0%, rgb(0 0 0 / 0.5) 45%, transparent 100%)`}
	>
		{@render wash()}
	</div>
</div>

<style>
	.drift {
		animation: drift 46s ease-in-out infinite alternate;
	}
	@keyframes drift {
		from {
			transform: translate3d(-2%, 1%, 0);
		}
		to {
			transform: translate3d(2%, -1%, 0);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.drift {
			animation: none;
		}
	}
</style>
