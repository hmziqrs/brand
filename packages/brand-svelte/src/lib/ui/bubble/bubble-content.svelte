<script lang="ts">
	import type { Snippet } from "svelte";
	import { cn, type WithElementRef, type WithoutChildren } from "$brand/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		render,
		children,
		...restProps
	}: WithoutChildren<WithElementRef<HTMLAttributes<HTMLDivElement>>> & {
			render?: Snippet<[{ props: Record<string, unknown> }]>;
			children?: Snippet;
		} = $props();

	let contentProps = $derived({
		"data-slot": "bubble-content",
		class: cn(
			"w-fit max-w-full min-w-0 overflow-hidden rounded-xl border border-transparent px-3 py-2 text-sm leading-relaxed wrap-break-word group-data-[align=end]/bubble:self-end [button]:text-left [button,a]:transition-colors [button,a]:outline-none [button,a]:focus-visible:border-ring [button,a]:focus-visible:ring-3 [button,a]:focus-visible:ring-ring/50",
			className
		),
		...restProps,
	});
</script>

{#if render}
	{@render render({ props: contentProps })}
{:else}
	<div bind:this={ref} {...contentProps}>
		{@render children?.()}
	</div>
{/if}
