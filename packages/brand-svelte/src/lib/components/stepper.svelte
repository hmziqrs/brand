<!-- Steps joined by a line. Only for things that really happen in order. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";

	let { class: className, children, ...rest }: { class?: string; children?: import("svelte").Snippet } & Record<string, unknown> = $props();
</script>

<ol data-slot="stepper" class={cn("flex max-w-[52rem] flex-col", className)} {...rest}>
	{@render children?.()}
</ol>
