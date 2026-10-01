<!-- The pages on either side of this one, as two cards at the bottom of a docs page. -->
<script lang="ts">
	import ArrowLeft from "@lucide/svelte/icons/arrow-left";
	import ArrowRight from "@lucide/svelte/icons/arrow-right";
	import { cn } from "$brand/utils.js";
	import OutlineCard from "$brand/blocks/site/outline-card.svelte";

	let { prev, next, class: className }: { prev?: { title: string; href: string }; next?: { title: string; href: string }; class?: string } = $props();
</script>

{#if prev || next}
	<nav aria-label="Previous and next" class={cn("grid grid-cols-2 gap-4", className)}>
		{#if prev}
			<OutlineCard href={prev.href} class="gap-1.5 px-5 py-4.5">
				{#snippet children()}
					<span class="inline-flex items-center gap-1.5 text-[0.8125rem] text-muted-foreground">
						<ArrowLeft class="lucide size-3.75" />
						Previous
					</span>
					<b class="font-medium">{prev.title}</b>
				{/snippet}
			</OutlineCard>
		{:else}
			<span aria-hidden="true"></span>
		{/if}
		{#if next}
			<OutlineCard href={next.href} class="items-end gap-1.5 px-5 py-4.5 text-right">
				{#snippet children()}
					<span class="inline-flex items-center gap-1.5 text-[0.8125rem] text-muted-foreground">
						Next
						<ArrowRight class="lucide size-3.75" />
					</span>
					<b class="font-medium">{next.title}</b>
				{/snippet}
			</OutlineCard>
		{:else}
			<span aria-hidden="true"></span>
		{/if}
	</nav>
{/if}
