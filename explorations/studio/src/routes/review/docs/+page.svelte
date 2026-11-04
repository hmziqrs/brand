<script lang="ts">
	import Sun from '@lucide/svelte/icons/sun';
	import Moon from '@lucide/svelte/icons/moon';
	import Tag from '$brand/components/tag.svelte';
	import { cn } from '$brand/utils.js';
	import { prefs } from '$studio/prefs.svelte';
	import { verdicts } from '$studio/verdicts.svelte';
	import ReviewVerdict from '$studio/review-verdict.svelte';
	import { docsCandidates } from '$studio/docs-candidates';

	const groups = [
		{ product: 'claude-multi', title: 'claude-multi docs · claude-multi.hmziq.xyz/docs', note: 'All seven live pages, word for word. The live pages have no callouts, so a few of their own sentences are framed as Note or Caution here (marked in the page’s data); the install switch on Getting started holds the page’s own three commands.' },
		{ product: 'gpui-query', title: 'gpui-query docs · gpui-query.freeoxide.com/docs', note: 'All 20 live pages, word for word, with their own notes, cautions and tips. Opens on Installation, the page the kit’s story shows.' }
	] as const;

	let open = $state<Record<string, boolean>>({});
</script>

<svelte:head><title>Docs · review</title></svelte:head>

<main class="min-h-screen bg-background pb-24 text-foreground">
	<div class="mx-auto flex max-w-[1400px] items-end justify-between gap-4 px-4 pt-10 pb-8 sm:px-8">
		<div>
			<a href="#/" class="font-mono text-xs text-muted-foreground hover:text-foreground">← studio</a>
			<h1 class="mt-2 text-4xl font-medium tracking-tight">Product docs</h1>
			<p class="mt-2 max-w-2xl text-foreground/80">Two designs for a product’s docs, each shown for claude-multi and gpui-query: the kit’s three-column reference page, and a guide with a sticky search and the code beside the words. Titles, code, callouts, menus and the pager are the same kit pieces in all four. Click around: the menu, the pager and links between pages switch pages, and the contents rail jumps within one.</p>
		</div>
		<button type="button" aria-label="Toggle theme" class="grid size-9 shrink-0 place-items-center rounded-md border border-border" onclick={() => prefs.toggleTheme()}>
			{#if prefs.dark}<Sun class="lucide size-4" />{:else}<Moon class="lucide size-4" />{/if}
		</button>
	</div>

	{#each groups as g (g.product)}
		{@const list = docsCandidates.filter((c) => c.product === g.product)}
		{@const pick = list.find((c) => c.pick === 'recommended')}
		{#if list.length}
			<div class="mx-auto max-w-[1400px] px-4 pt-6 pb-4 sm:px-8">
				<h2 class="font-mono text-xs tracking-widest text-primary uppercase">{g.title}</h2>
				<p class="mt-1 text-sm text-foreground/75">{g.note}</p>
				{#if pick}<p class="mt-1 text-sm text-foreground"><span class="font-medium">Recommended: {pick.name}.</span> {pick.why}</p>{/if}
			</div>
		{/if}
		{#each list as c (c.id)}
			{@const id = `review:docs/${c.id}`}
			<section aria-label={c.name} class={cn('relative mb-10 border-t border-border [transform:translateZ(0)] focus-within:z-10 hover:z-10', verdicts.all[id] === 'remove' && 'opacity-50')}>
				<div class="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-border px-4 py-2.5 sm:px-8">
					<div class="min-w-0 flex-1 basis-80">
						<p class="text-sm">
							<Tag tone={c.pick === 'recommended' ? 'orange' : undefined} class="mr-1.5 align-[1px]">{c.pick === 'recommended' ? 'Recommended' : 'Alternative'}</Tag>
							<span class="font-medium">{c.name}</span> <span class="text-foreground/75">— {c.line}</span>
						</p>
						<p class="mt-0.5 text-sm text-foreground/75">From {c.from}.</p>
						<p class="mt-0.5 truncate font-mono text-[11px] text-muted-foreground">{c.src}</p>
					</div>
					<ReviewVerdict {id} />
					<a href={`#/c/docs/${c.id}`} class="text-sm whitespace-nowrap text-primary hover:underline">Open alone ↗</a>
				</div>
				<div class={cn('overflow-clip bg-background', !open[c.id] && 'max-h-[1150px]')}>
					<c.component {...c.props} />
				</div>
				<div class="flex justify-center border-t border-border py-3">
					<button type="button" aria-expanded={!!open[c.id]} onclick={() => (open[c.id] = !open[c.id])} class="h-8 rounded-md border border-border px-3 text-sm text-foreground/80 hover:text-foreground">
						{open[c.id] ? 'Show the top part only ↑' : 'Show the whole page ↓'}
					</button>
				</div>
			</section>
		{/each}
	{/each}
</main>
