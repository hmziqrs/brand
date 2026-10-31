<script lang="ts">
	import { cn } from '$brand/utils.js';

	let { size, current = false }: { size: 62 | 96 | 128 | 160; current?: boolean } = $props();

	const plan = {
		62: { column: '464px', lede: 16, lead: 1.0, track: -0.03, words: ['Claude Code,', 'any provider,', 'one command.'] },
		96: { column: '880px', lede: 20, lead: 0.94, track: -0.04, words: ['Claude Code,', 'any provider.'] },
		128: { column: '1100px', lede: 22, lead: 0.9, track: -0.05, words: ['Claude Code,', 'any provider.'] },
		160: { column: '1320px', lede: 24, lead: 0.86, track: -0.055, words: ['Claude Code,', 'any provider.'] }
	} as const;
	const p = $derived(plan[size]);
	const vw = $derived((size / 1320) * 100 * (size === 62 ? 1.5 : 1.08));
</script>

<div class="flex flex-col gap-6 p-6 @3xl:p-12">
	<div class="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[12px] text-foreground">
		<span class="ox-chip rounded-sm px-1.5 py-0.5">{size}px</span>
		<span>column {p.column}</span>
		<span>leading {p.lead}</span>
		<span>tracking {p.track}em</span>
		<span>lede {p.lede}px</span>
		{#if current}<span class="rounded-sm border px-1.5 py-0.5">current kit hero</span>{/if}
	</div>
	<div class="flex flex-col gap-6" style:max-width={p.column}>
		<h2
			class={cn('font-sans font-medium text-foreground', size === 62 && 'tracking-[-0.03em]')}
			style:font-size={`min(${size}px, ${vw}cqw)`}
			style:line-height={p.lead}
			style:letter-spacing={`${p.track}em`}
		>
			{#each p.words as w, i (i)}{w}{#if i < p.words.length - 1}<br />{/if}{/each}
		</h2>
		<p class={cn('leading-relaxed', current ? 'text-muted-foreground' : 'text-foreground')} style:font-size={`${p.lede}px`} style:max-width="46ch">
			One command points Claude Code at the provider you already pay for, and your settings stay yours.
		</p>
	</div>
</div>

<style>
	.ox-chip {
		background: var(--orange);
		color: var(--on-orange);
	}
</style>
