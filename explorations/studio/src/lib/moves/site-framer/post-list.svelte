<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Search from '@lucide/svelte/icons/search';
	import PostCard, { type Art } from './post-card.svelte';
	import type { Post } from './posts';

	let { posts, cats, page = 6, href = '#/p/site-framer/blog', class: className }: { posts: Post[]; cats: string[]; page?: number; href?: string; class?: string } = $props();

	const arts: Art[] = ['material', 'rings', 'lattice', 'material', 'stack', 'bars'];
	let cat = $state('All');
	let q = $state('');
	let limit = $state(0);
	const count = (c: string) => (c === 'All' ? posts.length : posts.filter((p) => p.cat === c).length);
	const filtered = $derived(posts.filter((p) => (cat === 'All' || p.cat === cat) && (!q || `${p.title} ${p.dek ?? ''}`.toLowerCase().includes(q.toLowerCase()))));
	const shown = $derived(filtered.slice(0, limit || page));
</script>

<div class={cn('min-w-0', className)}>
	<div class="flex flex-wrap items-center gap-3">
		<div class="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
			{#each ['All', ...cats] as c (c)}
				<button
					type="button"
					onclick={() => ((cat = c), (limit = 0))}
					aria-pressed={cat === c}
					class={cn('inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[0.9375rem] transition-colors', cat === c ? 'border-transparent bg-primary text-primary-foreground' : 'border-border bg-card text-foreground hover:border-primary')}
				>
					{c}<span class={cn('font-mono text-[0.6875rem]', cat === c ? '' : 'text-foreground/60')}>{count(c)}</span>
				</button>
			{/each}
		</div>
		<label class="flex w-full items-center gap-2 rounded-full border border-border bg-card px-4 py-2 sm:ml-auto sm:w-64">
			<Search class="lucide size-4 text-foreground/60" /><span class="sr-only">Search articles</span>
			<input bind:value={q} placeholder="Search articles…" class="min-w-0 flex-1 bg-transparent text-[0.9375rem] outline-none placeholder:text-foreground/50" />
		</label>
	</div>
	{#if shown.length}
		<div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each shown as p, i (p.title)}
				<PostCard post={p} art={arts[i % arts.length]} {href} />
			{/each}
		</div>
	{:else}
		<p class="mt-8 rounded-[22px] border border-dashed border-border p-10 text-center text-lg">No articles match. Try another word.</p>
	{/if}
	{#if filtered.length > shown.length}
		<div class="mt-10 flex justify-center">
			<button type="button" onclick={() => (limit = filtered.length)} class="rounded-full bg-foreground px-6 py-3 font-medium text-background transition-opacity hover:opacity-85">Load {filtered.length - shown.length} more</button>
		</div>
	{/if}
</div>
