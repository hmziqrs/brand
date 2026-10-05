<!-- The top of an inner page: a small grey word, the title and one paragraph. -->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import type { Snippet } from "svelte";

	let { kicker, title, lede, children, class: className }: { kicker?: Snippet; title: Snippet; lede?: Snippet; children?: Snippet; class?: string } = $props();
</script>

<div class={cn("flex max-w-xl flex-col gap-6", className)}>
	{#if kicker}<p class="-mb-2 text-[0.8125rem] text-muted-foreground">{@render kicker()}</p>{/if}
	<h1 class="text-[2.4rem] leading-[1.02] font-medium tracking-[-0.035em] text-balance sm:text-5xl lg:text-[3.6rem]">{@render title()}</h1>
	{#if lede}<p class="max-w-[34rem] text-lg leading-relaxed text-muted-foreground">{@render lede()}</p>{/if}
	{@render children?.()}
</div>
