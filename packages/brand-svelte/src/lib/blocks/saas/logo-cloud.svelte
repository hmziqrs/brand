<!-- Customer names in a row, drawn as plain wordmarks: a line icon and the name, in grey. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import type { Component, Snippet } from "svelte";

	type Customer = { name: string; icon: Component<{ class?: string }> };

	let {
		/** The line above the row, e.g. "Powering teams at". */
		label,
		items,
		class: className,
	}: { label: Snippet; items: Customer[]; class?: string } = $props();
</script>

<div class={cn("flex flex-col gap-6", className)}>
	<p class="text-center text-sm text-muted-foreground">{@render label()}</p>
	<ul class="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 text-muted-foreground">
		{#each items as { name, icon: Icon } (name)}
			<li class="inline-flex items-center gap-2 text-[1.0625rem] font-medium tracking-[-0.02em]">
				<Icon class="lucide size-5" />
				{name}
			</li>
		{/each}
	</ul>
</div>
