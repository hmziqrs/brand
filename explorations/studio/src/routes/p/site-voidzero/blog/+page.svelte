<script lang="ts">
	import Search from '@lucide/svelte/icons/search';
	import { cn } from '$brand/utils.js';
	import { Input } from '$brand/ui/input/index.js';
	import ModeBand from '$moves/voidzero/mode-band.svelte';
	import SiteHeader from '$moves/site-voidzero/site-header.svelte';
	import SiteFooter from '$moves/site-voidzero/site-footer.svelte';
	import PostCard from '$moves/site-voidzero/post-card.svelte';
	import PostCover from '$moves/site-voidzero/post-cover.svelte';
	import { posts, to } from '$moves/site-voidzero/site';

	const kinds = ['All', 'Releases', 'Updates', 'Ecosystem', 'Case studies'] as const;
	let kind = $state<(typeof kinds)[number]>('All');
	let q = $state('');

	const [lead, ...side] = posts;
	const list = $derived(posts.filter((p) => (kind === 'All' || p.kind === kind) && (!q.trim() || `${p.title} ${p.summary}`.toLowerCase().includes(q.trim().toLowerCase()))));
</script>

<svelte:head><title>Blog · Bloomery</title></svelte:head>

<div class="min-h-screen bg-background text-foreground">
	<SiteHeader current="blog" />

	<ModeBand frame>
		<div class="grid border-b border-border lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
			<a href={to('post')} class="group relative flex flex-col gap-6 p-6 outline-none after:pointer-events-none after:absolute after:inset-3 after:rounded-xl after:border after:border-transparent after:transition-colors hover:after:border-primary/60 focus-visible:after:border-ring sm:p-10">
				<PostCover cover={lead.cover} size="lg" loading="eager" class="aspect-[16/9] w-full rounded-xl" />
				<div class="flex flex-col gap-3">
					<p class="font-mono text-xs text-muted-foreground uppercase">// {lead.kind} · latest</p>
					<h1 class="max-w-[22ch] text-4xl leading-[1.02] font-medium tracking-[-0.04em] text-balance sm:text-6xl">{lead.title}</h1>
					<p class="max-w-[56ch] text-lg text-foreground/85">{lead.summary}</p>
				</div>
				<div class="flex items-center justify-between gap-4 border-t border-border pt-5">
					<span class="flex items-center gap-2.5 text-sm"><span class="grid size-7 place-items-center rounded-full bg-muted text-[0.65rem] font-medium">IV</span>{lead.authors[0]}</span>
					<span class="font-mono text-xs text-muted-foreground uppercase">{lead.date}</span>
				</div>
			</a>
			<div class="flex flex-col border-t border-border lg:border-t-0 lg:border-l">
				{#each side.slice(0, 2) as p, i (p.slug)}
					<div class={cn('flex-1 p-6 sm:p-8', i > 0 && 'border-t border-border')}><PostCard post={p} class="h-full" /></div>
				{/each}
			</div>
		</div>
	</ModeBand>

	<ModeBand frame inner="px-6 pt-16 pb-24 sm:px-10 md:pt-24">
		<h2 class="text-5xl leading-[0.98] font-medium tracking-[-0.045em] sm:text-7xl">Every post</h2>
		<div class="mt-8 flex flex-col gap-4 border-y border-border py-4 md:flex-row md:items-center md:justify-between">
			<div role="group" aria-label="Category" class="flex flex-wrap items-center gap-1.5">
				<span class="mr-2 font-mono text-xs text-muted-foreground uppercase">// categories</span>
				{#each kinds as k (k)}
					<button type="button" aria-pressed={kind === k} onclick={() => (kind = k)} class={cn('h-8 rounded-md border px-3 text-sm transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50', kind === k ? 'border-foreground bg-foreground text-background' : 'border-border text-foreground/85 hover:border-foreground/40')}>{k}</button>
				{/each}
			</div>
			<label class="relative block md:w-72">
				<span class="sr-only">Search posts</span>
				<Search class="lucide pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
				<Input bind:value={q} type="search" placeholder="Search posts" class="h-9 pl-9" />
			</label>
		</div>
		<div class="mt-8 flex flex-col gap-4">
			{#each list as p (p.slug)}
				<PostCard post={p} layout="row" />
			{:else}
				<p class="rounded-xl border border-dashed border-border py-16 text-center text-lg">Nothing matches that yet. Try another word or category.</p>
			{/each}
		</div>
		<p class="mt-6 font-mono text-xs text-muted-foreground uppercase">Example posts written for this study</p>
	</ModeBand>

	<SiteFooter />
</div>
