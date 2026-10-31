<script lang="ts">
	import { cn } from '$brand/utils.js';
	import MaterialTile from '$brand/components/material-tile.svelte';
	import MaterialWindow from './material-window.svelte';
	import type { Feature } from './site';

	let {
		features,
		class: className
	}: {
		features: Feature[];
		class?: string;
	} = $props();

	let active = $state(0);
	let rows: HTMLElement[] = $state([]);

	$effect(() => {
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) if (e.isIntersecting) active = rows.indexOf(e.target as HTMLElement);
			},
			{ rootMargin: '-45% 0px -45% 0px' }
		);
		rows.forEach((r) => r && io.observe(r));
		return () => io.disconnect();
	});

	function pick(i: number) {
		active = i;
		const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
		rows[i]?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
	}
</script>

<div class={cn('feature-tabs border-y border-border', className)}>
	<div class="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur-md">
		<div role="tablist" aria-label="Features" class="grid grid-cols-5">
			{#each features as f, i (f.id)}
				<button type="button" role="tab" aria-selected={active === i} onclick={() => pick(i)} class={cn('relative h-12 px-2 text-center font-mono text-[0.7rem] uppercase transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset sm:text-xs', i > 0 && 'border-l border-border', active === i ? 'text-foreground' : 'text-muted-foreground hover:text-foreground')}>
					{f.tab}
					<span aria-hidden="true" class={cn('absolute inset-x-0 bottom-0 h-px bg-primary transition-opacity', active === i ? 'opacity-100' : 'opacity-0')}></span>
				</button>
			{/each}
		</div>
	</div>
	{#each features as f, i (f.id)}
		<article bind:this={rows[i]} id={`feature-${f.id}`} class="grid grid-cols-[minmax(0,1fr)] border-border lg:grid-cols-2 [&:not(:last-child)]:border-b">
			<div class="flex flex-col gap-5 p-6 sm:p-10">
				<p class="font-mono text-xs text-muted-foreground uppercase">{f.kicker}</p>
				<h3 class="max-w-[18ch] text-3xl leading-[1.05] font-medium tracking-[-0.035em] text-balance sm:text-[2.6rem]">{f.title}</h3>
				<p class="max-w-[44ch] text-lg leading-relaxed text-foreground/85">{f.body}</p>
				<ul class="flex flex-col gap-2.5">
					{#each f.points as p (p)}<li class="flex gap-3 text-[1.0625rem]"><span aria-hidden="true" class="mt-[0.55em] size-1.5 shrink-0 bg-mark-square"></span>{p}</li>{/each}
				</ul>
				<p class="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-5 text-sm text-muted-foreground">
					Runs on
					{#each f.poweredBy as t (t.name)}<span class="inline-flex items-center gap-2 text-foreground"><MaterialTile preset={t.preset} size={22}><span class="text-[0.6em] font-semibold">{t.symbol}</span></MaterialTile>{t.name}</span>{/each}
				</p>
			</div>
			<MaterialWindow preset={f.preset} panel={f.panel} height="min-h-[26rem]" class="border-t border-border lg:border-t-0 lg:border-l" />
		</article>
	{/each}
</div>
