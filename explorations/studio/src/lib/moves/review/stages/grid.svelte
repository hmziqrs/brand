<script lang="ts">
	import GridBackdrop from '$moves/review/heroes/grid-backdrop.svelte';

	let { cell = 48, class: className }: { cell?: number; class?: string } = $props();
</script>

<div class="absolute inset-0 isolate overflow-hidden"><GridBackdrop {cell} class={className} /></div>
