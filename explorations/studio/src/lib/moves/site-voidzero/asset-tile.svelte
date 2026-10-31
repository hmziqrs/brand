<script lang="ts">
	import type { Snippet } from 'svelte';
	import Download from '@lucide/svelte/icons/download';
	import Copy from '@lucide/svelte/icons/copy';
	import { toast } from 'svelte-sonner';
	import { cn } from '$brand/utils.js';

	let {
		name,
		file,
		svg,
		surface = 'page',
		class: className,
		children
	}: {
		name: string;
		file: string;
		svg: () => string;
		surface?: 'page' | 'ink' | 'paper' | 'oxide';
		class?: string;
		children: Snippet;
	} = $props();

	function download() {
		const url = URL.createObjectURL(new Blob([svg()], { type: 'image/svg+xml' }));
		const a = document.createElement('a');
		a.href = url;
		a.download = file;
		a.click();
		setTimeout(() => URL.revokeObjectURL(url), 1000);
	}

	async function copy() {
		try {
			await navigator.clipboard.writeText(svg());
			toast(`${name} SVG copied`);
		} catch {
			toast('Could not reach the clipboard here');
		}
	}

	const btn = 'inline-flex h-8 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50';
</script>

<figure class={cn('asset-tile group flex flex-col overflow-hidden rounded-xl border border-border bg-card', className)}>
	<div data-surface={surface} class={cn('surface relative grid min-h-48 flex-1 place-items-center p-8', surface === 'ink' && 'dark', surface === 'paper' && 'light')}>
		{@render children()}
	</div>
	<figcaption class="flex items-center justify-between gap-3 border-t border-border px-4 py-2.5">
		<span class="min-w-0 truncate text-sm"><span class="font-medium">{name}</span> <span class="font-mono text-xs text-muted-foreground">{file}</span></span>
		<span class="flex shrink-0 gap-1">
			<button type="button" onclick={copy} class={cn(btn, 'text-muted-foreground hover:bg-foreground/5 hover:text-foreground')}><Copy class="lucide size-3.5" />Copy</button>
			<button type="button" onclick={download} class={cn(btn, 'bg-foreground/[0.07] hover:bg-foreground/[0.12]')}><Download class="lucide size-3.5" />SVG</button>
		</span>
	</figcaption>
</figure>

<style>
	.surface[data-surface='page'] {
		background: var(--background);
		color: var(--foreground);
	}
	.surface[data-surface='ink'],
	.surface[data-surface='paper'] {
		background: var(--background);
		color: var(--foreground);
	}
	.surface[data-surface='oxide'] {
		background: var(--oxide-vivid);
		color: color-mix(in oklab, black 86%, var(--oxide-deep));
	}
</style>
