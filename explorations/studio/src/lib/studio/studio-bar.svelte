<script lang="ts">
	import { page } from '$app/state';
	import LayoutGrid from '@lucide/svelte/icons/layout-grid';
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import Sun from '@lucide/svelte/icons/sun';
	import Moon from '@lucide/svelte/icons/moon';
	import Minus from '@lucide/svelte/icons/minus';
	import Plus from '@lucide/svelte/icons/plus';
	import { cn } from '$brand/utils.js';
	import { pages } from './manifest';
	import { prefs } from './prefs.svelte';
	import { verdicts } from './verdicts.svelte';
	import VerdictButtons from './verdict-buttons.svelte';

	const path = $derived(page.url.hash.replace(/^#/, '').split('?')[0] || page.url.pathname);
	const i = $derived(pages.findIndex((p) => p.path === path));
	const cur = $derived(pages[i]);
	const prev = $derived(pages[(i - 1 + pages.length) % pages.length]);
	const next = $derived(pages[(i + 1) % pages.length]);
	let open = $state(true);
</script>

<div
	class="studio-bar fixed bottom-3 left-1/2 z-[9999] max-w-[calc(100vw-16px)] -translate-x-1/2 rounded-xl border border-border bg-popover/95 px-2 py-1.5 text-popover-foreground shadow-2xl backdrop-blur"
	style="font-family: var(--font-sans); font-size: 12px;"
>
	<div class="flex items-center gap-1.5">
		<a href="#/" class="inline-flex size-7 items-center justify-center rounded-md hover:bg-muted" title="All variants" aria-label="All variants"><LayoutGrid class="lucide size-3.5" /></a>
		{#if open}
			<a href={prev?.href} class="inline-flex size-7 items-center justify-center rounded-md hover:bg-muted" title="Previous" aria-label="Previous"><ChevronLeft class="lucide size-3.5" /></a>
			<div class="hidden max-w-[38ch] truncate px-1 md:block" title={cur?.title}>
				<span class="text-muted-foreground">{i + 1}/{pages.length} · {cur?.group} ·</span>
				{cur?.title ?? path}
			</div>
			<a href={next?.href} class="inline-flex size-7 items-center justify-center rounded-md hover:bg-muted" title="Next" aria-label="Next"><ChevronRight class="lucide size-3.5" /></a>
			<span class="mx-1 hidden h-5 w-px bg-border sm:block"></span>
			<button type="button" class="inline-flex size-7 items-center justify-center rounded-md hover:bg-muted" onclick={() => prefs.toggleTheme()} aria-label="Toggle theme">
				{#if prefs.dark}<Sun class="lucide size-3.5" />{:else}<Moon class="lucide size-3.5" />{/if}
			</button>
			<div class="flex items-center rounded-md border border-border p-0.5" title="Light-mode oxide: A current, B vivid fill, C vivid + grey page">
				{#each ['a', 'b', 'c'] as const as o (o)}
					<button
						type="button"
						class={cn('h-6 w-6 rounded text-[11px] font-medium uppercase', prefs.oxide === o ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground')}
						onclick={() => prefs.setOxide(o)}>{o}</button
					>
				{/each}
			</div>
			<span class="mx-1 h-5 w-px bg-border"></span>
			<VerdictButtons id={path} />
			<input
				class="hidden h-7 w-40 rounded-md border sm:block border-border bg-transparent px-2 text-[12px] outline-none placeholder:text-muted-foreground focus:border-primary"
				placeholder="Note…"
				value={verdicts.notes[path] ?? ''}
				oninput={(e) => verdicts.note(path, e.currentTarget.value)}
			/>
		{/if}
		<button type="button" class="inline-flex size-7 items-center justify-center rounded-md hover:bg-muted" onclick={() => (open = !open)} aria-label={open ? 'Collapse' : 'Expand'}>
			{#if open}<Minus class="lucide size-3.5" />{:else}<Plus class="lucide size-3.5" />{/if}
		</button>
	</div>
</div>
