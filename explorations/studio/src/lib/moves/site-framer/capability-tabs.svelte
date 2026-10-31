<script lang="ts">
	import { untrack } from 'svelte';
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import CmsTable from './cms-table.svelte';
	import UiPanel from './ui-panel.svelte';
	import FileSpreadsheet from '@lucide/svelte/icons/file-spreadsheet';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';

	type Panel = 'cms' | 'fields' | 'detail' | 'csv' | 'sorting' | 'filters' | 'branches' | 'seo';
	type Item = { title: string; body: string; prompt: string; panel: Panel };
	let { items, preset = 'copper-sweep', every = 6000, class: className }: { items: Item[]; preset?: string; every?: number; class?: string } = $props();

	let active = $state(0);
	let paused = $state(false);
	let tick = $state(0);

	$effect(() => {
		void active;
		if (paused || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const start = performance.now() - untrack(() => tick) * every;
		let raf = 0;
		const loop = (t: number) => {
			const p = (t - start) / every;
			if (p >= 1) {
				active = (active + 1) % items.length;
				tick = 0;
				return;
			}
			tick = p;
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	});

	const it = $derived(items[active]);
</script>

<div class={cn('grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)]', className)} role="presentation" onpointerenter={() => (paused = true)} onpointerleave={() => (paused = false)}>
	<ol class="flex flex-col">
		{#each items as x, i (x.title)}
			<li class="border-t border-border">
				<button type="button" onclick={() => ((active = i), (tick = 0))} class="relative w-full py-5 text-left" aria-current={active === i}>
					<span class="flex items-baseline gap-4">
						<span class="font-mono text-xs text-primary">0{i + 1}</span>
						<span class={cn('text-2xl font-medium tracking-[-0.03em] transition-colors', active === i ? 'text-foreground' : 'text-foreground/45')}>{x.title}</span>
					</span>
					{#if active === i}
						<span class="mt-2 block pl-8 text-lg leading-snug text-foreground/80">{x.body}</span>
						<span class="absolute top-0 left-0 h-0.5 bg-primary" style:width={`${(paused ? 1 : tick) * 100}%`}></span>
					{/if}
				</button>
			</li>
		{/each}
	</ol>
	<div class="dark relative isolate flex min-h-[460px] flex-col justify-center gap-4 overflow-hidden rounded-[28px] border border-border p-4 text-foreground sm:p-8">
		<ShaderMaterial {preset} rendering="image" controls={false} sizes="800px" class="absolute inset-0 -z-10 h-full w-full" />
		<div class="ml-auto w-full max-w-[420px] rounded-2xl border border-border bg-card/90 p-3 text-sm leading-snug backdrop-blur-xl">
			<span class="mb-1.5 inline-flex items-center gap-1 rounded bg-primary/20 px-1.5 py-0.5 text-xs text-primary">You</span>
			<p>{it.prompt}</p>
		</div>
		{#key active}
			<div class="w-full">
				{#if it.panel === 'cms'}
					<CmsTable compact />
				{:else if it.panel === 'csv'}
					<div class="grid items-center gap-4 sm:grid-cols-[1fr_auto_1.6fr]">
						<div class="rounded-2xl border border-border bg-card p-4 text-sm">
							<p class="flex items-center gap-2 font-medium"><FileSpreadsheet class="lucide size-4 text-primary" />menu.csv</p>
							<div class="mt-3 space-y-1 font-mono text-xs text-foreground/70">
								<p>name,price,section,veg</p><p>Shoyu,14,Ramen,no</p><p>Miso corn,13,Ramen,yes</p><p>Gyoza,7,Small,no</p><p>…62 rows</p>
							</div>
						</div>
						<ArrowRight class="lucide mx-auto size-5 rotate-90 text-primary sm:rotate-0" />
						<CmsTable compact />
					</div>
				{:else if it.panel === 'detail'}
					<div class="overflow-hidden rounded-2xl border border-border bg-card">
						<div class="flex items-center gap-2 border-b border-border px-4 py-2 text-xs"><span class="rounded bg-primary/20 px-1.5 py-0.5 text-primary">/journal/:slug</span><span class="text-foreground/60">6 fields mapped</span></div>
						<div class="p-5">
							<span class="rounded border border-dashed border-primary px-1.5 py-0.5 text-xs text-primary">Category</span>
							<p class="mt-3 text-3xl font-semibold tracking-[-0.03em] outline-2 outline-offset-4 outline-primary outline-dashed">A field guide to quiet interfaces</p>
							<p class="mt-3 text-sm text-foreground/70">By Aya Okafor · 6 min</p>
							<div class="relative mt-4 aspect-[16/6] overflow-hidden rounded-lg"><ShaderMaterial preset="woven-linen" rendering="image" controls={false} sizes="600px" class="absolute inset-0 h-full w-full" /></div>
						</div>
					</div>
				{:else}
					<UiPanel kind={it.panel} class="mx-auto" />
				{/if}
			</div>
		{/key}
	</div>
</div>
