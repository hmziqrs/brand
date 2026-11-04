<script lang="ts">
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import ChevronUp from '@lucide/svelte/icons/chevron-up';
	import KindTag from '$brand/blocks/content/kind-tag.svelte';
	import { cn } from '$brand/utils.js';
	import RichText from './rich-text.svelte';
	import { changeCount, itemText, spotFor, summary, toneOf, type Spots } from './parts';
	import type { Release } from './releases';

	let {
		release,
		full,
		spots,
		spot = $bindable(null),
		fold = false,
		open = $bindable(),
		class: className
	}: {
		release: Release;
		full?: Release;
		spots?: Spots;
		spot?: string | null;
		fold?: boolean;
		open?: boolean;
		class?: string;
	} = $props();

	const dots = 'absolute top-[0.6em] left-0 size-1.5 rounded-full border transition-colors motion-reduce:transition-none';
	const count = $derived(changeCount(release));
	const shown = $derived(!fold || open);
</script>

<div data-slot="release-notes" data-variant={fold ? 'summary' : 'grouped'} class={cn(fold ? 'mt-3' : 'mt-4 flex flex-col gap-4', className)}>
	{#if shown}
		{#each release.groups as [kind, items] (kind)}
			<div class={cn('grid items-start gap-x-4 gap-y-2 md:grid-cols-[6rem_minmax(0,1fr)]', fold && 'mt-4')}>
				<span class="pt-0.5"><KindTag {kind} tone={toneOf(kind)} /></span>
				<ul class="flex max-w-[46rem] min-w-0 flex-col gap-2">
					{#each items as item, i (i)}
						{@const at = spotFor(spots, full ?? release, kind, item)}
						<li
							data-spot={at ?? undefined}
							class={cn('relative pl-4 text-[0.9rem] leading-relaxed [overflow-wrap:anywhere]', at && 'cursor-default')}
							onpointerenter={at ? () => (spot = at) : undefined}
							onpointerleave={at ? () => (spot = null) : undefined}
						>
							<i aria-hidden="true" class={cn(dots, at && spot === at ? 'border-primary bg-primary' : 'border-muted-foreground')}></i>
							<RichText text={itemText(item)} />
							{#if typeof item !== 'string'}
								<ul class="mt-1.5 flex flex-col gap-1 border-l border-border pl-3 text-[0.8125rem] leading-relaxed text-foreground/85">
									{#each item.sub as s, k (k)}<li><RichText text={s} /></li>{/each}
								</ul>
							{/if}
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	{:else}
		<p class="max-w-[46rem] text-[0.9rem] leading-relaxed text-foreground/80 [overflow-wrap:anywhere]">{summary(release)}</p>
	{/if}
	{#if fold}
		<button
			type="button"
			aria-expanded={!!open}
			onclick={() => (open = !open)}
			class="mt-3.5 inline-flex items-center gap-1.5 rounded-full border py-1.5 pr-3 pl-2 text-[0.8125rem] font-medium transition-colors outline-none hover:border-primary/55 focus-visible:ring-3 focus-visible:ring-ring/50 motion-reduce:transition-none"
		>
			{#if open}<ChevronUp class="lucide size-3.5" />{:else}<ChevronDown class="lucide size-3.5" />{/if}
			{open ? 'Hide the changes' : `Show all ${count} change${count === 1 ? '' : 's'}`}
		</button>
	{/if}
</div>
