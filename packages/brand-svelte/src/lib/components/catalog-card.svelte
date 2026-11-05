<!-- One entry in a catalog you pick from: an icon in a ring and a Tag (its command or code) on top, the
     name and one line, then key and value rows with each value in a mono Tag. A button: picking it
     rings it in oxide and fills its icon. -->
<script lang="ts" module>
	export type CatalogItem = {
		/** What picking it reports. */
		id: string;
		title: string;
		line?: string;
		/** The oxide Tag at the top right: a command, a code. */
		tag?: string;
		rows?: { label: string; value: string }[];
		/** A logo from `simple-icons`, or any `{ path }` in its 24×24 box. */
		icon?: { path: string };
		/** One letter in place of a logo. */
		letter?: string;
		/** What the button says to screen readers, when the title alone doesn't. */
		label?: string;
	};
</script>

<script lang="ts">
	import { cn } from "$brand/utils.js";
	import BrandIcon from "./brand-icon.svelte";
	import Tag from "./tag.svelte";

	let {
		item,
		picked = false,
		onpick,
		class: className,
	}: { item: CatalogItem; picked?: boolean; onpick?: (id: string) => void; class?: string } = $props();
</script>

<button
	type="button"
	data-slot="catalog-card"
	data-value={item.id}
	aria-pressed={picked}
	aria-label={item.label}
	class={cn(
		"group flex min-h-[13.5rem] min-w-0 flex-col gap-5 rounded-2xl p-5 text-left ring-1 ring-foreground/10 transition-shadow duration-200 outline-none hover:ring-foreground/30 focus-visible:ring-3 focus-visible:ring-ring/50 aria-pressed:not-focus-visible:ring-2 aria-pressed:not-focus-visible:ring-primary motion-reduce:transition-none",
		className,
	)}
	onclick={() => onpick?.(item.id)}
>
	<span class="flex items-center justify-between gap-3">
		<span class="grid size-10 shrink-0 place-items-center rounded-full text-[1.1rem] text-foreground ring-1 ring-foreground/15 transition-colors group-aria-pressed:bg-primary group-aria-pressed:text-primary-foreground group-aria-pressed:ring-primary">
			{#if item.icon}
				<BrandIcon icon={item.icon} class="size-[1em]" />
			{:else if item.letter}
				<span aria-hidden="true" class="inline-grid size-[1em] shrink-0 place-items-center font-mono text-[0.9em] leading-none font-bold">{item.letter}</span>
			{/if}
		</span>
		{#if item.tag}<Tag tone="orange" class="font-mono">{item.tag}</Tag>{/if}
	</span>
	<span class="flex flex-col gap-1">
		<span class="text-[1.2rem] leading-tight font-medium tracking-[-0.02em] text-foreground">{item.title}</span>
		{#if item.line}<span class="text-[0.875rem] leading-snug text-foreground/80">{item.line}</span>{/if}
	</span>
	{#if item.rows?.length}
		<span class="mt-auto flex flex-col gap-2 text-[0.8125rem]">
			{#each item.rows as row (row.label)}
				<span class="flex items-center justify-between gap-3"><span class="text-foreground/75">{row.label}</span><Tag class="min-w-0 truncate font-mono">{row.value}</Tag></span>
			{/each}
		</span>
	{/if}
</button>
