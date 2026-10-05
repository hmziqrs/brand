<script lang="ts">
	import { cn } from "$brand/utils.js";
	import StepNumber from "./step-number.svelte";

	let { n, done = false, class: className, children, ...rest }: { n: number; done?: boolean; class?: string; children?: import("svelte").Snippet } & Record<string, unknown> = $props();
</script>

<li
	data-slot="step"
	class={cn(
		"relative grid grid-cols-[2.25rem_minmax(0,1fr)] gap-5 pb-9 last:pb-0 before:absolute before:top-[2.6rem] before:bottom-1.5 before:left-[calc(1.125rem-0.5px)] before:w-px before:transition-colors last:before:hidden",
		done ? "before:bg-primary" : "before:bg-border",
		className,
	)}
	{...rest}
>
	<StepNumber {n} {done} />
	<div class="flex min-w-0 flex-col gap-3 pt-1.5">{@render children?.()}</div>
</li>
