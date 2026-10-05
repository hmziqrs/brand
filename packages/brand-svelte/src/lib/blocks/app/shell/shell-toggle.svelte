<!--
  The shell's sidebar toggle: the stock trigger with the plan's copy, so the
  button says what it does ("Open menu" / "Collapse menu"). It lives in its
  own file because only a component inside the Sidebar.Provider can reach
  the sidebar's context.
-->
<script lang="ts">
	import PanelLeft from "@lucide/svelte/icons/panel-left";
	import { Button } from "$brand/ui/button/index.js";
	import { useSidebar } from "$brand/ui/sidebar/index.js";
	import { cn } from "$brand/utils.js";

	let { class: className }: { class?: string } = $props();

	const sidebar = useSidebar();

	// An expanded sidebar asks to collapse; anything else (collapsed, or the
	// mobile sheet behind it) asks to open.
	const label = $derived(
		sidebar.state === "expanded" && !sidebar.isMobile ? "Collapse menu" : "Open menu",
	);
</script>

<Button
	variant="ghost"
	size="icon-sm"
	data-sidebar="trigger"
	class={cn("shrink-0", className)}
	onclick={() => sidebar.toggle()}
>
	<PanelLeft class="lucide cn-rtl-flip" />
	<span class="sr-only">{label}</span>
</Button>
