<script lang="ts">
	import Star from '@lucide/svelte/icons/star';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { siGithub } from 'simple-icons';
	import { cn } from '$brand/utils.js';
	import { Button } from '$brand/ui/button/index.js';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import MaterialTile from '$brand/components/material-tile.svelte';
	import MaterialWindow from './material-window.svelte';
	import { to, type Tool } from './site';

	let {
		tools,
		class: className
	}: {
		tools: Tool[];
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

<div class={cn('tool-rail border-y border-border', className)}>
	<div class="grid lg:grid-cols-[13rem_minmax(0,1fr)]">
		<aside class="hidden border-r border-border lg:block">
			<ul class="sticky top-6 flex flex-col gap-1 p-4" aria-label="Tools">
				{#each tools as t, i (t.id)}
					<li>
						<button
							type="button"
							aria-current={active === i ? 'true' : undefined}
							onclick={() => pick(i)}
							class={cn('group flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50', active === i ? 'bg-foreground/[0.07] text-foreground' : 'text-muted-foreground hover:text-foreground')}
						>
							<MaterialTile preset={t.preset} size={28} class={cn('transition-[opacity,filter] motion-reduce:transition-none', active === i ? '' : 'opacity-55 grayscale group-hover:opacity-100 group-hover:grayscale-0')}><span class="text-[0.7em] font-semibold">{t.symbol}</span></MaterialTile>
							<span class="font-medium">{t.name}</span>
						</button>
					</li>
				{/each}
			</ul>
		</aside>
		<div>
			{#each tools as t, i (t.id)}
				<article bind:this={rows[i]} class="grid grid-cols-[minmax(0,1fr)] border-border lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] [&:not(:last-child)]:border-b">
					<div class="flex flex-col gap-5 p-6 sm:p-10">
						<p class="flex items-center gap-2.5 font-mono text-xs text-muted-foreground uppercase">
							<MaterialTile preset={t.preset} size={22} class="lg:hidden"><span class="text-[0.6em] font-semibold">{t.symbol}</span></MaterialTile>{t.name} · {t.role}
						</p>
						<h3 class="max-w-[16ch] text-3xl leading-[1.05] font-medium tracking-[-0.035em] text-balance sm:text-[2.6rem]">{t.title}</h3>
						<p class="max-w-[44ch] text-lg leading-relaxed text-foreground/85">{t.body}</p>
						<div><Button href={to('product')} variant="outline" size="lg" class="px-4">Explore {t.name}<ArrowRight class="lucide" data-icon="inline-end" /></Button></div>
						<p class="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-6 text-sm text-muted-foreground">
							<span class="inline-flex items-center gap-1.5 rounded-md border border-border px-2 py-1"><BrandIcon icon={siGithub} class="size-3.5" />{#if t.isNew}<span class="font-mono text-xs text-primary uppercase">new</span>{:else}<Star class="lucide size-3.5" /><span class="text-foreground">{t.stars}</span> stars · <span class="text-foreground">{t.contributors}</span> contributors{/if}</span>
							<span class="text-xs">Example numbers</span>
						</p>
					</div>
					<MaterialWindow preset={t.preset} panel={t.panel} class="border-t border-border lg:border-t-0 lg:border-l" />
				</article>
			{/each}
		</div>
	</div>
</div>
