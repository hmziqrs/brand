<script lang="ts">
	import { type Snippet } from "svelte";
	import { buttonVariants, type ButtonSize, type ButtonVariant } from "$brand/ui/button/index.js";
	import { cn, type WithElementRef } from "$brand/utils.js";
	import type { HTMLButtonAttributes } from "svelte/elements";
	import { useQuestionnaireController } from "./context.svelte.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		disabled = false,
		onclick,
		size = "default",
		tabindex,
		type = "button",
		variant = "default",
		...restProps
	}: WithElementRef<HTMLButtonAttributes> & {
		size?: ButtonSize;
		variant?: ButtonVariant;
		children?: Snippet;
	} = $props();

	const root = useQuestionnaireController("Questionnaire.Next");
	const visible = $derived(root.total > 1 && !root.last);
	const status = $derived(root.activeItemStatus);
	const shortcut = $derived(visible && !disabled ? "Enter" : null);

	function handleClick(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		onclick?.(event);
		if (event.defaultPrevented) return;
		root.goNext();
	}
</script>

<button
	bind:this={ref}
	data-slot="questionnaire-next"
	data-size={size}
	data-variant={variant}
	data-visible={visible ? "" : undefined}
	data-hidden={visible ? undefined : ""}
	data-status={status ?? undefined}
	data-shortcut={shortcut ?? undefined}
	data-disabled={disabled ? "" : undefined}
	aria-hidden={!visible ? "true" : undefined}
	aria-keyshortcuts={shortcut ?? undefined}
	class={cn(buttonVariants({ size, variant }), "col-start-3 row-start-1 min-h-11 justify-self-end sm:min-h-0", className)}
	{disabled}
	hidden={!visible}
	inert={!visible}
	tabindex={visible ? tabindex : -1}
	{type}
	onclick={handleClick}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		Next
	{/if}
</button>
