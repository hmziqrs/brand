<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';

	let { count = 3, presets = ['endgrain-wood', 'black-ice', 'chalk-dunes', 'oxide-bloom', 'interference-film', 'halftone-print'], hot = false, class: className }: { count?: number; presets?: string[]; hot?: boolean; class?: string } = $props();
	const slabs = $derived(Array.from({ length: count }, (_, i) => i));
</script>

<div aria-hidden="true" class={cn('group/iso relative grid place-items-center [perspective:900px]', className)}>
	<div class="relative size-[clamp(84px,9vw,112px)] [transform:rotateX(58deg)_rotateZ(-45deg)] [transform-style:preserve-3d]">
		{#each slabs as i (i)}
			<div
				class={cn('absolute inset-0 overflow-hidden rounded-[6px] border transition-transform duration-500 ease-out motion-reduce:transition-none', hot ? 'border-(--on-orange)/40' : 'border-foreground/25', 'shadow-[0_0_0_1px_color-mix(in_oklab,black_30%,transparent)]')}
				style:transform="translateZ({i * 12}px)"
				style:--lift="{i * 22}px"
			>
				<ShaderMaterial preset={presets[i % presets.length]} rendering="image" controls={false} sizes="120px" class="absolute inset-0 h-full w-full" />
				{#if i === count - 1}<span class={cn('absolute top-1.5 left-1.5 size-2.5', hot ? 'bg-(--on-orange)' : 'bg-primary')}></span>{/if}
			</div>
		{/each}
	</div>
</div>

<style>
	:global(.group\/tier:hover) div[style*='--lift'] {
		transform: translateZ(var(--lift)) !important;
	}
</style>
