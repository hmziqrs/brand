<!--
  A command to copy, in a thin outline only as wide as the command. Commands
  that aren't meant to be run as they are (aliases you name yourself,
  examples) get no copy button.
-->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import Command from "./command.svelte";
	import CopyButton from "./copy-button.svelte";

	let {
		command,
		/** A Copy button on the right. Leave it off for commands people only read, like examples. */
		copy = true,
		onCopied,
		class: className,
	}: { command: string; copy?: boolean; onCopied?: () => void; class?: string } = $props();
</script>

<div data-slot="command-bar" class={cn("flex w-fit max-w-full min-w-0 items-center gap-4 rounded-xl border pl-4.5 text-sm", copy ? "py-1.5 pr-1.5" : "py-2.5 pr-4.5", className)}>
	<div class="min-w-0 flex-1 overflow-x-auto whitespace-nowrap">
		<Command {command} />
	</div>
	{#if copy}<CopyButton text={command} label="Copy" {onCopied} />{/if}
</div>
