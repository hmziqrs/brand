<!--
  Email verification: the code entry, its result, and the resend. The page
  owns the <form>; the action's FormResult comes back as `result`. With
  `codeLength` the code goes into an InputOTP that submits by itself once the
  last digit lands — the submit button stays, for anyone without JavaScript.
  The resend carries name="resend", so the page's action can tell it from the
  verify.
-->
<script lang="ts">
	import Loader2 from "@lucide/svelte/icons/loader-2";
	import Notice from "$brand/components/notice.svelte";
	import { Button } from "$brand/ui/button/index.js";
	import { cn } from "$brand/utils.js";
	import { InputOTP, InputOTPGroup, InputOTPSlot } from "$brand/ui/input-otp/index.js";
	import type { FormResult } from "./types.js";

	let {
		email,
		status = "sent",
		result,
		pending = false,
		resendAfter,
		codeLength = 6,
		continueHref,
		class: className,
	}: {
		email: string;
		status?: "sent" | "verifying" | "verified" | "expired";
		result?: FormResult;
		pending?: boolean;
		resendAfter?: number;
		codeLength?: number;
		continueHref?: string;
		class?: string;
	} = $props();

	// The code is never seeded: a wrong try starts over.
	let code = $state("");
	let root = $state<HTMLDivElement>(null!);
	let notice = $state<HTMLDivElement>(null!);

	const busy = $derived(pending || status === "verifying");

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
	const counting = $derived(inBrowser && remaining > 0);

	// A form error clears the code (a wrong try starts over) and takes focus
	// in the Notice, so screen readers read what went wrong with it.
	$effect(() => {
		if (result && !result.field) {
			code = "";
			notice?.focus();
		}
	});
</script>

<div bind:this={root} data-slot="verify-email" class={cn("flex flex-col gap-4", className)}>
	{#if status === "verified"}
		<Notice tone="success" title="Your email is verified">Welcome aboard.</Notice>
		{#if continueHref}
			<Button href={continueHref} class="mt-2">Continue</Button>
		{/if}
	{:else}
		{#if result && !result.field}
			<div bind:this={notice} tabindex="-1">
				<Notice tone="destructive" title={result.message} />
			</div>
		{/if}

		{#if status === "expired"}
			<Notice tone="warning" title="That code has expired">Send a new one and try again.</Notice>
			<Button type="submit" name="resend" value="1" class="mt-2" disabled={pending}>
				{#if pending}
					<Loader2 class="lucide size-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
					Sending…
				{:else}
					Send a new code
				{/if}
			</Button>
		{:else}
			<p class="text-sm text-muted-foreground">
				We sent a {codeLength}-digit code to {email}. Enter it below.
			</p>
			<div class="flex flex-col gap-2">
				<label class="text-sm font-medium" for="code">Code</label>
				<!-- The code submits itself once the last digit lands: bits-ui's
					onComplete hands the finished code to the page's form. -->
				<InputOTP
					inputId="code"
					name="code"
					maxlength={codeLength}
					bind:value={code}
					disabled={busy}
					aria-invalid={result && !result.field ? true : undefined}
					onComplete={() => root.closest("form")?.requestSubmit()}
				>
					{#snippet children({ cells })}
						<InputOTPGroup>
							{#each cells as cell, at (at)}
								<InputOTPSlot {cell} />
							{/each}
						</InputOTPGroup>
					{/snippet}
				</InputOTP>
			</div>
			<Button type="submit" class="mt-2" disabled={busy}>
				{#if busy}
					<Loader2 class="lucide size-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
					Verifying…
				{:else}
					Verify email
				{/if}
			</Button>
			<Button
				type="submit"
				variant="outline"
				name="resend"
				value="1"
				disabled={busy || counting}
				onclick={() => resendAfter && (remaining = resendAfter)}
			>
				{#if counting}Send again in {remaining}s{:else}Send the code again{/if}
			</Button>
		{/if}
	{/if}
</div>
