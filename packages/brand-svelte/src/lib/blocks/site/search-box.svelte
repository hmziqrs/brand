<!-- A search box that filters as you type. A line, no fill. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import Search from "@lucide/svelte/icons/search";
	import * as InputGroup from "$brand/ui/input-group/index.js";

	let {
		label,
		value = $bindable(""),
		onChange,
		class: className,
	}: { label: string; value?: string; onChange: (value: string) => void; class?: string } = $props();
</script>

<InputGroup.Root class={cn("h-10 w-full max-w-[26rem] shadow-none dark:bg-transparent", className)}>
	<InputGroup.Addon>
		<Search class="lucide" />
	</InputGroup.Addon>
	<InputGroup.Input type="search" aria-label={label} placeholder={label} {value} oninput={(e: Event) => onChange((e.currentTarget as HTMLInputElement).value)} />
</InputGroup.Root>
