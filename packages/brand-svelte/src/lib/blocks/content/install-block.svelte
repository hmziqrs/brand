<!--
  Install with the package manager you have: a switch, the command, and
  what it needs (claude-multi's landing).
-->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import Segmented from "$brand/components/segmented.svelte";
	import CommandBar from "$brand/components/command-bar.svelte";
	import Checks from "./checks.svelte";

	let {
		/** One command per package manager, `[manager, command]`. */
		commands,
		/** The requirements, all met. */
		items,
		class: className,
	}: { commands: readonly (readonly [manager: string, command: string])[]; items: string[]; class?: string } = $props();

	let pm = $state<string | null>(null);
	const current = $derived(commands.find(([manager]) => manager === pm) ?? commands[0]);
</script>

<div data-slot="install-block" class={cn("flex max-w-[52rem] flex-col gap-3.5", className)}>
	<Segmented
		label="Package manager"
		value={current[0]}
		onValueChange={(v) => (pm = v)}
		options={commands.map(([manager]) => ({ value: manager, label: manager }))}
	/>
	<CommandBar command={current[1]} />
	<Checks {items} />
</div>
