<script lang="ts">
	import ArrowDownRight from '@lucide/svelte/icons/arrow-down-right';
	import Wordmark from '$brand/components/wordmark.svelte';

	let {
		title,
		kicker,
		intro,
		items = [],
		pages = []
	}: {
		title: string;
		kicker: string;
		intro: string;
		items?: { id: string; name: string }[];
		pages?: { slug: string; label: string; current?: boolean }[];
	} = $props();

	function jump(id: string) {
		const el = document.getElementById(id.replace(/[^a-z0-9]+/gi, '-'));
		const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
		el?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
	}
</script>

<header class="mx-auto flex w-full max-w-[1320px] flex-col gap-10 px-4 pt-8 pb-12 sm:px-8">
	<nav class="flex flex-wrap items-center justify-between gap-4" aria-label="Specimen pages">
		<Wordmark name="specimens" class="text-xl" />
		<ul class="flex flex-wrap gap-1 text-sm">
			{#each pages as p (p.slug)}
				<li>
					<a
						href={`#/p/specimens/${p.slug}`}
						aria-current={p.current ? 'page' : undefined}
						class="inline-flex h-8 items-center rounded-md px-3 font-medium text-foreground transition-colors motion-reduce:transition-none hover:bg-muted aria-[current=page]:bg-foreground aria-[current=page]:text-background"
						>{p.label}</a
					>
				</li>
			{/each}
		</ul>
	</nav>
	<div class="flex flex-col gap-6">
		<span class="font-mono text-xs tracking-[0.14em] text-foreground uppercase"><span class="sq mr-2 inline-block size-2 align-middle"></span>{kicker}</span>
		<h1 class="max-w-[16ch] text-[clamp(3rem,8vw,7.5rem)] leading-[0.92] font-medium tracking-[-0.045em] text-foreground">{title}</h1>
		<p class="max-w-[62ch] text-lg leading-relaxed text-foreground sm:text-xl">{intro}</p>
	</div>
	{#if items.length}
		<ol class="grid gap-x-6 gap-y-1 border-t pt-5 sm:grid-cols-2 lg:grid-cols-3">
			{#each items as it, i (it.id)}
				<li>
					<button type="button" onclick={() => jump(it.id)} class="group flex w-full items-baseline gap-3 rounded-md py-1.5 text-left text-[15px] text-foreground hover:bg-muted/60">
						<span class="font-mono text-xs tabular-nums">{String(i + 1).padStart(2, '0')}</span>
						<span class="flex-1">{it.name}</span>
						<ArrowDownRight class="lucide size-4 opacity-60 group-hover:opacity-100" />
					</button>
				</li>
			{/each}
		</ol>
	{/if}
</header>

<style>
	.sq {
		background: var(--mark-square);
	}
</style>
