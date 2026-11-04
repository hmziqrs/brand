<script lang="ts">
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import { cn } from '$brand/utils.js';
	import BrandIcon from '$brand/components/brand-icon.svelte';
	import IconTile from '$brand/components/icon-tile.svelte';
	import Marker from '$brand/components/marker.svelte';
	import { channels, type Channel } from './content';

	let { list = channels, note, cols = 2, class: className }: { list?: Channel[]; note?: string; cols?: 2 | 4; class?: string } = $props();

	const external = (href: string) => !href.startsWith('mailto:');
</script>

<div data-slot="channel-cards" class={className}>
	<ul class={cn('grid gap-4 sm:grid-cols-2', cols === 4 && 'lg:grid-cols-4')}>
		{#each list as c (c.name)}
			<li class="min-w-0">
				<a
					href={c.href}
					target={external(c.href) ? '_blank' : undefined}
					rel={external(c.href) ? 'noreferrer' : undefined}
					class={cn(
						'group/channel relative isolate flex h-full min-h-[11rem] flex-col sm:min-h-[13.5rem] gap-2 overflow-hidden rounded-2xl p-6 no-underline outline-none focus-visible:ring-3 focus-visible:ring-ring/60',
						c.oxide ? 'band-orange' : 'ring-1 ring-foreground/10 transition-shadow hover:ring-primary/50 motion-reduce:transition-none'
					)}
				>
					<span class="mb-auto flex items-start justify-between gap-3 pb-6 sm:pb-8">
						<IconTile class="size-11 rounded-lg">
							{#if 'path' in c.icon}<BrandIcon icon={c.icon} class="size-4.5" />{:else}<c.icon class="lucide size-5" />{/if}
						</IconTile>
						<span class="inline-flex items-center gap-1 font-mono text-xs tracking-[0.08em] text-foreground/75 group-hover/channel:text-foreground">open <ArrowUpRight class="lucide size-3.5" /></span>
					</span>
					<span class="text-[1.375rem] leading-tight font-medium tracking-[-0.02em] text-foreground group-hover/channel:underline group-hover/channel:underline-offset-4">{c.name}</span>
					<span class="text-[1rem] leading-snug text-foreground/85">{c.note}</span>
					{#if c.handle}<span class="truncate font-mono text-[0.8125rem] text-foreground">{c.handle}</span>{/if}
				</a>
			</li>
		{/each}
	</ul>
	{#if note}
		<p class="mt-5 flex items-center gap-2 text-sm text-foreground/80"><Marker class="text-primary" />{note}</p>
	{/if}
</div>
