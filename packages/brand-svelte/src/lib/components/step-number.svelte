<!-- A numbered ring. Done steps fill in with orange. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";

	let { n, done = false, class: className }: { n: number; done?: boolean; class?: string } = $props();
</script>

<span data-slot="step-number" class={cn("grid size-9 shrink-0 place-items-center rounded-full border-[1.75px] text-sm font-medium transition-colors", done ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground", className)}>
	{n}
</span>
