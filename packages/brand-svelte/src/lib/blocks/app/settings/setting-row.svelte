<!--
  One setting: a label, its control, a description and an error, and — for
  controls that save as soon as they change — the state of that save. The
  control comes in as a snippet with a `name` on it; `for` links this row to
  it, and the description and the error take their ids from that same `for`,
  so the page can point the control's aria-describedby at them
  ("${for}-description", "${for}-error").
-->
<script lang="ts">
	import Loader2 from "@lucide/svelte/icons/loader-2";
	import Marker from "$brand/components/marker.svelte";
	import { Button } from "$brand/ui/button/index.js";
	import { cn } from "$brand/utils.js";
	import type { Snippet } from "svelte";

	let {
		label,
		description,
		for: htmlFor,
		/** Horizontal puts the label beside the control (switches, selects); vertical stacks them (text fields). */
		orientation = "vertical",
		error,
		/** For controls that save as soon as they change. */
		status = "idle",
		/** Runs the save again after it failed. */
		onRetry,
		children,
		class: className,
	}: {
		label: Snippet | string;
		description?: Snippet | string;
		for?: string;
		orientation?: "horizontal" | "vertical";
		error?: string;
		status?: "idle" | "saving" | "saved" | "error";
		onRetry?: () => void;
		children: Snippet;
		class?: string;
	} = $props();

	const descriptionId = $derived(htmlFor ? `${htmlFor}-description` : undefined);
	const errorId = $derived(htmlFor ? `${htmlFor}-error` : undefined);

	// Strings pass through as they are; snippets wait for their render. Split
	// here so the template below narrows cleanly.
	const labelSnippet = $derived(typeof label === "string" ? undefined : label);
	const descriptionSnippet = $derived(typeof description === "string" ? undefined : description);

	// "Saved" shows for two seconds and then goes quiet, while the page keeps
	// `status` as it is. It starts from the prop so the server render shows it
	// too; the timer runs in the browser only.
	let savedVisible = $state(status === "saved");
	$effect(() => {
		if (status !== "saved") {
			savedVisible = false;
			return;
		}
		savedVisible = true;
		const timer = setTimeout(() => (savedVisible = false), 2000);
		return () => clearTimeout(timer);
	});
</script>

{#snippet labelContent()}
	{#if labelSnippet}{@render labelSnippet()}{:else}{label}{/if}
{/snippet}

{#snippet descriptionContent()}
	{#if descriptionSnippet}{@render descriptionSnippet()}{:else}{description}{/if}
{/snippet}

{#snippet labelElement()}
	{#if htmlFor}
		<label for={htmlFor} class="text-sm font-medium">{@render labelContent()}</label>
	{:else}
		<p class="text-sm font-medium">{@render labelContent()}</p>
	{/if}
{/snippet}

{#snippet descriptionElement()}
	{#if description}
		<p id={descriptionId} class="text-sm text-muted-foreground">{@render descriptionContent()}</p>
	{/if}
{/snippet}

{#snippet errorElement()}
	{#if error}
		<p id={errorId} class="text-sm text-destructive">{error}</p>
	{/if}
{/snippet}

{#snippet saveStatus()}
	{#if status === "saving"}
		<span role="status" class="inline-flex items-center gap-2 text-sm text-muted-foreground">
			<Loader2 class="lucide size-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
			<span class="sr-only">Saving</span>
		</span>
	{:else if status === "saved" && savedVisible}
		<span role="status" class="inline-flex items-center gap-2 text-sm text-success">
			<Marker filled class="text-success" />
			Saved
		</span>
	{/if}
{/snippet}

{#snippet saveError()}
	<p class="inline-flex flex-wrap items-center gap-2 text-sm text-destructive">
		Couldn't save.
		{#if onRetry}
			<Button type="button" variant="link" size="sm" class="h-auto p-0" onclick={onRetry}>
				Try again
			</Button>
		{/if}
	</p>
{/snippet}

<div data-slot="setting-row" class={cn("px-4 py-4 sm:px-6", className)}>
	{#if orientation === "horizontal"}
		<div class="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
			<div class="flex min-w-0 flex-col gap-1">
				{@render labelElement()}
				{@render descriptionElement()}
			</div>
			<div class="flex min-w-0 flex-col items-start gap-2 sm:items-end">
				<div class="flex flex-wrap items-center gap-3">
					{@render children()}
					{#if status === "saving" || (status === "saved" && savedVisible)}
						{@render saveStatus()}
					{/if}
				</div>
				{@render errorElement()}
				{#if status === "error"}{@render saveError()}{/if}
			</div>
		</div>
	{:else}
		<div class="flex flex-col gap-1.5">
			{@render labelElement()}
			{@render children()}
			{@render descriptionElement()}
			{@render errorElement()}
			{#if status === "saving" || (status === "saved" && savedVisible)}
				{@render saveStatus()}
			{:else if status === "error"}
				{@render saveError()}
			{/if}
		</div>
	{/if}
</div>
