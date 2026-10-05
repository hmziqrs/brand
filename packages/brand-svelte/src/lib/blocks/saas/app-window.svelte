<!-- A product screen in a browser window: three hollow rings, the address, then the app. -->
<script lang="ts">
	import Lock from "@lucide/svelte/icons/lock";
	import { cn } from "$brand/utils.js";
	import type { Snippet } from "svelte";

	let {
		/** The address shown in the bar, e.g. "app.sightline.io/overview". */
		url,
		class: className,
		children,
	}: { url: string; class?: string; children: Snippet } = $props();
</script>

<div data-slot="app-window" class={cn("min-w-0 overflow-hidden rounded-xl border bg-background", className)}>
	<div class="grid h-10 grid-cols-[3.5rem_minmax(0,1fr)_3.5rem] items-center gap-3 border-b px-3.5">
		<span class="flex gap-1.5" aria-hidden="true">
			{#each [0, 1, 2] as i (i)}
				<i class="size-2.5 rounded-full border-[1.5px] border-foreground/20"></i>
			{/each}
		</span>
		<span class="mx-auto flex h-6.5 max-w-full min-w-0 items-center gap-1.5 rounded-md border px-3 text-xs text-muted-foreground">
			<Lock class="lucide size-3 shrink-0" />
			<span class="truncate">{url}</span>
		</span>
	</div>
	{@render children()}
</div>
