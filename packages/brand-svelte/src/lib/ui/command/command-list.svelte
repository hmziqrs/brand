<script lang="ts">
	import { Command as CommandPrimitive } from "bits-ui";
	import { getContext } from "svelte";
	import { cn } from "$brand/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: CommandPrimitive.ListProps = $props();

	const id = $props.id();
	getContext<{ registerList: (id: string) => void } | undefined>("command-root")?.registerList(id);
</script>

<CommandPrimitive.List
	bind:ref
	{id}
	data-slot="command-list"
	class={cn("no-scrollbar max-h-72 scroll-py-1 outline-none overflow-x-hidden overflow-y-auto", className)}
	{...restProps}
/>
