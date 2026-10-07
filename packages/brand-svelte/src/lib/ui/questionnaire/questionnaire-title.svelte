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
	}: WithElementRef<HTMLAttributes<HTMLLegendElement>> & { children?: Snippet } = $props();

	useQuestionnaireItemController("Questionnaire.Title");
</script>

<legend
	bind:this={ref}
	data-slot="questionnaire-title"
	class={cn("text-base font-semibold text-pretty [&:not(:has(~[data-slot=questionnaire-description]))]:mb-5", className)}
	{...restProps}
>
	{@render children?.()}
</legend>
