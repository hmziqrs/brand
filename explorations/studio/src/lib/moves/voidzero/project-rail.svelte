<script lang="ts">
	import Star from '@lucide/svelte/icons/star';
	import Users from '@lucide/svelte/icons/users';
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import { fade } from 'svelte/transition';
	import { cn } from '$brand/utils.js';
	import { Button } from '$brand/ui/button/index.js';
	import MaterialTile from '$brand/components/material-tile.svelte';
	import MaterialCodePanel from './material-code-panel.svelte';
	import type { Project } from './freeoxide';

	let {
		projects,
		layout = 'rail',
		live = -1,
		class: className
	}: {
		projects: Project[];
		layout?: 'rail' | 'tabs';
		live?: number;
		class?: string;
	} = $props();

	let active = $state(0);
	let rows: HTMLElement[] = $state([]);
	let reduced = $state(false);

	$effect(() => {
		reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (layout !== 'rail') return;
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
		if (layout === 'rail') rows[i]?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
	}
</script>

{#snippet copy(p: Project, big: boolean)}
	<div class={cn('flex flex-col gap-5', big ? 'p-6 sm:p-10 lg:p-12' : 'p-6 sm:p-10')}>
		<p class="font-mono text-xs text-muted-foreground">{p.name} · {p.kicker}</p>
		<h3 class={cn('font-medium tracking-[-0.03em] text-balance', big ? 'text-4xl leading-[1.02] sm:text-5xl' : 'text-3xl leading-[1.08] sm:text-[2.5rem]')}>{p.title}</h3>
		<p class="max-w-[46ch] text-lg leading-relaxed text-foreground/85">{p.body}</p>
		<div>
			<Button href={p.href} variant="outline" size="lg" class="px-4">Explore {p.name}<ArrowUpRight class="lucide" data-icon="inline-end" /></Button>
		</div>
		<p class="mt-auto flex flex-wrap items-center gap-x-5 gap-y-1 pt-6 text-sm text-muted-foreground">
			<span class="inline-flex items-center gap-1.5"><Star class="lucide size-4" /><span class="text-foreground">{p.stars}</span> stars</span>
			<span class="inline-flex items-center gap-1.5"><Users class="lucide size-4" /><span class="text-foreground">{p.contributors}</span> contributors</span>
			<span class="text-xs">Example numbers</span>
		</p>
	</div>
{/snippet}

{#snippet nav(vertical: boolean)}
	<ul class={cn(vertical ? 'flex flex-col gap-1' : 'flex gap-2 overflow-x-auto pb-1')} aria-label="Projects">
		{#each projects as p, i (p.id)}
			<li class="shrink-0">
				<button
					type="button"
					aria-current={active === i ? 'true' : undefined}
					onclick={() => pick(i)}
					class={cn(
						'group flex w-full items-center gap-3 rounded-lg py-2 text-left text-[0.95rem] transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
						vertical ? 'px-3' : 'border border-border px-3',
						active === i ? 'bg-foreground/[0.06] text-foreground' : 'text-muted-foreground hover:text-foreground'
					)}
				>
					<MaterialTile preset={p.preset} size={28} class={cn('transition-opacity', active === i ? 'opacity-100' : 'opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0')}>
						<span class="text-[0.7em] font-semibold">{p.symbol}</span>
					</MaterialTile>
					<span class="font-medium">{p.name}</span>
					{#if vertical && active === i}<span aria-hidden="true" class="ml-auto size-1.5 bg-mark-square"></span>{/if}
				</button>
			</li>
		{/each}
	</ul>
{/snippet}

<div class={cn('project-rail border-y border-border', className)}>
	<div class="border-b border-border p-4 lg:hidden">{@render nav(false)}</div>
	<div class="grid lg:grid-cols-[15rem_minmax(0,1fr)]">
		<aside class="hidden border-r border-border lg:block">
			<div class="sticky top-6 p-4">{@render nav(true)}</div>
		</aside>
		{#if layout === 'rail'}
			<div>
				{#each projects as p, i (p.id)}
					<article bind:this={rows[i]} class="grid border-border xl:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] [&:not(:last-child)]:border-b">
						{@render copy(p, false)}
						<MaterialCodePanel preset={p.preset} panel={p.panel} live={live === i} class="border-t border-border xl:border-t-0 xl:border-l" />
					</article>
				{/each}
			</div>
		{:else}
			<div class="grid min-h-[34rem]">
				{#key active}
					{@const p = projects[active]}
					<article in:fade={{ duration: reduced ? 0 : 280 }} class="col-start-1 row-start-1 grid xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
						{@render copy(p, true)}
						<MaterialCodePanel preset={p.preset} panel={p.panel} live={live === active} tall align="center" class="border-t border-border xl:border-t-0 xl:border-l" />
					</article>
				{/key}
			</div>
		{/if}
	</div>
</div>
