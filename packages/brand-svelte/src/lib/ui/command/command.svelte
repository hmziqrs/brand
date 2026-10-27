<script lang="ts">
	import { Command as CommandPrimitive } from "bits-ui";
	import { setContext } from "svelte";
	import { cn } from "$brand/utils.js";

	export type CommandRootApi = CommandPrimitive.Root;

	let {
		api = $bindable(null),
		ref = $bindable(null),
		value = $bindable(""),
		class: className,
		...restProps
	}: CommandPrimitive.RootProps & {
		api?: CommandRootApi | null;
	} = $props();

	let listId = $state<string>();
	setContext("command-root", {
		registerList: (id: string) => (listId = id),
		listId: () => listId,
	});
</script>

<CommandPrimitive.Root
	bind:this={api}
	bind:value
	bind:ref
	data-slot="command"
	class={cn("bg-popover text-popover-foreground rounded-xl! p-1 flex size-full flex-col overflow-hidden", className)}
	{...restProps}
/>
