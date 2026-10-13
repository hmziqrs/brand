<!-- What happened while you were away, newest first and grouped by day: unread ones marked with an
     orange ring and their words in full color, with "Mark all as read". -->
<script lang="ts" module>
	import type { Component } from "svelte";

	export type Notice = { id: string; title: string; body?: string; at: string; day: string; unread?: boolean; icon?: Component; href?: string };
</script>

<script lang="ts">
	import { cn } from "$brand/utils.js";
	import { Button } from "$brand/ui/button/index.js";
	import Marker from "./marker.svelte";

	let {
		items,
		label = "Notifications",
		onread,
		class: className,
	}: {
		items: Notice[];
		label?: string;
		/** Called with the ids marked as read. */
		onread?: (ids: string[]) => void;
		class?: string;
	} = $props();

	const days = $derived([...new Set(items.map((i) => i.day))]);
	const unread = $derived(items.filter((i) => i.unread));
</script>

<section data-slot="notification-list" aria-label={label} class={cn("flex flex-col overflow-hidden rounded-xl ring-1 ring-foreground/10", className)}>
	<header class="flex items-center justify-between gap-3 border-b px-4 py-3">
		<h2 class="text-sm font-medium">{label}{#if unread.length}<span class="ml-2 text-muted-foreground tabular-nums">{unread.length} new</span>{/if}</h2>
		<Button variant="ghost" size="sm" disabled={!unread.length} onclick={() => onread?.(unread.map((i) => i.id))}>Mark all as read</Button>
	</header>
	{#each days as day (day)}
		<h3 class="px-4 pt-3 pb-1 text-xs font-medium text-muted-foreground">{day}</h3>
		<ul class="flex flex-col pb-2">
			{#each items.filter((i) => i.day === day) as n (n.id)}
				<li>
					<a href={n.href ?? "#"} class="group flex gap-3 px-4 py-2.5 transition-colors outline-none hover:bg-foreground/5 focus-visible:bg-foreground/5">
						<span class="mt-0.5 grid size-7 shrink-0 place-items-center rounded-md border text-muted-foreground [&_svg]:size-4">{#if n.icon}<n.icon class="lucide" />{/if}</span>
						<span class="flex min-w-0 flex-1 flex-col gap-0.5">
							<span class={cn("text-sm", n.unread ? "font-medium text-foreground" : "text-muted-foreground")}>{n.title}</span>
							{#if n.body}<span class="truncate text-[0.8125rem] text-muted-foreground">{n.body}</span>{/if}
						</span>
						<span class="flex shrink-0 flex-col items-end gap-1.5 text-xs text-muted-foreground">
							{n.at}
							{#if n.unread}<Marker filled class="text-primary" /><span class="sr-only">Unread</span>{/if}
						</span>
					</a>
				</li>
			{/each}
		</ul>
	{/each}
</section>
