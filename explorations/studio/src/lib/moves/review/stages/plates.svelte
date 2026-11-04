<script lang="ts">
	import { cn } from '$brand/utils.js';
	import PlateStack from '$moves/review/parts/voidzero/plate-stack.svelte';

	let { class: className }: { class?: string } = $props();

	const plates = [{}, {}, {}, { preset: 'copper-sweep', symbol: 'Fx' }, {}];
</script>

<div class={cn('absolute inset-0 overflow-hidden', className)}>
	<div class="absolute top-[56%] right-[-30%] w-[120%] -translate-y-1/2 opacity-30 sm:right-[-8%] sm:w-[50%] lg:opacity-100">
		<PlateStack {plates} labels={false} label="A stack of thin plates, one cut from oxide" />
	</div>
</div>
