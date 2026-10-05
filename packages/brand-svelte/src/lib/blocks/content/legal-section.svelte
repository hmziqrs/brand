<!--
  One section of a legal document (the lab's legal pages): numbered 01,
  02… in orange, with a thin line above it, and an id made from its title —
  the same slug the headings and the contents list use, with the `prefix`
  keeping a legal page's section ids apart from a post's headings on the
  same site.
-->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import { slug } from "@hmziq/brand-core/scroll-spy";

	let {
		/** The section's number in the document, 1-based. */
		n,
		title,
		/** Added to the id, so legal sections never collide with anchored headings. */
		prefix = "l",
		class: className,
		children,
	}: { n: number; title: string; prefix?: string; class?: string; children: import("svelte").Snippet } = $props();

	const id = $derived(`${prefix}-${slug(title)}`);
</script>

<section class={cn("flex flex-col gap-3.5 border-t pt-5", className)}>
	<h2 id={id} class="mt-1! flex items-baseline gap-1.5 text-[1.3rem]!">
		<span class="inline-block min-w-7.5 font-medium tabular-nums text-primary">{String(n).padStart(2, "0")}</span>
		<span>{title}</span>
	</h2>
	{@render children()}
</section>
