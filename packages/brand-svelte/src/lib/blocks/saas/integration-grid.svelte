<!-- Integrations as cells in a grid of hairlines: the logo in the text color, its name, one line. -->
<script lang="ts">
	import BrandIcon from "$brand/components/brand-icon.svelte";
	import { cn } from "$brand/utils.js";

	type Integration = { icon: { path: string }; name: string; note: string };

	let { items, class: className }: { items: Integration[]; class?: string } = $props();
</script>

<ul class={cn("grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-3 lg:grid-cols-4", className)}>
	{#each items as it (it.name)}
		<li class="flex flex-col gap-3 bg-background p-5">
			<BrandIcon icon={it.icon} class="size-5" />
			<span class="flex flex-col gap-1">
				<span class="text-sm font-medium">{it.name}</span>
				<span class="text-[0.8125rem] leading-snug text-muted-foreground">{it.note}</span>
			</span>
		</li>
	{/each}
</ul>
