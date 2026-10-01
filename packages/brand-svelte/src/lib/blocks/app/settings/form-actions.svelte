<!--
  The foot of a settings form: what state the form is in, on the left, and
  Cancel plus Save on the right. Save is a real submit button; the page owns
  the <form> and the submit. With no JavaScript the page can't know the form
  is dirty, so the server render keeps Save enabled and hides the unsaved
  line; the browser disables Save once it can see the form is clean.
-->
<script lang="ts">
	import Loader2 from "@lucide/svelte/icons/loader-2";
	import Marker from "$brand/components/marker.svelte";
	import Notice from "$brand/components/notice.svelte";
	import { Button } from "$brand/ui/button/index.js";
	import { cn } from "$brand/utils.js";
	import type { Snippet } from "svelte";

	let {
		dirty,
		pending,
		/** Shows "Saved" for four seconds after a successful save. */
		saved = false,
		/** A form-level error from the server. */
		error,
		/** The Cancel control: a reset button, or a link back. */
		cancel,
		submitLabel = "Save changes",
		/** The id of the form Save submits, when the footer sits outside it (RecordSheet). */
		form,
		class: className,
	}: {
		dirty: boolean;
		pending: boolean;
		saved?: boolean;
		error?: string;
		cancel?: Snippet;
		submitLabel?: string;
		form?: string;
		class?: string;
	} = $props();

	// Effects run in the browser only: the server render (and a page with no
	// JavaScript) keeps Save enabled, and hydration disables it when the form
	// is clean. An error keeps it enabled, so the save can be tried again.
	let inBrowser = $state(false);
	$effect(() => {
		inBrowser = true;
	});
	const saveDisabled = $derived(pending || (!error && inBrowser && !dirty));

	// "Saved" shows for four seconds and then goes quiet, while the page
	// keeps `saved` as it is. It starts from the prop so the server render
	// (and a page with no JavaScript) shows it too.
	let savedVisible = $state(saved);
	$effect(() => {
		if (!saved) {
			savedVisible = false;
			return;
		}
		savedVisible = true;
		const timer = setTimeout(() => (savedVisible = false), 4000);
		return () => clearTimeout(timer);
	});
</script>

<div data-slot="form-actions" class={cn("border-t border-border px-4 py-4 sm:px-6", className)}>
	{#if error}
		<div class="mb-4">
			<Notice tone="destructive" title={error} />
		</div>
	{/if}
	<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
		<p class="flex min-h-6 items-center gap-2 text-sm text-muted-foreground">
			{#if savedVisible}
				<span role="status" class="inline-flex items-center gap-2 text-success">
					<Marker filled class="text-success" />
					Saved
				</span>
			{:else if dirty && !pending}
				<Marker class="text-warning" />
				You have unsaved changes
			{/if}
		</p>
		<div class="flex flex-wrap items-center gap-2 sm:justify-end">
			{#if dirty || pending}
				{@render cancel?.()}
			{/if}
			<Button type="submit" form={form} disabled={saveDisabled}>
				{#if pending}
					<Loader2 class="lucide size-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
					Saving…
				{:else}
					{submitLabel}
				{/if}
			</Button>
		</div>
	</div>
</div>
