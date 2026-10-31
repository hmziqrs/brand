<script lang="ts">
	import { cn } from '$brand/utils.js';
	import type { Snippet } from 'svelte';

	let {
		glow = true,
		flicker = true,
		bezel = true,
		class: className,
		children
	}: { glow?: boolean; flicker?: boolean; bezel?: boolean; class?: string; children: Snippet } = $props();
</script>

<div
	data-slot="crt-panel"
	class={cn(
		'crt dark relative isolate overflow-hidden bg-background text-foreground',
		bezel && 'rounded-[22px] border p-1.5 shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--foreground)_6%,transparent)]',
		className
	)}
>
	<div class={cn('crt-screen relative h-full overflow-hidden', bezel && 'rounded-[16px] border', glow && 'crt-glow', flicker && 'crt-flicker motion-reduce:animate-none')}>
		{@render children()}
		<span class="crt-lines pointer-events-none absolute inset-0 z-10" aria-hidden="true"></span>
		<span class="crt-vignette pointer-events-none absolute inset-0 z-10" aria-hidden="true"></span>
	</div>
</div>

<style>
	.crt-screen {
		background:
			radial-gradient(120% 90% at 50% 40%, color-mix(in oklab, var(--orange) 9%, transparent), transparent 70%),
			var(--background);
	}
	.crt-glow :global(:where(p, h1, h2, h3, span, li, div)) {
		text-shadow: 0 0 14px color-mix(in oklab, var(--orange) 28%, transparent);
	}
	.crt .crt-screen.crt-screen :global(:is(.text-orange, .text-primary)) {
		color: var(--orange);
	}
	.crt-lines {
		background: repeating-linear-gradient(
			to bottom,
			color-mix(in oklab, var(--foreground) 5%, transparent) 0 1px,
			transparent 1px 3px
		);
		mix-blend-mode: overlay;
	}
	.crt-vignette {
		background: radial-gradient(130% 100% at 50% 50%, transparent 60%, color-mix(in oklab, var(--background) 85%, transparent) 100%);
	}
	.crt-flicker {
		animation: flick 6s steps(1) infinite;
	}
	@keyframes flick {
		0%, 100% { opacity: 1; }
		47% { opacity: 0.94; }
		48% { opacity: 1; }
		82% { opacity: 0.97; }
	}
</style>
