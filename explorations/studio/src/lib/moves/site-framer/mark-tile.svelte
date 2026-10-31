<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';

	let { preset = 'hammered-copper', class: className }: { preset?: string; class?: string } = $props();

	let el: HTMLDivElement | undefined = $state();
	let rx = $state(8);
	let ry = $state(-12);

	$effect(() => {
		if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const host = el;
		const move = (e: PointerEvent) => {
			const r = host.getBoundingClientRect();
			const dx = (e.clientX - (r.left + r.width / 2)) / innerWidth;
			const dy = (e.clientY - (r.top + r.height / 2)) / innerHeight;
			ry = Math.max(-28, Math.min(28, dx * 50));
			rx = Math.max(-28, Math.min(28, -dy * 50));
		};
		addEventListener('pointermove', move);
		return () => removeEventListener('pointermove', move);
	});
</script>

<div bind:this={el} class={cn('[perspective:900px]', className)} aria-hidden="true">
	<div class="relative aspect-square w-[min(300px,60vw)] transition-transform duration-300 ease-out [transform-style:preserve-3d] motion-reduce:transition-none" style:transform={`rotateX(${rx}deg) rotateY(${ry}deg)`}>
		<div class="absolute inset-0 overflow-hidden rounded-[26%] border border-foreground/20 shadow-[0_60px_120px_-30px_var(--background),inset_0_1px_0_color-mix(in_oklab,var(--foreground)_35%,transparent)]">
			<ShaderMaterial {preset} rendering="image" controls={false} sizes="320px" class="absolute inset-0 h-full w-full" />
			<div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,color-mix(in_oklab,var(--foreground)_30%,transparent),transparent_55%)]"></div>
		</div>
		<div class="absolute inset-[31%] rounded-[18%] bg-primary shadow-[0_24px_40px_-12px_var(--background)] [transform:translateZ(60px)]"></div>
		<div class="absolute inset-[44%] rounded-[12%] bg-primary-foreground [transform:translateZ(90px)]"></div>
	</div>
</div>
