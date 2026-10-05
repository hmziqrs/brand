<!--
  The docs search, in the header where the lab puts it: a line with the
  icon and the words "Search the docs", which here is a real field. It
  filters the pages in the docs menu on the same page as you type, hiding
  the groups that run empty (DocsLayout owns the query and the menu). ⌘K
  (or Ctrl-K) focuses it, the way the kbd on the right of the field says.
-->
<script lang="ts">
	import Search from "@lucide/svelte/icons/search";
	import { cn } from "$brand/utils.js";

	let {
		label = "Search the docs",
		value = $bindable(""),
		onChange,
		class: className,
	}: { label?: string; value?: string; onChange?: (value: string) => void; class?: string } = $props();

	let field = $state<HTMLInputElement>();

	function input(event: Event) {
		value = (event.currentTarget as HTMLInputElement).value;
		onChange?.(value);
	}
</script>

<!-- The kbd is the hint; the listener below it is the promise kept. -->
<svelte:window onkeydown={(e) => (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey) ? (e.preventDefault(), field?.focus()) : undefined)} />

<div class={cn("ml-2 hidden h-8.5 min-w-56 items-center gap-2 rounded-md border border-input pr-2 pl-2.75 text-[0.8125rem] transition-colors focus-within:border-foreground/30 md:flex", className)}>
	<Search class="lucide size-3.75 shrink-0 text-muted-foreground" />
	<input bind:this={field} type="search" aria-label={label} placeholder={label} {value} oninput={input} class="w-full bg-transparent text-foreground outline-none placeholder:text-muted-foreground" />
	<kbd class="ml-auto hidden shrink-0 rounded border px-1.5 py-px font-sans text-[0.6875rem] text-muted-foreground lg:block">⌘K</kbd>
</div>
