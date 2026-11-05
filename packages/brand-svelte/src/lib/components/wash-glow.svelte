<!-- A material faded almost to the page color, drifting slowly, that brightens in a soft pool
     around the cursor over the nearest [data-pointer-host]: a quiet stage for a footer, from the
     site's hero material. Fills its positioned parent. Still for reduced motion. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import { followGlow, glowMask } from "@hmziq/brand-core/motion/wash-glow";
	import ShaderMaterial from "./shader-material.svelte";

	let {
		preset = "chalk-dunes",
		/** How much of the material shows at rest in light mode, 0–1. */
		base = 0.1,
		/** And in dark mode. */
		baseDark = 0.14,
		/** How much shows under the cursor, 0–1. */
		glow = 0.3,
		/** The pool's radius in pixels. */
		radius = 320,
		class: className,
	}: { preset?: string; base?: number; baseDark?: number; glow?: number; radius?: number; class?: string } = $props();

	let host: HTMLDivElement | undefined = $state();
	let on = $state(false);
	let x = $state(0);
	let y = $state(0);

	$effect(() => {
		if (!host) return;
		return followGlow(host, (nx, ny, lit) => {
			x = nx;
			y = ny;
			on = lit;
		});
	});
</script>

{#snippet wash()}
	<div class="drift absolute -inset-[4%]">
		<ShaderMaterial {preset} rendering="image" animated={false} controls={false} loading="lazy" sizes="100vw" class="absolute inset-0 h-full w-full" />
	</div>
{/snippet}

<div bind:this={host} data-slot="wash-glow" aria-hidden="true" class={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} style:--wash-base={base} style:--wash-base-dark={baseDark}>
	<div class="absolute inset-0 opacity-(--wash-base) dark:opacity-(--wash-base-dark)">{@render wash()}</div>
	<div class="absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none" style:opacity={on ? glow : 0} style:mask-image={glowMask(x, y, radius)}>
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
