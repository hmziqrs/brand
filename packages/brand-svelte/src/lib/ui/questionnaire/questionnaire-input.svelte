<script lang="ts">
	import { untrack } from "svelte";
	import { useId } from "bits-ui";
	import { cn, type WithElementRef } from "$brand/utils.js";
	import type { HTMLInputAttributes } from "svelte/elements";
	import { ariaKeyShortcuts, hasValue, useQuestionnaireItemController, type QuestionnaireInputType } from "./context.svelte.js";

	let {
		ref = $bindable(null),
		class: className,
		defaultValue,
		disabled = false,
		onchange,
		type = "text",
		value,
		...restProps
	}: WithElementRef<HTMLInputAttributes> & {
		defaultValue?: string | number | readonly string[] | null;
		type?: QuestionnaireInputType;
	} = $props();

	const item = useQuestionnaireItemController("Questionnaire.Input");
	const id = useId();
	// svelte-ignore state_referenced_locally
	const initialDefaultFilled = hasValue(defaultValue);
	let inputElement: HTMLInputElement | null = $state(null);

	const controlled = $derived(value !== undefined);
	const defaultFilled = $derived(hasValue(defaultValue));
	const valueFilled = $derived(hasValue(value));
	let uncontrolledFilled = $state(initialDefaultFilled);
	const filled = $derived(controlled ? valueFilled : uncontrolledFilled);
	const selected = $derived(item.selectedAnswerIds.includes(id));
	const isDisabled = $derived(item.disabled || disabled);

	$effect(() => {
		return item.registerAnswerSelection(id, initialDefaultFilled);
	});

	$effect(() => {
		item.setAnswerDefault(id, defaultFilled);
	});

	$effect(() => {
		const element = inputElement;
		if (!element) return;
		return item.registerAnswerControl({ disabled: isDisabled, element, id, type: "input" });
	});

	$effect(() => {
		const version = item.resetVersion;
		if (controlled) {
			item.syncControlledAnswerSelection(id, valueFilled);
			return;
		}
		if (version > 0) uncontrolledFilled = defaultFilled;
	});

	$effect(() => {
		const element = inputElement;
		if (!element || !controlled) return;
		element.defaultValue = String(value);
	});

	$effect(() => {
		const element = inputElement;
		untrack(() => {
			ref = element;
		});
	});

	function handleChange(event: Event & { currentTarget: HTMLInputElement }) {
		onchange?.(event);
		if (event.defaultPrevented) return;
		if (controlled) return;
		uncontrolledFilled = event.currentTarget.value.trim().length > 0;
		item.setAnswerSelectionFromInteraction(id, uncontrolledFilled);
	}
</script>

<div data-slot="questionnaire-input-wrapper" class="group/questionnaire-input relative w-full min-w-0">
	<input
		bind:this={inputElement}
		data-slot="questionnaire-input"
		data-filled={filled ? "" : undefined}
		data-empty={filled ? undefined : ""}
		data-disabled={isDisabled ? "" : undefined}
		data-invalid={item.invalid ? "" : undefined}
		class={cn(
			"h-9 min-h-11 w-full min-w-0 rounded-md border border-input bg-transparent px-2.5 py-1 text-base shadow-xs transition-[color,box-shadow,background-color] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 sm:min-h-0 md:text-sm dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
			"selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground",
			className
		)}
		aria-invalid={item.invalid || undefined}
		aria-keyshortcuts={ariaKeyShortcuts(null, !isDisabled && filled && selected)}
		{...(controlled ? { value } : { defaultValue })}
		disabled={isDisabled}
		form={selected ? undefined : ""}
		id={id}
		name={selected ? item.name : undefined}
		onchange={handleChange}
		{type}
		{...restProps}
	/>
</div>
