<script lang="ts">
	import { type Snippet } from "svelte";
	import { cn, type WithElementRef } from "$brand/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { useQuestionnaireItemController } from "./context.svelte.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & { children?: Snippet } = $props();

	const item = useQuestionnaireItemController("Questionnaire.Choices");
</script>

<div
	bind:this={ref}
	data-slot="questionnaire-choices"
	data-shortcuts={item.shortcuts ?? undefined}
	class={cn("group/questionnaire-choices grid min-w-0 gap-3", className)}
	{...restProps}
>
	{@render children?.()}
</div>
