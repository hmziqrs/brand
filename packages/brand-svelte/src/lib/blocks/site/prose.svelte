<!-- Long-form text: paragraphs, h2s, links in orange. Posts, docs and legal pages. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";

	let { class: className, children, ...rest }: { class?: string; children?: import("svelte").Snippet } & Record<string, unknown> = $props();
</script>

<div
	class={cn(
		"flex flex-col gap-4.5 text-[0.9375rem] [&_a:not([data-slot=toc]_a)]:text-primary [&_a:not([data-slot=toc]_a)]:underline [&_a]:underline-offset-3 [&_a]:decoration-primary/45 [&_b]:font-medium [&_h2]:mt-7 [&_h2]:scroll-mt-4 [&_h2]:text-[1.4rem] [&_h2]:font-medium [&_h2]:tracking-[-0.02em] [&_li]:leading-[1.75] [&_p]:leading-[1.75]",
		className,
	)}
	{...rest}
>
	{@render children?.()}
</div>
