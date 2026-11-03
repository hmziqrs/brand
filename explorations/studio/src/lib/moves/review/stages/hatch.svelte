<script lang="ts">
	import { cn } from '$brand/utils.js';
	import DiagonalHatch from '$moves/specimens/diagonal-hatch.svelte';

	let { class: className }: { class?: string } = $props();
</script>

<div class={cn('absolute inset-0 overflow-hidden opacity-75 [mask-image:linear-gradient(to_right,transparent_0%,rgb(0_0_0/0.15)_35%,black_80%)]', className)}><DiagonalHatch spacing={9} from="top-right" reach={190} bend={0.38} /></div>
