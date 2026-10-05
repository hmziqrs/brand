<!--
  A password field with a show/hide button: the only piece of the auth forms
  that needs JavaScript of its own. The button is type="button", so showing
  the password never submits the form, and it says which state it's in
  (aria-pressed) out loud.
-->
<script lang="ts">
	import Eye from "@lucide/svelte/icons/eye";
	import EyeOff from "@lucide/svelte/icons/eye-off";
	import { Button } from "$brand/ui/button/index.js";
	import { Input } from "$brand/ui/input/index.js";
	import { cn } from "$brand/utils.js";
	import type { HTMLInputAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		value = $bindable(""),
		class: className,
		...rest
	}: {
		ref?: HTMLInputElement | null;
		value?: string;
		class?: string;
	} & Omit<HTMLInputAttributes, "ref" | "value" | "type" | "files"> = $props();

	let shown = $state(false);
</script>

<div data-slot="password-input" class={cn("relative", className)}>
	<Input bind:ref bind:value type={shown ? "text" : "password"} class="pr-10" {...rest} />
	<Button
		type="button"
		variant="ghost"
		size="icon-sm"
		class="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
		aria-pressed={shown}
		aria-label={shown ? "Hide password" : "Show password"}
		onclick={() => (shown = !shown)}
	>
		{#if shown}
			<Eye class="lucide" aria-hidden="true" />
		{:else}
			<EyeOff class="lucide" aria-hidden="true" />
		{/if}
	</Button>
</div>
