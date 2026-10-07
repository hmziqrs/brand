<script lang="ts">
	import { untrack, type Snippet } from "svelte";
	import { cn, type WithElementRef } from "$brand/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import {
		setQuestionnaire,
		type QuestionnaireItemDefinition,
		type QuestionnaireShortcutMode,
	} from "./context.svelte.js";

	let {
		ref = $bindable(null),
		class: className,
		defaultItem,
		item,
		items,
		noValidate = true,
		onItemChange,
		onkeydown,
		onreset,
		onsubmit,
		shortcuts,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLFormElement>> & {
		defaultItem?: string;
		item?: string;
		items?: readonly QuestionnaireItemDefinition[];
		noValidate?: boolean;
		onItemChange?: (item: string) => void;
		shortcuts?: QuestionnaireShortcutMode;
		children?: Snippet;
	} = $props();

	// svelte-ignore state_referenced_locally
	const controller = setQuestionnaire({ defaultItem, item, items, noValidate, onItemChange, onReset: onreset, onSubmit: onsubmit, shortcuts });

	let form: HTMLFormElement | null = $state(null);

	$effect(() => {
		const element = form;
		untrack(() => {
			ref = element;
			controller.formElement = element;
		});
	});

	$effect(() => {
		controller.syncProps({ defaultItem, item, items, noValidate, onItemChange, onReset: onreset, onSubmit: onsubmit, shortcuts });
	});

	$effect(() => {
		const element = form;
		if (!element || typeof MutationObserver === "undefined") return;
		const observer = new MutationObserver(() => {
			controller.domVersion += 1;
		});
		observer.observe(element, { childList: true, subtree: true });
		return () => observer.disconnect();
	});

	$effect(() => {
		const total = controller.total;
		const index = controller.currentIndex;
		const current = controller.currentItemName;
		if (total === 0) return;
		if (index < 0) {
			const firstName = controller.enabledNames[0]!;
			if (!controller.controlled && current === null) {
				controller.uncontrolledItemName = firstName;
				return;
			}
			controller.setItem(firstName);
			return;
		}
		untrack(() => {
			const active = controller.activeRenderedItem;
			const intent = controller.intent;
			const changed = controller.previousName !== current;
			controller.previousName = current;
			if (!intent || intent.name !== current) {
				if (controller.controlled && changed) {
					controller.intent = null;
					active?.focus();
				}
				return;
			}
			if (intent.target === "invalid") active?.focusInvalid();
			else active?.focus();
			controller.intent = null;
		});
	});

	function handleKeydown(event: KeyboardEvent & { currentTarget: EventTarget & HTMLFormElement }) {
		onkeydown?.(event);
		if (event.defaultPrevented) return;
		controller.handleKeydown(event);
	}
</script>

<form
	bind:this={form}
	data-slot="questionnaire"
	data-shortcuts={controller.shortcuts ?? undefined}
	data-current={controller.currentNumber}
	data-first={controller.first ? "" : undefined}
	data-last={controller.last ? "" : undefined}
	data-total={controller.total}
	novalidate={noValidate}
	class={cn("flex w-full min-w-0 flex-col gap-6", className)}
	onreset={(event) => controller.handleReset(event)}
	onsubmit={(event) => controller.handleSubmit(event)}
	onkeydown={handleKeydown}
	{...restProps}
>
	{@render children?.()}
</form>
