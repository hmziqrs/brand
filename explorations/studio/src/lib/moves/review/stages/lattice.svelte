<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Scene from '$brand/components/scene.svelte';

	let { seed = 'freeoxide', class: className }: { seed?: string; class?: string } = $props();
</script>

<div class={cn('absolute inset-0 overflow-hidden', className)}>
	<Scene kind="lattice" {seed} class="absolute inset-y-0 right-0 w-full opacity-60 [mask-image:linear-gradient(to_right,transparent,black_45%)] lg:w-[64%] lg:opacity-100" />
</div>
