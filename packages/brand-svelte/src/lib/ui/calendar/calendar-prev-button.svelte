<script lang="ts">
	import { Calendar as CalendarPrimitive } from "bits-ui";
	import ChevronLeftIcon from '@lucide/svelte/icons/chevron-left';
	import { buttonVariants, type ButtonVariant } from "$brand/ui/button/index.js";
	import { cn } from "$brand/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		variant = "ghost",
		...restProps
	}: CalendarPrimitive.PrevButtonProps & {
		variant?: ButtonVariant;
	} = $props();
</script>

<CalendarPrimitive.PrevButton
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
		<button {...props} aria-label="Go to the Previous Month">
			{#if children}
				{@render children?.()}
			{:else}
				<ChevronLeftIcon class={cn("lucide cn-rtl-flip size-4", className)} />
			{/if}
		</button>
	{/snippet}
</CalendarPrimitive.PrevButton>
