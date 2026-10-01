<!--
  The table's skin: one rounded outline that scrolls sideways inside itself
  on narrow screens. With `stickyFirstColumn` the first column of every row
  stays put while the rest scroll under it, its background kept opaque so
  nothing shows through — the background rules live here, on the frame,
  because the cells themselves are the stock ones.
-->
<script lang="ts">
	import { cn } from "$brand/utils.js";

	let {
		stickyFirstColumn = false,
		class: className,
		children,
		...rest
	}: {
		stickyFirstColumn?: boolean;
		class?: string;
		children?: import("svelte").Snippet;
	} & Record<string, unknown> = $props();
</script>

<div
	data-slot="app-table-frame"
	class={cn(
		"overflow-hidden rounded-xl border border-border",
		stickyFirstColumn &&
			cn(
				"[&_[data-slot=table]_tr_:first-child]:sticky",
				"[&_[data-slot=table]_tr_:first-child]:left-0",
				"[&_[data-slot=table]_tr_:first-child]:z-10",
				"[&_[data-slot=table]_tr_:first-child]:bg-background",
				// A selected row keeps its muted fill on its pinned cell; the
				// important marks keep it ahead of the hover rule below.
				"[&_[data-slot=table]_tr[data-state=selected]_:first-child]:bg-muted!",
				"[&_[data-slot=table]_tbody_tr:hover_td:first-child]:bg-muted/50",
			),
		className,
	)}
	{...rest}
>
	{@render children?.()}
</div>
