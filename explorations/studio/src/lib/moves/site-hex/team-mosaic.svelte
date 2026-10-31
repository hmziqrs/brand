<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import SpotMini from './spot-mini.svelte';

	type Tile = { span: string; preset?: string; kind?: 'cube' | 'curve' | 'lock' | 'stack' | 'branch' | 'mail' | 'mic' | 'globe'; role: string };
	let { tiles, class: className }: { tiles: Tile[]; class?: string } = $props();
</script>

<div class={cn('grid auto-rows-[120px] grid-cols-2 gap-3 sm:auto-rows-[140px] sm:grid-cols-4 lg:grid-cols-6', className)}>
	{#each tiles as t, i (i)}
		<figure class={cn('group relative overflow-hidden border border-border bg-background transition-transform duration-500 hover:-translate-y-1 motion-reduce:transition-none', t.span)}>
			{#if t.preset}
				<ShaderMaterial preset={t.preset} rendering="image" controls={false} sizes="400px" class="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none" />
			{:else if t.kind}
				<div class="absolute inset-0 grid place-items-center p-4 [background-image:linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] [background-size:24px_24px]">
					<SpotMini kind={t.kind} class="max-h-full w-auto max-w-[160px]" />
				</div>
			{/if}
			<figcaption class="absolute bottom-2 left-2 bg-background px-2 py-1 font-mono text-[11px] text-foreground">{t.role}</figcaption>
		</figure>
	{/each}
</div>
