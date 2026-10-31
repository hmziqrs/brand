<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$brand/utils.js';
	import type { Hue } from './family';

	let {
		hue = 'orange',
		tweak,
		class: className,
		children,
		...rest
	}: { hue?: Hue; tweak?: string; class?: string; children: Snippet } & Record<string, unknown> = $props();

	const hues: Hue[] = ['orange', 'red', 'yellow', 'green', 'teal', 'blue', 'purple', 'pink'];
	let picked = $state<Hue | null>(null);
	let open = $state(false);
	const key = $derived(`studio-product-hue:${tweak}`);
	const live = $derived(picked ?? hue);

	$effect(() => {
		if (!tweak) return;
		try {
			const v = localStorage.getItem(key) as Hue | null;
			if (v && hues.includes(v)) picked = v;
		} catch {}
	});

	function pick(h: Hue) {
		picked = h === hue ? null : h;
		try {
			if (picked) localStorage.setItem(key, picked);
			else localStorage.removeItem(key);
		} catch {}
	}
</script>

<div data-product-scope={live} class={cn('product-scope bg-background text-foreground', className)} style:--pa={`var(--${live})`} {...rest}>
	{@render children()}
	{#if tweak}
		<div class="fixed right-3 bottom-16 z-[9998] flex items-center gap-1 rounded-full border border-border bg-popover/95 p-1 text-popover-foreground shadow-xl backdrop-blur">
			{#if open}
				{#each hues as h (h)}
					<button
						type="button"
						aria-label={`Product hue ${h}${h === hue ? ' (default)' : ''}`}
						aria-pressed={live === h}
						onclick={() => pick(h)}
						class="grid size-7 place-items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-foreground aria-pressed:ring-1 aria-pressed:ring-foreground"
					>
						<span class="size-4 rounded-full" style:background={`var(--${h})`}></span>
					</button>
				{/each}
			{/if}
			<button
				type="button"
				aria-expanded={open}
				aria-label={open ? 'Close product hue' : 'Change product hue'}
				onclick={() => (open = !open)}
				class="flex h-7 items-center gap-2 rounded-full px-2.5 font-mono text-[0.6875rem] tracking-wide uppercase outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-foreground"
			>
				{#if !open}<span class="size-3.5 rounded-full" style:background="var(--pa)"></span>{/if}
				{open ? 'Done' : 'Hue'}
			</button>
		</div>
	{/if}
</div>

<style>
	.product-scope {
		--pa-fill: var(--pa);
		--pa-ink: var(--pa);
		--on-pa: var(--background);
		--primary: var(--pa-fill);
		--primary-foreground: var(--on-pa);
		--ring: var(--pa);
		--chart-1: var(--pa);
		--sidebar-primary: var(--pa-fill);
		--sidebar-primary-foreground: var(--on-pa);
		--sidebar-ring: var(--pa);
		--code-token-keyword: var(--pa-ink);
		--pa-soft: color-mix(in oklab, var(--pa) 14%, var(--background));
		--pa-line: color-mix(in oklab, var(--pa) 38%, transparent);
		overflow-x: clip;
	}
	:global(:root[data-oxide='b']:not(.dark)) .product-scope,
	:global(:root[data-oxide='c']:not(.dark)) .product-scope {
		--pa-fill: oklch(from var(--pa) 0.76 calc(c * 1.12) h);
		--pa-ink: oklch(from var(--pa) 0.52 c h);
		--on-pa: var(--foreground);
	}
	:global(:root:not(.dark)) .product-scope :global(.text-primary) {
		color: var(--pa-ink);
	}
</style>
