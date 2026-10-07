<script lang="ts">
	import { useId } from "bits-ui";
	import { type Snippet } from "svelte";
	import { cn, type WithElementRef } from "$brand/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { useQuestionnaireItemController } from "./context.svelte.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		id,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLParagraphElement>> & { children?: Snippet; id?: string } = $props();

	const item = useQuestionnaireItemController("Questionnaire.Error");
	const generatedId = useId();
	const elementId = $derived(id ?? generatedId);

	$effect(() => {
		return item.registerError(elementId);
	});

	const message = $derived(item.required ? "Choose an answer to continue." : "Choose an answer or skip this question.");
</script>

<p
	bind:this={ref}
	data-slot="questionnaire-error"
	data-invalid={item.invalid ? "" : undefined}
	hidden={!item.invalid}
	id={elementId}
	role={item.invalid ? "alert" : undefined}
	class={cn("text-sm text-destructive", className)}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		{message}
	{/if}
</p>
