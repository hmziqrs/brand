<script lang="ts">
	import Copy from '@lucide/svelte/icons/copy';
	import Sun from '@lucide/svelte/icons/sun';
	import Moon from '@lucide/svelte/icons/moon';
	import { toast } from 'svelte-sonner';
	import { cn } from '$brand/utils.js';
	import { pages, moves } from '$studio/manifest';
	import { prefs } from '$studio/prefs.svelte';
	import { verdicts } from '$studio/verdicts.svelte';
	import VerdictButtons from '$studio/verdict-buttons.svelte';
	import SwapControls from '$studio/swap-controls.svelte';

	const groups = [...new Set(pages.map((p) => p.group))];
	const axes = [...new Set(moves.map((m) => m.axis))];
	let group = $state<string | null>(null);
	let move = $state<string | null>(null);
	let show = $state<'all' | 'unrated' | 'star' | 'keep' | 'nuke'>('all');

	const list = $derived(
		pages.filter(
			(p) =>
				(!group || p.group === group) &&
				(!move || p.moves.includes(move)) &&
				(show === 'all' || (show === 'unrated' ? !verdicts.all[p.path] : verdicts.all[p.path] === show))
		)
	);

	const usage = (id: string) => pages.filter((p) => p.moves.includes(id)).length;

	async function copy() {
		const text = verdicts.report();
		if (!text) return toast('Nothing rated yet');
		try {
			await navigator.clipboard.writeText(text);
			toast('Verdicts copied — paste them in the chat');
		} catch {
			toast('Copy failed; the list is in the box below');
		}
	}
</script>

<svelte:head><title>hmziq studio</title></svelte:head>

<main class="mx-auto max-w-[1400px] px-4 py-10 sm:px-8">
	<header class="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
		<div class="max-w-2xl">
			<p class="font-mono text-xs uppercase tracking-widest text-primary">Round 2 · mix</p>
			<h1 class="mt-3 text-5xl font-medium tracking-tight">hmziq studio</h1>
			<p class="mt-4 text-lg text-foreground/80">
				Whole-page variants mixed from named <em>moves</em>. Star, keep or nuke each page and each move, add notes, they sync to Claude automatically when you're signed in (or copy them into the chat). Nuked moves get deleted everywhere; starred ones get mixed in round 2.
			</p>
		</div>
		<div class="flex flex-wrap items-center gap-2">
			<button type="button" class="inline-flex h-9 items-center gap-2 rounded-md border border-border px-3 text-sm" onclick={() => prefs.toggleTheme()}>
				{#if prefs.dark}<Sun class="lucide size-4" /> Light{:else}<Moon class="lucide size-4" /> Dark{/if}
			</button>
			<button type="button" class="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground" onclick={copy}>
				<Copy class="lucide size-4" /> Copy verdicts
			</button>
		</div>
	</header>

	<section class="mt-6 rounded-xl border border-border bg-card p-4" aria-label="Global swaps">
		<p class="mb-3 text-sm text-foreground/80">Swaps apply to every page and stick between visits: light treatment, accent hue, primary face, and the face behind every secondary class.</p>
		<SwapControls layout="inline" />
	</section>

	<section class="mt-8 flex flex-col gap-3 text-sm">
		<div class="flex flex-wrap items-center gap-1.5">
			<span class="w-16 text-muted-foreground">Group</span>
			<button type="button" class={cn('rounded-full border px-3 py-1', !group ? 'border-primary text-primary' : 'border-border')} onclick={() => (group = null)}>All · {pages.length}</button>
			{#each groups as g (g)}
				<button type="button" class={cn('rounded-full border px-3 py-1', group === g ? 'border-primary text-primary' : 'border-border')} onclick={() => (group = group === g ? null : g)}>
					{g} · {pages.filter((p) => p.group === g).length}
				</button>
			{/each}
		</div>
		<div class="flex flex-wrap items-center gap-1.5">
			<span class="w-16 text-muted-foreground">Show</span>
			{#each ['all', 'unrated', 'star', 'keep', 'nuke'] as const as s (s)}
				<button type="button" class={cn('rounded-full border px-3 py-1 capitalize', show === s ? 'border-primary text-primary' : 'border-border')} onclick={() => (show = s)}>{s}</button>
			{/each}
			{#if move}
				<button type="button" class="ml-2 rounded-full border border-primary px-3 py-1 text-primary" onclick={() => (move = null)}>move: {move} ✕</button>
			{/if}
		</div>
	</section>

	<section class="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
		{#each list as p (p.path)}
			<a
				href={p.href}
				class={cn(
					'group flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-colors motion-reduce:transition-none hover:border-primary',
					verdicts.all[p.path] === 'nuke' && 'opacity-50'
				)}
			>
				<div class="flex items-start justify-between gap-3">
					<div>
						<p class="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{p.group} · {p.kind}{p.product ? ` · ${p.product}` : ''}</p>
						<h2 class="mt-1.5 text-lg font-medium leading-snug">{p.title}</h2>
					</div>
					<VerdictButtons id={p.path} />
				</div>
				{#if p.notes}<p class="text-sm text-foreground/75">{p.notes}</p>{/if}
				<div class="mt-auto flex flex-wrap gap-1">
					{#each p.moves as m (m)}
						<button
							type="button"
							class={cn('rounded border border-border px-1.5 py-0.5 font-mono text-[10.5px] text-muted-foreground hover:text-foreground', verdicts.all[`move:${m}`] === 'nuke' && 'line-through')}
							onclick={(e) => {
								e.preventDefault();
								move = m;
							}}>{m}</button
						>
					{/each}
					{#each p.breaks ?? [] as b (b)}
						<span class="rounded border border-red/40 px-1.5 py-0.5 font-mono text-[10.5px] text-red">breaks: {b}</span>
					{/each}
				</div>
				<p class="font-mono text-[10.5px] text-muted-foreground">{p.path}</p>
			</a>
		{/each}
	</section>

	{#if moves.length}
		<section class="mt-16">
			<h2 class="text-2xl font-medium tracking-tight">Moves</h2>
			<p class="mt-2 text-foreground/75">Rate the building blocks on their own. A nuked move gets deleted with every page that leans on it.</p>
			{#each axes as a (a)}
				<h3 class="mt-8 font-mono text-xs uppercase tracking-widest text-primary">{a}</h3>
				<div class="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
					{#each moves.filter((m) => m.axis === a) as m (m.id)}
						<div class={cn('flex items-start justify-between gap-3 rounded-lg border border-border p-3', verdicts.all[`move:${m.id}`] === 'nuke' && 'opacity-50')}>
							<div class="min-w-0">
								<button type="button" class="text-left font-medium hover:text-primary" onclick={() => (move = m.id)}>{m.name}</button>
								<p class="font-mono text-[11px] text-muted-foreground">{m.id} · used by {usage(m.id)}</p>
								{#if m.notes}<p class="mt-1 text-sm text-foreground/75">{m.notes}</p>{/if}
							</div>
							<VerdictButtons id={`move:${m.id}`} />
						</div>
					{/each}
				</div>
			{/each}
		</section>
	{/if}

	<section class="mt-16 border-t border-border pt-8">
		<h2 class="text-lg font-medium">Verdict report</h2>
		<pre class="mt-3 max-h-80 overflow-auto rounded-lg border border-border bg-card p-4 font-mono text-xs whitespace-pre-wrap">{verdicts.report() || 'Nothing rated yet.'}</pre>
	</section>
</main>
