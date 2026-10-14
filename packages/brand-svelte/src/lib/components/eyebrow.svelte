<script lang="ts">
	import { cn } from "$brand/utils.js";
	import type { Snippet } from "svelte";

	let {
		variant = "ring",
		index = 1,
		total = 4,
		children,
		class: className,
	}: {
		/** ring: a numbered ring. rule: a short line. count: ticks, one per step, up to the current one. */
		variant?: "ring" | "rule" | "count";
		index?: number;
		total?: number;
		children: Snippet;
		class?: string;
	} = $props();
</script>

<p data-slot="eyebrow" data-variant={variant} class={cn("flex items-center gap-3 text-[0.8125rem] font-medium", variant === "rule" ? "text-muted-foreground" : "text-primary", className)}>
	{#if variant === "ring"}
		<span class="flex size-5 shrink-0 items-center justify-center rounded-full border border-primary text-[0.6875rem] leading-none tabular-nums">{index}</span>
	{:else if variant === "rule"}
		<span class="h-px w-8 shrink-0 bg-primary" aria-hidden="true"></span>
	{:else}
		<span class="flex shrink-0 gap-1" aria-hidden="true">
			{#each Array.from({ length: total }, (_, i) => i) as i (i)}
				<span class={cn("h-3 w-0.5 rounded-full", i < index ? "bg-primary" : "bg-border")}></span>
			{/each}
		</span>
	{/if}
	<span>{@render children()}</span>
</p>
