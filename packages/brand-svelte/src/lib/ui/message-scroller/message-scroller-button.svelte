<script lang="ts">
	import ArrowDown from "@lucide/svelte/icons/arrow-down";
	import { buttonVariants, type ButtonSize, type ButtonVariant } from "$brand/ui/button/index.js";
	import { cn, type WithElementRef } from "$brand/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLButtonAttributes } from "svelte/elements";
	import { useMessageScrollerController, type MessageScrollerButtonDirection } from "./context.svelte.js";

	let {
		ref = $bindable(null),
		class: className,
		direction = "end",
		variant = "secondary",
		size = "icon-sm",
		behavior = "smooth",
		type = "button",
		tabindex,
		onclick,
		children,
		...restProps
	}: WithElementRef<HTMLButtonAttributes> & {
		direction?: MessageScrollerButtonDirection;
		variant?: ButtonVariant;
		size?: ButtonSize;
		behavior?: ScrollBehavior;
		children?: Snippet;
	} = $props();

	const controller = useMessageScrollerController("MessageScrollerButton");
	const active = $derived(direction === "start" ? controller.scrollable.start : controller.scrollable.end);

	function handleClick(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		if (!active) return;
		onclick?.(event);
		if (event.defaultPrevented) return;
		event.currentTarget.blur();
		if (direction === "start") controller.scrollToStart({ behavior });
		else controller.scrollToEnd({ behavior });
	}
</script>

<button
	bind:this={ref}
	data-slot="message-scroller-button"
	data-direction={direction}
	data-variant={variant}
	data-size={size}
	data-active={active ? "true" : "false"}
	class={cn(
		buttonVariants({ variant, size }),
		"absolute inset-s-1/2 -translate-x-1/2 border-border bg-background text-foreground transition-[translate,scale,opacity] duration-200 hover:bg-muted hover:text-foreground data-[active=false]:pointer-events-none data-[active=false]:scale-95 data-[active=false]:opacity-0 data-[active=false]:duration-400 data-[active=false]:ease-[cubic-bezier(0.7,0,0.84,0)] data-[active=true]:translate-y-0 data-[active=true]:scale-100 data-[active=true]:opacity-100 data-[active=true]:ease-[cubic-bezier(0.23,1,0.32,1)] data-[direction=end]:bottom-4 data-[direction=end]:data-[active=false]:translate-y-full data-[direction=start]:top-4 data-[direction=start]:data-[active=false]:-translate-y-full rtl:translate-x-1/2 data-[direction=start]:[&_svg]:rotate-180",
		className
	)}
	{type}
	inert={!active}
	tabindex={active ? tabindex : -1}
	onclick={handleClick}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<ArrowDown class="lucide" />
		<span class="sr-only">
			{direction === "end" ? "Scroll to end" : "Scroll to start"}
		</span>
	{/if}
</button>
