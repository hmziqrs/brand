<!-- The row of notes under the buttons; each one a HeroNote. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";

	let { class: className, children, ...rest }: { class?: string; children?: import("svelte").Snippet } & Record<string, unknown> = $props();
</script>

<div class={cn("flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-muted-foreground", className)} {...rest}>
	{@render children?.()}
</div>
