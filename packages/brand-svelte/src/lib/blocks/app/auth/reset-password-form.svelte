<!--
  The inside of a reset-password form: the new password field and the submit
  button, or — when the link has expired, is invalid, or has already been
  used — the explanation and the way to a new link. The page owns the <form>;
  the action's FormResult comes back as `result`.
-->
<script lang="ts">
	import Loader2 from "@lucide/svelte/icons/loader-2";
	import Notice from "$brand/components/notice.svelte";
	import { Button } from "$brand/ui/button/index.js";
	import { cn } from "$brand/utils.js";
	import AuthField from "./auth-field.svelte";
	import PasswordInput from "./password-input.svelte";
	import type { FormResult } from "./types.js";

	let {
		result,
		pending = false,
		status = "ready",
		links,
		class: className,
	}: {
		result?: FormResult;
		pending?: boolean;
		status?: "ready" | "expired" | "invalid" | "done";
		links: { forgotPassword: string; signIn: string };
		class?: string;
	} = $props();

	// Never seeded: nothing in the kit keeps a password.
	let password = $state("");

	let root = $state<HTMLDivElement>(null!);
	let notice = $state<HTMLDivElement>(null!);

	const passwordError = $derived(result?.field === "password" ? result.message : undefined);

	// What each dead link says. The ready state's copy is the page's; the
	// others belong to the block, because the same link can die the same way
	// on every site.
	const dead: Record<"expired" | "invalid", { title: string; line: string }> = {
		expired: {
			title: "This link has expired",
			line: "Send yourself a new link and try again.",
		},
		invalid: {
			title: "This link isn't valid",
			line: "It may have already been used, or cut off when you copied it.",
		},
	};

	// Focus, in the browser only: the field on load; after a failed submit,
	// the field the server refused, else the form error's Notice.
	$effect(() => {
		if (result?.field) {
			root.querySelector<HTMLElement>(`[name="${result.field}"]`)?.focus();
			return;
		}
		if (result) {
			notice?.focus();
			return;
		}
		if (status === "ready") root.querySelector<HTMLElement>("input")?.focus();
	});
</script>

<div bind:this={root} data-slot="reset-password-form" class={cn("flex flex-col gap-4", className)}>
	{#if result && !result.field}
		<div bind:this={notice} tabindex="-1">
			<Notice tone="destructive" title={result.message} />
		</div>
	{/if}

	{#if status === "expired" || status === "invalid"}
		<Notice tone="warning" title={dead[status].title}>{dead[status].line}</Notice>
		<Button variant="outline" href={links.forgotPassword} class="mt-2">
			Ask for a new link
		</Button>
	{:else if status === "done"}
		<Notice tone="success" title="Your password is changed">Use the new one next time you sign in.</Notice>
		<Button href={links.signIn} class="mt-2">Sign in</Button>
	{:else}
		<AuthField label="New password" for="password" error={passwordError}>
			<PasswordInput
				id="password"
				name="password"
				autocomplete="new-password"
				bind:value={password}
				disabled={pending}
				aria-invalid={passwordError ? true : undefined}
				aria-describedby={passwordError ? "password-error" : undefined}
			/>
		</AuthField>
		<Button type="submit" class="mt-2" disabled={pending}>
			{#if pending}
				<Loader2 class="lucide size-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
				Changing password…
			{:else}
				Change password
			{/if}
		</Button>
	{/if}
</div>
