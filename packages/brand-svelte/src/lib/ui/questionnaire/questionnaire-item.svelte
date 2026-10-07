<script lang="ts">
	import { untrack, type Snippet } from "svelte";
	import { cn, type WithElementRef } from "$brand/utils.js";
	import type { HTMLFieldsetAttributes } from "svelte/elements";
	import {
		setQuestionnaireItem,
		useQuestionnaireController,
		type QuestionnaireItemStatus,
	} from "./context.svelte.js";

	let {
		ref = $bindable(null),
		class: className,
		"aria-describedby": ariaDescribedBy,
		"aria-keyshortcuts": ariaKeyShortcuts,
		disabled = false,
		invalid = false,
		multiple = false,
		name,
		onStatusChange,
		required = false,
		children,
		...restProps
	}: WithElementRef<HTMLFieldsetAttributes> & {
		invalid?: boolean;
		multiple?: boolean;
		name: string;
		onStatusChange?: (status: QuestionnaireItemStatus) => void;
		required?: boolean;
		children?: Snippet;
	} = $props();

	const root = useQuestionnaireController("Questionnaire.Item");

	// svelte-ignore state_referenced_locally
	const item = setQuestionnaireItem(root, { disabled, invalid, multiple, name, required });

	let fieldset: HTMLFieldSetElement | null = $state(null);

	$effect(() => {
		const element = fieldset;
		untrack(() => {
			ref = element;
			item.element = element;
		});
	});

	$effect(() => {
		item.syncProps({ disabled, invalid, multiple, name, required });
	});

	$effect(() => {
		void name;
		if (!item.element) return;
		return root.registerItem(item);
	});

	$effect(() => {
		const status = item.status;
		untrack(() => {
			if (item.prevStatus !== status) {
				item.prevStatus = status;
				onStatusChange?.(status);
			}
		});
	});

	$effect(() => {
		void item.enabledControls;
		untrack(() => item.syncMultipleTransition());
	});

	const controlsCount = $derived(item.enabledControls.length);
	const describedBy = $derived(
		[...item.descriptionIds, ...(item.invalid ? item.errorIds : []), ariaDescribedBy]
			.filter(Boolean)
			.join(" ") || undefined
	);
	const keyShortcuts = $derived(
		[
			ariaKeyShortcuts,
			item.active ? "Meta+Enter Control+Enter" : undefined,
			item.active && controlsCount ? "ArrowUp ArrowDown" : undefined,
			item.active && !root.first ? "ArrowLeft" : undefined,
			item.active && !root.last && item.status !== "unanswered" ? "ArrowRight" : undefined,
		]
			.filter(Boolean)
			.join(" ") || undefined
	);
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex, a11y_role_supports_aria_props_implicit -->
<fieldset
	bind:this={fieldset}
	data-slot="questionnaire-item"
	data-active={item.active ? "" : undefined}
	data-status={item.status}
	data-multiple={item.multiple ? "" : undefined}
	data-required={item.required ? "" : undefined}
	data-invalid={item.invalid ? "" : undefined}
	data-disabled={item.disabled ? "" : undefined}
	class={cn("flex min-w-0 flex-col gap-5 border-0 p-0 outline-none", className)}
	aria-describedby={describedBy}
	aria-invalid={item.invalid || undefined}
	aria-keyshortcuts={keyShortcuts}
	{disabled}
	hidden={!item.active}
	inert={!item.active}
	tabindex={-1}
	{...restProps}
>
	{@render children?.()}
</fieldset>
