<!-- The inside of a terminal: monospace, a little air between lines. -->
<script lang="ts">
	import { cn, styleText } from "$brand/utils.js";

	let { class: className, style, children, ...rest }: { class?: string; style?: Record<string, string>; children?: import("svelte").Snippet } & Record<string, unknown> = $props();
</script>

<div class={cn("min-h-50 overflow-x-auto px-5 py-4.5 font-mono text-[0.8125rem] leading-[1.9]", className)} style={styleText(style)} {...rest}>
	{@render children?.()}
</div>
