<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';

	let { preset = 'copper-sweep', class: className }: { preset?: string; class?: string } = $props();
</script>

<div class={cn('absolute inset-0 overflow-hidden', className)}>
	<ShaderMaterial {preset} rendering="image" animated={false} controls={false} loading="eager" sizes="100vw" class="absolute inset-0 h-full w-full" />
	<div aria-hidden="true" class="absolute inset-0 bg-[color-mix(in_oklab,var(--background)_42%,transparent)] dark:bg-[color-mix(in_oklab,var(--background)_56%,transparent)]"></div>
</div>
