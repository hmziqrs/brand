<script lang="ts">
	import { cn } from '$brand/utils.js';
	import ShaderMaterial from '$brand/components/shader-material.svelte';
	import Folder from '@lucide/svelte/icons/folder';
	import Database from '@lucide/svelte/icons/database';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import Plus from '@lucide/svelte/icons/plus';
	import ArrowUpDown from '@lucide/svelte/icons/arrow-up-down';
	import ListFilter from '@lucide/svelte/icons/list-filter';
	import Search from '@lucide/svelte/icons/search';
	import Check from '@lucide/svelte/icons/check';
	import FileSpreadsheet from '@lucide/svelte/icons/file-spreadsheet';

	let { compact = false, agent = false, class: className }: { compact?: boolean; agent?: boolean; class?: string } = $props();

	const folders = ['Blog', 'Careers', 'Docs', 'Events', 'Help'];
	const sets = ['Articles', 'Authors', 'Categories'];
	const tones = ['bg-orange/20 text-orange', 'bg-teal/20 text-teal', 'bg-purple/20 text-purple', 'bg-blue/20 text-blue', 'bg-green/20 text-green'];
	let rows = $state([
		{ title: 'How a bakery doubled pre-orders', cat: 'Retail', tone: 0, on: true, m: 'chalk-dunes' },
		{ title: 'Moving 400 docs pages in a weekend', cat: 'Engineering', tone: 1, on: false, m: 'black-ice' },
		{ title: 'A field guide to quiet interfaces', cat: 'Design', tone: 2, on: true, m: 'woven-linen' },
		{ title: 'Pricing pages that answer questions', cat: 'Growth', tone: 3, on: false, m: 'terrazzo' },
		{ title: 'Shipping a festival site in 9 days', cat: 'Events', tone: 4, on: true, m: 'lava-fissures' },
		{ title: 'Why our studio stopped using decks', cat: 'Design', tone: 2, on: true, m: 'endgrain-wood' },
		{ title: 'Ten things we cut from our homepage', cat: 'Growth', tone: 3, on: false, m: 'creased-paper' }
	]);
	let set = $state(0);
	let sel = $state(0);
	const shown = $derived(compact ? rows.slice(0, 5) : rows);
</script>

<div class={cn('overflow-hidden rounded-[18px] border border-border bg-card text-sm text-foreground', className)}>
	<div class={cn('grid', agent ? 'lg:grid-cols-[200px_minmax(0,1fr)_250px]' : compact ? 'sm:grid-cols-[170px_minmax(0,1fr)]' : 'md:grid-cols-[200px_minmax(0,1fr)]')}>
		<aside class="hidden border-r border-border p-3 sm:block">
			<div class="flex gap-1 text-[0.8125rem]">
				<span class="rounded-md bg-muted px-2 py-1">Collections</span><span class="px-2 py-1 opacity-60">Fields</span>
			</div>
			<ul class="mt-3 space-y-0.5">
				{#each folders as f (f)}
					<li class="flex items-center gap-1.5 px-1.5 py-1 text-foreground/70"><ChevronRight class="lucide size-3 {f === 'Blog' ? 'rotate-90' : ''}" /><Folder class="lucide size-3.5" />{f}</li>
					{#if f === 'Blog'}
						{#each sets as st, i (st)}
							<li>
								<button type="button" onclick={() => (set = i)} class="flex w-full items-center gap-1.5 rounded-md py-1 pr-2 pl-7 text-left" class:bg-muted={set === i}>
									<Database class="lucide size-3.5 {set === i ? 'text-primary' : 'text-foreground/50'}" />{st}<span class="ml-auto font-mono text-[0.6875rem] text-foreground/50">{[320, 24, 18][i]}</span>
								</button>
							</li>
						{/each}
					{/if}
				{/each}
				<li class="flex items-center gap-1.5 px-1.5 py-1 text-foreground/45"><Plus class="lucide size-3.5" />Add…</li>
			</ul>
		</aside>
		<div class="min-w-0">
			<div class="flex h-11 items-center gap-3 border-b border-border px-3 text-foreground/60">
				<Plus class="lucide size-4" /><ArrowUpDown class="lucide size-4" /><ListFilter class="lucide size-4" /><Search class="lucide size-4" />
				<span class="ml-auto font-mono text-xs">{sets[set]} · {rows.filter((r) => r.on).length} featured</span>
			</div>
			<div class="overflow-x-auto">
				<table class="w-full min-w-[460px] text-left">
					<thead class="text-xs text-foreground/50">
						<tr class="border-b border-border"><th class="py-2.5 pl-4 font-normal">Title</th><th class="font-normal">Image</th><th class="font-normal">Category</th><th class="pr-4 font-normal">Featured</th></tr>
					</thead>
					<tbody>
						{#each shown as r, i (r.title)}
							<tr class="border-b border-border/60 last:border-0" class:bg-muted={sel === i} onclick={() => (sel = i)}>
								<td class="max-w-0 py-2.5 pl-4"><span class="block truncate rounded px-1 py-0.5" class:ring-2={sel === i} class:ring-primary={sel === i}>{r.title}</span></td>
								<td class="w-16"><span class="relative block h-5 w-9 overflow-hidden rounded"><ShaderMaterial preset={r.m} rendering="image" controls={false} sizes="60px" class="absolute inset-0 h-full w-full" /></span></td>
								<td class="w-28"><span class="rounded-full px-2 py-0.5 text-xs {tones[r.tone]}">{r.cat}</span></td>
								<td class="w-20 pr-4">
									<button type="button" role="switch" aria-checked={r.on} aria-label="Featured" onclick={(e) => (e.stopPropagation(), (r.on = !r.on))} class="relative h-5 w-9 rounded-full transition-colors" class:bg-primary={r.on} class:bg-muted={!r.on}>
										<span class="absolute top-0.5 left-0.5 size-4 rounded-full bg-background shadow transition-transform motion-reduce:transition-none" class:translate-x-4={r.on}></span>
									</button>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
		{#if agent}
			<aside class="hidden flex-col gap-3 border-l border-border p-3 lg:flex">
				<span class="rounded-md bg-muted px-2 py-1 text-[0.8125rem]">Agent</span>
				<div class="rounded-xl border border-border bg-background/60 p-3 leading-snug">
					Use <span class="inline-flex items-center gap-1 rounded bg-muted px-1 font-mono text-xs"><FileSpreadsheet class="lucide size-3" />stories.csv</span> to make an Articles and a Categories collection, and link each article to one category.
				</div>
				<ul class="space-y-1.5 px-1 text-foreground/85">
					<li class="flex gap-2"><Check class="lucide mt-0.5 size-3.5 shrink-0 text-primary" />Articles · 39 rows imported</li>
					<li class="flex gap-2"><Check class="lucide mt-0.5 size-3.5 shrink-0 text-primary" />Categories · 10 rows, linked</li>
					<li class="flex gap-2"><Check class="lucide mt-0.5 size-3.5 shrink-0 text-primary" />Slugs and SEO titles set</li>
				</ul>
				<div class="mt-auto rounded-xl border border-border bg-background/60 p-2.5 text-foreground/45">Add a follow-up…</div>
			</aside>
		{/if}
	</div>
</div>
