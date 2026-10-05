<!--
  The ways to reach someone (the lab's contact page), one row per channel:
  an icon tile, the name, one line on what it is for, and "Open" with an
  arrow. An email channel opens the reader's mail app (its href is a
  mailto:) and its address never appears in the page's text — the note
  says what the channel is, not where it points.
-->
<script lang="ts">
	import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right";
	import Marker from "$brand/components/marker.svelte";
	import BrandIcon from "$brand/components/brand-icon.svelte";
	import type { Channel } from "./types.js";

	let {
		channels,
		/** The words under the list, with an orange ring before them. */
		note,
		class: className,
	}: { channels: Channel[]; note?: string; class?: string } = $props();
</script>

<div class={className}>
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
</div>
