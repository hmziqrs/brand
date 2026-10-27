<script lang="ts">
	import { getContext } from "svelte";
	import { cn } from "$brand/utils.js";
	import type { Snippet } from "svelte";

	let { class: className, children }: { class?: string; children?: Snippet } = $props();

	const id = $props.id();
	getContext<{ setLabelId: (id: string) => void } | undefined>("progress-root")?.setLabelId(id);
</script>

<span {id} data-slot="progress-label" class={cn("text-sm font-medium", className)}>
	{@render children?.()}
</span>
