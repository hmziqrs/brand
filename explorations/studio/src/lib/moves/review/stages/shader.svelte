<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';

	let { preset = 'copper-sweep', live = false, class: className }: { preset?: string; live?: boolean; class?: string } = $props();
</script>

<div class={cn('absolute inset-0 overflow-hidden', className)}>
	<ShaderMaterial {preset} rendering={live ? 'live' : 'image'} animated={live} controls={false} loading="eager" sizes="100vw" class="absolute inset-0 h-full w-full" />
	<div aria-hidden="true" class="absolute inset-0 bg-[linear-gradient(to_right,var(--background)_0%,color-mix(in_oklab,var(--background)_75%,transparent)_40%,transparent_85%)] max-md:bg-[color-mix(in_oklab,var(--background)_70%,transparent)]"></div>
</div>
