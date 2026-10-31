<script lang="ts" module>
	export type PosterLine = {
		text: string;
		face?: 'grotesk' | 'serif' | 'mono';
		tone?: 'fg' | 'oxide' | 'outline' | 'hatch';
		fit?: number;
		align?: 'left' | 'right' | 'center';
	};
</script>

<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Sq from './sq.svelte';

	let { lines, as = 'h1', class: className }: { lines: PosterLine[]; as?: 'h1' | 'h2' | 'div'; class?: string } = $props();

	const width = { grotesk: 0.6, serif: 0.43, mono: 0.6 };
	const fitOf = (l: PosterLine) => l.fit ?? l.text.length * width[l.face ?? 'grotesk'];
</script>

<svelte:element this={as} class={cn('poster @container m-0 w-full', className)}>
	{#each lines as line, i (i)}
		<span
			class="line"
			data-face={line.face ?? 'grotesk'}
			data-tone={line.tone ?? 'fg'}
			style:font-size="calc(100cqw / {fitOf(line)})"
			style:text-align={line.align ?? 'left'}
		>
			{#each line.text.split('■') as part, j (j)}{#if j > 0}<Sq size={0.62} gap={0.04} class="mr-[0.08em] align-[-0.02em]" tone={line.tone === 'oxide' ? 'ink' : 'oxide'} />{/if}{part}{/each}
		</span>
	{/each}
</svelte:element>

<style>
	.line {
		display: block;
		white-space: nowrap;
		color: var(--foreground);
	}
	.line[data-face='grotesk'] {
		font-family: var(--font-bricolage);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: -0.05em;
		line-height: 0.84;
		font-variation-settings: 'opsz' 96, 'wdth' 75;
	}
	.line[data-face='serif'] {
		font-family: var(--font-fraunces);
		font-style: italic;
		font-weight: 340;
		letter-spacing: -0.04em;
		line-height: 0.95;
		font-variation-settings: 'opsz' 144, 'SOFT' 100, 'WONK' 1;
	}
	.line[data-face='mono'] {
		font-family: var(--font-mono);
		text-transform: uppercase;
		letter-spacing: -0.02em;
		line-height: 1;
	}
	.line[data-tone='oxide'] {
		color: var(--mark-square);
	}
	.line[data-tone='hatch'] {
		color: transparent;
		background: repeating-linear-gradient(-45deg, var(--foreground) 0 0.022em, transparent 0.022em 0.06em);
		-webkit-background-clip: text;
		background-clip: text;
	}
	.line[data-tone='outline'] {
		color: transparent;
		-webkit-text-stroke: max(1.5px, 0.012em) var(--foreground);
	}
</style>
