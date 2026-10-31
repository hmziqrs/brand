<script lang="ts">
	import { cn } from '$brand/utils.js';
	import { Button } from '$brand/ui/button/index.js';
	import Search from '@lucide/svelte/icons/search';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import MaterialCover from '$moves/content/material-cover.svelte';
	import { cover, postHref, type Post } from './site';

	let { items, step = 8, class: className }: { items: Post[]; step?: number; class?: string } = $props();

	const tabs = ['Latest', 'Updates', 'Inspiration', 'Resources', 'Tutorials'];
	let tab = $state('Latest');
	let q = $state('');
	let shown = $state(8);

	const list = $derived(items.filter((p) => (tab === 'Latest' || p.cat === tab) && p.title.toLowerCase().includes(q.trim().toLowerCase())));
</script>

<div class={cn('mx-auto max-w-[1000px]', className)}>
	<div class="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
		<div role="tablist" aria-label="Filter stories" class="flex flex-wrap gap-1">
			{#each tabs as t (t)}
				<button
					type="button"
					role="tab"
					aria-selected={tab === t}
					onclick={() => ((tab = t), (shown = step))}
					class={cn('rounded-full px-3.5 py-1.5 text-sm transition-colors', tab === t ? 'bg-foreground text-background' : 'text-foreground hover:bg-foreground/8')}
				>{t}</button>
			{/each}
		</div>
		<label class="relative w-full sm:w-64">
			<span class="sr-only">Search stories</span>
			<Search class="lucide pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-foreground" />
			<input bind:value={q} type="search" placeholder="Search stories" class="h-10 w-full rounded-full border border-border bg-card pr-4 pl-9 text-[14px] text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-primary" />
		</label>
	</div>

	{#if list.length === 0}
		<p class="py-20 text-center text-lg text-foreground">Nothing matches “{q}”. Try a shorter word.</p>
	{:else}
		<ul>
			{#each list.slice(0, shown) as p (p.title)}
				<li>
					<a href={postHref(p)} class="group relative grid grid-cols-[1fr_auto] items-center gap-6 border-b border-border py-6">
						<span aria-hidden="true" class="absolute bottom-[-1px] left-0 h-px w-0 bg-primary transition-[width] duration-500 group-hover:w-full motion-reduce:transition-none"></span>
						<span>
							<span class="block text-[clamp(1.15rem,2vw,1.45rem)] leading-snug font-medium tracking-[-0.015em] text-foreground group-hover:text-primary">{p.title}</span>
							<span class="mt-1.5 block text-[14px] text-muted-foreground">{p.cat} · {p.date}</span>
						</span>
						<span class="relative block aspect-[16/10] w-28 overflow-hidden rounded-lg border border-border sm:w-44">
							<MaterialCover seed={p.title} preset={cover(p)} notch={false} sizes="180px" class="!absolute inset-0 transition-transform duration-700 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
						</span>
					</a>
				</li>
			{/each}
		</ul>
		{#if shown < list.length}
			<Button variant="outline" class="mt-10 rounded-full px-5" onclick={() => (shown += step)}>Show older stories <ArrowRight class="lucide rotate-90" /></Button>
		{/if}
	{/if}
</div>
