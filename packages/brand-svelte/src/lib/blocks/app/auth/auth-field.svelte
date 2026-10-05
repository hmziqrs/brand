<!--
  One labelled field of an auth form: the label, the control (a snippet that
  carries its own `name`), and the field's error. `for` is the control's id;
  the error takes the id `${for}-error`, so the control can point its
  aria-describedby at it.
-->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import type { Snippet } from "svelte";

	let {
		label,
		for: fieldFor,
		error,
		/** Shown at the right of the label: the "Forgot your password?" link. */
		beside,
		class: className,
		children,
	}: {
		label: string;
		for: string;
		error?: string;
		beside?: Snippet;
		class?: string;
		children: Snippet;
	} = $props();
</script>

<div data-slot="auth-field" class={cn("flex flex-col gap-2", className)}>
	<div class="flex items-center justify-between gap-2">
		<label class="text-sm font-medium" for={fieldFor}>{label}</label>
		{@render beside?.()}
	</div>
	{@render children()}
	{#if error}
		<p id={`${fieldFor}-error`} class="text-sm text-destructive">{error}</p>
	{/if}
</div>
