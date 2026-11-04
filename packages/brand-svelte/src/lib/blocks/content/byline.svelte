<!-- Who wrote a post: their mark, a mono Written by over the name, and with links a hairline and the
     places to find them, X and GitHub by their logos. -->
<script lang="ts">
	import { siGithub, siX } from "simple-icons";
	import Link from "@lucide/svelte/icons/link";
	import { cn } from "$brand/utils.js";
	import Mark from "$brand/components/mark.svelte";
	import BrandIcon from "$brand/components/brand-icon.svelte";

	let {
		name,
		/** Their two-letter mark. */
		symbol,
		/** Where to find them, each named by its label: X and GitHub show their logos. */
		links = [],
		/** The words over the name. */
		label = "Written by",
		class: className,
	}: { name: string; symbol: string; links?: { label: string; href: string }[]; label?: string; class?: string } = $props();

	const logos: Record<string, { path: string }> = { X: siX, GitHub: siGithub };
</script>

<div data-slot="byline" class={cn("flex items-center gap-3", className)}>
	<Mark {symbol} size={36} />
	<div class="flex min-w-0 flex-col leading-tight">
		<span class="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">{label}</span>
		<span class="mt-1 text-[0.9375rem] font-medium text-foreground">{name}</span>
	</div>
	{#if links.length}
		<span class="mx-1 h-6 w-px bg-border" aria-hidden="true"></span>
		{#each links as l (l.href)}
			<a href={l.href} target="_blank" rel="noopener" aria-label={`${name} on ${l.label}`} class="grid size-8 place-items-center rounded-full text-foreground/75 hover:text-foreground">
				{#if logos[l.label]}<BrandIcon icon={logos[l.label]} class={l.label === "X" ? "size-3.5" : "size-4"} />{:else}<Link class="lucide size-4" />{/if}
			</a>
		{/each}
	{/if}
</div>
