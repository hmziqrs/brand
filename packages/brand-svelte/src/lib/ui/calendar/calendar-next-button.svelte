<script lang="ts">
	import { Calendar as CalendarPrimitive } from "bits-ui";
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
	import { buttonVariants, type ButtonVariant } from "$brand/ui/button/index.js";
	import { cn } from "$brand/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		variant = "ghost",
		...restProps
	}: CalendarPrimitive.NextButtonProps & {
		variant?: ButtonVariant;
	} = $props();
</script>

<CalendarPrimitive.NextButton
	bind:ref
	class={cn(
		buttonVariants({ variant }),
		"size-(--cell-size) bg-transparent p-0 select-none disabled:opacity-50",
		"rtl:rotate-180",
		className
	)}
	{...restProps}
>
	{#snippet child({ props })}
		<button {...props} aria-label="Go to the Next Month">
			{#if children}
				{@render children?.()}
			{:else}
				<ChevronRightIcon class={cn("lucide cn-rtl-flip size-4", className)} />
			{/if}
		</button>
	{/snippet}
</CalendarPrimitive.NextButton>
