<!--
  A small switch between a few views of the same thing: package managers,
  monthly or yearly, one note or another. A thin outline; the picked one
  gets a soft orange fill. Nothing moves.
-->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import type { Snippet } from "svelte";

	let {
		/** What the choice is about, for screen readers: "Package manager", "Billing". */
		label,
		options,
		value,
		onValueChange,
		class: className,
	}: {
		label: string;
		options: readonly { value: string; label: Snippet | string }[];
		value: string;
		onValueChange: (value: string) => void;
		class?: string;
	} = $props();
</script>

<div data-slot="segmented" role="group" aria-label={label} class={cn("inline-flex w-fit flex-wrap gap-1 rounded-[calc(var(--radius-md)+4px)] border p-1", className)}>
	{#each options as o (o.value)}
		<button
			type="button"
			aria-pressed={o.value === value}
			onclick={() => onValueChange(o.value)}
			class="h-7.5 rounded-md px-3 text-[0.8125rem] font-medium text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 aria-pressed:bg-primary/10 aria-pressed:text-primary dark:aria-pressed:bg-primary/20"
		>
			{#if typeof o.label === "string"}{o.label}{:else}{@render o.label()}{/if}
		</button>
	{/each}
</div>
