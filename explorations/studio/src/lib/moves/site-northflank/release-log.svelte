<script lang="ts" module>
	export type Release = {
		period: string;
		year: string;
		cover: string;
		date: string;
		version: string;
		title: string;
		lede: string;
		cmd?: string;
		features?: { h: string; p: string }[];
		groups: { kind: 'Added' | 'Changed' | 'Fixed'; items: string[] }[];
	};
</script>

<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ReleaseCover from './release-cover.svelte';

	let { releases, class: className }: { releases: Release[]; class?: string } = $props();

	let host: HTMLElement | undefined = $state();
	let fill = $state(0);
	const tone = { Added: 'text-green border-green/40', Changed: 'text-blue border-blue/40', Fixed: 'text-yellow border-yellow/40' };

	$effect(() => {
		const el = host;
		if (!el) return;
		let frame = 0;
		const measure = () => {
			frame = 0;
			const b = el.getBoundingClientRect();
			fill = Math.min(1, Math.max(0, (innerHeight * 0.5 - b.top) / Math.max(1, b.height)));
		};
		const queue = () => {
			if (!frame) frame = requestAnimationFrame(measure);
		};
		measure();
		addEventListener('scroll', queue, { passive: true });
		addEventListener('resize', queue);
		return () => {
			cancelAnimationFrame(frame);
			removeEventListener('scroll', queue);
			removeEventListener('resize', queue);
		};
	});
</script>

<div bind:this={host} data-slot="release-log" class={cn('relative', className)}>
	<div aria-hidden="true" class="absolute top-0 bottom-0 left-[5px] w-px bg-border md:left-[calc(260px+31px)]">
		<div class="h-full w-full origin-top bg-orange" style:transform="scaleY({fill})"></div>
	</div>
	<ol>
		{#each releases as r, i (r.version)}
			<li class="relative grid grid-cols-[11px_minmax(0,1fr)] gap-x-6 pb-24 last:pb-0 md:grid-cols-[260px_63px_minmax(0,1fr)] md:gap-x-0">
				<div class="col-start-2 md:col-start-1 md:row-start-1">
					<div class="md:sticky md:top-28 md:pr-8">
						<p class="flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">{r.date}{#if i === 0}<span class="rounded-full bg-orange px-2 py-0.5 text-[10px] text-(--on-orange)">Latest</span>{/if}</p>
						<p class={cn('mt-2 text-[clamp(40px,4.4vw,60px)] leading-[0.92] font-medium tracking-[-0.045em] whitespace-nowrap text-foreground')}>{r.period}</p>
						<p class="mt-1 text-[clamp(22px,2vw,28px)] font-medium tracking-[-0.02em] text-foreground/60">{r.year}</p>
						<p class="mt-3 inline-flex rounded-md border px-2 py-1 font-mono text-[11.5px] text-foreground">{r.version}</p>
					</div>
				</div>
				<div class="col-start-1 row-start-1 flex justify-center pt-1.5 md:col-start-2 md:pt-3">
					<span class={cn('relative z-10 size-[11px] ring-4 ring-background', i === 0 ? 'bg-orange' : 'border border-foreground/50 bg-background')}></span>
				</div>
				<article class="col-start-2 mt-6 min-w-0 md:col-start-3 md:row-start-1 md:mt-0">
					<h2 class="max-w-[22ch] text-[clamp(30px,3.4vw,46px)] leading-[1.02] font-medium tracking-[-0.035em] text-balance text-foreground">{r.title}</h2>
					<div class="relative mt-8 aspect-[4/3] overflow-hidden rounded-2xl border sm:aspect-[16/9]">
						<ReleaseCover seed={r.version} title={r.cover} kicker="{r.version} · {r.period} {r.year}" class="absolute inset-0" />
						{#if r.cmd}
							<p class="absolute top-4 left-4 max-w-[calc(100%-2rem)] truncate rounded-lg border bg-background px-3 py-2 font-mono text-[12px] text-foreground shadow-xl"><span class="text-orange">$</span> {r.cmd}</p>
						{/if}
					</div>
					<p class="mt-8 max-w-[44rem] text-[19px] leading-[1.55] text-foreground">{r.lede}</p>
					{#each r.features ?? [] as f (f.h)}
						<h3 class="mt-9 text-[22px] font-medium tracking-[-0.015em] text-foreground">{f.h}</h3>
						<p class="mt-2.5 max-w-[44rem] text-[17px] leading-[1.6] text-foreground/90">{f.p}</p>
					{/each}
					<div class="mt-10 grid gap-3 sm:grid-cols-3">
						{#each r.groups as g (g.kind)}
							<div class="rounded-xl border bg-card p-4">
								<p class={cn('inline-flex items-center gap-2 rounded-full border px-2 py-0.5 font-mono text-[10.5px] tracking-[0.12em] uppercase', tone[g.kind])}>{g.kind}<span class="text-foreground/70">{g.items.length}</span></p>
								<ul class="mt-3 space-y-2 text-[14.5px] leading-[1.5] text-foreground/90">
									{#each g.items as it (it)}<li>{it}</li>{/each}
								</ul>
							</div>
						{/each}
					</div>
				</article>
			</li>
		{/each}
	</ol>
</div>
