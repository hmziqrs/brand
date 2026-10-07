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
		variant = "outline",
		...restProps
	}: WithElementRef<HTMLButtonAttributes> & {
		size?: ButtonSize;
		variant?: ButtonVariant;
		children?: Snippet;
	} = $props();

	const root = useQuestionnaireController("Questionnaire.Previous");
	const visible = $derived(root.total > 1 && !root.first);
	const status = $derived(root.activeItemStatus);

	function handleClick(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		onclick?.(event);
		if (event.defaultPrevented) return;
		root.goPrevious();
	}
</script>

<button
	bind:this={ref}
	data-slot="questionnaire-previous"
	data-size={size}
	data-variant={variant}
	data-visible={visible ? "" : undefined}
	data-hidden={visible ? undefined : ""}
	data-status={status ?? undefined}
	data-disabled={disabled ? "" : undefined}
	aria-hidden={!visible ? "true" : undefined}
	class={cn(buttonVariants({ size, variant }), "col-start-1 row-start-1 min-h-11 justify-self-start sm:min-h-0", className)}
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
		Previous
	{/if}
</button>
