<script lang="ts">
	import { Button, type ButtonProps } from "$brand/ui/button/index.js";
	import { cn } from "$brand/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		variant = "ghost",
		size = "icon-xs",
		...restProps
	}: ButtonProps = $props();
</script>

<Button
	bind:ref
	data-slot="attachment-action"
	{variant}
	{size}
	class={cn(className)}
	{...restProps}
/>
