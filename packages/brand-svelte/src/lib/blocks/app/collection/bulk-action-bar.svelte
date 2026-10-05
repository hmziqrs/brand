<!--
  What you can do with the rows you picked: the collection toolbar's box,
  filled muted, while a selection is on. The count is announced politely as
  it changes, Escape lets the selection go while focus is in the bar or the
  table, and everything else comes in through the actions slot.
-->
<script lang="ts">
	import { tick } from "svelte";
	import { cn } from "$brand/utils.js";

	let {
		count,
		/** Offers "Select all N" when fewer than that are selected. */
		total,
		onSelectAll,
		/** "Clear selection". */
		onClear,
		/** Outline sm buttons; destructive ones go through ConfirmAction (phase 8). */
		actions,
		class: className,
	}: {
		count: number;
		total?: number;
		onSelectAll?: () => void;
		onClear: () => void;
		actions: import("svelte").Snippet;
		class?: string;
	} = $props();

	let barRef = $state<HTMLElement>(null!);
	let clearRef = $state<HTMLButtonElement>(null!);

	async function selectAll() {
		onSelectAll?.();
		await tick();
		// Choosing everything hides the "Select all" button, so the focus it
		// held would fall out of the bar; "Clear selection" takes it over.
		if (document.activeElement && !barRef.contains(document.activeElement)) clearRef?.focus();
	}

	// Escape ends the selection while the reader is in the bar or in the
	// table it belongs to (the frame's data-slot is the family's shared
	// name). A menu open over either takes the key itself and closes first.
	function onKeydown(event: KeyboardEvent) {
		if (event.key !== "Escape" || count === 0) return;
		const focused = document.activeElement;
		if (!focused) return;
		if (barRef.contains(focused) || focused.closest('[data-slot="app-table-frame"]')) {
			event.preventDefault();
			onClear();
		}
	}
</script>

<svelte:window onkeydown={onKeydown} />

<div
	bind:this={barRef}
	data-slot="bulk-action-bar"
	role="toolbar"
	aria-label="Actions for the selected rows"
	class={cn("flex min-h-14 flex-wrap items-center gap-2 rounded-xl border border-border bg-muted px-3 py-2", className)}
>
	<!-- role=status makes the count polite: it's announced as it changes. -->
	<p class="text-sm font-medium whitespace-nowrap" role="status">{count} selected</p>
	{#if total !== undefined && count < total && onSelectAll}
		<button
			type="button"
			onclick={selectAll}
			class="rounded-md text-sm whitespace-nowrap text-muted-foreground underline-offset-4 outline-none transition-colors hover:text-foreground hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
		>
			Select all {total}
		</button>
	{/if}
	<span class="flex flex-wrap items-center gap-2 sm:ml-auto">
		{@render actions()}
	</span>
	<button
		bind:this={clearRef}
		type="button"
		onclick={onClear}
		class="rounded-md text-sm whitespace-nowrap text-muted-foreground underline-offset-4 outline-none transition-colors hover:text-foreground hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
	>
		Clear selection
	</button>
</div>
