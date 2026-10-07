<script lang="ts">
	import { useId } from "bits-ui";
	import { type Snippet } from "svelte";
	import { cn, type WithElementRef } from "$brand/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { useQuestionnaireItemController } from "./context.svelte.js";

	let {
		ref = $bindable(null),
		class: className,
		id,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLParagraphElement>> & { id?: string; children?: Snippet } = $props();

	const item = useQuestionnaireItemController("Questionnaire.Description");
	const generatedId = useId();
	const elementId = $derived(id ?? generatedId);

	$effect(() => {
		return item.registerDescription(elementId);
	});
</script>

<p
	bind:this={ref}
	data-slot="questionnaire-description"
	id={elementId}
	class={cn("text-sm text-pretty text-muted-foreground", className)}
	{...restProps}
>
	{@render children?.()}
</p>
