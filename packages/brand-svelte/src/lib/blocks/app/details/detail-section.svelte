<!--
  One titled part of a record's page: the title and the section's actions in
  one row, the description under them, and the content in an outlined panel.
  The panel brings the padding, so a DetailList lands flush inside it and
  SkeletonDetails stands in the same place while the record loads — the
  section keeps its shape through a load, which is what lets it sit inside
  DataState.
-->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import type { Snippet } from "svelte";

	let {
		title,
		description,
		/** "destructive" draws the panel in a destructive outline, for sections that remove things. */
		tone = "default",
		/** The section's own actions, e.g. an outline “Edit”. */
		actions,
		children,
		class: className,
		...rest
	}: {
		title: Snippet | string;
		description?: Snippet | string;
		tone?: "default" | "destructive";
		actions?: Snippet;
		children: Snippet;
		class?: string;
	} & Record<string, unknown> = $props();

	// A unique id for the title, so the section can name itself to screen
	// readers however many sections the page stacks.
	const titleId = $props.id();
</script>

<section data-slot="detail-section" aria-labelledby={titleId} class={cn("flex flex-col gap-3", className)} {...rest}>
	<div class="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
		<h2 id={titleId} class="text-base font-medium">
			{#if typeof title === "string"}{title}{:else}{@render title()}{/if}
		</h2>
		{#if actions}
			<div class="flex flex-wrap items-center gap-2">
				{@render actions()}
			</div>
		{/if}
	</div>
	{#if description}
		<p class="max-w-prose text-sm text-muted-foreground">
			{#if typeof description === "string"}{description}{:else}{@render description()}{/if}
		</p>
	{/if}
	<div class={cn("rounded-xl border border-border px-4 sm:px-6", tone === "destructive" && "border-destructive/40")}>
		{@render children()}
	</div>
</section>
