<script lang="ts">
	import Rings from '$brand/components/rings.svelte';

	let { seed = 'claude-multi' }: { seed?: string } = $props();
</script>

<div class="absolute inset-0 overflow-hidden">
	<Rings {seed} class="absolute top-1/2 right-[-38%] w-[150%] max-w-none -translate-y-[46%]" label="Oxide rings, large" />
	<Rings seed={`${seed}-echo`} class="absolute -top-[30%] -left-[62%] w-[95%] max-w-none rotate-180 opacity-50" label="" aria-hidden="true" />
</div>
