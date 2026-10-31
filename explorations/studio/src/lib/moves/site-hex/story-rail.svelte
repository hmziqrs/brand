<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import ShaderMaterial from '$brand/components/shader-material.svelte';

	let {
		stories,
		href = '#',
		class: className
	}: { stories: { co: string; stat: string; line: string; preset: string }[]; href?: string; class?: string } = $props();

	let rail: HTMLDivElement | undefined = $state();
	const step = (d: number) => rail?.scrollBy({ left: d * Math.min(rail.clientWidth * 0.8, 440), behavior: 'smooth' });
</script>

<div class={cn('relative', className)}>
	<div bind:this={rail} class="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none]">
		{#each stories as s (s.co)}
			<a {href} class="group relative isolate flex aspect-[4/5] w-[78%] shrink-0 snap-start flex-col justify-end overflow-hidden border border-border sm:w-[46%] lg:w-[30%]">
				<ShaderMaterial preset={s.preset} rendering="image" controls={false} sizes="440px" class="absolute inset-0 -z-10 h-full w-full transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none" />
				<span class="absolute top-4 left-4 bg-background px-2 py-1 font-mono text-[11px] tracking-[0.14em] text-foreground uppercase">Featured</span>
				<div class="m-3 bg-background p-5">
					<p class="font-mono text-xs text-muted-foreground">{s.co}</p>
					<p class="mt-2 text-5xl font-semibold tracking-[-0.04em] text-foreground">{s.stat}</p>
					<p class="mt-2 text-lg leading-snug text-foreground">{s.line}</p>
					<span class="mt-4 inline-flex items-center gap-2 text-sm font-medium text-foreground">Read the story<ArrowRight class="lucide size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" /></span>
				</div>
			</a>
		{/each}
	</div>
	<div class="mt-4 flex justify-end gap-2">
		<button type="button" onclick={() => step(-1)} class="inline-flex size-11 items-center justify-center border border-foreground text-foreground hover:bg-foreground hover:text-background" aria-label="Previous stories"><ArrowLeft class="lucide size-4" /></button>
		<button type="button" onclick={() => step(1)} class="inline-flex size-11 items-center justify-center border border-foreground text-foreground hover:bg-foreground hover:text-background" aria-label="Next stories"><ArrowRight class="lucide size-4" /></button>
	</div>
</div>
