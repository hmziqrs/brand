<script lang="ts">
	import { cn } from '$brand/utils.js';
	import Marker from '$brand/components/marker.svelte';
	import CodeBlock from '$brand/components/code-block.svelte';
	import RichText from './rich-text.svelte';
	import type { RichBlock } from './rich';

	let { blocks, class: className }: { blocks: readonly RichBlock[]; class?: string } = $props();
</script>

<div data-slot="rich-blocks" class={cn('flex flex-col gap-4 text-[1rem] leading-[1.7] text-foreground/85', className)}>
	{#each blocks as b, i (i)}
		{#if b[0] === 'h'}
			<h4 class="mt-3 text-[1.0625rem] font-medium tracking-[-0.01em] text-foreground">{b[1]}</h4>
		{:else if b[0] === 'ul'}
			<ul class="flex flex-col gap-2.5">
				{#each b[1] as t, j (j)}
					<li class="grid grid-cols-[0.5rem_minmax(0,1fr)] items-baseline gap-3"><Marker class="-translate-y-[0.1em] text-primary" /><span><RichText text={t} /></span></li>
				{/each}
			</ul>
		{:else if b[0] === 'ol'}
			<ol class="flex list-none flex-col gap-2.5">
				{#each b[1] as t, j (j)}
					<li class="grid grid-cols-[1.75rem_minmax(0,1fr)] items-baseline"><span class="font-mono text-xs text-primary tabular-nums">{String(j + 1).padStart(2, '0')}</span><span><RichText text={t} /></span></li>
				{/each}
			</ol>
		{:else if b[0] === 'code'}
			<CodeBlock code={b[2]} lang={b[1]} class="my-1" />
		{:else if b[0] === 'caps'}
			<div class="rounded-xl px-5 py-4 ring-1 ring-primary/45">
				<p class="font-mono text-[11px] tracking-[0.14em] text-primary uppercase">{b[1]}</p>
				<p class="mt-2 text-[0.8125rem] leading-[1.7] tracking-[0.02em] text-foreground/85">{b[2]}</p>
			</div>
		{:else if b[0] === 'defs'}
			<dl class="grid gap-3 sm:grid-cols-2">
				{#each b[1] as [term, text, href] (term)}
					<div class="grid gap-0.5 border-l border-border pl-4.5">
						<dt class="font-medium text-foreground">{#if href}<a {href} target="_blank" rel="noreferrer" class="hover:text-primary hover:underline">{term}</a>{:else}{term}{/if}</dt>
						<dd class="text-foreground/80"><RichText {text} /></dd>
					</div>
				{/each}
			</dl>
		{:else if b[0] === 'p'}
			<p><RichText text={b[1]} /></p>
		{/if}
	{/each}
</div>
