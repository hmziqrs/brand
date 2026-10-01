<!--
  The checkbox in one row of a selection column. It names the row it picks
  ("Select Ada Lovelace"), so screen readers say what's being chosen.
-->
<script lang="ts">
	import { Checkbox } from "$brand/ui/checkbox/index.js";
	import { cn } from "$brand/utils.js";

	let {
		checked,
		onCheckedChange,
		label,
		class: className,
		...rest
	}: {
		checked: boolean;
		onCheckedChange: (checked: boolean) => void;
		label: string;
		class?: string;
	} & Record<string, unknown> = $props();
</script>

<Checkbox
	data-slot="row-checkbox"
	{checked}
	onCheckedChange={(next) => onCheckedChange(next)}
	aria-label={label}
	class={cn(className)}
	{...rest}
/>
