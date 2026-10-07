<script lang="ts">
	import { type Snippet } from "svelte";
	import { useId } from "bits-ui";
	import Check from "@lucide/svelte/icons/check";
	import { cn, type WithElementRef } from "$brand/utils.js";
	import type { HTMLLabelAttributes } from "svelte/elements";
	import { ariaKeyShortcuts, useQuestionnaireItemController } from "./context.svelte.js";

	let {
		ref = $bindable(null),
		checked,
		class: className,
		defaultChecked = false,
		disabled = false,
		onchange,
		value,
		children,
		...restProps
	}: WithElementRef<HTMLLabelAttributes> & {
		checked?: boolean;
		defaultChecked?: boolean;
		disabled?: boolean;
		onchange?: (event: Event & { currentTarget: HTMLInputElement }) => void;
		value: string;
		children?: Snippet;
	} = $props();

	const item = useQuestionnaireItemController("Questionnaire.Choice");
	const id = useId();
	// svelte-ignore state_referenced_locally
	const initialDefaultChecked = defaultChecked;
	let inputElement: HTMLInputElement | null = $state(null);

	const controlled = $derived(checked !== undefined);
	const isDisabled = $derived(item.disabled || disabled);
	const selected = $derived(item.selectedAnswerIds.includes(id));
	const isChecked = $derived(controlled ? (item.status === "skipped" ? false : checked) : selected);
	const type = $derived(item.multiple ? "checkbox" : "radio");
	const shortcut = $derived(item.shortcutByChoiceValue?.get(value) ?? item.shortcutByAnswerId.get(id) ?? null);

	$effect(() => {
		void item.multiple;
		return item.registerAnswerSelection(id, initialDefaultChecked);
	});

	$effect(() => {
		item.setAnswerDefault(id, defaultChecked);
	});

	$effect(() => {
		const element = inputElement;
		if (!element) return;
		return item.registerAnswerControl({ disabled: isDisabled, element, id, ownDisabled: disabled, type: "choice", value });
	});

	$effect(() => {
		void item.resetVersion;
		if (controlled) item.syncControlledAnswerSelection(id, checked);
	});

	$effect(() => {
		const element = inputElement;
		if (!element) return;
		element.defaultChecked = controlled ? checked : defaultChecked;
		if (item.resetVersion > 0) element.checked = isChecked;
	});

	function handleChange(event: Event & { currentTarget: HTMLInputElement }) {
		onchange?.(event);
		if (event.defaultPrevented) return;
		if (!controlled) {
			item.setAnswerSelectionFromInteraction(id, event.currentTarget.checked);
			return;
		}
		if (item.status === "skipped" && checked === event.currentTarget.checked) {
			item.setAnswerSelectionFromInteraction(id, checked);
		}
	}
</script>

<label
	bind:this={ref}
	data-slot="questionnaire-choice"
	data-checked={isChecked ? "" : undefined}
	data-unchecked={isChecked ? undefined : ""}
	data-type={type}
	data-shortcut={shortcut ?? undefined}
	data-disabled={isDisabled ? "" : undefined}
	data-invalid={item.invalid ? "" : undefined}
	class={cn(
		"group/questionnaire-choice relative flex min-h-11 cursor-pointer items-start gap-3 rounded-md border border-input bg-transparent px-4 py-3.5 text-start text-sm shadow-xs transition-colors outline-none select-none hover:bg-muted/50 has-[>input:focus-visible]:border-ring has-[>input:focus-visible]:ring-3 has-[>input:focus-visible]:ring-ring/50 data-invalid:border-destructive dark:bg-input/20 data-checked:border-primary/40 data-checked:bg-muted dark:data-checked:bg-muted",
		"data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50",
		className
	)}
	{...restProps}
>
	<input
		bind:this={inputElement}
		data-slot="questionnaire-choice-input"
		data-checked={isChecked ? "" : undefined}
		data-unchecked={isChecked ? undefined : ""}
		data-type={type}
		data-shortcut={shortcut ?? undefined}
		data-disabled={isDisabled ? "" : undefined}
		data-invalid={item.invalid ? "" : undefined}
		class="absolute inset-0 z-10 size-full cursor-pointer opacity-0"
		aria-invalid={item.invalid || undefined}
		aria-keyshortcuts={ariaKeyShortcuts(shortcut, !isDisabled && isChecked)}
		checked={isChecked}
		disabled={isDisabled}
		id={id}
		name={item.status === "skipped" ? undefined : item.name}
		onchange={handleChange}
		required={item.required && !item.multiple && !item.hasInputAnswer}
		{type}
		{value}
	/>
	<span
		aria-hidden="true"
		data-slot="questionnaire-choice-indicator"
		class="pointer-events-none relative flex size-4 shrink-0 translate-y-[--spacing(0.45)] items-center justify-center rounded-[4px] border border-input group-has-data-[slot=questionnaire-choice-description]/questionnaire-choice:translate-y-0.5 group-data-[type=radio]/questionnaire-choice:rounded-full group-data-checked/questionnaire-choice:border-primary group-data-checked/questionnaire-choice:bg-primary group-data-checked/questionnaire-choice:text-primary-foreground dark:bg-input/30 dark:group-data-checked/questionnaire-choice:bg-primary"
	>
		<span
			data-slot="questionnaire-choice-indicator-dot"
			class="hidden size-2 rounded-full bg-primary-foreground group-data-[type=checkbox]/questionnaire-choice:hidden group-data-checked/questionnaire-choice:block"
		></span>
		<Check
			data-slot="questionnaire-choice-indicator-check"
			class="lucide hidden size-3.5 group-data-[type=radio]/questionnaire-choice:hidden group-data-checked/questionnaire-choice:block"
		/>
	</span>
	<span data-slot="questionnaire-choice-label" class="flex min-w-0 flex-1 flex-col gap-1 leading-snug">
		{@render children?.()}
	</span>
	<span
		aria-hidden="true"
		data-slot="questionnaire-choice-shortcut"
		data-shortcut={shortcut ?? undefined}
		hidden={shortcut === null}
		class="pointer-events-none ms-auto hidden size-5 shrink-0 translate-y-[--spacing(0.45)] items-center justify-center rounded-md border border-input bg-background font-mono text-[0.625rem] leading-none font-medium text-muted-foreground shadow-xs group-has-data-[slot=questionnaire-choice-description]/questionnaire-choice:translate-y-0.5 group-data-[shortcut]/questionnaire-choice:inline-flex"
	>
		{shortcut}
	</span>
</label>
