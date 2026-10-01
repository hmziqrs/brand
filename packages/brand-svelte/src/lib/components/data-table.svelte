<!--
  A table of facts: providers, feature flags, templates. Built on
  shadcn-svelte's Table. accent: boxed, with one column in a soft orange
  wash, for landing and product pages. lines: a strong line under the
  headings and thin lines between rows, for docs.
-->
<script lang="ts">
	import { cn } from "$brand/utils.js";
	import type { Snippet } from "svelte";
	import * as Table from "$brand/ui/table/index.js";

	let {
		columns,
		rows,
		variant = "accent",
		/** How many columns from the left hold names: text color, on one line. */
		names = 1,
		/** The column that matters, washed in orange in the accent style. The last one by default. */
		accent: accentColumn,
		class: className,
	}: {
		columns: (Snippet | string)[];
		rows: (Snippet | string)[][];
		variant?: "accent" | "lines";
		names?: number;
		accent?: number;
		class?: string;
	} = $props();

	const accent = $derived(variant === "accent");
	const washed = $derived(accentColumn ?? columns.length - 1);
</script>

<div data-slot="data-table" class={cn(accent && "overflow-hidden rounded-xl border", className)}>
	<Table.Root class="text-[0.84rem]">
		<Table.Header class={cn(!accent && "[&_tr]:border-foreground")}>
			<Table.Row class="hover:bg-transparent">
				{#each columns as c, i (i)}
					<Table.Head class={cn("h-auto py-2.5 font-medium text-foreground", accent ? "px-4" : "px-3", accent && i === washed && "bg-primary/7 text-primary")}>
						{#if typeof c === "string"}{c}{:else}{@render c()}{/if}
					</Table.Head>
				{/each}
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each rows as row, r (r)}
				<Table.Row class="hover:bg-transparent">
					{#each row as cell, i (i)}
						<Table.Cell
							class={cn(
								"py-3 align-top leading-relaxed",
								accent ? "px-4" : "px-3",
								accent && i === washed && "bg-primary/7",
								i < names ? "whitespace-nowrap text-foreground" : "min-w-36 whitespace-normal text-muted-foreground",
							)}
						>
							{#if typeof cell === "string"}{cell}{:else}{@render cell()}{/if}
						</Table.Cell>
					{/each}
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
