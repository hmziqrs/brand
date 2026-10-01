<!--
  A record edited in place: a sheet over the page holding the page's own form,
  with a footer that submits it from outside the element (app-blocks.md,
  phase 8). The page owns the <form> and the save; this block owns the sheet —
  the header and footer stay put while the body scrolls, and closing it with
  unsaved changes asks first before anything is thrown away. Needs JavaScript.
-->
<script lang="ts">
	import X from "@lucide/svelte/icons/x";
	import * as AlertDialog from "$brand/ui/alert-dialog/index.js";
	import { Button } from "$brand/ui/button/index.js";
	import * as Sheet from "$brand/ui/sheet/index.js";
	import FormActions from "../settings/form-actions.svelte";
	import { cn } from "$brand/utils.js";
	import { createSubscriber } from "svelte/reactivity";
	import type { Snippet } from "svelte";

	let {
		open = $bindable(false),
		title,
		description,
		dirty,
		pending,
		/** A form-level error from the save. */
		error,
		submitLabel = "Save changes",
		/** The id of the page's <form> in the body; the footer's Save submits it. */
		formId,
		children,
		class: className,
	}: {
		open?: boolean;
		title: Snippet | string;
		description?: Snippet | string;
		dirty: boolean;
		pending: boolean;
		error?: string;
		submitLabel?: string;
		formId: string;
		children: Snippet;
		class?: string;
	} = $props();

	// Below md the sheet rises from the bottom; from md, it slides in from
	// the right at max-w-md. The media query is read in the browser only — a
	// sheet can't be open on the server's first paint anyway.
	const onDesktop = createSubscriber((update) => {
		const query = window.matchMedia("(min-width: 768px)");
		const change = () => update();
		query.addEventListener("change", change);
		return () => query.removeEventListener("change", change);
	});
	const side = $derived.by(() => {
		onDesktop();
		return typeof window === "undefined" || window.matchMedia("(min-width: 768px)").matches
			? "right"
			: "bottom";
	});

	// The discard question, asked before unsaved changes are thrown away.
	let asking = $state(false);

	// Every close of the sheet comes through here: while a save runs the sheet
	// holds still, and while it's dirty the discard question comes up first.
	function requestClose() {
		if (pending || !open) return;
		if (dirty) {
			asking = true;
			return;
		}
		open = false;
	}

	function discard() {
		asking = false;
		open = false;
	}

	// Escape and outside clicks are taken from the sheet's layer and sent
	// through the same door, so they ask like the buttons do.
	function onEscapeKeydown(event: KeyboardEvent) {
		if (!open) return;
		event.preventDefault();
		requestClose();
	}

	function onInteractOutside(event: PointerEvent) {
		if (!open) return;
		event.preventDefault();
		requestClose();
	}
</script>

{#snippet titleText()}
	{#if typeof title === "string"}{title}{:else}{@render title()}{/if}
{/snippet}

<Sheet.Root bind:open>
	<Sheet.Content
		data-slot="record-sheet"
		{side}
		showCloseButton={false}
		class={cn("data-[side=right]:sm:max-w-md", className)}
		{onEscapeKeydown}
		{onInteractOutside}
	>
		<Sheet.Header class="border-b border-border pr-12">
			<Sheet.Title>{@render titleText()}</Sheet.Title>
			{#if description}
				<Sheet.Description>
					{#if typeof description === "string"}{description}{:else}{@render description()}{/if}
				</Sheet.Description>
			{:else}
				<!-- bits-ui points the sheet's aria-describedby at the description
				     whether or not one is shown; a hidden one keeps that honest. -->
				<Sheet.Description class="sr-only">{@render titleText()}</Sheet.Description>
			{/if}
		</Sheet.Header>
		<!-- The body scrolls; the header and footer above and below it stay. -->
		<div class="min-h-0 flex-1 overflow-y-auto px-4 sm:px-6">
			{@render children()}
		</div>
		<Sheet.Footer class="gap-0 p-0">
			<FormActions {dirty} {pending} {error} {submitLabel} form={formId}>
				{#snippet cancel()}
					<Button type="button" variant="outline" disabled={pending} onclick={requestClose}>
						Cancel
					</Button>
				{/snippet}
			</FormActions>
		</Sheet.Footer>
		<!-- Last in the DOM, so the first field is what takes focus on open. -->
		<Button
			variant="ghost"
			size="icon-sm"
			class="absolute top-4 right-4"
			disabled={pending}
			onclick={requestClose}
		>
			<X class="lucide" />
			<span class="sr-only">Close</span>
		</Button>
	</Sheet.Content>
</Sheet.Root>

<!-- The discard question, over the sheet it guards. "Keep editing" returns to
     the sheet; "Discard" closes both and the changes go with them. -->
<AlertDialog.Root bind:open={asking}>
	<AlertDialog.Content size="sm" data-slot="record-sheet-discard">
		<AlertDialog.Header>
			<AlertDialog.Title>Discard your changes?</AlertDialog.Title>
			<AlertDialog.Description>Your changes will be lost.</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Keep editing</AlertDialog.Cancel>
			<AlertDialog.Action variant="destructive" onclick={discard}>Discard</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
