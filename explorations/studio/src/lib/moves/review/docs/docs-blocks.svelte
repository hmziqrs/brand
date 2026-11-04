<script lang="ts">
	import { createRawSnippet } from 'svelte';
	import CodeBlock from '$brand/components/code-block.svelte';
	import DataTable from '$brand/components/data-table.svelte';
	import Notice from '$brand/components/notice.svelte';
	import Marker from '$brand/components/marker.svelte';
	import Bullets from '$brand/blocks/site/bullets.svelte';
	import InstallBlock from '$brand/blocks/content/install-block.svelte';
	import Self from './docs-blocks.svelte';
	import type { Block, Item, Tone } from './content';

	let { blocks, prefix, html, codeClass }: { blocks: Block[]; prefix: string; html: (s: string) => string; codeClass?: string } = $props();

	const raw = (s: string) => createRawSnippet(() => ({ render: () => `<span>${html(s)}</span>` }));
	const tones: Record<Tone, 'info' | 'success' | 'warning' | 'destructive'> = { note: 'info', tip: 'success', caution: 'warning', danger: 'destructive' };
	const simple = (items: Item[]) => items.every((i) => i.html && !i.sub && !i.blocks);
</script>

{#snippet list(items: Item[], ordered: boolean)}
	{#if !ordered && simple(items)}
		<Bullets items={items.map((i) => raw(i.html ?? ''))} />
	{:else}
		<svelte:element this={ordered ? 'ol' : 'ul'} class="flex flex-col gap-2.5">
			{#each items as it, i (i)}
				<li class={ordered ? 'grid grid-cols-[1.75rem_minmax(0,1fr)] items-baseline gap-2' : 'grid grid-cols-[0.5rem_minmax(0,1fr)] items-baseline gap-3'}>
					{#if ordered}
						<span class="text-xs font-medium text-primary tabular-nums">{String(i + 1).padStart(2, '0')}</span>
					{:else}
						<Marker class="-translate-y-[0.1em] text-primary" />
					{/if}
					<div class="flex min-w-0 flex-col gap-3">
						{#if it.html}<span>{@html html(it.html)}</span>{/if}
						{#if it.blocks}<Self blocks={it.blocks} {prefix} {html} />{/if}
						{#if it.sub}{@render list(it.sub, false)}{/if}
					</div>
				</li>
			{/each}
		</svelte:element>
	{/if}
{/snippet}

{#each blocks as b, i (i)}
	{#if b.kind === 'p'}
		<p>{@html html(b.html)}</p>
	{:else if b.kind === 'h2'}
		<h2 id={`${prefix}-${b.id}`} style="scroll-margin-top: var(--docs-top, 1rem)">{b.text}</h2>
	{:else if b.kind === 'h3' || b.kind === 'h4'}
		<h3 id={`${prefix}-${b.id}`} style="scroll-margin-top: var(--docs-top, 1rem)" class="mt-3 text-[1.0625rem] font-medium tracking-[-0.01em]">{b.text}</h3>
	{:else if b.kind === 'code'}
		<div class={codeClass}>
			{#if b.files.length > 1}
				<CodeBlock files={b.files} />
			{:else}
				<CodeBlock code={b.files[0].code} lang={b.files[0].lang} label={b.files[0].label || undefined} />
			{/if}
		</div>
	{:else if b.kind === 'list'}
		{@render list(b.items, b.ordered)}
	{:else if b.kind === 'table'}
		<div class="-mx-1 overflow-x-auto px-1">
			<DataTable variant="lines" columns={b.head.map((h) => (h.includes('<') ? raw(h) : h))} rows={b.rows.map((r) => r.map(raw))} />
		</div>
	{:else if b.kind === 'aside'}
		<Notice tone={tones[b.tone]} title={b.title} data-mine={b.mine ? '' : undefined}>
			{#snippet children()}<div class="flex flex-col gap-3 text-foreground/85"><Self blocks={b.blocks} {prefix} {html} /></div>{/snippet}
		</Notice>
	{:else if b.kind === 'install'}
		<InstallBlock commands={b.commands} items={b.items} />
	{:else if b.kind === 'quote'}
		<blockquote class="border-l-2 border-primary pl-4">{@html html(b.html)}</blockquote>
	{:else if b.kind === 'hr'}
		<hr class="my-2 border-border" />
	{/if}
{/each}
