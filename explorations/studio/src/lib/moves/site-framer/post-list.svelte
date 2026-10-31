<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import Search from '@lucide/svelte/icons/search';
	import type { Post } from './posts';

	let { posts, cats, page = 6, href = '#/p/site-framer/blog', class: className }: { posts: Post[]; cats: string[]; page?: number; href?: string; class?: string } = $props();

	let cat = $state('All');
	let q = $state('');
	let limit = $state(0);
	let hover = $state<string | null>(null);
	const filtered = $derived(posts.filter((p) => (cat === 'All' || p.cat === cat) && (!q || p.title.toLowerCase().includes(q.toLowerCase()))));
	const shown = $derived(filtered.slice(0, (limit || page)));
</script>

<div class={cn('min-w-0', className)}>
	<div class="flex flex-wrap items-center gap-3">
		<div class="-mx-1 flex max-w-full gap-1 overflow-x-auto px-1">
			{#each ['All', ...cats] as c (c)}
				<button type="button" onclick={() => ((cat = c), (limit = 0))} class="shrink-0 rounded-full px-3 py-1.5 text-[0.9375rem] transition-colors" class:bg-foreground={cat === c} class:text-background={cat === c} class:opacity-65={cat !== c}>{c}</button>
			{/each}
		</div>
		<label class="ml-auto flex w-full items-center gap-2 rounded-full border border-border px-4 py-2 sm:w-64">
			<Search class="lucide size-4 text-foreground/50" /><span class="sr-only">Search articles</span>
			<input bind:value={q} placeholder="Search articles…" class="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-foreground/45" />
		</label>
	</div>
	<ul class="mt-6 overflow-hidden rounded-[20px] border border-border">
		{#each shown as p (p.title)}
			<li class="border-b border-border last:border-0">
				<a {href} onpointerenter={() => (hover = p.title)} onpointerleave={() => (hover = null)} class="relative isolate flex items-center gap-4 px-5 py-4 transition-colors hover:bg-card">
					<span class="min-w-0 flex-1">
						<span class="block font-mono text-[0.6875rem] tracking-wide uppercase"><span class="text-primary">{p.cat}</span><span class="opacity-60"> · {p.date}</span></span>
						<span class="mt-1 block text-lg leading-snug font-medium tracking-[-0.015em]">{p.title}</span>
					</span>
					<span class="hidden shrink-0 text-sm text-foreground/60 sm:block">{p.who} · {p.min}m</span>
					<span class="relative h-12 shrink-0 overflow-hidden rounded-lg transition-[width] duration-300 motion-reduce:transition-none" style:width={hover === p.title ? '5rem' : '0px'} aria-hidden="true">
						{#if hover === p.title}<ShaderMaterial preset={p.preset} rendering="image" controls={false} sizes="80px" class="absolute inset-0 h-full w-full" />{/if}
					</span>
				</a>
			</li>
		{:else}
			<li class="px-5 py-10 text-center text-lg">No articles match. Try another word.</li>
		{/each}
		{#if filtered.length > shown.length}
			<li><button type="button" onclick={() => (limit = filtered.length)} class="w-full py-4 text-center font-medium transition-colors hover:bg-primary hover:text-primary-foreground">Load more articles</button></li>
		{/if}
	</ul>
</div>
