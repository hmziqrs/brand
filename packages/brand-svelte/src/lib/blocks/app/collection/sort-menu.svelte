<!--
  How the list is ordered: a dropdown of the sort fields as links, the
  current one named on the trigger and checked in the menu. The sort itself
  lives in the URL — `hrefFor` builds each link — so it works with no
  JavaScript, and a hidden input keeps it through the form's own submits.
-->
<script lang="ts">
	import ArrowUpDown from "@lucide/svelte/icons/arrow-up-down";
	import Check from "@lucide/svelte/icons/check";
	import * as DropdownMenu from "$brand/ui/dropdown-menu/index.js";
	import { Button } from "$brand/ui/button/index.js";
	import { cn } from "$brand/utils.js";

	let {
		options,
		/** The current sort as the URL spells it, e.g. "-last_active". */
		value,
		/** The href for the same list sorted another way. */
		hrefFor,
		/** What the trigger says when no sort is on. */
		label = "Sort",
		class: className,
		...rest
	}: {
		options: { value: string; label: string }[];
		value: string;
		hrefFor: (sort: string) => string;
		label?: string;
		class?: string;
	} & Record<string, unknown> = $props();

	const current = $derived(options.find((option) => option.value === value));

	// The stock item's classes, written out because a child snippet takes the
	// styling with it (as the workspace switcher does).
	const itemClass =
		"focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4";
</script>

<span data-slot="sort-menu" class={cn("inline-flex", className)} {...rest}>
	{#if value}
		<input type="hidden" name="sort" {value} />
	{/if}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			{#snippet child({ props })}
				<Button {...props} variant="outline" size="sm" class="max-w-44">
					<ArrowUpDown class="lucide" aria-hidden="true" />
					<span class="truncate">{current?.label ?? label}</span>
				</Button>
			{/snippet}
		</DropdownMenu.Trigger>
		<DropdownMenu.Content align="start" class="w-48">
			{#each options as option (option.value)}
				<DropdownMenu.Item>
					{#snippet child({ props })}
						<a href={hrefFor(option.value)} {...props} class={itemClass}>
							<span class="truncate">{option.label}</span>
							{#if option.value === value}
								<Check class="lucide ml-auto" />
							{/if}
						</a>
					{/snippet}
				</DropdownMenu.Item>
			{/each}
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</span>
