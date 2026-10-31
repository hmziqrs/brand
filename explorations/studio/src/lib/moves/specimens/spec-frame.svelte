<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$brand/utils.js';
	import { prefs } from '$studio/prefs.svelte';
	import VerdictButtons from '$studio/verdict-buttons.svelte';

	type Mode = 'dark' | 'light';

	let {
		id,
		name,
		note,
		index,
		tag,
		panes = ['dark', 'light'],
		layout = 'split',
		paneClass,
		labels,
		children
	}: {
		id: string;
		name: string;
		note?: string;
		index?: number;
		tag?: string;
		panes?: Mode[];
		layout?: 'split' | 'stack';
		paneClass?: string;
		labels?: Partial<Record<Mode, string>>;
		children: Snippet<[Mode]>;
	} = $props();

	const anchor = $derived(id.replace(/[^a-z0-9]+/gi, '-'));
</script>

<article id={anchor} class="spec-frame flex scroll-mt-6 flex-col gap-4" data-move={id}>
	<header class="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
		<div class="flex min-w-0 flex-col gap-2">
			<div class="flex flex-wrap items-center gap-2">
				{#if index !== undefined}<span class="font-mono text-xs tabular-nums text-foreground">{String(index).padStart(2, '0')}</span>{/if}
				<code class="spec-id rounded-md border px-2 py-0.5 font-mono text-[12px] text-foreground">{id}</code>
				{#if tag}<span class="spec-tag rounded-md px-2 py-0.5 font-mono text-[11px] font-medium tracking-wide uppercase">{tag}</span>{/if}
			</div>
			<h3 class="text-2xl font-medium tracking-[-0.02em] text-foreground">{name}</h3>
			{#if note}<p class="max-w-[68ch] text-[15px] leading-relaxed text-foreground/85">{note}</p>{/if}
		</div>
		<VerdictButtons id={`move:${id}`} size="md" />
	</header>
	<div class={cn('grid gap-3', layout === 'split' && panes.length > 1 && 'lg:grid-cols-2')}>
		{#each panes as mode (mode)}
			<div class="flex min-w-0 flex-col gap-1.5">
				<span class="font-mono text-[11px] tracking-wide text-foreground/75 uppercase">
					{labels?.[mode] ?? `${mode}${mode === 'light' ? ` · oxide ${prefs.oxide}` : ''}`}
				</span>
				<div class={cn('spec-pane @container relative isolate overflow-hidden rounded-xl border', mode, paneClass)} data-ox={mode === 'light' ? prefs.oxide : undefined}>
					{@render children(mode)}
				</div>
			</div>
		{/each}
	</div>
</article>

<style>
	.spec-tag {
		background: var(--orange);
		color: var(--on-orange);
	}
	:global(.spec-pane) {
		--ox-text: var(--orange);
	}
	:global(.spec-pane.light[data-ox='b']),
	:global(.spec-pane.light[data-ox='c']) {
		--orange: var(--oxide-vivid);
		--on-orange: var(--foreground);
		--primary-foreground: var(--foreground);
		--ox-text: var(--oxide-ink);
	}
	:global(.spec-pane.light[data-ox='c']) {
		--background: color-mix(in oklab, var(--card) 96.8%, var(--foreground));
		--band: color-mix(in oklab, var(--card) 93.5%, var(--foreground));
		--muted-foreground: color-mix(in oklab, var(--foreground) 68%, var(--card));
	}
	:global(.spec-pane.light[data-ox='b'] :is(.text-primary, .text-orange)),
	:global(.spec-pane.light[data-ox='c'] :is(.text-primary, .text-orange)) {
		color: var(--oxide-ink);
	}
	:global(html .spec-pane.dark.dark .text-primary) {
		color: var(--primary);
	}
	:global(html .spec-pane.dark.dark .text-orange) {
		color: var(--orange);
	}
</style>
