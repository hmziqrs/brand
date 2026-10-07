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
		size = "default",
		tabindex,
		type = "submit",
		variant = "default",
		...restProps
	}: WithElementRef<HTMLButtonAttributes> & {
		size?: ButtonSize;
		variant?: ButtonVariant;
		children?: Snippet;
	} = $props();

	const root = useQuestionnaireController("Questionnaire.Submit");
	const visible = $derived(root.total > 0 && root.last);
	const status = $derived(root.activeItemStatus);
	const shortcut = $derived(visible && !disabled ? "Enter" : null);
</script>

<button
	bind:this={ref}
	data-slot="questionnaire-submit"
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
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		Submit
	{/if}
</button>
