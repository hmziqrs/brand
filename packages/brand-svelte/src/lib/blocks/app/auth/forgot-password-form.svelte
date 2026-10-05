<!--
  The inside of a forgot-password form: the email field and the send button.
  The page owns the <form>; the action's FormResult comes back as `result`.
  Once a link is on its way (`sentTo`), the same line says so whether or not
  the account exists, and the button turns into a resend that counts down.
-->
<script lang="ts">
	import Loader2 from "@lucide/svelte/icons/loader-2";
	import Notice from "$brand/components/notice.svelte";
	import { Button } from "$brand/ui/button/index.js";
	import { Input } from "$brand/ui/input/index.js";
	import { cn } from "$brand/utils.js";
	import AuthField from "./auth-field.svelte";
	import type { FormResult } from "./types.js";

	let {
		result,
		pending = false,
		/** Where the link was sent: turns the button into a counting resend. */
		sentTo,
		resendAfter,
		links,
		class: className,
	}: {
		result?: FormResult;
		pending?: boolean;
		sentTo?: string;
		resendAfter?: number;
		links: { signIn: string };
		class?: string;
	} = $props();

	let email = $derived(sentTo ?? "");

	let root = $state<HTMLDivElement>(null!);
	let notice = $state<HTMLDivElement>(null!);

	const emailError = $derived(result?.field === "email" ? result.message : undefined);

	// The resend countdown. It only runs in the browser, so the server render
	// (and a page with no JavaScript) keeps the button usable; choosing it
	// restarts the count.
	let inBrowser = $state(false);
	let remaining = $state(0);
	$effect(() => {
		inBrowser = true;
		if (!resendAfter) return;
		remaining = resendAfter;
		const timer = setInterval(() => (remaining = Math.max(0, remaining - 1)), 1000);
		return () => clearInterval(timer);
	});
	const counting = $derived(inBrowser && sentTo !== undefined && remaining > 0);

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
		root.querySelector<HTMLElement>("input")?.focus();
	});
</script>

<div bind:this={root} data-slot="forgot-password-form" class={cn("flex flex-col gap-4", className)}>
	{#if result && !result.field}
		<div bind:this={notice} tabindex="-1">
			<Notice tone="destructive" title={result.message} />
		</div>
	{/if}

	{#if sentTo}
		<Notice tone="info" title="If there's an account for {sentTo}, we've sent a link to reset the password." />
	{/if}

	<AuthField label="Email" for="email" error={emailError}>
		<Input
			id="email"
			name="email"
			type="email"
			bind:value={email}
			autocomplete="email"
			placeholder="you@example.com"
			disabled={pending}
			aria-invalid={emailError ? true : undefined}
			aria-describedby={emailError ? "email-error" : undefined}
		/>
	</AuthField>

	{#snippet sendButton()}
		{#if pending}
			<Loader2 class="lucide size-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
			Sending…
		{:else if sentTo}
			{#if counting}Send again in {remaining}s{:else}Send the link again{/if}
		{:else}
			Send reset link
		{/if}
	{/snippet}

	<Button
		type="submit"
		class="mt-2"
		disabled={pending || counting}
		onclick={() => resendAfter && (remaining = resendAfter)}
	>
		{@render sendButton()}
	</Button>

	<p class="text-sm text-muted-foreground">
		Remembered your password?
		<a href={links.signIn} class="text-primary underline underline-offset-4 hover:underline">Sign in</a>
	</p>
</div>
