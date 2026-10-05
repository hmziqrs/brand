<!-- A list of the page's headings. The one you're reading gets an orange ring. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import Marker from "./marker.svelte";

	let {
		items,
		current,
		/** 01, 02… in orange instead of the rings, for numbered documents. */
		numbered = false,
		class: className,
	}: {
		items: { id: string; label: string }[];
		current?: string;
		numbered?: boolean;
		class?: string;
	} = $props();
</script>

<ul data-slot="toc" class={cn("flex flex-col gap-0.5", className)}>
	{#each items as item, i (item.id)}
		{@const on = item.id === current}
		<li>
			<a
				href={`#${item.id}`}
				aria-current={on ? "location" : undefined}
				class={cn("flex items-center gap-2 rounded-sm py-1 no-underline transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50", on ? "text-foreground" : "text-muted-foreground")}
			>
				{#if numbered}
					<span class="min-w-6.5 text-xs font-medium tabular-nums text-primary">{String(i + 1).padStart(2, "0")}</span>
				{:else}
					<Marker class={on ? "text-primary" : "text-border"} />
				{/if}
				{item.label}
			</a>
		</li>
	{/each}
</ul>
