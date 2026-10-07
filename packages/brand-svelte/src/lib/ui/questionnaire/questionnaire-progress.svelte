<script lang="ts">
	import { type Snippet } from "svelte";
	import { cn, type WithElementRef } from "$brand/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { useQuestionnaireController } from "./context.svelte.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & { children?: Snippet } = $props();

	const root = useQuestionnaireController("Questionnaire.Progress");
	const text = $derived(root.total ? `Question ${root.currentNumber} of ${root.total}` : undefined);
</script>

<div
	bind:this={ref}
	data-slot="questionnaire-progress"
	data-current={root.currentNumber}
	data-first={root.first ? "" : undefined}
	data-last={root.last ? "" : undefined}
	data-total={root.total}
	role="progressbar"
	aria-label="Questionnaire progress"
	aria-live="polite"
	aria-valuemax={root.total || undefined}
	aria-valuemin={root.total ? 1 : undefined}
	aria-valuenow={root.total ? root.currentNumber : undefined}
	aria-valuetext={text}
	class={cn("min-h-[1lh] w-fit min-w-[14ch] text-xs font-medium text-muted-foreground tabular-nums", className)}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		{text}
	{/if}
</div>
