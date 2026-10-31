<script lang="ts">
	import { cn } from '$brand/utils.js';

	let {
		tone = 'oxide',
		stack = 1,
		spin = false,
		class: className
	}: { tone?: 'oxide' | 'ink' | 'steel'; stack?: number; spin?: boolean; class?: string } = $props();

	const h = $derived(30 + (stack - 1) * 20);
</script>

<svg
	viewBox="0 0 52 {h + 26}"
	class={cn('iso-glyph inline-block h-[0.86em] w-auto align-[-0.06em]', `g-${tone}`, spin && 'spin motion-reduce:animate-none', className)}
	aria-hidden="true"
>
	{#each Array.from({ length: stack }, (_, n) => stack - 1 - n) as n (n)}
		<g transform="translate(0 {n * 20})">
			<polygon class="t" points="26,0 52,13 26,26 0,13" />
			<polygon class="l" points="0,13 26,26 26,48 0,35" />
			<polygon class="r" points="26,26 52,13 52,35 26,48" />
		</g>
	{/each}
</svg>

<style>
	.iso-glyph polygon {
		stroke: var(--background);
		stroke-width: 1.2;
		stroke-linejoin: round;
	}
	.g-oxide .t { fill: var(--oxide-vivid); }
	.g-oxide .l { fill: color-mix(in oklab, var(--oxide-vivid) 62%, var(--oxide-deep)); }
	.g-oxide .r { fill: color-mix(in oklab, var(--oxide-deep) 80%, var(--background)); }
	.g-ink .t { fill: var(--foreground); }
	.g-ink .l { fill: color-mix(in oklab, var(--foreground) 68%, var(--background)); }
	.g-ink .r { fill: color-mix(in oklab, var(--foreground) 42%, var(--background)); }
	.g-steel .t { fill: color-mix(in oklab, var(--foreground) 30%, var(--background)); }
	.g-steel .l { fill: color-mix(in oklab, var(--foreground) 18%, var(--background)); }
	.g-steel .r { fill: color-mix(in oklab, var(--foreground) 10%, var(--background)); }
	.spin {
		animation: bob 3.2s ease-in-out infinite;
	}
	@keyframes bob {
		50% {
			transform: translateY(-0.06em);
		}
	}
</style>
