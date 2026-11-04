<script lang="ts">
	import { cn } from '$brand/utils.js';
	import KindTag from '$brand/blocks/content/kind-tag.svelte';
	import { dateLabel, toneOf } from './parts';
	import type { Release } from './releases';

	let { release, level = 3, class: className }: { release: Release; level?: 2 | 3; class?: string } = $props();
</script>

<div data-slot="release-head" class={cn('flex flex-wrap items-baseline gap-x-4 gap-y-2', className)}>
	<svelte:element this={level === 2 ? 'h2' : 'h3'} class="font-mono text-lg leading-[1.4] font-semibold text-foreground">v{release.v}</svelte:element>
	<p class="text-[0.8125rem] text-muted-foreground"><time datetime={release.date.replace(/-X+$/, '')}>{dateLabel(release.date)}</time></p>
	<span class="inline-flex flex-wrap gap-1.5">
		{#each release.groups as [kind, items] (kind)}
			<KindTag {kind} count={items.length} tone={toneOf(kind)} />
		{/each}
	</span>
</div>
