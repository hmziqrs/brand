<!--
  One question that opens to show its answer. The ring fills in when it's
  open. Built on <details>, so it works without JavaScript and with
  find-in-page.
-->
<script lang="ts">
	import Minus from "@lucide/svelte/icons/minus";
	import Plus from "@lucide/svelte/icons/plus";
	import { cn } from "$brand/utils.js";
	import Marker from "./marker.svelte";
	import Tag from "./tag.svelte";

	let {
		question,
		/** Opens the answer on the page as it ships; the reader can close it. */
		open = false,
		/** Numbered lists show 01, 02… in orange instead of the ring. */
		number,
		/** The question's topic, shown as a grey tag on the right. */
		topic,
		class: className,
		children,
		...rest
	}: {
		question: import("svelte").Snippet;
		open?: boolean;
		number?: number;
		topic?: string;
		class?: string;
		children?: import("svelte").Snippet;
	} & Record<string, unknown> = $props();
</script>

<details data-slot="question" {open} class={cn("group/q border-b", className)} {...rest}>
	<summary class="flex cursor-pointer list-none items-center gap-3 rounded-sm py-4.5 font-medium transition-colors outline-none hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50 [&::-webkit-details-marker]:hidden">
		{#if number === undefined}
			<Marker class="text-muted-foreground group-open/q:bg-current group-open/q:text-primary" />
		{:else}
			<span class="min-w-8 tabular-nums text-primary">{String(number).padStart(2, "0")}</span>
		{/if}
		<span>{@render question()}</span>
		{#if topic}<Tag class="ml-auto">{topic}</Tag>{/if}
		<span class={cn("text-muted-foreground", topic ? "ml-3" : "ml-auto")} aria-hidden="true">
			<Plus class="lucide size-4 group-open/q:hidden" />
			<Minus class="lucide hidden size-4 group-open/q:block" />
		</span>
	</summary>
	<div class={cn("max-w-2xl pr-8 pb-5 text-[0.9rem] leading-[1.7] text-muted-foreground", number === undefined ? "pl-5.5" : "pl-11")}>{@render children?.()}</div>
</details>
