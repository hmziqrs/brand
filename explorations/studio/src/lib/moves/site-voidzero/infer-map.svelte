<script lang="ts">
	import { cn } from '$brand/utils.js';
	import MaterialTile from '$brand/components/material-tile.svelte';

	type Pair = { use: string; gets: string };

	let {
		pairs,
		symbol = 'Fg',
		preset = 'copper-sweep',
		class: className
	}: {
		pairs: Pair[];
		symbol?: string;
		preset?: string;
		class?: string;
	} = $props();

	let hot = $state(0);
</script>

<div class={cn('infer-map grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 sm:gap-6', className)}>
	<ul class="flex flex-col gap-1.5" aria-label="What your code imports">
		{#each pairs as p, i (p.use)}
			<li>
				<button type="button" onpointerenter={() => (hot = i)} onfocus={() => (hot = i)} onclick={() => (hot = i)} class={cn('w-full truncate rounded-md border px-2.5 py-1.5 text-left font-mono text-[0.72rem] transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:text-xs', hot === i ? 'border-primary bg-primary/10 text-foreground' : 'border-border text-muted-foreground hover:text-foreground')}>{p.use}</button>
			</li>
		{/each}
	</ul>
	<div class="flex flex-col items-center gap-2">
		<MaterialTile {preset} size={64} frame={0.08}><span class="text-base font-semibold tracking-[-0.03em]">{symbol}</span></MaterialTile>
		<span class="font-mono text-[0.65rem] text-muted-foreground uppercase">infers</span>
	</div>
	<ul class="flex flex-col gap-1.5" aria-label="What gets provisioned">
		{#each pairs as p, i (p.use)}
			<li class={cn('truncate rounded-md border px-2.5 py-1.5 text-[0.8rem] transition-colors sm:text-sm', hot === i ? 'border-primary bg-[var(--oxide-vivid)] font-medium text-black' : 'border-border text-foreground/80')}>{p.gets}</li>
		{/each}
	</ul>
</div>
