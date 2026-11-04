<script lang="ts">
	import { cn } from '$brand/utils.js';
	import IconTile from '$brand/components/icon-tile.svelte';
	import CornerRings from '$brand/components/corner-rings.svelte';
	import SectionHead from '$brand/blocks/sections/section-head.svelte';
	import { about } from './content';

	let { class: className }: { class?: string } = $props();
	const p = about.principles;
</script>

<section data-slot="principle-cards" class={className}>
	<SectionHead kicker={p.kicker} title={p.title} layout="stack" />
	<ol class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each p.items as item, i (item.n)}
			<li class={cn('relative isolate flex min-h-[14rem] min-w-0 sm:min-h-[17rem] flex-col overflow-hidden rounded-2xl p-6 sm:p-7', i === 0 ? 'band-orange' : 'ring-1 ring-foreground/10')}>
				{#if i === 0}<CornerRings seed="oxlabs production as default" color="var(--on-orange)" class="-z-10 w-1/2 opacity-60 [&_circle]:[stroke-width:0.5]" />{/if}
				<span class="flex items-center justify-between gap-3">
					<IconTile class="size-11 rounded-lg"><item.icon class="lucide size-5" /></IconTile>
					<span class="font-mono text-xs tracking-[0.14em] text-foreground/75">{item.n}</span>
				</span>
				<h3 class="mt-auto pt-10 text-[1.5rem] leading-tight font-medium tracking-[-0.025em] text-foreground">{item.title}</h3>
				<p class="mt-3 text-[1rem] leading-snug text-foreground/85">{item.body}</p>
			</li>
		{/each}
	</ol>
</section>
