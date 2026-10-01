<!--
  The checkbox in the header of a selection column: all of the page's rows
  at once, mixed when only some are on. A thin row on the stock checkbox —
  it re-names the data-slot so the two checkboxes stay tellable apart.
-->
<script lang="ts">
	import { Checkbox } from "$brand/ui/checkbox/index.js";
	import { cn } from "$brand/utils.js";

	let {
		checked,
		indeterminate = false,
		onCheckedChange,
		label = "Select all rows on this page",
		class: className,
		...rest
	}: {
		checked: boolean;
		indeterminate?: boolean;
		onCheckedChange: (checked: boolean) => void;
		label?: string;
		class?: string;
	} & Record<string, unknown> = $props();
</script>

<Checkbox
	data-slot="select-all-checkbox"
	{checked}
	{indeterminate}
	onCheckedChange={(next) => onCheckedChange(next)}
	aria-label={label}
	class={cn(className)}
	{...rest}
/>
