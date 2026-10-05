<!-- A list of questions: a line on top, one between each. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";

	let { class: className, children, ...rest }: { class?: string; children?: import("svelte").Snippet } & Record<string, unknown> = $props();
</script>

<div data-slot="questions" class={cn("max-w-[52rem] border-t", className)} {...rest}>
	{@render children?.()}
</div>
