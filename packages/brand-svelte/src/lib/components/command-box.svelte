<!-- A smaller command with an icon copy button, for a step in a list. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import Command from "./command.svelte";
	import CopyButton from "./copy-button.svelte";

	let { command, onCopied, class: className }: { command: string; onCopied?: () => void; class?: string } = $props();
</script>

<div data-slot="command-box" class={cn("flex max-w-[52rem] min-w-0 items-center gap-2 rounded-md border py-1 pr-1 pl-3.5 text-[0.8125rem]", className)}>
	<div class="min-w-0 flex-1 overflow-x-auto py-1 whitespace-nowrap">
		<Command {command} />
	</div>
	<CopyButton text={command} {onCopied} />
</div>
