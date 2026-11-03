<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$brand/utils.js';
	import Container from '$brand/blocks/site/container.svelte';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import Glass from '$brand/components/glass.svelte';

	let {
		preset = 'etched-silk',
		align = 'right',
		children,
		class: className
	}: {
		preset?: string;
		align?: 'left' | 'right';
		children: Snippet;
		class?: string;
	} = $props();

	let x = $state(0);
	let y = $state(0);
	let still = $state(false);

	$effect(() => {
		still = matchMedia('(prefers-reduced-motion: reduce)').matches;
	});

	function move(e: PointerEvent) {
		if (still) return;
		const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
		x = ((e.clientX - r.left) / r.width - 0.5) * 2;
		y = ((e.clientY - r.top) / r.height - 0.5) * 2;
	}
</script>

<div data-slot="glass-band" role="presentation" class={cn('relative isolate flex min-h-[40rem] items-center overflow-hidden', className)} onpointermove={move} onpointerleave={() => ((x = 0), (y = 0))}>
	<div aria-hidden="true" class="glass-band-drift absolute -inset-[6%] -z-10">
		<div class="absolute inset-0 transition-transform duration-[1200ms] ease-[cubic-bezier(.2,.7,.2,1)]" style:transform={`translate3d(${(-x * 2).toFixed(2)}%, ${(-y * 2).toFixed(2)}%, 0)`}>
			<ShaderMaterial {preset} rendering="image" controls={false} loading="lazy" sizes="100vw" class="absolute inset-0 h-full w-full" />
		</div>
	</div>
	<div aria-hidden="true" class="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,color-mix(in_oklab,var(--background)_55%,transparent),transparent_22%,transparent_78%,color-mix(in_oklab,var(--background)_70%,transparent))]"></div>
	<Container size="wide" class={cn('flex py-24', align === 'right' ? 'justify-end' : 'justify-start')}>
		<Glass variant="frost" grain class="w-full max-w-[560px] rounded-3xl p-7 sm:p-10">
			{@render children()}
		</Glass>
	</Container>
</div>

<style>
	.glass-band-drift {
		animation: glass-band-drift 38s ease-in-out infinite alternate;
	}
	@keyframes glass-band-drift {
		from {
			transform: scale(1.02) translate3d(0, 0, 0);
		}
		to {
			transform: scale(1.1) translate3d(-2%, 1.5%, 0);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.glass-band-drift {
			animation: none;
		}
	}
</style>
