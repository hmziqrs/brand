<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Copy from '@lucide/svelte/icons/copy';
	import Check from '@lucide/svelte/icons/check';

	let { url = 'https://mcp.kiln.site/mcp', class: className }: { url?: string; class?: string } = $props();

	const tools = ['Claude Code', 'Cursor', 'Codex'];
	const script = [
		{ t: '› connect kiln over MCP', k: 'cmd' },
		{ t: '└ project “marrow” connected', k: 'ok' },
		{ t: '› read the Journal collection', k: 'cmd' },
		{ t: '└ 6 fields · slug, title, cover, author, date, body', k: 'ok' },
		{ t: '› import 47 posts from the old blog', k: 'cmd' },
		{ t: '└ 47 fetched · 47 mapped · 0 skipped', k: 'ok' },
		{ t: '└ covers resized, authors linked', k: 'ok' },
		{ t: '✓ review the changes on the canvas, then publish', k: 'done' }
	];

	let tool = $state(0);
	let shown = $state(0);
	let copied = $state(false);

	$effect(() => {
		void tool;
		shown = 0;
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
			shown = script.length;
			return;
		}
		const id = setInterval(() => (shown = shown >= script.length + 4 ? 0 : shown + 1), 700);
		return () => clearInterval(id);
	});
</script>

<div class={cn('dark flex flex-col overflow-hidden rounded-[18px] border border-border bg-background font-mono text-[0.8125rem] text-foreground', className)}>
	<div class="flex items-center gap-1.5 border-b border-border px-4 py-3">
		<span class="size-2.5 rounded-full bg-red"></span><span class="size-2.5 rounded-full bg-yellow"></span><span class="size-2.5 rounded-full bg-green"></span>
		<span class="mx-auto pr-10 text-xs text-foreground/60">kiln-agent</span>
	</div>
	<div class="flex gap-1 border-b border-border p-2" role="tablist">
		{#each tools as t, i (t)}
			<button type="button" role="tab" aria-selected={tool === i} onclick={() => (tool = i)} class="flex-1 rounded-md px-2 py-1.5 text-xs transition-colors" class:bg-primary={tool === i} class:text-primary-foreground={tool === i}>{t}</button>
		{/each}
	</div>
	<div class="min-h-[260px] flex-1 space-y-1.5 p-4">
		<div class="mb-3 rounded-md border border-primary/60 px-3 py-2 text-xs text-primary">{tools[tool]} · team workspace</div>
		{#each script.slice(0, shown) as l (l.t)}
			<p class={l.k === 'cmd' ? 'text-foreground' : l.k === 'done' ? 'text-primary' : 'pl-3 text-foreground/60'}>{l.t}</p>
		{/each}
		{#if shown < script.length}<span class="inline-block h-4 w-2 bg-primary motion-safe:animate-pulse"></span>{/if}
	</div>
	<div class="flex gap-2 border-t border-border p-3">
		<span class="min-w-0 flex-1 truncate rounded-md bg-muted px-3 py-2 text-xs">{url}</span>
		<button
			type="button"
			onclick={async () => {
				try {
					await navigator.clipboard.writeText(url);
				} catch {}
				copied = true;
				setTimeout(() => (copied = false), 1400);
			}}
			class="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-2 font-sans text-xs font-medium text-background"
		>
			{#if copied}<Check class="lucide size-3.5" />Copied{:else}<Copy class="lucide size-3.5" />Connect{/if}
		</button>
	</div>
</div>
