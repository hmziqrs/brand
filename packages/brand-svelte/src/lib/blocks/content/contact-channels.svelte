<!--
  The ways to reach someone (the lab's contact page), one row per channel:
  an icon tile, the name, one line on what it is for, and "Open" with an
  arrow. An email channel opens the reader's mail app (its href is a
  mailto:) and its address never appears in the page's text — the note
  says what the channel is, not where it points. As cards, each channel is
  its own card in a grid, the one to use first in solid oxide.
-->
<script lang="ts">
	import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right";
	import { cn } from "$brand/utils.js";
	import IconTile from "$brand/components/icon-tile.svelte";
	import Marker from "$brand/components/marker.svelte";
	import BrandIcon from "$brand/components/brand-icon.svelte";
	import type { Channel } from "./types.js";

	let {
		channels,
		/** The words under the list, with an orange ring before them. */
		note,
		/** list is one ruled row per channel; cards is a separate card for each. */
		variant = "list",
		/** The columns of the cards from lg up. */
		cols = 2,
		class: className,
	}: { channels: Channel[]; note?: string; variant?: "list" | "cards"; cols?: 2 | 4; class?: string } = $props();

	const external = (href: string) => !href.startsWith("mailto:");
</script>

<div data-slot="contact-channels" class={className}>
	{#if variant === "cards"}
		<ul class={cn("grid gap-4 sm:grid-cols-2", cols === 4 && "lg:grid-cols-4")}>
			{#each channels as c (c.name)}
				<li class="min-w-0">
					<a
						href={c.href}
						target={external(c.href) ? "_blank" : undefined}
						rel={external(c.href) ? "noreferrer" : undefined}
						class={cn(
							"group/channel relative isolate flex h-full min-h-[11rem] flex-col gap-2 overflow-hidden rounded-2xl p-6 no-underline outline-none focus-visible:ring-3 focus-visible:ring-ring/60 sm:min-h-[13.5rem]",
							c.oxide ? "band-orange" : "ring-1 ring-foreground/10 transition-shadow hover:ring-primary/50 motion-reduce:transition-none",
						)}
					>
						<span class="mb-auto flex items-start justify-between gap-3 pb-6 sm:pb-8">
							<IconTile class="size-11 rounded-lg">
								{#if c.icon}
									{#if typeof c.icon === "object"}<BrandIcon icon={c.icon} class="size-4.5" />{:else}<c.icon class="lucide size-5" />{/if}
								{/if}
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
	{:else}
	<ul class="border-t">
		{#each channels as channel (channel.name)}
			<li>
				<a
					href={channel.href}
					class="grid grid-cols-[2.5rem_minmax(0,1fr)_auto] grid-rows-[auto_auto] items-center gap-x-3.5 border-b px-1 py-4 no-underline outline-none transition-colors hover:bg-foreground/4 focus-visible:ring-3 focus-visible:ring-ring/50"
				>
					<span class="row-span-2 grid size-10 place-items-center rounded-[22%] border">
						{#if channel.icon}
							{#if typeof channel.icon === "object"}
								<BrandIcon icon={channel.icon} class="size-4" />
							{:else}
								<channel.icon class="lucide size-4" />
							{/if}
						{/if}
					</span>
					<b class="font-medium">{channel.name}</b>
					<span class="row-span-2 inline-flex items-center gap-1.5 text-[0.8125rem] text-muted-foreground">
						Open
						<ArrowUpRight class="lucide size-3.5" />
					</span>
					<span class="col-start-2 text-[0.8125rem] text-muted-foreground">{channel.note}</span>
				</a>
			</li>
		{/each}
	</ul>
	{#if note}
		<p class="mt-4 flex items-center gap-2 text-[0.8125rem] text-muted-foreground">
			<Marker class="text-primary" />
			{note}
		</p>
	{/if}
	{/if}
</div>
