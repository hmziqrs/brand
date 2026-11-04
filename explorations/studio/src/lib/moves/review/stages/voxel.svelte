<script lang="ts">
	import { cn } from '$brand/utils.js';
	import IsoTileStack, { type IsoCluster } from '$moves/review/parts/northflank/iso-tile-stack.svelte';

	let { class: className }: { class?: string } = $props();

	const clusters: IsoCluster[] = [
		{ at: [0, 0], size: [9, 9], height: 1, tone: 'steel', rust: true, bumps: 16, label: 'src/ · your app' },
		{ at: [2, -8], size: [3, 3], height: 4, tone: 'ink', label: 'gpui-starter' },
		{ at: [11, -5], size: [2, 3], height: 2, tone: 'patina', label: 'update feed' }
	];
</script>

<div class={cn('absolute inset-0 isolate overflow-hidden', className)}>
	<div class="absolute top-[58%] right-[-18%] w-[110%] -translate-y-1/2 opacity-30 sm:right-[-4%] sm:w-[44%] lg:opacity-100">
		<IsoTileStack {clusters} class="mx-auto max-w-[760px] [&_.iso-floor]:hidden" />
	</div>
</div>
