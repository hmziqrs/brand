<!-- What's done, what's being built and what's next, in three columns. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import StatusRing from "./status-ring.svelte";
	import Marker from "./marker.svelte";

	type Item = { title: string; body?: string; when?: string; state: "done" | "now" | "next" };

	let { items, class: className }: { items: Item[]; class?: string } = $props();

	const columns = [
		{ state: "done", title: "Shipped" },
		{ state: "now", title: "Being built" },
		{ state: "next", title: "Next" },
	] as const;
</script>

{#snippet mark(state: Item["state"])}
	{#if state === "now"}<StatusRing class="text-sm" />{:else}<Marker filled={state === "done"} class={state === "done" ? "text-primary" : "text-muted-foreground"} />{/if}
{/snippet}

<div data-slot="roadmap" class={cn("grid gap-4 md:grid-cols-3", className)}>
	{#each columns as col (col.state)}
		{@const list = items.filter((i) => i.state === col.state)}
		<section class="flex flex-col gap-3 rounded-xl p-4 ring-1 ring-foreground/10">
			<h3 class="flex items-center gap-2 px-1 text-sm font-medium">{@render mark(col.state)}{col.title}<span class="ml-auto text-muted-foreground tabular-nums">{list.length}</span></h3>
			<ul class="flex flex-col gap-2">
				{#each list as item (item.title)}
					<li class="flex flex-col gap-1 rounded-lg border p-3">
						<span class="text-sm font-medium">{item.title}</span>
						{#if item.body}<span class="text-[0.8125rem] leading-relaxed text-muted-foreground">{item.body}</span>{/if}
						{#if item.when}<span class="text-xs text-muted-foreground">{item.when}</span>{/if}
					</li>
				{/each}
			</ul>
		</section>
	{/each}
</div>
