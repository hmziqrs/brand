<!--
  A step that deserves a second look before it runs (app-blocks.md, phase 8):
  the consequences said in words, a confirm button that says what happens, and
  — when the action can't be undone — a word the reader has to type first.
  While the action runs the dialog holds still; a failure stays open with the
  reason, so it can be tried again. Needs JavaScript, and fetches nothing: the
  page's onConfirm does the work and hands back a FormResult.
-->
<script lang="ts">
	import Loader2 from "@lucide/svelte/icons/loader-2";
	import * as AlertDialog from "$brand/ui/alert-dialog/index.js";
	import { Button } from "$brand/ui/button/index.js";
	import { Input } from "$brand/ui/input/index.js";
	import Notice from "$brand/components/notice.svelte";
	import { toast } from "svelte-sonner";
	import type { Snippet } from "svelte";
	// The contract's shared result type, defined with the auth forms.
	import type { FormResult } from "$brand/blocks/app/auth/types.js";

	let {
		/** Bindable, so a page can open it from anywhere (a menu item, say). */
		open = $bindable(false),
		/**
		 * The trigger's content, receiving the trigger's props to spread onto
		 * its button. Left out when the page opens the dialog itself.
		 */
		trigger,
		title,
		/** What happens, and whether it can be undone. */
		description,
		confirmLabel,
		cancelLabel = "Cancel",
		tone = "destructive",
		/** The reader must type this exactly to enable the confirm button. */
		confirmText,
		onConfirm,
		/** A toast after success. */
		successMessage,
		class: className,
	}: {
		open?: boolean;
		trigger?: Snippet<[Record<string, unknown>]>;
		title: Snippet | string;
		description: Snippet | string;
		confirmLabel: string;
		cancelLabel?: string;
		tone?: "destructive" | "default";
		confirmText?: string;
		onConfirm: () => Promise<FormResult>;
		successMessage?: string;
		class?: string;
	} = $props();

	let typed = $state("");
	let pending = $state(false);
	let error = $state<string | undefined>();
	let inputRef = $state<HTMLInputElement>(null!);
	let cancelRef = $state<HTMLButtonElement>(null!);

	const typedOk = $derived(confirmText === undefined || typed === confirmText);

	// Runs as the dialog opens: every attempt starts clean (nothing typed,
	// nothing failed), and focus lands where the plan says it does — on the
	// word to type when there is one, and on Cancel otherwise (bits-ui would
	// focus the panel itself).
	function onOpenAutoFocus(event: Event) {
		typed = "";
		error = undefined;
		event.preventDefault();
		requestAnimationFrame(() => (confirmText ? inputRef : cancelRef)?.focus());
	}

	// Escape holds the dialog open while the action runs (outside clicks never
	// close an alert dialog, which is why there's nothing here for them).
	function onEscapeKeydown(event: KeyboardEvent) {
		if (pending) event.preventDefault();
	}

	// bits-ui returns focus to the trigger as the dialog closes. When the
	// trigger is gone with its row, focus falls out of the page; the page's
	// heading is the nearest place for it to land instead.
	function focusAfterClose() {
		requestAnimationFrame(() => {
			if (document.activeElement && document.activeElement !== document.body) return;
			const heading = document.querySelector("h1");
			if (heading instanceof HTMLElement) {
				heading.tabIndex = -1;
				heading.focus();
			}
		});
	}

	async function confirm() {
		if (pending || !typedOk) return;
		pending = true;
		error = undefined;
		const result = await onConfirm();
		pending = false;
		if (result) {
			error = result.message;
			return;
		}
		open = false;
		if (successMessage) toast.success(successMessage);
	}
</script>

<AlertDialog.Root bind:open>
	{#if trigger}
		<AlertDialog.Trigger>
			{#snippet child({ props })}
				{@render trigger(props)}
			{/snippet}
		</AlertDialog.Trigger>
	{/if}
	<AlertDialog.Content
		data-slot="confirm-action"
		class={className}
		onOpenAutoFocus={onOpenAutoFocus}
		onCloseAutoFocus={focusAfterClose}
		{onEscapeKeydown}
	>
		<AlertDialog.Header>
			<AlertDialog.Title>
				{#if typeof title === "string"}{title}{:else}{@render title()}{/if}
			</AlertDialog.Title>
			<AlertDialog.Description>
				{#if typeof description === "string"}{description}{:else}{@render description()}{/if}
			</AlertDialog.Description>
			{#if confirmText}
				<!-- The word to type, in the header so the dialog reads as one
				     thought; left-aligned even where the header centers. -->
				<div class="mt-2 flex flex-col gap-2 text-left">
					<label for="confirm-action-word" class="text-sm">
						Type <strong class="font-medium text-foreground">{confirmText}</strong> to confirm
					</label>
					<Input
						bind:ref={inputRef}
						id="confirm-action-word"
						bind:value={typed}
						autocomplete="off"
						spellcheck={false}
						aria-describedby="confirm-action-word-hint"
						onkeydown={(event) => {
							if (event.key !== "Enter") return;
							event.preventDefault();
							confirm();
						}}
					/>
					<p id="confirm-action-word-hint" class="sr-only">
						The confirm button stays off until this matches.
					</p>
				</div>
			{/if}
		</AlertDialog.Header>
		{#if error}
			<Notice tone="destructive" title={error} />
		{/if}
		<AlertDialog.Footer>
			<AlertDialog.Cancel bind:ref={cancelRef} disabled={pending}>{cancelLabel}</AlertDialog.Cancel>
			<Button
				variant={tone === "destructive" ? "destructive" : "default"}
				disabled={pending || !typedOk}
				onclick={confirm}
			>
				{#if pending}
					<Loader2 class="lucide size-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
				{/if}
				{confirmLabel}
			</Button>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
