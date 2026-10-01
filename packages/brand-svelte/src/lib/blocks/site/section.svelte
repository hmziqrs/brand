<script lang="ts">
	import { cn } from "$brand/utils.js";
	import Container from "./container.svelte";
	import Marker from "$brand/components/marker.svelte";
	import type { Snippet } from "svelte";

	let {
		/** A small orange label above the title, for catalogs: "Install steps · claude-multi". */
		caption,
		title,
		intro,
		/** "center" puts the caption, title and intro in the middle, for pages with a centered hero. */
		align = "start",
		children,
		class: className,
	}: { caption?: Snippet; title: Snippet; intro?: Snippet; align?: "start" | "center"; children: Snippet; class?: string } = $props();

	const center = $derived(align === "center");
</script>

<Container class={cn("flex flex-col gap-10", className)}>
	{#if caption}
		<p class={cn("-mb-5 flex items-center gap-2 text-[0.8125rem] font-medium text-primary", center && "justify-center")}>
			<Marker />
			{@render caption()}
		</p>
	{/if}
	<div class={cn("flex max-w-2xl flex-col gap-3", center && "mx-auto items-center text-center")}>
		<h2 class="text-3xl font-medium tracking-tight text-balance">{@render title()}</h2>
		{#if intro}<p class="leading-relaxed text-muted-foreground">{@render intro()}</p>{/if}
	</div>
	{@render children()}
</Container>
