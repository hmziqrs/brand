<!-- Very large numbers under a strong line. About and changelog pages. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";

	let { items, class: className }: { items: readonly (readonly [value: string, label: string])[]; class?: string } = $props();
</script>

<ul class={cn("grid gap-8", items.length === 4 ? "grid-cols-2 md:grid-cols-4" : "sm:grid-cols-3", className)}>
	{#each items as [value, label] (label)}
		<li class="flex flex-col gap-2 border-t border-foreground pt-4">
			<span class="text-[3rem] leading-[0.95] font-medium tracking-[-0.05em] md:text-[5.25rem]">{value}</span>
			<span class="text-sm text-muted-foreground">{label}</span>
		</li>
	{/each}
</ul>
