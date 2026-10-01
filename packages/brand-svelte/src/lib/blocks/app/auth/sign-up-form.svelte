<!--
  The inside of a sign-up form: name, email and password, the password rules
  as a checklist that ticks as they're met, the errors and the submit button.
  The page owns the <form>; the action's FormResult comes back as `result`.
  The rules come as regex strings, so a server can send them.
-->
<script lang="ts">
	import Loader2 from "@lucide/svelte/icons/loader-2";
	import Marker from "$brand/components/marker.svelte";
	import Notice from "$brand/components/notice.svelte";
	import { Button } from "$brand/ui/button/index.js";
	import { Input } from "$brand/ui/input/index.js";
	import { cn } from "$brand/utils.js";
	import AuthField from "./auth-field.svelte";
	import PasswordInput from "./password-input.svelte";
	import ProviderButtons from "./provider-buttons.svelte";
	import type { FormResult, PasswordRule, Provider } from "./types.js";

	let {
		result,
		pending = false,
		/** The fields as the page knows them: handed back after a failed sign-up. */
		values,
		providers = [],
		links,
		passwordRules = [],
		class: className,
	}: {
		result?: FormResult;
		pending?: boolean;
		values?: { name?: string; email?: string };
		providers?: Provider[];
		links: { signIn?: string; terms?: string; privacy?: string };
		passwordRules?: PasswordRule[];
		class?: string;
	} = $props();

	// Writable deriveds: the fields follow what the page knows (a post with
	// no JavaScript returns them), and typing on top just works.
	let name = $derived(values?.name ?? "");
	let email = $derived(values?.email ?? "");
	let password = $state("");

	let root = $state<HTMLDivElement>(null!);
	let notice = $state<HTMLDivElement>(null!);

	const nameError = $derived(result?.field === "name" ? result.message : undefined);
	const emailError = $derived(result?.field === "email" ? result.message : undefined);
	const passwordError = $derived(result?.field === "password" ? result.message : undefined);
	const passwordDescribedBy = $derived(
		[passwordError ? "password-error" : undefined, passwordRules.length > 0 ? "password-rules" : undefined]
			.filter(Boolean)
			.join(" ") || undefined,
	);

	// Which rules the password typed so far satisfies. Whole patterns, built
	// once per rule — never class names.
	const met = $derived(passwordRules.map((rule) => new RegExp(rule.pattern).test(password)));

	// Focus, in the browser only: the first field on load; after a failed
	// submit, the field the server refused, else the form error's Notice,
	// which takes focus so screen readers read it.
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

<div bind:this={root} data-slot="sign-up-form" class={cn("flex flex-col gap-4", className)}>
	{#if result && !result.field}
		<div bind:this={notice} tabindex="-1">
			<Notice tone="destructive" title={result.message} />
		</div>
	{/if}

	{#if providers.length > 0}
		<ProviderButtons {providers} />
		<div class="flex items-center gap-3" aria-hidden="true">
			<span class="h-px flex-1 bg-border"></span>
			<span class="text-xs text-muted-foreground">or</span>
			<span class="h-px flex-1 bg-border"></span>
		</div>
	{/if}

	<AuthField label="Name" for="name" error={nameError}>
		<Input
			id="name"
			name="name"
			bind:value={name}
			autocomplete="name"
			placeholder="Ada Lovelace"
			disabled={pending}
			aria-invalid={nameError ? true : undefined}
			aria-describedby={nameError ? "name-error" : undefined}
		/>
	</AuthField>

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
		<PasswordInput
			id="password"
			name="password"
			autocomplete="new-password"
			bind:value={password}
			disabled={pending}
			aria-invalid={passwordError ? true : undefined}
			aria-describedby={passwordDescribedBy}
		/>
	</AuthField>

	{#if passwordRules.length > 0}
		<ul id="password-rules" class="flex flex-col gap-1.5" aria-label="Password rules">
			{#each passwordRules as rule, at (rule.label)}
				<li class={cn("flex items-center gap-2 text-sm", met[at] ? "text-foreground" : "text-muted-foreground")}>
					<Marker filled={met[at]} class={met[at] ? "text-success" : undefined} />
					{rule.label}
				</li>
			{/each}
		</ul>
	{/if}

	<Button type="submit" class="mt-2" disabled={pending}>
		{#if pending}
			<Loader2 class="lucide size-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
			Creating your account…
		{:else}
			Create account
		{/if}
	</Button>

	{#if links.terms || links.privacy}
		<p class="text-sm text-muted-foreground">
			By creating an account, you agree to our
			{#if links.terms}<a href={links.terms} class="text-primary underline underline-offset-4 hover:underline">terms</a>{:else}terms{/if}
			and
			{#if links.privacy}<a href={links.privacy} class="text-primary underline underline-offset-4 hover:underline">privacy policy</a>{:else}privacy policy{/if}.
		</p>
	{/if}

	{#if links.signIn}
		<p class="text-sm text-muted-foreground">
			Already have an account?
			<a href={links.signIn} class="text-primary underline underline-offset-4 hover:underline">Sign in</a>
		</p>
	{/if}
</div>
