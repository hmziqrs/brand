<!--
  The inside of a sign-in form: the email and password fields, the errors,
  the submit button and the links away. The page owns the <form> and posts it
  to its action; the action's FormResult comes back here as `result`.

  A failed sign-in keeps the email (the page hands it back through `values`),
  clears the password and focuses it. Nothing in the kit keeps a password:
  the field is never seeded.
-->
<script lang="ts">
	import Loader2 from "@lucide/svelte/icons/loader-2";
	import Notice from "$brand/components/notice.svelte";
	import { Button } from "$brand/ui/button/index.js";
	import { Input } from "$brand/ui/input/index.js";
	import { cn } from "$brand/utils.js";
	import AuthField from "./auth-field.svelte";
	import PasswordInput from "./password-input.svelte";
	import ProviderButtons from "./provider-buttons.svelte";
	import type { FormResult, Provider } from "./types.js";

	let {
		result,
		pending = false,
		/** The email as the page knows it: handed back after a failed sign-in. */
		values,
		providers = [],
		links,
		class: className,
	}: {
		result?: FormResult;
		pending?: boolean;
		values?: { email?: string };
		providers?: Provider[];
		links: { signUp?: string; forgotPassword?: string };
		class?: string;
	} = $props();

	// A writable derived: the field follows what the page knows (a post with
	// no JavaScript returns the email), and typing on top of it just works.
	let email = $derived(values?.email ?? "");
	let password = $state("");

	let root = $state<HTMLDivElement>(null!);
	let passwordRef = $state<HTMLInputElement>(null!);

	const emailError = $derived(result?.field === "email" ? result.message : undefined);
	const passwordError = $derived(result?.field === "password" ? result.message : undefined);

	// Focus, in the browser only: the first field on load; after a failed
	// submit, the field the server refused — or, when the pair just doesn't
	// match, the password field, cleared and waiting (the email above it
	// keeps what was typed).
	$effect(() => {
		if (result?.field) {
			root.querySelector<HTMLElement>(`[name="${result.field}"]`)?.focus();
			return;
		}
		if (result) {
			password = "";
			passwordRef?.focus();
			return;
		}
		root.querySelector<HTMLElement>("input")?.focus();
	});
</script>

<div bind:this={root} data-slot="sign-in-form" class={cn("flex flex-col gap-4", className)}>
	{#if result && !result.field}
		<Notice tone="destructive" title={result.message} />
	{/if}

	{#if providers.length > 0}
		<ProviderButtons {providers} />
		<div class="flex items-center gap-3" aria-hidden="true">
			<span class="h-px flex-1 bg-border"></span>
			<span class="text-xs text-muted-foreground">or</span>
			<span class="h-px flex-1 bg-border"></span>
		</div>
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

	<AuthField label="Password" for="password" error={passwordError}>
		{#if links.forgotPassword}
			{#snippet beside()}
				<a href={links.forgotPassword} class="text-sm text-primary underline underline-offset-4 hover:underline">
					Forgot your password?
				</a>
			{/snippet}
		{/if}
		<PasswordInput
			id="password"
			name="password"
			autocomplete="current-password"
			bind:ref={passwordRef}
			bind:value={password}
			disabled={pending}
			aria-invalid={passwordError ? true : undefined}
			aria-describedby={passwordError ? "password-error" : undefined}
		/>
	</AuthField>

	<Button type="submit" class="mt-2" disabled={pending}>
		{#if pending}
			<Loader2 class="lucide size-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
			Signing in…
		{:else}
			Sign in
		{/if}
	</Button>

	{#if links.signUp}
		<p class="text-sm text-muted-foreground">
			Don't have an account?
			<a href={links.signUp} class="text-primary underline underline-offset-4 hover:underline">Create one</a>
		</p>
	{/if}
</div>
