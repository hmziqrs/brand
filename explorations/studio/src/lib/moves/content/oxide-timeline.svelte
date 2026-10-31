<script lang="ts">
	import KindTag from '$brand/blocks/content/kind-tag.svelte';
	import CornerRings from '$brand/components/corner-rings.svelte';
	import { shaderPosters } from '@hmziq/brand-core/shaders/posters';
	import RingFingerprint from './ring-fingerprint.svelte';
	import { cn } from '$brand/utils.js';
	import type { Entry } from './releases';


	let {
		entries,
		preset = 'copper-sweep',
		class: className
	}: { entries: Entry[]; preset?: string; class?: string } = $props();

	let list: HTMLDivElement | undefined = $state();
	let fill = $state(0);
	const src = $derived((shaderPosters[preset] ?? shaderPosters['copper-sweep']).src);
	const tones: Record<string, 'green' | 'blue' | 'yellow' | 'red'> = { Added: 'green', Changed: 'blue', Fixed: 'yellow', Removed: 'red' };

	$effect(() => {
		const el = list;
		if (!el) return;
		let frame = 0;
		const measure = () => {
			frame = 0;
			const box = el.getBoundingClientRect();
			fill = Math.min(1, Math.max(0, (window.innerHeight * 0.55 - box.top) / Math.max(1, box.height)));
		};
		const queue = () => {
			if (!frame) frame = requestAnimationFrame(measure);
		};
		measure();
		window.addEventListener('scroll', queue, { passive: true });
		window.addEventListener('resize', queue);
		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener('scroll', queue);
			window.removeEventListener('resize', queue);
		};
	});
</script>

<div bind:this={list} data-move="oxide-timeline" class={cn('relative', className)}>
	<div aria-hidden="true" class="absolute top-2 bottom-0 left-[1.1rem] w-[3px] -translate-x-1/2 rounded-full bg-border lg:left-[calc(19rem+2.25rem)] xl:left-[calc(23rem+2.25rem)]">
		<div class="h-full w-full origin-top rounded-full bg-primary bg-cover bg-center" style:transform={`scaleY(${fill})`} style:background-image={`url(${JSON.stringify(src)})`}></div>
	</div>
	<ol class="relative">
	{#each entries as e, i (e.product + e.v)}
		{@const latest = i === 0}
		<li class="relative grid grid-cols-[2.2rem_minmax(0,1fr)] gap-x-4 pb-16 last:pb-0 sm:gap-x-6 lg:grid-cols-[19rem_4.5rem_minmax(0,1fr)] lg:gap-x-0 lg:pb-24 xl:grid-cols-[23rem_4.5rem_minmax(0,1fr)]">
			<div class="col-start-2 lg:col-start-1 lg:row-start-1">
				<div class="lg:sticky lg:top-24 lg:pr-10">
					<p class="text-[0.9375rem] font-medium text-foreground">{e.product}</p>
					<p class={cn('mt-1 text-[clamp(3.25rem,7vw,6rem)] leading-[0.9] font-medium tracking-[-0.045em] tabular-nums', latest ? 'text-primary' : 'text-foreground')}>
						{e.v}
					</p>
					<p class="mt-3 text-sm text-muted-foreground">{e.date}{latest ? ' · Latest' : ''}</p>
				</div>
			</div>
			<div class="col-start-1 row-start-1 flex justify-center pt-1 lg:col-start-2 lg:pt-3">
				<span class="relative z-10 grid size-10 place-items-center rounded-full bg-background ring-[6px] ring-background lg:size-14">
					<RingFingerprint seed={e.product + e.v} count={4} weight={1.7} filled={latest} color={latest ? 'var(--primary)' : 'var(--foreground)'} class="size-full" />
				</span>
			</div>
			<div class="col-start-2 mt-6 min-w-0 lg:col-start-3 lg:row-start-1 lg:mt-0">
				{#if latest}
					<article class="band-orange relative isolate overflow-hidden rounded-2xl p-6 sm:p-9">
						<CornerRings seed={e.product + e.v} class="pointer-events-none absolute -top-px -right-px -z-10 w-[min(55%,20rem)]" />
						<h3 class="max-w-[18ch] text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.02] font-medium tracking-[-0.035em] text-balance">{e.title}</h3>
						<p class="mt-4 max-w-[46ch] text-[1.125rem] leading-[1.55]">{e.summary}</p>
						<div class="mt-8 grid gap-6 sm:grid-cols-2">
							{#each e.groups as [kind, items] (kind)}
								<div>
									<p class="flex items-center gap-2 text-sm font-medium"><i aria-hidden="true" class="inline-block size-2 rounded-full border-[1.75px] border-current"></i>{kind}</p>
									<ul class="mt-2.5 flex flex-col gap-2 border-t border-border pt-3 text-[0.9875rem] leading-[1.5]">
										{#each items as it (it)}<li>{it}</li>{/each}
									</ul>
								</div>
							{/each}
						</div>
					</article>
				{:else}
					<article class="pt-1 lg:pt-2">
						<h3 class="max-w-[24ch] text-[clamp(1.6rem,2.6vw,2.25rem)] leading-[1.08] font-medium tracking-[-0.03em] text-balance text-foreground">{e.title}</h3>
						<p class="mt-3 max-w-[52ch] text-[1.0625rem] leading-[1.6] text-foreground">{e.summary}</p>
						<div class="mt-6 flex flex-col gap-5">
							{#each e.groups as [kind, items] (kind)}
								<div class="grid gap-2.5 sm:grid-cols-[6.5rem_minmax(0,1fr)] sm:gap-4">
									<div class="pt-0.5"><KindTag {kind} count={items.length} tone={tones[kind]} /></div>
									<ul class="flex flex-col gap-2 text-[0.9875rem] leading-[1.55] text-foreground">
										{#each items as it (it)}<li class="border-b border-border/60 pb-2 last:border-0 last:pb-0">{it}</li>{/each}
									</ul>
								</div>
							{/each}
						</div>
					</article>
				{/if}
			</div>
		</li>
	{/each}
	</ol>
</div>
