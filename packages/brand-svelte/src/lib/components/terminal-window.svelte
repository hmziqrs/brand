<!--
  A terminal window. It's always dark, like a real terminal, on light pages
  too: `dark` switches every token inside it.
-->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import SquareTerminal from "@lucide/svelte/icons/square-terminal";

	let {
		title,
		/** Replaces the terminal icon in the title bar. */
		icon,
		/** Buttons on the right of the title bar: replay, copy. */
		actions,
		class: className,
		children,
		...rest
	}: {
		title: import("svelte").Snippet | string;
		icon?: import("svelte").Snippet;
		actions?: import("svelte").Snippet;
		class?: string;
		children?: import("svelte").Snippet;
	} & Record<string, unknown> = $props();
</script>

<div data-slot="terminal" class={cn("dark min-w-0 overflow-hidden rounded-xl border bg-background text-foreground", className)} {...rest}>
	<div class="flex h-10 items-center gap-2 border-b pr-1.5 pl-3.5 text-[0.8125rem] text-muted-foreground [&>svg]:size-4">
		{#if icon}{@render icon?.()}{:else}<SquareTerminal class="lucide" />{/if}
		<span class="min-w-0 truncate">{#if typeof title === "string"}{title}{:else}{@render title()}{/if}</span>
		{#if actions}<span class="ml-auto flex gap-0.5">{@render actions()}</span>{/if}
	</div>
	{@render children?.()}
</div>
