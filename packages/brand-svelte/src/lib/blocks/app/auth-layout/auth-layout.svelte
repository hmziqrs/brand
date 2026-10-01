<!--
  The frame of an auth page: no shell, no nav, one small column. The centered
  variant is the whole page; the split variant holds the form on the left and
  an aside on the right from md (the product's rings, never text on top).
  Below md the split is the centered page with the aside hidden. The page
  brings its own <form> as the children.
-->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import type { Snippet } from "svelte";

	let {
		variant = "centered",
		/** The Wordmark or Mark, linking home. */
		brand,
		title,
		description,
		/** Split only: art on the right from md — the hero Rings, never with text on top. */
		aside,
		/** Terms and privacy links, at the foot of the column. */
		footer,
		class: className,
		children,
	}: {
		variant?: "centered" | "split";
		brand: Snippet;
		title: Snippet | string;
		description?: Snippet | string;
		aside?: Snippet;
		footer?: Snippet;
		class?: string;
		children: Snippet;
	} = $props();

	// One column either way: brand, title, the form, then the footer at the
	// foot of the viewport, where terms links belong.
	const column = "flex w-full max-w-sm flex-col px-4 py-10 md:py-14";
</script>

{#snippet columnBody()}
	{@render brand()}
	<header class="mt-10 flex flex-col gap-2">
		<h1 class="text-2xl font-medium tracking-tight">
			{#if typeof title === "string"}{title}{:else}{@render title()}{/if}
		</h1>
		{#if description}
			<p class="text-sm text-muted-foreground">
				{#if typeof description === "string"}{description}{:else}{@render description()}{/if}
			</p>
		{/if}
	</header>
	<div class="mt-8 flex flex-col">
		{@render children()}
	</div>
	{#if footer}
		<div class="mt-auto pt-10">
			{@render footer()}
		</div>
	{/if}
{/snippet}

{#if variant === "split"}
	<div data-slot="auth-layout" class={cn("grid min-h-dvh md:grid-cols-2", className)}>
		<div class="flex flex-col md:justify-center">
			<div class={cn(column, "mx-auto")}>
				{@render columnBody()}
			</div>
		</div>
		<div class="relative hidden items-center justify-center overflow-hidden border-l border-border p-12 md:flex">
			{@render aside?.()}
		</div>
	</div>
{:else}
	<div data-slot="auth-layout" class={cn(column, "min-h-dvh mx-auto", className)}>
		{@render columnBody()}
	</div>
{/if}
