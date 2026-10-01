<!--
  One titled part of a settings page: the title and its description beside
  the rows from lg, and the rows themselves in an outlined panel. The page
  owns the form — it wraps this section in its own <form> and handles the
  submit, so the section never does.
-->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import type { Snippet } from "svelte";

	let {
		title,
		description,
		/** "destructive" draws the panel in a destructive outline, for sections that remove things. */
		tone = "default",
		/** The panel's foot, usually FormActions. */
		footer,
		children,
		class: className,
	}: {
		title: Snippet | string;
		description?: Snippet | string;
		tone?: "default" | "destructive";
		footer?: Snippet;
		children: Snippet;
		class?: string;
	} = $props();

	// A unique id for the title, so the section can name itself to screen
	// readers however many sections the page stacks.
	const titleId = $props.id();
</script>

<section
	data-slot="settings-section"
	aria-labelledby={titleId}
	class={cn("flex flex-col gap-5 lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-x-10", className)}
>
	<div class="flex flex-col gap-1.5 lg:pt-5">
		<h2 id={titleId} class="text-base font-medium">
			{#if typeof title === "string"}{title}{:else}{@render title()}{/if}
		</h2>
		{#if description}
			<p class="max-w-prose text-sm text-muted-foreground">
				{#if typeof description === "string"}{description}{:else}{@render description()}{/if}
			</p>
		{/if}
	</div>
	<div class={cn("rounded-xl border border-border", tone === "destructive" && "border-destructive/40")}>
		<div class="divide-y divide-border">
			{@render children()}
		</div>
		{#if footer}
			{@render footer()}
		{/if}
	</div>
</section>
